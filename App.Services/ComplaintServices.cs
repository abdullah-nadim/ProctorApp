using App.Models;
using App.Models.Repositories;
using App.Repositories;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.SignalR;
using App.Services.Hubs;

namespace App.Services
{
    public class ComplaintServices : BaseServices
    {
        private readonly ILogger<ComplaintServices> _logger;
        private readonly IHubContext<NotificationHub> _hubContext;

        public ComplaintServices(DatabaseContext context, ILogger<ComplaintServices> logger, IHubContext<NotificationHub> hubContext) : base(context)
        {
            _logger = logger;
            _hubContext = hubContext;
        }

        public async Task<int> CreateComplaint(Complaint complaint)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                await factory.GetComplaintRepository().CreateAsync(complaint);
                factory.Commit();
                
                // Send confirmation notification to the student who created the complaint
                var studentNotification = new Notification(complaint.ComplainantId, "Complaint Submitted", $"Your complaint '{complaint.Title}' has been submitted successfully and is under review.");
                studentNotification.SetRelatedEntity(RelatedEntityType.Complaint, complaint.Id, $"/dashboard/my-complaints");
                await factory.GetNotificationRepository().CreateAsync(studentNotification);
                factory.Commit();
                
                var studentNotificationContract = new App.API.Contracts.Notifications.Notification
                {
                    Id = studentNotification.Id,
                    UserId = complaint.ComplainantId,
                    Title = "Complaint Submitted",
                    Message = $"Your complaint '{complaint.Title}' has been submitted successfully and is under review.",
                    RelatedEntityType = RelatedEntityType.Complaint.ToString(),
                    RelatedEntityId = complaint.Id,
                    ActionUrl = $"/dashboard/my-complaints",
                    CreatedAt = studentNotification.CreatedAt,
                    IsRead = false
                };
                await _hubContext.Clients.Group($"user_{complaint.ComplainantId}").SendAsync("ReceiveNotification", studentNotificationContract);
                
                // Send notification to admins/proctors about new complaint
                var allUsers = await factory.GetUserRepository().ReadManyAsync();
                var proctors = allUsers.Where(u => u.UserType == UserTypes.Proctor || u.UserType == UserTypes.CoordinationOfficer).ToList();
                
                foreach (var proctor in proctors)
                {
                    var notification = new Notification(proctor.Id, "New Complaint Filed", $"A new complaint has been filed: {complaint.Title}");
                    notification.SetRelatedEntity(RelatedEntityType.Complaint, complaint.Id, $"/dashboard/case-details/{complaint.Id}");
                    await factory.GetNotificationRepository().CreateAsync(notification);
                    factory.Commit();
                    
                    var notificationContract = new App.API.Contracts.Notifications.Notification
                    {
                        Id = notification.Id,
                        UserId = proctor.Id,
                        Title = "New Complaint Filed",
                        Message = $"A new complaint has been filed: {complaint.Title}",
                        RelatedEntityType = RelatedEntityType.Complaint.ToString(),
                        RelatedEntityId = complaint.Id,
                        ActionUrl = $"/dashboard/case-details/{complaint.Id}",
                        CreatedAt = notification.CreatedAt,
                        IsRead = false
                    };
                    await _hubContext.Clients.Group($"user_{proctor.Id}").SendAsync("ReceiveNotification", notificationContract);
                }
                
                return complaint.Id;
            }
        }

        public async Task UpdateComplaint(Complaint updatedComplaint)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                IComplaintRepository repository = factory.GetComplaintRepository();
                Complaint updatingComplaint = await repository.ReadAsync(updatedComplaint.Id);
                if (updatingComplaint != null)
                {
                    var oldStatus = updatingComplaint.Status;
                    updatingComplaint.Update(updatedComplaint);
                    repository.Update(updatingComplaint);
                    factory.Commit();
                    
                    // Send notification if status changed
                    if (oldStatus != updatedComplaint.Status)
                    {
                        var statusText = updatedComplaint.Status.ToString();
                        var notificationTitle = updatedComplaint.Status == ComplaintStatus.Resolved || updatedComplaint.Status == ComplaintStatus.Dismissed 
                            ? "Case Closed" 
                            : "Case Status Updated";
                        var notificationMessage = updatedComplaint.Status == ComplaintStatus.Resolved || updatedComplaint.Status == ComplaintStatus.Dismissed
                            ? $"Your case has been {statusText}: {updatingComplaint.Title}"
                            : $"Your case status has been updated to {statusText}: {updatingComplaint.Title}";
                        
                        // Notify complainant
                        var notification = new Notification(updatingComplaint.ComplainantId, notificationTitle, notificationMessage);
                        notification.SetRelatedEntity(RelatedEntityType.Complaint, updatingComplaint.Id, $"/dashboard/case-details/{updatingComplaint.Id}");
                        await factory.GetNotificationRepository().CreateAsync(notification);
                        
                        var notificationContract = new App.API.Contracts.Notifications.Notification
                        {
                            Id = notification.Id,
                            UserId = updatingComplaint.ComplainantId,
                            Title = notificationTitle,
                            Message = notificationMessage,
                            RelatedEntityType = RelatedEntityType.Complaint.ToString(),
                            RelatedEntityId = updatingComplaint.Id,
                            ActionUrl = $"/dashboard/case-details/{updatingComplaint.Id}",
                            CreatedAt = notification.CreatedAt,
                            IsRead = false
                        };
                        await _hubContext.Clients.Group($"user_{updatingComplaint.ComplainantId}").SendAsync("ReceiveNotification", notificationContract);
                        
                        // Also notify assigned proctor/coordination officer if case is assigned
                        var assignments = await factory.GetCaseAssignmentRepository().ReadManyByComplaint(updatingComplaint.Id);
                        foreach (var assignment in assignments)
                        {
                            var assigneeNotification = new Notification(assignment.AssignedTo, "Case Status Updated", $"Case '{updatingComplaint.Title}' status has been updated to {statusText}");
                            assigneeNotification.SetRelatedEntity(RelatedEntityType.Complaint, updatingComplaint.Id, $"/dashboard/case-details/{updatingComplaint.Id}");
                            await factory.GetNotificationRepository().CreateAsync(assigneeNotification);
                            
                            var assigneeNotificationContract = new App.API.Contracts.Notifications.Notification
                            {
                                Id = assigneeNotification.Id,
                                UserId = assignment.AssignedTo,
                                Title = "Case Status Updated",
                                Message = $"Case '{updatingComplaint.Title}' status has been updated to {statusText}",
                                RelatedEntityType = RelatedEntityType.Complaint.ToString(),
                                RelatedEntityId = updatingComplaint.Id,
                                ActionUrl = $"/dashboard/case-details/{updatingComplaint.Id}",
                                CreatedAt = assigneeNotification.CreatedAt,
                                IsRead = false
                            };
                            await _hubContext.Clients.Group($"user_{assignment.AssignedTo}").SendAsync("ReceiveNotification", assigneeNotificationContract);
                        }
                        
                        factory.Commit();
                    }
                }
            }
        }

        public async Task<Complaint?> GetComplaintById(int id)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetComplaintRepository().ReadAsync(id);
            }
        }

        public async Task<List<Complaint>> GetAllComplaints()
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetComplaintRepository().ReadManyAsync();
            }
        }

        public async Task<List<Complaint>> GetComplaintsByComplainant(int complainantId)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetComplaintRepository().ReadManyByComplainant(complainantId);
            }
        }

        public async Task<List<Complaint>> GetComplaintsByStatus(ComplaintStatus status)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetComplaintRepository().ReadManyByStatus(status);
            }
        }

        public async Task<List<Complaint>> GetUnassignedComplaints()
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                // Treat "unassigned" as pending complaints
                return await factory.GetComplaintRepository().ReadManyByStatus(ComplaintStatus.Pending);
            }
        }
    }
}

