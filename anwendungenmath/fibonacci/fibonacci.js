 // Programm zur Fibonacci- und Lucaszahlen auf www.mathematik.ch
// AUTHOR and Copyright: Bernhard Berchtold
// 20. Nov 2015 ersetzt nun php-Programm

 var Zahl1,Zahl2,anz;
 var Zahl1exp,Zahl2exp,n;
 
 function rekursiv() {
  var ok=chkFormular();
  if (!ok) return;	 
  var zahl=new Array(); 
  zahl[0]=Zahl1; zahl[1]=Zahl2;
  for (var i=0;i<anz;i++)
     zahl[i+2] = zahl[i] + zahl[i+1]; 
  document.getElementById("txt").innerHTML="<b>Resultat</b><br>";
  for (i=3;i<=anz+2;i++) {
	if (zahl[i-1]>1E14 || zahl[i-1]<-1E14) zahl[i-1]=zahl[i-1].toPrecision(14);
	document.getElementById("txt").innerHTML+="Zahl "+i+" = "+zahl[i-1]+"<br>"; 
  }   
 }
 
 function calc(n) {
  var b1=(1+Math.sqrt(5))/2; var b2=(1-Math.sqrt(5))/2;
  return 1/Math.sqrt(5)*(Math.pow(b1,n) - Math.pow(b2,n));
 }
 
 function explizit() {
  var ok=chkFormular1();
  if (!ok) return;
  var resultat = Zahl1exp*calc(n-2)+Zahl2exp*calc(n-1);
  if (resultat>1E14 || resultat<-1E14) resultat=resultat.toPrecision(14);
  else resultat=Math.round(resultat);
  document.getElementById("txt1").innerHTML="<b>Resultat</b><br><br>";
  document.getElementById("txt1").innerHTML+="Die "+n+"-te Zahl ist <b>"+resultat+"</b>";
 }

 function chkFormular() {
  if (document.getElementById("Zahl1").value == '') 
    {alert ("Wert für Zahl1 eingeben!");
    return false;}
  Zahl1 = parseInt(document.getElementById("Zahl1").value); 
  if (isNaN(Zahl1))
    {alert ("Falscher Wert für Zahl1");
    document.getElementById("Zahl1").value = ''; 
    return false;}
  if (document.getElementById("Zahl2").value == '') 
    {alert ("Wert für Zahl2 eingeben!");
    return false;}
  Zahl2 = parseInt(document.getElementById("Zahl2").value); 
  if (isNaN(Zahl2))
    {alert ("Falscher Wert für Zahl2");
    document.getElementById("Zahl2").value = ''; 
    return false;}
  if (document.getElementById("anz").value == '') 
    {alert ("Wert für Anzahl Zahlen eingeben!");
    return false;}
  anz = parseInt(document.getElementById("anz").value);
  if ( (isNaN(anz)) || (anz<1) || (anz>100))
     {alert ("Anzahl ist von 1 bis 100");
      document.getElementById("anz").value = '';
      return false;}
   return true;
 }
 
  function chkFormular1() {
    if (document.getElementById("Zahl1exp").value == '') 
      {alert ("Wert für Zahl1 eingeben!");
    return false;}
    Zahl1exp = parseInt(document.getElementById("Zahl1exp").value); 
    if (isNaN(Zahl1exp))
      {alert ("Falscher Wert für Zahl1");
       document.getElementById("Zahl1exp").value = ''; 
       return false;}
    if (document.getElementById("Zahl2exp").value == '') 
      {alert ("Wert für Zahl2 eingeben!");
       return false;}
    Zahl2exp = parseInt(document.getElementById("Zahl2exp").value); 
    if (isNaN(Zahl2exp))
      {alert ("Falscher Wert für Zahl2");
       document.getElementById("Zahl2exp").value = ''; 
       return false;}
    if (document.getElementById("n").value == '') 
      {alert ("Wert für n eingeben!");
       return false;}
    n = parseInt(document.getElementById("n").value);
    if ( (isNaN(n)) || (n<3) || (n>1421))
      {alert ("n von 3 bis 1421");
       document.getElementById("n").value = '';
       return false;}
	return true;  
 }