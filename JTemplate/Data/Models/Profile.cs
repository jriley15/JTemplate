using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace JTemplate.Data.Models
{
    public class Profile
    {
        public int ProfileId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }



        //dates
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

        //parent user relation
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

    }
}
