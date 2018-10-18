using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;

namespace JTemplate.Extensions
{
    public static class IdentityExtensions
    {
        public static int GetUserId(this IIdentity identity)
        {
            ClaimsIdentity claimsIdentity = identity as ClaimsIdentity;
            Claim claim = claimsIdentity?.FindFirst(ClaimTypes.Name);

            if (claim == null)
                return 0;

            return int.Parse(claim.Value);
        }


    }
}
