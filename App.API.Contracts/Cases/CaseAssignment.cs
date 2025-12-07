using App.API.Contracts.Complaints;
using M = App.Models;

namespace App.API.Contracts.Cases
{
    public class CaseAssignment : BaseContract<CaseAssignment, M.CaseAssignment>
    {
        public CaseAssignment()
        {
            Id = 0;
            Notes = null;
            Status = "Pending";
            AssignedAt = DateTime.UtcNow;
        }

        public int Id { get; set; }
        public int ComplaintId { get; set; }
        public int AssignedTo { get; set; }
        public int AssignedBy { get; set; }
        public DateTime AssignedAt { get; set; }
        public DateTime? Deadline { get; set; }
        public string Status { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        public Complaint? Complaint { get; set; }
        public User? Assignee { get; set; }
        public User? Assigner { get; set; }
    }
}

