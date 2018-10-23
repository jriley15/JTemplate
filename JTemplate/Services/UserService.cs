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
using JTemplate.Data.Dto.Email;
using Microsoft.EntityFrameworkCore;

namespace JTemplate.Services
{
    public interface IUserService
    {
        LoginResponse Login(LoginRequest request);
        void Logout();

        RegisterResponse Register(RegisterRequest request);

        ConfirmEmailResponse ConfirmEmail(String token);


        User GetUser(int userId);

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
            if (dbContext.Users.Any(user => user.Email == request.Email))
            {
                response.Success = false;
                response.AddError("Email", "Email already exists");
            }
            else
            {

                //create user
                User newUser = new User() {Email = request.Email, Password = PasswordHelper.HashPassword(request.Password), Verified = false, Role = "User" };

                //create profile
                Profile newProfile = new Profile() { FirstName = request.FirstName, LastName = request.LastName, DateCreated  = DateTime.Now, DateModified = DateTime.Now};

                newUser.Profile = newProfile;

                dbContext.Users.Add(newUser);
                dbContext.SaveChanges();

                //create email confirmation token
                string token = TokenHelper.Generate(newUser).Token;

                //send link to users email
                //localhost/Auth/ConfirmEmail
                //EmailHelper.Send("Email Confirmation", "Activate email: http://localhost/api/Auth/ConfirmEmail?token="+token);

                response.Success = true;
                response.Message = "Successfully registered, Token: "+ token;
            }

            return response;
        }

        public LoginResponse Login(LoginRequest request)
        {

            LoginResponse response = new LoginResponse();

            User user = dbContext.Users.SingleOrDefault(u => u.Email == request.Email && PasswordHelper.VerifyPassword(request.Password, u.Password));

            if (user != null)
            {
                response.Success = true;
                response.Auth = TokenHelper.Generate(user);
                response.Message = "You successfully logged in as "+user.Email;

                EmailHelper.Send("test", "test");
                

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

        public ConfirmEmailResponse ConfirmEmail(string token)
        {

            ConfirmEmailResponse response = new ConfirmEmailResponse();

            try
            {
                int UserId = int.Parse(TokenHelper.ValidateAndDecode(token).Identity.Name);
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
                    response.AddError("*", "Token is invalid or has expired");
                }
            }
            catch (Exception e)
            {
                response.Success = false;
                response.AddError("*", "Token is invalid or has expired");
            }

            return response;

        }


        public User GetUser(int id)
        {
            var users = dbContext.Users.Include(u => u.Profile);

            return users.FirstOrDefault(u => u.UserId == id);

        }




    }
}
