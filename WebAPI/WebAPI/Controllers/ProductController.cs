using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Infrastucture;
using WebAPI.Models;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController,Authorize]
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfwork _unitOfWork;
        IRepository<Product> productRepository;

        public ProductController(IUnitOfwork unitOfwork)
        {
                _unitOfWork = unitOfwork;
            productRepository = new ProductRepository(_unitOfWork);
        }

        [HttpGet("ProductList")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await productRepository.Get();
            return products;
        }

        [HttpGet("ProductDetail")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            var product = await _unitOfWork.Context.Set<Product>().Where(c=> c.Id == id).FirstOrDefaultAsync();
            
            return Ok(product);
        }


        [HttpPost("CreateProduct")]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            var products = await productRepository.Create(product);
            return products;
        }

        [HttpPut("UpdateProduct")]
        public async Task<ActionResult<Product>> UpdateProduct(Product productModel)
        {
            var product = await productRepository.Update(productModel.Id, productModel);
            return product;
        }

        [HttpPost("DeleteProduct")]
        public async Task<IActionResult> DeleteProduct(Product productModel)
        {
            var product = await productRepository.Delete(productModel.Id);
            return product;
        }
    }
}
