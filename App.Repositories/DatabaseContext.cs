using App.Core.Models;
using App.Models;
using App.Repositories.Configurations;
using App.Repositories.Configurations.AuditLogs;
using App.Repositories.Configurations.Cases;
using App.Repositories.Configurations.Complaints;
using App.Repositories.Configurations.Explanations;
using App.Repositories.Configurations.Meetings;
using App.Repositories.Configurations.Notifications;
using App.Repositories.Configurations.Roles;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace App.Repositories
{
    public class DatabaseContext : IdentityUserContext<User, int>
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Users
            modelBuilder.ApplyConfiguration(new UserConfiguration(this));
            modelBuilder.ApplyConfiguration(new UserSessionConfiguration(this));
            modelBuilder.ApplyConfiguration(new RoleConfiguration(this));

            // Complaints
            modelBuilder.ApplyConfiguration(new ComplaintConfiguration(this));
            modelBuilder.ApplyConfiguration(new ComplaintCategoryConfiguration(this));
            modelBuilder.ApplyConfiguration(new ComplaintEvidenceConfiguration(this));

            // Cases
            modelBuilder.ApplyConfiguration(new CaseAssignmentConfiguration(this));
            modelBuilder.ApplyConfiguration(new CaseFileConfiguration(this));
            modelBuilder.ApplyConfiguration(new CaseFileDocumentConfiguration(this));

            // Explanations
            modelBuilder.ApplyConfiguration(new ExplanationConfiguration(this));

            // Meetings
            modelBuilder.ApplyConfiguration(new MeetingConfiguration(this));
            modelBuilder.ApplyConfiguration(new MeetingParticipantConfiguration(this));

            // Notifications
            modelBuilder.ApplyConfiguration(new NotificationConfiguration(this));

            // Audit Logs
            modelBuilder.ApplyConfiguration(new AuditLogConfiguration(this));
        }

        public override int SaveChanges()
        {
            UpdateAuditableProperties();
            return base.SaveChanges();
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            UpdateAuditableProperties();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            UpdateAuditableProperties();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            UpdateAuditableProperties();
            return base.SaveChangesAsync(cancellationToken);
        }

        private void UpdateAuditableProperties()
        {
            foreach (var entry in ChangeTracker.Entries<IAuditableEntity>().ToList())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedOn = DateTime.UtcNow;
                        entry.Entity.ModifiedOn = DateTime.UtcNow;
                        break;

                    case EntityState.Modified:
                    case EntityState.Deleted:
                        entry.Entity.ModifiedOn = DateTime.UtcNow;
                        break;
                }
            }
        }
    }
} 