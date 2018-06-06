$(document).ready(function() {

});

(function() {

	grade = "";
	studio = "";
	direct = "";

	this.getCarousel();
	this.getGradeBQ();
	this.getStudioBQ();
	this.getDirectBQ();
	this.getAllWork();
	this.getAllStudio();
	this.getStudioWidth();
}());

//获取工作室宽度
function getStudioWidth() {
	var elite = $(".elite-bg");
	var divs = $(".studio-item");
	var con = $(".studio-container");
	var sum = divs.size(); //获取工作室个数
	var divw = $(".studio-item").outerWidth(true); //获取每个工作室宽度
	var conw = divw * sum; //计算工作室总宽度
	con.width(conw); //设置容器宽度
	//	alert(conw + " " + divw + " " + con.outerWidth(true));
	//	alert(elite.width()+"a"+con.width());

	var timer = null;
	var leftBtn = document.getElementById("left");
	var rightBtn = document.getElementById("right");

	leftBtn.onmouseover = function() {
		//		alert("ceshi!");
		clearInterval(timer);
		timer = setInterval(function() {
			var t1 = parseInt(con.css("margin-left").replace('px', ''));
			//			alert(t1+1);
			if(t1 <= 0) {
				con.css("margin-left", t1 + 1);
			}
		}, 15)
	}
	rightBtn.onmouseover = function() {
		clearInterval(timer);
		timer = setInterval(function() {
			var temp = elite.width() - con.width();
			var t1 = parseInt(con.css("margin-left").replace('px', ''));
			//			alert(t1+1);
			if(t1 >= temp) {
				con.css("margin-left", t1 - 1);
			}
		}, 15)
	}

	leftBtn.onmouseleave = function() {
		clearInterval(timer);
	}

	rightBtn.onmouseleave = function() {
		clearInterval(timer);
	}

	leftBtn.onmousedown = function() {
		$(".studio-container").css("margin-left", 0);
	}

	rightBtn.onmousedown = function() {
		var temp = elite.width() - con.width();
		//		alert(temp);
		$(".studio-container").css("margin-left", temp);
	}
}
//获取轮播图
function getCarousel() {
	var url = 'http://139.199.165.202:6004/mvcBasicShowProject/carousel/query';
	$.ajax({
		url: url, // 请求的url链接  
		method: 'post', // 请求的方式
		header: {
			"Content-Type": "application/json" //  请求消息头数据类型
		},
		success: function(res) { //返回接口数据  并进行处理
			console.log("轮播图");
			console.log(res);
			$(".carousel-inner").empty();
			$(".carousel-indicators").empty();
			$.each(res.data, function(index, item) {
				if(index == 0) {
					var str = '<div class="item active"><img src="' + item.imgUrl + '" alt="' + item.alt +
						'" title="' + item.title + '"><div class="carousel-caption">' + item.name + '</div></div>';
					$(".carousel-inner").append(str);
					var str2 = '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>';
					$(".carousel-indicators").append(str2);
				} else {
					var str = '<div class="item"><img src="' + item.imgUrl + '" alt="' + item.alt +
						'" title="' + item.title + '"><div class="carousel-caption">' + item.name + '</div></div>';
					$(".carousel-inner").append(str);
					var str2 = '<li data-target="#myCarousel" data-slide-to="' + index + '"></li>';
					$(".carousel-indicators").append(str2);
				}
			})
		}
	})
}

//获取成果年度标签
function getGradeBQ() {
	var url = 'http://139.199.165.202:6004/mvcBasicShowProject/grade/queryALL';
	$.ajax({
		url: url, // 请求的url链接  
		method: 'post', // 请求的方式
		header: {
			"Content-Type": "application/json" //  请求消息头数据类型
		},
		success: function(res) { //返回接口数据  并进行处理
			console.log("成果年度");
			console.log(res);
			var data = res.data;
			$(".gradeUl").empty();
			var str1 = '<li class="project-nav-item on"><a >全部</a></li>';
			$(".gradeUl").append(str1);
			$.each(data, function(index, item) {
				var str2 = '<li class="project-nav-item"><a data-ct="fe">' +
					item.gradeCaption + '</a></li>';
				$(".gradeUl").append(str2);

			})
			//点击事件
			$('.gradeUl li').click(function() {
				var f = this;
				grade = $(this).text();
				if(grade == '全部') grade = "";
				console.log(grade);
				$('.gradeUl li').each(function() {
					this.className = this == f ? 'project-nav-item on' : 'project-nav-item'
				});
				selectWork();
			});
		}
	})
}

//获取工作室标签
function getStudioBQ() {
	var url = 'http://139.199.165.202:6004/mvcBasicShowProject/studio/queryALL';
	$.ajax({
		url: url, // 请求的url链接  
		method: 'post', // 请求的方式
		header: {
			"Content-Type": "application/json" //  请求消息头数据类型
		},
		success: function(res) { //返回接口数据  并进行处理
			console.log("工作室");
			console.log(res);
			var data = res.data;
			$(".studioUl").empty();
			var str1 = '<li class="project-nav-item on"><a name="全部">全部</a></li>';
			$(".studioUl").append(str1);
			$.each(data, function(index, item) {
				var str2 = '<li class="project-nav-item"><a name="' +
					item.studioCaption + '">' +
					item.studioCaption + '</a></li>';
				$(".studioUl").append(str2);

			})
			$('.studioUl li ').click(function() {
				var f = this;
				studio = $(this).text();
				if(studio == '全部') studio = "";
				$('.studioUl li').each(function() {
					this.className = this == f ? 'project-nav-item on' : 'project-nav-item'
				});
				selectWork();
			});
		}
	})
}

//获取方向标签
function getDirectBQ() {
	var url = 'http://139.199.165.202:6004/mvcBasicShowProject/direct/queryALL';
	$.ajax({
		url: url, // 请求的url链接  
		method: 'get', // 请求的方式
		header: {
			"Content-Type": "application/json" //  请求消息头数据类型
		},
		success: function(res) { //返回接口数据  并进行处理
			console.log("方向");
			console.log(res.data);
			var data = res.data;
			$(".directUl").empty();
			var str1 = '<li class="project-nav-item on"><a name="全部">全部</a></li>';
			$(".directUl").append(str1);
			$.each(data, function(index, item) {
				var str2 = '<li class="project-nav-item"><a name="' +
					item.directCaption + '">' +
					item.directCaption + '</a></li>';
				$(".directUl").append(str2);
			})
			$('.directUl li').click(function() {
				var f = this;
				direct = $(this).text();
				if(direct == '全部') direct = "";
				$('.directUl li').each(function() {
					this.className = this == f ? 'project-nav-item on' : 'project-nav-item'
				});
				selectWork();
			});
		}
	})
}
//获取所有项目
function getAllWork() {
	var url = 'http://139.199.165.202:6004/mvcBasicShowProject/work/query?isPage=false';
	$.ajax({
		url: url, // 请求的url链接  
		method: 'get', // 请求的方式
		header: {
			"Content-Type": "application/json" //  请求消息头数据类型
		},
		success: function(res) { //返回接口数据  并进行处理
			console.log("项目");
			console.log(res.data);
			var data = res.data;
			var count = 0;
			$(".jxufe-project-list").empty();
			$.each(data, function(index, item) {
				var str2 = '<div class="project-card-container"><a target="_blank" href="/learn/998" class="project-card"><div class="project-card-top"><img class="project-banner" src="' +
					item.head + '" style="display: inline;"><div class="project-label"><label>' +
					item.studioCaption + '</label></div></div><div class="project-card-content"><h3 class="project-card-name">' +
					item.name + '</h3><div class="clearfix project-card-bottom"><p class="project-card-desc">' +
					item.teacher + '</p><p class="project-card-desc">' +
					item.descript + '</p><div class="project-card-info"><a>点赞 </a>(<span id="star">' +
					item.dianzan + '</span>)<span id="year">' +
					item.createTime + '</span></div></div></div></a></div>';
				$(".jxufe-project-list").append(str2);
				count++;
			})
			$(".total").text(count);
		}
	})
}
//获取所有工作室
function getAllStudio() {
	var url = 'http://139.199.165.202:6004/mvcBasicShowProject/studio/queryALL';
	$.ajax({
		url: url, // 请求的url链接  
		method: 'post', // 请求的方式
		header: {
			"Content-Type": "application/json" //  请求消息头数据类型
		},
		success: function(res) { //返回接口数据  并进行处理
			console.log("工作室");
			console.log(res);
			var data = res.data;
			$(".studio-container").empty();
			$.each(data, function(index, item) {
				var tt = item.studioCaption + "\n详情介绍\n" + "工作室成员";
				var str2 = '<a target="_blank" class="studio-item"><img class="studio-uimg" src="' +
					item.head + '" title="' +
					tt + '"><span class="studio-name">' +
					item.studioCaption + '</span><span class="studio-p" title="' +
					item.studioDescript + '">' +
					item.studioDescript + '</span></a>';
				$(".studio-container").append(str2);

			})
		}
	})
}

function selectWork() {
	$("#tishi").css("display", "none");
	var url = 'http://139.199.165.202:6004/mvcBasicShowProject/work/query?isPage=false&&';
	var canshu = 'studioCaption=' + studio + '&gradeCaption=' + grade + '&directCaption=' + direct;
	
	if(studio == "" && grade == "" && direct == "") {
		getAllWork();
	} else {
		url += canshu;
		$.ajax({
			url: url, // 请求的url链接  
			method: 'get', // 请求的方式
			header: {
				"Content-Type": "application/json" //  请求消息头数据类型
			},
			success: function(res) { //返回接口数据  并进行处理
				console.log(url);
				console.log("项目");
				console.log(res);
				var data = res.data;
				var count = 0;
				$(".jxufe-project-list").empty();
				if(data.length == 0) {
					$("#tishi").css("display", "block");
				} else {
					$.each(data, function(index, item) {
						var str2 = '<div class="project-card-container"><a target="_blank" href="/learn/998" class="project-card"><div class="project-card-top"><img class="project-banner" src="' +
							item.head + '" style="display: inline;"><div class="project-label"><label>' +
							item.studioCaption + '</label></div></div><div class="project-card-content"><h3 class="project-card-name">' +
							item.name + '</h3><div class="clearfix project-card-bottom"><p class="project-card-desc">' +
							item.teacher + '</p><p class="project-card-desc">' +
							item.descript + '</p><div class="project-card-info"><a>点赞 </a>(<span id="star">' +
							item.dianzan + '</span>)<span id="year">' +
							item.createTime + '</span></div></div></div></a></div>';
						$(".jxufe-project-list").append(str2);
						count++;
					})
				}
				$(".total").text(count);
			}
		})
	}
}

function check() {
	var key = event.keyCode;
	if(key == 13)
		searchPart();
}

function searchPart() {
	$("#tishi").css("display", "none");
	var input = $('.input1').val();
	//	http://139.199.165.202:6004/mvcBasicShowProject/work/query?isSearch=true&search=内容&isPage=false
	var url = 'http://139.199.165.202:6004/mvcBasicShowProject/work/query?isSearch=true&search=';
	var canshu = input + "&isPage=false";
	url += canshu;
	$.ajax({
		url: url, // 请求的url链接  
		method: 'get', // 请求的方式
		header: {
			"Content-Type": "application/json" //  请求消息头数据类型
		},
		success: function(res) { //返回接口数据  并进行处理
			console.log("项目");
			console.log(res);
			var data = res.data;
			var count = 0;
			$(".jxufe-project-list").empty();
			if(data.length == 0) {
				alert("没有查询到相关项目！");
				$("#tishi").css("display", "block");
			} else {
				alert("查询成功！");
				$.each(data, function(index, item) {

					var str2 = '<div class="project-card-container"><a target="_blank" href="/learn/998" class="project-card"><div class="project-card-top"><img class="project-banner" src="img/' +
						item.head + '.jpg" style="display: inline;"><div class="project-label"><label>' +
						item.studioCaption + '</label></div></div><div class="project-card-content"><h3 class="project-card-name">' +
						item.name + '</h3><div class="clearfix project-card-bottom"><p class="project-card-desc">' +
						item.teacher + '</p><p class="project-card-desc">' +
						item.descript + '</p><div class="project-card-info"><a>点赞 </a>(<span id="star">' +
						item.dianzan + '</span>)<span id="year">' +
						item.createTime + '</span></div></div></div></a></div>';
					$(".jxufe-project-list").append(str2);
					count++;
				})
			}
			$(".total").text(count);
		}
	})
}