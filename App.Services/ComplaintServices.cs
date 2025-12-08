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
                
                // Send notification to admins/proctors about new complaint
                var allUsers = await factory.GetUserRepository().ReadManyAsync();
                var proctors = allUsers.Where(u => u.UserType == UserTypes.Proctor || u.UserType == UserTypes.CoordinationOfficer).ToList();
                var notificationContract = new App.API.Contracts.Notifications.Notification
                {
                    Title = "New Complaint Filed",
                    Message = $"A new complaint has been filed: {complaint.Title}",
                    RelatedEntityType = RelatedEntityType.Complaint.ToString(),
                    RelatedEntityId = complaint.Id,
                    ActionUrl = $"/dashboard/case-details/{complaint.Id}",
                    CreatedAt = DateTime.UtcNow,
                    IsRead = false
                };
                
                foreach (var proctor in proctors)
                {
                    var notification = new Notification(proctor.Id, "New Complaint Filed", $"A new complaint has been filed: {complaint.Title}");
                    notification.SetRelatedEntity(RelatedEntityType.Complaint, complaint.Id, $"/dashboard/case-details/{complaint.Id}");
                    await factory.GetNotificationRepository().CreateAsync(notification);
                    notificationContract.UserId = proctor.Id;
                    await _hubContext.Clients.Group($"user_{proctor.Id}").SendAsync("ReceiveNotification", notificationContract);
                }
                factory.Commit();
                
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
                    
                    // Send notification if status changed to Resolved or Dismissed
                    if ((updatedComplaint.Status == ComplaintStatus.Resolved || updatedComplaint.Status == ComplaintStatus.Dismissed) 
                        && oldStatus != updatedComplaint.Status)
                    {
                        var statusText = updatedComplaint.Status == ComplaintStatus.Resolved ? "Resolved" : "Dismissed";
                        var notification = new Notification(updatingComplaint.ComplainantId, "Case Closed", $"Your case has been {statusText}: {updatingComplaint.Title}");
                        notification.SetRelatedEntity(RelatedEntityType.Complaint, updatingComplaint.Id, $"/dashboard/case-details/{updatingComplaint.Id}");
                        await factory.GetNotificationRepository().CreateAsync(notification);
                        
                        var notificationContract = new App.API.Contracts.Notifications.Notification
                        {
                            UserId = updatingComplaint.ComplainantId,
                            Title = "Case Closed",
                            Message = $"Your case has been {statusText}: {updatingComplaint.Title}",
                            RelatedEntityType = RelatedEntityType.Complaint.ToString(),
                            RelatedEntityId = updatingComplaint.Id,
                            ActionUrl = $"/dashboard/case-details/{updatingComplaint.Id}",
                            CreatedAt = DateTime.UtcNow,
                            IsRead = false
                        };
                        await _hubContext.Clients.Group($"user_{updatingComplaint.ComplainantId}").SendAsync("ReceiveNotification", notificationContract);
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

