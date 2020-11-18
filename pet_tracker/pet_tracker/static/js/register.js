
function getCookie(name) { //csrf verification
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken'); //store the cookie msg in "csrftoken"

var error_username = false;
var error_password = false;
var error_check_password = false;
var error_equipmentID = false;
var error_isSuccess = false;
var error_check = false;

$(document).ready(function () {
    $('#username').blur(function () {
        check_username();
    });

    $('#pwd').blur(function () {
        check_pwd();
    });

    $('#pwdcfm').blur(function () {
        check_pwdcfm();
    });

    $('#email').blur(function () {
        check_email();
    });

    $('#equipmentID').blur(function () {
        check_equipmentID();
    });

    $('#allow').click(function () {
        if ($(this).is(':checked')) {
            error_check = false;
            $(this).siblings('span').hide();
        } else {
            error_check = true;
            $(this).siblings('span').html('请勾选同意');
            $(this).siblings('span').show();
        }
    });
})

function check_username(){
    var len = $('#username').val().length;
    if(len<1)
    {
        $('#username').next().html('please input your first name')
        $('#username').next().show();
        error_username = true;
    }
    else
    {
        $('#username').next().hide();
        error_username = false;
    }
}

function check_pwd(){
    var len = $('#pwd').val().length;
    if(len<8||len>20)
    {
        $('#pwd').next().html('at least 8-20 characters')
        $('#pwd').next().show();
        error_password = true;
    }
    else
    {
        $('#pwd').next().hide();
        error_password = false;
    }
}


function check_pwdcfm(){
    var pass = $('#pwd').val();
    var cpass = $('#pwdcfm').val();

    if(pass!=cpass)
    {
        $('#pwdcfm').next().html('password varies')
        $('#pwdcfm').next().show();
        error_check_password = true;
    }
    else
    {
        $('#pwdcfm').next().hide();
        error_check_password = false;
    }

}

function check_email(){
    var re = /^[a-z0-9][\w\.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$/;

    if(re.test($('#email').val()))
    {
        $('#email').next().hide();
        error_email = false;
    }
    else
    {
        $('#email').next().html('wrong email formatter')
        $('#email').next().show();
        error_check_password = true;
    }

}

function check_equipmentID(){
    var len = $('#equipmentID').val().length;
    if(len<1)
    {
        $('#equipmentID').next().html('wrong equipmentID')
        $('#equipmentID').next().show();
        error_equipmentID = true;
    }
    else
    {
        $('#equipmentID').next().hide();
        error_equipmentID = false;
    }
}




function validate() {
    check_username();
    check_pwd();
    check_pwdcfm();
    check_email();
    check_equipmentID();

    if (error_username == false && error_password == false && error_check_password == false && error_email == false && error_equipmentID == false && error_check == false) {
        return true;
    } else {
        return false;
    }
}

