using App.Core.Models;

namespace App.Models
{
    public class ComplaintEvidence : IAuditableEntity
    {
        internal ComplaintEvidence()
        {
            FilePath = string.Empty;
            Description = null;
            UploadedAt = DateTime.UtcNow;
        }

        public ComplaintEvidence(int complaintId, string filePath, int uploadedBy) : this()
        {
            ComplaintId = complaintId;
            FilePath = filePath;
            UploadedBy = uploadedBy;
        }

        public ComplaintEvidence Update(ComplaintEvidence updated)
        {
            Description = updated.Description;
            return this;
        }

        public int Id { get; set; }
        public int ComplaintId { get; set; }
        public string FilePath { get; set; }
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


