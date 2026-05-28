  // Progamm zu komplexeZahlen auf www.mathematik.ch
  // copyright Bernhard Berchtold

    var H;
    var W;
	var Ursprungx;
	var Ursprungy;
    deltax = 40;
    xmax = 10;
    xmin = -xmax;
    ymax = 10;
    ymin = -ymax;
    var x1 = 1;
    var y1 = 3;
    var x2 = -2;
    var y2 = 1;	
	var canvas1;
    var ctx;
	var zx;
	var zy;
	var mode=1;  //Addition
	var kartesisch=true;  //kartesisch
	var mousedown=false;
	var initmade=false;
	
window.onload=resizeCanvas;
    
  function resizeCanvas() {
    var canvs = document.getElementById("containercanvas");
    canvs.width = canvs.offsetWidth;
    // canvs.height = canvs.offsetHeight;
	W=canvs.width;
	if (W>400) W=400;
	H=W;	
	Ursprungx=H/2;
	Ursprungy=W/2;
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
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	document.getElementById("kartesisch").style.backgroundColor ="#00FF00";
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
	   if (Math.abs(mx-x1)+Math.abs(my-y1)<Math.abs(mx-x2)+Math.abs(my-y2)) {
		 x1=mx; y1=my;
	   }
	   else {
		 x2=mx; y2=my;
	   }
	   if (mode==1) { doAddition(); }
       if (mode==2) { doSubtraktion(); }
       if (mode==3) { doMultiplikation(); }
       if (mode==4) { doDivision(); }	 	   
	 }
    }, false);	
	zx=x1+x2; zy=y1+y2;
    zeichne();
  }

  function resize1() {
	 canvas1.width=W; canvas1.height=H; 
  }

  function button1() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode=1;
	document.getElementById(mode).style.backgroundColor ="#00FF00";  
    doAddition();
  }

  function button2() {
 	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode=2;
	document.getElementById(mode).style.backgroundColor ="#00FF00";
    doSubtraktion();
  }

  function button3() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode=3;
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	doMultiplikation();
  }

  function button4() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode=4;
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	doDivision();
  }  

  function button5() {
	document.getElementById("polar").style.backgroundColor ="#E0FFFF";
	kartesisch=true;
	document.getElementById("kartesisch").style.backgroundColor ="#00FF00";
	zeichne();
  } 

  function button6() {
	document.getElementById("kartesisch").style.backgroundColor ="#E0FFFF";
	kartesisch=false;
	document.getElementById("polar").style.backgroundColor ="#00FF00";
	zeichne();
  } 
  
  function calc() {
	x1=parseFloat(document.getElementById("x1").value); y1=parseFloat(document.getElementById("y1").value);
	x2=parseFloat(document.getElementById("x2").value); y2=parseFloat(document.getElementById("y2").value); 	  
    if (mode==1) { doAddition(); }
    if (mode==2) { doSubtraktion(); }
    if (mode==3) { doMultiplikation(); }
    if (mode==4) { doDivision(); }	  
  }

  function doAddition() {
    zx=x1+x2; zy=y1+y2;
    zeichne();  
  }

  function doSubtraktion() {
	zx=x1-x2; zy=y1-y2;	   
    zeichne();  
  }
  
  function doMultiplikation() {
	zx=x1*x2-y1*y2; zy=x1*y2+x2*y1;	   
    zeichne();  
  }

  function doDivision() {
	var nenner=x2*x2+y2*y2;
	if (nenner>0) { 
	  zx=(x1*x2+y1*y2)/nenner; 
	  zy=(-x1*y2+x2*y1)/nenner;
	}
	else {zx=NaN; zy=NaN;}
	zeichne();  
  }

  function Line(x1,y1,x2,y2) {   
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

  function koordsys() {
	ctx.strokeStyle = "#A0A0A0";	
    for (var i=-10;i<=10;i++) {
	  Line(xmin,i,xmax,i);
	  Line(i,ymin,i,ymax);
	}
  }

  function beschriftung() {
  	ctx.strokeStyle = "black";
	Line(xmin, 0, xmax, 0);
	Line(xmax-0.3,-0.3,xmax,0); Line(xmax-0.3,0.3,xmax,0);
    Line(1.0, -0.03, 1.0, 0.03);
	ctx.strokeText('1', map(0,1) - 4, map(1,0) + 12);
    Line(0, ymin, 0, ymax);
	Line(-0.3,ymax-0.3,0,ymax); Line(0.3,ymax-0.3,0,ymax);		
    Line(-0.03, 1.0, 0.03, 1.0);
	ctx.strokeText('1', map(0,0) - 8, map(1,1) + 4);	
  }

  function polarKS() {
	ctx.strokeStyle = "#A0A0A0";
	for (var i=1;i<=14;i++) {
	  ctx.arc(Ursprungx, Ursprungy, map(0,i)-Ursprungx, 0, 2*Math.PI);
	}
	ctx.stroke();
  }

  function zeichne(){
	x1=Math.round(1000*x1)/1000; y1=Math.round(1000*y1)/1000;
	x2=Math.round(1000*x2)/1000; y2=Math.round(1000*y2)/1000;
	document.getElementById("x1").value=x1; document.getElementById("y1").value=y1;
	document.getElementById("x2").value=x2; document.getElementById("y2").value=y2;
	var r=Math.sqrt(zx*zx+zy*zy);
	if (zx!=0) var phi=Math.atan(zy/zx)*180/Math.PI;
	if ((zx==0) && (zy==0)) phi=0;
	if ((zx==0) && (zy>0)) phi=90;
	if ((zx==0) && (zy<0)) phi=270;
	if (zx<0) phi = phi+180;
	if ((zx>0) && (zy<0))	phi = phi+360;
	zx=Math.round(1000*zx)/1000; zy=Math.round(1000*zy)/1000;
	if (zy>=0) {
	   var zstr="<b>"+zx + " + " + zy + "i</b>";	
	}
	else var zstr="<b>"+zx + " - " + -zy + "i</b>";
	Resultat.innerHTML = zstr;
	r=Math.round(1000*r)/1000; phi=Math.round(1000*phi)/1000;
	var z_polarstr=r + " cis " + phi +"°";
	Resultat_polar.innerHTML=z_polarstr;
	ctx.clearRect(0,0,W,H);
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.lineWidth="1";
	if (kartesisch) koordsys();
	  else polarKS();
	beschriftung();
	ctx.stroke();
	
	ctx.beginPath();
	ctx.strokeStyle = "black";
    pfeil(x1,y1);
	if (mode==3) {
		Line(1,0,x1,y1);
	}
	if (mode==4) {
		Line(x1,y1,zx,zy);
	}	
	ctx.beginPath();
	ctx.arc(map(0, x1), map(1, y1), 2, 0, 2*Math.PI);
	ctx.fillStyle="black";
    ctx.fill();
	ctx.stroke();

    ctx.beginPath();
	ctx.strokeStyle = "red";
    pfeil(x2,y2);
	ctx.beginPath();
	if (mode==1) pfeil2(x1,y1,x2,y2);
	if (mode==2) pfeil2(x1,y1,-x2,-y2);
	if (mode==3) {
		Line(x2,y2,zx,zy);
	}
	if (mode==4) {
		Line(1,0,x2,y2);
	}	
	ctx.beginPath();
	ctx.arc(map(0, x2), map(1, y2), 2, 0, 2*Math.PI);
	ctx.fillStyle="red";
    ctx.fill();	
    ctx.stroke();
	
	ctx.beginPath();
	ctx.strokeStyle = "blue";
    pfeil(zx,zy);
	ctx.beginPath();
	ctx.arc(map(0, zx), map(1, zy), 2, 0, 2*Math.PI);
	ctx.fillStyle="blue";
    ctx.fill();	
    ctx.stroke();

  }

  function pfeil(x,y) {
	var r = Math.sqrt(x*x+y*y);
	if (x!=0) var Winkel=Math.atan(y/x);
	if ((x==0) && (y>=0)) Winkel=Math.PI/2;
	if ((x==0) && (y<0)) Winkel=3*Math.PI/2;
	if (x<0) Winkel = Winkel+Math.PI;
	if ((x>0) && (y<0))	Winkel = Winkel+2*Math.PI;
	ctx.translate(Ursprungx,Ursprungy);
	ctx.rotate(-Winkel);
	Line(xmin,ymax,xmin+r,ymax);
	Line(xmin+r-0.3,ymax+0.3,xmin+r,ymax); Line(xmin+r-0.3,ymax-0.3,xmin+r,ymax);
	ctx.rotate(Winkel);
	ctx.translate(-Ursprungx,-Ursprungy);	
  }

 function pfeil2(a1,a2,e1,e2) {
	ctx.translate(map(0,a1)-Ursprungx,map(1,a2)-Ursprungy);	 
	pfeil(e1,e2);
	ctx.translate(-map(0,a1)+Ursprungx,-map(1,a2)+Ursprungy);	 	
 }

  function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
	  