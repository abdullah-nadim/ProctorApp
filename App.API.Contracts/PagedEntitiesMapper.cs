using App.Core.Models;
using AutoMapper;

namespace App.API.Contracts
{
    public static class PagedEntitiesMapper<TContract, TModel>
    {
        public static PagedEntities<TContract> ToContract(PagedEntities<TModel> model, IMapper mapper)
        {
            return mapper.Map<PagedEntities<TContract>>(model);
        }
    }
}

