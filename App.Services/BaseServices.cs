using App.Repositories;

namespace App.Services
{
    public abstract class BaseServices
    {
        public BaseServices(DatabaseContext context) { _Context = context; }
        protected readonly DatabaseContext _Context;
    }
} 