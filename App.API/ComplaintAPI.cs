using AutoMapper;
using App.API.Contracts.Complaints;
using App.Services;
using Microsoft.AspNetCore.Mvc;

namespace App.API
{
    [Route("api/v0.1/complaints")]
    [ApiController]
    public class ComplaintAPI : BaseAPI
    {
        public ComplaintAPI(ComplaintServices complaintServices, IMapper mapper)
        {
            _ComplaintServices = complaintServices;
            _Mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateComplaint([FromBody] Complaint cComplaint)
        {
            await _ComplaintServices.CreateComplaint(cComplaint.ToModel(_Mapper));
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateComplaint([FromBody] Complaint cComplaint)
        {
            await _ComplaintServices.UpdateComplaint(cComplaint.ToModel(_Mapper));
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllComplaints()
        {
            return Ok(Complaint.ToContracts(await _ComplaintServices.GetAllComplaints(), _Mapper));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetComplaintById(int id)
        {
            var complaint = await _ComplaintServices.GetComplaintById(id);
            if (complaint == null)
                return NotFound();
            return Ok(Complaint.ToContract(complaint, _Mapper));
        }

        [HttpGet("complainant/{complainantId}")]
        public async Task<IActionResult> GetComplaintsByComplainant(int complainantId)
        {
            return Ok(Complaint.ToContracts(await _ComplaintServices.GetComplaintsByComplainant(complainantId), _Mapper));
        }

        private readonly ComplaintServices _ComplaintServices;
        private readonly IMapper _Mapper;
    }
}

