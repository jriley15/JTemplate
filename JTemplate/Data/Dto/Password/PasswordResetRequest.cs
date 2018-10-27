using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JTemplate.Data.Dto.Password
{
    public class PasswordResetRequest
    {

        [Required]
        [StringLength(500)]
        public string Token { get; set; }

        [Required]
        [StringLength(30, ErrorMessage = "Password can't be more than 30 characters.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 5, ErrorMessage = "Passwords must be between 5 and 30 characters.")]
        [DataType(DataType.Password, ErrorMessage = "Invalid format.")]
        [Compare(nameof(Password), ErrorMessage = "Passwords don't match.")]
        public string PasswordConfirm { get; set; }


    }
}
