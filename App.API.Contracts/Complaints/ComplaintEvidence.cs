using M = App.Models;

namespace App.API.Contracts.Complaints
{
    public class ComplaintEvidence : BaseContract<ComplaintEvidence, M.ComplaintEvidence>
    {
        public ComplaintEvidence()
        {
            Id = 0;
            FilePath = string.Empty;
            Description = null;
            UploadedAt = DateTime.UtcNow;
        }

        public int Id { get; set; }
        public int ComplaintId { get; set; }
        public string FilePath { get; set; }
        public int UploadedBy { get; set; }
        public DateTime UploadedAt { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        public User? Uploader { get; set; }
    }
}

