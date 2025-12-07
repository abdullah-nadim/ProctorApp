using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace App.Repositories.Configurations
{
    internal class UserConfiguration : BaseConfiguration<User>, IEntityTypeConfiguration<User>
    {
        internal UserConfiguration(DatabaseContext context) : base(context) { }

        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users_Users");

            builder.Property(m => m.FullName).HasMaxLength(200).IsRequired(false);
            builder.Property(m => m.OrganizationId).HasMaxLength(100).IsRequired(false);
            builder.Property(m => m.Phone).HasMaxLength(20).IsRequired(false);
            builder.Property(m => m.Department).HasMaxLength(100).IsRequired(false);
            builder.Property(m => m.AdvisorName).HasMaxLength(200).IsRequired(false);
            builder.Property(m => m.UserType).HasColumnType("varchar(20)").HasConversion<string>().IsRequired();
            builder.Property(m => m.IsActive).IsRequired();

            builder.HasOne(m => m.Role)
                .WithMany(m => m.Users)
                .HasForeignKey(m => m.RoleId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(m => m.UserSessions)
                .WithOne(m => m.User)
                .HasForeignKey(m => m.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasKey(m => m.Id);
            builder.HasIndex(m => m.UserType);
            builder.HasIndex(m => m.IsActive);
            builder.HasIndex(m => m.Email);
            builder.HasIndex(m => m.OrganizationId);

            SetupBaseConfiguration(builder);
        }
    }
} 