using AutoMapper;
using App.API.Contracts.Meetings;
using App.Services;
using Microsoft.AspNetCore.Mvc;

namespace App.API
{
    [Route("api/v0.1/meetings")]
    [ApiController]
    public class MeetingAPI : BaseAPI
    {
        public MeetingAPI(MeetingServices meetingServices, IMapper mapper)
        {
            _MeetingServices = meetingServices;
            _Mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateMeeting([FromBody] Meeting cMeeting)
        {
            await _MeetingServices.CreateMeeting(cMeeting.ToModel(_Mapper));
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateMeeting([FromBody] Meeting cMeeting)
        {
            await _MeetingServices.UpdateMeeting(cMeeting.ToModel(_Mapper));
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMeetingById(int id)
        {
            var meeting = await _MeetingServices.GetMeetingById(id);
            if (meeting == null)
                return NotFound();
            return Ok(Meeting.ToContract(meeting, _Mapper));
        }

        [HttpGet("complaint/{complaintId}")]
        public async Task<IActionResult> GetMeetingsByComplaint(int complaintId)
        {
            return Ok(Meeting.ToContracts(await _MeetingServices.GetMeetingsByComplaint(complaintId), _Mapper));
        }

        private readonly MeetingServices _MeetingServices;
        private readonly IMapper _Mapper;
    }
}

