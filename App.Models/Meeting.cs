using App.Core.Models;

namespace App.Models
{
    public class Meeting : IAuditableEntity
    {
        public int Id { get; set; }
        public int ComplaintId { get; set; }
        public int ScheduledBy { get; set; }
        public DateTime ScheduledAt { get; set; }
        public int DurationMinutes { get; set; } = 30;
        public string Location { get; set; } = string.Empty;
        public string? Agenda { get; set; }
        public MeetingStatus Status { get; set; } = MeetingStatus.Scheduled;
        public string? Outcome { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual Complaint Complaint { get; set; } = null!;
        public virtual User Scheduler { get; set; } = null!;
        public virtual ICollection<MeetingParticipant> Participants { get; set; } = new List<MeetingParticipant>();
    }
}


