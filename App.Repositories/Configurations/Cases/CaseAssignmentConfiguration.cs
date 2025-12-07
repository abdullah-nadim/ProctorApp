using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace App.Repositories.Configurations.Cases
{
    internal class CaseAssignmentConfiguration : BaseConfiguration<CaseAssignment>, IEntityTypeConfiguration<CaseAssignment>
    {
        internal CaseAssignmentConfiguration(DatabaseContext context) : base(context) { }

        public void Configure(EntityTypeBuilder<CaseAssignment> builder)
        {
            builder.ToTable("Cases_CaseAssignments");

            builder.Property(m => m.ComplaintId).IsRequired();
            builder.Property(m => m.AssignedTo).IsRequired();
            builder.Property(m => m.AssignedBy).IsRequired();
            builder.Property(m => m.AssignedAt).IsRequired();
            builder.Property(m => m.Deadline).IsRequired(false);
            builder.Property(m => m.Status).HasColumnType("varchar(20)").HasConversion<string>().IsRequired();
            builder.Property(m => m.Notes).HasMaxLength(1000).IsRequired(false);

            builder.HasOne(m => m.Assignee)
                .WithMany(m => m.AssignedCases)
                .HasForeignKey(m => m.AssignedTo)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(m => m.Assigner)
                .WithMany(m => m.CaseAssignmentsMade)
                .HasForeignKey(m => m.AssignedBy)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasKey(m => m.Id);
            builder.HasIndex(m => m.ComplaintId);
            builder.HasIndex(m => m.AssignedTo);
            builder.HasIndex(m => m.Status);

            SetupBaseConfiguration(builder);
        }
    }
}

