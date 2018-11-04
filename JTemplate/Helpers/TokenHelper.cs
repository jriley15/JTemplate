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
        public static String Access_Key = "#@%@%@!!!authenticationtoken~!!@$#^$@%@$!9284908njk1lkjasklahdy87712031@#!$%@%";

        public static String Email_Key = "#@%234234323545345$#^$@%@$emailtoken!9284908njk1lkjasklahdy87712031@#!$%@%";

        public static String Refresh_Key = "#@%234234323545345$#^$3453456$%$@#$@#refreshtoken$@%#^#^$%12031@#!$%@%";

        public static String Password_Reset_Key = "#@%23423432354533445$#^$3453456$%$2342434@#$@#refreshtoken$@%#^2#^$%12031@#!$%@%";


        public static String GenerateAccessToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Access_Key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString(), ClaimValueTypes.Integer),
                    new Claim(ClaimTypes.Role, user.Role),
                    //new Claim(ClaimTypes.Hash, HashHelper.GetStringSha256Hash(user.Authentication.Password)),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                //Expires = DateTime.UtcNow.AddSeconds(5),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public static String GenerateEmailConfirmToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Email_Key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString(), ClaimValueTypes.Integer)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public static String GenerateRefreshToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Refresh_Key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString(), ClaimValueTypes.Integer),
                    new Claim(ClaimTypes.Hash, HashHelper.GetStringSha256Hash(user.Authentication.Password))
                }),
                Expires = DateTime.UtcNow.AddDays(10),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public static String GeneratePasswordResetToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Password_Reset_Key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString(), ClaimValueTypes.Integer),
                    new Claim(ClaimTypes.Hash, HashHelper.GetStringSha256Hash(user.Authentication.Password))
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }




        public static ClaimsPrincipal ValidateAndDecodeEmailConfirmToken(string jwt)
        {
            var key = Encoding.ASCII.GetBytes(Email_Key);
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


        public static ClaimsPrincipal ValidateAndDecodePasswordReset(string jwt)
        {
            var key = Encoding.ASCII.GetBytes(Password_Reset_Key);
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

        public static ClaimsPrincipal ValidateAndDecodeRefreshToken(string jwt)
        {
            var key = Encoding.ASCII.GetBytes(Refresh_Key);
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
