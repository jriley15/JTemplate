using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace JTemplate.Data.Models
{
    public class User
    {
        public int UserId { get; set; }

        public bool Verified { get; set; }

        public string Role { get; set; }

        //child profile
        public Profile Profile { get; set; }


        //child authentication
        public Authentication Authentication { get; set; }

    }
}
