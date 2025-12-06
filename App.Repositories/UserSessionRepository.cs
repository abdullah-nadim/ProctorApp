using App.Models;
using App.Models.Repositories;

namespace App.Repositories
{
    public class UserSessionRepository : Repository<UserSession>, IUserSessionRepository
    {
        public UserSessionRepository(DatabaseContext context) : base(context)
        {
        }

        public UserSession? Read(string sessionKey)
        {
            return Read(us => us.SessionKey == sessionKey);
        }

        public async Task<UserSession?> ReadAsync(string sessionKey, CancellationToken cancellationToken = default)
        {
            return await ReadAsync(us => us.SessionKey == sessionKey, cancellationToken);
        }
    }
} 