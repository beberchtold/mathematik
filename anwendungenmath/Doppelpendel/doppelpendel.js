  // Progamm zu Doppelpendel auf www.mathematik.ch
  // Dezember 2016: Applet vom Januar 2002 umgeschrieben auf html5 und Javascript
  // copyright Bernhard Berchtold

    var W,H;
	const g=9.80665;                   // Fallbeschleunigung
    const l=1;                         // Länge der Pendel in m
    const pl=70;                       // Länge der Pendel in Pixel
	var Phi = [0,2.84,0.0,-1.57,0.0];  // benützt werden nur 1..4
                                       // Phi1=Phi[1],Phi1'=Phi[2],Phi2=Phi[3],Phi2'=Phi[4]
    var Phialt = [0,0,0,0,0];
    var k = [0,0,0,0,0];
    var x1,y1,x2,y2;                   // x,y-Koordinaten der Pendel
    var h;                             // Schrittweite
    var ctx;
    var timer;
	delay=50;  // in Millisekunden für  setTimeout(function(){......},delay)
	var Weiter=false;
	var stop;
	
window.onload=init;	

  function init() {
    var canvas1 = document.getElementById("myCanvas");
    ctx = canvas1.getContext("2d");
    W = canvas1.width;
	H = canvas1.height;
    start();
  }


  function start() { 
	Phi[1] = parseFloat(document.getElementById("PHI1").value);
	if (Phi[1]>Math.PI)  {Phi[1]=Phi[1]-2*Math.PI; document.getElementById("PHI1").value=Phi[1];}
    if (Phi[1]<-Math.PI)  {Phi[1]=Phi[1]+2*Math.PI; document.getElementById("PHI1").value=Phi[1];}
    Phi[3] = parseFloat(document.getElementById("PHI2").value);
	if (Phi[3]>Math.PI)  {Phi[3]=Phi[3]-2*Math.PI; document.getElementById("PHI2").value=Phi[3];}
    if (Phi[3]<-Math.PI) {Phi[3]=Phi[3]+2*Math.PI; document.getElementById("PHI2").value=Phi[3];}
    h = parseFloat(document.getElementById("Schrittweite").value);
	if (h<0.0001) {h=0.0001; document.getElementById("Schrittweite").value=h;}
	if (h>0.04) {h=0.04; document.getElementById("Schrittweite").value=h;}
    Phi[2]=0.0; Phi[4]=0.0;   // Anfagsgeschw. der Pendel
    x1=W/2; y1=H/2; x2=x1; y2=y1;
    ctx.lineWidth="1";
    ctx.font="14px Arial";
    Zeichne();
  }

  function dostep() {  
	stop=true;
	timer = setTimeout(function(){action()},delay);
	Runge();
    Zeichne();
	dorun();
  }

   function run() {
	  Weiter=!Weiter;
	  if (Weiter) {document.getElementById('STEP').disabled=true;document.getElementById('RUN').value ="Stop";}
	     else {document.getElementById('STEP').disabled=false;document.getElementById('RUN').value ="Run";}
	  stop=false;
	  dorun();
  }

  function action() {
	stop=false;
	clearTimeout(timer);
	dorun();
  }

  function dorun() {
	if (!stop && Weiter) {
       dostep();
    }  
  }

    function f(w1,w2,w3,w4) { 
       var t1,t2,d;
       t1=9*l*Math.sin(2*w1-2*w3);          // Hilfsgrössen
       t2=l*Math.sin(w1-w3);                   
       d=9*l*Math.cos(2*w1-2*w3)-23*l;     
       k[1]=w2;
       k[2]=(27*g*Math.sin(w1)+9*g*Math.sin(w1-2*w3)+t1*w2*w2+12*t2*w4*w4)/d;
       k[3]=w4;
       k[4]=(21*g*Math.sin(w3)-27*g*Math.sin(2*w1-w3)-t1*w4*w4-48*t2*w2*w2)/d;
    }

	function Runge() {     //Berechnungen nach dem Runge-Kutta Verfahren
       var i;
       var a = [0,0,0,0,0];   // benützt werden nur 1..4
       var b = [0,0,0,0,0];
       var c = [0,0,0,0,0];
       var d = [0,0,0,0,0];

       f(Phi[1],Phi[2],Phi[3],Phi[4]);
       for (i=1;i<=4;i++) a[i]=k[i];
       for (i=1;i<=4;i++) Phialt[i]=Phi[i]+(h/2)*a[i];
       f(Phialt[1],Phialt[2],Phialt[3],Phialt[4]);
       for (i=1;i<=4;i++) b[i]=k[i];
       for (i=1;i<=4;i++) Phialt[i]=Phi[i]+(h/2)*b[i];
       f(Phialt[1],Phialt[2],Phialt[3],Phialt[4]);
       for (i=1;i<=4;i++) c[i]=k[i];
       for (i=1;i<=4;i++) Phialt[i]=Phi[i]+h*c[i];
       f(Phialt[1],Phialt[2],Phialt[3],Phialt[4]);
       for (i=1;i<=4;i++) d[i]=k[i];
       for (i=1;i<=4;i++) Phi[i]=Phi[i]+(h/6)*(a[i]+2*b[i]+2*c[i]+d[i]);
       if (Phi[1]>Math.PI)  Phi[1]=Phi[1]-2*Math.PI;
       if (Phi[1]<-Math.PI)  Phi[1]=Phi[1]+2*Math.PI;
       if (Phi[3]>Math.PI)  Phi[3]=Phi[3]-2*Math.PI;
       if (Phi[3]<-Math.PI)  Phi[3]=Phi[3]+2*Math.PI; 
    }


	function line(x1,y1,x2,y2,farbe) {
	   ctx.beginPath();
	   ctx.strokeStyle = farbe;
	   ctx.moveTo(x1,y1);
	   ctx.lineTo(x2,y2);
	   ctx.stroke();
	   ctx.endPath;
	}
	 
    function Zeichne() { 
	   var Hilf;
	   ctx.clearRect(0,0,W,H);              // löscht Pendel
       ctx.strokeStyle = "red";
       ctx.strokeText("Phi1 = ",5,20);
       ctx.strokeText("Phi1' = ",5,40);
	   Hilf=Phi[1].toString(); Hilf=Hilf.substr(0,5);
       ctx.strokeText(Hilf,50,20);
       Hilf= Phi[2].toString(); Hilf=Hilf.substr(0,5);
       ctx.strokeText(Hilf,50,40);
       ctx.strokeStyle = "blue";
       ctx.strokeText("Phi2 = ",5,70);
       ctx.strokeText("Phi2' = ",5,90);
	   Hilf= Phi[3].toString(); Hilf=Hilf.substr(0,5);
       ctx.strokeText(Hilf,50,70);
       Hilf= Phi[4].toString(); Hilf=Hilf.substr(0,5);
       ctx.strokeText(Hilf,50,90);
       x1=Math.round(pl*Math.sin(Phi[1]))+W/2;    // Berechnen der Koordinaten
       y1=Math.round(pl*Math.cos(Phi[1]))+H/2;
       x2=Math.round(pl*Math.sin(Phi[3]))+x1;
       y2=Math.round(pl*Math.cos(Phi[3]))+y1;
	   ctx.lineWidth="2";
       line(W/2,H/2,x1,y1,"red");             // Zeichnet die Pendel
	   line(x1,y1,x2,y2,"blue");
	   ctx.lineWidth="1";
     } 
