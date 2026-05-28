  // Progamm zu KreisdesAplollonius auf www.mathematik.ch
  // Oktober 2015: Applet vom Juli 2005 umgeschrieben auf html5 und Javascript  
  // copyright Bernhard Berchtold

    var W;
    var H;
    xmax = 10;
    xmin = -xmax;
    ymax = xmax;
    ymin = -ymax;
	var einheit;  // Einheit in Pixel
	xA=-8;
	yA=0;
	xB=2;
	yB=0;
	c=xB-xA;
	var xC=6;
	var yC=5;
	var xC1=4;
	var yC1;
	var xT1;
	yT1=0;
	var xT2;
	yT2=0;
	var xM;   // x-Koordinate Mittelpunkt Apolloniuskreis
	yM=0;
	var r;  // Radius von Thaleskreis=Apolloniuskreis über T1T2
	var oben=false;           // Lage von C1 zu Beginn unterhalb AB
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
	H=W;
	einheit=W/(xmax-xmin);
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
	document.getElementById("VarC1").checked=true;	
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
	  if (document.getElementById("VarC").checked) {
	    xC=mx;
		yC=my;
		xC1=xM+r/2;
        zeichne();		  
	  }
	  else {
	    xC1=mx;
		if ((xC1>xM-r) && (xC1<xM+r)) {
		oben=(my>=0);
        zeichne();
		}
	  }     
	 }
    }, false);
	zeichne();
  } 
  
  function resize1() {
	 canvas1.width=W; canvas1.height=H; 
  }

  function Line(x1,y1,x2,y2) {   
	ctx.beginPath();
	ctx.moveTo(map(0, x1), map(1, y1));
	ctx.lineWidth="1";
    ctx.lineTo(map(0, x2), map(1, y2));
	ctx.stroke();	
  }

  function map(sw,z) { 
    var s = 2;
    if (sw < 0.5)
       s = (z - xmin) / (xmax - xmin) * W;
    if (sw > 0.5)
       s = (ymax - z) / (ymax - ymin) * H;
    return s;
  }

  function invmap(sw,z) { 
    var ss = 2;
    if (sw < 0.5)
       ss = xmin + (z * (xmax - xmin)) / W;
    if (sw > 0.5)
       ss = (-z * (ymax - ymin)) / H - ymin;
    return ss;
  }

  // Berechnen und Plot der Kurve
  function zeichne(){  	
	ctx.clearRect(0,0,W,H);
    ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.lineWidth="1";
	Line(xmin,yA,xmax,yB);
	Line(xB,yB,xC,yC);	
	Line(xA,yA,xC,yC);
	ctx.font="14px Arial";
	ctx.fillText("A",map(0,xA)-5,map(1,yA)+12);
	ctx.fillText("B",map(0,xB)-5,map(1,yB)+12);
	if (yC>0) ctx.fillText("C",map(0,xC),map(1,yC)-5);
    else ctx.fillText("C",map(0,xC),map(1,yC)+12);	
	var a=BerechneLaenge(xB,yB,xC,yC);
	var b=BerechneLaenge(xA,yA,xC,yC);
	var q=b/a;
	b_zu_a.innerHTML=Math.round(1000*q)/1000;
	xT1=xA+q*c/(1+q);
	xT2=xA+q*c/(q-1);
	ctx.fillText("T1",map(0,xT1)-10,map(1,yT1)+12);
	ctx.fillText("T2",map(0,xT2)-10,map(1,yT2)+12);		
	ctx.strokeStyle = "red";
	Line(xT1,yT1,xC,yC);
	Line(xT2,yT2,xC,yC);
    a=BerechneLaenge(xB,yB,xT1,yT1);
	b=BerechneLaenge(xA,yA,xT1,yT1);
	q=b/a;
	AT1_zu_BT1.innerHTML=Math.round(1000*q)/1000;
    a=BerechneLaenge(xB,yB,xT2,yT2);
	b=BerechneLaenge(xA,yA,xT2,yT2);
	q=b/a;
	AT2_zu_BT2.innerHTML=Math.round(1000*q)/1000;	
    xM=(xT1+xT2)/2;
	r=BerechneLaenge(xM,yM,xT2,yT2);
	yC1 = f(xC1);
	if (!oben)  yC1=-yC1; 
	Line(xT1,yT1,xC1,yC1);
	Line(xT2,yT2,xC1,yC1);
    a=BerechneLaenge(xB,yB,xC1,yC1);
	b=BerechneLaenge(xA,yA,xC1,yC1);
	q=b/a;
	AC1_zu_BC1.innerHTML=Math.round(1000*q)/1000;	
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = "blue";
	ctx.arc(map(0,xM),map(1,yM),r*einheit,0,2*Math.PI)
    ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = "green";	
	Line(xA,yA,xC1,yC1);
	Line(xB,yB,xC1,yC1);
	if (yC1>0) ctx.fillText("C1",map(0,xC1)-10,map(1,yC1)-5);
      else ctx.fillText("C1",map(0,xC1)-10,map(1,yC1)+12);
    ctx.stroke();   	
  }

  function dostep() {
	if (document.getElementById("VarC").checked) {  
      xC=xC+0.5;
	  if (xC>xmax) xC=xmin+1;
	  xC1=xM+r/2;
    }
    else {
      if (xC1-xM==0) xC1=xM+0.1;
	  var Winkel=Math.abs(Math.atan((yC1-yM)/(xC1-xM)));       
	  if ((xC1<xM) && (yC1>yM)) Winkel = Math.PI-Winkel;
	  if ((xC1<xM) && (yC1<yM)) Winkel = Math.PI+Winkel;
	  if ((xC1>xM) && (yC1<yM)) Winkel = 2*Math.PI-Winkel;
	  Winkel=Winkel+Math.PI*5/180;
	  if (Winkel>Math.PI) oben=false;
      if (Winkel>2*Math.PI)	{
		  Winkel=Winkel-2*Math.PI;
		  oben=true;
	  }	  
	  xC1=xM+r*Math.cos(Winkel);
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
    { var s = 0.0;
      s = Math.sqrt(r*r-(x-xM)*(x-xM));
      return s;
    }

  function BerechneLaenge(x1,y1,x2,y2) {
	var Hilf=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
    return Hilf;
  }	

	