using AutoMapper;
using App.API.Contracts.Cases;
using App.Services;
using Microsoft.AspNetCore.Mvc;

namespace App.API
{
    [Route("api/v0.1/case-assignments")]
    [ApiController]
    public class CaseAssignmentAPI : BaseAPI
    {
        public CaseAssignmentAPI(CaseAssignmentServices caseAssignmentServices, IMapper mapper)
        {
            _CaseAssignmentServices = caseAssignmentServices;
            _Mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCaseAssignment([FromBody] CaseAssignment cAssignment)
        {
            await _CaseAssignmentServices.CreateCaseAssignment(cAssignment.ToModel(_Mapper));
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCaseAssignment([FromBody] CaseAssignment cAssignment)
        {
            await _CaseAssignmentServices.UpdateCaseAssignment(cAssignment.ToModel(_Mapper));
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCaseAssignmentById(int id)
        {
            var assignment = await _CaseAssignmentServices.GetCaseAssignmentById(id);
            if (assignment == null)
                return NotFound();
            return Ok(CaseAssignment.ToContract(assignment, _Mapper));
        }

        [HttpGet("assignee/{assigneeId}")]
        public async Task<IActionResult> GetCaseAssignmentsByAssignee(int assigneeId)
        {
            return Ok(CaseAssignment.ToContracts(await _CaseAssignmentServices.GetCaseAssignmentsByAssignee(assigneeId), _Mapper));
        }

        [HttpGet("complaint/{complaintId}")]
        public async Task<IActionResult> GetCaseAssignmentsByComplaint(int complaintId)
        {
            return Ok(CaseAssignment.ToContracts(await _CaseAssignmentServices.GetCaseAssignmentsByComplaint(complaintId), _Mapper));
        }

        private readonly CaseAssignmentServices _CaseAssignmentServices;
        private readonly IMapper _Mapper;
    }
}

