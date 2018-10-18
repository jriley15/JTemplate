using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using JTemplate.Data.Dto;
using JTemplate.Data.Dto.Email;
using JTemplate.Data.Dto.Login;
using JTemplate.Services;
using JTemplate.Extensions;
using JTemplate.Data.Dto.Register;
using JTemplate.Data.Models;

namespace JTemplate.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {

        //handles user login and logout routes

        private IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }


        //create account / register
        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Register([FromBody]RegisterRequest request)
        {

            if (ModelState.IsValid)
            {
                RegisterResponse response = userService.Register(request);

                if (response.Success)
                {
                    return Ok(response.Message);
                }

                return BadRequest(response.AllErrors());
            }

            return BadRequest(ModelState.Errors());


        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Login([FromBody]LoginRequest request)
        {
            if (ModelState.IsValid)
            {
                LoginResponse response = userService.Login(request);

                if (response.Success)
                {
                    return Ok(response.Auth);
                }

                return NotFound(response.AllErrors());
            }

            return BadRequest(ModelState.Errors());
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public IActionResult ConfirmEmail(string token)
        {
            if (ModelState.IsValid)
            {
                ConfirmEmailResponse response = userService.ConfirmEmail(token);

                if (response.Success)
                {
                    return Ok(response);
                }

                return NotFound(response.AllErrors());
            }

            return BadRequest(ModelState.Errors());
        }





    }
}