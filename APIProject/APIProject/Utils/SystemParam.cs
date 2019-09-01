
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project.Utils
{
    public class SystemParam
    {
        public const int STATUS_FALSE = -1;
        public const int STATUS_TRUE = 1;
        public const string IS_GET_STRING_STATUS_STUDENT_CLASS = "Đang học";
        public const string NO_GET_STRING_STATUS_STUDENT_CLASS = "Đã nghỉ";
        public const int ADMIN = 4;
        public const int ROLL_ADMIN = 1;
        public const string CONVERT_DATE = "dd/MM/yyyy";
        public const string CONVERT_DATE_HOURS = "HH:mm:ss  dd/MM/yyyy";
        public const string CONVERT_HOURS = "HH:mm";
        public const string CONVERT_HAVE_DATE = "dddd , dd/MM/yyyy";
        public const string CONVERT_DAY = "dddd";
        public const int TEACHER = 1;
        public const int MAX_ROW_IN_LIST_WEB = 20;
        public const int MAX_ROW_IN_LIST_USER_WEB = 7;

        public const int MAX_ROW_IN_LIST = 30;
        public const int ACTIVE = 1;
        public const int RETURN_TRUE = 1;
        public const int RETURN_FALSE = 0;
        public const int ACTIVE_FALSE = 0;
        public const int COUNT_NULL = 0;

        public const int IDInfomation = 21;

        public const int TYPE_IMAGE = 1;
        public const int TYPE_VIDEO = 2;
        // thanh cong
        public const int SUCCESS_CODE = 200;
        // sai mk
        public const int ERROR_PASS_API = 403;
        // loi quy trinh
        public const int PROCESS_ERROR = 500;
        public const int FAIL = 501;
        public const int ERROR = 0;
        public const int SUCCESS = 1;
        // khong duoc phep
        public const int NOT_FOUND = 404;
        // khong thay du lieu
        public const int DATA_NOT_FOUND = 400;
        // khong duoc phep
        public const int UNAUTHORIZED = 401;
        // sai du lieu
        public const int INVALID_PARAM = 300;
        public const string STRING_NULL = "";


        public const int VAL_PLACE_NAME = -1;
        public const int VAL_PLACE_CATEGORY = -2;
        public const int VAL_PLACE_ADDRESS = -3;
        public const int VAL_PLACE_URLLOGO = -4;
        public const int VAL_PLACE_PHONE = -5;
        public const int VAL_PLACE_WEB = -6;
        public const int VAL_PLACE_URLBANER = -4;
        public const int NO_ISPROMOTION = -7;
        public const string STRING_STATUS_TEACHER_CONTRACT = "Chính Thức";
        public const string STRING_STATUS_TEACHER_TRIAL = "Thử Việc";
        public const string STRING_STATUS_TEACHER_QUIT = "Nghỉ việc";
        public const int VAL_STATUS_CANCEL_AB = 2;
        // luu va tam luu
        public const int VAL_TYPE_TEMPORARY_SAVE = 0;
        public const int VAL_TYPE_SAVE = 1;

        // Phan Đình Kiên : Trạng thái lớp học 
        public const string Lop_Dang_Hoc = "Lớp đang học";
        public const string Lop_Dang_Nghi = "Lớp đang nghỉ";
        public const string Lop_Da_Ket_Thuc = "Lớp đã kết thúc";

        // Phan Đình Kiên : nếu nhu ngày bị null thì trả về chuỗi 
        public const string Null_Date = "00/00/000";

        // Phan đình kiên : không duyệt điểm danh 
        public const int NOT_ACCEPTED = -2;




        /// <summary>
        /// Phan Đình Kiên  : trạng thái của điểm danh 
        /// </summary>
        public const byte IS_APSENT_TYPE = 1;
        public const byte NO_APSENT_TYPE = 0;

        /// <summary>
        /// Trạng thái kiểm tra của điểm danh 
        /// </summary>
        public const int IS_STATUS_CHECK_1 = 1;
        public const int NO_STATUS_CHECK_1 = 0;
        public const int IS_STATUS_CHECK_2 = 1;
        public const int NO_STATUS_CHECK_2 = 0;
        /// <summary>
        /// kiểm tra điểm danh đã hợp lệ chưa 
        /// </summary>
        public const int NO_SUCCESS = 0;
        public const int IS_SUCCESS = 1;

        /// <summary>
        /// thông báo trung bậc lương
        /// </summary>
        public const int MIDDE_LEVEL = -2;

        public const int MAX_ROW_IN_LIST_PARENT_WEB = 15;


        // thời gian cộng thêm
        public const int ADD_HOURS = 3;
        public const int ADD_MINUTE = 30;

        public const string RETURN_STRING_FALSE_AUTO = "0";

        // Giới hạn độ dài của chuỗi
        public const int MIN_COUNT_LIST = 0;

        // Phan Đình Kiên : Độ dài của chỗi trên web 
        public const int MAX_ROW_IN_LIST_WEB_ROOM = 20;
        public const int MAX_ROW_IN_LIST_WEB_PARENT = 20;


        //28/4 : thông báo trùng lịch học 
        public const int CONINCIDE_WITH_CLASS_SCHEDULE = -1; // trung lịch 
        public const int THE_CLASS_IS_NOT_EMTY = -2; // lớp trống 
        public const int STUDENT_ADREADY_EXITSTS_IN_CLASS = -1; //  học viên đã tồn tại 

        // Thông tin độ dai của danh sách 
        public const int MIN_LENG_LIST = 1;
        public const int MAX_LENG_LIST_ABSENT = 20;

        // thông tin cắt chuỗi nếu như độ dài chuỗi vượt quá giới hạn
        public const int MIN_SUBSTRING = 0;
        public const int MAX_SUBSTRING = 20;

        // Check List Delete and Exprot 
        public const int MIN_CHECK_LIST = 1;
        public const int NO_CHECK_LIST = -2;

        // thêm mới thông tin của học viên 
        public const int DUPLICATE_PHONE_PARENT = -3;
        public const int DUPLICATE_NAME_STUDNET = -4;


        // Quyền truy cập hệ thống 
        public const int NO_ACCESS_RIGHT = -1; // thông báo không có quyền truy cập hệ thống 
        public const int RODE_ADDMIN = 1; // quyền cao nhất Admin
        public const int RODE_CHECK1 = 2; // quyển của check 1 
        public const int RODE_CHECK2 = 3; // quyên của check 2 
        public const int ROLE_SUBPER_ADMIN = 4;

        public const int NOT_HAVE_ACCESS = -2;

        public const int MAX_LIST_CONGIFTIME = 5; // 




        public const int ID_SESSTION_ADD_CLASS = 1; // add danh sách lớp học 
        public const int ID_SESSTION_ADD_STUDENT_CLASS = 2; // add danh sách học viên 
        public const int ID_SESSTION_ADD_TEACHER_CLASS = 3; // add danh sách giáo viên 
        public const int ID_SESSTION_ADD_SCHEDULE_CLASS = 4; // Add danh sách lịch học 
        public const int ID_SESSTION_UPDATE_STUDENT_CLASS = 5; // cập nhập danh sách học sinh 
        public const int ID_SESSTION_SEACH_SALARY = 6; // cập nhập danh sách học sinh 
        public const int ID_SESSTION_SEACH_FEE = 7; // cập nhập danh sách học phí 
        public const int ID_SESSTION_TYPE_MESSAGE = 8; // // tìm kiếm thể loại của tin nhắn 
        public const int ID_SESSTION_SEACH_MESSAGE = 9; // tìm kiếm thông tin tin nhắn 
        public const int ID_SESSTION_SEACH_STUDENT = 10; // tìm kiếm thông tin học viên 
        public const int ID_SESSTION_SEACH_TEACHER = 11; // tìm kiếm thông tin giáo viên 
        public const int ID_SESSTION_SEACH_CLASS_STUDENT = 12; // tìm kiếm thông tin học sinh theo lớp học 
        public const int ID_SESSTION_SEACH_ABSENT_BY_STUDENT = 13; // tìm kiếm thông tin học phí theo học sinh 
        public const int ID_SESSTION_SEACH_ASC_OR_DESC = 14; // thông tin học viên tang giảm 
        public const int ID_SESSTION_SEACH_ASC_OR_DESC_STUDENT = 15; // tìm kiếm thong tin học sinh tăng giảm 
        public const int ID_SESSTION_SEACH_SCHOOL_CALENDAR_INFORMATION = 16;  // tìm kiếm thông tin lịch hộc 




        public const int MAX_PHONE = 10;
        public const int MIN_PHOME = 8;
        public const string ERORE_VALIDATE_PHONE = "số điện thoại không hợp lệ ";
        public const string PARENT_DUPLICATE_PHONE = "Số điện thoại đã tồn tại trong hệ thống";



        // thông báo của học sinh 

        public const string PARENT_ERROR_VALIDATE_BIRTHDAY = "Ngày sinh không được để trống";
        public const string ERORE_VALIDATE_PHONE_PARENT = "số điện thoại phụ huynh không hợp lệ ";
        public const string ERORE_VALIDATE_PHONE_STUDENT = "số điện thoại học sinh không hợp lệ ";
        public const string PARENT_ERROR_VALIDATE_NAME = "Tên phụ huynh không được để trống";
        public const string PARENT_ERROR_VALIDATE_ADDRESS = "Địa chỉ phụ huynh không được để trống ";
        public const string PARENT_ERROR_VALIDATE_PASS = "Mật khẩu không được để trống";
        public const string PARENT_ERROR_VALIDATE_PHONE_NULL = "Số điện thoại phụ huynh không được để trống";
        public const string PARENT_ERROR_VALIDATE_BRANCH = "Cơ sở của học viên không được để trống ";
        public const string PARENT_ERROR_VALIDATE_STUDENT_NAME = "Tên học viên không được để trống";
        public const string PARENT_DUPLICATE_NAME_STUDNET = "Tên học viên đã tồn tại trong hệ thống";
        public const string PARENT_ADD_SUCCESS = "Thêm mới học viên thành công";
        public const string PARENT_ADD_ERROR = "Thêm mới học viên không thành công";
        public const string PARENT_UPDATE_SUCCESS = "Cập nhập học viên thành công";
        public const string PARENT_UPDATE_ERROR = "Cập nhập học viên không thành công";
        public const string PARENT_ADD_NO_ACCESS_RIGHT = "Bạn không có quyền truy cập vào chức năng thêm mới học viên";
        public const string PARENT_EDIT_NO_ACCESS_RIGHT = "Bạn không có quyền truy cập vào chức năng sửa học viên";
        public const string ERORE_VALIDATE_PHONE_STUDENT_NULL = "Số điện thoại học sinh không được để trống";
        public const string ERORE_VALIDATE_BURT_STUDENT = "Ngày sinh của học viên không hợp lệ";


        public const string TEACHER_ERROR_VALIDATE_NAME = "Tên giáo viên không được để trống";
        public const string TEACHER_ERROR_VALIDATE_BIRT = "Ngày sinh của giáo viên không được để trống";
        public const string TEACHER_ERROR_VALIDATE_SEX = "Giới tính của giáo viên không được để trống";
        public const string TEACHER_ERROR_VALIDATE_ADDRESS = "Địa chỉ của giáo viên không được để trống";
        public const string TEACHER_ERROR_VALIDATE_PHONE = "Số điện thoại của giáo viên không được để trống";
        public const string TEACHER_ERROR_VALIDATE_PASS = "Mật khẩu của giáo viên không được để trống";
        public const string TEACHER_ERROR_VALIDATE_BRANCH = "Cơ sở của giáo viên không được để trống";
        public const string TEACHER_ERROR_VALIDATE_SUBJECT = "Bộ môn giảng dạy không được để trống";
        public const string TEACHER_ERROR_VALIDATE_STATUS = "Trạng thái của giáo viên không được để trống";
        public const string TEACHER_ERROR_VALIDATE_DATE_TRIAL = "Thời gian thử việc không hợp lệ";
        public const string TEACHER_ADD_SUCCESS = "Thêm mới giáo viên thành công";
        public const string TEACHER_ADD_ERROR = "Thêm mới giáo viên không thành công";
        public const string TEACHER_UPDATE_SUCCESS = "Cập nhập học viên thành công";
        public const string TEACHER_UPDATE_ERROR = "Cập nhập học viên không thành công";
        public const string TEACHER_ADD_NO_RIGHT = "Bạn không có quyền thêm mới giáo viên";
        public const string TEACHER_EDIT_NO_RIGHT = "Bạn không có quyền sửa thông tin giáo viên";



        // thông tin lớp học 
        public const string ClASS_ERROR_VALIDATE_NAME = "Tên lớp học không được bỏ trống";
        public const string ClASS_ERROR_VALIDATE_START_TIME = "Ngày bắt đầu học không hợp lệ";
        public const string ClASS_ERROR_VALIDATE_START_TIME_NULL = "Ngày bắt đầu học không được để trống";
        public const string ClASS_ERROR_VALIDATE_END_TIME = "Ngày kết thúc học không hợp lệ";
        public const string ClASS_ERROR_VALIDATE_BRANCH = "Ngày kết thúc học không hợp lệ";
        public const string ClASS_ERROR_VALIDATE_ClASS_ID = "Giáo viên chủ nghiệm không được bỏ trống";
        public const string ClASS_ADD_SUCCESS = "Thêm mới lớp học thành công";
        public const string ClASS_ADD_ERROR = "Thêm mới lớp học không thành công";
        public const string ClASS_UPDATE_SUCCESS = "Cập nhập lớp học thành công";
        public const string ClASS_UPDATE_ERROR = "Cập nhập lớp học không thành công";
        public const string ClASS_ADD_NO_RIGHT = "Bạn không có quyền thêm mới lớp học";
        public const string ClASS_EDIT_NO_RIGHT = "Bạn không có quyền sửa thông tin lớp học";
        public const string DUPLICATE_CLASS_NAME = "Tên lớp học đã tồn tại trong hệ thống";


        // thông báo tin nhắn của phụ huynh 

        public const string MESSAGE_ERROR_TYPE_MESS = "Loại thông báo không được bỏ trống";
        public const string MESSAGE_ERROR_TYPE_CONTENT = "Loại tin nhắn không được bỏ trống";
        public const string MESSAGE_ERROR_LIST_FEE_NULL = "Bạn cần phải chọn danh sách học phí cần tổng hợp";
        public const string MESSAGE_ADD_SUCCESS = "Tạo tin nhắn thành công";
        public const string MESSAGE_ADD_ERROR = "Tạo tin nhắn không thành công";
        public const string MESSAGE_DATE = "[Tháng/Năm]";
        public const string MESSAGE_STUDENT_NAME = "[Tên học sinh]";
        public const string MESSAGE_FEE = "[Học phí]";
        public const string MESSAGE_CLASS_COUNT = "[Số buổi học]";
        public const string MESSAGE_FEE_ADD = "[Học phí tăng thêm]";
        public const string MESSAGE_FEE_MINUS = "[Học phí giảm]";
        public const string MESSAGE_CLASS_DISCOUNT = "[Sô buổi nghỉ khấu trừ]";
        public const string MESSAGE_CLASS_FEE_DISCOUNT = "[Số tiền được khấu trừ]";
        public const string MESSAGE_TOTAL_FEE = "[Tổng tiền]";


    }

}