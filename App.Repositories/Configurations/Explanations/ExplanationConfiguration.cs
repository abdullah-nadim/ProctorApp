using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace App.Repositories.Configurations.Explanations
{
    internal class ExplanationConfiguration : BaseConfiguration<Explanation>, IEntityTypeConfiguration<Explanation>
    {
        internal ExplanationConfiguration(DatabaseContext context) : base(context) { }

        public void Configure(EntityTypeBuilder<Explanation> builder)
        {
            builder.ToTable("Explanations_Explanations");

            builder.Property(m => m.ComplaintId).IsRequired();
            builder.Property(m => m.SubmittedBy).IsRequired();
            builder.Property(m => m.ExplanationText).HasMaxLength(2000).IsRequired();
            builder.Property(m => m.SubmittedAt).IsRequired();
            builder.Property(m => m.IsComplainant).IsRequired();

            builder.HasOne(m => m.Submitter)
                .WithMany(m => m.Explanations)
                .HasForeignKey(m => m.SubmittedBy)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasKey(m => m.Id);
            builder.HasIndex(m => m.ComplaintId);
            builder.HasIndex(m => m.SubmittedBy);

            SetupBaseConfiguration(builder);
        }
    }
}

