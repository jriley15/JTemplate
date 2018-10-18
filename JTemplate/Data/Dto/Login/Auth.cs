using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JTemplate.Data.Dto.Login
{
    public class Auth
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Token { get; set; }

        public Auth(int id, string email, string token)
        {
            Email = email;
            Id = id;
            Token = token;
        }

    }
}
