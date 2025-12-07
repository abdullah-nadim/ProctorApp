using App.Core.Repositories;
using App.Models;

namespace App.Models.Repositories
{
    public interface ICaseAssignmentRepository : IRepository<CaseAssignment>
    {
        Task<List<CaseAssignment>> ReadManyByAssignee(int assigneeId, CancellationToken cancellationToken = default);
        Task<List<CaseAssignment>> ReadManyByComplaint(int complaintId, CancellationToken cancellationToken = default);
        Task<List<CaseAssignment>> ReadManyByStatus(CaseAssignmentStatus status, CancellationToken cancellationToken = default);
    }
}

