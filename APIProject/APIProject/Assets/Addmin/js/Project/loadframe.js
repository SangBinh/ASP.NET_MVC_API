(function () {

    $.ajax({
        url: "/Salary/GetListTeacherId",
        success: function (result) {

            var preload = document.getElementById("preload");
            var loading = 0;
            //var id = setInterval(frame, 64);
            var length = result.length;
            
            var a = 0;
            var k = 0;


            if (length ==0) {
                //clearInterval(id);
                var value = k + "/" + length;
                $("#soluongthongke").html(value);
                window.location = "/salary/MonthlySalary"; 
            }
            else {
                
                frame();
            }
            
            function frame() {

                $.each(result, function (i, item) {
                    var ID = item;
                  
                    $.ajax({
                        url: "/Salary/MonthlySalaryByTeacher",
                        data: { ID: item },
                        success: function (data) {
                          
                            if (data == 1) {
                                k++;
                                var value = k + "/" + length;
                                $("#soluongthongke").html(value);
                            }
                            loading = loading + 1;

                            if (loading >= length) {
                                //clearInterval(id);
                                window.location = "/salary/MonthlySalary"
                            }

                        }
                    });

                    

                });
            }

        }
    });

})();


