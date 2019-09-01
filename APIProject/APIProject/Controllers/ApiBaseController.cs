using APIProject.Business;
using APIProject.Data;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace APIProject.Controllers
{
    public class ApiBaseController : ApiController
    {
        public Dbconnection cnn;
        public LoginBusiness lgbus = new LoginBusiness();
        public ApiBaseController() : base()
        {
            lgbus = new LoginBusiness(this.GetContext());
            

        }
        public Dbconnection GetContext()
        {
            if (cnn == null)
            {
                cnn = new Dbconnection();
            }
            return cnn;
        }
    }
}
