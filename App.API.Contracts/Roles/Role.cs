using M = App.Models;

namespace App.API.Contracts.Roles
{
    public class Role : BaseContract<Role, M.Role>
    {
        public Role()
        {
            Id = 0;
            Name = string.Empty;
        }

        public int Id { get; set; }
        public string Name { get; set; }
    }
}

