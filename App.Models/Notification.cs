using App.Core.Models;

namespace App.Models
{
    public class Notification : IAuditableEntity
    {
        internal Notification()
        {
            Title = Message = string.Empty;
            ActionUrl = null;
            IsRead = false;
            CreatedAt = DateTime.UtcNow;
        }

        public Notification(int userId, string title, string message) : this()
        {
            UserId = userId;
            Title = title;
            Message = message;
        }

        public Notification SetRead(bool isRead)
        {
            IsRead = isRead;
            return this;
        }

        public Notification SetRelatedEntity(RelatedEntityType entityType, int? entityId, string? actionUrl = null)
        {
            RelatedEntityType = entityType;
            RelatedEntityId = entityId;
            ActionUrl = actionUrl;
            return this;
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
        public RelatedEntityType RelatedEntityType { get; set; }
        public int? RelatedEntityId { get; set; }
        public string? ActionUrl { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual User User { get; set; } = null!;
    }
}


