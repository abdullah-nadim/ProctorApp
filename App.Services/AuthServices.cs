using App.Core.Models;
using App.Models;
using App.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace App.Services
{
    public class AuthServices : BaseServices, IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly JWTConfiguration _jwtConfiguration;

        public AuthServices(
            DatabaseContext context,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            JWTConfiguration jwtConfiguration) : base(context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtConfiguration = jwtConfiguration;
        }

        public async Task<(bool success, string[] errors)> RegisterAsync(User user, string password)
        {
            using var transaction = await _Context.Database.BeginTransactionAsync();
            try
            {
                var result = await _userManager.CreateAsync(user, password);

                if (result.Succeeded)
                {
                    await transaction.CommitAsync();
                    return (true, Array.Empty<string>());
                }

                return (false, result.Errors.Select(e => e.Description).ToArray());
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<(bool success, string token, UserTypes userTypes, string[] errors)> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return (false, string.Empty, UserTypes.User, new[] { "Invalid login attempt." });
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);

            if (result.Succeeded)
            {
                var token = await GenerateJwtToken(user);
                return (true, token, user.UserType, Array.Empty<string>());
            }

            var errors = new[] { "Invalid login attempt." };
            if (result.IsLockedOut)
            {
                errors = new[] { "Account locked out." };
            }
            else if (result.IsNotAllowed)
            {
                errors = new[] { "Account not allowed to sign in." };
            }

            return (false, string.Empty, UserTypes.User, errors);
        }

        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.UserName ?? user.Email),
                new Claim("UserType", user.UserType.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfiguration.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_jwtConfiguration.ExpireDays));

            var token = new JwtSecurityToken(
                issuer: _jwtConfiguration.Issuer,
                audience: _jwtConfiguration.Audience,
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
} 