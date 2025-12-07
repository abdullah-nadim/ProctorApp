using App.Models;
using App.Models.Repositories;
using App.Repositories;
using Microsoft.Extensions.Logging;

namespace App.Services
{
    public class MeetingServices : BaseServices
    {
        private readonly ILogger<MeetingServices> _logger;

        public MeetingServices(DatabaseContext context, ILogger<MeetingServices> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<int> CreateMeeting(Meeting meeting)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                await factory.GetMeetingRepository().CreateAsync(meeting);
                factory.Commit();
                return meeting.Id;
            }
        }

        public async Task UpdateMeeting(Meeting updatedMeeting)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                IMeetingRepository repository = factory.GetMeetingRepository();
                Meeting updatingMeeting = await repository.ReadAsync(updatedMeeting.Id);
                if (updatingMeeting != null)
                {
                    updatingMeeting.Update(updatedMeeting);
                    repository.Update(updatingMeeting);
                    factory.Commit();
                }
            }
        }

        public async Task<Meeting?> GetMeetingById(int id)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetMeetingRepository().ReadAsync(id);
            }
        }

        public async Task<List<Meeting>> GetMeetingsByComplaint(int complaintId)
        {
            using (IRepositoryFactory factory = new RepositoryFactory(_Context))
            {
                return await factory.GetMeetingRepository().ReadManyByComplaint(complaintId);
            }
        }
    }
}

