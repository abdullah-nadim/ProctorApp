using App.Core.Repositories;

namespace App.Models.Repositories
{
    public interface IRepositoryFactory : IRepositorySession
    {
        // Users
        IUserRepository GetUserRepository();
        IUserSessionRepository GetUserSessionRepository();
        IRoleRepository GetRoleRepository();

        // Complaints
        IComplaintRepository GetComplaintRepository();
        IComplaintCategoryRepository GetComplaintCategoryRepository();
        IComplaintEvidenceRepository GetComplaintEvidenceRepository();

        // Cases
        ICaseAssignmentRepository GetCaseAssignmentRepository();
        ICaseFileRepository GetCaseFileRepository();
        ICaseFileDocumentRepository GetCaseFileDocumentRepository();

        // Explanations
        IExplanationRepository GetExplanationRepository();

        // Meetings
        IMeetingRepository GetMeetingRepository();
        IMeetingParticipantRepository GetMeetingParticipantRepository();

        // Notifications
        INotificationRepository GetNotificationRepository();

        // Audit Logs
        IAuditLogRepository GetAuditLogRepository();
    }
} 