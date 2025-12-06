using App.Core.Models;
using Microsoft.AspNetCore.Identity;

namespace App.Models
{
    public class User : IdentityUser<long>, IAuditableEntity
    {
        internal User() : base() { }
        
        public User(string email, UserTypes types) : base(email)
        {
            Email = email;
            UserType = types;
            IsActive = true;
        }

        public UserTypes UserType { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual ICollection<UserSession> UserSessions { get; set; } = new List<UserSession>();
    }
} 