using App.Core.Models;

namespace App.Models
{
    public class MeetingParticipant : IAuditableEntity
    {
        internal MeetingParticipant()
        {
            Attended = false;
        }

        public MeetingParticipant(int meetingId, int userId, MeetingParticipantRole role) : this()
        {
            MeetingId = meetingId;
            UserId = userId;
            Role = role;
        }

        public MeetingParticipant SetAttended(bool attended)
        {
            Attended = attended;
            return this;
        }

        public int MeetingId { get; set; }
        public int UserId { get; set; }
        public MeetingParticipantRole Role { get; set; }
        public bool Attended { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual Meeting Meeting { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}


