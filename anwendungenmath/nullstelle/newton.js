  // Progamm zu Nullstelle mit Newton auf www.mathematik.ch
  // Oktober 2015: Applet vom März 2001 umgeschrieben auf html5 und Javascript
  // Mai 2020: info_newton.html in neuem Fenster
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
	var y1,y2;  // für Tangente
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
	if (max_iters>100) {
		max_iters=100;
		document.getElementById("max").value=max_iters;
	}
	if (max_iters<1) {
		max_iters=1;
		document.getElementById("max").value=max_iters;		
	}
	xalt = parseFloat(document.getElementById("x0").value);
	document.getElementById("xn").innerHTML="x0: "+xalt;
    document.getElementById("abl").innerHTML="              ";
	document.getElementById("xneu").innerHTML="              ";
	document.getElementById("yneu").innerHTML="              ";
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
    BerechneYGrenzen();     // und DiffY
	zeichneKS();     
    zeichne_funktion();
	zeichne_x(xalt,"red");
	if (isNaN(yalt)) {
	  melde("Funktionswert von x0 existiert nicht!");
	  return;		
	}
	document.getElementById("yn").innerHTML="y0: "+yalt;
	if (yalt==0) {
      melde("Nullstelle = "+xalt);
	  document.getElementById("yn").innerHTML="y0: "+yalt;
	  return;
	}
	document.getElementById("message").innerHTML="Klick auf Run oder Step";
	niters = 0; 
  }

  function dostep() {
	niters++;
	if (niters>1) {
      xalt = xneu;
      yalt = yneu;		
	}
    var dydx = get_deriv(xalt);
	if (isNaN(dydx) || dydx==-Infinity || dydx==Infinity) {
	  melde("Ableitung bei xalt existiert nicht!");
	  document.getElementById("yn").innerHTML="y0: "+yalt;
	  niters=max_iters;
	  return;		
	}
    if (dydx != 0.0) xneu = xalt - yalt / dydx;
	y1=Tangentenpunkt(Xmin,dydx);
	y2=Tangentenpunkt(Xmax,dydx);
	zeichneKS();
    zeichne_funktion();	
	zeichne_x(xalt,"red");
	zeichne_Tangente(y1,y2);
	if (dydx==0) {
	  melde("Ableitung bei "+xalt+" ist Null");
	  document.getElementById("yn").innerHTML="y0: "+yalt;
	  niters=max_iters;
	  return;
	}
	yneu=f(xneu);	
	zeichne_x(xneu,"blue");
	var hilf=niters-1;
    document.getElementById("xn").innerHTML="x"+hilf+": "+xalt;
	document.getElementById("yn").innerHTML="y"+hilf+": "+yalt;
	document.getElementById("abl").innerHTML="Steigung bei x"+hilf+": "+dydx;
	document.getElementById("xneu").innerHTML="x"+niters+": "+xneu;
	document.getElementById("yneu").innerHTML="y"+niters+": "+yneu;
    if (Math.abs(xneu-xalt)<epsilon) {
	yneu=f(xneu);
	document.getElementById("yneu").innerHTML="y"+niters+": "+yneu;
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
	  document.getElementById("yn").innerHTML="              ";
	  document.getElementById("abl").innerHTML="              ";
	  document.getElementById("xneu").innerHTML="              ";
	  document.getElementById("yneu").innerHTML="              ";
	  document.getElementById("message").innerHTML=Meldung;
	  document.getElementById('Step').disabled=true;
	  document.getElementById('Run').disabled=true;	   
   }
   
   function melde1(Meldung) {
	  document.getElementById("message").innerHTML=Meldung;
	  document.getElementById('Step').disabled=true;
	  document.getElementById('Run').disabled=true;	   
   }

   function get_deriv(x) {
        var dx = DiffX / 1000;
        if(dx > 0.001) dx = 0.001;
        var x1 = x - dx;
        var x2 = x + dx;
        var y1 = f(x1);
        var y2 = f(x2);
        return (y2 - y1) / (2 * dx);
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

  function zeichne_x(x,color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
	var c=col(x);
    ctx.moveTo(c,0);
	ctx.lineTo(c,H);
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

  function zeichne_Tangente(y1,y2) {
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.moveTo(0,row(y1));
    ctx.lineTo(W,row(y2));
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

  function Tangentenpunkt(x,m) {
	  return m*(x-xalt)+yalt;
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
