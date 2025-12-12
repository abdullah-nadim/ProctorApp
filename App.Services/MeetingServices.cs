using App.Models;
using App.Models.Repositories;
using App.Repositories;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.SignalR;
using App.Services.Hubs;

namespace App.Services
{
    public class MeetingServices : BaseServices
    {
        private readonly ILogger<MeetingServices> _logger;
        private readonly IHubContext<NotificationHub> _hubContext;

        public MeetingServices(DatabaseContext context, ILogger<MeetingServices> logger, IHubContext<NotificationHub> hubContext) : base(context)
        {
            _logger = logger;
            _hubContext = hubContext;
        }

        public async Task<int> CreateMeeting(Meeting meeting)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                await factory.GetMeetingRepository().CreateAsync(meeting);
                factory.Commit();
                
                // Send notifications to meeting participants
                if (meeting.Participants != null && meeting.Participants.Any())
                {
                    var complaint = await factory.GetComplaintRepository().ReadAsync(meeting.ComplaintId);
                    var complaintTitle = complaint?.Title ?? "Case";
                    
                    foreach (var participant in meeting.Participants)
                    {
                        var notification = new Notification(participant.UserId, "Meeting Scheduled", $"A meeting has been scheduled for case: {complaintTitle}");
                        notification.SetRelatedEntity(RelatedEntityType.Meeting, meeting.Id, $"/dashboard/meeting-details/{meeting.Id}");
                        await factory.GetNotificationRepository().CreateAsync(notification);
                        factory.Commit();
                        
                        var notificationContract = new App.API.Contracts.Notifications.Notification
                        {
                            Id = notification.Id,
                            UserId = participant.UserId,
                            Title = "Meeting Scheduled",
                            Message = $"A meeting has been scheduled for case: {complaintTitle}",
                            RelatedEntityType = RelatedEntityType.Meeting.ToString(),
                            RelatedEntityId = meeting.Id,
                            ActionUrl = $"/dashboard/meeting-details/{meeting.Id}",
                            CreatedAt = notification.CreatedAt,
                            IsRead = false
                        };
                        await _hubContext.Clients.Group($"user_{participant.UserId}").SendAsync("ReceiveNotification", notificationContract);
                    }
                }
                
                return meeting.Id;
            }
        }

        public async Task UpdateMeeting(Meeting updatedMeeting)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                IMeetingRepository repository = factory.GetMeetingRepository();
                Meeting updatingMeeting = await repository.ReadAsync(updatedMeeting.Id);
                if (updatingMeeting != null)
                {
                    updatingMeeting.Update(updatedMeeting);
                    if (updatedMeeting.Status != updatingMeeting.Status)
                    {
                        updatingMeeting.UpdateStatus(updatedMeeting.Status);
                    }
                    if (!string.IsNullOrEmpty(updatedMeeting.Outcome))
                    {
                        updatingMeeting.SetOutcome(updatedMeeting.Outcome);
                    }
                    repository.Update(updatingMeeting);
                    factory.Commit();
                }
            }
        }

        public async Task CloseMeeting(int meetingId, string outcome)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                IMeetingRepository repository = factory.GetMeetingRepository();
                Meeting meeting = await repository.ReadAsync(meetingId);
                if (meeting != null)
                {
                    meeting.UpdateStatus(MeetingStatus.Completed);
                    if (!string.IsNullOrEmpty(outcome))
                    {
                        meeting.SetOutcome(outcome);
                    }
                    repository.Update(meeting);
                    factory.Commit();
                    
                    // Send notifications to meeting participants
                    if (meeting.Participants != null && meeting.Participants.Any())
                    {
                        var complaint = await factory.GetComplaintRepository().ReadAsync(meeting.ComplaintId);
                        var complaintTitle = complaint?.Title ?? "Case";
                        
                        foreach (var participant in meeting.Participants)
                        {
                            var notification = new Notification(participant.UserId, "Meeting Completed", $"The meeting for case '{complaintTitle}' has been completed.");
                            notification.SetRelatedEntity(RelatedEntityType.Meeting, meeting.Id, $"/dashboard/meeting-details/{meeting.Id}");
                            await factory.GetNotificationRepository().CreateAsync(notification);
                            factory.Commit();
                            
                            var notificationContract = new App.API.Contracts.Notifications.Notification
                            {
                                Id = notification.Id,
                                UserId = participant.UserId,
                                Title = "Meeting Completed",
                                Message = $"The meeting for case '{complaintTitle}' has been completed.",
                                RelatedEntityType = RelatedEntityType.Meeting.ToString(),
                                RelatedEntityId = meeting.Id,
                                ActionUrl = $"/dashboard/meeting-details/{meeting.Id}",
                                CreatedAt = notification.CreatedAt,
                                IsRead = false
                            };
                            await _hubContext.Clients.Group($"user_{participant.UserId}").SendAsync("ReceiveNotification", notificationContract);
                        }
                    }
                }
            }
        }

        public async Task<Meeting?> GetMeetingById(int id)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetMeetingRepository().ReadAsync(id);
            }
        }

        public async Task<List<Meeting>> GetMeetingsByComplaint(int complaintId)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetMeetingRepository().ReadManyByComplaint(complaintId);
            }
        }

        public async Task<List<Meeting>> GetMeetingsByScheduledBy(int scheduledBy)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetMeetingRepository().ReadManyByScheduler(scheduledBy);
            }
        }

        public async Task<List<Meeting>> GetMeetingsForUser(int userId)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                var meetingRepository = factory.GetMeetingRepository();
                var caseAssignmentRepository = factory.GetCaseAssignmentRepository();
                var complaintRepository = factory.GetComplaintRepository();

                // Get meetings scheduled by the user
                var scheduledMeetings = await meetingRepository.ReadManyByScheduler(userId);

                // Get meetings where user is a participant
                var participantMeetings = await meetingRepository.ReadManyByParticipant(userId);

                // Get complaints assigned to the user
                var assignedCases = await caseAssignmentRepository.ReadManyByAssignee(userId);
                var assignedComplaintIds = assignedCases.Select(ca => ca.ComplaintId).Distinct().ToList();

                // Get complaints where user is the complainant
                var complaintsAsComplainant = await complaintRepository.ReadManyByComplainant(userId);
                var complainantComplaintIds = complaintsAsComplainant.Select(c => c.Id).Distinct().ToList();

                // Combine all complaint IDs
                var allComplaintIds = assignedComplaintIds.Union(complainantComplaintIds).Distinct().ToList();

                // Get meetings for those complaints
                var complaintMeetings = allComplaintIds.Any() 
                    ? await meetingRepository.ReadManyByComplaintIds(allComplaintIds)
                    : new List<Meeting>();

                // Combine all meetings and remove duplicates
                var allMeetings = scheduledMeetings
                    .Union(participantMeetings)
                    .Union(complaintMeetings)
                    .GroupBy(m => m.Id)
                    .Select(g => g.First())
                    .ToList();

                return allMeetings;
            }
        }
    }
}

