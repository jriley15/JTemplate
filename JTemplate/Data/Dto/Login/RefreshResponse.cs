using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JTemplate.Data.Dto.Login
{
    public class RefreshResponse : Response
    {

        public Auth Auth { get; set; }

        public RefreshResponse() : base()
        {

        }


    }
}
