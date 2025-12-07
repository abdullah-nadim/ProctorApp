using App.Models;
using App.Models.Repositories;
using App.Repositories;
using Microsoft.Extensions.Logging;

namespace App.Services
{
    public class CaseAssignmentServices : BaseServices
    {
        private readonly ILogger<CaseAssignmentServices> _logger;

        public CaseAssignmentServices(DatabaseContext context, ILogger<CaseAssignmentServices> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<int> CreateCaseAssignment(CaseAssignment assignment)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                await factory.GetCaseAssignmentRepository().CreateAsync(assignment);
                factory.Commit();
                return assignment.Id;
            }
        }

        public async Task UpdateCaseAssignment(CaseAssignment updatedAssignment)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                ICaseAssignmentRepository repository = factory.GetCaseAssignmentRepository();
                CaseAssignment updatingAssignment = await repository.ReadAsync(updatedAssignment.Id);
                if (updatingAssignment != null)
                {
                    updatingAssignment.Update(updatedAssignment);
                    repository.Update(updatingAssignment);
                    factory.Commit();
                }
            }
        }

        public async Task<CaseAssignment?> GetCaseAssignmentById(int id)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetCaseAssignmentRepository().ReadAsync(id);
            }
        }

        public async Task<List<CaseAssignment>> GetCaseAssignmentsByAssignee(int assigneeId)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetCaseAssignmentRepository().ReadManyByAssignee(assigneeId);
            }
        }

        public async Task<List<CaseAssignment>> GetCaseAssignmentsByComplaint(int complaintId)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetCaseAssignmentRepository().ReadManyByComplaint(complaintId);
            }
        }
    }
}

