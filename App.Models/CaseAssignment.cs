using App.Core.Models;

namespace App.Models
{
    public class CaseAssignment : IAuditableEntity
    {
        internal CaseAssignment()
        {
            Notes = null;
            Status = CaseAssignmentStatus.Pending;
            AssignedAt = DateTime.UtcNow;
        }

        public CaseAssignment(int complaintId, int assignedTo, int assignedBy) : this()
        {
            ComplaintId = complaintId;
            AssignedTo = assignedTo;
            AssignedBy = assignedBy;
        }

        public CaseAssignment Update(CaseAssignment updated)
        {
            Deadline = updated.Deadline;
            Notes = updated.Notes;
            return this;
        }

        public CaseAssignment UpdateStatus(CaseAssignmentStatus status)
        {
            Status = status;
            return this;
        }

        public int Id { get; set; }
        public int ComplaintId { get; set; }
        public int AssignedTo { get; set; }
        public int AssignedBy { get; set; }
        public DateTime AssignedAt { get; set; }
        public DateTime? Deadline { get; set; }
        public CaseAssignmentStatus Status { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual Complaint Complaint { get; set; } = null!;
        public virtual User Assignee { get; set; } = null!;
        public virtual User Assigner { get; set; } = null!;
    }
}


