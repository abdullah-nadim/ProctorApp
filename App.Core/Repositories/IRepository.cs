using App.Core.Models;

namespace App.Core.Repositories
{
    public interface IRepository<T> where T : class
    {
        // Create operations
        void Create(T entity);
        Task CreateAsync(T entity, CancellationToken cancellationToken = default);
        void Create(List<T> entities);
        Task CreateAsync(List<T> entities, CancellationToken cancellationToken = default);

        // Read operations
        T? Read(object key);
        Task<T?> ReadAsync(object key, CancellationToken cancellationToken = default);
        List<T> ReadMany();
        Task<List<T>> ReadManyAsync(CancellationToken cancellationToken = default);
        PagedEntities<T> ReadMany(int pageNumber = 1, int pageSize = 10);
        Task<PagedEntities<T>> ReadManyAsync(int pageNumber = 1, int pageSize = 10, CancellationToken cancellationToken = default);

        // Update operations
        void Update(T entity);
        void Update(List<T> entities);

        // Delete operations
        void Delete(object key);
        Task DeleteAsync(object key, CancellationToken cancellationToken = default);
        void Delete(T entity);
        void Delete(List<T> entities);

        // Count operations
        int Count();
        Task<int> CountAsync(CancellationToken cancellationToken = default);
    }
} 