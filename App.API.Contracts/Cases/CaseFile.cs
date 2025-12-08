using App.API.Contracts.Complaints;
using M = App.Models;

namespace App.API.Contracts.Cases
{
    public class CaseFile : BaseContract<CaseFile, M.CaseFile>
    {
        public CaseFile()
        {
            Id = 0;
            Summary = string.Empty;
            Recommendations = null;
            Status = "Draft";
            PreparedAt = DateTime.UtcNow;
            Documents = new List<CaseFileDocument>();
        }

        public int Id { get; set; }
        public int ComplaintId { get; set; }
        public int PreparedBy { get; set; }
        public DateTime PreparedAt { get; set; }
        public string Summary { get; set; }
        public string? Recommendations { get; set; }
        public string Status { get; set; }
      

        public Complaint? Complaint { get; set; }
        public User? Preparer { get; set; }
        public List<CaseFileDocument> Documents { get; set; }
    }
}

