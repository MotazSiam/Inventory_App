using Inventory_App.Interface;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Inventory_App.DAL
{
    public class GenericRepository<IEntity> : IGenericRepository<IEntity> where IEntity : class
    {
        private readonly DBContext Context;
        public DbSet<IEntity> Entitiy { get; set; }

        public GenericRepository(DBContext context)
        {
            this.Context = context;
            this.Entitiy = context.Set<IEntity>();
        }
        public KeyValuePair<int, IQueryable<IEntity>> GetAll(Expression<Func<IEntity, bool>> filter = null,
                                           Func<IQueryable<IEntity>, IOrderedQueryable<IEntity>> orderBy = null,
                                           string[] includeProperties = null,
                                           int? numberLimit = null,
                                           int? pageNo = null)
        {
            IQueryable<IEntity> query = Entitiy;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties)
                {
                    query = query.Include(includeProperty);
                }
            }

            int count = query.Count();

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            if (numberLimit != null && numberLimit > 0)
            {
                if (pageNo != null && pageNo > 0)
                {
                    query = query.Skip((pageNo.Value - 1) * numberLimit.Value).Take(numberLimit.Value);
                }
                else
                    query.Take(numberLimit.Value);
            }

            return new KeyValuePair<int, IQueryable<IEntity>>(count, query);
        }

        public IEntity GetFirstWhere(Expression<Func<IEntity, bool>> filter = null, string[] includeProperties = null)
        {
            IQueryable<IEntity> query = Entitiy;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties)
                {
                    query = query.Include(includeProperty);
                }
            }

            return query.FirstOrDefault();

        }

        public void Delete(IEntity entity)
        {
            Entitiy.Remove(entity);
        }

        public IEntity GetById(object Id)
        {
            return Entitiy.Find(Id);
        }

        public void Insert(IEntity entity)
        {
            Entitiy.Add(entity);
        }

        public void Update(IEntity entity)
        {
            Entitiy.Attach(entity);
            Context.Entry(entity).State = EntityState.Modified;
        }

        public IEntity GetSqlQuery(string query)
        {
            return Entitiy.FromSqlRaw(query).FirstOrDefault();
        }


        public void DeleteRange(List<IEntity> entities)
        {
            Entitiy.RemoveRange(entities);
        }

        public void InsertRange(List<IEntity> entities)
        {
            Entitiy.AddRange(entities);
        }

        public bool AnyWhere(Expression<Func<IEntity, bool>> filter = null)
        {
            return Entitiy.Any(filter);
        }


        public void Save()
        {
            Context.SaveChanges();
        }
    }
}
