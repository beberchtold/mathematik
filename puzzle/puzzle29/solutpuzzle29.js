function Bikoeff(A,B) {
  if (A<B) return 0;
  if (B > A - B)
    B = A - B;  
  var F = 1;
  for (var i = 1;  i <= B;  i++)
     F = F * (A - i + 1) / i ;
  return F;
 }
 
 function fak(n) {
  var res=1;
  for (var i = 2;  i <= n;  i++)
    res=res*i;
  return res;
 }
 
 function gue(n) {
 var guenstig=new Array();
 for (var k = 1; k < 46; k++)
     guenstig[k]=0;
 guenstig[0]=fak(n);
 if (n>1) guenstig[n-1]=n;
 guenstig[1]=guenstig[0]*Bikoeff(n,2);
 for (k = 2; k < n-1; k++)
 {
   var sum=0; var faktor=-1;
   for (var x = 0; x <= n-k-1; x++)
     { faktor=faktor*(-1);
       sum = sum+faktor*Bikoeff(n-k,x) * Math.pow(n-k-x,n);
     }
   guenstig[k] = Bikoeff(n,n-k) * sum;   // probs bei hohem n (z.B. n=39, n=40): negative Werte für k=3!!
 }  
   return(guenstig);
 }
 
function control(n,moeglich,guenstig) {
   var sum=0; 
   for (var i = 0; i <= n; i++)
       sum = sum+guenstig[i]; 
   var result=sum/moeglich; 
   return(result);
 }
 
 function EW(n,moeglich,guenstig) {
   var sum=0; 
   for (var i = 0; i < n; i++)
       sum = sum+i*guenstig[i];
   var result=sum/moeglich;   
   return(result);
 } 
 
  function ausgabe(zahl) {
	var hilf=zahl.toString();
    if (hilf.length>10) {
      if (zahl<1e-3) return (zahl.toExponential(6)); 		
	    else return (zahl.toPrecision(6));
	}
      else return(zahl);
  }
  
 function rechne() {
  var n=9;
  n=parseInt(document.getElementById("n").value);
  if (isNaN(n) || n<1 || n>35) n=9;
  document.getElementById("n").value=n;
  document.getElementById("N").innerHTML=n;
  var moeglich=Math.pow(n,n);
  document.getElementById("M").innerHTML=moeglich;
  var guenstig=new Array();
  guenstig=gue(n);
  var kontrolle=control(n,moeglich,guenstig);
  var Erwartungswert=Math.round(10000*EW(n,moeglich,guenstig))/10000;
  document.getElementById("Ausgabe").innerHTML="";
  document.getElementById("Ausgabe").innerHTML+="<div class=\"table\">";
  document.getElementById("Ausgabe").innerHTML+="<div class=\"spalte1\"><b>k</b></div>";
  document.getElementById("Ausgabe").innerHTML+="<div class=\"spalte\"><b>günstige Fälle</b></div>";
  document.getElementById("Ausgabe").innerHTML+="<div class=\"spalte\"><b>Wahrscheinlichkeit</b></div>";
  document.getElementById("Ausgabe").innerHTML+="</div>";
  for (var i = 0; i <= n; i++)  {	  
     document.getElementById("Ausgabe").innerHTML+="<div class=\"table\">";
	 document.getElementById("Ausgabe").innerHTML+="<div class=\"spalte1\">"+i+"</div>";
     document.getElementById("Ausgabe").innerHTML+="<div class=\"spalte\">"+ausgabe(guenstig[i])+"</div>";
	 document.getElementById("Ausgabe").innerHTML+="<div class=\"spalte\">"+ausgabe(guenstig[i]/moeglich)+"</div>";
	 document.getElementById("Ausgabe").innerHTML+="</div>";
   }
  document.getElementById("RES").innerHTML=Erwartungswert;
  document.getElementById("KONTROL").innerHTML=kontrolle;
}
 