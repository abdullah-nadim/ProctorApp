using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace App.Repositories.Configurations.Meetings
{
    internal class MeetingParticipantConfiguration : BaseConfiguration<MeetingParticipant>, IEntityTypeConfiguration<MeetingParticipant>
    {
        internal MeetingParticipantConfiguration(DatabaseContext context) : base(context) { }

        public void Configure(EntityTypeBuilder<MeetingParticipant> builder)
        {
            builder.ToTable("Meetings_MeetingParticipants");

            builder.Property(m => m.MeetingId).IsRequired();
            builder.Property(m => m.UserId).IsRequired();
            builder.Property(m => m.Role).HasColumnType("varchar(20)").HasConversion<string>().IsRequired();
            builder.Property(m => m.Attended).IsRequired();

            builder.HasOne(m => m.User)
                .WithMany(m => m.MeetingParticipants)
                .HasForeignKey(m => m.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasKey(m => new { m.MeetingId, m.UserId });
            builder.HasIndex(m => m.MeetingId);
            builder.HasIndex(m => m.UserId);

            SetupBaseConfiguration(builder);
        }
    }
}

