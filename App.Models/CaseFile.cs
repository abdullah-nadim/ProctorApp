using App.Core.Models;

namespace App.Models
{
    public class CaseFile : IAuditableEntity
    {
        public int Id { get; set; }
        public int ComplaintId { get; set; }
        public int PreparedBy { get; set; }
        public DateTime PreparedAt { get; set; }
        public string Summary { get; set; } = string.Empty;
        public string? Recommendations { get; set; }
        public CaseFileStatus Status { get; set; } = CaseFileStatus.Draft;
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual Complaint Complaint { get; set; } = null!;
        public virtual User Preparer { get; set; } = null!;
        public virtual ICollection<CaseFileDocument> Documents { get; set; } = new List<CaseFileDocument>();
    }
}


