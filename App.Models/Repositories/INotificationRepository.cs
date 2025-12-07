using App.Core.Repositories;
using App.Models;

namespace App.Models.Repositories
{
    public interface INotificationRepository : IRepository<Notification>
    {
        Task<List<Notification>> ReadManyByUser(int userId, CancellationToken cancellationToken = default);
        Task<List<Notification>> ReadManyUnreadByUser(int userId, CancellationToken cancellationToken = default);
    }
}

