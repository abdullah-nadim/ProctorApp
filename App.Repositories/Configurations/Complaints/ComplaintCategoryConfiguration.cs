using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace App.Repositories.Configurations.Complaints
{
    internal class ComplaintCategoryConfiguration : BaseConfiguration<ComplaintCategory>, IEntityTypeConfiguration<ComplaintCategory>
    {
        internal ComplaintCategoryConfiguration(DatabaseContext context) : base(context) { }

        public void Configure(EntityTypeBuilder<ComplaintCategory> builder)
        {
            builder.ToTable("Complaints_ComplaintCategories");

            builder.Property(m => m.Name).HasMaxLength(100).IsRequired();

            builder.HasKey(m => m.Id);
            builder.HasIndex(m => m.Name).IsUnique();

            SetupBaseConfiguration(builder);
        }
    }
}

