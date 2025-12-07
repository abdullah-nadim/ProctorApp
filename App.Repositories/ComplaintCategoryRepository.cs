using App.Models;
using App.Models.Repositories;

namespace App.Repositories
{
    public class ComplaintCategoryRepository : Repository<ComplaintCategory>, IComplaintCategoryRepository
    {
        public ComplaintCategoryRepository(DatabaseContext context) : base(context) { }
    }
}

