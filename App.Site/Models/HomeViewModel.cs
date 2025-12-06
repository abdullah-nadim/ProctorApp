namespace App.Site.Models
{
    public class HomeViewModel
    {
        public bool IsAuthenticated { get; set; }
        public string? UserName { get; set; }
        public string? UserType { get; set; }
    }
} 