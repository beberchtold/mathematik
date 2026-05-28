  // Progamm zu komplexeZahlen auf www.mathematik.ch
  // copyright Bernhard Berchtold

    var W, H;
	var Verschiebung;
	var Ursprungx;
	var Ursprungy;
    var deltax;
    xmax = 6.3;
    xmin = 0;
    ymax = 2.5;
    ymin = -ymax;
	var mx;
	var my;
	var r;   // Einheit in Pixeln
	var x0,y0;
	var mode=1;
	var Winkel=Math.PI/4;
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
	if (W>600) W=600;
	H=0.6*W;
	Verschiebung=0.26*W;
	Ursprungx=Verschiebung;
	Ursprungy=H/2;
	mx=Verschiebung/2;
	my=H/2;
	r=map(0,1)-Ursprungx;
	deltax=0.08*W;
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
    canvas1 = document.getElementById('myCanvas');
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
       var x = mousePos.x;
	   if ((x>=mx-r) && (x<=mx+r)) {
		 x=x-mx; var y = my-mousePos.y;
		 if (x!=0) Winkel = Math.abs(Math.atan(y/x));    // spitzer Winkel
         if ((x==0) && (y>0)) Winkel = Math.PI/2;
         if ((x==0) && (y<0)) Winkel = 3*Math.PI/2;		 
		 if ((x<0) && (y>0)) Winkel = Math.PI-Winkel;
		 if ((x<0) && (y<0)) Winkel = Math.PI+Winkel;
		 if ((x>0) && (y<0)) Winkel = 2*Math.PI-Winkel;
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
	Winkel=Math.PI/4;
    zeichne();	   
  }

  function button2() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode=2;
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	Winkel=Math.PI/4;
	zeichne();
  }

  function button3() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode=3;
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	Winkel=Math.PI/4;
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
            s = (z - xmin) / (xmax - xmin) * (W-Verschiebung) + Verschiebung;
        if (sw > 0.5)
            s = (ymax - z) / (ymax - ymin) * H;
        return s;
    }

  function invmap(sw,z)
    {   ss = 2;
        if(sw < 0.5)
            ss = xmin + ((z-Verschiebung) * (xmax - xmin)) / (W-Verschiebung);
        if(sw > 0.5)
            ss = (-z * (ymax - ymin)) / H - ymin;
        return ss;
    }


  function beschriftung() {
  	ctx.strokeStyle = "black";
	Line(-4, 0, xmax, 0);
	Line(xmax-0.1,-0.1,xmax,0); Line(xmax-0.1,0.1,xmax,0);
    Line(1.0, -0.02, 1.0, 0.02);
	ctx.strokeText('1', map(0,1) - 4, map(1,0) + 12);
	Line(Math.PI/2, -0.02, Math.PI/2, 0.02);
    ctx.strokeText(String.fromCharCode(960)+'/2', map(0,Math.PI/2) - 6, map(1,0) + 12);
	Line(Math.PI, -0.02, Math.PI, 0.02);	
	ctx.strokeText(String.fromCharCode(960), map(0,Math.PI) - 4, map(1,0) + 12);
	Line(3*Math.PI/2, -0.02, 3*Math.PI/2, 0.02);
	ctx.strokeText('3'+String.fromCharCode(960)+'/2', map(0,3*Math.PI/2) - 8, map(1,0) + 12);
    Line(0, ymin, 0, ymax);
	Line(-0.1,ymax-0.1,0,ymax); Line(0.1,ymax-0.1,0,ymax);		
    Line(-0.02, 1.0, 0.02, 1.0);
	ctx.strokeText('1', map(0,0) - 8, map(1,1) + 4);	
  }

  function zeichne(){
	ctx.clearRect(0,0,W,H);
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.lineWidth="1";
	beschriftung();
	ctx.stroke();
	ctx.beginPath();	
    ctx.arc(mx, my, r, 0, 2*Math.PI);
	ctx.stroke();
	ctx.beginPath();
	for (var i = 0; i <= 300; i++)
         {  var x;
            if (i == 0)
                x = xmin;
            else
              x = ((i - 1) / deltax) + xmin;
              var x2 = (i / deltax) + xmin;
              var y1 = f(x);
              var y2 = f(x2);
              if (Math.abs(y2-y1)<1) Line(x, y1, x2, y2);
         }
    y0=f(Winkel);
	phi.innerHTML = Math.round(18000*Winkel/Math.PI)/100;
	if ((mode==3) && (Math.abs(y0)>10000)) res.innerHTML="nicht definiert";
	 else res.innerHTML = Math.round(1000*y0)/1000;
	x0=invmap(0,mx)+Math.cos(Winkel);
	Line(invmap(0,mx),0,x0,Math.sin(Winkel));
	if (mode==2) Line(x0,0,x0,Math.sin(Winkel));
	if (mode==3) Line(invmap(0,mx),0,invmap(0,mx+r),y0);
	ctx.strokeStyle = "red";
    Line(0,0,Winkel,0);
	ctx.stroke();
	ctx.beginPath();	
    ctx.arc(mx, my, r, 2*Math.PI-Winkel, 2*Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = "blue";
	if (mode==1) Line(x0,0,x0,y0);
	if (mode==2) Line(invmap(0,mx),0,x0,0);
	if ((mode==3) && (Math.abs(y0)<10000)) Line(invmap(0,mx+r),0,invmap(0,mx+r),y0);
    if (Math.abs(y0)<10000) Line(Winkel,0,Winkel,y0);
	ctx.stroke();
  }

  function f(x) {
	var s;
	if (mode==1) s=Math.sin(x);
	if (mode==2) s=Math.cos(x);
	if (mode==3) s=Math.tan(x);
	return s;
  }

  function dostep(){
	Winkel=Winkel+Math.PI*5/180;
    if (Winkel>2*Math.PI)	Winkel=Winkel-2*Math.PI;
	zeichne();
 }

  function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
  