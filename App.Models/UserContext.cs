namespace App.Models
{
    public class UserContext
    {
        public int UserId { get; set; }
        public UserTypes UserType { get; set; }
        public int? OrganizationId { get; set; }
    }
}

