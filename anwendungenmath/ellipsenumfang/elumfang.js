// Programm zur Berechnung Ellipsenumfang auf www.mathematik.ch
// AUTHOR and Copyright: Bernhard Berchtold
// 20. Nov 2015 ersetzt nun php-Programm

var a,b;

function berechne_el() {
  var ok=chkFormular();
  if (!ok) return;
  var hilf=(a-b)/(a+b);
  var resultat = (a+b)*Math.PI*(1+3*hilf*hilf/(10+Math.sqrt(4-3*hilf*hilf)));
  document.getElementById("txt").innerHTML="a = "+a+",  ";
  document.getElementById("txt").innerHTML+="b = "+b;
  document.getElementById("txt").innerHTML+="<h4>"+"Umfang &asymp; "+resultat.toPrecision(7)+"</h4>";
}
 
function chkFormular(){
  if (document.getElementById("a").value == '') 
    {alert ("Wert für a eingeben!");
    return false;}
  a = parseFloat(document.getElementById("a").value); 
  if ((a<=0) || (isNaN(a)))
    {alert ("falscher Wert für a");
    document.getElementById("a").value = ''; 
    return false;}
  if (document.getElementById("b").value == '') 
    {alert ("Wert für b eingeben!");
    return false;}
  b = parseFloat(document.getElementById("b").value); 
  if ((b<=0) || (isNaN(b)))
    {alert ("falscher Wert für b");
    document.getElementById("b").value = ''; 
    return false;}
  return true;
}
