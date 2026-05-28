  // Progamm zur Normalverteilung auf www.mathematik.ch
  // Dezember 2015, html5 und Javascript
  // copyright Bernhard Berchtold

    var W,H;
	var mue=25;
	var sigma=0.2;
	var a,b,wkeit;
	var simpson;
	
window.onload=init;

  function f(u) {
    return (1/Math.sqrt(2*Math.PI))*Math.exp(-u*u/2);
  }

  function calcintegral(a,b)     // int (1/sqrt(2*pi)*(exp(-u*u/2), a, b) nach Simpson
  {var Summe=f(a) + f(b);
   var Summe1=0; var Summe2=0; var h=(b-a)/100;
   for (var i=1;i<100;i+=2) Summe1 += f(a + i*h);
   for (i=2;i<100;i+=2) Summe2 += f(a + i*h);
   var integral=(h/3)*(Summe + 4*Summe1 + 2*Summe2);
   if (integral>1) integral=1; 
   return integral;
  }

  function berechne_u(w) {
	var eps=1E-4; var hilf=w/2; var u;
	if (w<0.68) u=1;
	  else u=2;
	var integral=calcintegral(0,u);  
	while(Math.abs(hilf-integral)>eps) {
	  if (hilf>integral) u+=0.0001;
        else u-=0.0001;
	  integral=calcintegral(0,u);
	}
	return u;
  }

  function xpixel(x,mue,sigma)
  { return (Math.round(W/6/sigma*(x - mue + 3*sigma)));
  }
 
 function ypixel(y)
  { return (H-20-Math.round((H-20)*2*sigma*y));    
  }


 function init() {
    canvas1 = document.getElementById('myCanvas');
    ctx = canvas1.getContext('2d');
	W = canvas1.width;
	H = canvas1.height;
    rechne();
  }


  function rechne() {    // und zeichne()
    document.getElementById("message").innerHTML=" ";
    if (document.getElementById("mue").value == '') 
     {alert ("Wert für mue eingeben!");
      return};
    mue=parseFloat(document.getElementById("mue").value);
    if (document.getElementById("sigma").value == '') 
     {alert ("Wert für sigma eingeben!");
      return};
    sigma=parseFloat(document.getElementById("sigma").value);
	if (sigma<=0) {alert ("sigma muss grösser als 0 sein");
      return};
    if (document.getElementById("a").value == '') 
     {alert ("Wert für a eingeben!");
      return};
    a=parseFloat(document.getElementById("a").value);
	if (a<mue-5*sigma) {
		a=mue-5*sigma; document.getElementById("message").innerHTML="a wurde auf &mu;-5*&sigma; gesetzt<br>";
	}	
    if (document.getElementById("b").value == '') 
     {alert ("Wert für b eingeben!");
      return};
	b=parseFloat(document.getElementById("b").value);
	if (b<=a) {alert ("b muss grösser als a sein!");
      return};
    document.getElementById("b").value=b;
	if (b>mue+5*sigma) {
		b=mue+5*sigma; document.getElementById("message").innerHTML+="b wurde auf &mu;+5*&sigma; gesetzt";
	}	
    // calc integral nach Simpson
    simpson=calcintegral((a-mue)/sigma,(b-mue)/sigma);
	schreibeVarianz();
	document.getElementById("RES2").innerHTML="";
	document.getElementById("RES").innerHTML="P("+a+"&le;X&le;"+b+") &asymp;<b> "+runde(simpson)+"</b>";
	zeichne();
  }

  function rechne_grenze() {    // und zeichne()
    document.getElementById("message").innerHTML=" ";
    if (document.getElementById("mue").value == '') 
     {alert ("Wert für mue eingeben!");
      return};
    mue=parseFloat(document.getElementById("mue").value);
    if (document.getElementById("sigma").value == '') 
     {alert ("Wert für sigma eingeben!");
      return};
    sigma=parseFloat(document.getElementById("sigma").value);
	if (sigma<=0) {alert ("sigma muss grösser als 0 sein");
      return};
    if (document.getElementById("wkeit").value == '') 
     {alert ("Wert für Wkeit eingeben!");
      return};
    wkeit=parseFloat(document.getElementById("wkeit").value);	
    if (wkeit<0 || wkeit>1) 
     {alert ("Wkeit muss zwischen 0 und 1 sein");
      return};
	var u=berechne_u(wkeit);
	a=mue-sigma*u; b=mue+sigma*u;
	simpson=calcintegral(-u,u);
	schreibeVarianz();
	document.getElementById("RES").innerHTML="";
	document.getElementById("RES2").innerHTML="P(<b>"+runde3(a)+"</b>&le;X&le;<b>"+runde3(b)+"</b>) &asymp; "+runde(simpson);
	zeichne();
  }

  function zeichne() { 
    ctx.clearRect(0,0,W,H);
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth="1";
    ctx.font="11px Arial";
	line(0,H-20,W,H-20);
	var breite = W/120; var delta=sigma/20;
	var x=-3*sigma; var y1=ypixel(1/sigma*f(x/sigma));
	ctx.moveTo(0,y1);
    for (var i=1;i<=120;i++)
    { x=-3*sigma+i*delta;
      y1=ypixel(1/sigma*f(x/sigma));
      ctx.lineTo(i*breite,y1);
    }
    for (i=0;i<12;i++)
    { x=Math.round(mue-3*sigma+i*sigma/2);
      var xhilf=xpixel(x,mue,sigma);
      ctx.fillText(x,xhilf-6,H-8);
      line(xhilf,H-18,xhilf,H-20);
    }
	ctx.stroke();
	var x1=xpixel(a,mue,sigma); var x2=xpixel(b,mue,sigma);
    if ((x1<W-3) && (x2>2)) {
	  ctx.fillStyle="green";
	  j=0;
	  for (i=x1;i<=x2;i++) {
		if (i>=0 && i<W) {
		  y1=ypixel(1/sigma*f((a+j*6*sigma/W-mue)/sigma));
		  ctx.fillRect(i,y1,1,H-21-y1);
		} 
		 j++;
	  }	   	   
    } 
  }
  
  function schreibeVarianz() {
	var varianz=sigma*sigma;
	document.getElementById("VAR").innerHTML=runde3(varianz);
  }

  function runde3(x) {
	return Math.round(1000*x)/1000;  
  }

  function runde(x) {
	return Math.round(10000*x)/10000;  
  }

  function line(x1,y1,x2,y2) {
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
  }


 