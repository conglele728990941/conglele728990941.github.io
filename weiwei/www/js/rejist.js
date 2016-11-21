//$("#name").val('')
//$("#psw").val('')
$("#register-form").submit(function(e){
	e.preventDefault();
	if($("#name").val()){
		if(!$("#name").val().match(/^\w{2,6}$/)){
			alert("账号格式不合符要求");
			return;
		}
	}else{
		alert("用户名不能为空")
	}
	
	if($("#psw").val()){
		if($("#psw").val().match(/^[0-9A-Za-z]{6,20}$/)){
			if($("#config").val() != $("#psw").val()){
				alert("两次输入的密码不一样")
				return;
			}
		}else{
				alert("密码格式错误，密码为6~20位")
		}
	}			
		var data = $("#register-form").serialize();
		$.post("/regist-api",data,function(resData){
			alert(resData.msg);
			if(resData.err == 0){
				location.href = "login.html";
			}
		});
	
})