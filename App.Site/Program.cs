using App.Core.Models;
using App.Models;
using App.Models.Repositories;
using App.Repositories;
using App.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace App.Site
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            ApplicationConfiguration applicationConfiguration = builder.Configuration.GetSection("ApplicationConfiguration").Get<ApplicationConfiguration>();
            JWTConfiguration jWTConfiguration = builder.Configuration.GetSection("Jwt").Get<JWTConfiguration>();

            builder.Logging.ClearProviders();
            builder.Logging.AddConsole();

            builder.Services.AddSingleton<ApplicationConfiguration>(applicationConfiguration);
            builder.Services.AddSingleton<JWTConfiguration>(jWTConfiguration);

            builder.Services.AddMemoryCache();
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddDbContext<DatabaseContext>(options =>
            {
                options.EnableSensitiveDataLogging(true);
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            // Register repository factory
            builder.Services.AddScoped<IRepositoryFactory, RepositoryFactory>();

            // Register services
            builder.Services.AddScoped<UserServices>();
            builder.Services.AddScoped<ComplaintServices>();
            builder.Services.AddScoped<ComplaintCategoryServices>();
            builder.Services.AddScoped<CaseAssignmentServices>();
            builder.Services.AddScoped<CaseFileServices>();
            builder.Services.AddScoped<MeetingServices>();
            builder.Services.AddScoped<IAuthService, AuthServices>();

            builder.Services.AddAutoMapper(typeof(App.API.Contracts.AutoMapperProfile));
            builder.Services.AddControllersWithViews();
            builder.Services.AddMemoryCache();

            // Configure CORS - Allow only localhost:4200
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins("http://localhost:4200", "https://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            builder.Services.AddIdentityCore<User>(options =>
            {
                options.SignIn.RequireConfirmedAccount = false;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredLength = 6;
            })
            .AddEntityFrameworkStores<DatabaseContext>()
            .AddSignInManager<SignInManager<User>>()
            .AddUserManager<UserManager<User>>()
            .AddDefaultTokenProviders();

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jWTConfiguration.Issuer,
                    ValidAudience = jWTConfiguration.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(jWTConfiguration.Key))
                };

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        context.Token = context.Request.Cookies["JWTToken"];
                        return Task.CompletedTask;
                    }
                };
            });

            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminOnly", policy =>
                    policy.RequireClaim("UserType", UserTypes.Admin.ToString()));

                options.AddPolicy("UserOnly", policy =>
                    policy.RequireClaim("UserType", UserTypes.User.ToString()));

                options.AddPolicy("AnyUser", policy =>
                    policy.RequireClaim("UserType",
                        UserTypes.Admin.ToString(),
                        UserTypes.User.ToString()));
            });

            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
                context.Database.Migrate();
            }

            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors(); // Must be before UseAuthentication and UseAuthorization
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.MapControllers();

            app.Run();
        }
    }
}
