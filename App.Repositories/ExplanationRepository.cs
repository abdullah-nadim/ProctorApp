using App.Models;
using App.Models.Repositories;

namespace App.Repositories
{
    public class ExplanationRepository : Repository<Explanation>, IExplanationRepository
    {
        public ExplanationRepository(DatabaseContext context) : base(context) { }

        public async Task<List<Explanation>> ReadManyByComplaint(int complaintId, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(e => e.ComplaintId == complaintId, cancellationToken);
        }

        public async Task<List<Explanation>> ReadManyBySubmitter(int submitterId, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(e => e.SubmittedBy == submitterId, cancellationToken);
        }
    }
}

