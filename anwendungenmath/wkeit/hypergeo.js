  // Progamm zur hypergeometrischen Verteilung auf www.mathematik.ch
  // November 2015: php-Programm vom Januar 2002 umgeschrieben auf html5 und Javascript
  // November 2023: Ergänzungen bei Resultatangabe Wkeit (var summerez)
  // copyright Bernhard Berchtold

    var W,H;
	var m,r,n,a,b,mue,sigma;
	var wkeit=new Array();
	var summe;
	var summerez;
	var canvas1;
	var initmade=false;
	
window.onload=resizeCanvas;	
    
  function resizeCanvas() {
    var canvs = document.getElementById("containercanvas");
    canvs.width = canvs.offsetWidth;
	W=canvs.width;
	H=W/2;
	if (initmade) {
	  resize1();
      if (n<=30) zeichne();
	} else init();	
  }
  
  function Bikoeff(A,B) {
    var F;
    if (B>A) F = 0;
     else F = 1;
    if (B > A - B) B = A - B;
    for (var i=1;i<=B;i++)
      F = F * (A - i + 1) / i ;
    return F;
  }

  function calcwk(m,r,n) {
    var Nenner=Bikoeff(m,n);
    for (x=0;x<=n;x++)
     wkeit[x] = Bikoeff(r,x) * Bikoeff(m-r,n-x)/Nenner;
  }

  function init() {
    initmade=true;
	window.addEventListener('resize', function(event){
      resizeCanvas()
    });
    canvas1 = document.getElementById('myCanvas');
	resize1();
    ctx = canvas1.getContext('2d');
    rechne();
  }

  function resize1() {
	 canvas1.width=W; canvas1.height=H; 
  }

  function rechne() {    // und zeichne()
    if (document.getElementById("m").value == '') 
     {alert ("Wert für n eingeben!"); return;}
    m=parseInt(document.getElementById("m").value);
	if  ((m<=1) || (isNaN(m)) )
     {alert ("falscher Wert für m"); return;}
    if (document.getElementById("r").value == '') 
     {alert ("Wert für r eingeben!"); return;}
    r=parseInt(document.getElementById("r").value);
	if ((r<=0) || (r>m) || (isNaN(r)) )
     {alert ("falscher Wert für r"); return;}
    if (document.getElementById("n").value == '') 
     {alert ("Wert für n eingeben!"); return;}
    n=parseInt(document.getElementById("n").value);
	if ((n<=0) || (n>m) || (isNaN(n)) )
     {alert ("falscher Wert für n"); return;}	
    if (document.getElementById("a").value == '') 
     {alert ("Wert für a eingeben!"); return;}
    a=parseInt(document.getElementById("a").value);
	if ((a<0) || isNaN(a) || (a>n) || (a>r))
	  {alert ("falscher Wert für a"); return;}	
    if (document.getElementById("b").value == '') 
     {alert ("Wert für b eingeben!"); return;}
	b=parseInt(document.getElementById("b").value);
	if ( (isNaN(b)) || (b>n) || (b<a) || (b>r) )
     {alert ("falscher Wert für b"); return;}
	// calc Hypergeovert
	summe = 0;
    calcwk(m,r,n);
	for (var x=a;x<=b;x++) summe += wkeit[x];
	summerez=runde(1/summe);
    mue=n*r/m;
    sigma=Math.sqrt(n*r/m*(1-r/m)*(m-n)/(m-1))
	schreibeWerte();
	if (n<=30) zeichne();
	  else ctx.clearRect(0,0,W,H);
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
    document.getElementById("M").innerHTML=m;	
	document.getElementById("N").innerHTML=n;
	document.getElementById("R").innerHTML=r;
	document.getElementById("A").innerHTML=a;
	document.getElementById("B").innerHTML=b;
	document.getElementById("MU").innerHTML=runde(mue);
	document.getElementById("VAR").innerHTML=runde(varianz);
	document.getElementById("SIGMA").innerHTML=runde(sigma);
	document.getElementById("RES").innerHTML=runde(1e6*summe)/1e6;
	document.getElementById("RESHY").innerHTML=summerez;
  }

  function runde(x) {
	return Math.round(100000*x)/100000;  
  }



 