using App.Core.Models;

namespace App.Models
{
    public class Complaint : IAuditableEntity
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime ComplaintDate { get; set; }
        public ComplaintStatus Status { get; set; } = ComplaintStatus.Pending;
        public Priority Priority { get; set; } = Priority.Medium;
        
        public int ComplainantId { get; set; }
        public string? ComplainantName { get; set; }
        public string? ComplainantDetails { get; set; }
        public string? ComplainantStudentId { get; set; }
        
        public int? AccusedStudentId { get; set; }
        public string? AccusedName { get; set; }
        public string? AccusedDetails { get; set; }
        public int? CategoryId { get; set; }
        public string? Location { get; set; }
        public DateTime? IncidentDate { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual User Complainant { get; set; } = null!;
        public virtual ComplaintCategory? Category { get; set; }
        public virtual ICollection<ComplaintEvidence> Evidence { get; set; } = new List<ComplaintEvidence>();
        public virtual ICollection<CaseAssignment> CaseAssignments { get; set; } = new List<CaseAssignment>();
        public virtual ICollection<Explanation> Explanations { get; set; } = new List<Explanation>();
        public virtual ICollection<CaseFile> CaseFiles { get; set; } = new List<CaseFile>();
        public virtual ICollection<Meeting> Meetings { get; set; } = new List<Meeting>();
    }
}


