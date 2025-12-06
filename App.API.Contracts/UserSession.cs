using App.Core.Models;

namespace App.API.Contracts
{
    public class UserSession : IAuditableEntity
    {
        public string SessionKey { get; set; } = string.Empty;
        public long UserId { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
} 