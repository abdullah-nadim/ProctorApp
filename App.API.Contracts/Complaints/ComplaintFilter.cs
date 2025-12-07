namespace App.API.Contracts.Complaints
{
    public class ComplaintFilter : BaseModelFilter
    {
        public ComplaintFilter() : base()
        {
            Status = Array.Empty<string>();
        }

        public string? SearchTerm { get; set; }
        public int? ComplainantId { get; set; }
        public int? CategoryId { get; set; }
        public string[] Status { get; set; }
        public string? Priority { get; set; }
        public DateTime? ComplaintDateFrom { get; set; }
        public DateTime? ComplaintDateTo { get; set; }
    }
}

