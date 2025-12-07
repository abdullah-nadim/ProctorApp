using App.Core.Repositories;
using App.Models;

namespace App.Models.Repositories
{
    public interface IComplaintRepository : IRepository<Complaint>
    {
        Task<List<Complaint>> ReadManyByComplainant(int complainantId, CancellationToken cancellationToken = default);
        Task<List<Complaint>> ReadManyByStatus(ComplaintStatus status, CancellationToken cancellationToken = default);
        Task<List<Complaint>> ReadManyByCategory(int categoryId, CancellationToken cancellationToken = default);
    }
}

