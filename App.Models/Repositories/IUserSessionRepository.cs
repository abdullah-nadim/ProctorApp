using App.Core.Repositories;
using App.Models;

namespace App.Models.Repositories
{
    public interface IUserSessionRepository : IRepository<UserSession>
    {
        UserSession? Read(string sessionKey);
        Task<UserSession?> ReadAsync(string sessionKey, CancellationToken cancellationToken = default);
    }
} 