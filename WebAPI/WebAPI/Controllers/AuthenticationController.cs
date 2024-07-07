using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.Infrastucture;
using WebAPI.Models;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUnitOfwork _unitOfWork;
        IRepository<User> userRepository;
        public AuthenticationController(IUnitOfwork unitOfwork)
        {
            _unitOfWork = unitOfwork;
            userRepository = new UserRepository(_unitOfWork);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Login user)
        {
            if (user is null)
            {
                return BadRequest("Invalid user request!!!");
            }

            var resultUser = _unitOfWork.Context.Set<User>().Where(c => c.Username == user.UserName && c.Password == user.Password).FirstOrDefault();

            if (resultUser != null)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Config.ConfigurationManager.AppSetting["JWT:Secret"]));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                
                var tokeOptions = new JwtSecurityToken(
                    issuer: Config.ConfigurationManager.AppSetting["JWT:ValidIssuer"],
                    audience: Config.ConfigurationManager.AppSetting["JWT:ValidAudience"],
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(6),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new JWTTokenResponse { Token = tokenString });
            }
            return Unauthorized();
        }
    }
}
