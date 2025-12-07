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
            // Enum converters
            CreateMap<string, M.UserTypes>().ConvertUsing(new String2EnumConverter<M.UserTypes>());
            CreateMap<M.UserTypes, string>().ConvertUsing(new Enum2StringConverter<M.UserTypes>());

            CreateMap<string, M.ComplaintStatus>().ConvertUsing(new String2EnumConverter<M.ComplaintStatus>());
            CreateMap<M.ComplaintStatus, string>().ConvertUsing(new Enum2StringConverter<M.ComplaintStatus>());

            CreateMap<string, M.Priority>().ConvertUsing(new String2EnumConverter<M.Priority>());
            CreateMap<M.Priority, string>().ConvertUsing(new Enum2StringConverter<M.Priority>());

            CreateMap<string, M.CaseAssignmentStatus>().ConvertUsing(new String2EnumConverter<M.CaseAssignmentStatus>());
            CreateMap<M.CaseAssignmentStatus, string>().ConvertUsing(new Enum2StringConverter<M.CaseAssignmentStatus>());

            CreateMap<string, M.CaseFileStatus>().ConvertUsing(new String2EnumConverter<M.CaseFileStatus>());
            CreateMap<M.CaseFileStatus, string>().ConvertUsing(new Enum2StringConverter<M.CaseFileStatus>());

            CreateMap<string, M.MeetingStatus>().ConvertUsing(new String2EnumConverter<M.MeetingStatus>());
            CreateMap<M.MeetingStatus, string>().ConvertUsing(new Enum2StringConverter<M.MeetingStatus>());

            CreateMap<string, M.MeetingParticipantRole>().ConvertUsing(new String2EnumConverter<M.MeetingParticipantRole>());
            CreateMap<M.MeetingParticipantRole, string>().ConvertUsing(new Enum2StringConverter<M.MeetingParticipantRole>());

            CreateMap<string, M.RelatedEntityType>().ConvertUsing(new String2EnumConverter<M.RelatedEntityType>());
            CreateMap<M.RelatedEntityType, string>().ConvertUsing(new Enum2StringConverter<M.RelatedEntityType>());

            // Users
            CreateMap<M.User, C.User>()
                .ForMember(dest => dest.UserType, opt => opt.MapFrom(src => src.UserType.ToString()))
                .ReverseMap()
                .ForMember(dest => dest.UserType, opt => opt.MapFrom(src => Enum.Parse<M.UserTypes>(src.UserType)));
            CreateMap<M.UserSession, C.UserSession>().ReverseMap();
            CreateMap<M.Role, C.Roles.Role>().ReverseMap();

            // Complaints
            CreateMap<M.Complaint, C.Complaints.Complaint>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
                .ForMember(dest => dest.Priority, opt => opt.MapFrom(src => src.Priority.ToString()))
                .ReverseMap()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<M.ComplaintStatus>(src.Status)))
                .ForMember(dest => dest.Priority, opt => opt.MapFrom(src => Enum.Parse<M.Priority>(src.Priority)));
            CreateMap<M.ComplaintCategory, C.Complaints.ComplaintCategory>().ReverseMap();
            CreateMap<M.ComplaintEvidence, C.Complaints.ComplaintEvidence>().ReverseMap();

            // Cases
            CreateMap<M.CaseAssignment, C.Cases.CaseAssignment>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
                .ReverseMap()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<M.CaseAssignmentStatus>(src.Status)));
            CreateMap<M.CaseFile, C.Cases.CaseFile>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
                .ReverseMap()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<M.CaseFileStatus>(src.Status)));
            CreateMap<M.CaseFileDocument, C.Cases.CaseFileDocument>().ReverseMap();

            // Explanations
            CreateMap<M.Explanation, C.Explanations.Explanation>().ReverseMap();

            // Meetings
            CreateMap<M.Meeting, C.Meetings.Meeting>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
                .ReverseMap()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<M.MeetingStatus>(src.Status)));
            CreateMap<M.MeetingParticipant, C.Meetings.MeetingParticipant>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.ToString()))
                .ReverseMap()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => Enum.Parse<M.MeetingParticipantRole>(src.Role)));

            // Notifications
            CreateMap<M.Notification, C.Notifications.Notification>()
                .ForMember(dest => dest.RelatedEntityType, opt => opt.MapFrom(src => src.RelatedEntityType.ToString()))
                .ReverseMap()
                .ForMember(dest => dest.RelatedEntityType, opt => opt.MapFrom(src => Enum.Parse<M.RelatedEntityType>(src.RelatedEntityType)));

            // Audit Logs
            CreateMap<M.AuditLog, C.AuditLogs.AuditLog>().ReverseMap();

            // Filters
            CreateMap<M.Filters.BaseModelFilter, C.BaseModelFilter>().ReverseMap();
            CreateMap<M.Filters.BaseModelFilter, C.Complaints.ComplaintFilter>().ReverseMap();

            // Paged entities
            CreateMap<PagedEntities<M.User>, PagedEntities<C.User>>().ReverseMap();
            CreateMap<PagedEntities<M.Complaint>, PagedEntities<C.Complaints.Complaint>>().ReverseMap();
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