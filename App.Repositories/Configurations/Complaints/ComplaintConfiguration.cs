using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace App.Repositories.Configurations.Complaints
{
    internal class ComplaintConfiguration : BaseConfiguration<Complaint>, IEntityTypeConfiguration<Complaint>
    {
        internal ComplaintConfiguration(DatabaseContext context) : base(context) { }

        public void Configure(EntityTypeBuilder<Complaint> builder)
        {
            builder.ToTable("Complaints_Complaints");

            builder.Property(m => m.Title).HasMaxLength(200).IsRequired();
            builder.Property(m => m.Description).HasMaxLength(2000).IsRequired();
            builder.Property(m => m.ComplaintDate).IsRequired();
            builder.Property(m => m.Status).HasColumnType("varchar(20)").HasConversion<string>().IsRequired();
            builder.Property(m => m.Priority).HasColumnType("varchar(20)").HasConversion<string>().IsRequired();
            builder.Property(m => m.ComplainantId).IsRequired();
            builder.Property(m => m.ComplainantName).HasMaxLength(200).IsRequired(false);
            builder.Property(m => m.ComplainantDetails).HasMaxLength(500).IsRequired(false);
            builder.Property(m => m.ComplainantStudentId).HasMaxLength(50).IsRequired(false);
            builder.Property(m => m.AccusedName).HasMaxLength(200).IsRequired(false);
            builder.Property(m => m.AccusedDetails).HasMaxLength(500).IsRequired(false);
            builder.Property(m => m.Location).HasMaxLength(200).IsRequired(false);
            builder.Property(m => m.IncidentDate).IsRequired(false);

            builder.HasOne(m => m.Complainant)
                .WithMany(m => m.ComplaintsAsComplainant)
                .HasForeignKey(m => m.ComplainantId)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(m => m.Category)
                .WithMany(m => m.Complaints)
                .HasForeignKey(m => m.CategoryId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(m => m.Evidence)
                .WithOne(m => m.Complaint)
                .HasForeignKey(m => m.ComplaintId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(m => m.CaseAssignments)
                .WithOne(m => m.Complaint)
                .HasForeignKey(m => m.ComplaintId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(m => m.Explanations)
                .WithOne(m => m.Complaint)
                .HasForeignKey(m => m.ComplaintId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(m => m.CaseFiles)
                .WithOne(m => m.Complaint)
                .HasForeignKey(m => m.ComplaintId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(m => m.Meetings)
                .WithOne(m => m.Complaint)
                .HasForeignKey(m => m.ComplaintId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasKey(m => m.Id);
            builder.HasIndex(m => m.ComplainantId);
            builder.HasIndex(m => m.CategoryId);
            builder.HasIndex(m => m.Status);
            builder.HasIndex(m => m.Priority);
            builder.HasIndex(m => m.ComplaintDate);

            SetupBaseConfiguration(builder);
        }
    }
}

