using M = App.Models;

namespace App.API.Contracts.Complaints
{
    public class ComplaintCategory : BaseContract<ComplaintCategory, M.ComplaintCategory>
    {
        public ComplaintCategory()
        {
            Id = 0;
            Name = string.Empty;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}

