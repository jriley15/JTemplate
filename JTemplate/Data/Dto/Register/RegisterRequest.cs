using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JTemplate.Data.Dto.Register
{
    public class RegisterRequest
    {


        [Required]
        [EmailAddress]
        [StringLength(30, MinimumLength = 5)]
        public String Email { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 5)]
        [DataType(DataType.Password)]
        public String Password { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 5)]
        [DataType(DataType.Password)]
        [Compare(nameof(Password), ErrorMessage = "Passwords don't match.")]
        public string PasswordConfirm { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }



    }
}
