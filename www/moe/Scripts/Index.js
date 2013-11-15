jQuery.support.cors = true;
var succeededUsername;
var succeededPassword;
function sliderightto(url) {
    app.navigate(
    url,
    'slide:right' //or whichever transition you like
);
}

function navigateTo(url) {
    app.navigate(
    url    
);
}

//var serviceurl = "http://10.104.2.81/Nasef_Mobile/MOE_Mobile.asmx"; // for pc 
var serviceurl = "http://192.168.1.75/Nasef_Mobile/MOE_Mobile.asmx"; // for labtop computer test
//var serviceurl = "http://localhost/NASEF_ASMX/MOE_Mobile.asmx"; // for computer test
var service = new WS(serviceurl);

$(function () {
    $('#btnCallMethodJqueryAjax').click(function () {
        $.ajax({
            type: "POST",
            url: serviceurl + "/GetListViewData",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                groupedData = eval(msg.d);
                var strNames = "";
                for (i = 0; i < groupedData.length; i++) {
                    strNames += groupedData[i].Name + "<br/>";
                }
                alert(strNames);
            },
            error: function (e) {
                debugger;
            }
        });
    });

    $('#btnCallMethodService').click(function () {
        service.call("GetListViewData", {}, function (data) {
            groupedData = eval(data);
            var strNames = "";
            for (i = 0; i < groupedData.length; i++) {
                strNames += groupedData[i].Name + "<br/>";
            }
            alert(strNames);
        },
        function (error) { alert('error'); });
    });

    $('#btnLogin').click(function () {
        var usernameVal = $('#txtUsername').val();
        var passwordVal=$('#txtPassword').val();        

        service.call("Login", { userName: usernameVal, password: passwordVal }, function (data) {
            if (data == "succeeded") {
                succeededUsername = usernameVal;
                succeededPassword = passwordVal;
                navigateTo("mainMenu.html");
            }
            else {
                $("#modalview-login").kendoMobileModalView("open");
            }
        },
        function (error) { alert('error'); debugger; });             
    });

});