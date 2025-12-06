namespace App.Core.Repositories
{
    public interface IRepositorySession : IDisposable
    {
        int Commit();
    }
} 