using App.Models;
using App.Models.Repositories;

namespace App.Repositories
{
    public class AuditLogRepository : Repository<AuditLog>, IAuditLogRepository
    {
        public AuditLogRepository(DatabaseContext context) : base(context) { }

        public async Task<List<AuditLog>> ReadManyByUser(int userId, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(al => al.UserId == userId, cancellationToken);
        }

        public async Task<List<AuditLog>> ReadManyByEntity(string entityType, int entityId, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(al => al.EntityType == entityType && al.EntityId == entityId, cancellationToken);
        }
    }
}

