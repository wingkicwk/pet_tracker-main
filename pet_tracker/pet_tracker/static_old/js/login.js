
$(document).ready(function () {

    if ($("#alertinfo").val() != "") {
        window.confirm("Registered Successfully!\nNow please login your own account")
    }
    if ($("#loginerrmsg").val() != "") {
        window.confirm($("#loginerrmsg").val())
    }
})

