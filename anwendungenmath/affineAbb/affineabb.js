  // Progamm zu Affine Abbildungen auf www.mathematik.ch
  // Dezember 2015: Applet vom Januar 2002 umgeschrieben auf html5 und Javascript
  // Mai 2020: Hilfe in neuem Fenster
  // copyright Bernhard Berchtold

    var W,H;
    var Xmin=-8;
    var Xmax=8;
    var Ymin=-6;
    var Ymax=7;
    var ctx;
    var DiffX,DiffY;
    var term;
	var a1,b1,v1,a2,b2,v2;
	var x1,y1,x2,y2,x3,y3;
	var mx,my,r;
	var wahl=2;
	
window.onload=init;	
    
  function resizeCanvas() {
    var canvs = document.getElementById("containercanvas");
    canvs.width = canvs.offsetWidth;
	W=canvs.width;
	if (W>600) W=600;
	H=Math.round(0.8*W);
	if (initmade) {
	  resize1();
	  switch (wahl) {
	    case 1: button1(); break;
	    case 2: button2(); break;
	    case 3: button3(); break;
	    case 4: button4(); break;
	    case 5: button5(); break;
	  }
	} else init();	
  }

  function button1() {	
	document.getElementById(wahl).style.backgroundColor ="#E0FFFF";
	wahl=1;
	document.getElementById("1").style.backgroundColor ="#00FF00";  
	zeichne();
	zeichne_quadrat();  
  }

  function button2() {
    zeichne();
	if (!ok3()) {   // in ok3() wird Mittelpunkt und r eingelesen
      return;           
      }
	document.getElementById(wahl).style.backgroundColor ="#E0FFFF";
	wahl=2;
	document.getElementById("2").style.backgroundColor ="#00FF00";  
	zeichne_kreis(mx,my,r);
  }

  function button3() {
	document.getElementById(wahl).style.backgroundColor ="#E0FFFF";
	wahl=3;
	document.getElementById("3").style.backgroundColor ="#00FF00";
	zeichne();
	zeichne_F(); 
  }  

  function button4() {
	zeichne();
	if (!ok2()) {   // in ok2() werden Eckpunkte Dreieck eingelesen
      return;           
    }
	document.getElementById(wahl).style.backgroundColor ="#E0FFFF";
	wahl=4;
	document.getElementById("4").style.backgroundColor ="#00FF00";
	zeichne_dreieck(x1,y1,x2,y2,x3,y3);	  
  }

  function button5() {
	zeichne();
    term = document.getElementById("f").value;
    ergaenze_term();
	// Fehler im term?
    var x = 1.234567;  
	try {var y=f(x);}
	  catch (e) {Fehlerbehandlung(); return;}
    document.getElementById(wahl).style.backgroundColor ="#E0FFFF";
	wahl=5;
	document.getElementById("5").style.backgroundColor ="#00FF00";	  
	zeichne_funktion();
  }
  
  function ok1() {
	Warnung.innerHTML = "";
    a1 = parseFloat(document.getElementById("a1").value);
    if (isNaN(a1)) {alert("Fehler in a1"); return false;}
    b1 = parseFloat(document.getElementById("b1").value);
    if (isNaN(b1)) {alert("Fehler in b1"); return false;}  
    v1 = parseFloat(document.getElementById("v1").value);
    if (isNaN(v1)) {alert("Fehler in v1"); return false;}
	a2 = parseFloat(document.getElementById("a2").value);
    if (isNaN(a2)) {alert("Fehler in a2"); return false;}
    b2 = parseFloat(document.getElementById("b2").value);
    if (isNaN(b2)) {alert("Fehler in b2"); return false;}   
    v2 = parseFloat(document.getElementById("v2").value);
    if (isNaN(v2)) {alert("Fehler in v2"); return false;}
    if (a1*b2-a2*b1==0) {Warnung.innerHTML = "Warnung! Abbildungsdeterminante = 0";}	
    return true;   
  }

  function ok2() {
	x1 = parseFloat(document.getElementById("x1").value);
    if (isNaN(x1)) {alert("Fehler in x1"); return false;}
    y1 = parseFloat(document.getElementById("y1").value);
    if (isNaN(y1)) {alert("Fehler in y1"); return false;}   
    x2 = parseFloat(document.getElementById("x2").value);
    if (isNaN(x2)) {alert("Fehler in x2"); return false;}
	y2 = parseFloat(document.getElementById("y2").value);
    if (isNaN(y2)) {alert("Fehler in y2"); return false;}
    x3 = parseFloat(document.getElementById("x3").value);
    if (isNaN(x3)) {alert("Fehler in x3"); return false;}   
    y3 = parseFloat(document.getElementById("y3").value);
    if (isNaN(y3)) {alert("Fehler in y3"); return false;}  
    return true;   
  }  
  
  function ok3() {
	mx = parseFloat(document.getElementById("mx").value);
    if (isNaN(mx)) {alert("Fehler in mx"); return false;}
    my = parseFloat(document.getElementById("my").value);
    if (isNaN(my)) {alert("Fehler in my"); return false;}   
    r = parseFloat(document.getElementById("r").value);
    if (isNaN(r) || r<0) {alert("Fehler in Radius"); return false;}
    return true;   
  }

  function f(x) { 
    hilf=eval(term);
    if (isNaN(hilf)) return 100000;
    return hilf;
  }

  function init() {
    canvas1 = document.getElementById('myCanvas');
    ctx = canvas1.getContext('2d');
	W = canvas1.width;
	H = canvas1.height;
    DiffX=Xmax-Xmin; DiffY=Ymax-Ymin;
    button2();
  }

  function zeichne() {  
    if (!ok1()) {   // in ok1() werden a1,b1,... eingelesen
      return;           
    }
    zeichneKS();	
  }

  function zeichne_dreieck(x1,y1,x2,y2,x3,y3) { 
  strecke(x1,y1,x2,y2,"green","blue");
  strecke(x2,y2,x3,y3,"green","blue");
  strecke(x3,y3,x1,y1,"green","blue");   
 }

  function zeichne_F() { 
  strecke(0,0,0,2,"green","blue");
  strecke(0,1,1,1,"green","blue");
  strecke(0,2,1.5,2,"green","blue");   
 }

 function zeichne_quadrat() { 
  strecke(0,0,1,0,"green","blue");
  strecke(1,0,1,1,"green","blue");
  strecke(1,1,0,1,"green","blue");  
  strecke(0,1,0,0,"green","blue");  
 }

 function zeichne_kreis(mx,my,r) {
  var alpha=0; var delta=Math.PI/60;
    while (alpha<2*Math.PI)
      {   var x1=mx + r * Math.cos(alpha); var y1=my + r*Math.sin(alpha);
      	  alpha+=delta;
          var x2=mx + r * Math.cos(alpha); var y2=my + r*Math.sin(alpha);
          strecke(x1,y1,x2,y2,"green","blue");
      }  
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
    while (x<=x2) {
        var posx=col(x);
        ctx.moveTo(posx,posy+3); ctx.lineTo(posx,posy-3);
        ctx.strokeText(x,posx-3,posy+10);
        x=x+1;
    }   
    // Pfeil
    ctx.moveTo(W-5,r0-5); ctx.lineTo(W,r0);
    ctx.moveTo(W-5,r0+5); ctx.lineTo(W,r0);
         
    // y-Achse
    var c0=col(0); ctx.moveTo(c0,0); ctx.lineTo(c0,H);
    var y1=Math.floor(Ymin); var y2=Math.floor(Ymax);
    posx=c0; var y=y1;      
    while (y<=y2) {
        if (y==0) y=y+1;
        posy=row(y);
        ctx.moveTo(posx-3,posy); ctx.lineTo(posx+3,posy);
        ctx.strokeText(y,posx-12,posy+3);
        y=y+1;
    }
    // Pfeil
    ctx.moveTo(c0-5,5); ctx.lineTo(c0,0);
    ctx.moveTo(c0+5,5); ctx.lineTo(c0,0);               
    ctx.stroke();         // x- und y-Achse nun zeichnen  	
  }

  // Berechnen und Plot der Funktion
  function zeichne_funktion(){ 
    var x1=Xmin; var y1=f(x1); var delta=DiffX/360;  
    while (x1+delta<Xmax) {
	  var x2=x1+delta;
	  y2=f(x2);
	  if ( (isNaN(y1)) || (isNaN(y2)) )  {} 
	  else
        if ((Math.abs(y2-y1)<10)) strecke(x1,y1,x2,y2,"green","blue");
      x1=x2; y1=y2;
	}
  }

  function quer(x,y,a,b,v) { 
	return(a*x+b*y+v);
   }

  function strecke(x1,y1,x2,y2,farbe1,farbe2) {
	ctx.beginPath();
	ctx.strokeStyle = farbe1;
	ctx.moveTo(col(x1),row(y1));
	ctx.lineTo(col(x2),row(y2));
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = farbe2;
	ctx.moveTo(col(quer(x1,y1,a1,b1,v1)),row(quer(x1,y1,a2,b2,v2)));
	ctx.lineTo(col(quer(x2,y2,a1,b1,v1)),row(quer(x2,y2,a2,b2,v2)));
	ctx.stroke();	
  }
  
  // Umrechnung von x-Koordinate in Bildschirmspalte
  function col(x)  {return ((x-Xmin)/DiffX*W);}

  // Umrechnung von y-Koordinate in Bildschirmzeile
  function row(y)  {return ((Ymax-y)/DiffY*H);}

  function ergaenze_term() {
    // alle Funktionsterme mit Math. ergänzen
    term = term.replace(/asin/g,'hilfa');
    term = term.replace(/acos/g,'hilfb');
    term = term.replace(/atan/g,'hilfc');        
    term = term.replace(/sin/g,'Math.sin');
    term = term.replace(/cos/g,'Math.cos');
    term = term.replace(/tan/g,'Math.tan');
    term = term.replace(/hilfa/g,'Math.asin');
    term = term.replace(/hilfb/g,'Math.acos');    
    term = term.replace(/hilfc/g,'Math.atan');
    term = term.replace(/abs/g,'Math.abs');               
    term = term.replace(/pow/g,'Math.pow');
    term = term.replace(/sqrt/g,'Math.sqrt');
    term = term.replace(/log/g,'Math.log');
    term = term.replace(/ln/g,'Math.log');
	term = term.replace(/exp/g,'Math.ixp');	
    term = term.replace(/e/g,'Math.E');
    term = term.replace(/Math.ixp/g,'Math.exp');    
    term = term.replace(/pi/g,'Math.PI');   	
  }

  function Fehlerbehandlung() {
	  alert("Fehler im Funktionsterm. Bitte korrigieren.");
  }
