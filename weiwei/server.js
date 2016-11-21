var express = require("express");

var app = express();

app.use(express.static("www"));

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/WeiWei");

mongoose.connection
	.on("open", function() {
		console.log("数据库连接成功");
	})
	.on("error", function() {
		console.log("数据库连接失败");
	});

var taskSchema = new mongoose.Schema({
	name: String,
	psw: String,
	confirm: String
});

var Task = mongoose.model("Users", taskSchema);

//注册(判断用户是否已经注册)
app.post("/regist-api", function(req, res) {
	console.log(req.body)
	

	Task.find({
			name: req.body.name
		})
		.count()
		.exec(function(err, data) {
			if(data > 0) {
				res.send({
					err: 1,
					msg: '该用户名已经占用'
				})
			} else {
				var t = new Task(req.body);
				//保存到数据库
				t.save(function(err, data) {
					res.json({
						err: 0,
						msg: "恭喜你注册成功"
					});
				}).catch(function(err) {
					res.json({
						err: 2,
						msg: '服务器繁忙，请稍后再试....'
					})
				})
			}
		})

});

//登录接口
app.post("/login-api", function(req, res) {
	//生成touken的函数
	function makeToken() {
		var sourceStr = "123457890asdfghjklzxcvbnm";
		var token = "";
		for(var i = 0; i < 10; i++) {
			token += sourceStr[Math.floor(Math.random() * sourceStr.length)];
		}
		return token;
	}
	var condition ={};
	if(req.body.name){
		var reg = new RegExp(req.body.name);
		condition.name = reg;
	}
	if(req.body.psw){
		var reg = new RegExp(req.body.psw);
		condition.psw = reg;
	}

	Task.find(condition)
		.exec(function(err, data) {
			if(data.length <= 0) {
				res.send({
					err: 1,
					msg: "该用户名未注册"
				})
			} else {
				console.log(data);
				if(data[0].psw == req.body.psw) {
					var token = makeToken();
					data[0].token = token;
					data[0].save(function(err) {
						res.cookie("token", token);
						res.cookie("name", req.body.name)
						res.json({
							err: 0,
							msg: "登录成功"
						});
					})
				} else {
					res.json({err:2,
						msg: "账号或密码错误"
					})
				}
			}
		})
});
app.listen(8080,function(){
	console.log("服务器已开启")
})
