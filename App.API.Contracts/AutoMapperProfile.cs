using AutoMapper;
using App.Core.Models;
using C = App.API.Contracts;
using M = App.Models;

namespace App.API.Contracts
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<M.User, C.User>().ReverseMap();
            CreateMap<M.UserSession, C.UserSession>().ReverseMap();

            // Enum conversions
            CreateMap<string, M.UserTypes>().ConvertUsing(new String2EnumConverter<M.UserTypes>());
            CreateMap<M.UserTypes, string>().ConvertUsing(new Enum2StringConverter<M.UserTypes>());

            // Paged entities
            CreateMap<PagedEntities<M.User>, PagedEntities<C.User>>().ReverseMap();
        }

        internal class String2EnumConverter<TEnum> : ITypeConverter<string, TEnum>
        {
            public TEnum Convert(string source, TEnum destination, ResolutionContext context)
            {
                return (TEnum)Enum.Parse(typeof(TEnum), source);
            }
        }

        internal class Enum2StringConverter<TEnum> : ITypeConverter<TEnum, string>
        {
            public string Convert(TEnum source, string destination, ResolutionContext context)
            {
                return source.ToString();
            }
        }
    }
} 