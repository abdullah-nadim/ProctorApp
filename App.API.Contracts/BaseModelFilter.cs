namespace App.API.Contracts
{
    public abstract class BaseModelFilter
    {
        protected BaseModelFilter()
        {
            AllowPaging = false;
        }

        public bool AllowPaging { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}

