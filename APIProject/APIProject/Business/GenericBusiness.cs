using Project.Utils;
using APIProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Globalization;
using APIProject.Data;

namespace APIProject.Business
{
    public class GenericBusiness
    {
        public Dbconnection context;
        public static Dbconnection cnn;
        public GenericBusiness(Dbconnection context = null)
        {
            this.context = context == null ? new Dbconnection() : context;
            cnn = this.context;

        }
        // validate string 
        public static JsonResultModel ValidateString(string data, string Error)
        {

            try
            {
                JsonResultModel json = new JsonResultModel();
                if (data == null)
                {
                    json.Message = Error;
                    json.Status = SystemParam.STATUS_FALSE;
                    return json;
                }
                else
                {
                    if (data.Trim() == "")
                    {
                        json.Message = Error;
                        json.Status = SystemParam.STATUS_FALSE;
                        return json;
                    }
                    else
                    {
                        json.Message = Error;
                        json.Status = SystemParam.STATUS_TRUE;
                        return json;
                    }

                }
            }
            catch (Exception ex)
            {
                JsonResultModel json = new JsonResultModel();
                json.Message = ex.Message;
                json.Status = SystemParam.STATUS_FALSE;
                return json;
            }
        }

        // validaet date time 
        public JsonResultModel ValidateDate(DateTime? date, string Error)
        {
            JsonResultModel json = new JsonResultModel();
            try
            {
                if (date == null)
                {
                    json.Message = Error;
                    json.Status = SystemParam.STATUS_FALSE;
                    return json;
                }
                else
                {
                    json.Message = Error;
                    json.Status = SystemParam.STATUS_TRUE;
                    return json;
                }
            }
            catch (Exception ex)
            {
                json.Status = SystemParam.STATUS_FALSE;
                json.Message = ex.Message;
                return json;
            }

        }


        // validaet date time 
        public JsonResultModel ValidateEndDate(DateTime? StartDate, DateTime? EndDate, string Error)
        {
            JsonResultModel json = new JsonResultModel();
            try
            {
                if (EndDate != null && StartDate != null)
                {
                    if (EndDate <= StartDate)
                    {
                        json.Status = SystemParam.STATUS_FALSE;
                        json.Message = Error;
                        return json;

                    }
                    else
                    {
                        json.Status = SystemParam.STATUS_TRUE;
                        json.Message = Error;
                        return json;
                    }
                }
                else
                {
                    json.Status = SystemParam.STATUS_TRUE;
                    json.Message = Error;
                    return json;
                }

            }
            catch (Exception ex)
            {
                json.Status = SystemParam.STATUS_FALSE;
                json.Message = ex.Message;
                return json;
            }

        }


        public JsonResultModel ValidatePhone(string data, string Error, string ErrorLength)
        {
            JsonResultModel json = new JsonResultModel();
            try
            {
                if (data == null)
                {
                    json.Status = SystemParam.STATUS_FALSE;
                    json.Message = Error;
                    return json;
                }
                else
                {
                    // thông báo số điện thoại không hợp lệ 
                    if (data.Length <= 8 || data.Length > 10)
                    {
                        json.Status = SystemParam.STATUS_FALSE;
                        json.Message = ErrorLength;
                        return json;
                    }
                    else
                    {
                        json.Status = SystemParam.STATUS_TRUE;
                        json.Message = Error;
                        return json;
                    }
                }
            }
            catch (Exception ex)
            {
                json.Status = SystemParam.STATUS_FALSE;
                json.Message = ex.Message;
                return json;
            }

        }

        public JsonResultModel OutputEx(Exception ex)
        {
            JsonResultModel json = new JsonResultModel();
            json.Status = SystemParam.STATUS_FALSE;
            json.Message = ex.Message;
            return json;

        }

        public JsonResultModel OutputSuccess(string str)
        {
            JsonResultModel json = new JsonResultModel();
            json.Status = SystemParam.STATUS_TRUE;
            json.Message = str;
            return json;
        }

        public JsonResultModel OutputError(string str)
        {
            JsonResultModel json = new JsonResultModel();
            json.Status = SystemParam.STATUS_FALSE;
            json.Message = str;
            return json;
        }

        public JsonResultModel Output(int Status, string str)
        {
            return new JsonResultModel() { Status = Status, Message = str };
        }


        public JsonResultModel ValidateStringDate(string Date, string Error1, string Error2)
        {
            JsonResultModel json = new JsonResultModel();
            try
            {
                if (Date != null)
                {
                    if (Date.Trim() == "")
                    {
                        json.Status = SystemParam.STATUS_FALSE;
                        json.Message = Error1;
                        return json;
                    }
                    else
                    {
                        var date = Util.ConvertDate(Date);
                        if (date == null)
                        {
                            json.Status = SystemParam.STATUS_FALSE;
                            json.Message = Error2;
                            return json;
                        }
                        else
                        {
                            json.Status = 1;
                            json.Result = date;
                            return json;

                        }
                    }
                }
                else
                {
                    json.Status = SystemParam.STATUS_FALSE;
                    json.Message = Error1;
                    return json;
                }
            }
            catch (Exception ex)
            {
                json.Status = SystemParam.STATUS_FALSE;
                json.Message = ex.Message;
                return json;
            }
        }


        public string FormatMonney(decimal? data)
        {
            try
            {

                return string.Format(new CultureInfo("vi-VN"), "{0:#,##0 vnđ}", data);
            }
            catch
            {
                return "0 đ";
            }
        }
    }
}