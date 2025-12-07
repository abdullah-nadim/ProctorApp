using App.Models;
using App.Models.Repositories;

namespace App.Repositories
{
    public class ComplaintEvidenceRepository : Repository<ComplaintEvidence>, IComplaintEvidenceRepository
    {
        public ComplaintEvidenceRepository(DatabaseContext context) : base(context) { }

        public async Task<List<ComplaintEvidence>> ReadManyByComplaint(int complaintId, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(ce => ce.ComplaintId == complaintId, cancellationToken);
        }
    }
}

