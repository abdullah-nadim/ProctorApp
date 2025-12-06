using System;
using System.IO;

namespace ManageResto.Core.Utilities
{
    public class EmailConfiguration
    {
        public string SmtpServer { get; set; }
        public int SmtpPort { get; set; }
        public string SmtpUsername { get; set; }
        public string SmtpPassword { get; set; }
        public string FromEmail { get; set; }
        public string TemplateDirectory { get; set; }

        public static EmailConfiguration Default => new EmailConfiguration
        {
            SmtpServer = "smtp.gmail.com",
            SmtpPort = 587,
            SmtpUsername = "your-email@gmail.com", // Replace with your email
            SmtpPassword = "your-app-password",    // Replace with your app password
            FromEmail = "your-email@gmail.com",    // Replace with your email
            TemplateDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Templates")
        };
    }
} 