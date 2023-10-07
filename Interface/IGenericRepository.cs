using System.Linq.Expressions;

namespace Inventory_App.Interface
{
    public interface IGenericRepository<IEntity> where IEntity : class
    {

        public KeyValuePair<int, IQueryable<IEntity>> GetAll(Expression<Func<IEntity, bool>> filter = null,
                                           Func<IQueryable<IEntity>, IOrderedQueryable<IEntity>> orderBy = null,
                                           string[] includeProperties = null,
                                           int? numberLimit = null,
                                           int? pageNo = null);
        public IEntity GetFirstWhere(Expression<Func<IEntity, bool>> filter = null, string[] includeProperties = null);
        public bool AnyWhere(Expression<Func<IEntity, bool>> filter = null);
        public IEntity GetById(object Id);
        public IEntity GetSqlQuery(string query);
        public void Insert(IEntity entity);
        public void InsertRange(List<IEntity> entities);
        public void Update(IEntity entity);
        public void Delete(IEntity entity);
        public void DeleteRange(List<IEntity> entities);

        public void Save();
    }
}
