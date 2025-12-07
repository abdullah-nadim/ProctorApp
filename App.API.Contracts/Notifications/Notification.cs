using M = App.Models;

namespace App.API.Contracts.Notifications
{
    public class Notification : BaseContract<Notification, M.Notification>
    {
        public Notification()
        {
            Id = 0;
            Title = Message = string.Empty;
            ActionUrl = null;
            IsRead = false;
            CreatedAt = DateTime.UtcNow;
            RelatedEntityType = "Complaint";
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
        public string RelatedEntityType { get; set; }
        public int? RelatedEntityId { get; set; }
        public string? ActionUrl { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        public User? User { get; set; }
    }
}

