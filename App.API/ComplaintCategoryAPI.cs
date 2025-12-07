using AutoMapper;
using App.API.Contracts.Complaints;
using App.Services;
using Microsoft.AspNetCore.Mvc;

namespace App.API
{
    [Route("api/v0.1/complaint-categories")]
    [ApiController]
    public class ComplaintCategoryAPI : BaseAPI
    {
        public ComplaintCategoryAPI(ComplaintCategoryServices complaintCategoryServices, IMapper mapper)
        {
            _ComplaintCategoryServices = complaintCategoryServices;
            _Mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateComplaintCategory([FromBody] ComplaintCategory cCategory)
        {
            await _ComplaintCategoryServices.CreateComplaintCategory(cCategory.ToModel(_Mapper));
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateComplaintCategory([FromBody] ComplaintCategory cCategory)
        {
            await _ComplaintCategoryServices.UpdateComplaintCategory(cCategory.ToModel(_Mapper));
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllComplaintCategories()
        {
            return Ok(ComplaintCategory.ToContracts(await _ComplaintCategoryServices.GetAllComplaintCategories(), _Mapper));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetComplaintCategoryById(int id)
        {
            var category = await _ComplaintCategoryServices.GetComplaintCategoryById(id);
            if (category == null)
                return NotFound();
            return Ok(ComplaintCategory.ToContract(category, _Mapper));
        }

        private readonly ComplaintCategoryServices _ComplaintCategoryServices;
        private readonly IMapper _Mapper;
    }
}

