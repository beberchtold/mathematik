  // Progamm zu Bezierkurven auf www.mathematik.ch
  // copyright Bernhard Berchtold

    var W,H;
	// Xmin=0; Xmax=10; Ymin=0; Ymax=10;
	n=20;
    var x0,y0,x1,y1,x2,y2,x3,y3,x4,y4,x5,y5;
    var ctx;
    var color=0;
	var Punkt0=false;
	var Punkt1=false;
	var Punkt2=false;
	var Punkt3=false;
	var maus=false;
	var einfach=false;
	
window.onload=init;
  
  function init() {
    canvas1=document.getElementById('myCanvas');
    ctx = canvas1.getContext('2d');
	W = canvas1.width;
	H = canvas1.height;	
	canvas1.addEventListener('click', function(evt) {
	  var W1=canvas1.offsetWidth;
	  var H1=W1;
      var mousePos = getMousePos(canvas1, evt);
      if (!Punkt0) {
		x0=Math.round(100*mousePos.x/W1)/10; y0=Math.round(100*mousePos.y/H1)/10; Punkt0=true; 
		document.getElementById("x0").value=x0; document.getElementById("y0").value=y0;
		document.getElementById("x1").value=""; document.getElementById("y1").value="";
		document.getElementById("x2").value=""; document.getElementById("y2").value="";
		document.getElementById("x3").value=""; document.getElementById("y3").value="";
		}
	  else if (!Punkt1) {
		  x1=Math.round(100*mousePos.x/W1)/10; y1=Math.round(100*mousePos.y/H1)/10; Punkt1=true; 
		  document.getElementById("x1").value=x1; document.getElementById("y1").value=y1;
		  }
        else if (!Punkt2) {x2=Math.round(100*mousePos.x/W1)/10; y2=Math.round(100*mousePos.y/H1)/10; Punkt2=true; 
		document.getElementById("x2").value=x2; document.getElementById("y2").value=y2;
		}
		  else if (!Punkt3) {x3=Math.round(100*mousePos.x/W1)/10; y3=Math.round(100*mousePos.y/H1)/10; Punkt3=true; 
		  document.getElementById("x3").value=x3; document.getElementById("y3").value=y3;
		  }		
      if (Punkt3) {
		  Punkt0=false; Punkt1=false; Punkt2=false; Punkt3=false; 
		  eineKurve();
		  }
      }, false);
	zeichne();
  }
  
  function zeichne() {  // wird durch Drücken auf button ausgelöst
    x0 = document.getElementById("x0").value;
    y0 = document.getElementById("y0").value;  
    x1 = document.getElementById("x1").value;
    y1 = document.getElementById("y1").value;
    x2 = document.getElementById("x2").value;
    y2 = document.getElementById("y2").value;   
    x3 = document.getElementById("x3").value;
    y3 = document.getElementById("y3").value;

	x4=2*x3-x2; y4=2*y3-y2; x5=2*x0-x1; y5=2*y0-y1;
    zeichneKurve();
}

  // Berechnen und Plot der Kurve
  function zeichneKurve(){
	ctx.clearRect(0,0,W,H);
	ctx.beginPath();
	if (color==0) ctx.strokeStyle = "black";
	if (color==1) ctx.strokeStyle = "red";
	if (color==2) ctx.strokeStyle = "green";
	if (color==3) ctx.strokeStyle = "blue";	
	ctx.lineWidth="2";
	ctx.font="14px Arial";
	var px3= (W/10*x3); var py3= (H/10*y3);
	ctx.beginPath();
	ctx.fillStyle="black";
	ctx.arc(px3,py3,2,0,2*Math.PI);
	ctx.fill();
	if (x3<x0) ctx.fillText("P3",px3-20,py3+5);
	  else ctx.fillText("P3",px3+5,py3+5);
	ctx.beginPath();
	var px1= (W/10*x1); var py1= (H/10*y1);
	ctx.arc(px1,py1,2,0,2*Math.PI);
	ctx.fill();
	if (x1<5) ctx.fillText("P1",px1-20,py1+5);
	  else ctx.fillText("P1",px1+5,py1+5);
	ctx.beginPath();
	var px2= (W/10*x2); var py2= (H/10*y2);
	ctx.arc(px2,py2,2,0,2*Math.PI);
	ctx.fill();
	if (x2<5) ctx.fillText("P2",px2-20,py2+5);
	  else ctx.fillText("P2",px2+5,py2+5);	  
	ctx.beginPath();
	x1i= (W/10*x0); y1i= (H/10*y0);
	ctx.arc(x1i,y1i,2,0,2*Math.PI);
	ctx.fill();
	if (x0<x3) ctx.fillText("P0",x1i-20,y1i+5);
	  else ctx.fillText("P0",x1i+5,y1i+5);
	ctx.beginPath();
	ctx.setLineDash([5, 10]);
	ctx.moveTo(x1i, y1i);
	ctx.lineTo(px1,py1);
	ctx.moveTo(px3, py3);
	ctx.lineTo(px2,py2);
    ctx.stroke();	
	ctx.beginPath();
	ctx.setLineDash([1,0]);
	ctx.moveTo(x1i, y1i);
    for( var s=1;s<n+1;s++)
        { var a =  s/n;  var b=1-a;
          var x2i=(W/10*(x0*b*b*b + 3*a*b*(x1*b + x2*a) + x3*a*a*a));
          var y2i= (H/10*(y0*b*b*b + 3*a*b*(y1*b + y2*a) + y3*a*a*a)); 
		  ctx.lineTo(x2i,y2i);
          x1i=x2i; y1i=y2i;
        }
    if (!maus) {
	  for( s=1;s<n+1;s++)
        { a =  s/n;  b=1-a;
          x2i=(W/10*(x3*b*b*b + 3*a*b*(x4*b + x5*a) + x0*a*a*a));
          y2i= (H/10*(y3*b*b*b + 3*a*b*(y4*b + y5*a) + y0*a*a*a));
          // ctx.moveTo(x1i, y1i);
		  ctx.lineTo(x2i,y2i);
          x1i=x2i; y1i=y2i;
        }
		einfach=false;
	  }  
    ctx.stroke();			
  }
  
  function eineKurve() {
	maus=true; zeichne(); maus=false; einfach=true; 
  }
  
  function Zufallsfigur() {
        x0 = zufallszahl(); document.getElementById("x0").value=x0;
        y0 = zufallszahl(); document.getElementById("y0").value=y0;
        x1 = zufallszahl(); document.getElementById("x1").value=x1;
        y1 = zufallszahl(); document.getElementById("y1").value=y1;
        x2 = zufallszahl(); document.getElementById("x2").value=x2;
        y2 = zufallszahl(); document.getElementById("y2").value=y2;
        x3 = zufallszahl(); document.getElementById("x3").value=x3;
        y3 = zufallszahl(); document.getElementById("y3").value=y3;
		color=Math.round(3*Math.random());
        eineKurve();		
  }

  function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
  }

  function zufallszahl() {
	return  Math.round(80*Math.random()+1)/10; 
  }
   