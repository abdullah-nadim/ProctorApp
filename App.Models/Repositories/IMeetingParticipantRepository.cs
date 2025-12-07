using App.Core.Repositories;
using App.Models;

namespace App.Models.Repositories
{
    public interface IMeetingParticipantRepository : IRepository<MeetingParticipant>
    {
        Task<List<MeetingParticipant>> ReadManyByMeeting(int meetingId, CancellationToken cancellationToken = default);
        Task<List<MeetingParticipant>> ReadManyByUser(int userId, CancellationToken cancellationToken = default);
    }
}

