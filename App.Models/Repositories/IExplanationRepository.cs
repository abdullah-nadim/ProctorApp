using App.Core.Repositories;
using App.Models;

namespace App.Models.Repositories
{
    public interface IExplanationRepository : IRepository<Explanation>
    {
        Task<List<Explanation>> ReadManyByComplaint(int complaintId, CancellationToken cancellationToken = default);
        Task<List<Explanation>> ReadManyBySubmitter(int submitterId, CancellationToken cancellationToken = default);
    }
}

