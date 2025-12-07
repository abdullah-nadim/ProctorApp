using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace App.Repositories.Configurations.AuditLogs
{
    internal class AuditLogConfiguration : BaseConfiguration<AuditLog>, IEntityTypeConfiguration<AuditLog>
    {
        internal AuditLogConfiguration(DatabaseContext context) : base(context) { }

        public void Configure(EntityTypeBuilder<AuditLog> builder)
        {
            builder.ToTable("AuditLogs_AuditLogs");

            builder.Property(m => m.UserId).IsRequired(false);
            builder.Property(m => m.Action).HasMaxLength(100).IsRequired();
            builder.Property(m => m.EntityType).HasMaxLength(100).IsRequired();
            builder.Property(m => m.EntityId).IsRequired();
            builder.Property(m => m.OldValues).HasMaxLength(4000).IsRequired(false);
            builder.Property(m => m.NewValues).HasMaxLength(4000).IsRequired(false);
            builder.Property(m => m.IpAddress).HasMaxLength(50).IsRequired(false);
            builder.Property(m => m.UserAgent).HasMaxLength(500).IsRequired(false);
            builder.Property(m => m.CreatedAt).IsRequired();

            builder.HasOne(m => m.User)
                .WithMany(m => m.AuditLogs)
                .HasForeignKey(m => m.UserId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasKey(m => m.Id);
            builder.HasIndex(m => m.UserId);
            builder.HasIndex(m => m.EntityType);
            builder.HasIndex(m => m.EntityId);
            builder.HasIndex(m => m.CreatedAt);

            SetupBaseConfiguration(builder);
        }
    }
}

