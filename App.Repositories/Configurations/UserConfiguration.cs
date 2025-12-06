using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace App.Repositories.Configurations
{
    internal class UserConfiguration : BaseConfiguration<User>, IEntityTypeConfiguration<User>
    {
        public UserConfiguration(DatabaseContext databaseContext) : base(databaseContext) { }

        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(m => m.Id);

            builder.Property(m => m.UserType).HasColumnType("varchar(20)").HasConversion<string>().IsRequired();

            builder.HasIndex(m => m.UserType);
            builder.HasIndex(m => m.IsActive);
        }
    }
} 