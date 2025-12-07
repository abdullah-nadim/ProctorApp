using App.Core.Repositories;
using App.Models;

namespace App.Models.Repositories
{
    public interface ICaseFileDocumentRepository : IRepository<CaseFileDocument>
    {
        Task<List<CaseFileDocument>> ReadManyByCaseFile(int caseFileId, CancellationToken cancellationToken = default);
    }
}

