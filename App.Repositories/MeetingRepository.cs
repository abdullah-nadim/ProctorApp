using App.Models;
using App.Models.Repositories;

namespace App.Repositories
{
    public class MeetingRepository : Repository<Meeting>, IMeetingRepository
    {
        public MeetingRepository(DatabaseContext context) : base(context) { }

        public async Task<List<Meeting>> ReadManyByComplaint(int complaintId, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(m => m.ComplaintId == complaintId, cancellationToken);
        }

        public async Task<List<Meeting>> ReadManyByScheduler(int schedulerId, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(m => m.ScheduledBy == schedulerId, cancellationToken);
        }

        public async Task<List<Meeting>> ReadManyByStatus(MeetingStatus status, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(m => m.Status == status, cancellationToken);
        }
    }
}

