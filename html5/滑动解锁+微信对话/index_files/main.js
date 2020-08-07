document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('touchend', function (e) { e.preventDefault(); }, false);
var fadeTime=500;
var mainWidth=$(window).width();
var mainHeight=$(window).height();
var la=2;
var cansend=0;
var dt=1;
var msg=document.getElementById("msg");
var msgTime=1200;
if(IsAndroid())fadeTime=0;
$(".div").css({"width":mainWidth, "height":mainHeight})
$("input").on("tap", function(){
	$(this).focus();
})
$(".kuang").css({"padding":mainWidth*.025});

$(".wrapper1").height(mainHeight-51);
myScroll1 = new IScroll('.wrapper1');
$(".shuru>input").css({"width":mainWidth-116});
$(".wrapper1").find("img").each(function(){
	$(this).load(function(){
		myScroll1.refresh();
	})
})
$(".send").on("tap", function(){
	if(cansend==1){
		var myHead=$("#myHead").val();
		$(".nosend").show();
		$(".send").hide();
		var the=trim($("#shuru").val());
		play(msg);
		if(dt==1){
			if((the=="愿意")||(the=="不愿意")){
				$(".ls").eq(la).after('<div class="ls lshow ls-right"><img src="'+myHead+'" class="headimg"><div class="kuang myword">'+the+'<div class="san"></div></div></div>')
				$("#shuru").attr("placeholder","");
				$("#shuru").val("");
				la++;
				myScroll1.refresh();
				myScroll1.scrollToElement(document.querySelector('.scroller1 .ls:nth-child('+la+')'));
				if(the=="不愿意"){
					$(".share2").show();
				}else{
					setTimeout(function(){
						lshow(la+1,la+3);
					},msgTime)
				}
				dt=2;
			}else{
				if(the=="")the="　";
				$(".ls").eq(la).after('<div class="ls lshow ls-right"><img src="'+myHead+'" class="headimg"><div class="kuang myword">'+the+'<div class="san"></div></div></div>')
				$("#shuru").val("");
				la++;
				myScroll1.refresh();
				myScroll1.scrollToElement(document.querySelector('.scroller1 .ls:nth-child('+la+')'));
				setTimeout(function(){
					play(msg);
					$(".nosend").hide();
					$(".send").show();
					$(".ls").eq(la).after('<div class="ls lshow ls-left"><img src="images/3/6.jpg" class="headimg"><div class="kuang">请回复“<span class="blue">愿意</span>”或“<span class="blue">不愿意</span>”<div class="san"></div></div></div>');
					la++;
					myScroll1.refresh();
					myScroll1.scrollToElement(document.querySelector('.scroller1 .ls:nth-child('+la+')'));
				},msgTime)
			}
		}else{
			if((the.toLowerCase()=="a")||(the.toLowerCase()=="b")){
				$(".ls").eq(la).after('<div class="ls lshow ls-right"><img src="'+myHead+'" class="headimg"><div class="kuang myword">'+the+'<div class="san"></div></div></div>')
				$("#shuru").attr("placeholder","");
				$("#shuru").val("");
				la++;
				myScroll1.refresh();
				myScroll1.scrollToElement(document.querySelector('.scroller1 .ls:nth-child('+la+')'));
				setTimeout(function(){
					lshow(la+1,la+3);
				},msgTime)
			}else{
				if(the=="")the="　";
				$(".ls").eq(la).after('<div class="ls lshow ls-right"><img src="'+myHead+'" class="headimg"><div class="kuang myword">'+the+'<div class="san"></div></div></div>')
				$("#shuru").val("");
				la++;
				myScroll1.refresh();
				myScroll1.scrollToElement(document.querySelector('.scroller1 .ls:nth-child('+la+')'));
				setTimeout(function(){
					play(msg);
					$(".nosend").hide();
					$(".send").show();
					$(".ls").eq(la).after('<div class="ls lshow ls-left"><img src="images/3/6.jpg" class="headimg"><div class="kuang">请回复“<span class="blue">A</span>”或“<span class="blue">B</span>”<div class="san"></div></div></div>');
					la++;
					myScroll1.refresh();
					myScroll1.scrollToElement(document.querySelector('.scroller1 .ls:nth-child('+la+')'));
				},msgTime)
			}
		}
	}
})
$("#close").on("tap", function(){
	$(".share2").hide();
	play(msg);
	$(".ls").eq(la).after('<div class="ls lshow ls-right"><img src="images/3/7.jpg" class="headimg"><div class="kuang myword">愿意<div class="san"></div></div></div>')
	$("#shuru").attr("placeholder","");
	$("#shuru").val("");
	la++;
	myScroll1.refresh();
	myScroll1.scrollToElement(document.querySelector('.scroller1 .ls:nth-child('+la+')'));
	setTimeout(function(){
		lshow(la+1,la+3);
	},msgTime)
})
$("#te").on("tap", function(){
	$(".share").show();
})
$(".share").on("tap", function(){
	$(this).hide();
})
$("#send").on("tap", function(){
	$(".m3").show();
	lshow(2,3)
})
$(".showimg>img").each(function(){
	var the=$(this);
	var img=new Image();
	img.src=the.attr("data-src");
	img.onload=function(){
		var p=mainWidth/mainHeight;
		var m=img.width/img.height;
		if(p>m){
			marginLeft=(mainWidth-mainHeight*img.width/img.height)/2;
			the.css({"height":mainHeight, "margin-left":marginLeft});
		}else{
			the.width(mainWidth);
			marginTop=(mainHeight-mainWidth*img.height/img.width)/2;
			the.css({"width":mainWidth, "margin-Top":marginTop});
		}
	}
})
$(".showimg").on("tap", function(){
	$(this).hide().find("img").hide();
})
$(".infoimg>img").on("tap", function(){
	var index=$(this).index();
	if(index<2){
		$(".showimg").show().find("img").eq(index).show();
	}
})
var sj=Math.floor(Math.random()*3);
$(".st").hide();
$(".stimg").removeClass("stimg");
$(".st").eq(sj).show();
$(".st").eq(sj).find("img").eq(1).addClass("stimg");
$(".last").on("tap", function(){
	$(".m4").show();
})
var myDate = new Date();
$(".bb>.s1").html(myRight(myDate.getHours(),2)+":"+myRight(myDate.getMinutes(),2));
$(".bb>.s2").html(myRight(myDate.getMonth()+1,2)+"月"+myRight(myDate.getDate(),2)+"日 "+myDay(myDate.getDay()));

function myRight(str, len){
	return ("0"+str).substr(-len);
}
function myDay(str){
	var Week = ['日','一','二','三','四','五','六'];
    return '星期' + Week[str];
}

function lshow(start,end){
	cansend=0;
	if(start>end){
		$(".nosend").hide();
		$(".send").show();
		cansend=1;
		return false;
	}
	play(msg);
	$(".ls").eq(start).addClass("lshow");
	if($(".ls").eq(start).hasClass("last")){

	}else{
		setTimeout(function(){
			lshow(start+1,end)
		},msgTime)
	}
	console.log(la);
	la++;
	myScroll1.refresh();
	myScroll1.scrollToElement(document.querySelector('.scroller1 .ls:nth-child('+la+')'));
	if(start==end){
		setTimeout(function(){
			if(dt==1){
				$("#shuru").attr("placeholder","回复“愿意”或“不愿意”");
			}else{
				$("#shuru").attr("placeholder","回复“A”或“B”");
			}
			$(".nosend").hide();
			$(".send").show();
		},800)
	}
}

function play(str){
	str.currentTime=0;
	str.play();
}

function IsAndroid(){
   var userAgentInfo = navigator.userAgent;
   var Agents = new Array("Android");
   var flag = false;
   for (var v = 0; v < Agents.length; v++) {
       if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = true; break; }
   }
   return flag;
}
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,"");
}
function fanye(){
	var fy=1;
	$(".m1").on("touchstart",function(e) {
		x1 = e.originalEvent.targetTouches[0].pageX;
	});
	$(".m1").on("touchmove",function(e) {
		e.preventDefault()
	});
	$(".m1").on("touchend",function(e) {
		x2 = e.originalEvent.changedTouches[0].pageX;
		if((x1-x2)<-10){ //往右滑
			if(fy==0)return false;
			fy=0;
			$(".m1").addClass("move-right")
		}
	})
}