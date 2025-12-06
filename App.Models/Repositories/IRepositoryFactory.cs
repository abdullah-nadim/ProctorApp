using App.Core.Repositories;

namespace App.Models.Repositories
{
    public interface IRepositoryFactory : IRepositorySession
    {
        IUserRepository GetUserRepository();
        IUserSessionRepository GetUserSessionRepository();
    }
} 