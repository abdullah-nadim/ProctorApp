using App.Core.Models;
using App.Models;
using App.Models.Repositories;
using App.Repositories;
using Microsoft.EntityFrameworkCore;

namespace App.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(DatabaseContext context) : base(context)
        {
        }

        public User? Read(string email)
        {
            return Read(u => u.Email == email);
        }

        public async Task<User?> ReadAsync(string email, CancellationToken cancellationToken = default)
        {
            return await ReadAsync(u => u.Email == email, cancellationToken);
        }

        public bool Exists(string email)
        {
            return Count(u => u.Email == email) > 0;
        }

        public async Task<bool> ExistsAsync(string email, CancellationToken cancellationToken = default)
        {
            return await CountAsync(u => u.Email == email, cancellationToken) > 0;
        }
    }
} 