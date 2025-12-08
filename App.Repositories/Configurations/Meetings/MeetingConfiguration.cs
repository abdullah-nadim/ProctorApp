using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace App.Repositories.Configurations.Meetings
{
    internal class MeetingConfiguration : BaseConfiguration<Meeting>, IEntityTypeConfiguration<Meeting>
    {
        internal MeetingConfiguration(DatabaseContext context) : base(context) { }

        public void Configure(EntityTypeBuilder<Meeting> builder)
        {
            builder.ToTable("Meetings_Meetings");

            builder.Property(m => m.ComplaintId).IsRequired();
            builder.Property(m => m.ScheduledBy).IsRequired();
            builder.Property(m => m.ScheduledAt).IsRequired();
            builder.Property(m => m.DurationMinutes).IsRequired();
            builder.Property(m => m.Location).HasMaxLength(200).IsRequired();
            builder.Property(m => m.Agenda).HasMaxLength(1000).IsRequired(false);
            builder.Property(m => m.Notes).HasMaxLength(2000).IsRequired(false);
            builder.Property(m => m.Status).HasColumnType("varchar(20)").HasConversion<string>().IsRequired();
            builder.Property(m => m.Outcome).HasMaxLength(2000).IsRequired(false);

            builder.HasOne(m => m.Scheduler)
                .WithMany(m => m.ScheduledMeetings)
                .HasForeignKey(m => m.ScheduledBy)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(m => m.Participants)
                .WithOne(m => m.Meeting)
                .HasForeignKey(m => m.MeetingId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasKey(m => m.Id);
            builder.HasIndex(m => m.ComplaintId);
            builder.HasIndex(m => m.ScheduledBy);
            builder.HasIndex(m => m.ScheduledAt);
            builder.HasIndex(m => m.Status);

            SetupBaseConfiguration(builder);
        }
    }
}

