using App.Core.Models;

namespace App.Models
{
    public class CaseFileDocument : IAuditableEntity
    {
        public int Id { get; set; }
        public int CaseFileId { get; set; }
        public string DocumentPath { get; set; } = string.Empty;
        public string DocumentType { get; set; } = string.Empty;
        public DateTime UploadedAt { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual CaseFile CaseFile { get; set; } = null!;
    }
}


