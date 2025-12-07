using App.Models;
using App.Models.Repositories;

namespace App.Repositories
{
    public class CaseFileRepository : Repository<CaseFile>, ICaseFileRepository
    {
        public CaseFileRepository(DatabaseContext context) : base(context) { }

        public async Task<List<CaseFile>> ReadManyByComplaint(int complaintId, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(cf => cf.ComplaintId == complaintId, cancellationToken);
        }

        public async Task<List<CaseFile>> ReadManyByPreparer(int preparerId, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(cf => cf.PreparedBy == preparerId, cancellationToken);
        }
    }
}

