  // Progamm zu numerischer Integration auf www.mathematik.ch
  // Oktober 2015: Applet vom März 2001 umgeschrieben auf html5 und Javascript
  // copyright Bernhard Berchtold

	var W;
    var H;
    var Xmin;
    var Xmax;
    var Ymin;
    var Ymax;
    var ctx;
    var DiffX;
    var DiffY;
    var term;  
	var x = new Array();
    var y = new Array();
	var ym = new Array();
    var nint;
	var reslpunkt;
	var resrpunkt;
	var resmpunkt;
	var restrapez;
	var canvas1;
	var initmade=false;
	
window.onload=resizeCanvas;	
    
  function resizeCanvas() {
    var canvs = document.getElementById("containercanvas");
    canvs.width = canvs.offsetWidth;
	W=canvs.width;
	if (W>400) W=400;
	H=W;
	if (initmade) {
	  resize1();
	  if (document.getElementById('LPunkt').checked) zeichnelpunkt();
	  if (document.getElementById('RPunkt').checked) zeichnerpunkt();
	  if (document.getElementById('Trapez').checked) zeichnetrapez();
	  if (document.getElementById('MPunkt').checked) zeichnempunkt();
	  zeichneKS();
	  zeichne_funktion();
	} else init();	
  }

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
	initmade=true;
	window.addEventListener('resize', function(event){
      resizeCanvas();
    });
    canvas1 = document.getElementById('myCanvas');
	resize1();
	ctx = canvas1.getContext('2d');
	document.getElementById('Trapez').checked=true;	
	reset();
  }

  function resize1() {
	 canvas1.width=W; canvas1.height=H; 
  }
  
  function reset() {	
	nint = document.getElementById("Anz").value;
	if (nint<1) nint=1;
	if (nint>200) nint=200;
	document.getElementById("Anz").value=nint;
	document.getElementById("simpson").innerHTML="";
    leereResultate();
    term = document.getElementById("f").value;
    ergaenze_term();
	// Fehler im term? 
	try { var y=f(Xmin);}
	  catch (e) {Fehlerbehandlung(); return;}
	if (!ok1()) {   // in ok1() werden die x-Grenzen eingelesen
      alert("Fehler bei Grenzen KS!");
	  return;           
    }
    BerechneYGrenzen();   // und DiffY
	ctx.clearRect(0,0,W,H);
	Berechne_x_y();
	reslpunkt=runde(leftpoint());
	if (document.getElementById('LPunkt').checked) {
		document.getElementById("lpunkt").style.color="red";
		zeichnelpunkt();
	}
	resrpunkt=runde(rightpoint());
	if (document.getElementById('RPunkt').checked) {
		document.getElementById("rpunkt").style.color="red";
		zeichnerpunkt();		
	}
	restrapez=runde(trapez());
	if (document.getElementById('Trapez').checked) {
		document.getElementById("trapez").style.color="red";	
		zeichnetrapez();
	}
	resmpunkt=runde(midpoint());
	if (document.getElementById('MPunkt').checked) {
		document.getElementById("mpunkt").style.color="red";	
		zeichnempunkt();
	}	
	var ressimpson=runde(simpson());
	document.getElementById("simpson").innerHTML=ressimpson;
	document.getElementById("trapez").innerHTML=restrapez;
	document.getElementById("lpunkt").innerHTML=reslpunkt;
	document.getElementById("rpunkt").innerHTML=resrpunkt;
	document.getElementById("mpunkt").innerHTML=resmpunkt;
	zeichneKS();
	zeichne_funktion();	
  }

  function OnChangeCheckbox1 (checkbox) {
    document.getElementById('Trapez').checked=true;
	document.getElementById("LPunkt").checked=false;
	document.getElementById("RPunkt").checked=false;
	document.getElementById("MPunkt").checked=false;
	leereResultate();
	document.getElementById("trapez").style.color="red";
	document.getElementById("trapez").innerHTML=restrapez;
	document.getElementById("lpunkt").innerHTML=reslpunkt;
	document.getElementById("rpunkt").innerHTML=resrpunkt;
	document.getElementById("mpunkt").innerHTML=resmpunkt;
	ctx.clearRect(0,0,W,H);
	zeichnetrapez();
	zeichneKS();
	zeichne_funktion();	
  }

  function OnChangeCheckbox2 (checkbox) {
    document.getElementById('LPunkt').checked=true;
	document.getElementById("Trapez").checked=false;
	document.getElementById("RPunkt").checked=false;
	document.getElementById("MPunkt").checked=false;
	leereResultate();
	document.getElementById("lpunkt").style.color="red";
	document.getElementById("lpunkt").innerHTML=reslpunkt;
	document.getElementById("rpunkt").innerHTML=resrpunkt;
	document.getElementById("trapez").innerHTML=restrapez;
	document.getElementById("mpunkt").innerHTML=resmpunkt;
	ctx.clearRect(0,0,W,H);
	zeichnelpunkt();
	zeichneKS();
	zeichne_funktion();	
  }

  function OnChangeCheckbox3 (checkbox) {
    document.getElementById('RPunkt').checked=true;
	document.getElementById("Trapez").checked=false;
	document.getElementById("LPunkt").checked=false;
	document.getElementById("MPunkt").checked=false;
	leereResultate();
	document.getElementById("rpunkt").style.color="red";
	document.getElementById("rpunkt").innerHTML=resrpunkt;
	document.getElementById("lpunkt").innerHTML=reslpunkt;
	document.getElementById("trapez").innerHTML=restrapez;
	document.getElementById("mpunkt").innerHTML=resmpunkt;
	ctx.clearRect(0,0,W,H);
	zeichnerpunkt();
	zeichneKS();
	zeichne_funktion();		
  }


  function OnChangeCheckbox4 (checkbox) {
    document.getElementById('MPunkt').checked=true;
	document.getElementById('RPunkt').checked=false;
	document.getElementById("Trapez").checked=false;
	document.getElementById("LPunkt").checked=false;
	leereResultate();
	document.getElementById("mpunkt").style.color="red";
	document.getElementById("rpunkt").innerHTML=resrpunkt;
	document.getElementById("lpunkt").innerHTML=reslpunkt;
	document.getElementById("trapez").innerHTML=restrapez;
	document.getElementById("mpunkt").innerHTML=resmpunkt;
	ctx.clearRect(0,0,W,H);
	zeichnempunkt();
	zeichneKS();
	zeichne_funktion();		
  }  

  function leftpoint() {
	  var value = 0.0;
      var delta = DiffX / nint;
      for (var i = 0; i < nint; i++)
        value = value + delta * y[i];
      return value;
    }

   function rightpoint() {
	  var value = 0.0;
      var delta = DiffX / nint;
      for (var i = 1; i <= nint; i++)
         value = value + delta * y[i];
      return value;
    }

   function midpoint() {
	  var value = 0.0;
      var delta = DiffX / nint;
      for (var i = 0; i < nint; i++)
         value = value + delta * ym[i];
      return value;
    }
	
	function trapez() {
	  var value = 0.0;
      var delta = DiffX / nint;
      for (var i = 0; i < nint; i++)
        value = value + delta * (y[i]+y[i+1])/2;
      return value;
    }

   function simpson() {
	  var value = 0.0;
	  if (nint % 2 != 0)
            return;
      var delta = DiffX / nint;
      for (var i = 0; i < nint; i+=2)
        value = value + delta * (y[i]+4*y[i+1]+y[i+2])/3;
      return value;
    }  

   function zeichneKS() {
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
	
    ctx.stroke();         // alles nun zeichnen  	
  }
  
  // Plot der Funktion
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

  function zeichnelpunkt() {
	var delta=W/nint; if (delta<1) delta=1;
	var r0=row(0); if (r0>H) r0=H;
	ctx.beginPath();
    ctx.fillStyle="#F06060";
	for (var i = 0; i < nint; i++) {
	  var yi=row(y[i]);
	  ctx.rect(col(x[i]),yi,delta,r0-yi);
      ctx.fill();	  
	}
  }

  function zeichnerpunkt() {
	var delta=W/nint; if (delta<1) delta=1;
	var r0=row(0); if (r0>H) r0=H;
	ctx.beginPath();
	ctx.fillStyle="#F06060";
	for (var i = 0; i < nint; i++) {
	  var yi=row(y[i+1]);
	  ctx.rect(col(x[i]),yi,delta,r0-yi);
      ctx.fill();	  
	}	  
  }

  function zeichnempunkt() {  
	var delta=W/nint; if (delta<1) delta=1;
	var r0=row(0); if (r0>H) r0=H;
	ctx.beginPath();
    ctx.fillStyle="#F06060";
	for (var i = 0; i < nint; i++) {
	  var yi=row(ym[i]);
	  ctx.rect(col(x[i]),yi,delta,r0-yi);
      ctx.fill();	  
	}
  }  
  
  function zeichnetrapez() {
	if (nint>W) {zeichnelpunkt(); return;}
	var r0=row(0); if (r0>H) r0=H;
	ctx.fillStyle="#F06060";
	for (var i = 0; i < nint; i++) {
	  ctx.beginPath();
	  var xi=col(x[i]); 
	  var yi=row(y[i]);
      if (yi<0) yi=0; if (yi>H) yi=H;	  
	  var xi1=col(x[i+1]);
	  ctx.moveTo(xi,r0);
	  ctx.lineTo(xi,yi);
	  ctx.lineTo(xi1,row(y[i+1]));
	  ctx.lineTo(xi1,r0);
	  ctx.fill();
    }	  
  }

  // Berechne x und y-Werte
  function Berechne_x_y() {
    var delta = DiffX / nint;
	x[nint]=Xmax; y[nint] = f(Xmax);
    for (var i = 0; i < nint; i++) {
       x[i] = Xmin + i * delta;
       y[i] = f(x[i]);
	   ym[i]=f(Xmin + delta/2 + i * delta);
	}
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

  function runde(x) {
	  return Math.round(1000000*x)/1000000;
  }
  
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

  function leereResultate(){
	document.getElementById("trapez").style.color="black";
	document.getElementById("lpunkt").style.color="black";
	document.getElementById("rpunkt").style.color="black";
	document.getElementById("mpunkt").style.color="black";
	document.getElementById("trapez").innerHTML="";	
	document.getElementById("lpunkt").innerHTML="";
	document.getElementById("rpunkt").innerHTML="";
	document.getElementById("mpunkt").innerHTML="";
  }
  
	function Fehlerbehandlung() {
	  alert("Fehler im Funktionsterm. Bitte korrigieren.");
  }  