using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Infrastucture;
using WebAPI.Models;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUnitOfwork _unitOfWork;
        IRepository<User> userRepository;
        public AccountController(IUnitOfwork unitOfwork)
        {
            _unitOfWork = unitOfwork;
            userRepository = new UserRepository(_unitOfWork);
        }

        [HttpPost("CreateUser")]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            var newUser = await userRepository.Create(user);
            return newUser;
        }
    }
}
