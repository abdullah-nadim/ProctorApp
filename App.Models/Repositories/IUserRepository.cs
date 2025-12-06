using App.Core.Repositories;
using App.Models;

namespace App.Models.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        User? Read(string email);
        Task<User?> ReadAsync(string email, CancellationToken cancellationToken = default);
        bool Exists(string email);
        Task<bool> ExistsAsync(string email, CancellationToken cancellationToken = default);
    }
} 