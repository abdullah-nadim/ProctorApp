using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace App.Repositories.Configurations
{
    internal class UserSessionConfiguration : BaseConfiguration<UserSession>, IEntityTypeConfiguration<UserSession>
    {
        public UserSessionConfiguration(DatabaseContext databaseContext) : base(databaseContext) { }

        public void Configure(EntityTypeBuilder<UserSession> builder)
        {
            builder.HasKey(m => m.SessionKey);

            builder.Property(m => m.SessionKey).IsRequired().HasMaxLength(500);
            builder.Property(m => m.UserId).IsRequired();

            builder.HasIndex(m => m.SessionKey).IsUnique();
            builder.HasIndex(m => m.UserId);
            builder.HasIndex(m => m.IsActive);
        }
    }
} 