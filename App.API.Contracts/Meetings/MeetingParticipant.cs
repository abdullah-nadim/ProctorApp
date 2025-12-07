using M = App.Models;

namespace App.API.Contracts.Meetings
{
    public class MeetingParticipant : BaseContract<MeetingParticipant, M.MeetingParticipant>
    {
        public MeetingParticipant()
        {
            MeetingId = UserId = 0;
            Role = "Other";
            Attended = false;
        }

        public int MeetingId { get; set; }
        public int UserId { get; set; }
        public string Role { get; set; }
        public bool Attended { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        public Meeting? Meeting { get; set; }
        public User? User { get; set; }
    }
}

