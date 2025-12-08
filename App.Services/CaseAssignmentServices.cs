using App.Models;
using App.Models.Repositories;
using App.Repositories;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.SignalR;
using App.Services.Hubs;

namespace App.Services
{
    public class CaseAssignmentServices : BaseServices
    {
        private readonly ILogger<CaseAssignmentServices> _logger;
        private readonly IHubContext<NotificationHub> _hubContext;

        public CaseAssignmentServices(DatabaseContext context, ILogger<CaseAssignmentServices> logger, IHubContext<NotificationHub> hubContext) : base(context)
        {
            _logger = logger;
            _hubContext = hubContext;
        }

        public async Task<int> CreateCaseAssignment(CaseAssignment assignment)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                await factory.GetCaseAssignmentRepository().CreateAsync(assignment);
                factory.Commit();
                
                // Send notification to assignee
                var complaint = await factory.GetComplaintRepository().ReadAsync(assignment.ComplaintId);
                if (complaint != null)
                {
                    var notification = new Notification(assignment.AssignedTo, "Case Assigned", $"A new case has been assigned to you: {complaint.Title}");
                    notification.SetRelatedEntity(RelatedEntityType.Complaint, assignment.ComplaintId, $"/dashboard/case-details/{assignment.ComplaintId}");
                    await factory.GetNotificationRepository().CreateAsync(notification);
                    
                    // Send via SignalR
                    var notificationContract = new App.API.Contracts.Notifications.Notification
                    {
                        UserId = assignment.AssignedTo,
                        Title = "Case Assigned",
                        Message = $"A new case has been assigned to you: {complaint.Title}",
                        RelatedEntityType = RelatedEntityType.Complaint.ToString(),
                        RelatedEntityId = assignment.ComplaintId,
                        ActionUrl = $"/dashboard/case-details/{assignment.ComplaintId}",
                        CreatedAt = DateTime.UtcNow,
                        IsRead = false
                    };
                    await _hubContext.Clients.Group($"user_{assignment.AssignedTo}").SendAsync("ReceiveNotification", notificationContract);
                }
                
                return assignment.Id;
            }
        }

        public async Task UpdateCaseAssignment(CaseAssignment updatedAssignment)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                ICaseAssignmentRepository repository = factory.GetCaseAssignmentRepository();
                CaseAssignment updatingAssignment = await repository.ReadAsync(updatedAssignment.Id);
                if (updatingAssignment != null)
                {
                    updatingAssignment.Update(updatedAssignment);
                    repository.Update(updatingAssignment);
                    factory.Commit();
                }
            }
        }

        public async Task<CaseAssignment?> GetCaseAssignmentById(int id)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetCaseAssignmentRepository().ReadAsync(id);
            }
        }

        public async Task<List<CaseAssignment>> GetCaseAssignmentsByAssignee(int assigneeId)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetCaseAssignmentRepository().ReadManyByAssignee(assigneeId);
            }
        }

        public async Task<List<CaseAssignment>> GetCaseAssignmentsByComplaint(int complaintId)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetCaseAssignmentRepository().ReadManyByComplaint(complaintId);
            }
        }
    }
}

