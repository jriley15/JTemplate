using JTemplate.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JTemplate.Data.Dto.Login
{
    public class LoginResponse : Response 
    {

        public Auth Auth { get; set; }

        public LoginResponse() : base()
        {

        }




    }
}
