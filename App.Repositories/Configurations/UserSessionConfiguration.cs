using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace App.Repositories.Configurations
{
    internal class UserSessionConfiguration : BaseConfiguration<UserSession>, IEntityTypeConfiguration<UserSession>
    {
        internal UserSessionConfiguration(DatabaseContext context) : base(context) { }

        public void Configure(EntityTypeBuilder<UserSession> builder)
        {
            builder.ToTable("Users_UserSessions");

            builder.Property(m => m.SessionKey).HasMaxLength(500).IsRequired();
            builder.Property(m => m.UserId).IsRequired();
            builder.Property(m => m.IsActive).IsRequired();

            builder.HasKey(m => m.SessionKey);
            builder.HasIndex(m => m.SessionKey).IsUnique();
            builder.HasIndex(m => m.UserId);
            builder.HasIndex(m => m.IsActive);

            SetupBaseConfiguration(builder);
        }
    }
} 