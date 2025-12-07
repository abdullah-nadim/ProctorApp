using App.Core.Models;

namespace App.Models
{
    public class ComplaintEvidence : IAuditableEntity
    {
        public int Id { get; set; }
        public int ComplaintId { get; set; }
        public string FilePath { get; set; } = string.Empty;
        public int UploadedBy { get; set; }
        public DateTime UploadedAt { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual Complaint Complaint { get; set; } = null!;
        public virtual User Uploader { get; set; } = null!;
    }
}


