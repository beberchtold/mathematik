  // Progamm zur Approximation Binomialverteilung durch Normalverteilung auf www.mathematik.ch
  // November 2015: php-Programm vom Januar 2002 umgeschrieben auf html5 und Javascript
  // copyright Bernhard Berchtold

    var W,H;
	var n,p,a,b,mue,sigma;
	var summe,simpson;
	
window.onload=init;	
  
  function Bikoeff(A,B) {
    var F;
    if (B>A) F = 0;
     else F = 1;
    if (B > A - B) B = A - B;
    for (var i=1;i<=B;i++)
      F = F * (A - i + 1) / i ;
    return F;
  }

  function f(u) {
    return (1/Math.sqrt(2*Math.PI))*Math.exp(-u*u/2);
  }

  function calcintegral(a,b)     // int (1/sqrt(2*pi)*(exp(-u*u/2), a, b) nach Simpson
  {var Summe=f(a) + f(b);
   var Summe1=0; var Summe2=0; var h=(b-a)/50;
   for (var i=1;i<50;i+=2) Summe1 += f(a + i*h);
   for (i=2;i<50;i+=2) Summe2 += f(a + i*h);
   var integral=(h/3)*(Summe + 4*Summe1 + 2*Summe2);
   if (integral>1) integral=1; 
   return integral;
  }

 function xpixel(x,mue,sigma)
  { return (Math.round(W/6/sigma*(x - mue + 3*sigma)));
  }
 
 function ypixel(y,m)
  { var faktor=2.5;
    while (( m / 10)>1) {faktor*=2; m/=10; }          
    return (H-20-Math.round((H-20)*faktor*y));  // y-Werte um Faktor erhöht
  }


 function init() {
    canvas1 = document.getElementById('myCanvas');
    ctx = canvas1.getContext('2d');
	W = canvas1.width;
	H = canvas1.height;
    rechne();
  }


  function pfalse()
  { alert ("falscher Wert für p");
    document.getElementById("p").value = '';
  };

  function rechne() {    // und zeichne()
    document.getElementById("message").innerHTML="";
    if (document.getElementById("n").value == '') 
     {alert ("Wert für n eingeben!");
      return};
    n=parseInt(document.getElementById("n").value);
	if (n<20) {n=20; document.getElementById("n").value=20}
    if (document.getElementById("p").value == '') 
     {alert ("Wert für p eingeben!");
      return};
    var Hilf = document.getElementById("p").value;
    var i=0;  var op=false; var dezpunkt=false;
    while (i<Hilf.length)
      {var Zahl = Hilf.charCodeAt(i);
      if (Zahl==46) 
        { if (dezpunkt) { pfalse(); return; }
        else dezpunkt=true;}
      if ((Zahl<42) || (Zahl>57) || (Zahl==44) || ((i==0) && (Zahl<48)) || ((i==Hilf.length-1) && (Zahl<48)) )
        { pfalse(); return; }
      if ((Zahl<48) && op)
        { pfalse(); return; }
      if ((Zahl<48)&& (Zahl!=46)) dezpunkt=false;  
      op = (Zahl<48);
      i++; 
    }
    p=parseFloat(eval(Hilf));
    if ( (p==undefined) || (p<=0) || (p>=1)  || (isNaN(p)) )
    { pfalse(); return; }
    if (document.getElementById("a").value == '') 
     {alert ("Wert für a eingeben!");
      return};
    a=parseInt(document.getElementById("a").value);
	if (a<0) a=0; if (a>n) a=n; document.getElementById("a").value=a;
    if (document.getElementById("b").value == '') 
     {alert ("Wert für b eingeben!");
      return};
	b=parseInt(document.getElementById("b").value);
	if (b<a) b=a; if (b>n) b=n;	document.getElementById("b").value=b;
	// calc Binomialvert
	summe = 0;
    if (n<1001)
      for (var x=a;x<=b;x++) summe += Bikoeff(n,x) * Math.pow(p,x) * Math.pow(1-p,n - x);
    // calc integral nach Simpson
    simpson=0;
    mue=n*p;
    sigma=Math.sqrt(mue*(1-p));
    simpson=calcintegral((a-0.5-mue)/sigma,(b+0.5-mue)/sigma);
	schreibeWerte();
	zeichne();
  }

  function zeichne() {  // wird durch Drücken auf button ausgelöst
    ctx.clearRect(0,0,W,H);
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth="1";
    ctx.font="11px Arial";
	line(0,H-20,W,H-20);
	var breite = W/120; var delta=sigma/20;
	var x=-3*sigma; var y1=ypixel(1/sigma*f(x/sigma),n);
	ctx.moveTo(0,y1);
    for (var i=1;i<=120;i++)
    { x=-3*sigma+i*delta;
      y1=ypixel(1/sigma*f(x/sigma),n);
      ctx.lineTo(i*breite,y1);
    }
    for (i=0;i<12;i++)
    { x=Math.round(mue-3*sigma+i*sigma/2);
      var xhilf=xpixel(x,mue,sigma);
      ctx.fillText(x,xhilf-6,H-8);
      line(xhilf,H-18,xhilf,H-20);
    }
	ctx.stroke();
	var x1=xpixel(a-0.5,mue,sigma); var x2=xpixel(b+0.5,mue,sigma);
    if ((x1<W-3) && (x2>2)) {
	  ctx.fillStyle="green";
	  j=0;
	  for (i=x1;i<=x2;i++) {
		if (i>=0 && i<W) {
		  y1=ypixel(1/sigma*f((a-0.5+j*6*sigma/W-mue)/sigma),n);
		  ctx.fillRect(i,y1,1,H-21-y1);
		} 
		 j++;
	  }	   	   
    } 
  }
  
  function schreibeWerte() {
	var varianz=sigma*sigma
	if (varianz<9) document.getElementById("message").innerHTML="Warnung: Varianz<9";	
	document.getElementById("N").innerHTML=n;
	document.getElementById("P").innerHTML=runde3(p);
	document.getElementById("A").innerHTML=a;
	document.getElementById("B").innerHTML=b;
	document.getElementById("Aminus").innerHTML=a-0.5;
	document.getElementById("Bplus").innerHTML=b+0.5;
	document.getElementById("MU").innerHTML=runde3(mue);
	document.getElementById("VAR").innerHTML=runde3(varianz);
	document.getElementById("SIGMA").innerHTML=runde3(sigma);
	if (n<1001) document.getElementById("RESBI").innerHTML=runde(summe);
	  else document.getElementById("RESBI").innerHTML="n ist zu gross für Binomialverteilung";
	document.getElementById("RESNOR").innerHTML=runde(simpson);
  }

  function runde3(x) {
	return Math.round(1000*x)/1000;  
  }

  function runde(x) {
	return Math.round(100000*x)/100000;  
  }

  function line(x1,y1,x2,y2) {
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
  }


 