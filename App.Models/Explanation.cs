using App.Core.Models;

namespace App.Models
{
    public class Explanation : IAuditableEntity
    {
        public int Id { get; set; }
        public int ComplaintId { get; set; }
        public int SubmittedBy { get; set; }
        public string ExplanationText { get; set; } = string.Empty;
        public DateTime SubmittedAt { get; set; }
        public bool IsComplainant { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual Complaint Complaint { get; set; } = null!;
        public virtual User Submitter { get; set; } = null!;
    }
}


