using Microsoft.IdentityModel.Tokens;
using JTemplate.Data.Dto;
using JTemplate.Data.Dto.Login;
using JTemplate.Data.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace JTemplate.Helpers
{
    public class TokenHelper
    {
        public static String Key = "SecretSecretSecretSecretSecretSecretSecretSecretSecretSecretSecretSecretSecretSecretSecretSecret";

        public static Auth Generate(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString(), ClaimValueTypes.Integer),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new Auth(user.UserId, user.Email, tokenHandler.WriteToken(token));
        }

        public static ClaimsPrincipal ValidateAndDecode(string jwt)
        {
            var key = Encoding.ASCII.GetBytes(Key);
            var validationParameters = new TokenValidationParameters
            {
                // Specify the key used to sign the token:
                IssuerSigningKey = new SymmetricSecurityKey(key),
                RequireSignedTokens = true,
                // Ensure the token hasn't expired:
                RequireExpirationTime = true,
                ValidateLifetime = true,

                ValidateAudience = false,
                ValidateIssuer = false,


            };

            try
            {
                var claimsPrincipal = new JwtSecurityTokenHandler()
                    .ValidateToken(jwt, validationParameters, out var rawValidatedToken);

                return claimsPrincipal;
                // Or, you can return the ClaimsPrincipal
                // (which has the JWT properties automatically mapped to .NET claims)
            }
            catch (SecurityTokenValidationException stvex)
            {
                // The token failed validation!
                // TODO: Log it or display an error.
                throw new Exception($"Token failed validation: {stvex.Message}");
            }
            catch (ArgumentException argex)
            {
                // The token was not well-formed or was invalid for some other reason.
                // TODO: Log it or display an error.
                throw new Exception($"Token was invalid: {argex.Message}");
            }
        }



    }
}
