using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JTemplate.Data.Dto
{
    public class Error
    {
        public String Key { get; set; }
        public String Message { get; set; }

        public Error(string key, string message)
        {
            Key = key;
            Message = message;
        }
    }
}
