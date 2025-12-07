namespace App.API.Contracts.Auth
{
    public class RegisterRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string UserType { get; set; } = "Student";
        public string? Phone { get; set; }
        public string? Department { get; set; }
        public string? OrganizationId { get; set; }
        public string? AdvisorName { get; set; }
    }
}

