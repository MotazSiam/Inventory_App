using Inventory_App.Entities;
using Inventory_App.Interface;
using Microsoft.EntityFrameworkCore;

namespace Inventory_App.Services
{
    public class TypeService : ITypeService
    {
        private readonly IGenericRepository<Entities.Type> Repo;

        public TypeService(IGenericRepository<Entities.Type> repo)
        {
            Repo = repo;


        }

        public IEnumerable<Entities.Type> GetAll() => Repo.GetAll(artist => artist.IsDeleted == false).Value.Include(p => p.Category);

      
        private Entities.Type Add(Entities.Type entity)
        {

            Repo.Insert(entity);
            Repo.Save();
            return entity;
        }
        public void Create(Entities.Type entity)
        {
            entity.IsDeleted = false;
            entity.CreatedDate = DateTime.Now;
            //var program = requestDTO.GetEntity();
            Add(entity);
        }
        public void Edit(Entities.Type entity) { 
        
            Update(entity);
        }
        public void Remove(int id)
        {

            var entity = Repo.GetById(id);
            entity.IsDeleted = true;
            Update(entity);
        }

        public Entities.Type GetById(int id)
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

        private void Update(Entities.Type entity)
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
