using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JTemplate.Data.Dto.Login
{
    public class LoginRequest
    {
        [Required]
        [EmailAddress]
        [StringLength(30)]
        public String Email { get; set; }

        [Required]
        [StringLength(30)]
        [DataType(DataType.Password)]
        public String Password { get; set; }

        public LoginRequest(string email, string password)
        {
            Email = email;
            Password = password;
        }
    }
}
