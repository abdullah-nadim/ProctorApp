using App.Core.Models;

namespace App.Models
{
    public class ComplaintCategory : IAuditableEntity
    {
        internal ComplaintCategory()
        {
            Name = string.Empty;
            Complaints = new List<Complaint>();
        }

        public ComplaintCategory(string name) : this()
        {
            Name = name;
        }

        public ComplaintCategory Update(ComplaintCategory updated)
        {
            Name = updated.Name;
            return this;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual ICollection<Complaint> Complaints { get; set; }
    }
}


