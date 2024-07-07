using Microsoft.EntityFrameworkCore;

namespace WebAPI.Infrastucture
{
    public interface IUnitOfwork : IDisposable
    {
        DbContext Context { get; }
        public Task SaveChangesAsync();
    }
}
