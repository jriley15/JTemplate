using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JTemplate.Data.Dto.Email
{
    public class EmailRequest
    {

        [Required]
        [EmailAddress]
        [StringLength(30)]
        public string Email { get; set; }
    }
}
