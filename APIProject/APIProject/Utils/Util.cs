using APIProject.Data;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;

namespace Project.Utils
{
    public class Util
    {


        public static Image byteArrayToImage(byte[] byteArrayIn)
        {
            Image returnImage = null;
            try
            {
                MemoryStream ms = new MemoryStream(byteArrayIn, 0, byteArrayIn.Length);
                ms.Write(byteArrayIn, 0, byteArrayIn.Length);
                returnImage = Image.FromStream(ms, true);//Exception occurs here
            }
            catch { }
            return returnImage;
        }
        //public static Image Base64ToImage(string base64String)
        //{
        //    // Convert Base64 String to byte[]
        //    byte[] imageBytes = Convert.FromBase64String(base64String);
        //    MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);

        //    // Convert byte[] to Image
        //    ms.Write(imageBytes, 0, imageBytes.Length);
        //    Image image = Image.FromStream(ms);
        //    image = rotation(image);
        //    return image;
        //}


        public static Image rotation(Image image)
        {

            foreach (var prop in image.PropertyItems)
            {
                if ((prop.Id == 0x0112 || prop.Id == 5029 || prop.Id == 274))
                {
                    var value = (int)prop.Value[0];
                    if (value == 6)
                    {
                        image.RotateFlip(RotateFlipType.Rotate90FlipNone);
                        prop.Value[0] = 1;
                        image.SetPropertyItem(prop);
                        break;
                    }
                    else if (value == 8)
                    {
                        image.RotateFlip(RotateFlipType.Rotate270FlipNone);
                        prop.Value[0] = 1;
                        image.SetPropertyItem(prop);
                        break;
                    }
                    else if (value == 3)
                    {
                        image.RotateFlip(RotateFlipType.Rotate180FlipNone);
                        prop.Value[0] = 1;
                        image.SetPropertyItem(prop);
                        break;
                    }

                }
            }
            image.RemovePropertyItem(274);
            return image;
        }

        public static DateTime? ConvertDateByTime(string date)
        {
            try
            {
                if (date != null && date.Trim() != "")
                {
                    var str = date.Trim().Replace(":", "/");
                    str = str.Replace(" ", "/");
                    string[] arr = str.Split('/');
                    DateTime dateTime = new DateTime(int.Parse(arr[2]), int.Parse(arr[1]), int.Parse(arr[0]), int.Parse(arr[3]), int.Parse(arr[4]), 0);
                    return dateTime;
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                return null;
            }
        }

        public static string CreateMD5(string input)
        {
            //bam du lieu
            // Use input string to calculate MD5 hash
            using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
            {
                byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                // Convert the byte array to hexadecimal string
                System.Text.StringBuilder sb = new System.Text.StringBuilder();
                for (int i = 0; i < hashBytes.Length; i++)
                {
                    sb.Append(hashBytes[i].ToString("X2"));
                }
                return sb.ToString();
            }
        }


        //thống kê số ngày theo tháng 

        public static Nullable<DateTime> ConvertDate(string date)
        {
            if (date != "")
            {
                try
                {
                    string[] arr = date.Split('/');
                    DateTime dateTime = new DateTime(int.Parse(arr[2]), int.Parse(arr[1]), int.Parse(arr[0]));
                    return dateTime;
                }
                catch
                {
                    return null;
                }
            }
            else
                return null;
        }


        /// <summary>
        /// Convert lại thông tin thơi gian 
        /// </summary>
        /// <param name="date">Tháng 05/2019</param>
        /// <returns></returns>
        public static Nullable<DateTime> ConvertDateByMonthAndYear(string date)
        {
            if (date != "")
            {
                try
                {
                    string[] arr = date.Split(' ');

                    string[] ArrDate = arr[1].Split('/');

                    DateTime dateTime = new DateTime(int.Parse(ArrDate[1]), int.Parse(ArrDate[0]), 1);

                    return dateTime.Date;
                }
                catch
                {
                    return null;
                }
            }
            else
                return null;
        }

        /// <summary>
        /// Phan Đình Kiên : Định dạng lại họ tên tiếng việt 
        /// </summary>
        /// <param name="Name"></param>
        /// <returns></returns>
        public static string ConvertStringName(string Name)
        {
            try
            {

                if (Name != null)
                {
                    // Tiến hành xóa dấu cách hai bên chuỗi 
                    Name = Name.Trim();
                    string[] Str = Name.Split(' ');
                    string NAME = "";

                    for (int i = 0; i < Str.Length; i++)
                    {
                        string name = "";
                        if (Str[i].Length > 0)
                        {

                            for (int j = 0; j < Str[i].Length; j++)
                            {
                                if (j == 0)
                                {
                                    name = name + Char.ToUpper(Str[i][j]);
                                }
                                else
                                {
                                    name += Str[i][j];
                                }
                            }
                        }
                        NAME = NAME + name + " ";


                    }
                    NAME = NAME.Trim();
                    return NAME;
                }
                else
                {
                    return "";
                }
            }
            catch
            {
                return "";
            }
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="Year">Năm hiện tại </param>
        /// <param name="Month">Tháng hiện tại</param>
        /// <param name="Type">trừ một tháng hay cộng một tháng </param>
        /// <returns></returns>
        public Nullable<DateTime> GET_DATE_DESC_ASC(int Year, int Month, int Type)
        {
            try
            {
                // tiến hành trừ đi một tháng 
                if (Type == 0)
                {
                    if (Month == 1)
                    {
                        return new DateTime((Year - 1), 12, 1);
                    }
                    else
                    {
                        return new DateTime((Year), Month - 1, 1);
                    }

                }
                else if (Type == 1)
                {
                    if (Month == 12)
                    {
                        return new DateTime((Year + 1), 1, 1);
                    }
                    else
                    {
                        return new DateTime((Year), Month + 1, 1);
                    }
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                return null;
            }

        }

        public static string ConvertEmail(String Strs)
        {
            try
            {
                Char[] chars = Strs.ToCharArray();
                String str = "";
                foreach (var c in chars)
                {
                    if (Convert.ToInt32(c) >= 65 && Convert.ToInt32(c) <= 90)
                    {
                        str += c.ToString().ToLower();
                    }
                    else if (Convert.ToInt32(c) >= 97 && Convert.ToInt32(c) <= 122)
                    {
                        str += c.ToString().ToUpper();
                    }
                }
                return str;
            }
            catch
            {
                return "";
            }

        }

        /// <summary>
        /// Phan Đình Kiên : tiến hành convert ngay thang 
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static Nullable<DateTime> ConvertDateMonth(string date)
        {
            try
            {
                if (date != null && date.Trim() != "")
                {
                    string[] Arr = date.Split('/');

                    return new DateTime(int.Parse(Arr[1]), int.Parse(Arr[0]), 1);
                }
                return null;


            }
            catch
            {
                return null;
            }
        }



    }
}