using App.Models;
using App.Models.Repositories;

namespace App.Repositories
{
    public class NotificationRepository : Repository<Notification>, INotificationRepository
    {
        public NotificationRepository(DatabaseContext context) : base(context) { }

        public async Task<List<Notification>> ReadManyByUser(int userId, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(n => n.UserId == userId, cancellationToken);
        }

        public async Task<List<Notification>> ReadManyUnreadByUser(int userId, CancellationToken cancellationToken = default)
        {
            return await ReadManyAsync(n => n.UserId == userId && !n.IsRead, cancellationToken);
        }
    }
}

