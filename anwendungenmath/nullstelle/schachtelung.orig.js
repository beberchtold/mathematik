  // Progamm zu Nullstelle mit Intervallschachtelung auf www.mathematik.ch
  // Oktober 2015: Applet vom März 2001 umgeschrieben auf html5 und Javascript
  // copyright Bernhard Berchtold

    var Xmin;
    var Xmax=Xmin+1;
    var term;  
	var xl;
	var xr;
    var yl;
	var yr;
	var niters=0;
	var anz;         // Anzahl genaue Dezimalstellen der gesuchten Nullstelle
	var nichts=false;   // true, falls keine Nullstelle im vorgegebenen Intervall

window.onload=init;    

  function ok1() {
    var hilf = document.getElementById("Xmin").value;
    var check = pruefe_grenze(hilf);
    if (!check) return false;
    Xmin = eval(hilf);
    if (isNaN(Xmin)) return false;
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
    return hilf;               // ev ist hilf NaN oder Infinity oder -Infinity
  }

  function init() {
    document.getElementById('Step').disabled=false;
    document.getElementById('Run').disabled=false;		
    anz = document.getElementById("Anz").value;
	if (anz>14) {
	  anz=14;
	  document.getElementById("Anz").value=14;
	}
	if (anz<1) {
	  anz=1;
	  document.getElementById("Anz").value=1;
	}
    term = document.getElementById("f").value;
    ergaenze_term();
	// Fehler im term?
    var x = 1.234567;  
	try {var y=f(x);}
	  catch (e) {Fehlerbehandlung(); return;}
	if (!ok1()) {   // in ok1() werden die x-Grenzen eingelesen
      return;           
    }
	niters = 0;
	nichts=false;
    xl=Math.floor(Xmin); xr=xl+1;
    document.getElementById("Xr").innerHTML=""+xr;
	document.getElementById("xl").innerHTML="x"+niters+"l: "+xl;
    document.getElementById("xr").innerHTML="x"+niters+"r: "+xr;	
	document.getElementById("message").innerHTML="Klick auf Run oder Step";
  }

  function dostep() {
	if (f(xl)==0) {
		document.getElementById("message").innerHTML="Nullstelle = "+xl;
		niters=anz;
		document.getElementById('Step').disabled=true;
	    document.getElementById('Run').disabled=true;
		return;
	}
	if (f(xr)==0) {
		document.getElementById("message").innerHTML="Nullstelle = "+xr;
		niters=anz;
	    document.getElementById('Step').disabled=true;
	    document.getElementById('Run').disabled=true;
		return;
	}
    niters++;
    findroot();
	if (nichts) return;
	yl=f(xl); yr=f(xr);
    document.getElementById("xl").innerHTML="x"+niters+"l: "+round(xl,niters);
	document.getElementById("xr").innerHTML="x"+niters+"r: "+round(xr,niters);
    if (niters==anz) {
	  document.getElementById("message").innerHTML="Ziel erreicht!";
	  document.getElementById('Step').disabled=true;
	  document.getElementById('Run').disabled=true;
	}
  }

  function run() {
	  while (niters<anz && !nichts) dostep(); 
   }

  function findroot() {
	var x=xl;
	var eps=Math.pow(10,-niters);
	while (isNaN(f(x)) && x<=xr) {
	  x=x+eps;
	  x=round(x,niters);
      if (x>xr) {
	    document.getElementById("message").innerHTML="Keine Nullstelle im Intervall!"; 
		nichts=true; 
	    document.getElementById('Step').disabled=true;
	    document.getElementById('Run').disabled=true;		  
		return;
	  }
	}		
	x=xl; 
	while (isNaN(f(x)) || isNaN(f(x+eps)) || f(x)==Infinity || f(x+eps)==Infinity || f(x)==-Infinity || f(x+eps)==-Infinity || f(x)*f(x+eps)>0) {
	   x=x+eps;
	   x=round(x,niters);
	   if (x>=xr) {
		  document.getElementById("message").innerHTML="Keine Nullstelle im Intervall!"; 
		  nichts=true; 
	      document.getElementById('Step').disabled=true;
	      document.getElementById('Run').disabled=true;		  
		  return;}
	}
	xl=x; var xralt=xr; xr=x+eps; x=round(xr,niters);
	if (xr>xralt) {
		document.getElementById("message").innerHTML="Keine Nullstelle im Intervall!"; 
		nichts=true; 
	    document.getElementById('Step').disabled=true;
	    document.getElementById('Run').disabled=true;		  
		return;
	}
  }

function round(x,exp) {
	var faktor=Math.pow(10,exp);
	return Math.round(faktor*x)/faktor;
}

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