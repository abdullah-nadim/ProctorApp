using App.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace App.Repositories.Configurations
{
    abstract class BaseConfiguration<TEntity> where TEntity : class
    {
        protected BaseConfiguration(DatabaseContext context) { _Context = context; }

        protected void SetupAuditableConfiguration(EntityTypeBuilder<TEntity> builder)
        {
            if (typeof(IAuditableEntity).IsAssignableFrom(typeof(TEntity)))
            {
                builder.Property<DateTime>("CreatedOn").IsRequired();
                builder.Property<DateTime>("ModifiedOn").IsRequired();
            }
        }

        protected void SetupBaseConfiguration(EntityTypeBuilder<TEntity> builder)
        {
            SetupAuditableConfiguration(builder);
        }

        protected DatabaseContext _Context { get; set; }
    }
} 