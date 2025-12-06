using App.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace App.Repositories.Configurations
{
    public abstract class BaseConfiguration<T> : IEntityTypeConfiguration<T> where T : class
    {
        protected BaseConfiguration(DatabaseContext databaseContext) { _DatabaseContext = databaseContext; }

        protected DatabaseContext _DatabaseContext { get; set; }

        public virtual void Configure(EntityTypeBuilder<T> builder)
        {
            // Common configuration for all entities
        }
    }
} 