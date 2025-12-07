using App.Core.Repositories;
using App.Models;

namespace App.Models.Repositories
{
    public interface IRoleRepository : IRepository<Role>
    {
        Task<Role?> ReadByName(string name, CancellationToken cancellationToken = default);
    }
}

