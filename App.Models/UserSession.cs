using App.Core.Models;

namespace App.Models
{
    public class UserSession : IAuditableEntity
    {
        internal UserSession()
        {
            SessionKey = string.Empty;
            IsActive = true;
        }

        public UserSession(string sessionKey, int userId) : this()
        {
            SessionKey = sessionKey;
            UserId = userId;
        }

        public UserSession SetActive(bool isActive)
        {
            IsActive = isActive;
            return this;
        }

        public string SessionKey { get; set; }
        public int UserId { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation property
        public virtual User User { get; set; } = null!;
    }
} 