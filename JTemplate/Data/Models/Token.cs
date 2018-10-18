using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JTemplate.Data.Models
{
    public class Token
    {

        //0 for email activation, 1 for password reset
        public int Type { get; set; }

        public int UserId { get; set; }

        public string Value { get; set; }

        public DateTime Expires { get; set; }



    }
}
