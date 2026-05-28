  // Progamm zu Kegelschnitte auf www.mathematik.ch
  // copyright Bernhard Berchtold

    var W,H;
    xmax = 10;
    xmin = -xmax;
    ymax = xmax;
    ymin = -ymax;
	var einheit; // Einheit in Pixel
	xF=0;
	yF=0;
	yl=-4;
	xF1=-6;
	xF2=-xF1;
	var yA;
	var yB;
	xC=xmin+0.5;
	var yC=2;
	var r,r2;        
	var yP1;
	var xP1;
	xP = new Array();
	yP = new Array();
	var anzahl=0;
	var mode=2;    // Parabel
	var canvas1;
    var ctx;
	var initmade=false;
	var mousedown=false;

window.onload=resizeCanvas;

	function resizeCanvas() {
    var canvs = document.getElementById("containercanvas");
    W = canvs.offsetWidth;
	if (W>500) W=500;
	einheit=W/(xmax-xmin);
	H=W;
	if (initmade) {
	  resize1();
	  zeichne();
	} else init();	
  }

  function init() {
	initmade=true;
	window.addEventListener('resize', function(event){
      resizeCanvas();
    });
    canvas1=document.getElementById('myCanvas');
	resize1();
    ctx = canvas1.getContext('2d');
	document.getElementById(mode).style.backgroundColor ="#00FF00";   	
	canvas1.addEventListener('mousedown', function(evt) { 
	  mousedown=true;
      }, false);
	canvas1.addEventListener('mouseup', function(evt) { 
	  mousedown=false;
      }, false);	  
	canvas1.addEventListener('mousemove', function(evt) {  
     if (mousedown) {
	  var mousePos = getMousePos(canvas1, evt);
      var my = invmap(1,mousePos.y);
	  if (mode==1) {
	    yC=my;
        if (yC>yA) yC=yA;
        if (yC<yB) yC=yB;
        zeichne();		
	  }
	  if (mode==3) {
	    yC=my;
	    if (yC>yB) yC=yB;
        zeichne();		
	  }
	  if (mode==2) {	
	    yC=my;
	    if (yC<(yl+yF)/2) yC=(yl+yF)/2;
		zeichne();
	  }		  
	 }
    }, false);

	zeichne();
  } 

  function resize1() {
	 canvas1.width=W; canvas1.height=H; 
  }

  function button1() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode=1;
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	yA=8; yB=-8; yC=2; anzahl=0;
	zeichne();  
  }

  function button2() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode=2;
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	yC=2; anzahl=0; 
	zeichne(); 
  }

  function button3() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode=3;
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	yC=-7; yA=8; yB=-1; anzahl=0;
    zeichne();	      
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
	ctx.lineWidth="1";
	ctx.font = "14px sans-serif";
	ctx.strokeStyle = "#A0A0A0";
	Line(xC,ymin,xC,ymax);
	ctx.stroke();
	ctx.fillText("C",map(0,xC)+2,map(1,yC)+14);
    ctx.beginPath();	
	ctx.strokeStyle = "orange";
	ctx.arc(map(0,xC),map(1,yC),3,0,2*Math.PI);	
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = "black";
	if ((mode==1) || (mode==3)) {
	  ctx.fillText("A",map(0,xC)+2,map(1,yA));
	  ctx.fillText("B",map(0,xC)+2,map(1,yB)+8);	  
	  Line(xC,yB,xC,yA);
      ctx.stroke();
	  ctx.beginPath();	  
	  ctx.arc(map(0,xF1),map(1,yF),2,0,2*Math.PI);
	  ctx.stroke();
	  ctx.fillText("F1",map(0,xF1)-7,map(1,yF)+16);
	  ctx.fillText("F2",map(0,xF2)-7,map(1,yF)+16);	  
	  ctx.beginPath();	  
	  ctx.arc(map(0,xF2),map(1,yF),2,0,2*Math.PI);
	  ctx.stroke();
	  ctx.beginPath();
	  ctx.strokeStyle = "green";
	  r=Math.abs(yA-yC);
	  r2=Math.abs(yC-yB);
	  ctx.arc(map(0,xF1),map(1,yF),r*einheit,0,2*Math.PI);
	  ctx.stroke();
	  ctx.beginPath();
	  ctx.arc(map(0,xF2),map(1,yF),r2*einheit,0,2*Math.PI);
	  ctx.stroke();
	  xP1=(r*r-r2*r2-xF1*xF1+xF2*xF2)/2/(xF2-xF1); xP[anzahl]=xP1;
	  yP1=Math.sqrt(r*r-(xP1-xF1)*(xP1-xF1)); yP[anzahl]=yP1;
	  if (anzahl<300) anzahl=anzahl+1; 	    
	  ctx.strokeStyle = "blue";
	  for (var i=0;i<anzahl;i++) {
		ctx.beginPath();
	    ctx.arc(map(0,xP[i]),map(1,yP[i]),1,0,2*Math.PI);
	    ctx.stroke();
        ctx.beginPath();	  
	    ctx.arc(map(0,xP[i]),map(1,-yP[i]),1,0,2*Math.PI);
        ctx.stroke();
		if (mode==3) {	  
	      ctx.beginPath();
	      ctx.arc(map(0,-xP[i]),map(1,yP[i]),1,0,2*Math.PI);
	      ctx.stroke();
	      ctx.beginPath();
	      ctx.arc(map(0,-xP[i]),map(1,-yP[i]),1,0,2*Math.PI);
	      ctx.stroke();	  
	    }
	  }	
	  ctx.beginPath();
	  ctx.arc(map(0,xP1),map(1,yP1),2,0,2*Math.PI);
	  ctx.stroke();
	  ctx.beginPath();
	  ctx.arc(map(0,xP1),map(1,-yP1),2,0,2*Math.PI);
	  ctx.stroke();  
	  if (mode==3) {	  
	    ctx.beginPath();
	    ctx.arc(map(0,-xP1),map(1,yP1),2,0,2*Math.PI);
	    ctx.stroke();
	    ctx.beginPath();
	    ctx.arc(map(0,-xP1),map(1,-yP1),2,0,2*Math.PI);
	    ctx.stroke();	  
	  }
	}

	if (mode==2) {
	  Line(xmin,yl,xmax,yl);
	  Line(xC,(yl+yF)/2,xC,ymax);
	  ctx.stroke();
      ctx.beginPath();	  
	  ctx.arc(map(0,xF),map(1,yF),2,0,2*Math.PI);
	  ctx.stroke();
	  ctx.fillText("F",map(0,xF)-5,map(1,yF)+16);
	  ctx.fillText("l",W/2,map(1,yl)+14);	  
      ctx.beginPath();
	  ctx.strokeStyle = "green";	
	  Line(xmin,yC,xmax,yC);
	  ctx.stroke();
      ctx.beginPath();
	  r=yC-yl;
	  ctx.arc(map(0,xF),map(1,yF),r*einheit,0,2*Math.PI);
      ctx.stroke();
	  yP1=yC; yP[anzahl]=yP1;
      xP1=f(0,yP1);	xP[anzahl]=xP1; 
	  if (anzahl<300) anzahl=anzahl+1; 
	  ctx.strokeStyle = "blue";
	  for (var i=0;i<anzahl;i++) {
		ctx.beginPath();
	    ctx.arc(map(0,xP[i]),map(1,yP[i]),1,0,2*Math.PI);
	    ctx.stroke();
        ctx.beginPath();	  
	    ctx.arc(map(0,-xP[i]),map(1,yP[i]),1,0,2*Math.PI);
        ctx.stroke();
	  }	
      ctx.beginPath();	  
	  ctx.arc(map(0,xP1),map(1,yP1),2,0,2*Math.PI);
	  ctx.stroke();
      ctx.beginPath();	  
	  ctx.arc(map(0,-xP1),map(1,yP1),2,0,2*Math.PI);
      ctx.stroke();	  
    }	  
  }

  function dostep() {
   if (mode==2) {	
	  yC=yC+0.5;
	  if (yC>ymax) yC=(yl+yF)/2;
   }    	
   if (mode==1) {
	  ctx.beginPath();
	  ctx.strokeStyle = "white";
	  ctx.arc(map(0,xF1),map(1,yF),r*einheit,0,2*Math.PI);
      ctx.stroke();
	  ctx.beginPath();
	  ctx.arc(map(0,xF2),map(1,yF),r2*einheit,0,2*Math.PI);		
	  ctx.stroke();
	  yC=yC+0.5;		
	  if (yC>yA) yC=yB+0.5;
   }
   if (mode==3) {
	  ctx.beginPath();
	  ctx.strokeStyle = "white";
	  ctx.arc(map(0,xF1),map(1,yF),r*einheit,0,2*Math.PI);
      ctx.stroke();
	  ctx.beginPath();
	  ctx.arc(map(0,xF2),map(1,yF),r2*einheit,0,2*Math.PI);		
	  ctx.stroke();
	  yC=yC+0.5;		
	  if (yC>yB) yC=ymin;
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
	  
  function f(u,y) {
	s = 0.0;
    s = Math.sqrt(r*r-y*y)+u;
    return s;
  }

  function BerechneLaenge(x1,y1,x2,y2) {
	var Hilf=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
    return Hilf;
  }	


	