using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ManageResto.Core.Utilities
{
    public class EmailServices : IEmailServices
    {
        private readonly SmtpClient _smtpClient;
        private readonly string _fromEmail;
        private readonly TemplateRenderer _templateRenderer;

        public EmailServices(string smtpServer, int smtpPort, string smtpUsername, string smtpPassword, string fromEmail, string templateDirectory)
        {
            _smtpClient = new SmtpClient(smtpServer, smtpPort)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(smtpUsername, smtpPassword)
            };
            _fromEmail = fromEmail;
            _templateRenderer = new TemplateRenderer(templateDirectory);
        }

        public async Task SendEmailAsync(string to, string subject, string templateName, object templateData)
        {
            try
            {
                var body = _templateRenderer.RenderTemplate(templateName, templateData);
                var message = new MailMessage
                {
                    From = new MailAddress(_fromEmail),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };
                message.To.Add(to);

                await _smtpClient.SendMailAsync(message);
            }
            catch (Exception ex)
            {
                // Log the exception here
                throw new Exception($"Failed to send email: {ex.Message}", ex);
            }
        }

        public async Task SendPasswordResetEmailAsync(string to, string resetLink)
        {
            var templateData = new
            {
                ResetLink = resetLink,
                Year = DateTime.Now.Year
            };

            await SendEmailAsync(
                to,
                "Reset Your Password - ManageResto",
                "ForgotPasswordTemplate.html",
                templateData
            );
        }

        public async Task SendRegistrationEmailAsync(string to, string userName, string verificationLink)
        {
            var templateData = new
            {
                UserName = userName,
                VerificationLink = verificationLink,
                Year = DateTime.Now.Year
            };

            await SendEmailAsync(
                to,
                "Welcome to ManageResto - Verify Your Email",
                "RegisterTemplate.html",
                templateData
            );
        }
    }
}
