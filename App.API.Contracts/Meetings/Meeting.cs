using App.API.Contracts.Complaints;
using M = App.Models;

namespace App.API.Contracts.Meetings
{
    public class Meeting : BaseContract<Meeting, M.Meeting>
    {
        public Meeting()
        {
            Id = 0;
            Location = string.Empty;
            Agenda = Outcome = Notes = null;
            DurationMinutes = 30;
            Status = "Scheduled";
            Participants = new List<MeetingParticipant>();
        }

        public int Id { get; set; }
        public int ComplaintId { get; set; }
        public int ScheduledBy { get; set; }
        public DateTime ScheduledAt { get; set; }
        public int DurationMinutes { get; set; }
        public string Location { get; set; }
        public string? Agenda { get; set; }
        public string? Notes { get; set; }
        public string Status { get; set; }
        public string? Outcome { get; set; }

        public Complaint? Complaint { get; set; }
        public User? Scheduler { get; set; }
        public List<MeetingParticipant> Participants { get; set; }
    }
}

