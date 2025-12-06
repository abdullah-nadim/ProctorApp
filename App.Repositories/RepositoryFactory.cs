using App.Models.Repositories;

namespace App.Repositories
{
    public class RepositoryFactory : IRepositoryFactory, IDisposable
    {
        public RepositoryFactory(DatabaseContext context)
        {
            _Context = context;
        }

        public IUserRepository GetUserRepository() => new UserRepository(_Context);
        public IUserSessionRepository GetUserSessionRepository() => new UserSessionRepository(_Context);

        public int Commit()
        {
            return _Context.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            _Context.SaveChanges();
        }

        private DatabaseContext _Context;
    }
} 