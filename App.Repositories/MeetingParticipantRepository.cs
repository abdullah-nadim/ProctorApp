using App.Models;
using App.Models.Repositories;

namespace App.Repositories
{
    public class MeetingParticipantRepository : Repository<MeetingParticipant>, IMeetingParticipantRepository
    {
        public MeetingParticipantRepository(DatabaseContext context) : base(context) { }

        public async Task<List<MeetingParticipant>> ReadManyByMeeting(int meetingId, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(mp => mp.MeetingId == meetingId, cancellationToken);
        }

        public async Task<List<MeetingParticipant>> ReadManyByUser(int userId, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(mp => mp.UserId == userId, cancellationToken);
        }
    }
}

