using M = App.Models;

namespace App.API.Contracts.AuditLogs
{
    public class AuditLog : BaseContract<AuditLog, M.AuditLog>
    {
        public AuditLog()
        {
            Id = 0;
            Action = EntityType = string.Empty;
            OldValues = NewValues = IpAddress = UserAgent = null;
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

        public User? User { get; set; }
    }
}

