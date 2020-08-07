var loadnum=0, yc, loadm=0, kk=0;
$(function(){
	time1=new Date().getTime();
	mgs = document.getElementsByTagName("img");
	mss = document.getElementsByClassName("imgbg");
	//mus = document.getElementsByTagName("audio");
	//num = mgs.length + mss.length + mus.length;
	$("#msg")[0].load();
	$("#msg2")[0].load();
	num = mgs.length + mss.length;
	par = 100 / num;
	if(num>0)imgload(0, num, par);
})

function imgload(i, num, par){
	if (i == (num - 1)) {
		par = 100 - parseInt(par) * (num - 1)
	}
	loadm = loadm + par;
	if (parseInt(loadm) >= 100) {
		loadm = 100
	}
	var ii = 0;
	if (parseInt(loadnum) < loadm) {
		loads()
	}
	var yy=0;
	var img = new Image();
	var audio = document.createElement("audio");
	if(i>=(mgs.length+mss.length)){
		yy=1;
		imgs=mus;
		imgi=i-(mgs.length+mss.length);
	}else if(i>=mgs.length){
		imgs=mss;
		imgi=i-mgs.length;
	}else{
		imgs=mgs;
		imgi=i;
	}
	if(yy==1){
		audio.src = imgs[imgi].getAttribute("data-src");
		audio.load();
		audio.addEventListener("canplay", function(){
			callback(i, num);
		},false)
	}else{
		var dsrc=imgs[imgi].getAttribute("data-src");
		if(dsrc!=null){
			img.src = imgs[imgi].getAttribute("data-src");
			img.onload = function() {
				callback(i, num)
			}
		}else{
			callback(i, num)
		}
	}
}
function loads() {
	if (loadnum < loadm) {
		loadnum++;
		if(loadnum>=100)loadnum=99;
		$("#loadnum").html(loadnum+"%");
		dstart(loadnum);
		yc=setTimeout("loads()",1000)

	}
}
function callback(i, num) {
	m2=Math.ceil(loadm);
	if(m2>100)m2=100;
	loadnum=Math.ceil(m2);
	$("#loadnum").html(loadnum+"%");
	var dsrc=imgs[imgi].getAttribute("data-src");
	if(dsrc!=null){
		if(i>=(mgs.length+mss.length)){
			imgs[imgi].src = dsrc;
		}else if(i>=mgs.length){
			imgs[imgi].style.backgroundImage = 'url('+dsrc+')';
		}else{
			imgs[imgi].src = dsrc;
		}
	}
	if (i < num - 1) {
		imgload(i + 1, num, par)
	}
	dstart(loadnum);
}
function dstart(dnum){
	if (dnum >= 100) {
		if(kk==1)return;
		kk=1;
		setTimeout(function(){
			$(".load").hide();
			$("#msg2")[0].play();
			fanye();
		},500)
	}

}