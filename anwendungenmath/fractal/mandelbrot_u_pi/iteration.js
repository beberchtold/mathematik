// Progamm zu Mandelbrotmenge und Pi auf www.mathematik.ch
// copyright Bernhard Berchtold
// 27.12.2025


var N, Nminus1;
var eps;


function rechne_einviertel() {
	einlesen();
	document.getElementById("Titel").innerHTML="Resultat für c = 0.25+&epsilon;";
	const c=0.25+eps;
	var z=0;
    for (var i = 0; i < N; i++) {
      z=z*z+c;
	  if (i==N-2) document.getElementById("RES1").innerHTML="|z<sub>"+Nminus1+"</sub>| = "+z;
    }
	document.getElementById("RES2").innerHTML="|z<sub>"+N+"</sub>| = "+z;
}

function rechne() {
	var rz=0,rzold=0;iz=0;
	var zBetrag;
	einlesen();
	document.getElementById("Titel").innerHTML="Resultat für c = -0.75+&epsilon;i";
	const rc=-0.75;
	const ic=eps;
	for (var i = 0; i < N; i++) {
		rz=rz*rz-iz*iz+rc;		
		iz=2*rzold*iz+ic;
		rzold=rz;
		if (i==N-2) {
			zBetrag=Math.sqrt(rz*rz+iz*iz);
			document.getElementById("RES1").innerHTML="|z<sub>"+Nminus1+"</sub>| = "+zBetrag;
			
		}
	}
	zBetrag=Math.sqrt(rz*rz+iz*iz);
	document.getElementById("RES4").innerHTML="|z<sub>"+N+"</sub>| = "+zBetrag;
	
}

function einlesen() {
    if (document.getElementById("N").value == "") {
        N = 10;
    } else {
        N = parseInt(document.getElementById("N").value)
    }
	if (document.getElementById("N").value < 1) 
        N = 1;
	if (document.getElementById("N").value > 40000000) 
        N = 40000000;
    if (document.getElementById("eps").value == "") {
        eps = 0.1
    } else {
        eps = parseFloat(document.getElementById("eps").value)
    }
	if (eps<1e-11) eps=1e-11;
    setzeWerte();
}

function setzeWerte() {
    document.getElementById("N").value = N;
    document.getElementById("eps").value = eps;
	Nminus1=N-1;
	document.getElementById("RES1").innerHTML="";
	document.getElementById("RES2").innerHTML="";
	document.getElementById("RES3").innerHTML="";
	document.getElementById("RES4").innerHTML="";
	document.getElementById("Titel").innerHTML="";
}
