using App.Models;
using App.Models.Repositories;

namespace App.Repositories
{
    public class RoleRepository : Repository<Role>, IRoleRepository
    {
        public RoleRepository(DatabaseContext context) : base(context) { }

        public async Task<Role?> ReadByName(string name, CancellationToken cancellationToken = default)
        {
            return await ReadAsync(r => r.Name == name, cancellationToken);
        }
    }
}

