using Inventory_App.Entities;
using Inventory_App.Interface;

namespace Inventory_App.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly IGenericRepository<Customer> Repo;

        public CustomerService(IGenericRepository<Customer> repo)
        {
            Repo = repo;
        }

        public IEnumerable<Customer> GetAll() => Repo.GetAll(customer => customer.IsDeleted == false).Value;



        private Customer Add(Customer entity)
        {

            Repo.Insert(entity);
            Repo.Save();
            return entity;
        }
        public void Create(Customer entity)
        {
            entity.IsDeleted = false;
            entity.CreatedDate = DateTime.Now;
            //var program = requestDTO.GetEntity();
            Add(entity);
        }

        public void Remove(Guid id)
        {

            var customer = Repo.GetById(id);
            customer.IsDeleted = true;
            Update(customer);
        }

        public Customer GetById(int id)
        {
            var entity = Repo.GetById(id);
            //var result = new ArtistResultDTO().GetDTO(entity);
            return entity;
        }

        public void Edit(Customer entity)
        {
            Update(entity);


        }

        public Customer GetById(Guid id)
        {
            var entity = Repo.GetById(id);
            //var result = new ArtistResultDTO().GetDTO(entity);
            return entity;
        }
        //public SearchResultDTO Search(SearchRequestDTO requestDTO)
        //{
        //    var result = Repo.GetAll(brand => brand.Name.ToLower().Contains(requestDTO.Key.ToLower()) &&
        //    brand.CreatedDate >= requestDTO.FromDate &&
        //    brand.CreatedDate <= requestDTO.ToDate,
        //    numberLimit: requestDTO.NumberLimit,
        //    pageNo: requestDTO.Page
        //    );


        //    var count = new SearchResultDTO
        //    {
        //        artists = result.Value.ToList(),
        //        SearchResultCount = result.Key,
        //        NextPage = requestDTO.Page == 0 ? 0 : requestDTO.Page++
        //    };

        //    return count;
        //}

        private void Update(Customer entity)
        {

            Repo.Update(entity);
            Repo.Save();
        }
    }
}
