  // Progamm zur Lösung von Differentialgleichungen nach Runge-Kutta auf www.mathematik.ch
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
	var h;
	var x = new Array();
	var y = new Array();
	var iter=0;
    
window.onload=init;

  function ok1() {
    hilf = document.getElementById("x0").value;
    var check = pruefe_grenze(hilf);
    if (!check) return false;
    x[0] = eval(hilf);
    if (isNaN(x[0])) return false;
    hilf = document.getElementById("xe").value;
    var check = pruefe_grenze(hilf);
    if (!check) return false;
    Xmax = eval(hilf);
    if (isNaN(Xmax)) return false;
    DiffX=Xmax-x[0];
	if (DiffX<=0) return false;
	Xmin=x[0]-0.05*DiffX;
	DiffX=Xmax-Xmin;
	Ymin = document.getElementById("ymin").value;
	Ymax = document.getElementById("ymax").value;
	DiffY=Ymax-Ymin;
	if (DiffY<=0) return false;
    return true;   
  }

  function pruefe_grenze(hilf) {
    if (hilf.split(",").length-1 >0) return false;
    if (hilf.split(".").length-1 >1) return false;
    if ((hilf.length>2) && (hilf.charAt(0)=='-') && (hilf.charAt(1)=='0') && (hilf.charAt(2)!='.')) return false;
    if ((hilf.length>1) && (hilf.charAt(0)=='0') && (hilf.charAt(1)!='.')) return false;
    return true;	
  }

  function f(x,y) { 
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
    y[0] = parseFloat(document.getElementById("y0").value);
	h = parseFloat(document.getElementById("h").value);
	if (h<=0) {
	  h=0.1; document.getElementById("h").value=h;
	}
	iter=0;
	document.getElementById("x1").innerHTML=""; document.getElementById("y1").innerHTML="";
	document.getElementById("x2").innerHTML=""; document.getElementById("y2").innerHTML="";
	document.getElementById("x3").innerHTML=""; document.getElementById("y3").innerHTML="";
	document.getElementById("x4").innerHTML=""; document.getElementById("y4").innerHTML="";
	document.getElementById("x5").innerHTML=""; document.getElementById("y5").innerHTML="";
    term = document.getElementById("f").value;
    ergaenze_term();
	if (!ok1()) {   // in ok1() werden die x-Grenzen eingelesen
      melde("Fehler bei Grenzen KS!");
	  return;           
    }   
	// Fehler im term?
	try {var ystrich=f(x[0],y[0]);}
	  catch (e) {Fehlerbehandlung(); return;}
	zeichneKS();      
	if (isNaN(ystrich)) {
	  melde("y' existiert nicht!");
	  return;		
	}
	document.getElementById("message").innerHTML="Klick auf Run oder Step";
  }

  function dostep() {
	iter++;
    x[iter]=x[iter-1]+h;
	if ( (x[iter]<=Xmax+h/100) && (h>1E-7)) {
	   y[iter]=rungekutta(x[iter-1],y[iter-1],h);
	   zeichne(x[iter-1],y[iter-1],x[iter],y[iter]);
	   schreibeWerte();	   
	}
    else {
	   if (x[iter]>Xmax) melde("xe erreicht!");
	   if (h<=1E-7) melde("h wird zu klein!");
	   document.getElementById('Step').disabled=true;
       document.getElementById('Run').disabled=true;	 
	}
  }

  function run() {
    while ((x[iter]<=Xmax) && (h>1E-7)) dostep();
	if (h<=1E-7) melde("h wird zu klein!");
   }

  function rungekutta(x,y,h1) {
    var k1,k2,k3,k4;
    var ynext;
    if (Math.abs(h1) > 0)
      { k1=h*f(x,y);
        k2=h*f((x+h1/2),(y+k1/2));
        k3=h*f((x+h1/2),(y+k2/2));
        k4=h*f((x+h1),(y+k3));
        ynext=y+(k1+2*k2+2*k3+k4)/6;
        if (Math.abs((k2-k3)/(k1-k2))>0.1) {
          h=0.4*h; document.getElementById("h").value=runde(h);
		}
        else {if (Math.abs(h)<0.1) {
		  h=1.1*h; document.getElementById("h").value=runde(h);
		 }
		}
      }
    return ynext;
   }

  function melde(Meldung) {
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
    if (DiffX<=10) {
      while (x<=x2) {
        var posx=col(x);
        ctx.moveTo(posx,posy+3); ctx.lineTo(posx,posy-3);
        ctx.strokeText(x,posx-6,posy+10);
        x=x+1;
      }
    }   
    x=x1+5-x1%5;
    if (DiffX>10 && DiffX<80) {
      while (x<=x2) {
        var posx=col(x);
        ctx.moveTo(posx,posy+3); ctx.lineTo(posx,posy-3);
        ctx.strokeText(x,posx-6,posy+10);
        x=x+5;
      }
    }  
    // Pfeil
    ctx.moveTo(W-5,r0-5); ctx.lineTo(W,r0);
    ctx.moveTo(W-5,r0+5); ctx.lineTo(W,r0);
         
    // y-Achse
    var c0=col(0);
	ctx.moveTo(c0,0); ctx.lineTo(c0,H);
    var y1=Math.floor(Ymin); var y2=Math.floor(Ymax);
    posx=c0; var y=y1;      
    if (DiffY<=10) {      
      while (y<=y2) {
        if (y==0) y=y+1;
        posy=row(y);
        ctx.moveTo(posx-3,posy); ctx.lineTo(posx+3,posy);
        ctx.strokeText(y,posx-10,posy+3);
        y=y+1;
      }
    }
    y=y1+5-y1%5;
    if (DiffY>10 && DiffY<80) {      
      while (y<=y2) {
        if (y==0) y=y+5;
        posy=row(y);
        ctx.moveTo(posx-3,posy); ctx.lineTo(posx+3,posy);
        ctx.strokeText(y,posx-10,posy+3);
        y=y+5;
      }
    }
    // Pfeil
    ctx.moveTo(c0-5,5); ctx.lineTo(c0,0);
    ctx.moveTo(c0+5,5); ctx.lineTo(c0,0);
    ctx.stroke();         // alles nun zeichnen  	
  }

  function zeichne(xa,ya,xn,yn) {
    ctx.beginPath();
    ctx.strokeStyle = "red";
	var ca=col(xa); var ra=row(ya); var cn=col(xn); var rn=row(yn);
	ctx.moveTo(ca,ra);
	ctx.lineTo(cn,rn);
    ctx.stroke();	
  }
  
  function schreibeWerte() {
	var hilf1=iter-1; var hilf2=iter-2; var hilf3=iter-3; var hilf4=iter-4;
	if (!isNaN(x[hilf4])) {
		document.getElementById("x1").innerHTML="x"+hilf4+"="+runde(x[hilf4]);
	    document.getElementById("y1").innerHTML="y"+hilf4+"="+runde(y[hilf4]);
	 }
	if (!isNaN(x[hilf3])) {
		 document.getElementById("x2").innerHTML="x"+hilf3+"="+runde(x[hilf3]);
		 document.getElementById("y2").innerHTML="y"+hilf3+"="+runde(y[hilf3]);
	} 
	if (!isNaN(x[hilf2])) {
		 document.getElementById("x3").innerHTML="x"+hilf2+"="+runde(x[hilf2]);
	     document.getElementById("y3").innerHTML="y"+hilf2+"="+runde(y[hilf2]);
	}
	document.getElementById("x4").innerHTML="x"+hilf1+"="+runde(x[hilf1]);
	document.getElementById("y4").innerHTML="y"+hilf1+"="+runde(y[hilf1]);
	document.getElementById("x5").innerHTML="x"+iter+"="+runde(x[iter]);
	document.getElementById("y5").innerHTML="y"+iter+"="+runde(y[iter]);
  }

  // Umrechnung von x-Koordinate in Bildschirmspalte
  function col(x) {return ((x-Xmin)/DiffX*W);}

  // Umrechnung von y-Koordinate in Bildschirmzeile
  function row(y) {return ((Ymax-y)/DiffY*H);}

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

  function runde(x) {
	return Math.round(1000000*x)/1000000;
  }
  
  function Fehlerbehandlung() {
	alert("Fehler im Funktionsterm. Bitte korrigieren.");
  }
