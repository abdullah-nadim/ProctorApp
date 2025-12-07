using App.Models;
using App.Models.Repositories;

namespace App.Repositories
{
    public class CaseAssignmentRepository : Repository<CaseAssignment>, ICaseAssignmentRepository
    {
        public CaseAssignmentRepository(DatabaseContext context) : base(context) { }

        public async Task<List<CaseAssignment>> ReadManyByAssignee(int assigneeId, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(ca => ca.AssignedTo == assigneeId, cancellationToken);
        }

        public async Task<List<CaseAssignment>> ReadManyByComplaint(int complaintId, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(ca => ca.ComplaintId == complaintId, cancellationToken);
        }

        public async Task<List<CaseAssignment>> ReadManyByStatus(CaseAssignmentStatus status, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(ca => ca.Status == status, cancellationToken);
        }
    }
}

