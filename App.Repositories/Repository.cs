using App.Core.Models;
using App.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace App.Repositories
{
    public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        #region Constructor
        public Repository(DbContext dbContext)
        {
            _Context = dbContext;
            _Collection = _Context.Set<TEntity>();
        }
        #endregion Constructor

        #region Create Operation
        public virtual void Create(TEntity entity)
        {
            _Collection.Add(entity);
        }

        public virtual async Task CreateAsync(TEntity entity, CancellationToken cancellationToken = default)
        {
            await _Collection.AddAsync(entity, cancellationToken);
        }

        public void Create(List<TEntity> entities)
        {
            _Collection.AddRange(entities);
        }

        public virtual async Task CreateAsync(List<TEntity> entities, CancellationToken cancellationToken = default)
        {
            await _Collection.AddRangeAsync(entities, cancellationToken);
        }
        #endregion Create Operation

        #region Read Operation
        public virtual TEntity? Read(object key)
        {
            return _Collection.Find(key);
        }

        public virtual async Task<TEntity?> ReadAsync(object key, CancellationToken cancellationToken = default)
        {
            return await _Collection.FindAsync(key, cancellationToken);
        }

        public virtual List<TEntity> ReadMany()
        {
            return _Collection.ToList();
        }

        public virtual async Task<List<TEntity>> ReadManyAsync(CancellationToken cancellationToken = default)
        {
            return await _Collection.ToListAsync(cancellationToken);
        }

        public PagedEntities<TEntity> ReadMany(int pageNumber = 1, int pageSize = 10)
        {
            return new PagedEntities<TEntity>()
            {
                Items = _Collection.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList(),
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalItems = _Collection.Count()
            };
        }

        public virtual async Task<PagedEntities<TEntity>> ReadManyAsync(int pageNumber = 1, int pageSize = 10, CancellationToken cancellationToken = default)
        {
            return new PagedEntities<TEntity>()
            {
                Items = await _Collection.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync(cancellationToken),
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalItems = await _Collection.CountAsync(cancellationToken)
            };
        }
        #endregion Read Operation

        #region Update Operation
        public virtual void Update(TEntity entity)
        {
            _Collection.Update(entity);
        }

        public virtual void Update(List<TEntity> entities)
        {
            _Collection.UpdateRange(entities);
        }
        #endregion Update Operation

        #region Delete Operation
        public virtual void Delete(object key)
        {
            Delete(_Collection.Find(key));
        }

        public virtual async Task DeleteAsync(object key, CancellationToken cancellationToken = default)
        {
            Delete(await _Collection.FindAsync(key, cancellationToken));
        }

        public virtual void Delete(TEntity entity)
        {
            _Collection.Remove(entity);
        }

        public virtual void Delete(List<TEntity> entities)
        {
            _Collection.RemoveRange(entities);
        }
        #endregion Delete Operation

        #region Count Operation
        public virtual int Count()
        {
            return _Collection.Count();
        }

        public virtual async Task<int> CountAsync(CancellationToken cancellationToken = default)
        {
            return await _Collection.CountAsync(cancellationToken);
        }
        #endregion Count Operation

        protected TEntity? Read(Expression<Func<TEntity, bool>> predicate)
        {
            return _Collection.FirstOrDefault(predicate);
        }

        protected async Task<TEntity?> ReadAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken = default)
        {
            return await _Collection.FirstOrDefaultAsync(predicate, cancellationToken);
        }

        protected List<TEntity> ReadMany(Expression<Func<TEntity, bool>> predicate)
        {
            return _Collection.Where(predicate).ToList();
        }

        protected async Task<List<TEntity>> ReadManyAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken = default)
        {
            return await _Collection.Where(predicate).ToListAsync(cancellationToken);
        }

        protected PagedEntities<TEntity> ReadMany(Expression<Func<TEntity, bool>> predicate, int pageNumber = 1, int pageSize = 10)
        {
            return new PagedEntities<TEntity>()
            {
                Items = _Collection.Where(predicate).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList(),
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalItems = _Collection.Count(predicate)
            };
        }

        protected async Task<PagedEntities<TEntity>> ReadManyAsync(Expression<Func<TEntity, bool>> predicate, int pageNumber = 1, int pageSize = 10, CancellationToken cancellationToken = default)
        {
            return new PagedEntities<TEntity>()
            {
                Items = await _Collection.Where(predicate).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync(cancellationToken),
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalItems = await _Collection.CountAsync(predicate, cancellationToken)
            };
        }

        protected int Count(Expression<Func<TEntity, bool>> predicate)
        {
            return _Collection.Count(predicate);
        }

        protected async Task<int> CountAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken = default)
        {
            return await _Collection.CountAsync(predicate, cancellationToken);
        }

        public DbContext _Context;
        public DbSet<TEntity> _Collection;
    }
} 