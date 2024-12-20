class FwhfStarrySky{
	constructor(){
		this.canvas = '';
		this.context = '';
		this.timer = null;
		this.mountainArr = [];
		this.starArr = [];
		this.meteorArr = [];
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.init();
	}
	init(){
		document.body.innerHTML += "<canvas id='fwhfCanvas'></canvas>";
		this.canvas = document.getElementById('fwhfCanvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.style.display = 'block';
		this.context = this.canvas.getContext('2d');
		
		var drawMountainX = 0;
		while(drawMountainX < this.width){
			if(this.rand(1,2) == 1){
				this.mountainArr.push([drawMountainX,this.rand(this.height-70,this.height-50),drawMountainX-this.rand(15,25),this.height-60]);
			}else{
				this.mountainArr.push([drawMountainX,this.rand(this.height-70,this.height-50)]);
			}
			drawMountainX += this.rand(10,30);
		}
		
		var ladder = 0;
		while(ladder < this.height-300){
			for(var i = 0 ; i < (this.height-ladder)/100 ; i++){
				this.starArr.push([this.rand(0,this.width),this.rand(ladder,ladder+20),this.rand(0,10),0.1]);
			}
			ladder += 20;
		}
		
		this.drawTimer();
	}
	drawSky(){
		this.context.beginPath();
		var skyStyle = this.context.createLinearGradient(0,0,0,this.canvas.height);
		skyStyle.addColorStop(0,"#000211");
		skyStyle.addColorStop(0.3,"#080d23");
		skyStyle.addColorStop(0.7,"#18203d");
		skyStyle.addColorStop(1,"#293756");
		this.context.fillStyle = skyStyle;
		this.context.fillRect(0,0,this.width,this.height);
		this.context.closePath();
	}
	drawMountain(){
		this.context.beginPath();
		this.context.fillStyle = '#111';
		this.mountainArr.forEach((v)=>{
			if(v.length == 4){
				this.context.quadraticCurveTo(v[2],v[3],v[0],v[1])
			}else{
				this.context.lineTo(v[0],v[1]);
			}
		});
		this.context.lineTo(this.width,this.height-60);
		this.context.lineTo(this.width,this.height);
		this.context.lineTo(0,this.height);
		this.context.fill();
		this.context.closePath();
	}
	darwStar(){
		this.starArr.forEach((v)=>{
			this.context.beginPath();
			this.context.fillStyle = "rgba(255,255,255,"+v[2]/10+")"; 
			this.context.arc(v[0],v[1],1,0,2*Math.PI);
			this.context.fill();
			this.context.closePath();
		});
	}
	drawMoon(){
		this.context.beginPath();
		var MoonStyle = this.context.createRadialGradient(300,150,38,300,150,50);
		MoonStyle.addColorStop(0,'rgba(255,255,255,1)');
		MoonStyle.addColorStop(1,'rgba(255,255,255,0)');
		this.context.fillStyle = MoonStyle; 
		this.context.arc(300,150,50,0,2*Math.PI);
		this.context.fill();
		this.context.closePath();
	}
	drawMeteor(){
		var meteorNum = this.rand(-9,9);
		if(meteorNum == 1){
			this.meteorArr.push([this.rand(0,this.width+this.height),0,this.rand(1,3)]);
		}
		this.meteorArr.forEach((v)=>{
			this.context.beginPath();
			this.context.fillStyle = "rgba(255,255,255,1)";
			if(v[0] > this.width){
				this.context.arc(v[0],v[1]+(v[0]-this.width),1,0,2*Math.PI);
			}else{
				this.context.arc(v[0],v[1],1,0,2*Math.PI);
			}
			this.context.fill();
			if(v[0] > this.width){
				var meteorStyle = this.context.createLinearGradient(v[0],v[1],v[0]+v[2]*20,v[1]+(v[0]-this.width)-v[2]*20);
				meteorStyle.addColorStop(0,"rgba(255,255,255,1)");
				meteorStyle.addColorStop(1,"rgba(255,255,255,0)");
				this.context.strokeStyle = meteorStyle;
				this.context.lineTo(v[0],v[1]+(v[0]-this.width));
				this.context.lineTo(v[0]+v[2]*20,v[1]+(v[0]-this.width)-v[2]*20);
			}else{
				var meteorStyle = this.context.createLinearGradient(v[0],v[1],v[0]+v[2]*20,v[1]-v[2]*20);
				meteorStyle.addColorStop(0,"rgba(255,255,255,1)");
				meteorStyle.addColorStop(1,"rgba(255,255,255,0)");
				this.context.strokeStyle = meteorStyle;
				this.context.lineTo(v[0],v[1]);
				this.context.lineTo(v[0]+v[2]*20,v[1]-v[2]*20);
			}
			this.context.stroke();
			this.context.closePath();
		})
		this.meteorArr.forEach((v,index)=>{
			v[0] -= v[2];
			v[1] += v[2];
			if(v[0] < -20 || v[1] > this.height){
				this.meteorArr.splice(index,1);
			}
		})
	}
	drawTimer(){
		this.drawSky();
		this.darwStar();
		this.drawMoon();
		this.drawMeteor();
		this.drawMountain();
		this.timer = setInterval(()=>{
			this.starArr.forEach((v)=>{
				if(v[2] + v[3] < 0 || v[2] + v[3] > 10){
					v[3] *= -1;
				}
				v[2] += v[3];
			});
			this.drawSky();
			this.darwStar();
			this.drawMoon();
			this.drawMeteor();
			this.drawMountain();
		},20)
	}
	rand(min,max){
		var c = max - min + 1;
		return Math.floor(Math.random() * c + min);
	}
} 
new FwhfStarrySky();