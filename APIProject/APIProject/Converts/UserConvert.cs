using APIProject.Data;
using APIProject.Models.WebModels.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APIProject.Converts
{
    public class UserConvert
    {
        public static LoginUserModels GetLoginUserConvert(User data)
        {
            try
            {
                LoginUserModels user = new LoginUserModels()
                {
                    RoleId = data.Role,
                    UserName = data.UserName,
                    Id = data.Id,
                    PasswordHash = data.PasswordHash,
                   // Tocken = data.Tocken,
                   

                };
                return user;

            }
            catch
            {
                return null;
            }
        }
        public static GetUserModels GetUserConvert(User data)
        {
            try
            {
                GetUserModels user = new GetUserModels()
                {
                    RoleId = data.Role,
                    UserName = data.UserName,
                    Id = data.Id,
                    PasswordHash = data.PasswordHash,
                };
                return user;
            }
            catch
            {
                return new GetUserModels();
            }
        }


    }
}