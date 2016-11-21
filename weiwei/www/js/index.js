angular.module("myApp", [])
.controller("ctrl", ["$scope","$http","$interval","lunBo","lunBo1","scroll","isLogin","loginOut",function($scope,$http,$interval,lunBo,lunBo1,scroll,isLogin,loginOut) {
		$scope.showWeibo = function() {
			$(".follow-weibo").css("display", "block")
		}
		$scope.removeWeibo = function() {
			$(".follow-weibo").css("display", "none");
		}
		$scope.bool = [true, false, false];

		$scope.items = ["商品", "文章", "图片"];
		$scope.tabType = function($index) {
			for(var i = 0; i < $scope.bool.length; i++) {
				$scope.bool[i] = false;
			}
			$scope.bool[$index] = true;
		}
		//请求文件
		$http.get("../data/navArr.json").then(function(resData){
			$scope.navArr=resData.data;
		});
		
		$http.get("../data/mallArr.json").then(function(resData){
			$scope.mallArr=resData.data;
		});
		$http.get("../data/zxArr.json").then(function(resData){
			$scope.finish=resData.data;
		})
		$http.get("../data/zx1Arr.json").then(function(resData){
			$scope.article=resData.data;
		})
		$http.get("../data/linkArr.json").then(function(resData){
			$scope.links=resData.data;
		})
		$scope.showApp = function() {
			$(".app-down").css("display", "block");
		}
		$scope.removeApp = function() {
			$(".app-down").css("display", "none");
		}
		//show mall-btn show tab-artic
		$scope.iscurrent = [true,false]
		$scope.iscurrent1=[true,false,false]

	//轮播图	
		$scope.index=0;
		$scope.lub=lunBo;
		$scope.timer = $interval(function(){
			$scope.lub($scope);
		},3000)
		//轮播图2
		$scope.index1=0;
		$scope.lunb = lunBo1;
		$scope.time = $interval(function(){
			$scope.lunb($scope);
		},3000)
		//滚轮事件
		scroll();
		

		$scope.isLogin=isLogin;
		$scope.isLogin();
		$scope.loginOut=loginOut

	}])

		
	.directive("header", [function() {
		return {
			link: function($scope, $el, dir) {
				$el.on("mouseover", function(e) {
					var a = $(this)[0].children[0];
					$(a).addClass("active")
					var b = $(this)[0].children[1];
					$(b).css("display", "block")
				})
				$el.on("mouseleave", function(e) {
					var a = $(this)[0].children[0];
					$(a).removeClass("active")
					var b = $(this)[0].children[1];
					$(b).css("display", "none")
				})
			}
		}
	}])
	.factory("lunBo",[function(){
		return function($scope){
			var img = $(".indexBanner").children().children();
			var circle = $(".lun-circle").children();
			$(circle[$scope.index%7]).css("background-color","#fff");
			$(img[$scope.index]).fadeOut();
			$scope.index++;
			if($scope.index>6){
				$scope.index=0;
			}
			$(circle[$scope.index%7]).css("background-color","#ffa500");
			$(img[$scope.index]).fadeIn();	
		}
	}])
	//原点指令
	.directive("lbCircle",["$interval",function($interval){
		return{
			link:function($scope,$el,dir){
				$el.on("click",function(){
					var img = $(".indexBanner").children().children();
			        var circle = $(".lun-circle").children();
			        $interval.cancel($scope.timer);
			        $(circle[$scope.index%7]).css("background-color","#fff");
			        $(img[$scope.index]).fadeOut();
			        $scope.index=$(this).index();
					$(circle[$scope.index%7]).css("background-color","#ffa500");
					$(img[$scope.index]).fadeIn();
					$scope.timer = $interval(function(){
						$scope.lub($scope);
					},3000)
				})
			}
		}
	}])
	//箭头指令
	.directive("showCircle",[function(){
		return{
			link:function($scope,$el,dir){
				$el.on("mouseover",function(e){
				var a=$(this)[0].children[2];
				$(a).css("display","block");
				var b=$(this)[0].children[3];
				$(b).css("display","block");
				})
				$el.on("mouseleave",function(e){
				var a=$(this)[0].children[2];
				$(a).css("display","none");
				var b=$(this)[0].children[3];
				$(b).css("display","none");
				})
			}
		}
	}])
	.directive("lbRight",["$interval",function($interval){
		return{
			link:function($scope,$el,dir){
				$scope.right= function(){
					//取消timer事件
					$interval.cancel($scope.timer);
					$scope.lub($scope);
					$scope.timer = $interval(function(){
						$scope.lub($scope);
					},3000)
				}
			}
		}
	}])
	.directive("lbLeft",["$interval",function($interval){
		return{
			link:function($scope,$el,dir){
				$scope.left=function(){
					var img = $(".indexBanner").children().children();
			        var circle = $(".lun-circle").children();
			        $interval.cancel($scope.timer);
			        $(circle[$scope.index%7]).css("background-color","#fff");
			        $(img[$scope.index]).fadeOut();
			        $scope.index--;
			        if($scope.index<0){
			        	$scope.index=6;
			        }
					$(circle[$scope.index%7]).css("background-color","#ffa500");
					$(img[$scope.index]).fadeIn();
					$scope.timer = $interval(function(){
						$scope.lub($scope);
					},3000)
				}
			}
		}
	}])
	.directive("showBtn",[function(){
		return{
			link:function($scope,$el,dir){
				$el.on("mouseover",function(e){
					var a = $(this)[0].children[0];
					$(a).css("display","block");
					
				})
				$el.on("mouseleave",function(e){
					var a = $(this)[0].children[0];
					$(a).css("display","none");
				})
			}
		}
	}])
	.factory("lunBo1",function(){
		return function($scope){
			var img = $(".picture-img").children("li");
			var circle = $(".picture-circle").children().children();
			$(circle[$scope.index1%5]).css("background-color","#fff");
			$(img[$scope.index1]).fadeOut();
			$scope.index1++;
			if($scope.index1>4){
				$scope.index1=0;
			}
			$(circle[$scope.index1%5]).css("background-color","#ffa500");
			$(img[$scope.index1]).fadeIn();	
		}
	})
    .factory("scroll", [function() {
		return function() {
			$(document).scroll(function() {
				if($(window).scrollTop() > 190) {
					$("#gototop").css("display", "inline");
				} else if($(window).scrollTop() <= 190) {
					$("#gototop").css("display", "none");
				}
			});
		}
}])
   .directive("showTop",[function(){
   	    return {
			link: function($scope, $el, dir) {
				$el.on("mouseover", function(e) {
					var a = $(this)[0];
					$(a).removeClass("gototop").addClass("goto-top")
				})
				$el.on("mouseleave", function(e) {
					var a = $(this)[0];
					$(a).removeClass("goto-top").addClass("gototop")
				})
			}
		}
   
   }])
   .factory("isLogin",[function(){
   	   return function(){
   	   	  if($.cookie("name")){
   	   	  	this.name = $.cookie("name");
   	   	  	this.account = true;
   	   	  }
   	   	  else{
   	   	  	this.name = "登录";
   	   	  	this.account= false;
   	   	  	
   	   	  }
   	   }
   }])
   .factory("loginOut",function(){
   	return function(){
   		$.removeCookie("name");
   		window.location.href = "index.html";
   	}
   })
