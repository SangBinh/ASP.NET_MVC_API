using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project.Utils
{
    public class Sessions 
    {
        public static string ADD_CLASS = "ADD_CLASS"; // add danh sách lớp học 
        public static string ADD_STUDENT_CLASS = "STUDENT_CLASS"; // add danh sách học viên 
        public static string ADD_TEACHER_CLASS = "TEACHER_CLASS"; // add danh sách giáo viên 
        public static string ADD_SCHEDULE_CLASS = "ADD_SCHEDULE_CLASS"; // Add danh sách lịch học 
        public static string UPDATE_STUDENT_CLASS = "UPDATE_STUDENT_CLASS"; // cập nhập danh sách học sinh 
        public static string SEACH_SALARY = "SEACH_SALARY"; // cập nhập danh sách học sinh 
        public static string SEACH_FEE = "SEACH_FEE"; // cập nhập danh sách học phí 
        public static string TYPE_MESSAGE = "TYPE_MESSAGE"; // // tìm kiếm thể loại của tin nhắn 
        public static string SEACH_MESSAGE = "SEACH_MESSAGE"; // tìm kiếm thông tin tin nhắn 
        public static string SEACH_STUDENT = "SEACH_STUDENT"; // tìm kiếm thông tin học viên 
        public static string SEACH_TEACHER = "SEACH_TEACHER"; // tìm kiếm thông tin giáo viên 
        public static string SEACH_CLASS_STUDENT = "SEACH_CLASS_STUDENT"; // tìm kiếm thông tin học sinh theo lớp học 
        public static string SEACH_ABSENT_BY_STUDENT = "SEACH_ABSENT_BY_STUDENT"; // tìm kiếm thông tin học phí theo học sinh 
        public static string SEACH_ASC_OR_DESC = "SEACH_ASC_OR_DESC";
        public static string SEACH_ASC_OR_DESC_STUDENT = "SEACH_ASC_OR_DESC_STUDENT"; // tìm kiếm thong tin học sinh tăng giảm 
        public static string SEACH_SCHOOL_CALENDAR_INFORMATION = "SEACH_SCHOOL_CALENDAR_INFORMATION";  // tìm kiếm thông tin lịch hộc 
        public static string SEACH_CLASS = "SEACH_CLASS"; // session tìm kiếm thông tin lớp học 
        public static string LIST_MESS = "LIST_MESS";
        public static string LIST_SEND_MESS = "LIST_SEND_MESS";
        public static string LIST_MESS_GENERAL = "LIST_MESS_GENERAL";
        public static string GET_ID_LIST_ID_MESS = "GET_ID_LIST_ID_MESS";
        public static string SEACH_ABSENT = "SEACH_ABSENT";

    }
}