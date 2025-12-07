using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace App.Repositories.Configurations.Cases
{
    internal class CaseFileConfiguration : BaseConfiguration<CaseFile>, IEntityTypeConfiguration<CaseFile>
    {
        internal CaseFileConfiguration(DatabaseContext context) : base(context) { }

        public void Configure(EntityTypeBuilder<CaseFile> builder)
        {
            builder.ToTable("Cases_CaseFiles");

            builder.Property(m => m.ComplaintId).IsRequired();
            builder.Property(m => m.PreparedBy).IsRequired();
            builder.Property(m => m.PreparedAt).IsRequired();
            builder.Property(m => m.Summary).HasMaxLength(2000).IsRequired();
            builder.Property(m => m.Recommendations).HasMaxLength(2000).IsRequired(false);
            builder.Property(m => m.Status).HasColumnType("varchar(20)").HasConversion<string>().IsRequired();

            builder.HasOne(m => m.Preparer)
                .WithMany(m => m.CaseFiles)
                .HasForeignKey(m => m.PreparedBy)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(m => m.Documents)
                .WithOne(m => m.CaseFile)
                .HasForeignKey(m => m.CaseFileId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasKey(m => m.Id);
            builder.HasIndex(m => m.ComplaintId);
            builder.HasIndex(m => m.PreparedBy);
            builder.HasIndex(m => m.Status);

            SetupBaseConfiguration(builder);
        }
    }
}

