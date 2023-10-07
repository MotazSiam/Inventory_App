using Inventory_App.Entities;
using Inventory_App.Interface;

namespace Inventory_App.Services
{
    public class BrandService : IBrandService
    {

        private readonly IGenericRepository<Brand> Repo;

        public BrandService(IGenericRepository<Brand> repo)
        {
            Repo = repo;
        }

        public IEnumerable<Brand> GetAll() => Repo.GetAll(artist => artist.IsDeleted == false).Value;



        private Brand Add(Brand entity)
        {

            Repo.Insert(entity);
            Repo.Save();
            return entity;
        }
        public void Create(Brand entity)
        {
            entity.IsDeleted = false;
            entity.CreatedDate= DateTime.Now;
            //var program = requestDTO.GetEntity();
            Add(entity);
        }

        public void Remove(int id)
        {

            var brand = Repo.GetById(id);
            brand.IsDeleted = true;
            Update(brand);
        }

        public Brand GetById(int id)
        {
            var entity = Repo.GetById(id);
            //var result = new ArtistResultDTO().GetDTO(entity);
            return entity;
        }

        public void Edit(Brand entity)
        {
            Update(entity);


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

        private void Update(Brand entity)
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
