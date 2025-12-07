using App.Core.Models;

namespace App.Models
{
    public class MeetingParticipant : IAuditableEntity
    {
        public int MeetingId { get; set; }
        public int UserId { get; set; }
        public MeetingParticipantRole Role { get; set; }
        public bool Attended { get; set; } = false;
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual Meeting Meeting { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}


