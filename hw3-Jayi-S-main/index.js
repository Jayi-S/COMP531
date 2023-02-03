$(document).ready(function() {
	//localstorage
	//if(localStorage.getItem('grade')){
	//	$("#last").html(`The maximum hold time for this game is:${localStorage.getItem('grade')}second!!`)
	//}
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext("2d");

	canvas.width = 576;
	canvas.height = 324;

	//score=0
	var monsterSum = 0;
	var monsterList = new Array();
	monsterList[monsterSum] = new monster();
	//create keydown
	var keysDown = {};

	//-------add listener------
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	});

	//init background
	var bgReady = false;
	var bgImage = new Image();

	bgImage.src = "image/bg.png";
	bgImage.onload = function () {
		bgReady = true;
		Ready()
	}
	//init user image
	var UserReady = false;
	var UserImage = new Image();
	UserImage.src = "image/2.png";
	UserImage.onload = function () {
		UserReady = true;
	}

	var User = {
		speed: 100,
		x: canvas.width / 2,
		y: canvas.height / 2
	}


	//init monster image
	var monsterReady = false;
	var monsterImage = new Image();
	monsterImage.src = "image/pet.png";
	monsterImage.onload = function () {
		monsterReady = true;
	}



	function monster() {

		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.speed = 30;
		this.xDir = 1;
		this.yDir = 1;




		this.move = function (modifier) {
			this.x += this.xDir * this.speed * modifier;
			this.y += this.yDir* this.speed * modifier;
			if (this.x >= canvas.width - 32) {
				this.x = canvas.width - 32;
				this.xDir = -1;
			} else if (this.x <= 0) {
				this.x = 0;
				this.xDir = 1;
			} else if (this.y >= canvas.height - 32) {
				this.y = canvas.height - 32;
				this.yDir = -1;
			} else if (this.y <= 0) {
				this.y = 0;
				this.yDir = 1;
			}

		};
	}
	//flages
	var Startflag = false
	var stopflag=false;
	//keywords control player
	var Move = function (modifier) {

		if (38 in keysDown) {
			User.y -= User.speed * modifier;
		}
		if (40 in keysDown) {
			User.y += User.speed * modifier;
		}
		if (39 in keysDown) {
			User.x += User.speed * modifier;
		}
		if (37 in keysDown) {

			User.x -= User.speed * modifier;
		}

		if (User.x > canvas.width - 40) {
			User.x = canvas.width-40;
		} else if (User.x <= 0) {
			User.x = 0 ;
		}
		if (User.y > canvas.height - 40) {
			User.y = canvas.height-40;
		} else if (User.y <= 0) {
			User.y = 0;
		}

		for (var i = 0; i <= monsterSum; i++) {
			if(stopflag){
				break;

			}

			monsterList[i].move(modifier);
		}

	}

	var Ready = function () {
		if (bgReady) {
			ctx.drawImage(bgImage, 0, 0);
		}
		ctx.fillStyle = "rgb(900, 900, 900)";
		ctx.font = "20px Calibri Light ";
		ctx.textAlign = "center";
		ctx.color="black"
		ctx.textBaseline = "top";
	}
	var stop1=0;
	var stop2=0;

	var Draw = function () {
		if (bgReady) {
			ctx.drawImage(bgImage,0, 0);
		}

		if (UserReady) {
			ctx.drawImage(UserImage, User.x, User.y);
		}
		if (monsterReady) {
			for (var i = 0; i <= monsterSum; i++)
				ctx.drawImage(monsterImage, monsterList[i].x, monsterList[i].y);
		}

	//	if(stopflag){
	//		stop1 = Date.now()- start

	//	}else if(stopflag==false){
	//		stop2=Date.now()- start
	//	}

	//	stop=stop2-stop1;
		last = Date.now() - start;

		ctx.fillText("time:"+ last / 1000, 500, canvas.height - 64);
		//ctx.fillText("start times:"+ click, 300, canvas.height - 64);
		//ctx.fillText("time:"+ stop / 1000, 200, canvas.height - 64);
		//stop2=0
		//stop1=0
		//stop=0
		Startflag = true
	}
	var getgrade=function (){
		document.getElementById("k").innerHTML=getCookie("username");

	}
	var setgrade=function (){
		document.getElementById("k").innerHTML="Your last score is "+last+"!";
	}

	var Check = function () {
		//add 1 monster per 10 second
		var gentime=Math.floor(last / 10000);

		if (monsterSum != gentime && stopflag==false) {
			monsterSum=monsterSum+1;
			//add
			monsterList[monsterSum] = new monster();
		}

		counter=0;
		for (var i = 0; i <= monsterSum; i++) {
			if(flag){
				counter=0;
			}
		//check enermy
			if (
				(monsterList[i].x - 32) <= User.x
				&& User.x <= (monsterList[i].x + 32)
				&& (monsterList[i].y - 32) <= User.y
				&& User.y <= (monsterList[i].y + 32)

			) {

				end = Date.now();
				const tmp=(end - start) / 1000;
				alert("you played" + tmp + "second :)");
				//console.log(tmp);
				//coockie store
				//const count =counter/1;
				document.getElementById("finalgrade").innerHTML=getCookie("Finalgrade");
				document.getElementById("grade").innerHTML=getCookie("tgrade");
				document.getElementById("last").innerHTML=getCookie("mylast");
				//setCookie("clast",counter,30);
				//x =getCookie("mylast")
				//var counter = parseInt(x[0])+1;
				var x=getCookie("mylast")

				counter=parseInt(x)+1;
				//x=String(counter)
				//counter=x
				//var cList = new Array()
				//cList[0]=x
				counter=String(counter);
				//counter.toString();
				document.getElementById("last").innerHTML= "times of starting game(click start button): "+counter+"times";
				counter=parseInt(counter)
				setCookie("mylast",counter,30);

				//counter/1;

				//console.log(counter)

				document.getElementById("grade").innerHTML="Your last score is "+tmp+" second!";
				if(getCookie("Finalgrade") == "" ||(parseInt(getCookie("Finalgrade"))<tmp)){
					setCookie("Finalgrade",tmp,30);
					setCookie("tgrade", tmp, 30);


				}
				var final=getCookie("Finalgrade")
				document.getElementById("finalgrade").innerHTML="The best record is "+final+"second!";

				End();


				// localstorage method
				if(localStorage.getItem('grade') && tmp>localStorage.getItem('grade')) {
					localStorage.setItem('grade',`${tmp}`)
				}else{
					localStorage.setItem('grade',`${tmp}`)
				}
				//End();
				//$("#grade").html(`grade:${localStorage.getItem('grade')}second`)

			}
		}
	}

	var End = function () {
		if (bgReady) {
			ctx.drawImage(bgImage, 0, 0);
		}
		window.clearInterval(timer);
		Startflag = false
		//chenge flage
		return;
	}

	var main = function () {
		var now = Date.now();
		var delta = now - then;
		Move(delta / 1000);
		//grade();
		//over();
		Draw()
		Check();


		then = now;
	}

	var then = Date.now();
	var start = then;
	var timer = null
	var click=0
	function Reset(){
		//reset
		monsterSum = 0;
		monsterList = new Array();
		monsterList[monsterSum] = new monster();
		User = {
			speed: 100,
			x: canvas.width / 2,
			y: canvas.height / 2
		}
	}
	$("#stopBtn").on('click',function(){
	stopflag=true;


	})
	$("#continue").on('click',function(){
		stopflag=false;
		flag=true;


	})

    var flag=false;
	$("#startBtn").on('click',function(){
		if(Startflag) return false
		flag=true;
		End()
		Reset()
		Startflag = true
		then = Date.now();
		start = then;
		timer = setInterval(main, 1);
	})
	$('.moveBtn').mousedown(function(){
        var keyCode = $(this).attr('keyCode')
		keysDown[keyCode] = true;
		
    })
	$('.moveBtn').mouseout(function(){
		var keyCode = $(this).attr('keyCode')
        delete keysDown[keyCode];
    })
	function setCookie(cname, cvalue, days) {
		var d = new Date();
		date=(days*24*60*60*1000);
		d.setTime(d.getTime() + date);
		var cdate = "date=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" +cdate + ";path=/";
	}



	// Function to get the cookie
	function getCookie(cname) {
		var name = cname + "=";
		var c_list = document.cookie.split(';');
		for (var i = 0; i < c_list.length; i++) {
			var c = c_list[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

//reset();
	
	
//1s
});
