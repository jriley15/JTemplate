using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JTemplate.Data.Dto.Email
{
    public class ConfirmEmailRequest
    {

        [Required]
        public string Token { get; set; }


    }
}
