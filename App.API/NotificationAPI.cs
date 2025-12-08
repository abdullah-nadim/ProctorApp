using AutoMapper;
using App.API.Contracts.Notifications;
using App.Services;
using Microsoft.AspNetCore.Mvc;

namespace App.API
{
    [Route("api/v0.1/notifications")]
    [ApiController]
    public class NotificationAPI : BaseAPI
    {
        public NotificationAPI(NotificationServices notificationServices, IMapper mapper)
        {
            _NotificationServices = notificationServices;
            _Mapper = mapper;
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetNotificationsByUser(int userId)
        {
            return Ok(Notification.ToContracts(await _NotificationServices.GetNotificationsByUser(userId), _Mapper));
        }

        [HttpGet("user/{userId}/unread")]
        public async Task<IActionResult> GetUnreadNotificationsByUser(int userId)
        {
            return Ok(Notification.ToContracts(await _NotificationServices.GetUnreadNotificationsByUser(userId), _Mapper));
        }

        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            await _NotificationServices.MarkAsRead(id);
            return Ok();
        }

        [HttpPut("user/{userId}/read-all")]
        public async Task<IActionResult> MarkAllAsRead(int userId)
        {
            await _NotificationServices.MarkAllAsRead(userId);
            return Ok();
        }

        private readonly NotificationServices _NotificationServices;
        private readonly IMapper _Mapper;
    }
}

