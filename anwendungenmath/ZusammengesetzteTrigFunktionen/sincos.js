  // Progamm zu Zusammengesetzten sin und cos-Funktionen auf www.mathematik.ch
  // copyright Bernhard Berchtold

    var W, H;
    var Xmin=-1.1;
    var Xmax=7.1;
    var Ymin=-3.1;
    var Ymax=3.1;
    var ctx;
    var DiffX=Xmax-Xmin;
    var DiffY=Ymax-Ymin;
    var a=1;
	var b=1;    // b = Omega
	var h=0;
	var k=0;
	var einheitx, einheity;
	var mousedown=false;	
	var initmade=false;
	var sinus=true;
	
window.onload=resizeCanvas;	
    
  function resizeCanvas() {
    var canvs = document.getElementById("containercanvas");
    canvs.width = canvs.offsetWidth;
    // canvs.height = canvs.offsetHeight;
	W=canvs.width;
	if (W>600) W=600;
	H=0.75*W;
	einheitx=W/DiffX;
	einheity=H/DiffY;
	if (initmade) {
	  resize1();  
	  zeichneKS();
      zeichne_funktion();
	} else init();	
  }
  
  function ok1() {
    Xmin = parseFloat(document.getElementById("Xmin").value);
    Xmax = parseFloat(document.getElementById("Xmax").value);  
    Ymin = parseFloat(document.getElementById("Ymin").value);
    Ymax = parseFloat(document.getElementById("Ymax").value);
    DiffX=Xmax-Xmin;
    if (DiffX<0) {var Hilf=Xmin; Xmin=Xmax; Xmax=Hilf; DiffX=-DiffX;}
    DiffY=Ymax-Ymin;
    if (DiffY<0) {var Hilf=Xmin; Ymin=Ymax; Ymax=Hilf; DiffY=-DiffY;}
    einheitx=W/DiffX;
    einheity=H/DiffY;	
  }

  function f(x,a,b,h,k) { 
    if (sinus) return a*Math.sin(b*(x-h*Math.PI))+k;
	else return a*Math.cos(b*(x-h*Math.PI))+k;
  }

  function init() {
	initmade=true;
	window.addEventListener('resize', function(event){
      resizeCanvas()
    });
    canvas1 = document.getElementById('myCanvas');
	resize1();
    ctx = canvas1.getContext('2d');
	document.getElementById("ch1").checked=true;
	document.getElementById("ch5").style.backgroundColor ="#00FF00";	
	canvas1.addEventListener('mousedown', function(evt) { 
	  mousedown=true;
      }, false);
	canvas1.addEventListener('mouseup', function(evt) { 
	  mousedown=false;
      }, false);	  
	canvas1.addEventListener('mousemove', function(evt) {  
     if (mousedown) {
	  var mousePos = getMousePos(canvas1, evt);
	  var xm=mousePos.x; var ym=mousePos.y;
      diffx=xm-col(0); diffy=ym-row(0);
	  if (document.getElementById("ch1").checked) {
		a=-diffy/einheity;
		if (a>Ymax) a=Ymax;
        if (a<Ymin) a=Ymin;
	  }
	  if (document.getElementById("ch4").checked) {
		k=-diffy/einheity;
		if (k>Ymax) k=Ymax;
        if (k<Ymin) k=Ymin;	
	  }	  
	  if (document.getElementById("ch2").checked) {
		b=diffx/einheitx;
		if (b>Xmax) b=Xmax;
        if (b<Xmin) b=Xmin;	
	  }	  
	  if (document.getElementById("ch3").checked) {
		h=diffx/einheitx;
        if (h>Xmax) h=Xmax;
        if (h<Xmin) h=Xmin;	
	  }	  
      zeichne1();  
	 }
    }, false);
    zeichne1();
  }

  function resize1() {
	 canvas1.width=W; canvas1.height=H; 
  }

  function button5() {
	sinus=true;
	document.getElementById("ch6").style.backgroundColor ="#E0FFFF";
	document.getElementById("ch5").style.backgroundColor ="#00FF00";
    zeichne1();
  }

  function button6() {
    sinus=false;
	document.getElementById("ch5").style.backgroundColor ="#E0FFFF";
    document.getElementById("ch6").style.backgroundColor ="#00FF00";	
    zeichne1();
  }

  function dostep() {
	if (document.getElementById("ch1").checked) {
		a=a+0.05*(Math.round(Ymax)-Math.round(Ymin));
		if (a>Ymax) a=Math.round(Ymin);		
	}  
	if (document.getElementById("ch2").checked) {
		b=b+0.05*DiffX;
		if (b>10) b=0.01;			
	}
	if (document.getElementById("ch3").checked) {
		h=h+0.05*DiffX;
		if (h>2) h=-2;			
	}  	
	if (document.getElementById("ch4").checked) {
		k=k+0.05*DiffY;
		if (k>Ymax) k=Ymin;		
	} 
    zeichne1();
	}

  function startwerte() {
	a=1; b=1; h=0; k=0;
	zeichne1();
  }
  
  function zeichne() {  // wird durch onchange bei KS-Eingabe ausgelöst
    ok1();   // in ok1() werden die Grenzen des KS eingelesen
    zeichneKS();   
    zeichne_funktion();
  }

  function zeichne1() {	  
    zeichneKS();
    zeichne_funktion();
  }

  function zeichneKS() {
    ctx.clearRect(0,0,W,H);
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth="1";
    ctx.font="10px Arial";
      
    // x-Achse
    var r0=row(0); ctx.moveTo(0,r0); ctx.lineTo(W,r0);      
    var x1=Math.floor(Xmin); var x2=Math.floor(Xmax);
    var posy=r0; var x=x1;     
    if (DiffX<=20) {
      while (x<=x2) {
        var posx=col(x);
        ctx.moveTo(posx,posy+3); ctx.lineTo(posx,posy-3);
        ctx.strokeText(x,posx-3,posy+10);
        x=x+1;
      }
    }   
    x=x1+5-x1%5;
    if (DiffX>20 && DiffX<80) {
      while (x<=x2) {
        var posx=col(x);
        ctx.moveTo(posx,posy+3); ctx.lineTo(posx,posy-3);
        ctx.strokeText(x,posx-5,posy+10);
        x=x+5;
      }
    }  
    // Pfeil
    ctx.moveTo(W-5,r0-5); ctx.lineTo(W,r0);
    ctx.moveTo(W-5,r0+5); ctx.lineTo(W,r0);
         
    // y-Achse
    var c0=col(0); ctx.moveTo(c0,0); ctx.lineTo(c0,H);
    var y1=Math.floor(Ymin); var y2=Math.floor(Ymax);
    posx=c0; var y=y1;      
    if (DiffY<=20) {      
      while (y<=y2) {
        if (y==0) y=y+1;
        posy=row(y);
        ctx.moveTo(posx-3,posy); ctx.lineTo(posx+3,posy);
        ctx.strokeText(y,posx-12,posy+3);
        y=y+1;
      }
    }
    y=y1+5-y1%5;
    if (DiffY>20 && DiffY<80) {      
      while (y<=y2) {
        if (y==0) y=y+5;
        posy=row(y);
        ctx.moveTo(posx-3,posy); ctx.lineTo(posx+3,posy);
        ctx.strokeText(y,posx-16,posy+3);
        y=y+5;
      }
    }
    // Pfeil
    ctx.moveTo(c0-5,5); ctx.lineTo(c0,0);
    ctx.moveTo(c0+5,5); ctx.lineTo(c0,0);               
    ctx.stroke();         // x- und y-Achse nun zeichnen
	}


  // Berechnen und Plot der Funktion
  function zeichne_funktion(){
    ctx.beginPath();
    ctx.strokeStyle = "green";      
    var y1=f(Xmin,a,b,h,k); var r1=row(y1);  
    ctx.moveTo(0, r1);           
    for (var i=0; i<W; i++) {  
      var x=Xmin+DiffX/W*i;
      var y2=f(x,a,b,h,k);
      if (Math.abs(y2-y1)<DiffY/2  && y2!=100000) ctx.lineTo(i,row(y2))
        else ctx.moveTo(i,row(y2));
      y1=y2;      
    }
    ctx.stroke();
    a1.innerHTML = round(a);
	b1.innerHTML = round(b);
	k1.innerHTML = round(k);
	h1.innerHTML = round(h);
  }

  // Umrechnung von x-Koordinate in Bildschirmspalte
  function col(x)  {return ((x-Xmin)/DiffX*W);}

  // Umrechnung von y-Koordinate in Bildschirmzeile
  function row(y)  {return ((Ymax-y)/DiffY*H);}

  function round(u) {
	return Math.round(100*u)/100;
  }

  function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }

  
     