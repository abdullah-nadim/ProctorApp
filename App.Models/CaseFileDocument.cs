using App.Core.Models;

namespace App.Models
{
    public class CaseFileDocument : IAuditableEntity
    {
        internal CaseFileDocument()
        {
            DocumentPath = DocumentType = string.Empty;
            UploadedAt = DateTime.UtcNow;
        }

        public CaseFileDocument(int caseFileId, string documentPath, string documentType) : this()
        {
            CaseFileId = caseFileId;
            DocumentPath = documentPath;
            DocumentType = documentType;
        }

        public int Id { get; set; }
        public int CaseFileId { get; set; }
        public string DocumentPath { get; set; }
        public string DocumentType { get; set; }
        public DateTime UploadedAt { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual CaseFile CaseFile { get; set; } = null!;
    }
}


