using App.Core.Models;

namespace App.Models
{
    public class Complaint : IAuditableEntity
    {
        internal Complaint()
        {
            Title = Description = Location = string.Empty;
            ComplainantName = ComplainantDetails = ComplainantStudentId = null;
            AccusedName = AccusedDetails = null;
            Status = ComplaintStatus.Pending;
            Priority = Priority.Medium;
            ComplaintDate = DateTime.UtcNow;
            Evidence = new List<ComplaintEvidence>();
            CaseAssignments = new List<CaseAssignment>();
            Explanations = new List<Explanation>();
            CaseFiles = new List<CaseFile>();
            Meetings = new List<Meeting>();
        }

        public Complaint(string title, string description, int complainantId) : this()
        {
            Title = title;
            Description = description;
            ComplainantId = complainantId;
        }

        public Complaint Update(Complaint updated)
        {
            Title = updated.Title;
            Description = updated.Description;
            CategoryId = updated.CategoryId;
            Location = updated.Location;
            IncidentDate = updated.IncidentDate;
            AccusedStudentId = updated.AccusedStudentId;
            AccusedName = updated.AccusedName;
            AccusedDetails = updated.AccusedDetails;
            Priority = updated.Priority;
            Status = updated.Status;
            return this;
        }

        public Complaint UpdateStatus(ComplaintStatus status)
        {
            Status = status;
            return this;
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime ComplaintDate { get; set; }
        public ComplaintStatus Status { get; set; }
        public Priority Priority { get; set; }
        
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

        // Navigation properties
        public virtual User Complainant { get; set; } = null!;
        public virtual ComplaintCategory? Category { get; set; }
        public virtual ICollection<ComplaintEvidence> Evidence { get; set; }
        public virtual ICollection<CaseAssignment> CaseAssignments { get; set; }
        public virtual ICollection<Explanation> Explanations { get; set; }
        public virtual ICollection<CaseFile> CaseFiles { get; set; }
        public virtual ICollection<Meeting> Meetings { get; set; }
    }
}


