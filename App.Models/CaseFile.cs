using App.Core.Models;

namespace App.Models
{
    public class CaseFile : IAuditableEntity
    {
        internal CaseFile()
        {
            Summary = string.Empty;
            Recommendations = null;
            Status = CaseFileStatus.Draft;
            PreparedAt = DateTime.UtcNow;
            Documents = new List<CaseFileDocument>();
        }

        public CaseFile(int complaintId, int preparedBy, string summary) : this()
        {
            ComplaintId = complaintId;
            PreparedBy = preparedBy;
            Summary = summary;
        }

        public CaseFile Update(CaseFile updated)
        {
            Summary = updated.Summary;
            Recommendations = updated.Recommendations;
            return this;
        }

        public CaseFile UpdateStatus(CaseFileStatus status)
        {
            Status = status;
            return this;
        }

        public int Id { get; set; }
        public int ComplaintId { get; set; }
        public int PreparedBy { get; set; }
        public DateTime PreparedAt { get; set; }
        public string Summary { get; set; }
        public string? Recommendations { get; set; }
        public CaseFileStatus Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual Complaint Complaint { get; set; } = null!;
        public virtual User Preparer { get; set; } = null!;
        public virtual ICollection<CaseFileDocument> Documents { get; set; }
    }
}


