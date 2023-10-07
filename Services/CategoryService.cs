using Inventory_App.Entities;
using Inventory_App.Interface;

namespace Inventory_App.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IGenericRepository<Category> Repo;

        public CategoryService(IGenericRepository<Category> repo)
        {
            Repo = repo;


        }

        public IEnumerable<Category> GetAll() => Repo.GetAll(ca => ca.IsDeleted == false).Value;



        private Category Add(Category entity)
        {

            Repo.Insert(entity);
            Repo.Save();
            return entity;
        }
        public void Create(Category entity)
        {
            entity.IsDeleted = false;
            entity.CreatedDate = DateTime.Now;
            //var program = requestDTO.GetEntity();
            Add(entity);
        }

        public void Edit(Category entity)
        {
            Update(entity);
        }

        public void Remove(int id)
        {

            var entity = Repo.GetById(id);
            entity.IsDeleted = true;
            Update(entity);
        }

        public Category GetById(int id)
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

        private void Update(Category entity)
        {
           
            Repo.Update(entity);
            Repo.Save();
        }

        //public void Edit(ArtistDTO requestDTO)
        //{
        //    var brand = requestDTO.GetEntity();
        //    Update(brand);
        //}

    }
}
