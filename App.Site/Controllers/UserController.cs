using App.Models;
using App.Services;
using App.Site.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace App.Site.Controllers
{
    [Authorize]
    public class UserController : Controller
    {
        private readonly UserServices _userServices;
        private readonly ILogger<UserController> _logger;

        public UserController(UserServices userServices, ILogger<UserController> logger)
        {
            _userServices = userServices;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Profile()
        {
            try
            {
                // Get user ID from claims
                var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !long.TryParse(userIdClaim.Value, out long userId))
                {
                    return RedirectToAction("Login", "Auth");
                }

                var user = await _userServices.ReadAsync(userId);
                if (user == null)
                {
                    return RedirectToAction("Login", "Auth");
                }

                var profileViewModel = new ProfileViewModel
                {
                    Id = user.Id,
                    Email = user.Email,
                    UserName = user.UserName,
                    UserType = user.UserType,
                    IsActive = user.IsActive
                };

                return View(profileViewModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading user profile");
                TempData["ErrorMessage"] = "An error occurred while loading your profile.";
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpdateProfile(ProfileViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View("Profile", model);
            }

            try
            {
                var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !long.TryParse(userIdClaim.Value, out long userId))
                {
                    return RedirectToAction("Login", "Auth");
                }

                var existingUser = await _userServices.ReadAsync(userId);
                if (existingUser == null)
                {
                    return RedirectToAction("Login", "Auth");
                }

                // Update user properties - Email and UserName are from IdentityUser and are settable
                existingUser.Email = model.Email;
                existingUser.UserName = model.UserName;

                await _userServices.UpdateUser(existingUser);

                TempData["SuccessMessage"] = "Profile updated successfully!";
                return RedirectToAction("Profile");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating user profile");
                ModelState.AddModelError("", "An error occurred while updating your profile. Please try again.");
                return View("Profile", model);
            }
        }
    }
} 