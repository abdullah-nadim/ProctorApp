using App.Core.Repositories;
using App.Models;

namespace App.Models.Repositories
{
    public interface ICaseFileRepository : IRepository<CaseFile>
    {
        Task<List<CaseFile>> ReadManyByComplaint(int complaintId, CancellationToken cancellationToken = default);
        Task<List<CaseFile>> ReadManyByPreparer(int preparerId, CancellationToken cancellationToken = default);
    }
}

