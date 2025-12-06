using App.Models;
using System.ComponentModel.DataAnnotations;

namespace App.Site.Models
{
    public class ProfileViewModel
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; } = string.Empty;

        [Display(Name = "Username")]
        public string? UserName { get; set; }

        [Display(Name = "User Type")]
        public UserTypes UserType { get; set; }

        [Display(Name = "Active")]
        public bool IsActive { get; set; }
    }
} 