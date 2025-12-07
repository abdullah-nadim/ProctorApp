using App.Models;
using App.Models.Repositories;

namespace App.Repositories
{
    public class ComplaintRepository : Repository<Complaint>, IComplaintRepository
    {
        public ComplaintRepository(DatabaseContext context) : base(context) { }

        public async Task<List<Complaint>> ReadManyByComplainant(int complainantId, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(c => c.ComplainantId == complainantId, cancellationToken);
        }

        public async Task<List<Complaint>> ReadManyByStatus(ComplaintStatus status, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(c => c.Status == status, cancellationToken);
        }

        public async Task<List<Complaint>> ReadManyByCategory(int categoryId, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(c => c.CategoryId == categoryId, cancellationToken);
        }
    }
}

