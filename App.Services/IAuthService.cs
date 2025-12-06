using App.Models;

namespace App.Services
{
    public interface IAuthService
    {
        Task<(bool success, string[] errors)> RegisterAsync(User user, string password);
        Task<(bool success, string token, UserTypes userTypes, string[] errors)> LoginAsync(string email, string password);
        Task LogoutAsync();
    }
} 