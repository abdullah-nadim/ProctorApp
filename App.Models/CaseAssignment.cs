using App.Core.Models;

namespace App.Models
{
    public class CaseAssignment : IAuditableEntity
    {
        public int Id { get; set; }
        public int ComplaintId { get; set; }
        public int AssignedTo { get; set; }
        public int AssignedBy { get; set; }
        public DateTime AssignedAt { get; set; }
        public DateTime? Deadline { get; set; }
        public CaseAssignmentStatus Status { get; set; } = CaseAssignmentStatus.Pending;
        public string? Notes { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual Complaint Complaint { get; set; } = null!;
        public virtual User Assignee { get; set; } = null!;
        public virtual User Assigner { get; set; } = null!;
    }
}


