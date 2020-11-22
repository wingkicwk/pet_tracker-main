$(document).ready(function(){
	$("#setup").click(function(){
		$.ajax({
		url: "/setupfence",
		data:"this is data",
		type: "post",
		success:function(result){
		    console.log(result);
			$("#div0").html(result["IsSuccess"]);
		}});
	});

	$("#getinfo").click(function(){
		$.ajax({
		url: "/getfence",
		data:"this is data",
		type: "get",
		success:function(result){
		    console.log(result);
			$("#div1").html(result["IsSuccess"]);
		}});
	});

    $("#clear").click(function(){
        $.ajax({
        url: "/clearfence",
        data:"this is data",
        type: "get",
        success:function(result){
            console.log(result);
            $("#div2").html(result["IsSuccess"]);
        }});
    });

        $("#pet").click(function(){
        $.ajax({
        url: "/petposition",
        data:"this is data",
        type: "get",
        success:function(result){
            console.log(result);
            $("#div3").html(result["IsSuccess"]);
        }});
    });
});
