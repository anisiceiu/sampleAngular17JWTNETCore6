using Microsoft.EntityFrameworkCore;
using WebAPI.Infrastucture;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class UserRepository : RepositoryBase<User>
    {
        public UserRepository(IUnitOfwork unitOfwork):base(unitOfwork)
        {
                
        }
    }
}
