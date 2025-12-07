using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace App.Repositories.Configurations.Cases
{
    internal class CaseFileDocumentConfiguration : BaseConfiguration<CaseFileDocument>, IEntityTypeConfiguration<CaseFileDocument>
    {
        internal CaseFileDocumentConfiguration(DatabaseContext context) : base(context) { }

        public void Configure(EntityTypeBuilder<CaseFileDocument> builder)
        {
            builder.ToTable("Cases_CaseFileDocuments");

            builder.Property(m => m.CaseFileId).IsRequired();
            builder.Property(m => m.DocumentPath).HasMaxLength(500).IsRequired();
            builder.Property(m => m.DocumentType).HasMaxLength(50).IsRequired();
            builder.Property(m => m.UploadedAt).IsRequired();

            builder.HasKey(m => m.Id);
            builder.HasIndex(m => m.CaseFileId);

            SetupBaseConfiguration(builder);
        }
    }
}

