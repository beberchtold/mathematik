 // Simulation Wahrscheinlichkeit Geburtstagsparadox
 // Autor: Bernhard Berchtold, mathematik.ch
 // ursprünglich erstellt 2005 in php mit 3 versch. pages: Theor Wert für k=2, für k=3 und Simulation
 // migriert 17. März 2019 in javascript
 // 21.3.2019: alle Berechnungen in diesem js zusammengefasst

function Bikoeff(A,B) {
  if (B > A - B)
    B = A - B;  
  var F = 1;
  for (var i=1;i<=B;i++)
     F = F * (A - i + 1) / i ;
  return F;
}

function arrayCountValues(e){
	var v,t =[];
	for(var r=e.length;r--;)v=e[r],t[v]?t[v]+=1:t[v]=1;
	return t
}

function rechne(){
	var n,k;
	n=parseInt(document.getElementById("n").value);
	if (isNaN(n) || n<3 || n>250) n=25;
	document.getElementById("n").value=n;
	document.getElementById("N").innerHTML=n;
	k=parseInt(document.getElementById("k").value);
	if  (isNaN(k) || k<2 || k>n) k=2;
	document.getElementById("k").value=k;
	document.getElementById("K").innerHTML=k;
	var x=[],zaehle =[];
	var result = 1;
	var g=0;
    for (var j = 1; j <=10000; j++) { // n Zufallszahlen mit Werten zwischen 1 und 365 erzeugen
      for (var i = 0; i < n; i++)  x[i] = Math.floor(365*Math.random())+1;
      // die n Werte vergleichen, ob mindestens k gleiche
      zaehle = arrayCountValues(x);
	  var erfolg=false;
      for (i=0; i<=zaehle.length; i++) 
        if (zaehle[i]>=k)  erfolg=true;
      if (erfolg) g++;    
    } // end for j
    result = g/100;
    document.getElementById("RES").innerHTML=result;
	document.getElementById("Res2").innerHTML="";
	if (k==2) {
		var res2=rechnethWert2(n);
		document.getElementById("Res2").innerHTML="Der theoretische Wert ist "+res2+"%";
	}
	if (k==3) {
		var res2=rechnethWert3(n);
		document.getElementById("Res2").innerHTML="Der theoretische Wert ist "+res2+"%";			
	}
}

function rechnethWert2(n) {
    var result = 1;
    for (var i = 1; i <= n; i++) 
      result = result * (365-i+1)/365;
    result = 1 - result;	
    result = Math.round(result*1e5)/1e3;
    return result;
}
 
function rechnethWert3(n) {
  var res=[], faktor=[];
  res[0] = 1;
  for (var i = 1; i <= n; i++)                    // alle haben an verschiedenen Tagen Geburtstag
    { res[0] = res[0] * (365-i+1)/365;
      res[n-i]=res[0]/Math.pow(365,n-i);
    }
  faktor[1]=Bikoeff(n,2);
  for (i = 1; i <= (n/2)-1; i++)                    
    faktor[i+1] = faktor[i]*Bikoeff(n-2*i,2)/(i+1);
  for (i = 1; i <= n/2; i++)                    
    res[i] = faktor[i]*res[i];
  var summe=0;
  for (i = 0; i <= n/2; i++)                    
    summe+=res[i];
  result = 1 - summe;     	
  result = Math.round(result*1e5)/1e3;
  return result;
}