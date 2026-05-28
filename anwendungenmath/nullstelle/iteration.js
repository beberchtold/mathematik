  // Progamm zu Nullstelle mit Iteration auf www.mathematik.ch
  // Oktober 2015: Applet vom März 2001 umgeschrieben auf html5 und Javascript
  // Mai 2020: info_iteration.html in neuem Fenster
  // copyright Bernhard Berchtold

    var W,H;
    var Xmin;
    var Xmax;
    var Ymin;
    var Ymax;
    var ctx;
    var DiffX;
    var DiffY;
    var term;  
	var xalt;
	var xneu;
    var yalt;
	var yneu;
	var niters=0;
	var max_iters;
	var epsilon;
	
window.onload=init;
   
  function ok1() {
    var hilf = document.getElementById("Xmin").value;
    var check = pruefe_grenze(hilf);
    if (!check) return false;
    Xmin = eval(hilf);
    if (isNaN(Xmin)) return false;
    hilf = document.getElementById("Xmax").value;
    var check = pruefe_grenze(hilf);
    if (!check) return false;
    Xmax = eval(hilf);
    if (isNaN(Xmax)) return false;   
    if (-Xmin==Xmax) Xmax=1.02*Xmax;   // IE-Bug bei y=1/x   1/0 ?? 
    DiffX=Xmax-Xmin;
    if (DiffX<=0) return false;
    return true;   
  }

  function pruefe_grenze(hilf) {
    if (hilf.split(",").length-1 >0) return false;
    if (hilf.split(".").length-1 >1) return false;
    if ((hilf.length>2) && (hilf.charAt(0)=='-') && (hilf.charAt(1)=='0') && (hilf.charAt(2)!='.')) return false;
    if ((hilf.length>1) && (hilf.charAt(0)=='0') && (hilf.charAt(1)!='.')) return false;
    return true;	
  }

  function f(x) { 
    hilf=eval(term);
    return hilf;               // ev ist hilf NaN
  }

  function init() {
    canvas1 = document.getElementById('myCanvas');
    ctx = canvas1.getContext('2d');
	W = canvas1.width;
	H = canvas1.height;
	reset();
  }

  function reset() {
    document.getElementById('Step').disabled=false;
    document.getElementById('Run').disabled=false;		
    epsilon = document.getElementById("eps").value;
	max_iters = document.getElementById("max").value;
	if (max_iters>200) {
		max_iters=200;
		document.getElementById("max").value=max_iters;
	}
	if (max_iters<1) {
		max_iters=1;
		document.getElementById("max").value=max_iters;		
	}
	xalt = parseFloat(document.getElementById("x0").value);
	document.getElementById("xn").innerHTML="x0: "+xalt;
	document.getElementById("xneu").innerHTML="              ";
    term = document.getElementById("f").value;
    ergaenze_term();
	// Fehler im term?
    var x = xalt;  
	try {yalt=f(xalt);}
	  catch (e) {Fehlerbehandlung(); return;}
	if (!ok1()) {   // in ok1() werden die x-Grenzen eingelesen
      melde("Fehler bei Grenzen KS!");
	  return;           
    }
	DiffX=Xmax-Xmin;
    BerechneYGrenzen();   // und DiffY
	zeichneKS();      
    zeichne_funktion();
	if (isNaN(yalt)) {
	  melde("x1 existiert nicht!");
	  return;		
	}
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth="1";
    var ca=col(xalt);
	ctx.moveTo(ca,row(0))
    ctx.lineTo(ca,row(yalt));
	ctx.stroke();	
	document.getElementById("xn").innerHTML="x0: "+xalt;
	document.getElementById("message").innerHTML="Klick auf Run oder Step";
	niters = 0;
  }

  function dostep() {
	niters++;
	if (niters>1) {
      xalt = xneu;
      yalt = yneu;		
	}	
    xneu = f(xalt);
	if (isNaN(yalt) || yalt==-Infinity || yalt==Infinity) {
	  melde("x"+niters+" existiert nicht!");
	  niters=max_iters;
	  return;		
	}	
	yneu=f(xneu);
	if (isNaN(yneu) || yneu==-Infinity || yneu==Infinity) {
	  var hilf=niters+1; var hilf2=niters-1;
	  melde("x"+hilf+" existiert nicht!");
	  document.getElementById("xn").innerHTML="x"+hilf2+": "+xalt;
	  document.getElementById("xneu").innerHTML="x"+niters+": "+xneu;
	  niters=max_iters;
	  return;		
	}	
	zeichneKS();
    zeichne_funktion();	
	zeichne_x(xalt,xneu,yalt,yneu);
	hilf=niters-1;
    document.getElementById("xn").innerHTML="x"+hilf+": "+xalt;
	document.getElementById("xneu").innerHTML="x"+niters+": "+xneu;
    if (Math.abs(xneu-xalt)<epsilon) {
	document.getElementById("message").innerHTML="Ziel nach "+niters+" Schritten erreicht!";
	document.getElementById('Step').disabled=true;
	document.getElementById('Run').disabled=true;
	}
	 else if (niters==max_iters) {
      document.getElementById("message").innerHTML="Ziel nach "+niters+" Schritten nicht erreicht!";
	  document.getElementById('Step').disabled=true;
	  document.getElementById('Run').disabled=true;
	}
  }

   function run() {
	 if (niters==0) dostep();
	 while (Math.abs(xneu-xalt)>epsilon && niters<max_iters) dostep(); 
   }

   function melde(Meldung) {
	  document.getElementById("xneu").innerHTML="              ";
	  document.getElementById("message").innerHTML=Meldung;
	  document.getElementById('Step').disabled=true;
	  document.getElementById('Run').disabled=true;	   
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

    // Gerade mit Gleichung y=x
	var c1=col(Xmin); var r1=row(Xmin);
	var c2=col(Xmax); var r2=row(Xmax);
    ctx.moveTo(c1,r1);
	ctx.lineTo(c2,r2);	
    ctx.stroke();         // alles nun zeichnen  	
  }

  function zeichne_x(xa,xn,ya,yn) {
    ctx.beginPath();
    ctx.strokeStyle = "red";
	var ca=col(xa); var ra=row(ya); var cn=col(xn); var rn=row(yn);
    ctx.moveTo(ca,row(0));
	ctx.lineTo(ca,ra);
	ctx.lineTo(cn,ra);
	ctx.stroke();
	ctx.beginPath();
    ctx.strokeStyle = "blue";
	ctx.moveTo(cn,ra);
	ctx.lineTo(cn,row(0));
    ctx.stroke();	
  }
  
  // Berechnen und Plot der Funktion
  function zeichne_funktion(){
    ctx.beginPath();
    ctx.strokeStyle = "green";
	var x=Xmin;
	var deltax=DiffX/W;
	while (isNaN(f(x))) x=x+deltax;
    var xmin=x;	
    var y1=f(x); var r1=row(y1);
    var starti=col(x);
    ctx.moveTo(starti, r1);           
    for (var i=starti+1; i<W; i++) {  
      x=Xmin+DiffX/W*i;
      var y2=f(x);
      if (Math.abs(y2-y1)<DiffY/2  && !isNaN(y2)) ctx.lineTo(i,row(y2))
        else ctx.moveTo(i,row(y2));
      y1=y2;      
    }
    ctx.stroke();
  }

  function BerechneYGrenzen() {
	var x=Xmin;
	var deltax=DiffX/100;
	while (isNaN(f(x))) x=x+deltax;

	Ymin=f(x); Ymax=Ymin;
	while (x+deltax<=Xmax) {
	 x=x+deltax;
     var y=f(x);	 
	 if (!isNaN(y) && y<Ymin) Ymin=y;
	 if (!isNaN(y) && y>Ymax) Ymax=y;
	}
	DiffY=Ymax-Ymin;
	if (DiffY<50) {Ymin=Ymin-0.1*DiffY; Ymax=Ymax+0.1*DiffY;}
	if (Ymax>50) Ymax=50;
	if (Ymin<-50) Ymin=-50;
    DiffY=Ymax-Ymin;
  }

  // Umrechnung von x-Koordinate in Bildschirmspalte
  function col(x)  {return ((x-Xmin)/DiffX*W);}

  // Umrechnung von y-Koordinate in Bildschirmzeile
  function row(y)  {return ((Ymax-y)/DiffY*H);}

  function ergaenze_term() {
    // alle Funktionsterme mit Math. ergänzen
    term = term.replace(/asin\(/g,'hilfa');
    term = term.replace(/acos\(/g,'hilfb');
    term = term.replace(/atan\(/g,'hilfc');        
    term = term.replace(/sin\(/g,'Math.sin\(');
    term = term.replace(/cos\(/g,'Math.cos\(');
    term = term.replace(/tan\(/g,'Math.tan\(');
    term = term.replace(/hilfa/g,'Math.asin\(');
    term = term.replace(/hilfb/g,'Math.acos\(');    
    term = term.replace(/hilfc/g,'Math.atan\(');
    term = term.replace(/abs\(/g,'Math.abs\(');               
    term = term.replace(/pow\(/g,'Math.pow\(');
    term = term.replace(/sqrt\(/g,'Math.sqrt\(');
    term = term.replace(/log\(/g,'Math.log\(');
    term = term.replace(/ln\(/g,'Math.log\(');
	term = term.replace(/exp\(/g,'Math.ixp');	
    term = term.replace(/e/g,'Math.E');
	term = term.replace(/Math.ixp/g,'Math.exp\(');    
    term = term.replace(/pi/g,'Math.PI');   	
  }

  function Fehlerbehandlung() {
	alert("Fehler im Funktionsterm. Bitte korrigieren.");
  }
