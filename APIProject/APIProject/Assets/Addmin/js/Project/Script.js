

$(document).ready(function () {
    LoadUserLogin();
});


function LoadUserLogin() {

    // tiến hành load phân quyền 
    $.ajax({
        url: "/User/LoadUserLogin",
        success: function (result) {

            var Role = result.ROLE;


            $("#centername").html(result.CENTER_NAME);
            $("#txt_role_user_login").val(result.ROLE);
            $("#lbl_user_login").text("Xin chào " + result.NAME);
            if (result.ROLE == 1) {
                $("#cauhinhnghi").show();
                $("#page_center").hide();
                $("#page_pack").hide();
            }
            else if (result.ROLE == 2) {
                $("#page_branch").hide();
                $("#page_teacher").hide();
                $("#page_parent").hide();
                $("#page_class").hide();
                $("#page_fee").hide();
                $("#page_salary").hide();
                $("#page_by_class").hide();
                $("#page_student_asc_or_desc").hide();
                $("#page_user").hide();
                $("#page_message").hide();
                $("#page_salsry_Level").hide();
                $("#page_configtime").hide();
                $("#page_room").hide();
                $(".btn_edit_teacher").hide();
                $("#id_export_absent").hide();
                $("#page_center").hide();
                $("#page_pack").hide();

            }
            else if (result.ROLE == 3) {
                //$(".btn-update-class").hide(); 
                $("#page_configtime").hide();
                $("#page_salsry_Level").hide();
                $("#page_salary").hide();
                //$("#page_fee").hide();
                $(".btn-delete-class").hide(); // tiến hành ẩn button xóa lớp học 
                $(".btn-delete-branch").hide(); // tiến hành ẩn button xóa cơ sở 

                // kiểm xoát trang học viên 
               
                $(".btn-delte-parent").hide();
                $(".txtEditParent").prop('disabled', true);
                $(".btn-reset-pass-parent").hide();
                $(".btn_edit_parent").hide();

                // kiểm xoát trang thông tin giáo viên 

                $(".btn-delte-teacher").hide();
                $("#txt_fee_totals").hide();


                // kiểm xoát phần thông tin học phí 

                // $(".btn_edit_fee").hide();
                //$(".btn_export_fee").hide();
                $(".btn_edit_teacher").hide();
                $("#page_user").hide();
                $("#page_center").hide();
                $("#page_pack").hide();



            }
            else {

            }


            $.ajax({
                url: "/Absent/GetExport",
                success: function (value) {

                    if (Role == 1) {
                        if (value.Result[0] != 0 || value.Result[1] != 0 || value.Result[2] != 0) {
                            $("#iconthongbao").css("color", "red");
                        }
                        else {

                        }
                    }
                    if (Role == 2) {

                        if (value.Result[1] == 0) {

                        }
                        else {
                            $("#iconthongbao").css("color", "red");
                        }

                    }
                    else if (Role == 3) {
                        if (value.Result[2] == 0) {

                        }
                        else {
                            $("#iconthongbao").css("color", "red");
                        }
                    }
                }
            });



        }
    });







}





function CloesEidtUser() {
    $("#Modal_Edit_User").hide();
}
function CloseDeleteUser() {
    $("#Modal_Del_User").hide();
}

function CloseEditPassUser() {
    $("#Modal_Edit_Pass_User").hide();
}

function CloseEidtTeacher() {
    $("#Modal_Edit_Teacher").hide();
}


// Phan Đình Kiên : Hiển thị thông tin người dùng 
function SeachUser() {
    $.ajax({
        url: "/User/Seach",
        data: {
            Page: 1,
            UserName: $("#txtSeachUserByUserName").val(),
        },
        success: function (result) {
            $("#Table_User").html(result);
        }
    });
}

// Phan Đình Kiên : thêm mới thông tin người dùng
function AddUser() {


    $.ajax({
        url: "/User/Add",
        data: $("#FormAdd_User").serialize(),
        success: function (result) {
            if (result == 1) {
                $("#Modal_Add_User").hide();
                $(".modal-backdrop").hide();
                swal("Thông Báo!", "Thêm mới thành công", "success");
                $("#txtAddUserNameUser").val("");
                $("#txtAddMailUser").val("");
                $("#txtAddUserName").val("");

                $("#txtAddPassUser").val("");
                $("#txtAddRoleUser").val(0);
            }
            else if (result == -3) {
                swal("Thông báo", "(Tài khoản đã tồn tại)", "error");
            }
            else if (result == 0) {
                swal("Thông báo", "(Thêm mới không thành công)", "error");
            }
            else if (result == -1) {
                swal("Thông báo", "(Bạn không có quyền thêm mới thông tin tài khoản)", "error");
            }
            else if (result == -2) {
                swal("Thông báo", "(Bạn không có quyền truy cập vào hệ thống)", "error");
            }
            else if (result == -5) {
                swal("Thông báo", "(Email không được để trống)", "error");
            }
            else if (result == -6) {
                swal("Thông báo", "(Tên tài khoản không được để trống)", "error");
            }
            SeachUser();
        }
    });
}

// Cập nhập lại mật khẩu cho người dùng 
function EditUser() {

    $.ajax({
        url: "/User/UpdatePass",
        data: $("#Form_EditUser").serialize(),
        success: function (result) {
            var txtEditMailUser = $('#txtEditMailUser').val();
            if (!validateEmail(txtEditMailUser)) {

                swal("Thông báo", "(Địa chỉ mail của tài khoản không hợp lệ)", "error");



            } else {
                if (result == 1) {
                    $("#Modal_Edit_User").hide();
                    swal("Thông Báo!", "Cập nhập thành công tài khoản", "success");
                }
                else if (result == 0) {
                    swal("Thông báo", "(Cập nhập tài khoản không thành công)", "error");
                }
                else if (result == -1) {
                    swal("Thông báo", "(Bạn không  có quyền cập nhập thông tin tài khoản)", "error");
                }
                else if (result == -2) {
                    swal("Thông báo", "(Bạn không có quyền truy cập vào hệ thống)", "error");
                }
                else if (result == -5) {
                    swal("Thông báo", "(Email không được để trống)", "error");
                }
                else if (result == -6) {
                    swal("Thông báo", "(Tên tài khoản không được để trống)", "error");
                }
                else if (result == -7) {
                    swal("Thông báo", "(Tên người dùng không được để trống)", "error");
                }

                SeachUser();
            }
        }
    });
}





// Phan Đình Kiên : cập nhập thông tin của người dùng
function EditUser() {

    $.ajax({
        url: "/User/Edit",
        data: $("#Form_EditUser").serialize(),
        success: function (result) {
            var txtEditMailUser = $('#txtEditMailUser').val();
            if (!validateEmail(txtEditMailUser)) {

                swal("Thông báo", "(Địa chỉ mail của tài khoản không hợp lệ)", "error");



            } else {
                if (result == 1) {
                    $("#Modal_Edit_User").hide();
                    swal("Thông Báo!", "Cập nhập thành công tài khoản", "success");
                }
                else if (result == 0) {
                    swal("Thông báo", "(Cập nhập tài khoản không thành công)", "error");
                }
                else if (result == -1) {
                    swal("Thông báo", "(Bạn không  có quyền cập nhập thông tin tài khoản)", "error");
                }
                else if (result == -2) {
                    swal("Thông báo", "(Bạn không có quyền truy cập vào hệ thống)", "error");
                }
                else if (result == -5) {
                    swal("Thông báo", "(Email không được để trống)", "error");
                }
                else if (result == -6) {
                    swal("Thông báo", "(Tên tài khoản không được để trống)", "error");
                }
                else if (result == -7) {
                    swal("Thông báo", "(Tên người dùng không được để trống)", "error");
                }
                SeachUser();
            }
        }
    });
}

// Phan Đình Kiên : Lấy thông tin của người dùng theo id
function GetUserById(ID) {
    $.ajax({
        url: "/User/GetById",
        data: { ID: ID },
        success: function (result) {
            $("#txtEditUserName").val(result.NAME);
            $("#txtEditUserNameUser").val(result.USER_NAME);
            $("#txtEditMailUser").val(result.EMAIL);
            $("#txtEditPassUser").val(result.PASSWORD);
            $("#txtEditRoleUser").val(result.ROLE);
            $("#txtEditIdUser").val(result.ID);
            $("#Modal_Edit_User").show();
        }
    });
}



// Phan Đình Kiên : đăng nhập thông tin của tài khoản  
function LoginAdmin() {
    var userName = $("#login-username").val();
    var passWord = $("#login-password").val();

    if (userName == "") {
        swal("Thông báo", "(Vui lòng nhập tài khoản của bạn)", "error");
    }
    else if (passWord == "") {
        swal("Thông báo", "(Vui lòng nhập mật khẩu của bạn)", "error");
    }
    else {
        $.ajax({
            url: "/User/LoginUser",
            data: { UserName: userName, Password: passWord },
            success: function (result) {
                if (result == 1) {
                    window.location = "/Home/Index";
                }
                else if (result == 0) {
                    swal("Thông báo", "(Sai tài khoản hoặc mật khẩu)", "error");
                }
                else if (result == -2) {
                    swal("Thông báo", "(Bạn không có quyền truy cập vào hệ thống)", "error");
                }
                SeachUser
            },
            error: function (errr) {

            }
        });
    }


}

// Phan Đình Kiên : Lây thông tin tài khoản cần xóa 
var IDDeleteUser = 0;
function ShowFromDeleteUser(Id) {
    IDDeleteUser = Id;
    $("#Modal_Del_User").show();
}

// phan đình kiên :Xóa thông tin của tài khoản 
function DelUser() {
    $.ajax({
        url: "/User/Delete",
        data: { Id: IDDeleteUser },
        success: function (result) {
            if (result == 1) {
                $("#Modal_Del_User").hide();
                swal("Thông Báo!", "Xóa thành công tài khoản", "success");
            }
            else if (result == 0) {
                swal("Thông báo", "(Xóa không thành công tài khoản)", "error");
            }
            else if (result == -1) {
                swal("Thông báo", "(Bạn không có quyền xóa thông tin tài khoản)", "error");
            }
            SeachUser();
        }
    });
}

// Phan Đình Kiên : reset Lại thông tin mật khẩu của tài khoản 
function ResetPassword() {
    $.ajax({
        url: "/User/ResetPass",
        data: { ID: $("#txtEditIdUser").val() },
        success: function (result) {
            if (result == "0") {
                $("#Modal_EditUser").hide();
                swal("Thông báo", "(reset mật khẩu không thành công)", "error");
            }
            else if (result == '-1') {
                swal("Thông báo", "(Bạn không có quyền reset lại tài khoản)", "error");
            }
            else {
                swal("Thông Báo!", "Reset Thành công mật khẩu của tài khoản là : " + result, "success");
            }
            SeachUser();
        }
    });
}

// Phan Đình Kiên : cập nhập lại thông tin mật khẩu của tài khoản 
function EditPassword() {

    var pass = $('#txt_edit_pass_user').val();
    var checkpass = $('#txt_check_edit_pass_user').val();

    if (pass != checkpass) {
        swal("Thông báo", "(Mật khẩu không trùng khớp)", "error");
    } else {
        $.ajax({
            url: "/User/UpdatePass",
            data: { Pass: pass },
            success: function (result) {
                if (result == 0) {
                    $("#Modal_Edit_Pass_User").hide();
                    swal("Thông báo", "(Cập nhập mật khẩu không thành công)", "error");
                }
                else if (result == 1) {
                    $("#Modal_Edit_Pass_User").hide();
                    swal("Thông Báo!", "Cập nhập mật khẩu thành công", "success");
                }

            }
        });
    }
}

// phan Đình Kiên : load thông tin thời gian 


$(document).ready(function () {



    $('.date').datepicker({
        dateFormat: "dd/mm/yy"
    });

    // Phan Đình Kiên : hiển thị khung đăng nhập tài khoản 
    $("#EditPass").off('click').on('click', function (e) {
        e.preventDefault();
        $("#Modal_Edit_Pass_User").show();
    });


    // Phan Đình Kiên : hiển thị khung đăng nhập tài khoản 
    $("#Export").off('click').on('click', function (e) {
        e.preventDefault();
        $("#Modal_Thongbao").show();
    });


    $('.number').keyup(function () {
        $val = cms_decode_currency_format($(this).val());
        $(this).val(cms_encode_currency_format($val));
    });
});

//-------------------------------------------------------------------------- Thông tin học viên ---------------------------------------------------

// phan đình kiên : tìm kiếm thông tin của học sinh  
function SeachParent() {
    $.ajax({
        url: "/Parent/Seach",
        data: {
            Page: 1,
            NAME: $("#txt_seach_name_parent").val(),
            Count: $("#txt_count_list_student").val(),
            STUDENT_NAME: $("#txt_seach_name_student_parent").val(),
            STUDENT_PHONE: $("#txt_seach_phone_parent").val(),
            STATUS: $("#txt_seach_sattus_parent").val(),
            CREATED_DATE: $("#txt_seach_create_parent").val(),
            BRANCH_ID: $("#txt_seach_branch_parent").val(),
        },
        success: function (result) {
            $("#Table_Parent").html(result);
        }
    });
}


function ExitEditStudent() {
    var page = $("#txt_seach_student_page_in_edit").val();
    var count = $("#txt_seach_student_count_in_edit").val();
    var name = $("#txt_seach_student_name_in_edit").val();
    var create_date = $("#txt_seach_student_create_date_in_edit").val();
    var status = $("#txt_seach_student_status_in_edit").val();
    var student_name = $("#txt_seach_student_student_name_in_edit").val();
    var student_phone = $("#txt_seach_student_student_phone_in_edit").val();

    if (page == "") {
        page = 1;
    }


    if (count == "") {
        count = 10;
    }

    window.location = "/Parent/ListParent?Page=" + page + "&Count=" + count + "&NAME=" + name + "&STUDENT_NAME=" + student_name + "&STUDENT_PHONE=" + student_phone + "&STATUS=" + status + "&CREATED_DATE=" + create_date;
}





// Phan Đình kiên : xóa nhiều học viên cùng một lúc 
function ShowDeleteListParent() {

    var myArray = "";
    $('#ListStudent input[type=checkbox]').each(function () {
        if (this.checked) {
            myArray = myArray + $(this).val() + ":";
        }
    });
    $("#list_id_parent").val(myArray);
    if (myArray == "") {
        swal("Thông báo", "(Bạn phải chọn danh sách học sinh cần xóa)", "error");
    }
    else {
        $("#Modal_Del_List_Parent").show();
    }





}

function DelListParent() {
    $.ajax({
        url: "/Parent/DeleteList",
        data: {
            ListID: $("#list_id_parent").val()
        },
        success: function (result) {

            if (result == 0) {

                swal("Thông báo", "(Xóa không thành công danh sách học viên)", "error");
            }
            else if (result == -1) {
                swal("Thông báo", "(Bạn không có quyền xóa danh sách học viên)", "error");
            }
            else if (result == -2) {
                swal("Thông báo", "(Bạn cần phải chọn học viên cần xóa)", "error");
            }
            else {


                swal("Thông Báo!", "" + result + "", "success");
                $("#Modal_Del_List_Parent").hide();

                // tiến hành load lại trạng 
                $.ajax({
                    url: "/Parent/Seach",
                    data: {
                        Page: $("#txt_page_list_student").val(),
                        Count: $("#txt_count_list_student").val(),
                        NAME: $("#txt_seach_name_paren").val(),
                        STUDENT_NAME: $("#txt_seach_name_student_parent").val(),
                        STUDENT_PHONE: $("#txt_seach_phone_paren").val(),
                        STATUS: $("#txt_seach_sattus_parent").val(),
                        CREATED_DATE: $("#txt_seach_create_parent").val(),
                        BRANCH_ID: $("#txt_seach_branch_parent").val(),
                    },
                    success: function (result) {
                        $("#Table_Parent").html(result);
                    }
                });


            }


        }
    });
}

// Phan Đình Kiên : Thêm mới thông tin của học viên 
function AddParent() {


    var parent_phone = $("#txt_add_phone_parent").val();
    var parent_email = $("#txt_add_email_parent").val();
    var parent_student_phone = $("#txt_add_phone_student_parent").val();
    if (parent_email != "") {

        if (!validateEmail(parent_email)) {
            swal("Thông báo", "(địa chỉ maill không hợp lệ)", "error");
            return;
        }
        else {
            $.ajax({
                url: "/Parent/Add",
                data: $("#Form_Add_Parent").serialize(),
                success: function (result) {
                    if (result.Status == 1) {
                        $("#Modal_Add_Parent").hide();
                        swal("Thông Báo!", result.Message, "success");
                        setTimeout(function () {
                            window.location = "/parent/index";
                        }, 1000);

                    }
                    else if (result.Status == -1) {
                        swal("Thông báo", result.Message, "error");
                    }

                }
            });
        }
    }
    else {
        $.ajax({
            url: "/Parent/Add",
            data: $("#Form_Add_Parent").serialize(),
            success: function (result) {
                if (result.Status == 1) {
                    $("#Modal_Add_Parent").hide();
                    swal("Thông Báo!", result.Message, "success");
                    setTimeout(function () {
                        window.location = "/parent/index";
                    }, 1000);

                }
                else if (result.Status == -1) {
                    swal("Thông báo", result.Message, "error");
                }

            }
        });
    }






}

// Phan Đình Kiên : lấy thông tin của học sinh theo id 
function GetParentById(ID) {
    $.ajax({
        url: "/Parent/GetById",
        data: { ID: ID },
        success: function (result) {
            window.location = '/parent/update'
            $("#txtEditUserNameUser").val(result.ID);
            $("#txtEditUserNameUser").val(result.NAME);
            $("#txtEditUserNameUser").val(result.PHONE);
            $("#txtEditUserNameUser").val(result.STUDENT_NAME);
            $("#txtEditUserNameUser").val(result.STUDENT_SCHOOL_NAME);
            $("#txtEditUserNameUser").val(result.STUDENT_BIRTHDAY);
            $("#txtEditUserNameUser").val(result.STUDENT_PHONE);
            $("#txtEditUserNameUser").val(result.PASSWORD);
            $("#txtEditUserNameUser").val(result.ADDRESS);
            $("#txtEditUserNameUser").val(result.EMAIL);
            $("#txtEditUserNameUser").val(result.STUDENT_SEX);
            $("#txtEditUserNameUser").val(result.CREATED_DATE);
            $("#txtEditUserNameUser").val(result.NOTE);
            $("#txtEditUserNameUser").val(result.MARK1);
            $("#txtEditUserNameUser").val(result.MARK2);
            $("#txtEditUserNameUser").val(result.STATUS);
            $("#txtEditUserNameUser").val(result.NOTE_SUBJECT);
            $("#txtEditUserNameUser").val(result.URL_AVATAR);
        }
    });
}

function ExprotParent() {

    var student_name = $("#txt_seach_name_student_parent").val();
    var parent_name = $("#txt_seach_name_parent").val();
    var phone = $("#txt_seach_phone_parent").val();
    var create_date = $("#txt_seach_create_parent").val();
    var student_status = $("#txt_seach_sattus_parent").val();
    var BRANCH_ID = $("#txt_seach_branch_parent").val();

    window.location = "/Parent/ExportBill?NAME=" + parent_name + "&STUDENT_NAME=" + student_name + "&STUDENT_PHONE=" + phone + "&CREATED_DATE=" + create_date + "&STATUS=" + student_status + "&BRANCH_ID=" + BRANCH_ID;

}

// Phan Đình Kiên : cập nhập thông tin của học viên 
function EditParent() {

    var parent_name = $("#txt_Edit_name_parent").val();
    var parent_phone = $("#txt_Edit_phone_parent").val();
    var parent_adress = $("#txt_Edit_address_parent").val();
    var parent_email = $("#txt_Edit_email_parent").val();
    var parent_student_name = $("#txt_Edit_name_student_parent").val();
    var parent_student_shool = $("#txt_Edit_school_student_parent").val();
    var parent_student_birthday = $("#txt_Edit_birthday_student").val();
    var parent_student_phone = $("#txt_Edit_phone_student_parent").val();
    var parent_student_subject = $("#txt_Edit_node_subject_student_parent").val();
    var parent_student_max1 = $("#txt_Edit_max1_student_parent").val();
    var parent_student_max2 = $("#txt_Edit_max2_student_parent").val();

    if (parent_email.trim() != "") {

        if (!validateEmail(parent_email)) {
            swal("Thông báo", "(Địa chỉ mail không hợp lệ)", "error");
            return;
        }
        else {
            $.ajax({
                url: "/Parent/Edit",
                data: $("#Form_Edit_Parent").serialize(),
                success: function (result) {


                    if (result.Status == 1) {
                        $("#Modal_Add_Parent").hide();
                        swal("Thông Báo!", result.Message, "success");
                        setTimeout(function () {
                            ExitEditStudent();
                        }, 1000);

                    }
                    else if (result.Status == -1) {
                        swal("Thông Báo!", result.Message, "error");
                    }
                }
            });
        }

    }
    else {
        $.ajax({
            url: "/Parent/Edit",
            data: $("#Form_Edit_Parent").serialize(),
            success: function (result) {


                if (result.Status == 1) {
                    $("#Modal_Add_Parent").hide();
                    swal("Thông Báo!", result.Message, "success");
                    setTimeout(function () {
                        ExitEditStudent();
                    }, 1000);

                }
                else if (result.Status == -1) {
                    swal("Thông Báo!", result.Message, "error");
                }
            }
        });
    }
}

// phan đình kiên : check validate mail 
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Phan đình kiên : reset pass cho học viên 
function ResetPassword_parent() {
    $.ajax({
        url: "/parent/ResetPass",
        data: { ID: $("#txtEditIidParent").val() },
        success: function (result) {
            if (result == "0") {
                $("#Modal_EditPassParent").hide();
                swal("Thông báo", "(reset mật khẩu không thành công)", "error");
            }
            else if (result == '-1') {
                swal("Thông báo", "(Bạn không có quyền reset lại tài khoản)", "error");
            }
            else {
                swal("Thông Báo!", "Reset Thành công mật khẩu của tài khoản là : " + result, "success");
            }
            SeachUser();
            $("#Modal_EditPassParent").hide();
        }
    });
}

// phan đình kiên : lấy thông tin học viên cần xóa
var IDDeleteParent = 0;
function ShowFromDeleteParent(Id) {
    IDDeleteParent = Id;
    $("#Modal_Del_Parent").show();
}

// Phan đình Kiên : Tiến hành xóa thông tin của học viên 
function DelParent() {
    $.ajax({
        url: "/Parent/Delete",
        data: { ID: IDDeleteParent },
        success: function (result) {
            if (result == 1) {
                $("#Modal_Del_Parent").hide();
                swal("Thông Báo!", "Xóa thành công tài khoản", "success");

                $.ajax({
                    url: "/Parent/Seach",
                    data: {
                        Page: $("#txt_page_list_student").val(),
                        Count: $("#txt_count_list_student").val(),
                        NAME: $("#txt_seach_name_paren").val(),
                        STUDENT_NAME: $("#txt_seach_name_student_parent").val(),
                        STUDENT_PHONE: $("#txt_seach_phone_paren").val(),
                        STATUS: $("#txt_seach_sattus_parent").val(),
                        CREATED_DATE: $("#txt_seach_create_parent").val(),
                        BRANCH_ID: $("#txt_seach_branch_parent").val(),
                    },
                    success: function (result) {
                        $("#Table_Parent").html(result);
                    }
                });

            }
            else if (result == 0) {
                swal("Thông báo", "(Xóa không thành công tài khoản)", "error");
            }
            else if (result == -1) {
                swal("Thông báo", "(Bạn không có quyền xóa thông tin tài khoản)", "error");
            }
            else if (result == -4) {
                swal("Thông báo", "(không được xóa học sinh khi đã được ghép lớp)", "error");
            }

        }
    });
}

// Phan Đình Kiên : load Checbox Parent 
function LoadCheckStudent() {

    $("#CheckBookAll").click(function () {
        if ($(this).is(":checked")) {
            $(".ParentCheckbox").prop('checked', true);
        }
        else {
            $(".ParentCheckbox").prop('checked', false);
        }
    });
}

$(document).ready(function () {


    // Phan Đình Kiên : hiển thị khung đăng nhập tài khoản 
    $("#EditPass").off('click').on('click', function (e) {
        e.preventDefault();
        $("#Modal_Edit_Pass_User").show();
    });

    // Phan đình kiên : điểu hướng sang tran khỏi tạo học sinh 
    $('#btn_add_parent').click(function () {
        window.location = '/parent/create';
    });


    $('.datetimepickers2').datetimepicker({
        format: 'm/Y',
        timepicker: false,
        lang: 'vi',

        //inline: true
    });

    // Phan Đình Kiên : load Checbox Parent 
    $("#CheckBookAll").click(function () {
        if ($(this).is(":checked")) {
            $(".ParentCheckbox").prop('checked', true);
        }
        else {
            $(".ParentCheckbox").prop('checked', false);
        }
    });


    // Phan Đình Kiên : bắt sự kiện chọn giáo viên 
    $("#txt_count_list_student").change(function () {
        $.ajax({
            url: "/Parent/Seach",
            data: {
                Page: $("#txt_page_list_student").val(),
                Count: $("#txt_count_list_student").val(),
                NAME: $("#txt_seach_name_paren").val(),
                STUDENT_NAME: $("#txt_seach_name_student_parent").val(),
                STUDENT_PHONE: $("#txt_seach_phone_paren").val(),
                STATUS: $("#txt_seach_sattus_parent").val(),
                CREATED_DATE: $("#txt_seach_create_parent").val(),
                BRANCH_ID: $("#txt_seach_branch_parent").val(),
            },
            success: function (result) {
                $("#Table_Parent").html(result);
            }
        });

    });

});
//-------------------------------------------------------------------------- Thông tin lớp học -------------------------------------------------------

//function DeleteStudentClassInEdit() {

//    var student_id = $("#txt_id_delete_student_class").val();
//    var class_id = $("#txt_id_delete_id_class").val();

//    $.ajax({
//        url: "/Class/DeleteSesstionStudentInClass",
//        data: { STUDENT_ID: student_id, CLASS_ID: class_id },
//        success: function (result) {
//            if (result == 1) {
//                $("#table_edit_student_class tbody").closest('tr').remove();
//                UpdateSttEditStudentClass();
//                $("#Modal_Del_studentclass").hide();
//                swal("Thông Báo!", "Xóa thành công học viên trong lớp học", "success");


//            }
//            else {
//                swal("Thông báo", "(xóa học viên không thành công)", "error");
//                return -1;

//            }

//            var str = '#data_row_class_student_' + student_id + '';

//            $("#data_row_class_student_29").empty();

//        }
//    });
//}

function CloseStudentClassClass() {
    $("#Modal_Del_studentclass").hide();
}

$(document).ready(function () {

    LoadSelectClass(); // hiển thị danh sách lớp học 


    UpdateSttEditStudentClass();
    UpdateSttAddStudentClass();

    /// phan đình kiên : auto học sinh để đưa vào clss
    $("#txt_seach_add_student_in_class").autocomplete({

        source: function (s, r) {
            $.ajax({
                url: "/parent/GetComAutoComplete",
                data: { NAME: $("#txt_seach_add_student_in_class").val() },
                success: function (result) {
                    r($.parseJSON(result));
                }
            });
        },

        select: function (a, b) {

            $.ajax({
                url: "/parent/ParentAuto",
                data: { ID: b.item.value },
                success: function (dt) {
                    var Student_ID = dt.ID;
                    var Student_Name = dt.STUDENT_NAME;
                    var parent_Name = dt.PARENT_NAME;
                    var phone = dt.PHONE;
                    $.ajax({
                        url: "/Class/AddSesstionstudentInClass",
                        data: { ID: dt.ID },
                        success: function (data) {

                            if (data == 1) {
                                // tiến hành add thêm một dòng vào cột 
                                $('#data_table_class_student').append('<tr id="data_row_class_student_' + Student_ID + '">  <td></td>  <td> <input type="hidden" value="' + Student_ID + '"/> ' + Student_Name + '</td> <td>' + parent_Name + '</td> <td>' + phone + '</td> <td><input type="text" class="form-control form-control-sm datetimepickers" /></td>  <td><input type="text" class="form-control number form-control-sm" /></td> <td><input type="text" class="form-control form-control-sm" /></td>  <td><button class="btn btn-danger"> <i class="fa fa-trash-o"></i></button></td></tr>');
                                $('.number').keyup(function () {
                                    $val = cms_decode_currency_format($(this).val());
                                    $(this).val(cms_encode_currency_format($val));
                                });
                                $('.datetimepickers').datetimepicker({
                                    format: 'd/m/Y',
                                    timepicker: false,
                                    lang: 'vi'
                                    //inline: true
                                });
                                $('#txt_seach_add_student_in_class').val((dt.STUDENT_NAME + "/" + dt.PARENT_NAME).trim());
                                UpdateSttAddStudentClass();
                            }
                            else if (data == -1) {
                                swal("Thông báo", "(học viên đã tồn tại trong lớp học)", "error");
                            }
                            else if (data == 0) {
                                swal("Thông báo", "(Thêm mới không thành công)", "error");
                            }
                            else {
                                swal("Thông báo", data, "error");
                            }
                        }
                    });


                }
            });
        }
    });

    /// phan đình kiên : auto học sinh để đưa vào class
    $("#txt_seach_edit_student_in_class").autocomplete({

        source: function (s, r) {
            $.ajax({
                url: "/parent/GetComAutoComplete",
                data: { NAME: $("#txt_seach_edit_student_in_class").val() },
                success: function (result) {
                    r($.parseJSON(result));
                }
            });
        },

        select: function (a, b) {

            $.ajax({
                url: "/parent/ParentAuto",
                data: { ID: b.item.value },
                success: function (dt) {
                    var Student_ID = dt.ID;
                    var Student_Name = dt.STUDENT_NAME;
                    var parent_Name = dt.PARENT_NAME;
                    var phone = dt.PHONE;
                    $.ajax({
                        url: "/Class/UpdateSesstionstudentInClass",
                        data: { ID: dt.ID },
                        success: function (data) {

                            if (data == 1) {

                                $('#edit_data_table_class_student').append('<tr id="data_row_class_student_' + Student_ID + ' " class="data_row_class_student_edit"><td><input type="hidden" value=""></td><td><input type="hidden" value="' + Student_ID + '" /> ' + Student_Name + ' </td><td>' + parent_Name + '</td><td>' + phone + '</td><td><input type="text" class="form-control form-control-sm datetimepickers" /></td><td><input disabled type="text" class="form-control form-control-sm datetimepickers" /></td> <td><input type="text" class="form-control form-control-sm number" /></td><td> <select  class="form-control form-control-sm STUDENT_CLASS_STATUS" id="Edit_option_status_student_in_class_' + Student_ID + '" name="STUDENT_CLASS_STATUS"><option value="1">Đang học</option><option value="0">Thôi học</option></select></td><td><input type="text" class="form-control form-control-sm" /></td> <td><button class="btn btn-danger"> <i class="fa fa-trash-o"></i></button></td></tr>')
                                $('.number').keyup(function () {
                                    $val = cms_decode_currency_format($(this).val());
                                    $(this).val(cms_encode_currency_format($val));
                                });
                                $('.datetimepickers').datetimepicker({
                                    format: 'd/m/Y',
                                    timepicker: false,
                                    lang: 'vi'
                                    //inline: true
                                });





                                $('#txt_seach_edit_student_in_class').val((dt.STUDENT_NAME + "/" + dt.PARENT_NAME).trim());
                                UpdateSttEditStudentClass();
                            }
                            else if (data == -1) {
                                swal("Thông báo", "(học viên đã tồn tại trong lớp học)", "error");
                            }
                            else if (data == 0) {
                                swal("Thông báo", "(Thêm mới không thành công)", "error");
                            }
                            else {
                                swal("Thông báo", data, "error");
                            }
                        }
                    });


                }
            });
        }
    });

    //Phan Đình Kiên : xóa dòng trong bảng học viên trong lớp học 
    $('#table_add_student_class tbody').on('click', '.btn', function () {

        var student_id = $(this).closest('tr').find('td:nth-child(2) input').val();

        $.ajax({
            url: "/Class/DeleteAddStudentClass",
            data: { StudentId: student_id },
            success: function (result) {
            }
        })

        $(this).closest('tr').remove();
        UpdateSttAddStudentClass();
    });

    //Phan Đình Kiên : xóa thông tin lịch học 
    $('#table_add_class_schedule tbody').on('click', '.btn', function () {
        var Day = $(this).closest('.data_table_row_class_schedule').find('td:nth-child(1) input').val();
        var RoomID = $(this).closest('.data_table_row_class_schedule').find('td:nth-child(4) input').val();
        var StartTime = $(this).closest('.data_table_row_class_schedule').find('td:nth-child(2)').text();
        var EndTime = $(this).closest('.data_table_row_class_schedule').find('td:nth-child(3)').text();

        $.ajax({
            url: "/Class/DeleteSesstionScheduleinClass",
            data: { Day: Day, RoomID: RoomID, StartTime: StartTime, EndTime: EndTime },
            success: function (result) {
                if (result == 1) {

                }
                else {
                    swal("Thông báo", "(xóa thông tin không thành công)", "error");
                }
            }
        })
        $(this).closest('tr').remove();

    });

    //Phan Đình Kiên : xóa dòng trong bảng thêm thông tin giáo viên 
    $('#txt_add_table_teacher_class tbody').on('click', '.btn', function () {
        var teacher_id = $(this).closest('.data_row_class_teacher_add').find('td:nth-child(1) input').val();
        var salary_leve = $(this).closest('.data_row_class_teacher_add').find('td:nth-child(2) input').val();
        var start_date = $(this).closest('.data_row_class_teacher_add').find('td:nth-child(3)').text();
        var end_date = $(this).closest('.data_row_class_teacher_add').find('td:nth-child(4)').text();

        $.ajax({
            url: "/Class/DeleteSesstionTeacherInClass",
            data: { TeacherID: teacher_id, SalaryID: salary_leve, StartDate: start_date, EndDate: end_date },
            success: function (result) {
                if (result == 1) {
                    $(this).closest('tr').remove();
                }
                else {
                    swal("Thông báo", "(xóa giáo viên không thành công)", "error");
                }
            }
        })
        $(this).closest('tr').remove();
    });

    // phan đình kiên : xóa dòng trong bảng học sinh 
    $('#table_edit_student_class tbody').on('click', '.btn', function () {
        var student_id = $(this).closest('.data_row_class_student_edit').find('td:nth-child(2) input').val();
        var class_id = $("#txt_edit_Id_class").val();

        $("#txt_id_delete_student_class").val(student_id);
        $("#txt_id_delete_id_class").val(class_id);

        $.ajax({
            url: "/Class/DeleteSesstionStudentInClass",
            data: { STUDENT_ID: student_id, CLASS_ID: class_id },
            success: function (result) {
                if (result == 1) {
                    $("#table_edit_student_class tbody").closest('tr').remove();
                    UpdateSttEditStudentClass();
                    $("#Modal_Del_studentclass").hide();
                    swal("Thông Báo!", "Xóa thành công học viên trong lớp học", "success");


                }
                else {
                    swal("Thông báo", "(xóa học viên không thành công)", "error");
                    return -1;

                }

                var str = '#data_row_class_student_' + student_id + '';


            }
        });
        $(this).closest('tr').remove();
    });




    // phan đình kiên : thêm mới một giáo viên trong class 
    $("#btn_add_teacher_class").click(function () {
        var start_date = $('#txt_add_start_date_class_teacher').val();
        var salary_leve = $("#txt_add_salary_level_in_add_class").val();
        var salary_name = $("#txt_add_salary_level_in_add_class option:selected").text();
        var teacher_id = $("#txt_add_teacher_in_add_class").val();
        var teacher_Name = $("#txt_add_teacher_in_add_class option:selected").text();

        if (teacher_Name.trim() == "--lựa chọn--") {
            // thông báo phải chọn tên giáo viên 
            swal("Thông báo", "(Bạn phải chọn giáo viên giảng dạy)", "error");

        }
        else if (salary_name.trim() == "--lựa chọn--") {
            // thông báo phải chọn bậc lương cho giáo viên 
            swal("Thông báo", "(Bạn phải chọn bậc lương cho giáo viên)", "error");
        }
        else if (start_date == "") {
            // thông báo ngày dạy học không hợp lệ 
            swal("Thông báo", "(Thời gian bắt đầu dạy học của giáo viên không hợp lệ)", "error");
        }
        else {
            $.ajax({
                url: "/Class/AddSesstionTeacherInClass",
                data: { TeacherID: teacher_id, SalaryID: salary_leve, StartDate: start_date, NameTeacher: teacher_Name, SalaryName: salary_name },
                success: function (result) {
                    if (result == 1) {
                        GetAddTeacherInClass();
                    }
                    else if (result == -2) {
                        swal("Thông báo", "(Ngày bắt đầu dạy học của giáo viên không hợp lệ)", "error");
                    }

                    else if (result == 0) {
                        swal("Thông báo", "(Thêm mới giáo viên không thành công)", "error");
                    }
                    else {
                        swal("Thông báo", result, "error");
                    }
                }
            })

        }

    });





    // phan đình kiên : thêm mới thông tin lịch học 
    $("#btn_add_schedule_class").click(function () {

        $('#modalLoad').modal("show");
        AddListStudentClass();  // tiến hành load lên danh sách học sinh 

        setTimeout(function () {
            var start_time = $('#txt_add_time_start_schedule').val();
            var end_time = $('#txt_add_time_end_schedule').val();
            var day_id = $("#txt_add_day_in_add_class_schedule").val();
            var day_name = $("#txt_add_day_in_add_class_schedule option:selected").text();
            var room_id = $("#txt_add_room_in_add_class_schedule").val();
            var room_Name = $("#txt_add_room_in_add_class_schedule option:selected").text();
            var week_class = $("#txt_add_day_per_week_class").val();
            var rowCount = $('#data_table_tbody_class_schedule tr').length;


            if (day_name.trim() == "--lựa chọn--") {
                // thông báo phải chọn tên giáo viên 
                swal("Thông báo", "(bạn phải chọn ngày học của lớp học )", "error");
                $('#modalLoad').modal("hide");
            }
            else if (room_Name.trim() == "--lựa chọn--") {
                // thông báo phải chọn bậc lương cho giáo viên 
                swal("Thông báo", "(Bạn phải chọn phòng học của lớp học)", "error");
                $('#modalLoad').modal("hide");
            }
            else if (start_time >= end_time) {
                // thông báo ngày dạy học không hợp lệ 
                swal("Thông báo", "(Thời gian học không hợp lệ)", "error");
                $('#modalLoad').modal("hide");
            }
            else if (week_class <= rowCount) {
                swal("Thông báo", "(số buổi học trên tuần vượt quá quy định)", "error");
                $('#modalLoad').modal("hide");
            }
            else if (week_class == "") {
                swal("Thông báo", "(Bạn cần phải chọn số buổi học trên tuần cho lớp học)", "error");
                $('#modalLoad').modal("hide");
            }
            else {
                $.ajax({
                    url: "/Class/AddSesstionScheduleinClass",
                    data: { Day: day_id, StartTime: start_time, EndTime: end_time, RoomID: room_id },
                    success: function (result) {
                        if (result == 1) {
                            $("#data_table_tbody_class_schedule").append('  <tr class="data_table_row_class_schedule"> <td> <input type="hidden" value="' + day_id + '"/> ' + day_name + ' </td><td> ' + start_time + ' </td><td> ' + end_time + '  </td><td> <input type="hidden" value="' + room_id + '"/> ' + room_Name + ' </td><td> <button class="btn btn-danger"> <i class="fa fa-trash-o"></i></button></td></tr>');
                        }
                        else if (result == -1) {
                            swal("Thông báo", "(thời gian học bị trùng lặp)", "error");
                        }
                        else if (result == -2) {
                            swal("Thông báo", "(Phòng học đã có lớp khác sử dụng)", "error");
                        }
                        else if (result == 0) {
                            swal("Thông báo", "(thêm mới lịch học không thành công)", "error");
                        }

                        else {
                            swal("Thông báo", result, "error");
                        }

                        $('#modalLoad').modal("hide");
                    }
                })

            }
        }, 1000);

    });
});

// Phan Đình Kiên : cập nhập lại danh sách giáo viên trong lớp
function GetAddTeacherInClass() {
    $.ajax({
        url: "/Class/GetAddSesstionTeacherClass",
        success: function (result) {
            $("#data_tbody_class_teacher_add").html(result);
        }
    })
}

// Phan đình kiên : lấy về danh sách học sinh cần thêm 
var checkAddLoadStudent = 0;
var checkLoadListStudent = 0;



function AddListStudentClass() {
    var ListStudentClass = [];
    checkAddLoadStudent = 0;
    $("#data_table_class_student tr").each(function () {


        var Parent_name = $(this).find('td:nth-child(3)').text();
        var Phone = $(this).find('td:nth-child(4)').text();
        var Student_name = $(this).find('td:nth-child(2)').text();
        var Student_Id = $(this).find('td:nth-child(2) input').val();
        var StartDate = $(this).find('td:nth-child(5) input').val();
        var Fee = $(this).find('td:nth-child(6) input').val();
        var Node = $(this).find('td:nth-child(7) input').val();
        var fees = cms_decode_currency_format(Fee);

        // tiến hành lẩy ra số tiến theo dấu phầy


        if (StartDate.trim() == "") {
            swal("Thông báo", "(bạn phải nhập ngày bắt đầu học của (" + Student_name + "))", "error");
            k = 1;
            checkAddLoadStudent = 1
            return;
        }
        else if (Fee.trim() == "") {
            swal("Thông báo", "(Bạn phải nhập học phí cho học sinh (" + Student_name + "))", "error");
            checkAddLoadStudent = 1;
            return;
        }
        else {
            ListStudentClass.push({ STUDENT_ID: Student_Id, STR_START_DATE: StartDate, FEE: fees, NOTE: Node, STUDENT_NAME: Student_name, PARENT_NAME: Parent_name, PHONE: Phone });
        }
    });


    // tiến hành anh danh sách 
    if (checkAddLoadStudent == 0) {
        $.ajax({
            url: "/Class/UpdateListStudentClass",
            type: "POST",
            data: { ListStudentClass: JSON.stringify(ListStudentClass) },
            success: function (result) {

            }
        })
    }

}

// Phan Đình kiên : thêm mới thông tin lớp học 
function AddClass() {
    AddListStudentClass();
    if (checkAddLoadStudent == 0) {
        $('#modalLoad').modal("show");
        setTimeout(() => {
            var Add_class_name = $("#txt_add_name_class").val();
            var Add_day_per_week = $("#txt_add_day_per_week_class").val();
            var Add_start_date = $("#txt_add_start_date_class").val();
            var Add_end_date = $("#txt_add_end_date_class").val();
            var Add_branch_id = $("#txt_add_branch_class").val();
            var Add_teacher_id = $("#txt_add_teacher_main_parent").val();

            if (Add_class_name.trim() == "") {
                swal("Thông báo", "bạn cần phải nhập tên của lớp học", "error");
                $('#modalLoad').modal("hide");
                return;
            }
            else if (Add_class_name.length == 200) {
                swal("Thông báo", "Tên của lớp học có chiều dài vượt quá kích thước quy định", "error");
                $('#modalLoad').modal("hide");
                return;

            }


            else if (Add_start_date == "") {
                swal("Thông báo", "bạn cần phải nhập ngày bắt đầu của lớp học", "error");
                $('#modalLoad').modal("hide");
                return;
            }



            else if (Add_branch_id == 0) {
                swal("Thông báo", "bạn cần chọn cơ sở cho lớp học", "error");
                $('#modalLoad').modal("hide");
                return;
            }

            else if (Add_teacher_id == 0) {
                swal("Thông báo", "Bạn cần chọn giáo viên chủ nhiệm cho lớp học", "error");
                $('#modalLoad').modal("hide");
                return;
            }
            else {
                $.ajax({
                    url: "/Class/Add",
                    data: $("#Form_Add_Class").serialize(),
                    success: function (result) {
                        if (result.Status == 1) {
                            swal("Thông Báo!", result.Message, "success");
                            setTimeout(function () {
                                window.location = "/Class/index";
                                $('#modalLoad').modal("hide");
                            }, 1000);

                        }
                        else if (result.Status == -1) {
                            swal("Thông báo", result.Message, "error");
                            $('#modalLoad').modal("hide");
                        }
                        $('#modalLoad').modal("hide");

                    }
                })
            }
        }, 3000);
    }



}

//phan đình kiên : lấy danh sách học viên 
var CheckListStudent = 0;
function UpdateListStudentClass() {
    CheckListStudent = 0;
    var ListStudentClass = [];

    $("#edit_data_table_class_student tr").each(function () {

        var class_id = $("#txt_edit_Id_class").val();
        var Parent_name = $(this).find('td:nth-child(3)').text();
        var Phone = $(this).find('td:nth-child(4)').text();
        var Student_name = $(this).find('td:nth-child(2)').text();
        var Student_Id = $(this).find('td:nth-child(2) input').val();
        var StartDate = $(this).find('td:nth-child(5) input').val();
        var EndDate = $(this).find('td:nth-child(6) input').val();
        var Fee = $(this).find('td:nth-child(7) input').val();
        var Node = $(this).find('td:nth-child(9) input').val();
        var fees = cms_decode_currency_format(Fee);


        var IdSelectStatus = "#Edit_option_status_student_in_class_" + Student_Id + " option:selected";
        var Status = $(IdSelectStatus).val();
        var status_name = $(IdSelectStatus).text();


        if (StartDate.trim() == "") {
            swal("Thông báo", "(bạn phải nhập ngày bắt đầu học của (" + Student_name + "))", "error");
            CheckListStudent = 1;

            return;
        }
        else if (Fee.trim() == "") {
            swal("Thông báo", "(Bạn phải nhập học phí cho học sinh (" + Student_name + "))", "error");
            CheckListStudent = 1;
            return;
        }

        else if (StartDate.trim() != "" && EndDate.trim() != "") {

            if (StartDate > EndDate) {
                swal("Thông báo", "(Ngày kết thúc học của (" + Student_name + ") không hợp lệ)", "error");
                CheckListStudent = 1;
                return;
            }
        }

        else if (status_name.trim() == "--lựa chọn--") {
            swal("Thông báo", "(bạn phải chọn trạng thái của học sinh (" + Student_name + "))", "error");
            CheckListStudent = 1;
            return;
        }


        ListStudentClass.push({ STUDENT_ID: Student_Id, STR_START_DATE: StartDate, STR_END_DATE: EndDate, FEE: fees, NOTE: Node, STUDENT_NAME: Student_name, PARENT_NAME: Parent_name, PHONE: Phone, STATUS: Status });
        return;

    });
    //return JSON.stringify(ListStudentClass); 
    if (CheckListStudent == 0) {
        $.ajax({
            url: "/Class/LoadUpdateListStudentClass",
            type: "POST",
            data: { ListStudentClass: JSON.stringify(ListStudentClass) },
            success: function (result) {
                checkLoadStudent = result;
            }
        })
    }

}

// Phan Đình kiên : cập nhập danh lại lớp học 
function EditClass(ID) {
    UpdateListStudentClass();
    if (CheckListStudent == 0) {
        $('#modalLoad').modal("show");
        setTimeout(() => {

            var edit_class_name = $("#txt_edit_name_class").val();
            var edit_day_per_week = $("#txt_edit_day_per_week_class").val();
            var edit_start_date = $("#txt_edit_start_date_class").val();
            var edit_end_date = $("#txt_edit_end_date_class").val();
            var edit_branch_id = $("#txt_edit_branch_class").val();
            var edit_teacher_id = $("#txt_edit_teacher_main_parent").val();

            if (edit_class_name.trim() == "") {
                swal("Thông báo", "bạn cần phải nhập tên của lớp học", "error");
                $('#modalLoad').modal("hide");
                return;
            }
            else if (edit_class_name.trim() != "" && edit_class_name.length == 200) {

                swal("Thông báo", "Tên của lớp học có chiều dài vượt quá kích thước quy định", "error");
                $('#modalLoad').modal("hide");
                return;

            }


            else if (edit_start_date == "") {
                swal("Thông báo", "bạn cần phải nhập ngày bắt đầu của lớp học", "error");
                $('#modalLoad').modal("hide");
                return;
            }


            else if (edit_branch_id == 0) {
                swal("Thông báo", "bạn cần chọn cơ sở cho lớp học", "error");
                $('#modalLoad').modal("hide");
                return;
            }

            else if (edit_teacher_id == 0) {
                swal("Thông báo", "Bạn cần chọn giáo viên chủ nhiệm cho lớp học", "error");
                $('#modalLoad').modal("hide");
                return;
            }
            else {
                $.ajax({
                    url: "/Class/Edit",
                    data: $("#Form_edit_Class").serialize(),
                    success: function (result) {
                        if (result.Status == 1) {
                            swal("Thông Báo!", result.Message, "success");
                            setTimeout(function () {
                                window.location = "/Class/index";
                            }, 1000);
                        }
                        else if (result.Status == -1) {
                            swal("Thông báo", result.Message, "error");
                        }
                        $('#modalLoad').modal("hide");
                    }
                });
            }

        }, 2000);

    }


}

// Phan Đình Kiên : Điều hướng sang trang cập nhập thông tin 
function UpdateClass(Id) {
    window.location = '/class/update?id=' + Id;
    GetClassUpdate(Id)
}

// Phan Đình Kiên : Xóa thông tin của lớp học 
var idDeleteClass = null;
function ShowDeleteClass(Id) {
    idDeleteClass = Id;
    $("#Modal_Del_Class").show();
}

// Phan Đình Kiên : Xóa thông tin lớp học 
function DelClass() {
    $.ajax({
        url: "/Class/Delete",
        data: { ID: idDeleteClass },
        success: function (result) {
            if (result == 1) {
                swal("Thông Báo!", "Xóa thành công lớp học", "success");
                $("#Modal_Del_Class").hide();
                SeachClass();
            }
            else if (result == -2) {
                swal("Thông báo", "Bạn không có quyền xóa lớp học", "error");
                $("#Modal_Del_Class").hide();
            }
            else if (result == -4) {
                swal("Thông báo", "không dược xóa lớp học khi đang có dữ liệu", "error");
                $("#Modal_Del_Class").hide();
            }

            else if (result == -3) {
                swal("Thông báo", "Lớp học chỉ được phép xóa sau khi kết thúc sau 3 tháng", "error");
                $("#Modal_Del_Class").hide();
            }

            else if (result == -4) {
                swal("Thông báo", "Lớp học chỉ được phép xóa sau khi kết thúc sau 3 tháng", "error");
                $("#Modal_Del_Class").hide();
            }
            else {
                swal("Thông báo", "Xóa không thành công lớp học", "error");
                $("#Modal_Del_Class").hide();
            }
        }
    });
}

// Phan Đình Kiên : Tìm Kiếm thông tin lớp học 
function SeachClass() {
    $.ajax({
        url: "/Class/Seach",
        data: {
            Page: 1,
            Count: $("#txt_count_list_class").val(),
            NAME: $("#txt_seach_name_class").val(),
            BRANCH_ID: $("#cb_seach_branch_class").val(),
            STATUS: $("#cb_seach_sattus_class").val(),
            STR_START_DATE: $("#txt_seach_create_class").val(),
            TUTOR_CLASS: $("#cb_seach_tutor_class").val(),
            TEACHER_NAME: $("#txt_seach_name_Teacher_class").val(),
            STR_START_TIME: $("#txt_seach_start_time_class").val(),
            STR_END_TIME: $("#txt_seach_end_time_Teacher_class").val(),
        },
        success: function (result) {
            $("#Table_Class").html(result);
        }
    });
}

// Phan Đình Kiên : Cập nhập lại số thứ tự trong bảng học viên của lớp học (Edit)
function UpdateSttEditStudentClass() {
    var i = 0;
    $("#edit_data_table_class_student tr").each(function () {
        i++;
        $(this).find('td:nth-child(1)').text(i);
    });
}

// phan đình kiên : Cập nhập lại số thứ tự trong bảng học viên của lớp học (Add)
function UpdateSttAddStudentClass() {
    var i = 0;
    $("#data_table_class_student tr").each(function () {
        i++;
        $(this).find('td:nth-child(1)').text(i);
    });
}


//Phan Đinh Kiên : lấy danh sách cơ sở hiển thị lên select 
function LoadSelectClass() {

    $.ajax({
        url: "/Class/GetSelectClass",
        success: function (result) {
            $.each(result, function (i, result) {
                $('.Select_Class').append($('<option>', {
                    value: result.CLASS_ID,
                    text: result.CLASS_NAME
                }));

            });
        }
    });
}


//-------------------------------------------------------------------------- Thông tin cơ sở ----------------------------------------------------
// Phan Đình Kiên : get Select Thông tin cơ sở


// Phan Đình Kiên : Tìm kiếm thông tin cơ sở
function SeachBranch() {
    var cmb = $("#cmb_seach_Name_Branch").val();
    $.ajax({
        url: "/Branch/Seach",
        data: {
            Page: 1,
            Name: $("#cmb_seach_Name_Branch").val(),

        },
        success: function (result) {
            $("#Table_Branch").html(result);


        }
    });
}
function SeachBranch1() {

    $.ajax({
        url: "/Branch/Seach",
        data: {
            Page: 1,
            Name: $("#cmb_seach_Name_Branch").val(),
        },
        success: function (result) {
            $("#Table_Branch").html(result);
        }
    });
}

//Phan Đinh Kiên : thêm mới thông tin cơ sở
function AddBranch() {
    var txtAddPhone = $("#txtAddPhone").val();


    $.ajax({
        url: "/Branch/Add",
        data: $("#FormAdd_Branch").serialize(),
        success: function (result) {
            if (result == 1) {
                $("#Modal_Add_Branch").hide();
                $(".modal-backdrop").hide();
                swal("Thông Báo!", "Thêm mới thành công", "success");
                $("#txtAddName").val("");
                $("#txtAddADDRESS").val("");
                $("#txtAddPhone").val("");
            }
            else if (result == -3) {
                $("#Modal_Add_Branch").hide();
                $(".modal-backdrop").hide();

                swal("Thông báo", "(Cơ sở đã tồn tại)", "error");
            } else if (result == -4) {
                $("#Modal_Add_Branch").hide();
                $(".modal-backdrop").hide();
                swal("Thông báo", "(Số điện thoại đã tồn tại )", "error");
            }
            else if (result == 0) {
                $("#Modal_Add_Branch").hide();
                $(".modal-backdrop").hide();
                swal("Thông báo", "(Thêm mới không thành công)", "error");
            }
            else if (result == -5) {
                $("#Modal_Add_Branch").hide();
                $(".modal-backdrop").hide();
                swal("Thông báo", "(Địa chỉ không được để trống)", "error");
            }
            else if (result == -6) {
                $("#Modal_Add_Branch").hide();
                $(".modal-backdrop").hide();
                swal("Thông báo", "(Tên Cơ Sở không được để trống)", "error");
            }
            else if (result == -7) {
                $("#Modal_Add_Branch").hide();
                $(".modal-backdrop").hide();
                swal("Thông báo", "(Số điện thoại không được để trống)", "error");
            }
            SeachBranch1();
        }
    });
}





//Phan Đình Kiên : Cập nhập thông tin cơ sở 
function EditBranch() {
    $.ajax({
        url: "/Branch/Edit",
        data: $("#Form_EditBranch").serialize(),
        success: function (result) {
            if (result == 1) {
                $("#Modal_Edit_Branch").hide();
                $(".modal-backdrop").hide();
                swal("Thông Báo!", "Cập nhập thành công", "success");

            }
            else if (result == -3) {
                $("#Modal_Edit_Branch").hide();
                $(".modal-backdrop").hide();
                swal("Thông báo", "(Tên cơ sở đã tồn tại)", "error");
            }
            else if (result == 0) {
                $("#Modal_Edit_Branch").hide();
                $(".modal-backdrop").hide();
                swal("Thông báo", "(Cập nhập cơ sở không thành công)", "error");
            }
            else if (result == -4) {
                $("#Modal_Edit_Branch").hide();
                $(".modal-backdrop").hide();
                swal("Thông báo", "(Số điện thoại đã tồn tại)", "error");
            }
            SeachBranch1();

        }
    });
}


//Phan Đình Kiên : lấy thông tin cơ sở
function GetBranchById(ID) {
    $.ajax({
        url: "/Branch/GetById",
        data: { ID: ID },
        success: function (result) {
            $("#txtEditIdBranch").val(result.ID);
            $("#txtEditName").val(result.NAME);
            $("#txtEditAddress").val(result.ADDRESS);
            $("#txtEditPhone").val(result.PHONE);
            $("#Modal_Edit_Branch").show();
        }
    });
}



// Phan Đình Kiên : Xóa thông tin cơ sở 
var IDDeleteBranch = 0;
function ShowFormDeleteBranch(ID) {
    IDDeleteBranch = ID;
    $("#Modal_Del_Branch").show();
}

// Phan Đình Kiên : xóa thông tin của cơ sở 
function DelBranch() {
    $.ajax({
        url: "/Branch/Delete",
        data: { ID: IDDeleteBranch },
        success: function (result) {
            if (result == 1) {
                $("#Modal_Del_Branch").hide();
                swal("Thông Báo!", "Xóa thành công cơ sở", "success");
            }
            else if (result == 0) {
                $("#Modal_Del_Branch").hide();
                swal("Thông báo", "(Xóa không thành công cớ sở)", "error");
            }
            else if (result == -1) {
                $("#Modal_Del_Branch").hide();
                swal("Thông báo", "(bạn không có quyền xóa cơ sở)", "error");
            }
            else if (result == -3) {
                $("#Modal_Del_Branch").hide();
                swal("Thông báo", "(Không được xóa khi cơ sở đã có dữ liệu )", "error");
            }
            SeachBranch1();
        }
    });
}

// phan đình kiên : cập nhập thông tin của cơ sở
function CloesEditBranch() {
    $("#Modal_Edit_Branch").hide();
}

// phan đình kiên : xóa thông tin của cơ sở
function CloseDeleteBranch() {
    $("#Modal_Del_Branch").hide();
}

//Phan Đinh Kiên : lấy danh sách cơ sở hiển thị lên select 
function LoadSelectBranch() {

    $.ajax({
        url: "/Branch/GetAll",
        success: function (result) {
            $.each(result, function (i, result) {
                $('.Select_branch').append($('<option>', {
                    value: result.ID,
                    text: result.NAME
                }));

            });
        }
    });
}

function LoadSelectClass() {

    $.ajax({
        url: "/Class/GetSelect",
        success: function (result) {
            $.each(result, function (i, result) {
                $('.Select_Class').append($('<option>', {
                    value: result.ID,
                    text: result.NAME
                }));

            });
        }
    });
}

// Phan Đình Kiên : load Thông tin của cở sở
$(document).ready(function () {

    LoadSelectBranch();
    //LoadSelectClass();
});


//-------------------------------------------------------------------------- Thoogn tin tin nhắn của phụ huynh ----------------------------------
function OpenReplyMesssenger() {
    window.location = "/Messenger/SentMessenger";
}

//-------------------------------------------------------------------------- Thông tin giáo viên -------------------------------------------------


// phan đình kiên : thêm mới thông tin giáo viên
function AddTeacher() {
    var txt_add_name_teacher = $("#txt_add_name_teacher").val();
    var txt_add_bitthdaty_teacher = $("#txt_add_birthday_teacher").val();
    var txt_add_mail_teacher = $("#txt_add_email_teacher").val();
    var txt_add_address_teaher = $("#txt_add_address_teacher").val();
    var txt_add_personid_teacher = $("#txt_add_personid_teacher").val();
    var txt_add_home_address_teacher = $("#txt_add_home_address_teacher").val();
    var txt_add_phone_teacher = $("#txt_add_phone_teacher").val();
    var txt_add_password_teacher = $("#txt_add_password_teacher").val();
    var txt_seach_subject_id_teacher = $("#txt_add_subject_id_teacher").val();
    var txt_seach_subject_name_teacher = $("#txt_add_subject_id_teacher option:selected").text();
    var txt_seach_sattus_name_teacher = $("#txt_add_sattus_teacher option:selected").text();
    var txt_add_exp_node_teacher = $("#txt_add_exp_node_teacher").val();
    var txt_add_date_contact_teacher = $("#txt_add_date_contact_teacher").val();
    var txt_add_date_trial_teacher = $("#txt_add_date_trial_teacher").val();
    var txt_add_node_teacher_teacher = $("#txt_add_node_teacher_teacher").val();

    setTimeout(function () {
        if (txt_add_mail_teacher != undefined && (!validateEmail(txt_add_mail_teacher))) {
            swal("Thông báo", "(Địa chỉ mail của giáo viên không hợp lệ)", "error");
            return;
        }
        else {
            $.ajax({
                url: "/Teacher/Add",
                data: $("#Form_Add_Teacher").serialize(),
                success: function (result) {
                    if (result.Status == 1) {
                        $("#Modal_Add_Teacher").hide();
                        swal("Thông Báo!", result.Message, "success");
                        setTimeout(function () {
                            window.location = "/teacher/index";
                        }, 1000);
                    }
                    else if (result.Status == -1) {
                        swal("Thông báo", result.Message, "error");
                    }
                    SeachTeacher();
                }
            });
        }

    }, 0);

}


// Xuất Execl của giáo viên 
function ExprotTeacher() {

    var NAME = $("#txt_seach_name_teacher").val();
    var PHONE = $("#txt_seach_phone_teacher").val();
    var STATUS = $("#cb_seach_sattus_teacher").val();
    var SUBJECT_ID = $("#cb_seach_subject_teacher").val();
    var DATE_CONTRACT = $("#txt_seach_create_teacher").val();
    var DATE_TRIAL = $("#txt_seach_create_end_teacher").val();
    var BRANCH_ID = $("#cb_seach_branch_teacher").val();

    setTimeout(function () {
        window.location = "/Teacher/ExportBill?NAME=" + NAME + "&PHONE=" + PHONE + "&STATUS=" + STATUS + "&SUBJECT_ID=" + SUBJECT_ID + "&DATE_CONTRACT=" + DATE_CONTRACT + "&DATE_TRIAL=" + DATE_TRIAL + "&BRANCH_ID=" + BRANCH_ID;
    }, 100);
}


function ExprotFee() {
    var STUDENT_NAME = $("#txt_student_name_in_seach_fee").val();
    var IS_NOTIFIED = $("#txt_is_notifider_in_seach_fee").val();
    var STATUS = $("#txt_status_in_seach_fee").val();
    var TIME_FEE = $("#txt_date_time_in_seach_fee").val();
    var BRANCH_ID = $("#txt_branch_in_seach_fee").val();
    var START_TIME = $("#txt_startime_in_seach_fee").val();
    var END_TIME = $("#txt_endtime_in_seach_fee").val();
    setTimeout(function () {
        window.location = "/Fee/ExportBill?STUDENT_NAME=" + STUDENT_NAME + "&STATUS=" + STATUS + "&IS_NOTIFIED=" + IS_NOTIFIED + "&TIME_FEE=" + TIME_FEE + "&BRANCH_ID=" + BRANCH_ID + "&START_TIME=" + START_TIME + "&END_TIME=" + END_TIME;
    }, 100);
    // string STUDENT_NAME, byte? STATUS , byte? IS_NOTIFIED, DateTime? TIME_FEE
}



// Phan Đình Kiên : cập nhập thông tin của giáo viên 
function EditTeacher() {
    var txt_edit_name_teacher = $("#txt_edit_name_teacher").val();
    var txt_edit_bitthdaty_teacher = $("#txt_edit_birthday_teacher").val();
    var txt_edit_mail_teacher = $("#txt_edit_email_teacher").val();
    var txt_edit_address_teaher = $("#txt_edit_address_teacher").val();
    var txt_edit_personid_teacher = $("#txt_edit_personid_teacher").val();
    var txt_edit_home_address_teacher = $("#txt_edit_home_address_teacher").val();
    var txt_edit_phone_teacher = $("#txt_edit_phone_teacher").val();
    var txt_edit_password_teacher = $("#txt_edit_password_teacher").val();
    var txt_seach_subject_id_teacher = $("#txt_edit_subject_id_teacher").val();
    var txt_seach_subject_name_teacher = $("#txt_edit_subject_id_teacher option:selected").text();
    var txt_seach_sattus_name_teacher = $("#txt_edit_sattus_teacher option:selected").text();
    var txt_edit_exp_node_teacher = $("#txt_edit_exp_node_teacher").val();
    var txt_edit_date_contact_teacher = $("#txt_edit_date_contact_teacher").val();
    var txt_edit_date_trial_teacher = $("#txt_edit_date_trial_teacher").val();
    var txt_edit_node_teacher_teacher = $("#txt_edit_node_teacher_teacher").val();

    setTimeout(function () {
        if (txt_edit_name_teacher == "") {
            swal("Thông báo", "(Tên giáo viên không được để trống)", "error");
        }
        else if (txt_edit_bitthdaty_teacher == "") {
            swal("Thông báo", "(Ngày sinh cùa giáo viên không được để trống)", "error");
            return;
        }
        else if (!validateEmail(txt_edit_mail_teacher)) {
            swal("Thông báo", "(Địa chỉ mail của giáo viên không hợp lệ)", "error");
            return;
        }
        else if (txt_edit_address_teaher == "") {
            swal("Thông báo", "(Địa chỉ của giáo viên không được để trống)", "error");
            return;
        }
        else if (txt_edit_address_teaher == "") {
            swal("Thông báo", "(Địa chỉ của giáo viên không được để trống)", "error");
            return;
        }

        else if (txt_edit_phone_teacher == "") {
            swal("Thông báo", "(Số điên thoại của giáo viên không được để trống)", "error");
            return;
        }
        else if (txt_edit_password_teacher == "" || txt_edit_password_teacher < 8) {
            swal("Thông báo", "(độ dài của mật khẩu phải trên 8 ký tự)", "error");
            return;
        }
        else if (txt_seach_subject_name_teacher == "") {
            swal("Thông báo", "(Bạn phải chọn môn học cho giáo viên)", "error");
            return;
        }

        else if (txt_seach_sattus_name_teacher == "") {
            swal("Thông báo", "(bạn phải chọn trạng thái cho giáo viên)", "error");
            return;
        }




        else {
            $.ajax({
                url: "/Teacher/Edit",
                data: $("#Form_Edit_Teacher").serialize(),
                success: function (result) {
                    if (result.Status == 1) {
                        swal("Thông Báo!", result.Message, "success");
                        setTimeout(function () {

                            var seach_teacher_name = $("#seach_name_teacher_in_edit_teacher").val();
                            var seach_page = $("#seach_page_list_in_edit_teacher").val();
                            var seach_phone = $("#seach_phone_teacher_in_edit_teacher").val();
                            var seach_status = $("#seach_status_teacher_in_edit_teacher").val();
                            var seach_count = $("#seach_list_count_in_edit_teacher").val();
                            var seach_subject = $("#seach_subject_in_edit_teacher").val();
                            var seach_date_contract = $("#seach_date_contract_in_edit_teacher").val();
                            var seach_date_trial = $("#seach_date_trial_in_edit_teacher").val();
                            window.location = "/teacher/ListTeacher?Page=" + seach_page + "&&Count=" + seach_count + "&&NAME=" + seach_teacher_name + "&&PHONE=" + seach_phone + "&&STATUS=" + seach_status + "&&SUBJECT_ID=" + seach_subject + "&&DATE_CONTRACT=" + seach_date_contract + "&&DATE_TRIAL=" + seach_date_trial;

                        }, 1000);
                    }
                    else if (result.Status == -1) {
                        swal("Thông báo", result.Message, "error");
                    }


                }
            });
        }

    }, 0);

}

function ExitEditTeacher() {
    var seach_teacher_name = $("#seach_name_teacher_in_edit_teacher").val();
    var seach_page = $("#seach_page_list_in_edit_teacher").val();
    var seach_phone = $("#seach_phone_teacher_in_edit_teacher").val();
    var seach_status = $("#seach_status_teacher_in_edit_teacher").val();
    var seach_count = $("#seach_list_count_in_edit_teacher").val();
    var seach_subject = $("#seach_subject_in_edit_teacher").val();
    var seach_date_contract = $("#seach_date_contract_in_edit_teacher").val();
    var seach_date_trial = $("#seach_date_trial_in_edit_teacher").val();
    window.location = "/teacher/ListTeacher?Page=" + seach_page + "&&Count=" + seach_count + "&&NAME=" + seach_teacher_name + "&&PHONE=" + seach_phone + "&&STATUS=" + seach_status + "&&SUBJECT_ID=" + seach_subject + "&&DATE_CONTRACT=" + seach_date_contract + "&&DATE_TRIAL=" + seach_date_trial;
}

//Phan đình kiên : lấy thông tin giáo viên theo id
function GetTeacherById(ID) {
    $.ajax({
        url: "/Teacher/GetById",
        data: { ID: ID },
        success: function (result) {
            $("#txteditNameteacher").val(result.NAME);
            $("#txt_birthday_student").val(result.BIRTHDAY);
            $("#txteditteachersexmale").val(result.SEX);
            $("#txteditteachersexfemale").val(result.SEX);
            $("#txteditemailteacher").val(result.EMAIL);
            $("#txteditaddressteacher").val(result.ADDRESS);
            $("#txtedithomeaddressteacher").val(result.HOME_ADDRESS);
            $("#txteditphoneteacher").val(result.PHONE);
            $("#txteditpersonidteacher").val(result.PERSONID_CODE);
            $("#cbeditsubjectteacher").val(result.SUBJECT_ID);
            $("#cbeditsattusteacher").val(result.STATUS);
            $("#datetimepicker2").val(result.DATE_CONTRACT);
            $("#datetimepicker2").val(result.DATE_TRIAL);
            $("#txteditEXPNOTEteacher").val(result.EXP_NOTE);
            $("#Modal_Edit_Teacher").show();
        }
    });
}

// Phan Đình Kiên : Sự kiện chọn giáo viên chính cho lớp học 
function TeacherChangedAddClass(obj) {
    $("#Add_teacher_Class option").removeAttr('selected');
    $("#Add_teacher_Class option[value='" + obj.value + "']").attr('selected', 'selected');
}

//Phan Đinh Kiên : lấy danh sách giáo viên hiển thị lên select
function LoadSelectTeacher() {
    $.ajax({
        url: "/Teacher/GetSelect",
        success: function (result) {
            $.each(result, function (i, result) {
                $('.Select_Teacher').append($('<option>', {
                    value: result.ID,
                    text: result.NAME
                }));
            });
        }
    });
}


function ShowDeleteTeacher() {
    var myArray = "";
    $('#ListTeacher input[type=checkbox]').each(function () {
        if (this.checked) {
            myArray = myArray + $(this).val() + ":";
        }
    });

    if (myArray == "") {
        swal("Thông báo", "(Bạn cần chọn giáo viên cần xóa)", "error");
    }
    else {

        $("#txt_id_teacher").val(myArray);
        $("#Modal_Del_List_Teacher").show();
    }
}

// Phan Đình kiên : xóa nhiều giáo viên cùng một lúc 
function DeleteListTeacher() {

    $.ajax({
        url: "/Teacher/DeleteList",
        data: {
            ListID: $("#txt_id_teacher").val()
        },
        success: function (result) {
            if (result.Status == 1) {

                $("#Modal_Del_Teacher").hide();
                swal("Thông Báo!", result.Message, "success");
                var txt_count_list_teacher = $("#txt_count_list_teacher").val();
                var txt_page_list_teacher = $("#txt_page_list_teacher").val();
                if (txt_count_list_teacher != "" && txt_page_list_teacher != "") {
                    $.ajax({
                        url: "/Teacher/Seach",
                        data: {
                            Page: txt_page_list_teacher,
                            Count: txt_count_list_teacher,
                            NAME: $("#txt_seach_name_teacher").val(),
                            PHONE: $("#txt_seach_phone_teacher").val(),
                            STATUS: $("#cb_seach_sattus_teacher").val(),
                            SUBJECT_ID: $("#cb_seach_subject_teacher").val(),
                            DATE_CONTRACT: $("#txt_seach_create_teacher").val(),
                            DATE_TRIAL: $("#txt_seach_create_end_teacher").val(),
                            BRANCH_ID: $("#cb_seach_branch_teacher").val(),
                        },
                        success: function (result) {
                            $("#Table_Teacher").html(result);
                            LoadCheckBoxTeacher();
                            $("#Modal_Del_List_Teacher").hide();
                        }
                    });
                }
            }
            else if (result.Status == -4) {

                swal("Thông báo", "(" + result.Message + ")");

                var txt_count_list_teacher = $("#txt_count_list_teacher").val();
                var txt_page_list_teacher = $("#txt_page_list_teacher").val();
                if (txt_count_list_teacher != "" && txt_page_list_teacher != "") {
                    $.ajax({
                        url: "/Teacher/Seach",
                        data: {
                            Page: txt_page_list_teacher,
                            Count: txt_count_list_teacher,
                            NAME: $("#txt_seach_name_teacher").val(),
                            PHONE: $("#txt_seach_phone_teacher").val(),
                            STATUS: $("#cb_seach_sattus_teacher").val(),
                            SUBJECT_ID: $("#cb_seach_subject_teacher").val(),
                            DATE_CONTRACT: $("#txt_seach_create_teacher").val(),
                            DATE_TRIAL: $("#txt_seach_create_end_teacher").val(),
                            BRANCH_ID: $("#cb_seach_branch_teacher").val(),
                        },
                        success: function (result) {
                            $("#Table_Teacher").html(result);
                            LoadCheckBoxTeacher();
                            $("#Modal_Del_List_Teacher").hide();
                        }
                    });
                }

            }
            else {
                swal("Thông báo", "(" + result.Message + ")", "error");
                $("#Modal_Del_List_Teacher").hide();
            }
        }
    });
}

// Phan Đình Kiên : Tìm kiếm thông tin giáo viên 
function SeachTeacher() {
    var txt_count_list_teacher = $("#txt_count_list_teacher").val();
    var txt_page_list_teacher = $("#txt_page_list_teacher").val();

    if (txt_count_list_teacher == "") {
        txt_count_list_teacher = 10;
    }
    if (txt_page_list_teacher == "") {
        txt_page_list_teacher = 1;
    }

    if (txt_count_list_teacher != "" && txt_page_list_teacher != "") {
        $.ajax({
            url: "/Teacher/Seach",
            data: {
                Page: 1,
                Count: $("#txt_count_list_teacher").val(),
                NAME: $("#txt_seach_name_teacher").val(),
                PHONE: $("#txt_seach_phone_teacher").val(),
                STATUS: $("#cb_seach_sattus_teacher").val(),
                SUBJECT_ID: $("#cb_seach_subject_teacher").val(),
                DATE_CONTRACT: $("#txt_seach_create_teacher").val(),
                DATE_TRIAL: $("#txt_seach_create_end_teacher").val(),
                BRANCH_ID: $("#cb_seach_branch_teacher").val(),
            },
            success: function (result) {
                $("#Table_Teacher").html(result);
                LoadCheckBoxTeacher();
            }
        });
    }
}

// Phan Đình Kiên : Load danh sách check box 
function LoadCheckBoxTeacher() {
    // Phan Đình Kiên : load Checbox Teacher 
    $("#CheckBooTeacherkAll").click(function () {
        if ($(this).is(":checked")) {
            $(".TeacherCheckbox").prop('checked', true);
        }
        else {
            $(".TeacherCheckbox").prop('checked', false);
        }
    });
}

function SeachConfigtime() {
    var txt_count_list_configtime = $("#txt_count_list_configtime").val();
    var txt_page_list_configtime = $("#txt_page_list_configtime").val();

    if (txt_count_list_configtime == "") {
        txt_count_list_configtime = 10;
    }
    if (txt_page_list_configtime == "") {
        txt_page_list_configtime = 1;
    }

    if (txt_count_list_configtime != "" && txt_page_list_configtime != "") {
        $.ajax({
            url: "/ConfigTime/Seach",
            data: {
                Page: 1,
                Count: $("#txt_count_list_configtime").val(),
                Name: $("#txt_search_name_configtime").val(),
                StartDate: $("#txt_search_start_date_configtime").val(),
                Endate: $("#txt_search_end_date_configtime").val(),

            },
            success: function (result) {
                $("#Table_ConfigTime").html(result);

            }
        });
    }
}



$(document).ready(function () {


    $("#txt_count_list_configtime").change(function () {

        $.ajax({
            url: "/ConfigTime/Seach",
            data: {
                Page: 1,
                Count: $("#txt_count_list_configtime").val(),
                Name: $("#txt_search_name_configtime").val(),
                StartDate: $("#txt_search_start_date_configtime").val(),
                Endate: $("#txt_search_end_date_configtime").val(),
            },
            success: function (result) {
                $("#Table_ConfigTime").html(result);

            }
        });

    });
});


var IDDeleteTeacher;
function ShowFromDeleteTeacher(Id) {
    IDDeleteTeacher = Id;
    $("#Modal_Del_Teacher").show();
}

// Phan đình Kiên : Tiến hành xóa thông tin của học viên 
function DelTeacher() {
    $.ajax({
        url: "/Teacher/Delete",
        data: { ID: IDDeleteTeacher },
        success: function (result) {
            if (result == 1) {

                $("#Modal_Del_Teacher").hide();
                swal("Thông Báo!", "Xóa thành công giáo viên", "success");

                var txt_count_list_teacher = $("#txt_count_list_teacher").val();
                var txt_page_list_teacher = $("#txt_page_list_teacher").val();
                // Tiến hành load lại trang 
                if (txt_count_list_teacher != "" && txt_page_list_teacher != "") {
                    $.ajax({
                        url: "/Teacher/Seach",
                        data: {
                            Page: txt_page_list_teacher,
                            Count: txt_count_list_teacher,
                            NAME: $("#txt_seach_name_teacher").val(),
                            PHONE: $("#txt_seach_phone_teacher").val(),
                            STATUS: $("#cb_seach_sattus_teacher").val(),
                            SUBJECT_ID: $("#cb_seach_subject_teacher").val(),
                            DATE_CONTRACT: $("#txt_seach_create_teacher").val(),
                            DATE_TRIAL: $("#txt_seach_create_end_teacher").val(),
                            BRANCH_ID: $("#cb_seach_branch_teacher").val(),
                        },
                        success: function (result) {
                            $("#Table_Teacher").html(result);
                            LoadCheckBoxTeacher();
                        }
                    });
                }

            }
            else if (result == 0) {
                swal("Thông báo", "(Xóa không thành công giáo viên)", "error");
                return;
            }
            else if (result == -1) {
                swal("Thông báo", "(Bạn không có quyền xóa giáo viên)", "error");
                return;
            }

            else if (result == -4) {
                swal("Thông báo", "không được phép xóa thông tin giáo viên khi đã được xếp lớp", "error");
                return;
            }
            $("#Modal_Del_Teacher").hide();
        }
    });
}

// Phan Đình Kiên : onload thông tin giáo viên 
$(document).ready(function () {

    // Phan Đình Kiên : bắt sự kiện chọn giáo viên 
    $("#txt_count_list_teacher").change(function () {

        $.ajax({
            url: "/Teacher/Seach",
            data: {
                Page: 1,
                Count: $("#txt_count_list_teacher").val(),
                NAME: $("#txt_seach_name_teacher").val(),
                PHONE: $("#txt_seach_phone_teacher").val(),
                STATUS: $("#cb_seach_sattus_teacher").val(),
                SUBJECT_ID: $("#cb_seach_subject_teacher").val(),
                DATE_CONTRACT: $("#txt_seach_create_teacher").val(),
                DATE_TRIAL: $("#txt_seach_create_end_teacher").val(),
                BRANCH_ID: $("#cb_seach_branch_teacher").val(),
            },
            success: function (result) {
                $("#Table_Teacher").html(result);
                LoadCheckBoxTeacher();
            }
        });

    });
    LoadCheckBoxTeacher();
    LoadSelectTeacher();
    LoadSelectSalaryLevel();

    $("#txt_add_end_date_class_teacher").datepicker();
    $(".datepicker_teacher").datepicker()({
        dateFormat: "dd-mm-yy"
    });;



});

//-------------------------------------------------------------------------- Thông tin phòng học ------------------------------------------------

// Phan Đình Kiên : lấy thông tin phong học 
function LoadSelectRoomByBranch(obj) {
    if (obj.value == '--lựa chọn--') {
        $('.Select_room').empty();
        $('.Select_room').append('<option>--lựa chọn--</option>');
    }
    else {
        $.ajax({
            url: "/Room/GetSelectByBranch",
            data: { BranchId: obj.value },
            success: function (result) {

                $('.Select_room').empty();


                $.each(result, function (i, result) {
                    //$(".option_room").remove(); 

                    $('.Select_room').append($('<option>', {
                        value: result.ID,
                        text: result.NAME
                    }));
                });

            }

        });
    }

}

// Phan Đình Kiên : load Thông tin phòng học 
$(document).ready(function () {

    $(".time-picker").hunterTimePicker();
    $("#txt_add_time_start_schedule").hunterTimePicker();
    $(".datetimepicker").datepicker();
});

//-------------------------------------------------------------------------- Thông tin giáo viên trong lớp học -----------------------------------
// Phan Đình Kiên : Thêm mới thông tin của giáo viên 
function GetTeacherClass(ID) {
    $.ajax({
        url: "/Class/GetTeacherClass",
        data: { ID: ID },
        success: function (result) {
            $("#data_tbody_class_teacher_edit").html(result);
        }
    })
}

// Phan Đình Kiên : Thêm mới thông tin của giáo viên trong lớp học 
function AddTeacherClass() {
    var class_id = $("#txt_edit_Id_class").val();
    var teacher_id = $("#txt_edit_teacher_in_edit_class").val();
    var teacher_Name = $("#txt_edit_teacher_in_edit_class option:selected").text();
    var start_date = $("#txt_edit_start_date_class_teacher").val();
    var salary_level = $("#txt_edit_salary_level_in_edit_class").val();
    var salary_name = $("#txt_edit_salary_level_in_edit_class option:selected").text();

    if (teacher_Name.trim() == "--lựa chọn--") {
        // thông báo phải chọn tên giáo viên 
        swal("Thông báo", "(Bạn phải chọn giáo viên giảng dạy)", "error");
    }
    else if (salary_name.trim() == "--lựa chọn--") {
        // thông báo phải chọn bậc lương cho giáo viên 
        swal("Thông báo", "(Bạn phải chọn bậc lương cho giáo viên)", "error");
    }
    else if (start_date == "") {
        // thông báo ngày dạy học không hợp lệ 
        swal("Thông báo", "(Thời gian dạy học của giáo viên không hợp lệ)", "error");
    }
    else {
        $.ajax({
            url: "/Class/UpdateTeacherClass",
            data: { TEACHER_ID: teacher_id, SALARY_LEVEL_ID: salary_level, START_DATE: start_date, CLASS_ID: class_id },
            success: function (result) {
                if (result == 1) {
                    GetTeacherClass(class_id);
                } else if (result == -1) {
                    swal("Thông báo", "(Hiện tại đang có giáo viên khác đứng lớp)", "error");
                }
                else if (result == 0) {
                    swal("Thông báo", "(Thêm mới giáo viên không thành công)", "error");
                }
                else {
                    swal("Thông báo", result, "error");

                }
            }
        })
    }



}
// 
function CloseTeacherClass() {
    $("#Modal_Del_teacher").hide();
}
// hiển thị trang thông báo xóa danh sách giáo viên 
function ShowTeacherClass(Id) {
    $("#txt_id_delete_teacher_class").val(Id);
    $("#Modal_Del_teacher").show();
}

// Phan Đinh Kiên : xóa thông tin giáo viên trong lớp học 
function DeleteTeacherClass() {
    $.ajax({
        url: "/TeacherClass/Delete",
        data: { ID: $("#txt_id_delete_teacher_class").val() },
        success: function (result) {
            if (result == 1) {
                var class_id = $("#txt_edit_Id_class").val();
                GetTeacherClass(class_id);
                swal("Thông báo", "(Xóa thông tin giáo viên trong lớp học thành công)", "success");
            }
            else if (result == -2) {
                swal("Thông báo", "(Không được xóa giáo viên khi đã có thông tin điểm danh)", "error");
            }
            else {
                swal("Thông báo", "(xóa thông tin không thành công)", "error");
            }
            CloseTeacherClass();
        }
    })
}




//-------------------------------------------------------------------------- Thông tin lịch học --------------------------------------------------

// Phan Đình Kiên : Hiển thị danh sách lịch học 
function GetScheduleClass(ID) {
    $.ajax({
        url: "/Class/GetScheduleClass",
        data: { ID: ID },
        success: function (result) {
            $("#edit_data_table_tbody_class_schedule").html(result);
        }
    })
}

// Phan Đình kiên : Thêm mới danh sách Lịch học 
function AddScheduleClass() {
    var class_id = $("#txt_edit_Id_class").val();
    var start_time = $('#txt_edit_time_start_schedule').val();
    var end_time = $('#txt_edit_time_end_schedule').val();
    var day_id = $("#txt_edit_day_in_edit_class_schedule").val();
    var day_name = $("#txt_edit_day_in_edit_class_schedule option:selected").text();
    var room_id = $("#txt_edit_room_in_edit_class_schedule").val();
    var room_Name = $("#txt_edit_room_in_edit_class_schedule option:selected").text();

    var week_class = $("#txt_edit_day_per_week_class").val();
    var rowCount = $('#edit_data_table_tbody_class_schedule tr').length;

    if (day_name.trim() == "--lựa chọn--") {
        // thông báo phải chọn tên giáo viên 
        swal("Thông báo", "(bạn phải chọn ngày học của lớp học )", "error");
    }
    else if (room_Name.trim() == "--lựa chọn--") {
        // thông báo phải chọn bậc lương cho giáo viên 
        swal("Thông báo", "(Bạn phải chọn phòng học của lớp học)", "error");
    }
    else if (start_time >= end_time) {
        // thông báo ngày dạy học không hợp lệ 
        swal("Thông báo", "(Thời gian học không hợp lệ)", "error");
    }
    else if (week_class <= rowCount) {
        swal("Thông báo", "(số buổi học trên tuần vượt quá quy định)", "error");
        123456
    }
    else if (week_class == "") {
        swal("Thông báo", "(Bạn cần phải chọn số buổi học trên tuần cho lớp học)", "error");
    }
    else {
        $.ajax({
            url: "/Class/EpdateSchedule",
            data: { ROOM_ID: room_id, DAY: day_id, START_TIME: start_time, END_TIME: end_time, CLASS_ID: class_id },
            success: function (result) {
                if (result == 1) {
                    GetScheduleClass(class_id);
                }
                else if (result == -1) {
                    swal("Thông báo", "(thời gian học bị trùng lặp)", "error");
                }
                else if (result == -2) {
                    swal("Thông báo", "(Phòng học đã có lớp khác sử dụng)", "error");
                }
                else if (result == 0) {
                    swal("Thông báo", "(Thêm mới lịch học không thành công)", "error");
                }
                else {
                    swal("Thông báo", result, "error");
                }
            }
        });
    }
}

function CloseScheduleClass() {
    $("#Modal_Del_Schedule").hide();
}
function ShowScheduleClass(Id) {
    $("#txt_id_delete_schedule_class").val(Id);
    $("#Modal_Del_Schedule").show();
}
// Phan Đình Kiên : Xóa thông tin lịch học 
function DeleteScheduleClass() {
    $.ajax({
        url: "/ScheduleClass/Delete",
        data: {
            ID: $("#txt_id_delete_schedule_class").val()
        },
        success: function (result) {
            if (result == 1) {
                var class_id = $("#txt_edit_Id_class").val();
                GetScheduleClass(class_id);
                CloseScheduleClass();
            }
            else {
                swal("Thông báo", "(xóa thông tin không thành công)", "error");
            }
            CloseScheduleClass();
        }

    })
}


// Phan đình kiên : reset pass cho học viên 
function ResetPassword_teacher() {
    $.ajax({
        url: "/Teacher/ResetPass",
        data: { ID: $("#txtEditIdTeacher").val() },
        success: function (result) {
            if (result == "0") {
                $("#Modal_EditPassTeacher").hide();
                swal("Thông báo", "(reset mật khẩu không thành công)", "error");
            }
            else if (result == '-1') {
                swal("Thông báo", "(Bạn không có quyền reset lại tài khoản)", "error");
            }
            else {
                swal("Thông Báo!", "Reset Thành công mật khẩu của giáo viên là : " + result, "success");
            }
            SeachUser();
            $("#Modal_EditPassTeacher").hide();
        }
    });
}


//-------------------------------------------------------------------------- Thông tin bậc lương giáo viên ----------------------------------------

//Phan Đinh Kiên : lấy danh sách bực lương đưa vào select 
function LoadSelectSalaryLevel() {
    $.ajax({
        url: "/SalaryLevel/GetSelect",
        success: function (result) {
            $.each(result, function (i, result) {
                $('.Select_SalaryLevel').append($('<option>', {
                    value: result.ID,
                    text: "Bậc " + result.LEVEL
                }));
            });
        }
    });
}




// Test Lương
// Nguyên Sang : Thêm thông tin bậc lương 
function AddSalaryLevel() {
    //<<<<<<< HEAD
    //    var data = $("#txtAddSalarys").val()
    //     var salary = cms_decode_currency_format(data); 
    //    $("#txtAddSalarys1").val(salary); 

    //    $.ajax({
    //        url: "/SalaryLevel/Add",
    //        data: $("#FormAdd_SalaryLevel").serialize(),
    //        success: function (result) {
    //            if (result == 1) {
    //                $("#Modal_Add_SalaryLevel").hide();
    //                $(".modal-backdrop").hide();
    //                swal("Thông Báo!", "Thêm mới thành công", "success");
    //                $("#txtAddMembersCount").val("");
    //                $("#txtAddLever").val("");
    //                $("#txtAddSalary").val("");
    //            }
    //=======
    var txtAddMembersCount = $('#txtAddMembersCount').val();
    var txtAddLever = $('#txtAddLever').val();
    var edit_fee_add_of_parent = $('#edit_fee_add_of_parent').val();



    if (txtAddMembersCount == "") {
        swal("Thông báo", "(Sĩ số không được để trống)", "error");
    } else if (txtAddLever == "") {

        swal("Thông báo", "(  Bậc Lương không được để trống)", "error");
    }
    else if (edit_fee_add_of_parent == "") {

        swal("Thông báo", "(Mức lương/Buổi không được để trống)", "error");
    }
    else if (edit_fee_add_of_parent == "NaN") {

        swal("Thông báo", "(Mức lương/Buổi không được nhập ký tự)", "error");
    }
    else {
        $.ajax({
            url: "/SalaryLevel/Add",
            data: $("#FormAdd_SalaryLevel").serialize(),
            success: function (result) {
                if (result == 1) {
                    $("#Modal_Add_SalaryLevel").hide();
                    $(".modal-backdrop").hide();
                    swal("Thông Báo!", "Thêm mới thành công", "success");
                    $("#txtAddMembersCount").val("");
                    $("#txtAddLever").val("");
                    $("#edit_fee_add_of_parent").val("");
                }

                else if (result == 0) {
                    swal("Thông báo", "(Thêm mới không thành công)", "error");

                }
                else if (result == -1) {
                    swal("Thông báo", "(Bạn không có quyền thêm mới thông tin bậc lương của giáo viên)", "error");
                }
                else if (result == -2) {
                    swal("Thông báo", "(Thêm không thành công  trùng bậc lương)", "error");
                }
                SeachSalaryLevel();

            }
        });
    }
}

// Sang : Cập nhập thông tin bậc lương 
function EditSalaryLevel() {
    var txtAddMembersCounts = $('#txtAddMembersCounts').val();
    var txtAddLevers = $('#txtAddLevers').val();
    var edit_txtAddSalarys = $('#edit_txtAddSalarys').val();


    if (txtAddMembersCounts == "") {
        swal("Thông báo", "(Sĩ số không được để trống)", "error");
    } else if (txtAddLevers == "") {

        swal("Thông báo", "(  Bậc Lương không được để trống)", "error");
    }
    else if (edit_txtAddSalarys == "") {

        swal("Thông báo", "(Mức lương/Buổi không được để trống)", "error");
    }
    else {
        $.ajax({
            url: "/SalaryLevel/Edit",
            data: $("#Form_EditSalaryLevel").serialize(),
            success: function (result) {
                if (result == 1) {
                    $("#Modal_Edit_SalaryLevel").hide();
                    swal("Thông Báo!", "Cập nhập thành công bậc lương ", "success");
                    SeachSalaryLevel();
                }
                else if (result == 0) {
                    swal("Thông báo", "(cập nhật không thành công)", "error");

                }
                else if (result == -1) {
                    swal("Thông báo", "(Bạn không có quyền cập nhật thông tin bậc lương của giáo viên)", "error");
                }
                else if (result == -2) {
                    swal("Thông báo", "(cập nhật không  công  trùng bậc lương)", "error");
                }

            }
        });
    }
}

// sang : lấy thông tin bâc lương theo id 
function GetSalaryLevelById(ID) {
    $.ajax({
        url: "/SalaryLevel/GetById",
        data: { ID: ID },
        success: function (result) {
            $("#txtEditIdSalaryLevels").val(result.ID);
            $("#txtAddMembersCounts").val(result.MEMBERS_COUNT);
            $("#txtAddLevers").val(result.LEVEL);
            $("#edit_txtAddSalarys").val(result.SALARY);
            $("#Modal_Edit_SalaryLevel").show();
        }
    });

}
var IDDeleteSalaryLevel = 0;

function ShowFromDeleteSalaryLeve(Id) {
    IDDeleteSalaryLevel = Id;
    $("#Modal_Del_SalaryLevel").show();
}
function DelSalaryLeve() {
    $.ajax({
        url: "/SalaryLevel/Delete",
        data: { Id: IDDeleteSalaryLevel },
        success: function (result) {
            if (result == 1) {
                $("#Modal_Del_SalaryLevel").hide();
                swal("Thông Báo!", "Xóa thành công thông tin bậc lương của giáo viên ", "success");
            }
            else if (result == 0) {
                swal("Thông báo", "(Xóa không thành công thông tin bậc lương của giáo viên)", "error");
            }
            else if (result == -1) {
                swal("Thông báo", "(Bạn không có quyền xóa thông tin bậc lương của giáo viên)", "error");
            }
            SeachSalaryLevel()();
        }
    });
}
function DeleteSubject() {
    $.ajax({
        url: "/Subject/Delete",
        data: { Id: IDDeleteonRoom },
        success: function (result) {
            if (result == 1) {
                $("#Modal_Del_Subject").hide();
                swal("Thông Báo!", "Xóa thành công môn học ", "success");
                var txt_count_list_Subject = $("#txt_count_list_Subject").val();
                var txt_page_list_Subject = $("#txt_page_list_Subject").val();
                if (txt_count_list_Subject != "" && txt_page_list_Subject != "") {
                    $.ajax({
                        url: "/Subject/Seach",
                        data: {
                            Page: txt_page_list_Subject,
                            Count: txt_count_list_Subject,
                            NAME: $("#txt_search_name_Subject").val(),

                            CODE_CENTER: $("#txt_search_name_Center").val(),
                            CREATE_DATE: $("#txt_search_create_date").val(),

                        },
                        success: function (result) {
                            $("#Table_Subject").html(result);

                        }
                    });
                }
            }
            else if (result == 0) {
                swal("Thông báo!", "(Xóa không thành công thông tin phòng học)", "error");
            }


        }
    });
}
function CloesEditSalaryLevel() {
    $("#Modal_Edit_SalaryLevel").hide();
}
function CloseDeleteSalaryLevel() {
    $("#Modal_Del_SalaryLevel").hide();
}
function SeachSalaryLevel() {
    $.ajax({
        url: "/SalaryLevel/Seach",
        data: {
            Page: 1
        },
        success: function (result) {
            $("#Table_SalaryLevel").html(result);
        }
    });
}


//-------------------------------------------------------------------------- thông tin của môn học ------------------------------------------------

// Phan Đình Kiên : hiển thị thông tin select 
function LoadSelectSubject() {
    $.ajax({
        url: "/Subject/GetSelect",
        success: function (result) {
            $.each(result, function (i, result) {
                $('.Select_subject').append($('<option>', {
                    value: result.ID,
                    text: result.NAME
                }));
            });
        }
    });
}

function ExitEditClass() {
    var page = $("#txt_seach_page_in_edit_class").val();
    var count = $("#txt_seach_count_in_edit_class").val();
    var name = $("#txt_seach_name_in_edit_class").val();
    var branch = $("#txt_seach_branch_in_edit_class").val();
    var startdate = $("#txt_seach_start_date_in_edit_class").val();
    var status = $("#txt_seach_status_in_edit_class").val();
    var teacher = $("#txt_seach_teacher_in_edit_class").val();
    var touor = $("#txt_seach_tutor_in_edit_class").val();
    var start_time = $("#txt_seach_start_time_edit_class").val();
    var end_time = $("#txt_seach_end_time_edit_class").val();
    if (page == "") {
        page = 1;
    }


    if (count == "") {
        count = 10;
    }

    window.location = "/Class/ListClass?Page=" + page + "&Count=" + count + "&NAME=" + name + "&TEACHER_NAME=" + teacher + "&BRANCH_ID=" + branch + "&STATUS=" + status + "&STR_START_DATE=" + startdate + "&TUTOR_CLASS=" + touor + "&STR_START_TIME=" + start_time + "&STR_END_TIME=" + end_time;
}


// Phan Đình Kiên : load Thông tin lớp học 
$(document).ready(function () {


    // Phan Đình Kiên : bắt sự kiện chọn giáo viên 
    $("#txt_count_list_class").change(function () {

        $.ajax({
            url: "/Class/Seach",
            data: {
                Page: $("#txt_page_class").val(),
                Count: $("#txt_count_list_class").val(),
                NAME: $("#txt_seach_name_class").val(),
                BRANCH_ID: $("#cb_seach_branch_class").val(),
                STATUS: $("#cb_seach_sattus_class").val(),
                STR_START_DATE: $("#txt_seach_create_class").val(),
                TUTOR_CLASS: $("#cb_seach_tutor_class").val(),
                TEACHER_NAME: $("#txt_seach_name_Teacher_class").val(),
                STR_START_TIME: $("#txt_seach_start_time_class").val(),
                STR_END_TIME: $("#txt_seach_end_time_Teacher_class").val(),
            },
            success: function (result) {
                $("#Table_Class").html(result);

            }
        });

    });

    LoadSelectSubject();

});


//---------------------------------------------------------thông tin cấu hình nghỉ hệ thống---------------------------------

//$(document).ready(function () {

//    $(".date_configtime").datepicker(); 
//});
$(".date_configtime").datepicker();

$(document).ready(function () {

    $(".date_configtime").datepicker();

});

//-------------------------------------------------------------------------- Thông tin điểm danh của lớp học ----------------------------------------

// Phan Đình Kiên : Tìm kiếm thông tin giáo viên 
function SeachAbsent() {
    var txt_count_list_absent = $("#txt_count_list_absent").val();
    var txt_page_list_absent = $("#txt_page_list_absent").val();

    if (txt_count_list_absent == "") {
        txt_count_list_absent = 10;
    }
    if (txt_page_list_absent == "") {
        txt_page_list_absent = 1;
    }
    $.ajax({
        url: "/Absent/Seach",
        data: {
            Page: 1,
            Count: txt_count_list_absent,
            BRANCH_ID: $("#txt_seach_barch_id_in_absent").val(),
            CLASS_ID: $("#txt_seach_class_name_in_absent").val(),
            END_DATE: $("#txt_seach_end_date_in_absent").val(),
            START_DATE: $("#txt_seach_start_date_in_absent").val(),
            STATUS: $("#txt_seach_status_in_absent").val(),
            TEACHER_NAME: $("#txt_seach_teacher_in_absent").val(),
        },
        success: function (result) {
            $("#Table_Absent").html(result);
        }
    });

}


function ExitEditAbsent() {
    var Page = $("#txt_seach_page_in_absent").val();;
    var Count = $("#txt_seach_count_in_absent").val();
    var BRANCH_ID = $("#txt_seach_barch_id_in_absent").val();
    var CLASS_ID = $("#txt_seach_class_name_in_absent").val();
    var END_DATE = $("#txt_seach_end_date_in_absent").val();
    var START_DATE = $("#txt_seach_start_date_in_absent").val();
    var STATUS = $("#txt_seach_status_in_absent").val();
    var TEACHER_NAME = $("#txt_seach_teacher_in_absent").val();
    window.location = "/Absent/ListAbsent?Page=" + Page + "&Count=" + Count + "&BRANCH_ID=" + BRANCH_ID + "&CLASS_ID=" + CLASS_ID + "&END_DATE=" + END_DATE + "&START_DATE=" + START_DATE + "&STATUS=" + STATUS + "&TEACHER_NAME=" + TEACHER_NAME;
}



var CheckListAbsentDetail;
function UpdateAbsentOfAddmin() {
    var ListAbsentDetaill = [];
    CheckListAbsentDetail = 0;
    $("#list_absent_detail tr").each(function () {

        // lấy thạng id của chi tiết điểm danh 
        var ID = $(this).find('td:nth-child(2) input').val();

        // lấy trạng thái điểm danh 
        var IdSelectStatus = "#txt_add__in_absent_of_add_min_" + ID + " option:selected";
        var Status = $(IdSelectStatus).val();
        ListAbsentDetaill.push({ ID: ID, STATUS: Status });
    });


    setTimeout(() => {
        $.ajax({
            url: "/Absent/EditAbsentOfAdmin",
            data: {
                ID: $("#txt_update_id_absent_by_absent").val(),
                NODE: $("#txt_update_status_in_absent_of_add_min").val(),
                ListAbsentDetail: JSON.stringify(ListAbsentDetaill)
            },
            success: function (result) {

                if (result == -1) {
                    swal("Thông báo", "(Bạn không có quyền cập nhập thông tin điểm danh)", "error");
                }
                else if (result == 1) {
                    swal("Thông Báo!", "Sửa thông tin điểm danh thành công", "success");

                    var txt_count_list_absent = $("#txtCountAbsentInUpdateofChecđAmin").val();
                    var txt_page_list_absent = $("#txtPageAbsentInUpdateOfChecđAmin").val();

                    if (txt_count_list_absent == "") {
                        txt_count_list_absent = 10;
                    }
                    if (txt_page_list_absent == "") {
                        txt_page_list_absent = 1;
                    }

                    setTimeout(function () {
                        ExitEditAbsent(); 
                    }, 500);


                }
                else if (result == 0) {
                    swal("Thông Báo!", "Sửa thông tin điểm danh không thành công", "success");
                }
            }
        });

    }, 200);
}

// Phan Đinh Kiên : Chọn trang hiện thị diểm danh theo quyền hạn 

function UpdateAbsentByRole(Id, Page, Count, Role) {
    if (Id == "" || Id == null) {
        swal("Thông báo", "(Thông tin học viên bạn cần sửa không tồn tại trong hệ thống)", "error");
        return;
    }

    if (Role == null) {
        swal("Thông báo", "(Bạn không có quyển truy cập vào hệ thống)", "error");
        return;
    }
    setTimeout(function () {
        if (Role == 1) {
            window.location = "/Absent/UpdateAddmin?ID=" + Id + "&Page=" + Page + "&Count=" + Count + "";
        }
        else if (Role == 2) {
            window.location = "/Absent/UpdateCheck1?ID=" + Id + "&Page=" + Page + "&Count=" + Count + "";
        }
        else if (Role == 3) {
            window.location = "/Absent/UpdateCheck2?ID=" + Id + "&Page=" + Page + "&Count=" + Count + "";
        }
    }, 200);



}


function EditAbsentByCheck2(status) {
    $.ajax({
        url: "/Absent/EditAbsentByCheck2",
        data: {

            ID: $("#txt_update_id_absent_by_check2").val(),
            STATUS_CHECK_2: status,
            REJECT_REASON: $("#txt_update_reject_reasion_check2").val(),
        },
        success: function (result) {

            if (result.Status == 1) {



                swal("Thông Báo!", "Cập nhập thông tin điểm danh thành công", "success");


                // window.location = "/api/Service/PushNotify?DeviceID=" + result.deviceid + "&title= Bạn có thông báo mới &body=" + result.Message;


                var txt_count_list_absent = $("#txtCountAbsentInUpdateofChec1").val();
                var txt_page_list_absent = $("#txtPageAbsentInUpdateOfCheck1").val();

                if (txt_count_list_absent == "") {
                    txt_count_list_absent = 10;
                }
                if (txt_page_list_absent == "") {
                    txt_page_list_absent = 1;
                }
                setTimeout(function () {
                    ExitEditAbsent(); 
                }, 500);




            }
            else {
                swal("Thông báo", "" + result.Message + "", "error");
            }
        }
    });
}


function UpdateAbsentCheck1(status) {


    $.ajax({
        url: "/Absent/EditAbsentByCheck1",
        data: {

            ID: $("#txt_update_id_absent_by_check1").val(),
            STATUS_CHECK_1: status,
            REJECT_REASON: $("#txt_update_reject_reasion_check1").val(),
        },
        success: function (result) {


            if (result.Status == 1) {



                swal("Thông Báo!", "Cập nhập thông tin điểm danh thành công", "success");


                // window.location = "/api/Service/PushNotify?DeviceID=" + result.deviceid + "&title= Bạn có thông báo mới &body=" + result.Message;


                var txt_count_list_absent = $("#txtCountAbsentInUpdateofChec1").val();
                var txt_page_list_absent = $("#txtPageAbsentInUpdateOfCheck1").val();

                if (txt_count_list_absent == "") {
                    txt_count_list_absent = 10;
                }
                if (txt_page_list_absent == "") {
                    txt_page_list_absent = 1;
                }
                setTimeout(function () {
                    ExitEditAbsent(); 
                }, 500);




            }
            else {
                swal("Thông báo", "" + result.Message + "", "error");
            }

        }
    });
}


function SeachNoAbsent() {
    $('#modalLoad').modal("show");
    $.ajax({
        url: "/Absent/SeachNoAbsent",
        data: {
            Page: 1,
            Count: $("#txt_seach_noabsent_by_count").val(),
            date: $("#txt_seach_noabsent_by_date").val(),
            BranchId: $("#txt_seach_noabsent_by_branch").val(),
            DateMonth: $("#txt_seach_noabsent_by_DateMonth").val(),
        },
        success: function (result) {
            $("#Table_No_Absent").html(result);
            $('#modalLoad').modal("hide");
        }
    });
}


$("#txt_seach_noabsent_by_count").change(function () {
    $('#modalLoad').modal("show");
    $.ajax({
        url: "/Absent/SeachNoAbsent",
        data: {
            Page: 1,
            Count: $("#txt_seach_noabsent_by_count").val(),
            date: $("#txt_seach_noabsent_by_date").val(),
            BranchId: $("#txt_seach_noabsent_by_branch").val(),
            DateMonth: $("#txt_seach_noabsent_by_DateMonth").val(),
        },
        success: function (result) {
            $("#Table_No_Absent").html(result);
            $('#modalLoad').modal("hide");
        }
    });
});


//// Phan Đình Kiên : Cập nhập lại số thứ tự trong bảng học viên của lớp học (Edit)
//function UpdateSttEditStudentClass() {
//    var i = 0;
//    $("#list_absent_detail tr").each(function () {

//        $(this).find('td:nth-child(2) input').val;
//    });
//}


$(document).ready(function () {

    // Phan Đình Kiên : bắt sự kiện chọn giáo viên 
    $("#txt_count_list_absent").change(function () {

        $.ajax({
            url: "/Absent/Seach",
            data: {
                Page: 1,
                Count: $("#txt_count_list_absent").val(),
                BRANCH_ID: $("#txt_seach_barch_id_in_absent").val(),
                CLASS_ID: $("#txt_seach_start_date_in_absent").val(),
                END_DATE: $("#txt_seach_end_date_in_absent").val(),
                START_DATE: $("#txt_seach_start_date_in_absent").val(),
                STATUS: $("#txt_seach_status_in_absent").val(),
                TEACHER_NAME: $("#txt_seach_teacher_in_absent").val(),
            },
            success: function (result) {
                $("#Table_Absent").html(result);
            }
        });

    });
    $(".datepicker_absent").datepicker();


});
//--------------------------------
function GetConfigTimeById(ID) {
    $.ajax({
        url: "/ConfigTime/GetById",
        data: { ID: ID },
        success: function (result) {
            $("#txtEditIdConfigTime").val(result.ID);
            $("#txtEditNameConfigTime").val(result.NAME);
            $("#txtEditStartDate").val(result.GET_STRING_START_DATE);
            $("#txtEditEndDate").val(result.GET_STRING_END_DATE);
            $("#Modal_Edit_ConfigTime").show();
        }
    });

}

function CloesEditConfigTime() {
    $("#Modal_Edit_ConfigTime").hide();
}
function CloseDeleteConfigTime() {
    $("#Modal_Del_ConfigTime").hide();
}
var IDDeleteonfigTime = 0;

function ShowFromDeleteConfigTime(Id) {
    IDDeleteonfigTime = Id;
    $("#Modal_Del_ConfigTime").show();
}

function DelRoom() {
    $.ajax({
        url: "/Room/Delete",
        data: { Id: IDDeleteonRoom },
        success: function (result) {
            if (result == 1) {
                $("#Modal_Add_Room").hide();
                swal("Thông Báo!", "Xóa thành công thông tin phòng học ", "success");
                var txt_count_list_room = $("#txt_count_list_room").val();
                var txt_page_list_room = $("#txt_page_list_room").val();
                if (txt_count_list_room != "" && txt_page_list_room != "") {
                    $.ajax({
                        url: "/Room/Seach",
                        data: {
                            Page: txt_page_list_room,
                            Count: txt_count_list_room,
                            NAME: $("#txt_search_Name_Room").val(),
                            BRANCH_ID: $("#txt_search_BRANCH_ID").val(),

                        },
                        success: function (result) {
                            $("#Table_Room").html(result);

                        }
                    });
                }
            }
            else if (result == 0) {
                swal("Thông báo!", "(Xóa không thành công thông tin phòng học)", "error");
            }


        }
    });
}

function DelConfigTime() {
    $.ajax({
        url: "/ConfigTime/Delete",
        data: { Id: IDDeleteonfigTime },
        success: function (result) {
            if (result == 1) {
                $("#Modal_Del_ConfigTime").hide();
                swal("Thông Báo!", "Xóa thành công thông tin cấu hình nghỉ toàn hệ thống ", "success");
                var txt_count_list_configtime = $("#txt_count_list_configtime").val();
                var txt_page_list_configtime = $("#txt_page_list_configtime").val();
                // Tiến hành load lại trang 
                if (txt_count_list_configtime != "" && txt_page_list_configtime != "") {
                    $.ajax({
                        url: "/ConfigTime/Seach",
                        data: {
                            Page: txt_page_list_configtime,
                            Count: txt_count_list_configtime,
                            Name: $("#txt_search_name_configtime").val(),
                            StartDate: $("#txt_search_start_date_configtime").val(),
                            Endate: $("#txt_search_end_date_configtime").val(),

                        },
                        success: function (result) {
                            $("#Table_ConfigTime").html(result);

                        }
                    });
                }
            }
            else if (result == 0) {
                swal("Thông báo!", "(Xóa không thành công thông tin cấu hình nghỉ toàn hệ thống)", "error");
            }


        }
    });
}

function AddConfigTime() {
    $.ajax({
        url: "/ConfigTime/Add",
        data: { NAME: $("#txtAdd_Name_ConfigTime").val(), STR_START_DATE: $("#txtAddStartDate").val(), STR_END_DATE: $("#txtAddEndDate").val() },
        success: function (result) {
            if (result == 1) {
                $("#Modal_Add_ConfigTime").hide();
                $(".modal-backdrop").hide();
                swal("Thông Báo!", "Thêm mới thành công", "success");
                $("#txtAdd_Name_ConfigTime").val("");
                $("#txtAddStartDate").val("");
                $("#txtAddEndDate").val("");
            }

            else if (result == 0) {
                swal("Thông báo", "(Thêm mới không thành công)", "error");

            }
            SeachConfigtime();
        }
    });
}

function SeachRoom() {
    var txt_count_list_room = $("#txt_count_list_room").val();
    var txt_page_list_room = $("#txt_page_list_room").val();

    if (txt_count_list_room == "") {
        txt_count_list_room = 10;
    }
    if (txt_page_list_room == "") {
        txt_page_list_room = 1;
    }

    if (txt_count_list_room != "" && txt_page_list_room != "") {
        $.ajax({
            url: "/Room/Seach",
            data: {
                Page: 1,
                Count: $("#txt_count_list_room").val(),
                NAME: $("#txt_search_Name_Room").val(),
                BRANCH_ID: $("#txt_search_BRANCH_ID").val(),

            },
            success: function (result) {
                $("#Table_Room").html(result);

            }
        });
    }
}

$(document).ready(function () {


    $("#txt_count_list_room").change(function () {

        $.ajax({
            url: "/Room/Seach",
            data: {
                Page: 1,
                Count: $("#txt_count_list_room").val(),
                NAME: $("#txt_search_Name_Room").val(),
                BRANCH_ID: $("#txt_search_BRANCH_ID").val(),
            },
            success: function (result) {
                $("#Table_Room").html(result);

            }
        });

    });




});
function AddRoom() {

    $.ajax({
        url: "/Room/Add",
        data: { NAME: $("#txtAdd_Name_Room").val(), BRANCH_ID: $("#txt_add_branchs_id").val() },
        success: function (result) {
            if (result == 1) {
                $("#Modal_Add_Room").hide();
                $(".modal-backdrop").hide();
                swal("Thông Báo!", "Thêm mới thành công", "success");

            }

            else if (result == 0) {
                swal("Thông báo", "(Thêm mới không thành công)", "error");

            }
            else if (result == -1) {
                swal("Thông báo", "(Không có quyền truy cập hệ thống)", "error");

            }
            else if (result == -3) {
                swal("Thông báo", "(Trùng tên phòng học )", "error");

            }

            SeachRoom();
        }
    });
}
function CloseDeleteRoom() {
    $("#Modal_Del_Room").hide();
}
function CloesEditRoom() {
    $("#Modal_Edit_Room").hide();
}

var IDDeleteonRoom = 0;

function ShowFromRoom(Id) {
    IDDeleteonRoom = Id;
    $("#Modal_Del_Room").show();
}
function GetRoomById(ID) {
    $.ajax({
        url: "/Room/GetById",
        data: { ID: ID },
        success: function (result) {
            $("#txtEditIdRoom").val(result.ID);
            $("#txtEditNameRoom").val(result.NAME);
            $("#txt_Edit_BRANCH_ID").val(result.BRANCH_ID);

            $("#Modal_Edit_Room").show();
        }
    });

}
function EditRoom() {
    $.ajax({
        url: "/Room/Edit",
        data: $("#FormEdit_Room").serialize(),
        success: function (result) {
            if (result == 1) {
                $("#Modal_Edit_Room").hide();
                swal("Thông Báo!", "Cập nhập thành công phòng học ", "success");

            }
            else if (result == 0) {
                swal("Thông báo", "(cập nhật không thành công)", "error");

            }
            else if (result == -1) {
                swal("Thông báo", "(Bạn không có quyền cập nhật thông tin phòng học)", "error");
            }
            else if (result == -3) {
                swal("Thông báo", "(Trùng tên phòng học )", "error");

            }
            SeachRoom();

        }
    });
}



//----------------------------------------------------------Thông tin lương của giáo viên----------------------------------------------------


//  tìm kiếm thông tin trạng thái lương 
function SeachSalary(Page, Count) {

    $.ajax({
        url: "/Salary/Seach",
        data: {
            Page: Page,
            count: $("#txt_count_list_salary_teacher").val(),
            Status: $("#txt_seach_salary_by_status").val(),
            TeacherStatus: $("#txt_seach_salary_by_teacher_status").val(),
            TeacherName: $("#txt_seach_salary_by_teacher_name").val(),
            DateTime: $("#txt_seach_salary_by_date_time").val(),
        },
        success: function (result) {
            $("#Table_Salary").html(result);
        }
    });
}


function ExportSalary() {
    var Status = $("#txt_seach_salary_by_status").val();
    var TeacherStatus = $("#txt_seach_salary_by_teacher_status").val();
    var TeacherName = $("#txt_seach_salary_by_teacher_name").val();
    var DateTime = $("#txt_seach_salary_by_date_time").val();

    window.location = "/Salary/ExportBill?Status=" + Status + "&TeacherStatus=" + TeacherStatus + "&TeacherName=" + TeacherName + "&DateTime=" + DateTime;
}

// tìm kiếm thông tin tổng hợp của lương 

function SeachSalaryByMonth() {

    $.ajax({
        url: "/Salary/SeachMonthlySalary",
        data: {
            Page: $("#txt_seach_page_salary_by_month").val(),
            Count: $("#txt_count_seach_montly_salary").val(),
        },
        success: function (result) {
            $("#Table_Monthly_Salary").html(result);
        }
    });
}






// xóa danh sách lương đã được tổng hợp 

// Phan Đình kiên : xóa nhiều giáo viên cùng một lúc 
function DeleteListSalary() {

    var myArray = "";
    $('#ListSalaryByMonth input[type=checkbox]').each(function () {
        if (this.checked) {
            myArray = myArray + $(this).val() + ":";
        }
    });


    $.ajax({
        url: "/Salary/DeleteList",
        data: {
            ListID: myArray
        },
        success: function (result) {
            if (result == 1) {
                SeachSalaryByMonth()();
                swal("Thông Báo!", "Xóa thành công thông tin tổng hợp lương", "success");
            }
            if (result == 0) {

                swal("Thông báo", "(Xóa không thành công thông tin tổng hợp lương)", "error");
            }
            else if (result == -1) {
                swal("Thông báo", "(Bạn không có quyền xóa thông tin tổng hợp lương)", "error");
            }
            else if (result == -2) {
                swal("Thông báo", "(Bạn phải chọn thông tin tổng hợp lương cần xóa", "error");
            }
        }
    });
}


function CloseStatusSalary() {

    $("#txt_value_update_satust_salry").val('');
    $("#txt_id_update_satust_salry").val('');
    $("#Modal_Update_Slary").hide();
}






function UpdateSalarys(obj) {

    var edit_fee_add_of_parent = cms_decode_currency_format($("#edit_txtAddSalarys").val());
    var txt_update_fee_by_fee_kpi = cms_decode_currency_format(obj.value);
    $("#txtAddSalarys").val(txt_update_fee_by_fee_kpi);
    if (txt_update_fee_by_fee_kpi == "") {
        txt_update_fee_by_fee_kpi = 0;
    }
}

// tăng học phí 
function UpdateFeeTotalByKPI(obj) {
    var txt_update_fee_by_fee_basic = cms_decode_currency_format($("#txt_update_fee_by_fee_basic").val());
    var txt_update_fee_by_fee_minus = cms_decode_currency_format($("#txt_update_fee_by_fee_minus").val());
    $("#edit_fee_minus_of_parent").val(txt_update_fee_by_fee_minus);


    var txt_update_fee_by_fee_kpi = cms_decode_currency_format(obj.value);
    $("#edit_fee_add_of_parent").val(txt_update_fee_by_fee_kpi);
    if (txt_update_fee_by_fee_kpi == "") {
        txt_update_fee_by_fee_kpi = 0;
    }

    if (txt_update_fee_by_fee_minus == "") {
        txt_update_fee_by_fee_minus = 0;
    }

    if (txt_update_fee_by_fee_basic == "") {
        txt_update_fee_by_fee_basic = 0;
    }


    var data = parseFloat(txt_update_fee_by_fee_basic) + parseFloat(txt_update_fee_by_fee_kpi) - parseFloat(txt_update_fee_by_fee_minus);
    var str = "Tổng học phí : " + cms_encode_currency_format(data) + " vnđ";

    $("#txt_fee_total").html(str);
}

// giảm học gia
function UpdateFeeTotalByMINUS(obj) {
    //alert($("#txt_update_fee_by_fee_basic").val()); 
    var txt_update_fee_by_fee_basic = cms_decode_currency_format($("#txt_update_fee_by_fee_basic").val());
    var txt_update_fee_by_fee_kpi = cms_decode_currency_format($("#txt_update_fee_by_fee_kpi").val());
    $("#edit_fee_add_of_parent").val(txt_update_fee_by_fee_kpi);

    var txt_update_fee_by_fee_minus = cms_decode_currency_format(obj.value);
    $("#edit_fee_minus_of_parent").val(txt_update_fee_by_fee_minus);


    if (txt_update_fee_by_fee_kpi == "") {
        txt_update_fee_by_fee_kpi = 0;
    }

    if (txt_update_fee_by_fee_minus == "") {
        txt_update_fee_by_fee_minus = 0;
    }

    if (txt_update_fee_by_fee_basic == "") {
        txt_update_fee_by_fee_basic = 0;
    }

    var data = parseFloat(txt_update_fee_by_fee_basic) + parseFloat(txt_update_fee_by_fee_kpi) - parseFloat(txt_update_fee_by_fee_minus);
    var str = "Tổng học phí  : " + cms_encode_currency_format(data) + " vnđ";
    $("#txt_fee_total").html(str);
}


function UpdateStatusSalary() {
    $.ajax({
        url: "/Salary/UpdateStatus",
        data: {
            ID: $("#txt_id_update_satust_salry").val(),
            Status: $("#txt_value_update_satust_salry").val(),
        },
        success: function (result) {
            if (result.Status == 1) {

                var Page = $("#txt_page_salary").val();
                var count = $("#txt_count_list_salary_teacher").val();
                var Status = $("#txt_seach_salary_by_status").val();
                var TeacherStatus = $("#txt_seach_salary_by_teacher_status").val();
                var TeacherName = $("#txt_seach_salary_by_teacher_name").val();
                var DateTime = $("#txt_seach_salary_by_date_time").val();

                //  window.location = "/api/Service/PushNotify?DeviceID=" + result.deviceid + "&title= Bạn có thông báo mới &body=" + result.Message;

                setTimeout(function () {
                    window.location = "/salary/Index/?Page=" + Page + "&count= " + count + "&Status= " + Status + "&TeacherStatus= " + TeacherStatus + "&TeacherName= " + TeacherName + "&DateTime= " + DateTime;

                }, 200);


                swal("Thông Báo!", "Cập nhập thành công trạng thái lương của giáo viên", "success");
                CloseStatusSalary()
            }
            if (result.Status == 2) {

                swal("Thông Báo!", result.Message, "success");
                CloseStatusSalary()
            }


            if (result.Status == -1) {

                swal("Thông Báo!", "Bạn không có quyền cập nhập trạng thái lương của giáo viên", "error");
                CloseStatusSalary()
            }

            if (result.Status == 0) {
                swal("Thông Báo!", "Cập nhập không thành công trạng thái lương của giáo viên", "error");
                CloseStatusSalary()
            }
        }
    });
}

// cập nhập lại triền lương khi lương được cộng


// cập nhập lại tiền lương khi lương bị trừ đi 
function UpdateSalaryTotalByMINUS(obj) {

    // lương hiện tại 
    var txt_update_salary_by_salary_basic = cms_decode_currency_format($("#txt_update_salary_basic").val());

    // lương tăng 
    var txt_update_salary_by_salary_kpi = cms_decode_currency_format($("#txt_update_salary_by_salary_kpi").val());
    $("#edit_salary_add_of_parent").val(txt_update_salary_by_salary_kpi);

    // lương giảm 
    var txt_update_salary_by_salary_minus = cms_decode_currency_format(obj.value);
    $("#edit_salary_minus_of_parent").val(txt_update_salary_by_salary_minus);
    if (txt_update_salary_by_salary_minus == "") {
        txt_update_salary_by_salary_minus = 0;
    }

    if (txt_update_salary_by_salary_basic == "") {
        txt_update_salary_by_salary_basic = 0;
    }

    if (txt_update_salary_by_salary_kpi == "") {
        txt_update_salary_by_salary_kpi = 0;
    }


    var data = parseFloat(txt_update_salary_by_salary_basic) + parseFloat(txt_update_salary_by_salary_kpi) - parseFloat(txt_update_salary_by_salary_minus);
    var str = "Tổng tiền lương : " + cms_encode_currency_format(data) + " vnđ";

    $("#txt_salary_total").html(str);

}



function UpdateSalaryTotalByKPI(obj) {


    var txt_update_salary_by_salary_basic = cms_decode_currency_format($("#txt_update_salary_basic").val());
    var txt_update_salary_by_salary_minus = cms_decode_currency_format($("#txt_update_salary_by_salary_minus").val());
    $("#edit_salary_minus_of_parent").val(txt_update_salary_by_salary_minus);


    var txt_update_salary_by_salary_kpi = cms_decode_currency_format(obj.value);
    $("#edit_salary_add_of_parent").val(txt_update_salary_by_salary_kpi);
    if (txt_update_salary_by_salary_minus == "") {
        txt_update_salary_by_salary_minus = 0;
    }

    if (txt_update_salary_by_salary_basic == "") {
        txt_update_salary_by_salary_basic = 0;
    }

    if (txt_update_salary_by_salary_kpi == "") {
        txt_update_salary_by_salary_kpi = 0;
    }


    var data = parseFloat(txt_update_salary_by_salary_basic) + parseFloat(txt_update_salary_by_salary_kpi) - parseFloat(txt_update_salary_by_salary_minus);
    var str = "Tổng tiền lương : " + cms_encode_currency_format(data) + " vnđ";

    $("#txt_salary_total").html(str);



    //var edit_fee_add_of_parent = cms_decode_currency_format($("#edit_fee_add_of_parent").val());
    //var txt_update_fee_by_fee_kpi = cms_decode_currency_format(obj.value);
    //$("#txtAddSalary").val(txt_update_fee_by_fee_kpi);
    //if (txt_update_fee_by_fee_kpi == "") {
    //    txt_update_fee_by_fee_kpi = 0;
    //}

}

// sửa lương 
// Phan Đình kiên : cập nhập lương của giáo viên 
function EidtSalary() {

    $.ajax({
        url: "/Salary/EditSalary",
        data: $("#From_Update_Salary").serialize(),
        success: function (result) {
            if (result.Status == 1) {
                swal("Thông Báo!", "Cập nhập thành công lương của giáo viên", "success");
                CloseStatusSalary()

                //window.location = "/api/Service/PushNotify?DeviceID=" + result.deviceid + "&title= Bạn có thông báo mới &body=" + result.Message;
                var Page = $("#txt_seach_page_salary_in_update").val();
                var count = $("#txt_seach_count_salary_in_update").val();
                var Status = $("#txt_seach_status_salary_in_update").val();
                var TeacherStatus = $("#txt_seach_teachersttus_salary_in_update").val();
                var TeacherName = $("#txt_seach_teachername_salary_in_update").val();
                var DateTime = $("#txt_seach_datetime_salary_in_update").val();

                setTimeout(function () {
                    window.location = '/salary/ListSalary?Page=' + Page + '&count=' + count + '&Status=' + Status + '&TeacherStatus=' + TeacherStatus + '&TeacherName=' + TeacherName + '&DateTime=' + DateTime;

                }, 200);

            }

            if (result.Status == 2) {


                swal("Thông Báo!", result.Message, "success");
                var Page = $("#txt_seach_page_salary_in_update").val();
                var count = $("#txt_seach_count_salary_in_update").val();
                var Status = $("#txt_seach_status_salary_in_update").val();
                var TeacherStatus = $("#txt_seach_teachersttus_salary_in_update").val();
                var TeacherName = $("#txt_seach_teachername_salary_in_update").val();
                var DateTime = $("#txt_seach_datetime_salary_in_update").val();

                setTimeout(function () {
                    window.location = '/salary/ListSalary?Page=' + Page + '&count=' + count + '&Status=' + Status + '&TeacherStatus=' + TeacherStatus + '&TeacherName=' + TeacherName + '&DateTime=' + DateTime;

                }, 200);
                CloseStatusSalary()
            }
            if (result.Status == -1) {
                swal("Thông Báo!", "Bạn không có quyền cập nhập lương của giáo viên", "error");
                CloseStatusSalary()
            }

            if (result.Status == 0) {
                swal("Thông Báo!", "Cập nhập không thành công lương của giáo viên", "error");
                CloseStatusSalary()
            }
        }
    });


}

function ExitEditSalary() {
    var Page = $("#txt_seach_page_salary_in_update").val();
    var count = $("#txt_seach_count_salary_in_update").val();
    var Status = $("#txt_seach_status_salary_in_update").val();
    var TeacherStatus = $("#txt_seach_teachersttus_salary_in_update").val();
    var TeacherName = $("#txt_seach_teachername_salary_in_update").val();
    var DateTime = $("#txt_seach_datetime_salary_in_update").val();

    setTimeout(function () {
        window.location = '/salary/ListSalary?Page=' + Page + '&count=' + count + '&Status=' + Status + '&TeacherStatus=' + TeacherStatus + '&TeacherName=' + TeacherName + '&DateTime=' + DateTime;

    }, 200);
}

$(document).ready(function () {

    $(".Status_salary select").change(function () {

        var data = $(this).attr('id');
        var array = data.split("_");
        var value = $(this).val();
        $("#txt_value_update_satust_salry").val(value);
        $("#txt_id_update_satust_salry").val(array[1]);
        $("#Modal_Update_Slary").show();

        if (value == 1) {
            document.getElementById(data).style.color = 'green';
        }
        else {
            document.getElementById(data).style.color = 'red';
        }

    });






    // Phan Đình Kiên : bắt sự kiện chọn giáo viên 
    $("#txt_count_list_salary_teacher").change(function () {

        $.ajax({
            url: "/Salary/Seach",
            data: {
                Page: 1,
                count: $("#txt_count_list_salary_teacher").val(),
                Status: $("#txt_seach_salary_by_status").val(),
                TeacherStatus: $("#txt_seach_salary_by_teacher_status").val(),
                TeacherName: $("#txt_seach_salary_by_teacher_name").val(),
                DateTime: $("#txt_seach_salary_by_date_time").val(),
            },
            success: function (result) {
                $("#Table_Salary").html(result);
            }
        });

    });


    // Phan Đình Kiên : bắt sự kiện chọn giáo viên 
    $("#txt_count_seach_montly_salary").change(function () {

        $.ajax({
            url: "/Salary/SeachMonthlySalary",
            data: {
                Page: $("#txt_seach_page_salary_by_month").val(),
                Count: $("#txt_count_seach_montly_salary").val(),
            },
            success: function (result) {
                $("#Table_Monthly_Salary").html(result);
            }
        });

    });


    // Phan Đình Kiên : load Checbox Parent 
    $("#SalaryByMonthCheckBookAll").click(function () {
        if ($(this).is(":checked")) {
            $(".SalaryByMonthCheckbox").prop('checked', true);
        }
        else {
            $(".SalaryByMonthCheckbox").prop('checked', false);
        }
    });

});


//-------------------------------------------------------------------------------------Thông tin điểm học phí của học sinh --------------------------------------------------------------

function SeachFee(page, count) {
    $.ajax({
        url: "/Fee/Seach",
        data: {
            Page: 1,
            Count: count,
            StudentName: $("#txt_student_name_in_seach_fee").val(),
            IsNotified: $("#txt_is_notifider_in_seach_fee").val(),
            Status: $("#txt_status_in_seach_fee").val(),
            TimeFee: $("#txt_date_time_in_seach_fee").val(),
            BranchId: $("#txt_branch_in_seach_fee").val(),
            StartTime: $("#txt_startime_in_seach_fee").val(),
            EndTime: $("#txt_endtime_in_seach_fee").val(),
        },
        success: function (result) {
            $("#Table_Fee").html(result);
        }
    });
}

// Phan Đình kiên : hiển thị thông tin học phí của học viên 
function EditFee() {

    $.ajax({
        url: "/Fee/Edit",
        data: $("#From_update_fee").serialize(),
        success: function (result) {
            if (result.Status == 1) {
                swal("Thông Báo!", "Cập nhập thành công thông tin học phí học sinh ", "success");

                // tiến hành gửi tin nhắn cho ph
                if (result.Code == 1) {
                    PushNotifyPosts(result.Result, "Xác nhận đóng học phí", result.Message);
                }

                CloseStatusSalary()
                var Page = $("#txt_seach_page_fee_in_update").val();
                var Count = $("#txt_seach_count_fee_in_update").val();
                var Status = $("#txt_seach_student_name_fee_in_update").val();
                var StudentName = $("#txt_seach_student_name_fee_in_update").val();
                var IsNotified = $("#txt_seach_is_notified_fee_in_update").val();
                var TimeFee = $("#txt_seach_time_fee_in_update").val();
                var status_fee = $("#txt_seach_start_fess_fee_in_update").val();
                var branch_Id = $("#txt_seach_branch_Id_fee_in_update").val();
                var startime = $("#txt_seach_start_time_fee_in_update").val();
                var endtime = $("#txt_seach_end_time_fess_fee_in_update").val();



                window.location = '/Fee/ListFee?Page=' + Page + '&Count=' + Count + '&StudentName=' + StudentName + '&IsNotified=' + IsNotified + '&TimeFee=' + TimeFee + '&Status=' + Status + '&status_fee=' + status_fee;
            }

            if (result.Status == -1) {
                swal("Thông Báo!", result.Message, "success");
            }
        }
    });


}


function ExitEditFee() {
    var Page = $("#txt_seach_page_fee_in_update").val();
    var Count = $("#txt_seach_count_fee_in_update").val();
    var Status = $("#txt_seach_student_name_fee_in_update").val();
    var StudentName = $("#txt_seach_student_name_fee_in_update").val();
    var IsNotified = $("#txt_seach_is_notified_fee_in_update").val();
    var TimeFee = $("#txt_seach_time_fee_in_update").val();
    var status_fee = $("#txt_seach_start_fess_fee_in_update").val();
    var branch_Id = $("#txt_seach_branch_Id_fee_in_update").val();
    var startime = $("#txt_seach_start_time_fee_in_update").val();
    var endtime = $("#txt_seach_end_time_fess_fee_in_update").val();
    window.location = '/Fee/ListFee?Page=' + Page + '&Count=' + Count + '&StudentName=' + StudentName + '&IsNotified=' + IsNotified + '&TimeFee=' + TimeFee + '&Status=' + Status + '&status_fee=' + status_fee;

}

function PushNotifyPosts(deviceID, title, body) {


    $.ajax({
        url: "/api/Service/PushNotifyPost",
        type: "POST",
        data: {
            deviceID: deviceID,
            title: title,
            body: body
        },
        success: function (value) {

        }
    });
}


function DeleteListFee() {

    var myArray = "";
    $('#ListFeeByMonth input[type=checkbox]').each(function () {
        if (this.checked) {
            myArray = myArray + $(this).val() + ":";
        }
    });


    $.ajax({
        url: "/Fee/DeleteList",
        data: {
            ListID: myArray
        },
        success: function (result) {
            $("#Modal_Del_Fee").hide();
            if (result == 1) {
                SeachFeeByMonth()();
                swal("Thông Báo!", "Xóa thành công thông tin học phí", "success");
            }
            if (result == 0) {

                swal("Thông báo", "(Xóa không thành công thông tin học phí)", "error");
            }
            else if (result == -1) {
                swal("Thông báo", "(Bạn không có quyền xóa thông tin học phí )", "error");
            }
            else if (result == -2) {
                swal("Thông báo", "(Bạn phải chọn thông tin học phí cần xóa)", "error");
            }

        }
    });
}

function SeachFeeByMonth() {

    $.ajax({
        url: "/Fee/SeachStatusticianFee",
        data: {
            Page: $("#txt_page_seach_statisti_fee").val(),
            Count: $("#txt_count_seach_statisti_fee").val(),
        },
        success: function (result) {
            $("#Table_Monthly_fee").html(result);
        }
    });
}


function LoadFeeCheckBookAll() {

    $("#FeeCheckBookAll").click(function () {
        if ($(this).is(":checked")) {
            $(".FeeCheckbox").prop('checked', true);
        }
        else {
            $(".FeeCheckbox").prop('checked', false);
        }
    });
}


/// Phan Đình Kiên :  tiến hành lấy danh sách tin các thông tin học phí cần tạo in nhắn 
function AddListDateEndFee() {

    var myArray = "";
    $('#TableFee input[type=checkbox]').each(function () {
        if (this.checked) {
            myArray = myArray + $(this).val() + ":";
            $("#hannophocphi").show();
        }
    });

    setTimeout(function () {
        if (myArray != "") {
            $("#txt_list_date_end_fee").val(myArray);

        }
        else {
            swal("Thông báo", "(bạn cần chọn học viên cần cập nhập hạn đóng học phí)", "error");
            $("#txt_list_date_end_fee").val("");
        }

    }, 200);
}


function UpdateListEndFee() {

}


/// Phan Đình Kiên :  tiến hành lấy danh sách tin các thông tin học phí cần tạo in nhắn 
function AddListIdFee() {

    var myArray = "";
    $('#TableFee input[type=checkbox]').each(function () {
        if (this.checked) {
            myArray = myArray + $(this).val() + ":";
            $("#Modal_type_message_notification").show();
        }
    });

    setTimeout(function () {
        if (myArray != "") {
            $("#txt_list_id_fee").val(myArray);

        }
        else {
            swal("Thông báo", "(Bạn cần phải chọn thông tin học phí cần tạo tin nhắn)", "error");
            $("#txt_list_id_fee").val("");
        }

    }, 200);
}


// Phan Đình Kiên : tiến hành tạo tin nhắn cho học phí 
function CreateMasegerInFee() {


    var type_messenger = $("#txt_type_messenger").val();
    var type_content = $("#txt_type_content").val();

    if (type_content == "") {

        swal("Thông báo", "(bạn cần chọn kiểu thông báo cần tạo )", "error");
    }
    else if (type_messenger == "") {
        swal("Thông báo", "(bạn phải chọn loại tin nhắn cần tạo)", "error");
    }
    else {
        $.ajax({
            url: "/Fee/AddListMaseage",
            data: {
                ListID: $("#txt_list_id_fee").val(),
                type_messenger: $("#txt_type_messenger").val(),
                type_content: $("#txt_type_content").val(),
                Mess: $("#txt_ms_fee").val(),
            },
            success: function (result) {
                if (result.Status == 1) {
                    $("#Modal_type_message_notification").hide();
                    swal("Thông Báo!", result.Message, "success");
                    $("#txt_ms_fee").val("");
                    $("#AddStudentInMs").attr("disabled", false);
                    $("#AddFeeinMs").attr("disabled", false);
                    $("#AddCountClassInMs").attr("disabled", false);
                    $("#AddFeeAddinMs").attr("disabled", false);
                    $("#AddFeeMinusInMs").attr("disabled", false);
                    $("#AddDeductioninMs").attr("disabled", false);
                    $("#AddFeeDeductioninMs").attr("disabled", false);
                    $("#AddSunFeeInMs").attr("disabled", false);
                    $("#checkMasseger").prop("checked", false);
                    setTimeout(function () {
                        window.location = "/Fee/ListMaseage";
                        $("#Modal_type_message_notification").hide();


                    }, 1000);


                }
                else if (result.Status == -1) {
                    swal("Thông Báo!", result.Message, "error");

                }


            }
        });

    }


}




$(document).ready(function () {

    LoadFeeCheckBookAll();
    // Phan Đình Kiên : bắt sự kiện chọn giáo viên 
    $("#txt_count_fee").change(function () {

        $.ajax({
            url: "/Fee/Seach",
            data: {
                Page: 1,
                Count: $("#txt_count_fee").val(),
                StudentName: $("#txt_student_name_in_seach_fee").val(),
                IsNotified: $("#txt_is_notifider_in_seach_fee").val(),
                Status: $("#txt_status_in_seach_fee").val(),
                TimeFee: $("#txt_date_time_in_seach_fee").val(),
                BranchId: $("#txt_branch_in_seach_fee").val(),
                StartTime: $("#txt_startime_in_seach_fee").val(),
                EndTime: $("#txt_endtime_in_seach_fee").val(),
            },
            success: function (result) {
                $("#Table_Fee").html(result);
            }
        });

    });



    // Phan Đình Kiên : bắt sự kiện chọn giáo viên 
    $("#txt_count_seach_statisti_fee").change(function () {

        $.ajax({
            url: "/Fee/SeachStatusticianFee",
            data: {
                Page: $("#txt_page_seach_statisti_fee").val(),
                Count: $("#txt_count_seach_statisti_fee").val(),
            },
            success: function (result) {
                $("#Table_Monthly_fee").html(result);
            }
        });

    });


});



















// -- thông tin thông báo của giáo viên 

function MessageNotification() {
    var Message_status = 'Thông báo đóng học phí [Tháng/Năm], \n';
    var Student_name = "Em : [Tên học sinh],  \n";
    var Fee = "Học phí : [Học phí],  \n";
    var Class_count = "Số buổi học : [Số buổi học],  \n";
    var Fee_add = "Học phí tăng thêm : [Học phí tăng thêm],  \n";
    var Fee_Minus = "Học phí giảm : [Học phí giảm], \n";
    var Claas_deduction = "Số buổi nghỉ khấu trừ : [Số buổi nghỉ khấu trừ],  \n";
    var Fee_deduction = "Số tiền được khấu trừ : [Số tiền được khấu trừ],  \n";
    var Fee_total = "Tổng tiền : [Tổng tiền],  \n";
    var report = "TTGS Trân trọng gửi tới gia đình....,  \n";

    // 
    var txt_Student_name = $("#txt_message_notificatio_student_name").val();
    var txt_Fee = $("#txt_message_notificatio_fee_basic").val();
    var txt_Class = $("#txt_message_notificatio_class").val();
    var txt_Fee_add = $("#txt_message_notificatio_fee_add").val();
    var txt_Fee_Minus = $("#txt_message_notificatio_fee_minus").val();
    var txt_Fee_count = $("#txt_message_notificatio_class_count").val();
    var txt_Fee_totol = $("#txt_message_notificatio_fee_totol").val();

}


//-- Phan Đình Kiên : Thêm tên học sinh vào tin nhăm 
function AddStudentInMs() {

    var Message_status = 'Thông báo đóng học phí [Tháng/Năm], \n';
    var Student_name = "Em : [Tên học sinh],  \n";
    var Fee = "Học phí : [Học phí],  \n";
    var Class_count = "Số buổi học : [Số buổi học],  \n";
    var Fee_add = "Học phí tăng thêm : [Học phí tăng thêm],  \n";
    var Fee_Minus = "Học phí giảm : [Học phí giảm], \n";
    var Claas_deduction = "Số buổi nghỉ khấu trừ : [Số buổi nghỉ khấu trừ],  \n";
    var Fee_deduction = "Số tiền được khấu trừ : [Số tiền được khấu trừ],  \n";
    var Fee_total = "Tổng tiền : [Tổng tiền],  \n";
    var report = "TTGS Trân trọng gửi tới gia đình....,  \n";

    // 
    var txt_Student_name = $("#txt_message_notificatio_student_name").val();
    var txt_Fee = $("#txt_message_notificatio_fee_basic").val();
    var txt_Class_Count = $("#txt_message_notificatio_class_count").val();
    var txt_Fee_add = $("#txt_message_notificatio_fee_add").val();
    var txt_Fee_Minus = $("#txt_message_notificatio_fee_minus").val();
    var txt_claas_deduction = $("#txt_message_notificatio_deduction").val();
    var txt_Fee_deduction = $("#txt_message_notificatio_deduction_fee").val();
    var txt_Fee_total = $("#txt_message_notificatio_fee_totol").val();


    $("#txt_ms_fee").empty();
    var Ms = Message_status;

    /// tên học sinh 
    if (txt_Student_name == 0) {
        Ms += Student_name;
        $("#txt_message_notificatio_student_name").val(1);
        document.getElementById('AddStudentInMs').style.background = '#dc3545';
    }
    else {
        $("#txt_message_notificatio_student_name").val(0);
        document.getElementById('AddStudentInMs').style.background = '#17a2b8';
    }

    // số tiền học phải đóng 
    if (txt_Fee == 1) {
        Ms += Fee;
    }

    // Số buổi nghỉ 
    if (txt_Class_Count == 1) {
        Ms += Class_count;
    }

    // học phí tăng thêm 
    if (txt_Fee_add == 1) {
        Ms += Fee_add;
    }

    // học phí giảm đi 
    if (txt_Fee_Minus == 1) {
        Ms += Fee_Minus;
    }

    // số buổi học khấu trừ 
    if (txt_claas_deduction == 1) {
        Ms += Claas_deduction;
    }


    // số tiền học khấu trừ 
    if (txt_Fee_deduction == 1) {
        Ms += Fee_deduction;
    }

    // số tiền học phải đóng 
    if (txt_Fee_total == 1) {
        Ms += Fee_total;
    }

    Ms = Ms + report;
    $("#txt_ms_fee").append(Ms);
}


// Phan Đình Kiên : Thêm học phí tính toán của học sinh 

function AddFeeinMs() {


    var Message_status = 'Thông báo đóng học phí [Tháng/Năm], \n';
    var Student_name = "Em : [Tên học sinh],  \n";
    var Fee = "Học phí : [Học phí],  \n";
    var Class_count = "Số buổi học : [Số buổi học],  \n";
    var Fee_add = "Học phí tăng thêm : [Học phí tăng thêm],  \n";
    var Fee_Minus = "Học phí giảm : [Học phí giảm], \n";
    var Claas_deduction = "Số buổi nghỉ khấu trừ : [Số buổi nghỉ khấu trừ],  \n";
    var Fee_deduction = "Số tiền được khấu trừ : [Số tiền được khấu trừ],  \n";
    var Fee_total = "Tổng tiền : [Tổng tiền],  \n";
    var report = "TTGS Trân trọng gửi tới gia đình....,  \n";

    // 
    var txt_Student_name = $("#txt_message_notificatio_student_name").val();
    var txt_Fee = $("#txt_message_notificatio_fee_basic").val();
    var txt_Class_Count = $("#txt_message_notificatio_class_count").val();
    var txt_Fee_add = $("#txt_message_notificatio_fee_add").val();
    var txt_Fee_Minus = $("#txt_message_notificatio_fee_minus").val();
    var txt_claas_deduction = $("#txt_message_notificatio_deduction").val();
    var txt_Fee_deduction = $("#txt_message_notificatio_deduction_fee").val();
    var txt_Fee_total = $("#txt_message_notificatio_fee_totol").val();


    $("#txt_ms_fee").empty();
    var Ms = Message_status;

    /// tên học sinh 
    if (txt_Student_name == 1) {
        Ms += Student_name;

    }

    // số tiền học phải đóng 
    if (txt_Fee == 0) {
        Ms += Fee;

        $("#txt_message_notificatio_fee_basic").val(1);
        document.getElementById('AddFeeinMs').style.background = '#dc3545';
    }
    else {

        $("#txt_message_notificatio_fee_basic").val(0);
        document.getElementById('AddFeeinMs').style.background = '#17a2b8';
    }

    // Số buổi nghỉ 
    if (txt_Class_Count == 1) {
        Ms += Class_count;
    }

    // học phí tăng thêm 
    if (txt_Fee_add == 1) {
        Ms += Fee_add;
    }

    // học phí giảm đi 
    if (txt_Fee_Minus == 1) {
        Ms += Fee_Minus;
    }

    // số buổi học khấu trừ 
    if (txt_claas_deduction == 1) {
        Ms += Claas_deduction;
    }


    // số tiền học khấu trừ 
    if (txt_Fee_deduction == 1) {
        Ms += Fee_deduction;
    }

    // số tiền học phải đóng 
    if (txt_Fee_total == 1) {
        Ms += Fee_total;
    }

    Ms = Ms + report;
    $("#txt_ms_fee").append(Ms);
}




// Phan Đình Kiên : Thêm học phí tính toán của học sinh 

function AddCountClassInMs() {


    var Message_status = 'Thông báo đóng học phí [Tháng/Năm], \n';
    var Student_name = "Em : [Tên học sinh],  \n";
    var Fee = "Học phí : [Học phí],  \n";
    var Class_count = "Số buổi học : [Số buổi học],  \n";
    var Fee_add = "Học phí tăng thêm : [Học phí tăng thêm],  \n";
    var Fee_Minus = "Học phí giảm : [Học phí giảm], \n";
    var Claas_deduction = "Số buổi nghỉ khấu trừ : [Số buổi nghỉ khấu trừ],  \n";
    var Fee_deduction = "Số tiền được khấu trừ : [Số tiền được khấu trừ],  \n";
    var Fee_total = "Tổng tiền : [Tổng tiền],  \n";
    var report = "TTGS Trân trọng gửi tới gia đình....,  \n";

    // 
    var txt_Student_name = $("#txt_message_notificatio_student_name").val();
    var txt_Fee = $("#txt_message_notificatio_fee_basic").val();
    var txt_Class_Count = $("#txt_message_notificatio_class_count").val();
    var txt_Fee_add = $("#txt_message_notificatio_fee_add").val();
    var txt_Fee_Minus = $("#txt_message_notificatio_fee_minus").val();
    var txt_claas_deduction = $("#txt_message_notificatio_deduction").val();
    var txt_Fee_deduction = $("#txt_message_notificatio_deduction_fee").val();
    var txt_Fee_total = $("#txt_message_notificatio_fee_totol").val();


    $("#txt_ms_fee").empty();
    var Ms = Message_status;

    /// tên học sinh 
    if (txt_Student_name == 1) {
        Ms += Student_name;

    }

    // số tiền học phải đóng 
    if (txt_Fee == 1) {
        Ms += Fee;


    }


    // Số buổi nghỉ 
    if (txt_Class_Count == 0) {
        Ms += Class_count;
        $("#txt_message_notificatio_class_count").val(1);
        document.getElementById('AddCountClassInMs').style.background = '#dc3545';
    }
    else {

        $("#txt_message_notificatio_class_count").val(0);
        document.getElementById('AddCountClassInMs').style.background = '#17a2b8';
    }

    // học phí tăng thêm 
    if (txt_Fee_add == 1) {
        Ms += Fee_add;
    }

    // học phí giảm đi 
    if (txt_Fee_Minus == 1) {
        Ms += Fee_Minus;
    }

    // số buổi học khấu trừ 
    if (txt_claas_deduction == 1) {
        Ms += Claas_deduction;
    }


    // số tiền học khấu trừ 
    if (txt_Fee_deduction == 1) {
        Ms += Fee_deduction;
    }

    // số tiền học phải đóng 
    if (txt_Fee_total == 1) {
        Ms += Fee_total;
    }

    Ms = Ms + report;
    $("#txt_ms_fee").append(Ms);
}

// Phan Đình Kiên : học phí tăng thêm của học sinh 
function AddFeeAddinMs() {


    var Message_status = 'Thông báo đóng học phí [Tháng/Năm], \n';
    var Student_name = "Em : [Tên học sinh],  \n";
    var Fee = "Học phí : [Học phí],  \n";
    var Class_count = "Số buổi học : [Số buổi học],  \n";
    var Fee_add = "Học phí tăng thêm : [Học phí tăng thêm],  \n";
    var Fee_Minus = "Học phí giảm : [Học phí giảm], \n";
    var Claas_deduction = "Số buổi nghỉ khấu trừ : [Số buổi nghỉ khấu trừ],  \n";
    var Fee_deduction = "Số tiền được khấu trừ : [Số tiền được khấu trừ],  \n";
    var Fee_total = "Tổng tiền : [Tổng tiền],  \n";
    var report = "TTGS Trân trọng gửi tới gia đình....,  \n";

    // 
    var txt_Student_name = $("#txt_message_notificatio_student_name").val();
    var txt_Fee = $("#txt_message_notificatio_fee_basic").val();
    var txt_Class_Count = $("#txt_message_notificatio_class_count").val();
    var txt_Fee_add = $("#txt_message_notificatio_fee_add").val();
    var txt_Fee_Minus = $("#txt_message_notificatio_fee_minus").val();
    var txt_claas_deduction = $("#txt_message_notificatio_deduction").val();
    var txt_Fee_deduction = $("#txt_message_notificatio_deduction_fee").val();
    var txt_Fee_total = $("#txt_message_notificatio_fee_totol").val();


    $("#txt_ms_fee").empty();
    var Ms = Message_status;

    /// tên học sinh 
    if (txt_Student_name == 1) {
        Ms += Student_name;

    }

    // số tiền học phải đóng 
    if (txt_Fee == 1) {
        Ms += Fee;


    }


    // Số buổi nghỉ 
    if (txt_Class_Count == 1) {
        Ms += Class_count;

    }


    // học phí tăng thêm 
    if (txt_Fee_add == 0) {
        Ms += Fee_add;
        $("#txt_message_notificatio_fee_add").val(1);
        document.getElementById('AddFeeAddinMs').style.background = '#dc3545';
    }
    else {

        $("#txt_message_notificatio_fee_add").val(0);
        document.getElementById('AddFeeAddinMs').style.background = '#17a2b8';
    }

    // học phí giảm đi 
    if (txt_Fee_Minus == 1) {
        Ms += Fee_Minus;
    }

    // số buổi học khấu trừ 
    if (txt_claas_deduction == 1) {
        Ms += Claas_deduction;
    }


    // số tiền học khấu trừ 
    if (txt_Fee_deduction == 1) {
        Ms += Fee_deduction;
    }

    // số tiền học phải đóng 
    if (txt_Fee_total == 1) {
        Ms += Fee_total;
    }

    Ms = Ms + report;
    $("#txt_ms_fee").append(Ms);
}


// Phan Đình Kiên : Học phí giảm đi của học viên  
function AddFeeMinusInMs() {


    var Message_status = 'Thông báo đóng học phí [Tháng/Năm], \n';
    var Student_name = "Em : [Tên học sinh],  \n";
    var Fee = "Học phí : [Học phí],  \n";
    var Class_count = "Số buổi học : [Số buổi học],  \n";
    var Fee_add = "Học phí tăng thêm : [Học phí tăng thêm],  \n";
    var Fee_Minus = "Học phí giảm : [Học phí giảm], \n";
    var Claas_deduction = "Số buổi nghỉ khấu trừ : [Số buổi nghỉ khấu trừ],  \n";
    var Fee_deduction = "Số tiền được khấu trừ : [Số tiền được khấu trừ],  \n";
    var Fee_total = "Tổng tiền : [Tổng tiền],  \n";
    var report = "TTGS Trân trọng gửi tới gia đình....,  \n";

    // 
    var txt_Student_name = $("#txt_message_notificatio_student_name").val();
    var txt_Fee = $("#txt_message_notificatio_fee_basic").val();
    var txt_Class_Count = $("#txt_message_notificatio_class_count").val();
    var txt_Fee_add = $("#txt_message_notificatio_fee_add").val();
    var txt_Fee_Minus = $("#txt_message_notificatio_fee_minus").val();
    var txt_claas_deduction = $("#txt_message_notificatio_deduction").val();
    var txt_Fee_deduction = $("#txt_message_notificatio_deduction_fee").val();
    var txt_Fee_total = $("#txt_message_notificatio_fee_totol").val();


    $("#txt_ms_fee").empty();
    var Ms = Message_status;

    /// tên học sinh 
    if (txt_Student_name == 1) {
        Ms += Student_name;

    }

    // số tiền học phải đóng 
    if (txt_Fee == 1) {
        Ms += Fee;


    }


    // Số buổi nghỉ 
    if (txt_Class_Count == 1) {
        Ms += Class_count;

    }


    // học phí tăng thêm 
    if (txt_Fee_add == 1) {
        Ms += Fee_add;

    }


    // học phí giảm đi 
    if (txt_Fee_Minus == 0) {
        Ms += Fee_Minus;
        $("#txt_message_notificatio_fee_minus").val(1);
        document.getElementById('AddFeeMinusInMs').style.background = '#dc3545';
    }
    else {

        $("#txt_message_notificatio_fee_minus").val(0);
        document.getElementById('AddFeeMinusInMs').style.background = '#17a2b8';
    }

    // số buổi học khấu trừ 
    if (txt_claas_deduction == 1) {
        Ms += Claas_deduction;
    }


    // số tiền học khấu trừ 
    if (txt_Fee_deduction == 1) {
        Ms += Fee_deduction;
    }

    // số tiền học phải đóng 
    if (txt_Fee_total == 1) {
        Ms += Fee_total;
    }

    Ms = Ms + report;
    $("#txt_ms_fee").append(Ms);
}


// Phan Đình Kiên : Số buổi học được khấu trừ 
function AddDeductioninMs() {

    var Message_status = 'Thông báo đóng học phí [Tháng/Năm], \n';
    var Student_name = "Em : [Tên học sinh],  \n";
    var Fee = "Học phí : [Học phí],  \n";
    var Class_count = "Số buổi học : [Số buổi học],  \n";
    var Fee_add = "Học phí tăng thêm : [Học phí tăng thêm],  \n";
    var Fee_Minus = "Học phí giảm : [Học phí giảm], \n";
    var Claas_deduction = "Số buổi nghỉ khấu trừ : [Số buổi nghỉ khấu trừ],  \n";
    var Fee_deduction = "Số tiền được khấu trừ : [Số tiền được khấu trừ],  \n";
    var Fee_total = "Tổng tiền : [Tổng tiền],  \n";
    var report = "TTGS Trân trọng gửi tới gia đình....,  \n";

    // 
    var txt_Student_name = $("#txt_message_notificatio_student_name").val();
    var txt_Fee = $("#txt_message_notificatio_fee_basic").val();
    var txt_Class_Count = $("#txt_message_notificatio_class_count").val();
    var txt_Fee_add = $("#txt_message_notificatio_fee_add").val();
    var txt_Fee_Minus = $("#txt_message_notificatio_fee_minus").val();
    var txt_claas_deduction = $("#txt_message_notificatio_deduction").val();
    var txt_Fee_deduction = $("#txt_message_notificatio_deduction_fee").val();
    var txt_Fee_total = $("#txt_message_notificatio_fee_totol").val();


    $("#txt_ms_fee").empty();
    var Ms = Message_status;

    /// tên học sinh 
    if (txt_Student_name == 1) {
        Ms += Student_name;

    }

    // số tiền học phải đóng 
    if (txt_Fee == 1) {
        Ms += Fee;


    }


    // Số buổi nghỉ 
    if (txt_Class_Count == 1) {
        Ms += Class_count;

    }


    // học phí tăng thêm 
    if (txt_Fee_add == 1) {
        Ms += Fee_add;

    }


    // học phí giảm đi 
    if (txt_Fee_Minus == 1) {
        Ms += Fee_Minus;

    }


    // số buổi học khấu trừ 
    if (txt_claas_deduction == 0) {
        Ms += Claas_deduction;
        $("#txt_message_notificatio_deduction").val(1);
        document.getElementById('AddDeductioninMs').style.background = '#dc3545';
    }
    else {

        $("#txt_message_notificatio_deduction").val(0);
        document.getElementById('AddDeductioninMs').style.background = '#17a2b8';
    }


    // số tiền học khấu trừ 
    if (txt_Fee_deduction == 1) {
        Ms += Fee_deduction;
    }

    // số tiền học phải đóng 
    if (txt_Fee_total == 1) {
        Ms += Fee_total;
    }

    Ms = Ms + report;
    $("#txt_ms_fee").append(Ms);
}




// Phan Đình Kiên : Số buổi học được khấu trừ 
function AddFeeDeductioninMs() {


    var Message_status = 'Thông báo đóng học phí [Tháng/Năm], \n';
    var Student_name = "Em : [Tên học sinh],  \n";
    var Fee = "Học phí : [Học phí],  \n";
    var Class_count = "Số buổi học : [Số buổi học],  \n";
    var Fee_add = "Học phí tăng thêm : [Học phí tăng thêm],  \n";
    var Fee_Minus = "Học phí giảm : [Học phí giảm], \n";
    var Claas_deduction = "Số buổi nghỉ khấu trừ : [Số buổi nghỉ khấu trừ],  \n";
    var Fee_deduction = "Số tiền được khấu trừ : [Số tiền được khấu trừ],  \n";
    var Fee_total = "Tổng tiền : [Tổng tiền],  \n";
    var report = "TTGS Trân trọng gửi tới gia đình....,  \n";

    // 
    var txt_Student_name = $("#txt_message_notificatio_student_name").val();
    var txt_Fee = $("#txt_message_notificatio_fee_basic").val();
    var txt_Class_Count = $("#txt_message_notificatio_class_count").val();
    var txt_Fee_add = $("#txt_message_notificatio_fee_add").val();
    var txt_Fee_Minus = $("#txt_message_notificatio_fee_minus").val();
    var txt_claas_deduction = $("#txt_message_notificatio_deduction").val();
    var txt_Fee_deduction = $("#txt_message_notificatio_deduction_fee").val();
    var txt_Fee_total = $("#txt_message_notificatio_fee_totol").val();


    $("#txt_ms_fee").empty();
    var Ms = Message_status;

    /// tên học sinh 
    if (txt_Student_name == 1) {
        Ms += Student_name;

    }

    // số tiền học phải đóng 
    if (txt_Fee == 1) {
        Ms += Fee;


    }


    // Số buổi nghỉ 
    if (txt_Class_Count == 1) {
        Ms += Class_count;

    }


    // học phí tăng thêm 
    if (txt_Fee_add == 1) {
        Ms += Fee_add;

    }


    // học phí giảm đi 
    if (txt_Fee_Minus == 1) {
        Ms += Fee_Minus;

    }


    // số buổi học khấu trừ 
    if (txt_claas_deduction == 1) {
        Ms += Claas_deduction;

    }



    // số tiền học khấu trừ 
    if (txt_Fee_deduction == 0) {
        Ms += Fee_deduction;
        $("#txt_message_notificatio_deduction_fee").val(1);
        document.getElementById('AddFeeDeductioninMs').style.background = '#dc3545';
    }
    else {

        $("#txt_message_notificatio_deduction_fee").val(0);
        document.getElementById('AddFeeDeductioninMs').style.background = '#17a2b8';
    }

    // số tiền học phải đóng 
    if (txt_Fee_total == 1) {
        Ms += Fee_total;
    }

    Ms = Ms + report;
    $("#txt_ms_fee").append(Ms);
}

// Phan Đình Kiên : tổng tiền học viên phải nộp



// Phan Đình Kiên : Số buổi học được khấu trừ 
function AddSunFeeInMs() {


    var Message_status = 'Thông báo đóng học phí [Tháng/Năm], \n';
    var Student_name = "Em : [Tên học sinh],  \n";
    var Fee = "Học phí : [Học phí],  \n";
    var Class_count = "Số buổi học : [Số buổi học],  \n";
    var Fee_add = "Học phí tăng thêm : [Học phí tăng thêm],  \n";
    var Fee_Minus = "Học phí giảm : [Học phí giảm], \n";
    var Claas_deduction = "Số buổi nghỉ khấu trừ : [Số buổi nghỉ khấu trừ],  \n";
    var Fee_deduction = "Số tiền được khấu trừ : [Số tiền được khấu trừ],  \n";
    var Fee_total = "Tổng tiền : [Tổng tiền],  \n";
    var report = "TTGS Trân trọng gửi tới gia đình....,  \n";

    // 
    var txt_Student_name = $("#txt_message_notificatio_student_name").val();
    var txt_Fee = $("#txt_message_notificatio_fee_basic").val();
    var txt_Class_Count = $("#txt_message_notificatio_class_count").val();
    var txt_Fee_add = $("#txt_message_notificatio_fee_add").val();
    var txt_Fee_Minus = $("#txt_message_notificatio_fee_minus").val();
    var txt_claas_deduction = $("#txt_message_notificatio_deduction").val();
    var txt_Fee_deduction = $("#txt_message_notificatio_deduction_fee").val();
    var txt_Fee_total = $("#txt_message_notificatio_fee_totol").val();


    $("#txt_ms_fee").empty();
    var Ms = Message_status;

    /// tên học sinh 
    if (txt_Student_name == 1) {
        Ms += Student_name;

    }

    // số tiền học phải đóng 
    if (txt_Fee == 1) {
        Ms += Fee;


    }


    // Số buổi nghỉ 
    if (txt_Class_Count == 1) {
        Ms += Class_count;

    }


    // học phí tăng thêm 
    if (txt_Fee_add == 1) {
        Ms += Fee_add;

    }


    // học phí giảm đi 
    if (txt_Fee_Minus == 1) {
        Ms += Fee_Minus;

    }


    // số buổi học khấu trừ 
    if (txt_claas_deduction == 1) {
        Ms += Claas_deduction;

    }



    // số tiền học khấu trừ 
    if (txt_Fee_deduction == 1) {
        Ms += Fee_deduction;

    }


    // số tiền học phải đóng 
    if (txt_Fee_total == 0) {
        Ms += Fee_total;
        $("#txt_message_notificatio_fee_totol").val(1);
        document.getElementById('AddSunFeeInMs').style.background = '#dc3545';
    }
    else {

        $("#txt_message_notificatio_fee_totol").val(0);
        document.getElementById('AddSunFeeInMs').style.background = '#17a2b8';
    }

    Ms = Ms + report;
    $("#txt_ms_fee").append(Ms);
}


/*
 <input type="hidden" id="txt_message_notificatio_student_name"/>
                        <input type="hidden" id="txt_message_notificatio_fee_basic" />
                        <input type="hidden" id="txt_message_notificatio_class" />
                        <input type="hidden" id="txt_message_notificatio_fee_add" />
                        <input type="hidden" id="txt_message_notificatio_fee_minus" />
                        <input type="hidden" id="txt_message_notificatio_class_count" />
                        <input type="hidden" id="txt_message_notificatio_fee_totol" />

*/
var IDReview = 0;
function ShowFromReview(Id) {
    IDReview = Id;
    $("#Modal_type_message_notification").show();
}
function CloseReview() {
    $("#Modal_type_message_notification").hide();
}
function SeachReview() {
    var txt_count_list_review = $("#txt_count_list_review").val();
    var txt_page_list_review = $("#txt_page_list_review").val();

    if (txt_count_list_review == "") {
        txt_count_list_review = 10;
    }
    if (txt_page_list_review == "") {
        txt_page_list_review = 1;
    }

    if (txt_count_list_review != "" && txt_page_list_review != "") {
        $.ajax({
            url: "/Review/Seach",
            data: {
                Page: 1,
                Count: $("#txt_count_list_review").val(),
                StudentName: $("#txt_search_name_studient").val(),
                StartDate: $("#txt_search_start_date_review").val(),
                EndDate: $("#txt_search_end_date_review").val(),
                Type: $("#cmb_seach_Name_studient").val(),

            },
            success: function (result) {
                $("#Table_Review").html(result);

            }
        });
    }
}
$(document).ready(function () {


    $("#txt_count_list_review").change(function () {

        $.ajax({
            url: "/Review/Seach",
            data: {
                Page: 1,
                Count: $("#txt_count_list_review").val(),
                StudentName: $("#txt_search_name_studient").val(),
                StartDate: $("#txt_search_start_date_review").val(),
                EndDate: $("#txt_search_end_date_review").val(),
                Type: $("#cmb_seach_Name_studient").val(),

            },
            success: function (result) {
                $("#Table_Review").html(result);

            }
        });

    });




});


function GetReviewById(ID) {
    $.ajax({
        url: "/Review/GetById",
        data: { ID: ID },
        success: function (result) {
            $("#txtIDReview").val(result.ID);
            $("#txt_PARENT_NAME").val(result.PARENT_NAME);
            $("#txt_STUDENT_NAME").val(result.STUDENT_NAME);
            $("#txt_PHONE_PARENT").val(result.PHONE_PARENT);


            ///var dateString = "/Date(-62135596800000)/".substr(6);
            var dateString = result.CREATE_DATE.substr(6); // lấy giá trị từ vị trí thứ 6 

            var currentTime = new Date(parseInt(dateString));  // ép kiểu dạng chuối thành dạng date time 
            var month = currentTime.getMonth() + 1; // lấy ra tháng (tháng sau khi bị ép kiểu chậm hơn tháng chuyền vào một tháng)
            var day = currentTime.getDate(); // lấy ra ngày 
            var year = currentTime.getFullYear(); // lấy ra năm 
            var date = day + "/" + month + "/" + year;
            $("#txtDATETIME").val(date);

            $("#text_NOTE").val(result.NOTE);


            $("#Modal_type_message_notification").show();
        }
    });

}

/// Phan Đình Kiên : cập nhập lại trạng thái của yêu cầu 
function EditReview() {


    $.ajax({
        url: "/Review/UpdateStatus",
        data: {
            Id: $("#txt_value_update_satust_review").val(),
            Status: $("#txt_id_update_satust_review").val(),
        },
        success: function (result) {
            if (result == 1) {
                var txt_count_list_review = $("#txt_count_list_review").val();
                var txt_page_list_review = $("#txt_page_list_review").val();
                // Tiến hành load lại trang 
                if (txt_count_list_review != "" && txt_page_list_review != "") {
                    $.ajax({
                        url: "/Review/Seach",
                        data: {
                            Page: txt_page_list_review,
                            Count: txt_count_list_review,
                            StudentName: $("#txt_search_name_studient").val(),
                            StartDate: $("#txt_search_start_date_review").val(),
                            EndDate: $("#txt_search_end_date_review").val(),
                            Type: $("#cmb_seach_Name_studient").val(),

                        },
                        success: function (result) {
                            $("#Table_Review").html(result);
                            swal("Thông Báo!", "Cập nhập thành công ý kiến đề xuất", "success");
                            $("#Modal_Update_review").hide();
                        }
                    });
                }

                GetReviewById(ID);

            }


        }
    });
}
function SeachMessage() {
    var txt_count_list_message = $("#txt_count_list_message").val();
    var txt_page_list_message = $("#txt_page_list_message").val();

    if (txt_count_list_message == "") {
        txt_count_list_message = 10;
    }
    if (txt_page_list_message == "") {
        txt_page_list_message = 1;
    }

    if (txt_count_list_message != "" && txt_page_list_message != "") {
        $.ajax({
            url: "/Message/Seach",
            data: {
                Page: 1,
                Count: $("#txt_count_list_message").val(),
                StudentName: $("#txt_Search_StudentName_Message").val(),
                Status: $("#txt_Search_Status_Message").val(),
                Type_Message: $("#txt_Search_Type_Message_Message").val(),
                Type_Content: $("#txt_Search_Type_Content_Message").val(),

            },
            success: function (result) {
                $("#Table_Messenge").html(result);

            }
        });
    }
}
$(document).ready(function () {


    $("#txt_count_list_message").change(function () {

        $.ajax({
            url: "/Message/Seach",
            data: {
                Page: 1,
                Count: $("#txt_count_list_message").val(),
                StudentName: $("#txt_Search_StudentName_Message").val(),
                Status: $("#txt_Search_Status_Message").val(),
                Type_Message: $("#txt_Search_Type_Message_Message").val(),
                Type_Content: $("#txt_Search_Type_Content_Message").val(),


            },
            success: function (result) {
                $("#Table_Messenge").html(result);

            }
        });

    });




});


function LoadCheckBoxMessage() {

    $("#CheckBookAll").click(function () {
        if ($(this).is(":checked")) {
            $(".MessageCheckbox").prop('checked', true);
        }
        else {
            $(".MessageCheckbox").prop('checked', false);
        }
    });
}




//$(document).ready(function () {
//    $('#example').DataTable({
//        "scrollY": 200,
//        "scrollX": true
//    });
//});



















// Hiển thị trạng thái làm việc của giáo viên trên ô tìm kiếm 
function GetValueSeachNameTeacher() {
    var x = document.getElementById("cb_seach_sattus_teacher").getAttribute("value");
    $("cb_seach_sattus_teacher").val(x);
}

// hiển thị thông tin tim kiếm của bộ môn giảng dạy 
function GetValueSeachSubjectTeacher() {
    var x = document.getElementById("cb_seach_subject_teacher").getAttribute("value");
    $("cb_seach_subject_teacher").val(x);
}




//-------------------------------------------------------------------------Thông tin học viên theo lớp -----------------------------------------------
// load checkbook thông tin của học viên theo lớp 

function LoadCheckBoxStudentClass() {

    $("#CheckBookStudentClassAll").click(function () {
        if ($(this).is(":checked")) {
            $(".StudentClassCheckbox").prop('checked', true);
        }
        else {
            $(".StudentClassCheckbox").prop('checked', false);
        }
    });
}

// tìm kiếm thông tin của học viên theo lớp học 
function SeachStudentClass() {

    $.ajax({
        url: "/ClassStudent/Seach",
        data: {
            Page: 1,
            Count: $("#txt_count_student_class").val(),
            ClassId: $("#txt_seach_class_student_by_class").val(),
            StudentName: $("#txt_seach_class_by_student_name").val(),
            Status: $("#txt_seach_class_student_by_status").val(),
            StartDate: $("#txt_seach_start_date_in_student_class").val(),
            EndDate: $("#txt_seach_end_date_in_student_class").val(),
            Subject: "",
        },
        success: function (result) {
            $("#Table_ClassTeacher").html(result);
            LoadCheckBoxStudentClass();
        }
    });



}
function ExprotClassStudent() {

    var ClassId = $("#txt_seach_class_student_by_class").val();
    var StudentName = $("#txt_seach_class_by_student_name").val();
    var Status = $("#txt_seach_class_student_by_status").val();
    var StartDate = $("#txt_seach_start_date_in_student_class").val();
    var EndDate = $("#txt_seach_end_date_in_student_class").val();
    var Subject = "";

    setTimeout(function () {
        window.location = "/ClassStudent/ExportBill?ClassId=" + ClassId + "&StudentName=" + StudentName + "&Status=" + Status + "&StartDate=" + StartDate + "&EndDate=" + EndDate + "&Subject=" + Subject;
    }, 100);
    //int? ClassId, string StudentName, byte? Status, DateTime? StartDate, DateTime? EndDate, string Subject

}






// Phan Đình kiên : xóa nhiều thông tin học viên cùng một lúc 
function DeleteListStudenClass() {

    var myArray = "";
    $('#list_studen_class input[type=checkbox]').each(function () {
        if (this.checked) {
            myArray = myArray + $(this).val() + ":";
        }
    });

    $.ajax({
        url: "/ClassStudent/DeleteList",
        data: {
            ListID: myArray
        },
        success: function (result) {
            if (result == 1) {

                $.ajax({
                    url: "/ClassStudent/Seach",
                    data: {
                        Page: $("#txt_page_student_class").val(),
                        Count: $("#txt_count_student_class").val(),
                        ClassId: $("#txt_seach_class_student_by_class").val(),
                        StudentName: $("#txt_seach_class_by_student_name").val(),
                        Status: $("#txt_seach_class_student_by_status").val(),
                        StartDate: $("#txt_seach_start_date_in_student_class").val(),
                        EndDate: $("#txt_seach_end_date_in_student_class").val(),
                        Subject: "",
                    },
                    success: function (result) {
                        $("#Table_ClassTeacher").html(result);
                        LoadCheckBoxStudentClass();
                    }
                });


                swal("Thông Báo!", "Xóa thành công học sinh trong lớp học ", "success");
            }
            if (result == 0) {

                swal("Thông báo", "(Xóa không thành công học sinh trong lớp học)", "error");
            }
            else if (result == -1) {
                swal("Thông báo", "(Bạn không có quyền xóa học sinh trong lớp học)", "error");
            }
            else if (result == -2) {
                swal("Thông báo", "(bạn phải chọn học viên trước khi xóa )", "error");
            }
            $("#Modal_Del_Student_Class").hide();
        }
    });
}


function CheckRoleUserInStudentClass() {
    var role = $("#txt_role_user_student_class").val();


}

$(document).ready(function () {
    LoadCheckBoxStudentClass();

    CheckRoleUserInStudentClass();

    $("#txt_count_student_class").change(function () {

        $.ajax({
            url: "/ClassStudent/Seach",
            data: {
                Page: 1,
                Count: $("#txt_count_student_class").val(),
                ClassId: $("#txt_seach_class_student_by_class").val(),
                StudentName: $("#txt_seach_class_by_student_name").val(),
                Status: $("#txt_seach_class_student_by_status").val(),
                StartDate: $("#txt_seach_start_date_in_student_class").val(),
                EndDate: $("#txt_seach_end_date_in_student_class").val(),
                Subject: "",
            },
            success: function (result) {
                $("#Table_ClassTeacher").html(result);
                LoadCheckBoxStudentClass();
            }
        });

    });


    //  LoadSchedule();
});

$(document).ready(function () {




    GetValueSeachNameTeacher();
    GetValueEditSubjectTeacher();


});

/// thông tin thống kê học viên tăng giảm của trung tâm 

$(document).ready(function () {

    LoadCheckAscOrDescStudent();

    // thông tin phân trang 
    $("#txt_count_list_AscOrDescStudent").change(function () {
        $.ajax({
            url: "/Parent/SeachAscOrDescStudent",
            data: {
                page: 1,
                Count: $("#txt_count_list_AscOrDescStudent").val(),
                StartDate: $("#txt_seach_startdate_in_AscOrDescStudent").val(),
                EndDate: $("#txt_seach_endate_in_AscOrDescStudent").val()
            },
            success: function (result) {
                $("#table_AscOrDescStudent").html(result);
                LoadCheckAscOrDescStudent();
            }
        });
    });





});

//Phan Đình Kiên : load check thông tin học viên tăng giảm  
function LoadCheckAscOrDescStudent() {

    $("#CheckBookAllAscOrDescStudent").click(function () {
        if ($(this).is(":checked")) {
            $(".AscOrDescStudentCheckbox").prop('checked', true);
        }
        else {
            $(".AscOrDescStudentCheckbox").prop('checked', false);
        }
    });
}

// Phan Đình Kiên : tìm kiếm thông tin báo cáo học viên tăng giảm
function SeachAscOrDescStudent() {
    $.ajax({
        url: "/Parent/SeachAscOrDescStudent",
        data: {
            page: 1,
            Count: $("#txt_count_list_AscOrDescStudent").val(),
            StartDate: $("#txt_seach_startdate_in_AscOrDescStudent").val(),
            EndDate: $("#txt_seach_endate_in_AscOrDescStudent").val()
        },
        success: function (result) {
            $("#table_AscOrDescStudent").html(result);
            LoadCheckAscOrDescStudent();
        }
    });
}

function ExportBillascOrDescStudent() {

    var StartDate = $("#txt_seach_startdate_in_AscOrDescStudent").val();
    var EndDate = $("#txt_seach_endate_in_AscOrDescStudent").val()

    setTimeout(function () {
        window.location = "/Parent/ExportBillascOrDescStudent?StartDate=" + StartDate + "&EndDate=" + EndDate;
    }, 100);


}

//---------------------------------------------------------------------Load danh sách điểm danh----------------------------------------------


// Phan Đình Kiên : Tìm kiếm thông tin thời khóa biểu của hệ thông 

function SeachSchudle() {
    $.ajax({
        url: "/SchoolCalendarInformation/Seach",
        data: {

            BranchId: $("#search_Schedule_by_branch").val(),
            ClassId: $("#search_Schedule_by_class").val()
        },
        success: function (result) {
            $("#Table_SchoolCalendarInformation").html(result);
        }
    });

}

//  Phan Đình Kiên : onchange thông tin lớp học theo cơ sở 
function SeachClassByBranchInSchudle(obj) {

    if (obj.text == '---Tất cả---') {
        $('#search_Schedule_by_class').empty();
        $('#search_Schedule_by_class').append('<option>---Tất cả---</option>');

        $.ajax({
            url: "/Class/GetSelectClass",
            success: function (result) {
                $.each(result, function (i, result) {
                    $('#search_Schedule_by_class').append($('<option>', {
                        value: result.CLASS_ID,
                        text: result.CLASS_NAME
                    }));

                });
            }
        });
    }

    else {
        $.ajax({
            url: "/Class/GetClasByBranch",
            data: { ID: obj.value },
            success: function (result) {

                $('#search_Schedule_by_class').empty();
                $('#search_Schedule_by_class').append('<option>---Tất cả---</option>');
                $.each(result, function (i, result) {

                    $('#search_Schedule_by_class').append($('<option>', {
                        value: result.ID,
                        text: result.NAME
                    }));
                });

            }

        });
    }

}


//------------------------------------------------------------------------- Chi tiết điểm danh theo học sinh --------------------------------



// onchange chi tiết điểm danh của học viên 
$(document).ready(function () {


    // thông tin phân trang 
    $("#txt_count_absent_detail_by_student").change(function () {
        var txt_count_list_absentDetail = $("#txt_count_absent_detail_by_student").val();
        var txt_page_list_absentDetail = $("#txt_page_list_absent_detail").val();

        if (txt_count_list_absentDetail == "") {
            txt_count_list_absentDetail = 10;
        }
        if (txt_page_list_absentDetail == "") {
            txt_page_list_absentDetail = 1;
        }
        $.ajax({
            url: "/AbsentDetail/Seach",
            data: {
                Page: txt_page_list_absentDetail,
                Count: txt_count_list_absentDetail,
                StartDate: $("#txt_seach_absent_detail_by_start_time").val(),
                EndDate: $("#txt_seach_absent_detail_by_end_time").val(),
                BranchId: $("#txt_seach_absent_detail_by_branch").val(),
                StudentName: $("#txt_seach_absent_detail_by_student_name").val(),
                ClassName: $("#txt_seach_absent_detail_by_class").val(),
                NoVacation: $("#txt_seach_absent_detail_by_NoVacation").val(),
            },
            success: function (result) {
                $("#Table_AbsentByStudent").html(result);
            }
        });
    });

});

//Phan Đình Kiên : Tìm kiếm chi tiết điểm danh của học viên 
function SeachAbsentDetail() {

    var txt_count_list_absentDetail = $("#txt_count_absent_detail_by_student").val();
    var txt_page_list_absentDetail = $("#txt_page_list_absent_detail").val();

    if (txt_count_list_absentDetail == "") {
        txt_count_list_absentDetail = 10;
    }
    if (txt_page_list_absentDetail == "") {
        txt_page_list_absentDetail = 1;
    }
    $.ajax({
        url: "/AbsentDetail/Seach",
        data: {
            Page: 1,
            Count: txt_count_list_absentDetail,
            StartDate: $("#txt_seach_absent_detail_by_start_time").val(),
            EndDate: $("#txt_seach_absent_detail_by_end_time").val(),
            BranchId: $("#txt_seach_absent_detail_by_branch").val(),
            StudentName: $("#txt_seach_absent_detail_by_student_name").val(),
            ClassName: $("#txt_seach_absent_detail_by_class").val(),
            NoVacation: $("#txt_seach_absent_detail_by_NoVacation").val(),

        },
        success: function (result) {
            $("#Table_AbsentByStudent").html(result);
        }
    });
}

function EditAbsentDetail() {
    var Page = $("#page_list_absent_detail_in_edit_absent").val();
    var Count = $("#count_list_absent_detail_in_edit_absent").val();
    var student_name = $("#student_list_absent_detail_in_edit_absent").val();
    var class_name = $("#class_list_absent_detail_in_edit_absent").val();
    var branch_id = $("#branch_list_absent_detail_in_edit_absent").val();
    var no_vacation = $("#no_vacation_list_absent_detail_in_edit_absent").val();
    var start_time = $("#start_time_list_absent_detail_in_edit_absent").val();
    var end_time = $("#end_time_list_absent_detail_in_edit_absent").val();

    if (Page == "") {
        Page = 1;
    }

    if (Count == "") {
        Count = 10;
    }
    window.location = "/AbsentDetail/ListAbsentDetail?Page=" + Page + "&Count=" + Count + "&StartDate=" + start_time + "&EndDate=" + end_time + "&BranchId=" + branch_id + "&StudentName=" + student_name + "&ClassName=" + class_name + "&NoVacation=" + no_vacation;

}



$(document).ready(function () {

    var typeSendNews = $("#txt_update_salary_by_status").attr("value");
    setTimeout(function () {
        $("#txt_update_salary_by_status option").each(function () {
            if (typeSendNews == $(this).val()) {
                $(this).attr('selected', 'selected');
            }
        });
    }, 1000);


    $(".Hunter-clean-btn").hide();


})



/// thông tin ý kiến đề xuât 

function UpdateStatusReview() {
    $.ajax({
        url: "/Review/UpdateStatus",
        data: {
            ID: $("#txt_id_update_satust_salry").val(),
            Status: $("#txt_value_update_satust_salry").val(),
        },
        success: function (result) {
            if (result == 1) {
                swal("Thông Báo!", "Cập nhập thành công trạng thái lương của giáo viên", "success");
                CloseStatusSalary()
            }

            if (result == -1) {
                swal("Thông Báo!", "Bạn không có quyền cập nhập trạng thái lương của giáo viên", "error");
                CloseStatusSalary()
            }

            if (result == 0) {
                swal("Thông Báo!", "Cập nhập không thành công trạng thái lương của giáo viên", "error");
                CloseStatusSalary()
            }
        }
    });
}



$(document).ready(function () {


    $('.datetimepickers').datetimepicker({
        format: 'd/m/Y',
        timepicker: false,
        lang: 'vi'
        //inline: true
    });


    $('.datetimepickers3').datetimepicker({
        format: 'd/m/Y H:i',
        timepicker: true,
        lang: 'vi'
        //inline: true
    });

    //check 
    $("#checkMasseger").click(function () {
        if ($(this).is(":checked")) {
            $("#AddStudentInMs").attr("disabled", true);
            $("#AddFeeinMs").attr("disabled", true);
            $("#AddCountClassInMs").attr("disabled", true);
            $("#AddFeeAddinMs").attr("disabled", true);
            $("#AddFeeMinusInMs").attr("disabled", true);
            $("#AddDeductioninMs").attr("disabled", true);
            $("#AddFeeDeductioninMs").attr("disabled", true);
            $("#AddSunFeeInMs").attr("disabled", true);
            $("#txt_ms_fee").attr("disabled", false);
      
        }
        else {

        }
    });

});


function SendMessMaseage() {
    $.ajax({
        url: "/Fee/SendMessMaseage",

        data: {
            ListID: $("#txt_id_ListMess").val(),
        },
        success: function (result) {

            if (result.Status = 1) {
                window.location = '/Fee/OnLoadSendMess';
            }
        }
    });
}


function ShowIdMess() {
    var myArray = "";
    $('#ListMess input[type=checkbox]').each(function () {
        if (this.checked) {
            myArray = myArray + $(this).val() + ":";
        }
    });

    if (myArray == "") {
        swal("Thông báo", "(bạn cần chọn danh sách học viên cần gửi tin nhắn)", "error");
    }
    else {

        $("#txt_id_ListMess").val(myArray);
        $("#Modal_Add_List_Mess").show();
    }
}

function Close_Modal_Add_List_Mess() {
    $("#Modal_Add_List_Mess").hide();
}



function ShowSaveListImage() {
    var myArray = "";
    $('#ListMess input[type=checkbox]').each(function () {
        if (this.checked) {
            myArray = myArray + $(this).val() + ":";
        }
    });

    if (myArray == "") {
        swal("Thông báo", "(bạn cần chọn danh sách học viên cần gửi tin nhắn)", "error");
    }
    else {

        $("#txt_id_Add_ListMess").val(myArray);
        $("#Modal_Save_List_Mess").show();
    }
}

function SaveListMess() {
    $.ajax({
        url: "/Fee/SaveListMess",

        data: {
            ListID: $("#txt_id_Add_ListMess").val(),
        },
        success: function (result) {

            if (result.Status = 1) {
                swal("Thông Báo!", result.Message, "success");
                window.location = "/Message/index";
            }
            else if (result.Status = -1) {
                swal("Thông Báo!", result.Message, "error");
            }
            $("#Modal_Save_List_Mess").hide();
        }
    });
}



function ShowIdSendMess() {
    var myArray = "";
    $('#ListMessage input[type=checkbox]').each(function () {
        if (this.checked) {
            myArray = myArray + $(this).val() + ":";
        }
    });

    if (myArray == "") {
        ShowIdSendMess
        swal("Thông báo", "(bạn cần chọn danh sách học viên cần gửi tin nhắn)", "error");
    }
    else {

        $("#txt_id_ListMess").val(myArray);
        $("#Modal_Add_List_Mess").show();
    }
}



function SendMessMaseages() {
    $.ajax({
        url: "/Message/ListSendMess",

        data: {
            ListID: $("#txt_id_ListMess").val(),
        },
        success: function (result) {

            if (result.Status = 1) {
                window.location = '/Message/OnLoadSendMess';
            }
        }
    });
}


/// Phan Đình Kiên : Tiến hành gửi tin nhắn chung tới phụ huynh 

function ShowSendMessParent() {
    var myArray = "";
    $('#list_studen_class input[type=checkbox]').each(function () {
        if (this.checked) {
            myArray = myArray + $(this).val() + ":";
        }
    });

    if (myArray == "") {
        ShowIdSendMess
        swal("Thông báo", "(bạn cần chọn danh sách học viên cần gửi thông báo)", "error");
    }
    else {

        $("#txt_list_id_perent").val(myArray);
        $("#Modal_Mess").show();
    }
}


function Close_Modal_Mess() {
    $("#Modal_Mess").hide();
}



//Format money in textbox
function cms_encode_currency_format(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function cms_decode_currency_format(obs) {
    if (obs == '')
        return 0;
    else
        return parseInt(obs.replace(/,/g, ''));
}




// tiến hành lấy ra danh sách tin nhăn cần xóa 
function ShowListIdDelMess() {
    var myArray = "";
    $('#ListMessage input[type=checkbox]').each(function () {
        if (this.checked) {
            myArray = myArray + $(this).val() + ":";
        }
    });

    if (myArray == "") {
        swal("Thông báo", "(Bạn cần chọn dánh sách tin nhắn cần xóa)", "error");
    }
    else {

        $("#txt_id_Del_ListMess").val(myArray);
        $("#Modal_Del_Message").show();
    }
}



function DeleteListMessage() {

    $.ajax({
        url: "/Message/DeleteList",
        data: {
            ListID: $("#txt_id_Del_ListMess").val()
        },
        success: function (result) {
            if (result == 1) {


                $("#Modal_Message").hide();
                swal("Thông Báo!", "Xóa thành công danh sách tin nhắn", "success");

                var txt_count_list_message = $("#txt_count_list_message").val();
                var txt_page_list_message = $("#txt_page_list_message").val();
                // Tiến hành load lại trang 
                if (txt_count_list_message != "" && txt_page_list_message != "") {
                    $.ajax({
                        url: "/Message/Seach",
                        data: {
                            Page: txt_page_list_message,
                            Count: txt_count_list_message,
                            StudentName: $("#txt_Search_StudentName_Message").val(),
                            Status: $("#txt_Search_Status_Message").val(),
                            Type_Message: $("#txt_Search_Type_Message_Message").val(),
                            Type_Content: $("#txt_Search_Type_Content_Message").val(),
                        },
                        success: function (result) {
                            $("#Table_Messenge").html(result);
                            LoadCheckBoxMessage();
                            $("#Modal_Del_Message").hide();
                        }
                    });
                }
            }
            if (result == 0) {

                swal("Thông báo", "(Xóa không thành công danh sách tin nhắn)", "error");
            }
            else if (result == -1) {
                swal("Thông báo", "(Bạn không có quyền xóa danh sách tin nhắn)", "error");
            }
            else if (result == -2) {
                swal("Thông báo", "(Bạn cần phải chọn học viên cần xóa)", "error");
            }
        }
    });
}




function ShowSenMessGeneral() {
    var myArray = "";
    $('#list_studen_class input[type=checkbox]').each(function () {
        if (this.checked) {
            myArray = myArray + $(this).val() + ":";
        }
    });
    $("#txt_ms_parent_genaral").val("");
    if (myArray == "") {
        // ShowIdSendMess
        swal("Thông báo", "(bạn cần chọn danh sách học viên cần gửi thông báo)", "error");
    }
    else {

        $("#txt_list_id_general_perent").val(myArray);
        $("#Modal_Mess_general_perent").show();
    }
}


function Close_Modal_General() {
    $("#Modal_Mess_general_perent").hide();
}

function AddListMessGeneral() {
    $.ajax({
        url: "/ClassStudent/AddListIdStudent",
        type: "POST",
        data: {
            ListID: $("#txt_list_id_general_perent").val(), //
            Content: $("#txt_ms_parent_genaral").val(),
            type_mess: $("#txt_type_content_genaral").val(),
        },
        success: function (result) {
            if (result == 1) {
                window.location = "/ClassStudent/OnLoadSendMess";
            }
        }
    });
}


function viewExport() {
    $("#Modal_Thongbao").show();
}




$(document).ready(function () {

    $("#Export").off('click').on('click', function (e) {
        e.preventDefault();


        $.ajax({
            url: "/Absent/Exprot",
            success: function (result) {
                $("#Export1").html(result[0]);
                $("#Export2").html(result[1]);
                $("#Export3").html(result[2]);

            }
        });




        $("#Modal_Thongbao").show();
    });

});


function SeachFeeMonth() {

    $.ajax({
        url: "/Fee/SeachStatusticianFee",
        data: {
            Page: $("#txt_page_seach_statisti_fee").val(),
            Count: $("#txt_count_seach_statisti_fee").val(),
            ClassID: $("#seach_fee_by_class").val(),
            StudentID: $("#seach_fee_by_student").val(),
        },
        success: function (result) {
            $("#Table_Monthly_fee").html(result);
        }
    });

}


function ExprotAbsentDetail() {

    var BRANCH_ID = $("#txt_seach_barch_id_in_absent").val();
    var CLASS_ID = $("#txt_seach_class_name_in_absent").val();
    var END_DATE = $("#txt_seach_end_date_in_absent").val();
    var START_DATE = $("#txt_seach_start_date_in_absent").val();
    var STATUS = $("#txt_seach_status_in_absent").val();
    var TEACHER_NAME = $("#txt_seach_teacher_in_absent").val();
    window.location = "/Absent/ExportBill?BRANCH_ID=" + BRANCH_ID + "&CLASS_ID=" + CLASS_ID + "&END_DATE=" + END_DATE + "&START_DATE=" + START_DATE + "&STATUS=" + STATUS + "&TEACHER_NAME=" + TEACHER_NAME;

}


function ExprotASC() {
    var Date = $("#txt_date_asc").val();
    var Type = $("#txt_type_asc").val();
    window.location = "/Parent/ExportASC?Date=" + Date + "&Type=" + Type;
}


function getListCenter() {
    $.ajax({
        url: "/Center/GetList",
        data: {
            Page: 1,
            CenterNameOrOwner: $("#center-name-owner").val(),
            ProvinceID: $("#cmb-province").val(),
            Phone: $("#txt-phone").val(),
            PackID: $("#cmb-pack").val()
        },
        method: "GET",
        success: function (response) {
            $("#list_data").html(response);
        }
    });
}
// thêm mới trung tâm
function createCenter() {
    $("#frm-create").validate({
        rules: {
            CODE: "required",
            NAME: "required",
            OWNER: "required",
            ADDRESS: "required",
            PHONE: {
                required: true,
                maxlength: 13,
                digits: true
            },
            EMAIL: {
                required: true,
                email: true
            }
        },
        messages: {
            CODE: "mã trung tâm là bắt buộc",
            NAME: "tên trung tâm là bắt buộc",
            OWNER: "chủ sở hữu là bắt buộc",
            ADDRESS: "địa chỉ là bắt buộc",
            PHONE: {
                required: "Số điện thoại là bắt buộc",
                maxlength: "chấp nhận tối đa là 13 số",
                digits: "chỉ chấp nhận số"
            },
            EMAIL: {
                required: "Email là bắt buộc",
                email: "Định dạng email"
            }
        },
        submitHandler: function () {
            $.ajax({
                url: "/Center/Create",
                data: $("#frm-create").serialize(),
                method: "POST",
                success: function (response) {
                    if (response == 1) {
                        swal({
                            title: "Thành Công !!",
                            text: "thêm mới thành công",
                            icon: "success",
                        });
                        $("#Modal_Create_Center").modal('hide');
                        setTimeout(function () {
                            getListCenter();
                        }, 1000);
                    }
                    else if (response == 2) {
                        swal({
                            title: "Lỗi !!",
                            text: "Tỉnh này đã có trung tâm",
                            icon: "warning",
                        });
                        $("#Modal_Create_Center").modal('hide');
                    }
                    else if (response == 3) {
                        swal({
                            title: "Lỗi !!",
                            text: "Đã tồn tại mã trung tâm",
                            icon: "warning",
                        });
                        $("#Modal_Create_Center").modal('hide');
                    }
                    else {
                        swal({
                            title: "Lỗi !!",
                            text: "Lỗi hệ thống",
                            icon: "warning",
                        });
                    }
                }
            });
        }
    });
}

function showEditCenter(id) {
    $.ajax({
        url: "/Center/ShowEdit",
        data: { id: id },
        method: "GET",
        success: function (response) {
            $("#show-edit-form").html(response);
            $("#Modal_Edit_Center").modal("show");
        }
    });
}

function saveEditCenter() {
    $("#frm-edit").validate({
        rules: {
            CODE: "required",
            NAME: "required",
            OWNER: "required",
            ADDRESS: "required",
            PHONE: {
                required: true,
                maxlength: 13,
                digits: true
            },
            EMAIL: {
                required: true,
                email: true
            }
        },
        messages: {
            CODE: "mã trung tâm là bắt buộc",
            NAME: "tên trung tâm là bắt buộc",
            OWNER: "chủ sở hữu là bắt buộc",
            ADDRESS: "địa chỉ là bắt buộc",
            PHONE: {
                required: "Số điện thoại là bắt buộc",
                maxlength: "chấp nhận tối đa là 13 số",
                digits: "chỉ chấp nhận số"
            },
            EMAIL: {
                required: "Email là bắt buộc",
                email: "Định dạng email"
            }
        },
        submitHandler: function () {
            $.ajax({
                url: "/Center/SaveEdit",
                data: $("#frm-edit").serialize(),
                method: "POST",
                success: function (response) {
                    if (response == 1) {
                        swal({
                            title: "Thành Công !!",
                            text: "chỉnh sửa thành công",
                            icon: "success",
                        });
                        $("#Modal_Edit_Center").modal('hide');
                        setTimeout(function () {
                            getListCenter();
                        }, 1000);
                    }
                    else if (response == 2) {
                        swal({
                            title: "Lỗi !!",
                            text: "Tỉnh này đã có trung tâm",
                            icon: "warning",
                        });
                        $("#Modal_Edit_Center").modal('hide');
                    }
                    else if (response == 3) {
                        swal({
                            title: "Lỗi !!",
                            text: "Đã tồn tại mã trung tâm",
                            icon: "warning",
                        });
                        $("#Modal_Edit_Center").modal('hide');
                    }
                    else {
                        swal({
                            title: "Lỗi !!",
                            text: "Lỗi hệ thống",
                            icon: "warning",
                        });
                    }
                }
            });
        }
    });
}

function deleteCenter(id) {
    swal({
        title: "Delete",
        text: "bạn chắc muốn xóa chứ ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "/Center/Delete",
                data: { id: id },
                method: "POST",
                success: function (response) {
                    if (response == 1) {
                        swal({
                            title: "Thành Công !!",
                            text: "xóa thành công",
                            icon: "success",
                        });
                        setTimeout(function () {
                            getListCenter();
                        }, 1000);
                    }
                    else {
                        swal({
                            title: "Lỗi !!",
                            text: "Lỗi hệ thống",
                            icon: "warning",
                        });
                    }
                }
            });
        } else {
            swal("Dữ liệu được bảo toàn");
        }
    });
}

function getListPack() {
    $val = cms_decode_currency_format($("#txt-pack-price").val());
    if ($val == 0) {
        $val = '';
    }
    $.ajax({
        url: "/Pack/GetList",
        data: {
            Page: 1,
            Name: $("#txt-pack-name").val().trim(),
            StartQTY: $("#txt-start-qty").val().trim(),
            EndQTY: $("#txt-end-qty").val().trim(),
            Price: $val
        },
        method: "GET",
        success: function (response) {
            $("#list_response").html(response);
        }
    });
}

function createPack() {
    $("#frm-create").validate({
        rules: {
            NAME: "required",
            CLASS_QTY: {
                required: true,
                min: 0,
                digits: true
            },
            Price_Screen: {
                required: true,
            },
        },
        messages: {
            NAME: "tên gói là bắt buộc",
            CLASS_QTY: {
                required: "Số lượng lớp là bắt buộc",
                digits: "chỉ chấp nhận số"
            },
            Price_Screen: {
                required: "Giá tiền là bắt buộc",
            }
        },
        submitHandler: function () {
            $.ajax({
                url: "/Pack/Create",
                data: $("#frm-create").serialize(),
                method: "POST",
                success: function (response) {
                    if (response == 1) {
                        swal({
                            title: "Thành Công !!",
                            text: "thêm mới thành công",
                            icon: "success",
                        });
                        $("#Modal_Create_Pack").modal('hide');
                        setTimeout(function () {
                            getListPack();
                        }, 1000);
                    }
                    else {
                        swal({
                            title: "Lỗi !!",
                            text: "Lỗi hệ thống",
                            icon: "warning",
                        });
                    }
                }
            });
        }
    });
}

function showEditPack(id) {

    $.ajax({
        url: "/Pack/ShowEdit",
        data: { id: id },
        method: "GET",
        success: function (response) {
            $("#show-edit-form").html(response);
            $val = cms_encode_currency_format($("#txtPackPriceEdit").val());
            $("#txtPackPriceEdit").val($val);
            $("#Modal_Edit_Pack").modal("show");
        }
    });
}

function saveEditPack() {
    $("#frm-edit").validate({
        rules: {
            NAME: "required",
            CLASS_QTY: {
                required: true,
                min: 0,
                digits: true
            },
            Price_Screen: {
                required: true,
            },
        },
        messages: {
            NAME: "tên gói là bắt buộc",
            CLASS_QTY: {
                required: "Số lượng lớp là bắt buộc",
                min: "số lượng lớp >= 0",
                digits: "chỉ chấp nhận số"
            },
            Price_Screen: {
                required: "Giá tiền là bắt buộc",
            }
        },
        submitHandler: function () {
            $.ajax({
                url: "/Pack/SaveEdit",
                data: $("#frm-edit").serialize(),
                method: "POST",
                success: function (response) {
                    if (response == 1) {
                        swal({
                            title: "Thành Công !!",
                            text: "chỉnh sửa thành công",
                            icon: "success",
                        });
                        $("#Modal_Edit_Pack").modal('hide');
                        setTimeout(function () {
                            getListPack();
                        }, 1000);
                    }
                    else {
                        swal({
                            title: "Lỗi !!",
                            text: "Lỗi hệ thống",
                            icon: "warning",
                        });
                    }
                }
            });
        }
    });
}
function SeachSubject() {
    var sss = $("#txt_search_create_date").val();
    var txt_count_list_Subject = $("#txt_count_list_Subject").val();
    var txt_page_list_Subject = $("#txt_page_list_Subject").val();

    if (txt_count_list_Subject == "") {
        txt_count_list_Subject = 10;
    }
    if (txt_page_list_Subject == "") {
        txt_page_list_Subject = 1;
    }

    if (txt_count_list_Subject != "" && txt_page_list_Subject != "") {
        $.ajax({
            url: "/Subject/Seach",
            data: {
                Page: 1,
                Count: $("#txt_count_list_Subject").val(),

                NAME: $("#txt_search_name_Subject").val(),

                CODE_CENTER: $("#txt_search_name_Center").val(),
                CREATE_DATE: $("#txt_search_create_date").val(),



            },
            success: function (result) {
                $("#Table_Subject").html(result);

            }
        });
    }
}
$(document).ready(function () {


    $("#txt_count_list_Subject").change(function () {

        $.ajax({
            url: "/Subject/Seach",
            data: {
                Page: 1,
                Count: $("#txt_count_list_Subject").val(),

                NAME: $("#txt_search_name_Subject").val(),

                CODE_CENTER: $("#txt_search_name_Center").val(),
                CREATE_DATE: $("#txt_search_create_date").val(),
            },
            success: function (result) {
                $("#Table_Subject").html(result);

            }
        });

    });
});
function EditSubject() {
    var txt_Edit_Name = $('#txt_Edit_Name').val();
    var txt_Edit_NamCenter = $('#txt_Edit_NamCenter').val();



    if (txt_Edit_Name == "") {
        swal("Thông báo", "(Tên môn học không được để trống)", "error");
    }
    else if (txt_Edit_NamCenter == "--lựa chọn--") {

        swal("Thông báo", "(Tên trung tâm không được để trống)", "error");
    }
    else {
        $.ajax({
            url: "/Subject/Edit",
            data: $("#Form_EditSubject").serialize(),
            success: function (result) {
                if (result == 1) {
                    $("#Modal_Edit_Subject").hide();
                    swal("Thông Báo!", "Cập nhập thành công môn học  ", "success");
                    SeachSubject();
                }
                else if (result == 0) {
                    swal("Thông báo", "(cập nhật không thành công)", "error");

                }
                else if (result == -1) {
                    swal("Thông báo", "(Bạn không có quyền cập nhật thông tin bậc lương của giáo viên)", "error");
                }
                else if (result == -3) {
                    swal("Thông báo", "(Tên môn họ, tên trung tâm đã tồn tại)", "error");
                }

            }
        });
    }
}
function ShowFromSubject(Id) {
    IDDeleteonRoom = Id;
    $("#Modal_Del_Subject").show();
}
function GetValueSeachSubjectTeacher() {
    var x = document.getElementById("cb_seach_subject_teacher").getAttribute("value");
    $("cb_seach_subject_teacher").val(x);
}
function LoadSelectCenter() {

    $.ajax({
        url: "/Center/GetAlls",
        success: function (result) {
            $.each(result, function (i, result) {
                $('.Select_Center').append($('<option>', {
                    value: result.CODE,
                    text: result.NAME
                }));

            });
        }
    });
}
$(document).ready(function () {


    LoadSelectCenter();
});
function LoadSelectCenters() {

    $.ajax({
        url: "/Center/GetAlls",
        success: function (result) {
            $.each(result, function (i, result) {
                $('.Select_Centers').append($('<option>', {
                    value: result.ID,

                    text: result.NAME
                }));

            });
        }
    });
}
$(document).ready(function () {


    LoadSelectCenters();
});

function AddSubject() {
    var txt_AddName = $('#txt_AddName').val();
    var txt_Add_NamCenter = $('#txt_Add_NamCenter').val();
    if (txt_AddName == "") {
        swal("Thông báo", "(Tên môn học không được để trống)", "error");
    } if (txt_Add_NamCenter == "--lựa chọn--") {
        swal("Thông báo", "(Tên trung tâm không được để trống)", "error");
    }
    else {
        $.ajax({
            url: "/Subject/Add",
            data: { NAME: $("#txt_AddName").val(), CENTER_ID: $("#txt_Add_NamCenter").val() },
            success: function (result) {
                if (result == 1) {
                    $("#Modal_Add_Subject").hide();
                    $(".modal-backdrop").hide();
                    swal("Thông Báo!", "Thêm mới thành công", "success");

                }

                else if (result == 0) {
                    swal("Thông báo", "(Thêm mới không thành công)", "error");

                }
                else if (result == -1) {
                    swal("Thông báo", "(Không có quyền truy cập hệ thống)", "error");

                }
                else if (result == -3) {
                    swal("Thông báo", "(Môn  học và trung tâm đã tồn tại)", "error");

                }

                SeachRoom();
            }
        });
    }
}


function SubjectById(ID) {
    $.ajax({
        url: "/Subject/GetById",
        data: { ID: ID },
        success: function (result) {
            $("#txtEditId").val(result.ID);
            $("#txt_Edit_Name").val(result.NAME);
            $("#txt_Edit_NamCenter").val(result.CENTER_ID);

            $("#Modal_Edit_Room").show();
        }
    });

}

function deletePack(id) {
    swal({
        title: "Delete",
        text: "bạn chắc muốn xóa chứ ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "/Pack/Delete",
                data: { id: id },
                method: "POST",
                success: function (response) {
                    if (response == 1) {
                        swal({
                            title: "Thành Công !!",
                            text: "xóa thành công",
                            icon: "success",
                        });
                        setTimeout(function () {
                            getListPack();
                        }, 1000);
                    }
                    else {
                        swal({
                            title: "Lỗi !!",
                            text: "Lỗi hệ thống",
                            icon: "warning",
                        });
                    }
                }
            });
        } else {
            swal("Dữ liệu được bảo toàn");
        }
    });
}

function getListComment() {
    $.ajax({
        url: "/Comment/GetList",
        data: {
            Page: 1,
            Comment: $("#txt-comment").val(),
        },
        method: "GET",
        success: function (response) {
            $("#list_data").html(response);
        }
    });
}

// tạo comment
function createComment() {
    $("#frm-create").validate({
        rules: {
            NAME: "required"
        },
        messages: {
            NAME: "tên trung tâm là bắt buộc"
        },
        submitHandler: function () {
            $.ajax({
                url: "/Comment/Create",
                data: $("#frm-create").serialize(),
                method: "POST",
                success: function (response) {
                    if (response == 1) {
                        swal({
                            title: "Thành Công !!",
                            text: "thêm mới thành công",
                            icon: "success",
                        });
                        $("#Modal_Create_Comment").modal('hide');
                        setTimeout(function () {
                            getListComment();
                        }, 1000);
                    }
                    else if (response == 2) {
                        swal({
                            title: "Lỗi !!",
                            text: "Không tồn tại bình luận cha",
                            icon: "warning",
                        });
                        $("#Modal_Create_Comment").modal('hide');
                    }
                    else {
                        swal({
                            title: "Lỗi !!",
                            text: "Lỗi hệ thống",
                            icon: "warning",
                        });
                    }
                }
            });
        }
    });
}
                           
