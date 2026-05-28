  // Progamm zur Eulerschen Geraden auf www.mathematik.ch
  // copyright Bernhard Berchtold

    var W;
    var H;
    xmax = 1.01;
    xmin = -xmax;
    ymax = xmax;
    ymin = -ymax;
    xm = W/2;
    ym = H/2;
	r=W/(xmax-xmin);  // Einheit in Pixel
	xA=-0.7;
	yA=-f(xA);
	var xB=-xA;
	var yB=yA;
	var xC=-0.2;
	var yC=f(xC);
	var xMa,yMa;
	var xMb,yMb;
	var xMc,yMc;
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
	document.getElementById("VarC").checked=true;	
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
	    xC=mx; if (xC>1) xC=1; if (xC<-1) xC=-1;
		yC=f(xC);
	    if (my<0) yC=-yC;
        zeichne();
	  }     
	 }
    }, false);
	zeichne();
  } 
  
  function resize1() {
	 canvas1.width=W; canvas1.height=H; 
  }

  function reset() {
	document.getElementById("VarC").checked=true;
	document.getElementById("VarB").checked=false;
	xB=-xA;
	yB=yA;
	xC=-0.2;
	yC=f(xC);		
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


  function zeichne(){  	
	ctx.clearRect(0,0,W,H);
    ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.lineWidth="1";
	ctx.arc(W/2,H/2,r,0,2*Math.PI)
	ctx.stroke();
	ctx.beginPath();
	Line(xA,yA,xC,yC);
	Line(xB,yB,xC,yC);	
	Line(xA,yA,xB,yB);
	xMa=(xB+xC)/2; yMa=(yB+yC)/2;
	xMb=(xA+xC)/2; yMb=(yA+yC)/2;
	xMc=(xA+xB)/2; yMc=(yA+yB)/2;
	Line(xMa,yMa,xMc,yMc);
	Line(xMb,yMb,xMc,yMc);	
	Line(xMa,yMa,xMb,yMb);	
	ctx.stroke();
	ctx.beginPath();	
	ctx.strokeStyle = "green";
	Line(xC,yC,xMc,yMc);
	Line(xA,yA,xMa,yMa);	
	Line(xB,yB,xMb,yMb);
	var xS=(xA+xB+xC)/3; var yS=(yA+yB+yC)/3;
	ctx.stroke();
	ctx.beginPath();	
	ctx.strokeStyle = "red";
	var t=Berechne_t(xB,yB,xC,yC,xA,yA);	
	var xD=xB+t*(xC-xB); var yD=yB+t*(yC-yB);
	Line(xA,yA,xD,yD);
    t=Berechne_t(xA,yA,xC,yC,xB,yB);	
	var xE=xA+t*(xC-xA); var yE=yA+t*(yC-yA);
	Line(xB,yB,xE,yE);
	t=Berechne_t(xA,yA,xB,yB,xC,yC);	
	var xF=xA+t*(xB-xA); var yF=yA+t*(yB-yA);
	Line(xC,yC,xF,yF);
	var xH=3*xS; var yH=3*yS;
	ctx.stroke();
	ctx.beginPath();	
	ctx.strokeStyle = "#A0A0A0";
	var xDstrich=xS-0.5*(xD-xS); var yDstrich=yS-0.5*(yD-yS);
	Line(xMa,yMa,xDstrich,yDstrich);	
	var xEstrich=xS-0.5*(xE-xS); var yEstrich=yS-0.5*(yE-yS);
	Line(xMb,yMb,xEstrich,yEstrich);
	var xFstrich=xS-0.5*(xF-xS); var yFstrich=yS-0.5*(yF-yS);
	Line(xMc,yMc,xFstrich,yFstrich);	
    ctx.stroke();	
	ctx.beginPath();	
	ctx.strokeStyle = "blue";
    Line(0,0,xH,yH);	              // Strecke MH auf Eulerschen Geraden
    ctx.stroke();
	ctx.font="14px Arial";
	ctx.fillText("A",map(0,xA)-10,map(1,yA)+10);
	ctx.fillText("B",map(0,xB),map(1,yB)+10);
	ctx.fillText("C",map(0,xC)-10,map(1,yC)+5);
	ctx.fillText("M",map(0,0)-5,map(1,0.0)+5);
	ctx.fillText("A\'",map(0,xMa),map(1,yMa));
	ctx.fillText("B\'",map(0,xMb)-10,map(1,yMb));
	ctx.fillText("C\'",map(0,xMc)-10,map(1,yMc)+12);
	ctx.fillText("S",map(0,xS),map(1,yS));
	ctx.fillText("D",map(0,xD),map(1,yD));
	ctx.fillText("E",map(0,xE)-10,map(1,yE));
	ctx.fillText("F",map(0,xF),map(1,yF)+12);
	ctx.fillText("H",map(0,xH),map(1,yH)+10);
	ctx.fillText("D\'",map(0,xDstrich)-10,map(1,yDstrich));
	ctx.fillText("E\'",map(0,xEstrich),map(1,yEstrich)+10);
	ctx.fillText("F\'",map(0,xFstrich)-5,map(1,yFstrich));	
  }

  function dostep() {
	if (document.getElementById("VarB").checked) {  
      var Winkel=BerechnePhi(xB,yB);
	  Winkel=Winkel+Math.PI*5/180;
      if (Winkel>2*Math.PI)	Winkel=Winkel-2*Math.PI;
	  xB=Math.cos(Winkel); yB=Math.sin(Winkel);
    }
    else {
      var Winkel=BerechnePhi(xC,yC);
	  Winkel=Winkel+Math.PI*5/180;
      if (Winkel>2*Math.PI)	Winkel=Winkel-2*Math.PI;
	  xC=Math.cos(Winkel); yC=Math.sin(Winkel);
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

  function BerechnePhi(x,y) {             // x ist hier nie Null
	var res=Math.abs(Math.atan(y/x));
	if ((x<0) && (y>0)) res = Math.PI-res;
	if ((x<0) && (y<0)) res = Math.PI+res;
	if ((x>0) && (y<0)) res = 2*Math.PI-res;
    return res;	  
  }

  function BerechneWinkel() {
	var c=Math.sqrt((xB-xA)*(xB-xA)+(yB-yA)*(yB-yA));
	var a=Math.sqrt((xB-xC)*(xB-xC)+(yB-yC)*(yB-yC));
	var b=Math.sqrt((xA-xC)*(xA-xC)+(yA-yC)*(yA-yC));
    if ((a!=0) && (b!=0) && (c!=0)) Hilf=Math.round(18000*Math.acos((a*a+b*b-c*c)/2/a/b)/Math.PI)/100;
	  else Hilf=NaN;
    return Hilf;
  }	

  function Berechne_t(a1,a2,b1,b2,c1,c2) {            // für Fusspunkt Höhe von c1/c2 auf a1/a2 b1/b2
    var zaehler=(c1-a1)*(b1-a1)+(c2-a2)*(b2-a2);
	var nenner=(b1-a1)*(b1-a1)+(b2-a2)*(b2-a2);
    if (nenner!=0) t=zaehler/nenner;
	  else t=NaN;
    return t;
  }	
