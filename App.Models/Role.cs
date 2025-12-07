using App.Core.Models;

namespace App.Models
{
    public class Role : IAuditableEntity
    {
        internal Role()
        {
            Name = string.Empty;
            Users = new List<User>();
        }

        public Role(string name) : this()
        {
            Name = name;
        }

        public Role Update(Role updated)
        {
            Name = updated.Name;
            return this;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual ICollection<User> Users { get; set; }
    }
}


