using App.Models;
using App.Models.Repositories;
using App.Repositories;
using Microsoft.Extensions.Logging;

namespace App.Services
{
    public class ComplaintServices : BaseServices
    {
        private readonly ILogger<ComplaintServices> _logger;

        public ComplaintServices(DatabaseContext context, ILogger<ComplaintServices> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<int> CreateComplaint(Complaint complaint)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                await factory.GetComplaintRepository().CreateAsync(complaint);
                factory.Commit();
                return complaint.Id;
            }
        }

        public async Task UpdateComplaint(Complaint updatedComplaint)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                IComplaintRepository repository = factory.GetComplaintRepository();
                Complaint updatingComplaint = await repository.ReadAsync(updatedComplaint.Id);
                if (updatingComplaint != null)
                {
                    updatingComplaint.Update(updatedComplaint);
                    repository.Update(updatingComplaint);
                    factory.Commit();
                }
            }
        }

        public async Task<Complaint?> GetComplaintById(int id)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetComplaintRepository().ReadAsync(id);
            }
        }

        public async Task<List<Complaint>> GetAllComplaints()
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetComplaintRepository().ReadManyAsync();
            }
        }

        public async Task<List<Complaint>> GetComplaintsByComplainant(int complainantId)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetComplaintRepository().ReadManyByComplainant(complainantId);
            }
        }

        public async Task<List<Complaint>> GetComplaintsByStatus(ComplaintStatus status)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetComplaintRepository().ReadManyByStatus(status);
            }
        }
    }
}

