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
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        [StringLength(50, ErrorMessage = "Email can't be more than 50 characters.")]
        public String Email { get; set; }

        [Required]
        [StringLength(30, ErrorMessage = "Password can't be more than 30 characters.")]
        [DataType(DataType.Password)]
        public String Password { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 5, ErrorMessage = "Passwords must be between 5 and 30 characters.")]
        [DataType(DataType.Password, ErrorMessage = "Invalid format.")]
        [Compare(nameof(Password), ErrorMessage = "Passwords don't match.")]
        public string PasswordConfirm { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }



    }
}
