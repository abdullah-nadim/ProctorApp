using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace App.Repositories.Configurations.Roles
{
    internal class RoleConfiguration : BaseConfiguration<Role>, IEntityTypeConfiguration<Role>
    {
        internal RoleConfiguration(DatabaseContext context) : base(context) { }

        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.ToTable("Roles_Roles");

            builder.Property(m => m.Name).HasMaxLength(100).IsRequired();

            builder.HasKey(m => m.Id);
            builder.HasIndex(m => m.Name).IsUnique();

            SetupBaseConfiguration(builder);
        }
    }
}

