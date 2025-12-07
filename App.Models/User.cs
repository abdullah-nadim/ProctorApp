using App.Core.Models;
using Microsoft.AspNetCore.Identity;

namespace App.Models
{
    public class User : IdentityUser<int>, IAuditableEntity
    {
        internal User() : base() { }
        
        public User(string email, UserTypes types) : base(email)
        {
            Email = email;
            UserType = types;
            IsActive = true;
        }

        public string FullName { get; set; } = string.Empty;
        public string? OrganizationId { get; set; }
        public string? Phone { get; set; }
        public string? Department { get; set; }
        public string? AdvisorName { get; set; }
        public int? RoleId { get; set; }
        public UserTypes UserType { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual Role? Role { get; set; }
        public virtual ICollection<UserSession> UserSessions { get; set; } = new List<UserSession>();
        public virtual ICollection<Complaint> ComplaintsAsComplainant { get; set; } = new List<Complaint>();
        public virtual ICollection<ComplaintEvidence> EvidenceUploads { get; set; } = new List<ComplaintEvidence>();
        public virtual ICollection<CaseAssignment> AssignedCases { get; set; } = new List<CaseAssignment>();
        public virtual ICollection<CaseAssignment> CaseAssignmentsMade { get; set; } = new List<CaseAssignment>();
        public virtual ICollection<Explanation> Explanations { get; set; } = new List<Explanation>();
        public virtual ICollection<CaseFile> CaseFiles { get; set; } = new List<CaseFile>();
        public virtual ICollection<Meeting> ScheduledMeetings { get; set; } = new List<Meeting>();
        public virtual ICollection<MeetingParticipant> MeetingParticipants { get; set; } = new List<MeetingParticipant>();
        public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
        public virtual ICollection<AuditLog> AuditLogs { get; set; } = new List<AuditLog>();
    }
} 