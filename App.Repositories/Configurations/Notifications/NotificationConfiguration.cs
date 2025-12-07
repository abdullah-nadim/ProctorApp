using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace App.Repositories.Configurations.Notifications
{
    internal class NotificationConfiguration : BaseConfiguration<Notification>, IEntityTypeConfiguration<Notification>
    {
        internal NotificationConfiguration(DatabaseContext context) : base(context) { }

        public void Configure(EntityTypeBuilder<Notification> builder)
        {
            builder.ToTable("Notifications_Notifications");

            builder.Property(m => m.UserId).IsRequired();
            builder.Property(m => m.Title).HasMaxLength(200).IsRequired();
            builder.Property(m => m.Message).HasMaxLength(1000).IsRequired();
            builder.Property(m => m.IsRead).IsRequired();
            builder.Property(m => m.CreatedAt).IsRequired();
            builder.Property(m => m.RelatedEntityType).HasColumnType("varchar(20)").HasConversion<string>().IsRequired();
            builder.Property(m => m.RelatedEntityId).IsRequired(false);
            builder.Property(m => m.ActionUrl).HasMaxLength(500).IsRequired(false);

            builder.HasKey(m => m.Id);
            builder.HasIndex(m => m.UserId);
            builder.HasIndex(m => m.IsRead);
            builder.HasIndex(m => m.CreatedAt);

            SetupBaseConfiguration(builder);
        }
    }
}

