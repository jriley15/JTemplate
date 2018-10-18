using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JTemplate.Data.Dto
{
    public class Response
    {
        public Boolean Success { get; set; }

        public List<Error> Errors { get; set; }

        public String Message { get; set; }


        public Response()
        {
            Success = false;
            Errors = new List<Error>();
            Message = "";
        }

        public object AllErrors()
        {
            return new { errors = Errors };
        }

        public void AddError(string key, string msg)
        {
            this.Errors.Add(new Error(key, msg));
        }

    }
}
