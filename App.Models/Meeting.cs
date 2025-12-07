using App.Core.Models;

namespace App.Models
{
    public class Meeting : IAuditableEntity
    {
        internal Meeting()
        {
            Location = string.Empty;
            Agenda = Outcome = null;
            DurationMinutes = 30;
            Status = MeetingStatus.Scheduled;
            Participants = new List<MeetingParticipant>();
        }

        public Meeting(int complaintId, int scheduledBy, DateTime scheduledAt, string location) : this()
        {
            ComplaintId = complaintId;
            ScheduledBy = scheduledBy;
            ScheduledAt = scheduledAt;
            Location = location;
        }

        public Meeting Update(Meeting updated)
        {
            ScheduledAt = updated.ScheduledAt;
            DurationMinutes = updated.DurationMinutes;
            Location = updated.Location;
            Agenda = updated.Agenda;
            return this;
        }

        public Meeting UpdateStatus(MeetingStatus status)
        {
            Status = status;
            return this;
        }

        public Meeting SetOutcome(string outcome)
        {
            Outcome = outcome;
            return this;
        }

        public int Id { get; set; }
        public int ComplaintId { get; set; }
        public int ScheduledBy { get; set; }
        public DateTime ScheduledAt { get; set; }
        public int DurationMinutes { get; set; }
        public string Location { get; set; }
        public string? Agenda { get; set; }
        public MeetingStatus Status { get; set; }
        public string? Outcome { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual Complaint Complaint { get; set; } = null!;
        public virtual User Scheduler { get; set; } = null!;
        public virtual ICollection<MeetingParticipant> Participants { get; set; }
    }
}


