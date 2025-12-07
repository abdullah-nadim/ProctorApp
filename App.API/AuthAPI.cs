using AutoMapper;
using App.API.Contracts;
using App.API.Contracts.Auth;
using App.Services;
using App.Models;
using Microsoft.AspNetCore.Mvc;
using C = App.API.Contracts;
using M = App.Models;

namespace App.API
{
    [Route("api/v0.1/auth")]
    [ApiController]
    public class AuthAPI : BaseAPI
    {
        public AuthAPI(IAuthService authService, UserServices userServices, IMapper mapper)
        {
            _AuthService = authService;
            _UserServices = userServices;
            _Mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new AuthResponse
                {
                    Success = false,
                    Errors = new[] { "Email and password are required." }
                });
            }

            (bool success, string token, M.UserTypes userType, string[] errors) = await _AuthService.LoginAsync(request.Email, request.Password);

            if (success)
            {
                // Get user details
                var user = await _UserServices.ReadByEmailAsync(request.Email);
                var userContract = user != null ? C.User.ToContract(user, _Mapper) : null;

                // Set JWT token in cookie
                Response.Cookies.Append("JWTToken", token, new Microsoft.AspNetCore.Http.CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddDays(7)
                });

                return Ok(new AuthResponse
                {
                    Success = true,
                    Token = token,
                    UserType = userType.ToString(),
                    User = userContract,
                    Errors = Array.Empty<string>()
                });
            }

            return Unauthorized(new AuthResponse
            {
                Success = false,
                Errors = errors
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new AuthResponse
                {
                    Success = false,
                    Errors = new[] { "Email and password are required." }
                });
            }

            if (request.Password.Length < 6)
            {
                return BadRequest(new AuthResponse
                {
                    Success = false,
                    Errors = new[] { "Password must be at least 6 characters long." }
                });
            }

            // Parse UserType
            if (!Enum.TryParse<M.UserTypes>(request.UserType, out var userType))
            {
                userType = M.UserTypes.Student;
            }

            var user = new M.User(request.Email, userType)
            {
                FullName = request.FullName,
                UserName = string.IsNullOrWhiteSpace(request.UserName) ? request.Email : request.UserName,
                Phone = request.Phone,
                Department = request.Department,
                OrganizationId = request.OrganizationId,
                AdvisorName = request.AdvisorName
            };

            (bool success, string[] errors) = await _AuthService.RegisterAsync(user, request.Password);

            if (success)
            {
                // Get created user
                var createdUser = await _UserServices.ReadByEmailAsync(request.Email);
                var userContract = createdUser != null ? C.User.ToContract(createdUser, _Mapper) : null;

                return Ok(new AuthResponse
                {
                    Success = true,
                    User = userContract,
                    Errors = Array.Empty<string>()
                });
            }

            return BadRequest(new AuthResponse
            {
                Success = false,
                Errors = errors
            });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _AuthService.LogoutAsync();
            Response.Cookies.Delete("JWTToken");
            return Ok(new { Success = true, Message = "Logged out successfully." });
        }

        [HttpGet("me")]
        [Microsoft.AspNetCore.Authorization.Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
            {
                return Unauthorized();
            }

            var user = await _UserServices.ReadAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(C.User.ToContract(user, _Mapper));
        }

        private readonly IAuthService _AuthService;
        private readonly UserServices _UserServices;
        private readonly IMapper _Mapper;
    }
}

