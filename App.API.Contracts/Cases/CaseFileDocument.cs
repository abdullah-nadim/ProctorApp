using M = App.Models;

namespace App.API.Contracts.Cases
{
    public class CaseFileDocument : BaseContract<CaseFileDocument, M.CaseFileDocument>
    {
        public CaseFileDocument()
        {
            Id = 0;
            DocumentPath = DocumentType = string.Empty;
            UploadedAt = DateTime.UtcNow;
        }

        public int Id { get; set; }
        public int CaseFileId { get; set; }
        public string DocumentPath { get; set; }
        public string DocumentType { get; set; }
        public DateTime UploadedAt { get; set; }
    }
}

