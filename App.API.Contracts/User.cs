using App.Models;
using Microsoft.AspNetCore.Identity;

namespace App.API.Contracts
{
    public class User : IdentityUser<long>
    {
        public User()
        {
            UserType = UserTypes.User;
            IsActive = true;
        }

        public UserTypes UserType { get; set; }
        public bool IsActive { get; set; }
    }
}
