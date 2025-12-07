using App.API.Contracts.Complaints;
using M = App.Models;

namespace App.API.Contracts.Explanations
{
    public class Explanation : BaseContract<Explanation, M.Explanation>
    {
        public Explanation()
        {
            Id = 0;
            ExplanationText = string.Empty;
            SubmittedAt = DateTime.UtcNow;
            IsComplainant = false;
        }

        public int Id { get; set; }
        public int ComplaintId { get; set; }
        public int SubmittedBy { get; set; }
        public string ExplanationText { get; set; }
        public DateTime SubmittedAt { get; set; }
        public bool IsComplainant { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        public Complaint? Complaint { get; set; }
        public User? Submitter { get; set; }
    }
}

