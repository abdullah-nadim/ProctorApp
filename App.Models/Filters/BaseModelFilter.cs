using App.Core.Models;

namespace App.Models.Filters
{
    public class BaseModelFilter : BaseFilter
    {
        public bool? IsActive { get; set; }
        public DateTime? CreatedFrom { get; set; }
        public DateTime? CreatedTo { get; set; }

        public bool AllowPaging { get; set; }
        //public int PageNumber { get; set; }
        //public int PageSize { get; set; }
    }
} 