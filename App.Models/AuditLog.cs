using App.Core.Models;

namespace App.Models
{
    public class AuditLog : IAuditableEntity
    {
        internal AuditLog()
        {
            Action = EntityType = string.Empty;
            OldValues = NewValues = IpAddress = UserAgent = null;
            CreatedAt = DateTime.UtcNow;
        }

        public AuditLog(string action, string entityType, int entityId) : this()
        {
            Action = action;
            EntityType = entityType;
            EntityId = entityId;
        }

        public AuditLog SetUser(int? userId)
        {
            UserId = userId;
            return this;
        }

        public AuditLog SetValues(string? oldValues, string? newValues)
        {
            OldValues = oldValues;
            NewValues = newValues;
            return this;
        }

        public AuditLog SetRequestInfo(string? ipAddress, string? userAgent)
        {
            IpAddress = ipAddress;
            UserAgent = userAgent;
            return this;
        }

        public int Id { get; set; }
        public int? UserId { get; set; }
        public string Action { get; set; }
        public string EntityType { get; set; }
        public int EntityId { get; set; }
        public string? OldValues { get; set; }
        public string? NewValues { get; set; }
        public string? IpAddress { get; set; }
        public string? UserAgent { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual User? User { get; set; }
    }
}


