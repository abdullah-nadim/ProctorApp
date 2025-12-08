using App.API.Contracts.Roles;
using M = App.Models;

namespace App.API.Contracts
{
    public class User : BaseContract<User, M.User>
    {
        public User()
        {
            Id = 0;
            Email = UserName = FullName = string.Empty;
            Phone = OrganizationId = Department = AdvisorName = null;
            UserType = "Student";
            IsActive = true;
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string? OrganizationId { get; set; }
        public string? Phone { get; set; }
        public string? Department { get; set; }
        public string? AdvisorName { get; set; }
        public int? RoleId { get; set; }
        public string UserType { get; set; }
        public bool IsActive { get; set; }

        public Role? Role { get; set; }
    }
}
