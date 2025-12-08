using App.Models;
using App.Models.Repositories;
using Microsoft.EntityFrameworkCore;

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

        public async Task<List<Meeting>> ReadManyByComplaintIds(List<int> complaintIds, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(m => complaintIds.Contains(m.ComplaintId), cancellationToken);
        }

        public async Task<List<Meeting>> ReadManyByParticipant(int userId, CancellationToken cancellationToken = default)
        {
            return await _Context.Set<Meeting>()
                .Include(m => m.Participants)
                .Where(m => m.Participants.Any(p => p.UserId == userId))
                .ToListAsync(cancellationToken);
        }
    }
}

