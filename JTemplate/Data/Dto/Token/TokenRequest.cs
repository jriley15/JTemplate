using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JTemplate.Data.Dto.Token
{
    public class TokenRequest
    {
        [Required]
        public string Token { get; set; }


    }
}
