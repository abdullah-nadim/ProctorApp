using App.Core.Models;

namespace App.Models
{
    public class UserSession : IAuditableEntity
    {
        public string SessionKey { get; set; } = string.Empty;
        public int UserId { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation property
        public virtual User User { get; set; } = null!;
    }
} 