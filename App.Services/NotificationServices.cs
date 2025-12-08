using App.Models;
using App.Models.Repositories;
using App.Repositories;
using Microsoft.Extensions.Logging;

namespace App.Services
{
    public class NotificationServices : BaseServices
    {
        private readonly ILogger<NotificationServices> _logger;

        public NotificationServices(DatabaseContext context, ILogger<NotificationServices> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<List<Notification>> GetNotificationsByUser(int userId)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetNotificationRepository().ReadManyByUser(userId);
            }
        }

        public async Task<List<Notification>> GetUnreadNotificationsByUser(int userId)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetNotificationRepository().ReadManyUnreadByUser(userId);
            }
        }

        public async Task MarkAsRead(int notificationId)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                var notification = await factory.GetNotificationRepository().ReadAsync(notificationId);
                if (notification != null)
                {
                    notification.SetRead(true);
                    factory.GetNotificationRepository().Update(notification);
                    factory.Commit();
                }
            }
        }

        public async Task MarkAllAsRead(int userId)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                var notifications = await factory.GetNotificationRepository().ReadManyUnreadByUser(userId);
                foreach (var notification in notifications)
                {
                    notification.SetRead(true);
                    factory.GetNotificationRepository().Update(notification);
                }
                factory.Commit();
            }
        }
    }
}

