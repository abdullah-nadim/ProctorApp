using App.Core.Models;

namespace App.Models
{
    public class ComplaintCategory : IAuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

        // Navigation properties
        public virtual ICollection<Complaint> Complaints { get; set; } = new List<Complaint>();
    }
}


