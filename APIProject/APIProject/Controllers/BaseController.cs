using APIProject.Business;
using APIProject.Data;
using APIProject.Models.WebModels.User;

using Project.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace APIProject.Controllers
{
    public class BaseController : Controller
    {
        protected Dbconnection Context;
        public LoginBusiness loginBusiness;
        public UserBusiness userBusiness;
        public BaseController() : base()
        {
            loginBusiness = new LoginBusiness(this.GetContext());
            userBusiness = new UserBusiness(this.GetContext());
        }
        /// </summary>
        public Dbconnection GetContext()
        {
            if (Context == null)
            {
                Context = new Dbconnection();
            }
            return Context;
        }



        public void ResetSesstion(int? IdSesstion)
        {

            if (IdSesstion == null)
            {
                IdSesstion = 0;
            }

            // reset lại sesstion add class 
            if (IdSesstion != SystemParam.ID_SESSTION_ADD_CLASS)
            {
                Session[Project.Utils.Sessions.ADD_CLASS] = null;
            }
        }


        /// <summary>
        ///  Lấy user login của hệ th
        /// </summary>
        public LoginUserModels UserLogin
        {
            get
            {
                return Session["Login"] as LoginUserModels;
            }
        }
    }
}