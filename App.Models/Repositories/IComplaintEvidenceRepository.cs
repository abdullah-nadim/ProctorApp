using App.Core.Repositories;
using App.Models;

namespace App.Models.Repositories
{
    public interface IComplaintEvidenceRepository : IRepository<ComplaintEvidence>
    {
        Task<List<ComplaintEvidence>> ReadManyByComplaint(int complaintId, CancellationToken cancellationToken = default);
    }
}

