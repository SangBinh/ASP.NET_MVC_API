using APIProject.Data;
using APIProject.Models.WebModels.User;
using Project.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APIProject.Business
{
    public class UserBusiness: GenericBusiness
    {
        public UserBusiness(Dbconnection context = null) : base()
        {

        }
        public LoginUserModels Login(string UserName, string Password)
        {
            try
            {
                var list = from u in cnn.Users
                           where u.IS_ACTIVE.Value == SystemParam.ACTIVE && u.UserName.Trim() == UserName.Trim() 
                           select u;
                
                if (list != null && list.Count() > 0)
                {
                    foreach (var value in list.ToList())
                    {
                        int k = String.Compare(value.UserName.Trim(), UserName.Trim(), false);
                        if (k == 0)
                        {
                            var User = cnn.Users.Find(value.Id);
                            User.Tocken = Util.CreateMD5(DateTime.Now.ToString());
                            cnn.SaveChanges();
                            var x = Converts.UserConvert.GetLoginUserConvert(User);
                            return Converts.UserConvert.GetLoginUserConvert(User);
                        }

                        // tiến hành cập nhập token cho user 


                    }
                }
                return null;
            }
            catch
            {
                return null;
            }
        }
        public GetUserModels GetById(int ID, int? Role)
        {
            try
            {
                var data = cnn.Users.Find(ID);

                if (data != null )
                {
                    return Converts.UserConvert.GetUserConvert(data);
                }
                return new GetUserModels();

            }
            catch
            {
                return new GetUserModels();

            }
        }

    }
}