using App.API.Contracts;

namespace App.API.Contracts.Auth
{
    public class AuthResponse
    {
        public bool Success { get; set; }
        public string? Token { get; set; }
        public string? UserType { get; set; }
        public Contracts.User? User { get; set; }
        public string[] Errors { get; set; } = Array.Empty<string>();
    }
}

