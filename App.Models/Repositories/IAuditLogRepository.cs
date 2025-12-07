using App.Core.Repositories;
using App.Models;

namespace App.Models.Repositories
{
    public interface IAuditLogRepository : IRepository<AuditLog>
    {
        Task<List<AuditLog>> ReadManyByUser(int userId, CancellationToken cancellationToken = default);
        Task<List<AuditLog>> ReadManyByEntity(string entityType, int entityId, CancellationToken cancellationToken = default);
    }
}

