using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace JTemplate.Data.Models
{
    public class Authentication
    {
        public int AuthenticationId { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public int Type { get; set; }

        public string Token { get; set; }

        public DateTime LastEmail { get; set; }

        //parent user relation
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

    }
}
