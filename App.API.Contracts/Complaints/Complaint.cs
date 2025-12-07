using App.API.Contracts.Cases;
using App.API.Contracts.Explanations;
using App.API.Contracts.Meetings;
using M = App.Models;

namespace App.API.Contracts.Complaints
{
    public class Complaint : BaseContract<Complaint, M.Complaint>
    {
        public Complaint()
        {
            Id = 0;
            Title = Description = Location = string.Empty;
            ComplainantName = ComplainantDetails = ComplainantStudentId = null;
            AccusedName = AccusedDetails = null;
            Status = "Pending";
            Priority = "Medium";
            ComplaintDate = DateTime.UtcNow;
            Evidence = new List<ComplaintEvidence>();
            CaseAssignments = new List<CaseAssignment>();
            Explanations = new List<Explanation>();
            CaseFiles = new List<CaseFile>();
            Meetings = new List<Meeting>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime ComplaintDate { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        
        public int ComplainantId { get; set; }
        public string? ComplainantName { get; set; }
        public string? ComplainantDetails { get; set; }
        public string? ComplainantStudentId { get; set; }
        
        public int? AccusedStudentId { get; set; }
        public string? AccusedName { get; set; }
        public string? AccusedDetails { get; set; }
        public int? CategoryId { get; set; }
        public string Location { get; set; }
        public DateTime? IncidentDate { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        public User? Complainant { get; set; }
        public ComplaintCategory? Category { get; set; }
        public List<ComplaintEvidence> Evidence { get; set; }
        public List<CaseAssignment> CaseAssignments { get; set; }
        public List<Explanation> Explanations { get; set; }
        public List<CaseFile> CaseFiles { get; set; }
        public List<Meeting> Meetings { get; set; }
    }
}

