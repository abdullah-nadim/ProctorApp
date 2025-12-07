using App.Core.Models;
using Microsoft.AspNetCore.Identity;

namespace App.Models
{
    public class User : IdentityUser<int>, IAuditableEntity
    {
        internal User() : base() 
        {
            FullName = string.Empty;
            OrganizationId = Phone = Department = AdvisorName = null;
            IsActive = true;
            UserSessions = new List<UserSession>();
            ComplaintsAsComplainant = new List<Complaint>();
            EvidenceUploads = new List<ComplaintEvidence>();
            AssignedCases = new List<CaseAssignment>();
            CaseAssignmentsMade = new List<CaseAssignment>();
            Explanations = new List<Explanation>();
            CaseFiles = new List<CaseFile>();
            ScheduledMeetings = new List<Meeting>();
            MeetingParticipants = new List<MeetingParticipant>();
            Notifications = new List<Notification>();
            AuditLogs = new List<AuditLog>();
        }
        
        public User(string email, UserTypes types) : this()
        {
            Email = email;
            UserName = email;
            UserType = types;
        }

        public User Update(User updated)
        {
            FullName = updated.FullName;
            Phone = updated.Phone;
            Department = updated.Department;
            AdvisorName = updated.AdvisorName;
            RoleId = updated.RoleId;
            OrganizationId = updated.OrganizationId;
            return this;
        }

        public User SetActive(bool isActive)
        {
            IsActive = isActive;
            return this;
        }

        public string FullName { get; set; }
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
        public virtual ICollection<UserSession> UserSessions { get; set; }
        public virtual ICollection<Complaint> ComplaintsAsComplainant { get; set; }
        public virtual ICollection<ComplaintEvidence> EvidenceUploads { get; set; }
        public virtual ICollection<CaseAssignment> AssignedCases { get; set; }
        public virtual ICollection<CaseAssignment> CaseAssignmentsMade { get; set; }
        public virtual ICollection<Explanation> Explanations { get; set; }
        public virtual ICollection<CaseFile> CaseFiles { get; set; }
        public virtual ICollection<Meeting> ScheduledMeetings { get; set; }
        public virtual ICollection<MeetingParticipant> MeetingParticipants { get; set; }
        public virtual ICollection<Notification> Notifications { get; set; }
        public virtual ICollection<AuditLog> AuditLogs { get; set; }
    }
} 