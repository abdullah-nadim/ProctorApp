using M = App.Models;

namespace App.API.Contracts
{
    public class UserSession : BaseContract<UserSession, M.UserSession>
    {
        public UserSession()
        {
            SessionKey = string.Empty;
            UserId = 0;
            IsActive = true;
        }

        public string SessionKey { get; set; }
        public int UserId { get; set; }
        public bool IsActive { get; set; }
    }
} 