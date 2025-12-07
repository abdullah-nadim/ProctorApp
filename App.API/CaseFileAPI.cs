using AutoMapper;
using App.API.Contracts.Cases;
using App.Services;
using Microsoft.AspNetCore.Mvc;

namespace App.API
{
    [Route("api/v0.1/case-files")]
    [ApiController]
    public class CaseFileAPI : BaseAPI
    {
        public CaseFileAPI(CaseFileServices caseFileServices, IMapper mapper)
        {
            _CaseFileServices = caseFileServices;
            _Mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCaseFile([FromBody] CaseFile cCaseFile)
        {
            await _CaseFileServices.CreateCaseFile(cCaseFile.ToModel(_Mapper));
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCaseFile([FromBody] CaseFile cCaseFile)
        {
            await _CaseFileServices.UpdateCaseFile(cCaseFile.ToModel(_Mapper));
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCaseFileById(int id)
        {
            var caseFile = await _CaseFileServices.GetCaseFileById(id);
            if (caseFile == null)
                return NotFound();
            return Ok(CaseFile.ToContract(caseFile, _Mapper));
        }

        [HttpGet("complaint/{complaintId}")]
        public async Task<IActionResult> GetCaseFilesByComplaint(int complaintId)
        {
            return Ok(CaseFile.ToContracts(await _CaseFileServices.GetCaseFilesByComplaint(complaintId), _Mapper));
        }

        private readonly CaseFileServices _CaseFileServices;
        private readonly IMapper _Mapper;
    }
}

