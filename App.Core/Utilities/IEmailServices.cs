namespace ManageResto.Core.Utilities
{
    public interface IEmailServices
    {
        Task SendEmailAsync(string to, string subject, string templateName, object templateData);
        Task SendPasswordResetEmailAsync(string to, string resetLink);
        Task SendRegistrationEmailAsync(string to, string userName, string verificationLink);
    }
} 