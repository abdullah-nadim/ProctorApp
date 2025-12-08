using App.Core.Repositories;
using App.Models;

namespace App.Models.Repositories
{
    public interface IMeetingRepository : IRepository<Meeting>
    {
        Task<List<Meeting>> ReadManyByComplaint(int complaintId, CancellationToken cancellationToken = default);
        Task<List<Meeting>> ReadManyByScheduler(int schedulerId, CancellationToken cancellationToken = default);
        Task<List<Meeting>> ReadManyByStatus(MeetingStatus status, CancellationToken cancellationToken = default);
        Task<List<Meeting>> ReadManyByComplaintIds(List<int> complaintIds, CancellationToken cancellationToken = default);
        Task<List<Meeting>> ReadManyByParticipant(int userId, CancellationToken cancellationToken = default);
    }
}

