(function () {

    $.ajax({
        url: "/Fee/GetListIdMessage",
        success: function (result) {

            var preload = document.getElementById("preload");
            var loading = 0;
            //var id = setInterval(frame, 64);
            var length = result.length;

            var a = 0;
            var k = 0;

            // nếu độ dài của resurt 
            if (length == 0) {
                //clearInterval(id);
                var value = k + "/" + length;
                $("#soluongthongke").html(value);
                window.location = "/Fee/ListMaseage"
            }
            else {

                frame();
            }

            function frame() {

                $.each(result, function (i, item) {
                    var ID = item;

                    $.ajax({
                        url: "/Fee/SendMessMaseageById",
                        data: { ID: item },
                        success: function (data) {

                            if (data.Status == 1) {
                                k++;
                                var value = k + "/" + length;
                                $("#soluongthongke").html(value);
                            }
                            loading = loading + 1;

                            if (data.Result.TYPE_CONTENT == 0) {
                                PushNotifyPost(data.Result.DEVICEID,"Thông báo đóng học phí" , data.Result.CONTENT); 
                            }
                            else if (data.Result.TYPE_CONTENT == 1) {
                                PushNotifyPost(data.Result.DEVICEID, "Thông báo nợ học phí", data.Result.CONTENT); 
                            }
                            else {

                            }
                            //json.Result = data;

                            if (loading >= length) {
                                //clearInterval(id);
                                window.location = "/Message/index"; 
                            }

                        }
                    });



                });
            }

        }
    });

    function PushNotifyPost(deviceID, title, body) {

        
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

})();