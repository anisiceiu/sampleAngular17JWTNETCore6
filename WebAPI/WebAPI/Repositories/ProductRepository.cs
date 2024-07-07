using WebAPI.Infrastucture;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class ProductRepository:RepositoryBase<Product>
    {
        public ProductRepository(IUnitOfwork unitOfwork) : base(unitOfwork)
        {
        }
    }
}
