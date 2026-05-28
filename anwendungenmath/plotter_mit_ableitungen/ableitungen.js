  // Progamm zu ableitungen.html auf www.mathematik.ch
  // Oktober 2015: Applet vom Januar 2002 umgeschrieben auf html5 und Javascript
  // copyright Bernhard Berchtold

    var W,H;
    var Xmin=-4.1;
    var Xmax=4.1;
    var Ymin=-2.1;
    var Ymax=2.1;
    var ctx;
    var DiffX;
    var DiffY;
    var term="sin(x)";
	
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
    hilf = document.getElementById("Ymin").value;
    var check = pruefe_grenze(hilf);
    if (!check) return false;
    Ymin = eval(hilf);
    if (isNaN(Ymin)) return false;
    hilf = document.getElementById("Ymax").value;
    var check = pruefe_grenze(hilf);
    if (!check) return false;
    Ymax = eval(hilf);
    if (isNaN(Ymax)) return false; 
    DiffX=Xmax-Xmin;
    if (DiffX<=0) return false;
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

  function f(x) { 
    hilf=eval(term);
    if (isNaN(hilf)) return 100000;
    return hilf;
  }

  function f1(x1,x2,y1,y2) {
     hilf=(y2-y1)/(x2-x1);         // (x2-x1) wird hier nie Null
     if (y1==100000 || y2==100000) return 100000;
     return hilf;
  }

  function init() {
    canvas1 = document.getElementById('myCanvas');
    ctx = canvas1.getContext('2d');
	W = canvas1.width;
	H = canvas1.height;
    DiffX=Xmax-Xmin; DiffY=Ymax-Ymin;
    zeichne();
  }


  function zeichne() {  // wird durch Drücken auf button und Click auf checkbox ausgelöst
    if (!ok1()) {   // in ok1() werden die Grenzen eingelesen
      return;           
    }
    zeichneKS();
    term = document.getElementById("f").value;
    ergaenze_term();
	// Fehler im term?
    var x = 1.234567;  
	try {var y=f(x);}
	  catch (e) {Fehlerbehandlung(); return;}	
    zeichne_funktion();
    if (document.getElementById("Abl1").checked)  zeichne_ableitung1();
    if (document.getElementById("Abl2").checked)  zeichne_ableitung2();	
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


  // Berechnen und Plot der Funktion
  function zeichne_funktion(){
    ctx.beginPath();
    ctx.strokeStyle = "green";      
    var y1=f(Xmin); var r1=row(y1);  
    ctx.moveTo(0, r1);           
    for (var i=0; i<W; i++) {  
      var x=Xmin+DiffX/W*i;
      var y2=f(x);
      if (Math.abs(y2-y1)<DiffY/2  && y2!=100000) ctx.lineTo(i,row(y2))
        else ctx.moveTo(i,row(y2));
      y1=y2;      
    }
    ctx.stroke();
  }

  // Berechnen und Plot der 1. Ableitungsfunktion  
  function zeichne_ableitung1() {
    ctx.beginPath();
    ctx.strokeStyle = "red";     
    var x1=Xmin; var y1=f(x1);           
    for (var i=1; i<W; i++) {
      var x2=Xmin+DiffX/W*i;
      var y2=f(x2);      
      var y1_strich=f1(x1,x2,y1,y2);
      if (i==1) ctx.moveTo(1,row(y1_strich)) 
        else if (Math.abs(y1_strich-Hilf)<DiffY/2 && y2!=100000) ctx.lineTo(i,row(y1_strich))
           else ctx.moveTo(i,row(y1_strich));           
      x1=x2; y1=y2;
      var Hilf=y1_strich;
    }
    ctx.stroke();
  }

  // Berechnen und Plot der 2. Ableitungsfunktion
  function zeichne_ableitung2() {
    ctx.beginPath();
    ctx.strokeStyle = "blue";     
    var x1=Xmin; var y1=f(x1); var zaehler=0;
    while (y1==100000) {
      x1=x1+DiffX/W; y1=f(x1); zaehler++; 
    }   
    var x2=x1+DiffX/W; var y2=f(x2); 
    var y1_strich=f1(x1,x2,y1,y2); 
    x1=x2; y1=y2;           
    var i=zaehler+1;
    while (i<W) {
      i++;
      x2=x1+DiffX/W;
      y2=f(x2);
      var y2_strich=f1(x1,x2,y1,y2);      
      var y_2strich=f1(x1,x2,y1_strich,y2_strich);
      if (i==zaehler+2) ctx.moveTo(i,row(y_2strich))
        else if (Math.abs(y_2strich-Hilf)<DiffY/2) ctx.lineTo(i,row(y_2strich))
            else ctx.moveTo(i,row(y_2strich));           
      x1=x2; y1=y2;
      y1_strich=y2_strich;
      var Hilf=y_2strich;
    }
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
