  // Progamm zu Peripherie_Zentriwinkel auf www.mathematik.ch
  // copyright Bernhard Berchtold

    var W;
    var H;
    xmax = 1.1;
    xmin = -xmax;
    ymax = xmax;
    ymin = -ymax;
    var xm;
    var ym;
	var r;  // Einheit in Pixel
	xA=-1;
	yA=0;
	WinkelA=Math.PI;
	var xB=0.8;
	var yB=-f(xB);
	var xP=-0.2;
	var yP=f(xP);
	var canvas1;
    var ctx;
	var mousedown=false;
	var initmade=false;
	
window.onload=resizeCanvas;	
    
  function resizeCanvas() {
    var canvs = document.getElementById("containercanvas");
    canvs.width = canvs.offsetWidth;
    // canvs.height = canvs.offsetHeight;
	W=canvs.width;
	if (W>320) W=320;
	H=W;
	einheit=W/(xmax-xmin);
	xm = W/2; ym = H/2;
	r = W/(xmax-xmin);
	if (initmade) {
	  resize1();  
	  zeichne();
	} else init();	
  }
  
  function init() {
	initmade=true;
	window.addEventListener('resize', function(event){
      resizeCanvas()
    });
    canvas1=document.getElementById('myCanvas');
	resize1();
    ctx = canvas1.getContext('2d');
	document.getElementById("VarP").checked=true;
    document.getElementById("Tk").checked=false;	
	canvas1.addEventListener('mousedown', function(evt) { 
	  mousedown=true;
      }, false);
	canvas1.addEventListener('mouseup', function(evt) { 
	  mousedown=false;
      }, false);	  
	canvas1.addEventListener('mousemove', function(evt) {  
     if (mousedown) {
	  var mousePos = getMousePos(canvas1, evt);
      var mx = invmap(0,mousePos.x); var my = invmap(1,mousePos.y);
	  if (document.getElementById("VarB").checked) {
	    xB=mx; if (xB>1) xB=1; if (xB<-1) xB=-1;
		yB=f(xB);
	    if (my<0) yB=-yB;
        zeichne();		  
	  }
	  else {
	    xP=mx; if (xP>1) xP=1; if (xP<-1) xP=-1;
		yP=f(xP);
	    if (my<0) yP=-yP;
        zeichne();
	  }     
	 }
    }, false);
	zeichne();
  } 
  
  function resize1() {
	 canvas1.width=W; canvas1.height=H; 
  }
  
  function OnChangeradio2 (radio) {
    if (radio.checked) {
	     document.getElementById("Tk").checked=false;}
  }

  function OnChangeCheckbox (checkbox) {
    if (checkbox.checked) {
		 xB=1; yB=0;
		 document.getElementById("VarP").checked=true;
	     document.getElementById("VarB").checked=false;
		 zeichne();}
  }
  
  function Line(x1,y1,x2,y2)
    {   
		ctx.beginPath();
		ctx.moveTo(map(0, x1), map(1, y1));
	    ctx.lineWidth="1";
        ctx.lineTo(map(0, x2), map(1, y2));
		ctx.stroke();	
    }

  function map(sw,z)
    {   s = 2;
        if (sw < 0.5)
            s = (z - xmin) / (xmax - xmin) * W;
        if (sw > 0.5)
            s = (ymax - z) / (ymax - ymin) * H;
        return s;
    }

  function invmap(sw,z)
    {   ss = 2;
        if(sw < 0.5)
            ss = xmin + (z * (xmax - xmin)) / W;
        if(sw > 0.5)
            ss = (-z * (ymax - ymin)) / H - ymin;
        return ss;
    }


  // Berechnen und Plot der Kurve
  function zeichne(){  	
	ctx.clearRect(0,0,W,H);
    ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.lineWidth="1";
	ctx.arc(xm,ym,r,0,2*Math.PI);
	ctx.stroke();
	ctx.beginPath();
	Line(xA,yA,0,0);
	Line(xB,yB,0,0);	
	Line(xA,yA,xB,yB);	
	ctx.strokeStyle = "red";
	Line(xA,yA,xP,yP);
	Line(xB,yB,xP,yP);
	ctx.stroke();
	var Winkel=BerechneWinkel(xA,yA,xB,yB,xP,yP);
	var WinkelGerundet=Math.round(18000*Winkel/Math.PI)/100;
	peripherie.innerHTML=WinkelGerundet;
	zentri.innerHTML=2*WinkelGerundet;       
	var WinkelB=BerechnePhi(xB,yB);
	ctx.beginPath();
	ctx.strokeStyle = "black";
    if (yB<0) {
	  if (Winkel<Math.PI/2) ctx.arc(xm,ym,20,2*Math.PI-WinkelB,2*Math.PI-WinkelA);
      else ctx.arc(xm,ym,20,2*Math.PI-WinkelA,2*Math.PI-WinkelB);
	}
	else {
	  if (Winkel>Math.PI/2) ctx.arc(xm,ym,20,2*Math.PI-WinkelB,2*Math.PI-WinkelA);
      else ctx.arc(xm,ym,20,2*Math.PI-WinkelA,2*Math.PI-WinkelB);
	}
    ctx.stroke();
	ctx.font="14px Arial";
	ctx.fillText("A",map(0,xA)-10,map(1,yA)+10);
	ctx.fillText("B",map(0,xB),map(1,yB)+10);
	if (yP>0) ctx.fillText("P",map(0,xP)-10,map(1,yP)-3);
	  else ctx.fillText("P",map(0,xP)-10,map(1,yP)+12);
	ctx.fillText("M",map(0,0)-5,map(1,0)-5);	
  }

  function dostep() {
	if (document.getElementById("VarB").checked) {  
      var Winkel=BerechnePhi(xB,yB);
	  Winkel=Winkel+Math.PI*5/180;
      if (Winkel>2*Math.PI)	Winkel=Winkel-2*Math.PI;
	  xB=Math.cos(Winkel); yB=Math.sin(Winkel);
    }
    else {
      var Winkel=BerechnePhi(xP,yP);
	  Winkel=Winkel+Math.PI*5/180;
      if (Winkel>2*Math.PI)	Winkel=Winkel-2*Math.PI;
	  xP=Math.cos(Winkel); yP=Math.sin(Winkel);	
    }
    zeichne();
  }

  function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }

  function f(x)
    { s = 0.0;
      s = Math.sqrt(1-(x * x));
      return s;
    }

  function BerechnePhi(x,y) {
	var res=Math.abs(Math.atan(y/x));                // x ist hier nie Null
	if ((x<0) && (y>0)) res = Math.PI-res;
	if ((x<0) && (y<0)) res = Math.PI+res;
	if ((x>0) && (y<0)) res = 2*Math.PI-res;
    return res;	  
  }

  function BerechneWinkel(a1,a2,b1,b2,c1,c2) {          // Winkel bei c1/c2 in rad
	var c=Math.sqrt((b1-a1)*(b1-a1)+(b2-a2)*(b2-a2));
	var a=Math.sqrt((b1-c1)*(b1-c1)+(b2-c2)*(b2-c2));
	var b=Math.sqrt((a1-c1)*(a1-c1)+(a2-c2)*(a2-c2));
    if ((a!=0) && (b!=0) && (c!=0)) Hilf=Math.acos((a*a+b*b-c*c)/2/a/b);
	  else Hilf=NaN;
    return Hilf;
  }	

	