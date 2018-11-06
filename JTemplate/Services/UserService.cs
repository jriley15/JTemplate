using Microsoft.IdentityModel.Tokens;
using JTemplate.Data;
using JTemplate.Data.Dto;
using JTemplate.Data.Models;
using JTemplate.Helpers;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using JTemplate.Data.Dto.Login;
using JTemplate.Data.Dto.Register;
using Microsoft.EntityFrameworkCore;
using JTemplate.Data.Dto.Password;
using Google.Apis.Auth;

namespace JTemplate.Services
{
    public interface IUserService
    {
        LoginResponse Login(LoginRequest request);

        LoginResponse GoogleLogin(string token);

        void Logout();

        RegisterResponse Register(RegisterRequest request);

        Response ConfirmEmail(string token);

        Response ResendEmail(string email);

        Response SendPasswordReset(string email);

        Response ResetPassword(PasswordResetRequest request);

        RefreshResponse RefreshToken(string token);
    }
    public class UserService : IUserService
    {

        private DataContext dbContext;


        public UserService(DataContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public RegisterResponse Register(RegisterRequest request)
        {
            RegisterResponse response = new RegisterResponse();

            //check if email is already in use
            if (dbContext.Authentication.Any(user => user.Email == request.Email))
            {
                response.Success = false;
                response.AddError("Email", "Email already exists");
            }
            else
            {

                //create user
                User newUser = new User() {Verified = false, Role = "User" };

                //create profile
                Profile newProfile = new Profile() { FirstName = request.FirstName, LastName = request.LastName, DateCreated  = DateTime.Now, DateModified = DateTime.Now};
                newUser.Profile = newProfile;

                Authentication newAuth = new Authentication() { Email = request.Email, Password = PasswordHelper.HashPassword(request.Password), Type = 0 };
                newUser.Authentication = newAuth;

                dbContext.Users.Add(newUser);
                dbContext.SaveChanges();

                //create email confirmation token
                string token = TokenHelper.GenerateEmailConfirmToken(newUser);

                //send link to users email
                //localhost/Auth/ConfirmEmail
                //http://localhost:3000/register

                String body = "Email confirmation link: <a href='http://localhost:3000/emailConfirm?token=" + token + "'>Click here</a>";

                EmailHelper.Send(newUser.Authentication.Email, "Email Confirmation", body);

                response.Success = true;
                response.Message = "Successfully registered";
            }

            return response;
        }

        public LoginResponse Login(LoginRequest request)
        {

            LoginResponse response = new LoginResponse();

            Authentication auth = dbContext.Authentication.Include(a => a.User).SingleOrDefault(a => a.Email == request.Email && PasswordHelper.VerifyPassword(request.Password, a.Password));


            if (auth != null && auth.User != null)
            {
                if (auth.Type == 0)
                {
                    if (auth.User.Verified)
                    {
                        response.Success = true;
                        response.Auth = new Auth(auth.UserId, auth.Email, TokenHelper.GenerateAccessToken(auth.User), TokenHelper.GenerateRefreshToken(auth.User));
                        response.Message = "You successfully logged in as " + auth.Email;

                    }
                    else
                    {
                        response.Success = false;
                        response.AddError("*", "Email has not been confirmed");
                    }
                } else
                {
                    response.Success = false;
                    response.AddError("*", "Account was registered with an external service");
                }

            }
            else
            {
                response.Success = false;
                response.AddError("*", "Invalid email or password");
            }
            return response;
        }


        public void Logout()
        {
            throw new NotImplementedException();
        }

        public Response ConfirmEmail(string token)
        {

            Response response = new Response();

            try
            {
                int UserId = int.Parse(TokenHelper.ValidateAndDecodeEmailConfirmToken(token).Identity.Name);
                User user = dbContext.Users.FirstOrDefault(u => u.UserId == UserId);

                if (user != null)
                {
                    if (user.Verified)
                    {
                        response.Success = false;
                        response.AddError("*", "Email already confirmed");
                    }
                    else
                    {
                        user.Verified = true;
                        dbContext.SaveChanges();

                        response.Success = true;
                        response.Message = "Email successfully verified";
                    }
                }
                else
                {
                    response.Success = false;
                    response.AddError("*", "Link is invalid or has expired");
                }
            }
            catch (Exception e)
            {
                response.Success = false;
                response.AddError("*", "Link is invalid or has expired");
            }

            return response;

        }

        public Response ResendEmail(string email)
        {
            Response response = new Response();

            try
            {
                Authentication auth = dbContext.Authentication.Include(a => a.User).SingleOrDefault(a => a.Email == email);

                if (auth != null && auth.User != null)
                {
                    if (auth.User.Verified)
                    {
                        response.Success = false;
                        response.AddError("*", "Email already confirmed");
                    }
                    else
                    {
                        string token = TokenHelper.GenerateEmailConfirmToken(auth.User);

                        String body = "Email confirmation link: <a href='http://localhost:3000/emailConfirm?token=" + token + "'>Click here</a>";
                        EmailHelper.Send(auth.Email, "Email Confirmation", body);
                        auth.LastEmail = DateTime.Now;
                        dbContext.SaveChanges();

                        response.Success = true;
                        response.Message = "Email successfully sent";
                    }
                }
                else
                {
                    response.Success = false;
                    response.AddError("*", "Email doesn't exist in our system");
                }
            }
            catch (Exception e)
            {
                response.Success = false;
                response.AddError("*", "Email doesn't exist in our system");
            }

            return response;

        }

        public Response SendPasswordReset(string email)
        {
            Response response = new Response();

            try
            {
                Authentication auth = dbContext.Authentication.Include(a => a.User).SingleOrDefault(a => a.Email == email);

                if (auth != null && auth.User != null)
                {
                    if (DateTime.Now.Subtract(auth.LastEmail).TotalHours < 1)
                    {
                        response.Success = false;
                        response.AddError("*", "Wait an hour to try this again");
                    }
                    else
                    {
                        string token = TokenHelper.GeneratePasswordResetToken(auth.User);

                        String body = "Password reset link: <a href='http://localhost:3000/resetPassword?token=" + token + "'>Click here</a>";
                        EmailHelper.Send(auth.Email, "Password Reset", body);
                        auth.LastEmail = DateTime.Now;
                        dbContext.SaveChanges();

                        response.Success = true;
                        response.Message = "Email successfully sent";
                    }
                }
                else
                {
                    response.Success = false;
                    response.AddError("*", "Email doesn't exist in our system");
                }
            }
            catch (Exception e)
            {
                response.Success = false;
                response.AddError("*", "Email doesn't exist in our system");
            }

            return response;

        }



        public Response ResetPassword(PasswordResetRequest request)
        {
            Response response = new Response();

            try
            {
                ClaimsPrincipal claim = TokenHelper.ValidateAndDecodePasswordReset(request.Token);
                int UserId = int.Parse(claim.Identity.Name);

                Authentication auth = dbContext.Authentication.Include(a => a.User).SingleOrDefault(a => a.UserId == UserId);

                if (auth != null)
                {
                    string passwordHash = claim.Identities.FirstOrDefault().Claims.Where(c => c.Type == ClaimTypes.Hash).Single().Value;

                    //make sure password hasn't changed since token was issued
                    if (HashHelper.GetStringSha256Hash(auth.Password) != passwordHash)
                    {
                        response.Success = false;
                        response.AddError("*", "Password has been changed since this link was generated.");
                    }
                    else
                    {
                        auth.Password = PasswordHelper.HashPassword(request.Password);
                        dbContext.SaveChanges();

                        response.Success = true;
                        response.Message = "Password successfully changed";
                    }
                }
                else
                {
                    response.Success = false;
                    response.AddError("*", "Link is invalid or has expired");
                }
            }
            catch (Exception e)
            {
                response.Success = false;
                response.AddError("*", "Link is invalid or has expired");
            }

            return response;

        }

        public RefreshResponse RefreshToken(string token)
        {

            RefreshResponse response = new RefreshResponse();

            try
            {
                ClaimsPrincipal claim = TokenHelper.ValidateAndDecodeRefreshToken(token);
                int UserId = int.Parse(claim.Identity.Name);

                Authentication auth = dbContext.Authentication.Include(a => a.User).SingleOrDefault(a => a.UserId == UserId);

                if (auth != null)
                {
                    string passwordHash = claim.Identities.FirstOrDefault().Claims.Where(c => c.Type == ClaimTypes.Hash).Single().Value;

                    //make sure password hasn't changed since token was issued
                    if (HashHelper.GetStringSha256Hash(auth.Password) != passwordHash)
                    {
                        response.Success = false;
                        response.AddError("*", "Password has been changed since this refresh token was generated.");
                    }
                    else
                    {

                        response.Auth = new Auth(auth.UserId, auth.Email, TokenHelper.GenerateAccessToken(auth.User), TokenHelper.GenerateRefreshToken(auth.User));
                        response.Success = true;
                        response.Message = "Access token renewed";
                    }
                }
                else
                {
                    response.Success = false;
                    response.AddError("*", "Link is invalid or has expired");
                }
            }
            catch (Exception e)
            {
                response.Success = false;
                response.AddError("*", "Refresh token invalid or expired");
            }


            return response;
        }

        public LoginResponse GoogleLogin(string token)
        {

            LoginResponse response = new LoginResponse();

            try
            {
                var payload = GoogleJsonWebSignature.ValidateAsync(token, new GoogleJsonWebSignature.ValidationSettings()).Result;

                if (payload != null)
                {
                    Authentication auth = dbContext.Authentication.Include(a => a.User).SingleOrDefault(a => a.Email == payload.Email);

                    if (auth != null)
                    {
                        if (auth.Type == 1)
                        {
                            //sign in, success
                            response.Success = true;
                            response.Auth = new Auth(auth.UserId, auth.Email, TokenHelper.GenerateAccessToken(auth.User), TokenHelper.GenerateRefreshToken(auth.User));
                            response.Message = "You successfully logged in as " + auth.Email;

                            auth.Token = token;
                            dbContext.SaveChanges();

                        }
                        else
                        {
                            response.Success = false;
                            response.AddError("*", "You cannot use Google to sign in to this account");
                        }
                    }
                    else
                    {
                        //email doesn't exist, create account for user with type 1
                        //create user
                        User newUser = new User() { Verified = true, Role = "User" };

                        //create profile
                        Profile newProfile = new Profile() { FirstName = payload.GivenName, LastName = payload.FamilyName, DateCreated = DateTime.Now, DateModified = DateTime.Now };
                        newUser.Profile = newProfile;

                        Authentication newAuth = new Authentication() { Email = payload.Email, Password = PasswordHelper.HashPassword(payload.Email), Type = 1, Token = token };
                        newUser.Authentication = newAuth;

                        dbContext.Users.Add(newUser);
                        dbContext.SaveChanges();

                        response.Success = true;
                        response.Auth = new Auth(newAuth.UserId, newAuth.Email, TokenHelper.GenerateAccessToken(newAuth.User), TokenHelper.GenerateRefreshToken(newAuth.User));
                        response.Message = "You successfully logged in as " + newAuth.Email;

                    }
                }
                else
                {
                    response.Success = false;
                    response.AddError("*", "Failed to sign in with Google");
                }
            }
            catch (Exception e)
            {
                response.Success = false;
                response.AddError("*", "Failed to sign in with Google");
            }


            return response;
        }
    }
}
