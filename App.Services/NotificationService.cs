using App.API.Contracts.Notifications;
using App.Models;
using App.Models.Repositories;
using App.Repositories;
using Microsoft.AspNetCore.SignalR;
using App.Services.Hubs;
using AutoMapper;
using Notification = App.API.Contracts.Notifications.Notification;

namespace App.Services
{
    public class NotificationService : BaseServices
    {
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly IMapper _mapper;

        public NotificationService(
            DatabaseContext context,
            IHubContext<NotificationHub> hubContext,
            IMapper mapper) : base(context)
        {
            _hubContext = hubContext;
            _mapper = mapper;
        }

        public async Task SendNotificationAsync(int userId, string title, string message, RelatedEntityType entityType, int? entityId = null, string? actionUrl = null)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                // Create notification in database
                var notification = new Models.Notification(userId, title, message);
                if (entityId.HasValue)
                {
                    notification.SetRelatedEntity(entityType, entityId, actionUrl);
                }

                await factory.GetNotificationRepository().CreateAsync(notification);
                factory.Commit();

                // Send via SignalR
                var notificationContract = Notification.ToContract(notification, _mapper);
                await _hubContext.Clients.Group($"user_{userId}").SendAsync("ReceiveNotification", notificationContract);
            }
        }

        public async Task SendNotificationToMultipleUsersAsync(List<int> userIds, string title, string message, RelatedEntityType entityType, int? entityId = null, string? actionUrl = null)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                var notificationContract = new App.API.Contracts.Notifications.Notification
                {
                    Title = title,
                    Message = message,
                    RelatedEntityType = entityType.ToString(),
                    RelatedEntityId = entityId,
                    ActionUrl = actionUrl,
                    CreatedAt = DateTime.UtcNow,
                    IsRead = false
                };

                // Create notification for each user
                foreach (var userId in userIds)
                {
                    var notification = new Models.Notification(userId, title, message);
                    if (entityId.HasValue)
                    {
                        notification.SetRelatedEntity(entityType, entityId, actionUrl);
                    }
                    notificationContract.UserId = userId;
                    await factory.GetNotificationRepository().CreateAsync(notification);
                    
                    // Send via SignalR
                    await _hubContext.Clients.Group($"user_{userId}").SendAsync("ReceiveNotification", notificationContract);
                }
                factory.Commit();
            }
        }
    }
}

