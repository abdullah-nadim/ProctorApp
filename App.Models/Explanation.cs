using App.Core.Models;

namespace App.Models
{
    public class Explanation : IAuditableEntity
    {
        internal Explanation()
        {
            ExplanationText = string.Empty;
            SubmittedAt = DateTime.UtcNow;
            IsComplainant = false;
        }

        public Explanation(int complaintId, int submittedBy, string explanationText, bool isComplainant) : this()
        {
            ComplaintId = complaintId;
            SubmittedBy = submittedBy;
            ExplanationText = explanationText;
            IsComplainant = isComplainant;
        }

        public Explanation Update(Explanation updated)
        {
            ExplanationText = updated.ExplanationText;
            return this;
        }

        public int Id { get; set; }
        public int ComplaintId { get; set; }
        public int SubmittedBy { get; set; }
        public string ExplanationText { get; set; }
        public DateTime SubmittedAt { get; set; }
        public bool IsComplainant { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual Complaint Complaint { get; set; } = null!;
        public virtual User Submitter { get; set; } = null!;
    }
}


