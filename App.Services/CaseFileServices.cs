using App.Models;
using App.Models.Repositories;
using App.Repositories;
using Microsoft.Extensions.Logging;

namespace App.Services
{
    public class CaseFileServices : BaseServices
    {
        private readonly ILogger<CaseFileServices> _logger;

        public CaseFileServices(DatabaseContext context, ILogger<CaseFileServices> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<int> CreateCaseFile(CaseFile caseFile)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                await factory.GetCaseFileRepository().CreateAsync(caseFile);
                factory.Commit();
                return caseFile.Id;
            }
        }

        public async Task UpdateCaseFile(CaseFile updatedCaseFile)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                ICaseFileRepository repository = factory.GetCaseFileRepository();
                CaseFile updatingCaseFile = await repository.ReadAsync(updatedCaseFile.Id);
                if (updatingCaseFile != null)
                {
                    updatingCaseFile.Update(updatedCaseFile);
                    repository.Update(updatingCaseFile);
                    factory.Commit();
                }
            }
        }

        public async Task<CaseFile?> GetCaseFileById(int id)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetCaseFileRepository().ReadAsync(id);
            }
        }

        public async Task<List<CaseFile>> GetCaseFilesByComplaint(int complaintId)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetCaseFileRepository().ReadManyByComplaint(complaintId);
            }
        }
    }
}

