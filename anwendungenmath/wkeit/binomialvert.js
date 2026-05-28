  // Progamm zur Approximation Binomialverteilung durch Normalverteilung auf www.mathematik.ch
  // November 2015: php-Programm vom Januar 2002 umgeschrieben auf html5 und Javascript
  // copyright Bernhard Berchtold

    var W,H;
	var n,p,a,b,mue,sigma;
	var wkeit=new Array();
	var summe;
	
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

 function calcwk(n,p)
 {
  for (x=0;x<=n;x++)
     wkeit[x] = Bikoeff(n,x) * Math.pow(p,x) * Math.pow(1-p,n - x);
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
    if (document.getElementById("n").value == '') 
     {alert ("Wert für n eingeben!");
      return};
    n=parseInt(document.getElementById("n").value);
	if (n>1000) {n=1000; document.getElementById("n").value=n}
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
    if ( (p==undefined) || (p<0) || (p>1)  || (isNaN(p)) )
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
	calcwk(n,p);
	for (var x=a;x<=b;x++) summe += wkeit[x];
    mue=n*p;
    sigma=Math.sqrt(mue*(1-p));
	schreibeWerte();
	nKleiner30();
  }

 function nKleiner30() {
  if (n<=30) zeichne();
	  else {
		ctx.clearRect(0,0,W,H);
		ctx.font="16px Arial";
		ctx.fillStyle = "black";
		ctx.fillText("Das Histogramm wird nur gezeichnet,",10,20);
		ctx.fillText("falls n<31",10,40);
	  }
 }	 

 function zeichne() {  // wird durch Drücken auf button ausgelöst
    ctx.clearRect(0,0,W,H);
    ctx.font="11px Arial";
 	var breite = W/(n+1);   	   
    for (var x=0;x<=n;x++) {
	  if ((x<a) || (x>b)) ctx.fillStyle = "rgb(10,36,106)";
        else ctx.fillStyle = "green";
      ctx.fillRect(x*breite,(H-20)*(1-2.5*wkeit[x]),breite,(H-20)*2.5*wkeit[x]);
      ctx.fillText(x,x*breite+breite/2,H-5);
	}
  }
  
  function schreibeWerte() {
	var varianz=sigma*sigma;
	document.getElementById("N").innerHTML=n;
	document.getElementById("P").innerHTML=runde3(p);
	document.getElementById("A").innerHTML=a;
	document.getElementById("B").innerHTML=b;
	document.getElementById("MU").innerHTML=runde3(mue);
	document.getElementById("VAR").innerHTML=runde3(varianz);
	document.getElementById("SIGMA").innerHTML=runde3(sigma);
	document.getElementById("RESBI").innerHTML=runde(summe);
  }

  function runde3(x) {
	return Math.round(1000*x)/1000;  
  }

  function runde(x) {
	return Math.round(100000*x)/100000;  
  }


 