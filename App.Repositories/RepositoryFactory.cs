using App.Models.Repositories;

namespace App.Repositories
{
    public class RepositoryFactory : IRepositoryFactory, IDisposable
    {
        public RepositoryFactory(DatabaseContext context)
        {
            _Context = context;
        }

        // Users
        public IUserRepository GetUserRepository() => new UserRepository(_Context);
        public IUserSessionRepository GetUserSessionRepository() => new UserSessionRepository(_Context);
        public IRoleRepository GetRoleRepository() => new RoleRepository(_Context);

        // Complaints
        public IComplaintRepository GetComplaintRepository() => new ComplaintRepository(_Context);
        public IComplaintCategoryRepository GetComplaintCategoryRepository() => new ComplaintCategoryRepository(_Context);
        public IComplaintEvidenceRepository GetComplaintEvidenceRepository() => new ComplaintEvidenceRepository(_Context);

        // Cases
        public ICaseAssignmentRepository GetCaseAssignmentRepository() => new CaseAssignmentRepository(_Context);
        public ICaseFileRepository GetCaseFileRepository() => new CaseFileRepository(_Context);
        public ICaseFileDocumentRepository GetCaseFileDocumentRepository() => new CaseFileDocumentRepository(_Context);

        // Explanations
        public IExplanationRepository GetExplanationRepository() => new ExplanationRepository(_Context);

        // Meetings
        public IMeetingRepository GetMeetingRepository() => new MeetingRepository(_Context);
        public IMeetingParticipantRepository GetMeetingParticipantRepository() => new MeetingParticipantRepository(_Context);

        // Notifications
        public INotificationRepository GetNotificationRepository() => new NotificationRepository(_Context);

        // Audit Logs
        public IAuditLogRepository GetAuditLogRepository() => new AuditLogRepository(_Context);

        public int Commit()
        {
            return _Context.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            _Context.SaveChanges();
        }

        private DatabaseContext _Context;
    }
} 