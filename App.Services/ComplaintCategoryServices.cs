using App.Models;
using App.Models.Repositories;
using App.Repositories;
using Microsoft.Extensions.Logging;

namespace App.Services
{
    public class ComplaintCategoryServices : BaseServices
    {
        private readonly ILogger<ComplaintCategoryServices> _logger;

        public ComplaintCategoryServices(DatabaseContext context, ILogger<ComplaintCategoryServices> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<int> CreateComplaintCategory(ComplaintCategory category)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                await factory.GetComplaintCategoryRepository().CreateAsync(category);
                factory.Commit();
                return category.Id;
            }
        }

        public async Task UpdateComplaintCategory(ComplaintCategory updatedCategory)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                IComplaintCategoryRepository repository = factory.GetComplaintCategoryRepository();
                ComplaintCategory updatingCategory = await repository.ReadAsync(updatedCategory.Id);
                if (updatingCategory != null)
                {
                    updatingCategory.Update(updatedCategory);
                    repository.Update(updatingCategory);
                    factory.Commit();
                }
            }
        }

        public async Task<ComplaintCategory?> GetComplaintCategoryById(int id)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetComplaintCategoryRepository().ReadAsync(id);
            }
        }

        public async Task<List<ComplaintCategory>> GetAllComplaintCategories()
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetComplaintCategoryRepository().ReadManyAsync();
            }
        }
    }
}

