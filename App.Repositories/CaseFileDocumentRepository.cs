using App.Models;
using App.Models.Repositories;

namespace App.Repositories
{
    public class CaseFileDocumentRepository : Repository<CaseFileDocument>, ICaseFileDocumentRepository
    {
        public CaseFileDocumentRepository(DatabaseContext context) : base(context) { }

        public async Task<List<CaseFileDocument>> ReadManyByCaseFile(int caseFileId, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(cfd => cfd.CaseFileId == caseFileId, cancellationToken);
        }
    }
}

