using AutoMapper;
using App.API.Contracts;
using App.Services;
using Microsoft.AspNetCore.Mvc;
using C = App.API.Contracts;

namespace App.API
{
    [Route("api/v0.1/users")]
    [ApiController]
    public class UserAPI : BaseAPI
    {
        public UserAPI(UserServices userServices, IMapper mapper)
        {
            _UserServices = userServices;
            _Mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] C.User cUser)
        {
            await _UserServices.CreateAsync(cUser.ToModel(_Mapper));
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] C.User cUser)
        {
            await _UserServices.UpdateUser(cUser.ToModel(_Mapper));
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(C.User.ToContracts(await _UserServices.ReadManyAsync(), _Mapper));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _UserServices.ReadAsync(id);
            if (user == null)
                return NotFound();
            return Ok(C.User.ToContract(user, _Mapper));
        }

        private readonly UserServices _UserServices;
        private readonly IMapper _Mapper;
    }
}

