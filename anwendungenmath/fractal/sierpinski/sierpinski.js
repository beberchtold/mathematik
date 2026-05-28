  // Progamm zu Sierpinski-Dreieck mit speziellem Algorithmus auf www.mathematik.ch
  // copyright Bernhard Berchtold
  // Ehemaliges php-Programm transferiert nach Javascript und html5 am 2.11.2015

    var W,H;
	var n=48;
	var punkte=false;
    var ctx;
	
window.onload=init;

  function init() {
    canvas1=document.getElementById('myCanvas');
	ctx = canvas1.getContext('2d');
	W = canvas1.width;
	H = canvas1.height;
	document.getElementById("Strecken").checked=true;
	zeichne();
  }
  
  function change() {
    punkte=document.getElementById("Punkte").checked;
	zeichne();
  }

  function zeichne() {
    if (punkte) document.getElementById("Strecke").innerHTML="Punkte";
    else document.getElementById("Strecke").innerHTML="Strecken";
    document.getElementById("N").innerHTML=""+n;
    ctx.clearRect(0,0,W,H);
    ctx.beginPath();
    ctx.strokeStyle = "black";     
    ctx.lineWidth="1";
    var xl=0; var yl=H-5; var xr=W; var yr =yl; var xu=Math.round(W/2); yu=5;
    var x1=xu; var x=xu; var y1=yu; var y = yu;  // Startpunkt oben
    ctx.moveTo(xl,yl);
    ctx.lineTo(xr,yr);
    ctx.lineTo(xu,yu);
    ctx.lineTo(xl,yl);
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";
    for (var i = 1; i<=n; i++) {
      // Zufällig einen der drei Eckpunkte auswählen
      var nummer = Math.floor(3*Math.random())+1;
      switch (nummer)
        { case 1 : x = xu; y = yu; break;
          case 2 : x = xl; y = yl; break;
          case 3 : x = xr; y = yr; break;
        }
      // neuen Punkt berechnen (Mitte zwischen altem Punkt und gewähltem Eckpunkt)
      x2 = (x1 + x) / 2;
      y2 = (y1 + y) / 2;
      if (punkte) ctx.fillRect(x2,y2,1,1);
          else {ctx.moveTo(x1,y1); ctx.lineTo(x2,y2);}
      x1 = x2; y1 = y2;
    }
    ctx.stroke(); 
  }

  function doppelt() {
	document.getElementById('half').disabled=false;
	if (n<=24576) {
	  if (n==24576) document.getElementById('double').disabled=true;
	  n=2*n;
	  zeichne();
	}	
  }

  function halb() {
	document.getElementById('double').disabled=false;
	if (n>=6) {
	  if (n==6) document.getElementById('half').disabled=true;
	  n=n/2;
	  zeichne();
	}	
  }