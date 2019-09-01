using APIProject.App_Start;
using APIProject.Business;
using APIProject.Models.WebModels.User;
using Project.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace APIProject.Controllers
{
    public class UserController : BaseController
    {
        [UserAuthenticationFilter]
        public ActionResult Index()
        {
            ViewBag.ROLE = UserLogin.RoleId;
            string role = "";
            if (UserLogin.RoleId == SystemParam.RODE_ADDMIN)
            {
                role = "Quản trị viên";
            }
            else if (UserLogin.RoleId == SystemParam.RODE_CHECK1)
            {
                role = "Nhân viên";
            }
            else
            {
                role = "Khách hàng";
            }
            ViewBag.NameUserLayOut = "Xin chào " + role;
            return View();
        }
        public string LoginUser()
        {
            try
            {
                string UserName = Request["UserName"];
                string Password = Request["Password"];

                LoginUserModels user = userBusiness.Login(UserName, Password);
                if (user.RoleId == SystemParam.RODE_ADDMIN || user.RoleId == SystemParam.RODE_CHECK1 || user.RoleId == SystemParam.RODE_CHECK2 || user.RoleId == SystemParam.ROLE_SUBPER_ADMIN)
                {
                    if (user != null)
                    {
                        if (user.PasswordHash.Trim() == Project.Utils.Util.CreateMD5(Password).Trim())
                        {
                            Session["Login"] = null;
                            Session["Login"] = user;
                            var query = userBusiness.GetById(user.Id,  UserLogin.RoleId);
                            return "1";
                        }
                        else
                        {
                            return "0";
                        }
                    }
                    return "0";

                }
                else
                {
                    return SystemParam.NOT_HAVE_ACCESS + "";
                }



            }
            catch (Exception ex)
            {
                return SystemParam.RETURN_FALSE + "";
            }
        }

        public ActionResult Login()
        {
            return View();
        }
        public JsonResult LoadUserLogin()
        {
            try
            {
                if (Session["Login"] != null)
                {

                    LoginUserModels Sesson = Session["Login"] as LoginUserModels;
                    return Json(Sesson, JsonRequestBehavior.AllowGet);

                }
                else
                {
                    return Json(new LoginUserModels(), JsonRequestBehavior.AllowGet);
                }
            }
            catch
            {
                return Json(new LoginUserModels(), JsonRequestBehavior.AllowGet);
            }
        }

    }
}