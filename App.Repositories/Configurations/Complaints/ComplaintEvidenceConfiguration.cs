using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace App.Repositories.Configurations.Complaints
{
    internal class ComplaintEvidenceConfiguration : BaseConfiguration<ComplaintEvidence>, IEntityTypeConfiguration<ComplaintEvidence>
    {
        internal ComplaintEvidenceConfiguration(DatabaseContext context) : base(context) { }

        public void Configure(EntityTypeBuilder<ComplaintEvidence> builder)
        {
            builder.ToTable("Complaints_ComplaintEvidences");

            builder.Property(m => m.ComplaintId).IsRequired();
            builder.Property(m => m.FilePath).HasMaxLength(500).IsRequired();
            builder.Property(m => m.UploadedBy).IsRequired();
            builder.Property(m => m.UploadedAt).IsRequired();
            builder.Property(m => m.Description).HasMaxLength(500).IsRequired(false);

            builder.HasOne(m => m.Uploader)
                .WithMany(m => m.EvidenceUploads)
                .HasForeignKey(m => m.UploadedBy)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasKey(m => m.Id);
            builder.HasIndex(m => m.ComplaintId);
            builder.HasIndex(m => m.UploadedBy);

            SetupBaseConfiguration(builder);
        }
    }
}

