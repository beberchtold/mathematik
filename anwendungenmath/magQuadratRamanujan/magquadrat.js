// Programm zur Generierung von magischen Ramanujan Quadraten auf www.mathematik.ch
// AUTHOR and Copyright: Bernhard Berchtold
// Dezember 2022


 var z1,z2,z3,z4;
 
 function setvalues() {
 document.getElementById("z5").value=z4+3;
 document.getElementById("z6").value=z3-3;
 document.getElementById("z7").value=z2-1;
 document.getElementById("z8").value=z1+1;
 document.getElementById("z9").value=z2-2;
 document.getElementById("z10").value=z1+2;
 document.getElementById("z11").value=z4+2;
 document.getElementById("z12").value=z3-2;
 document.getElementById("z13").value=z3-1;
 document.getElementById("z14").value=z4+1;
 document.getElementById("z15").value=z1-1;
 document.getElementById("z16").value=z2+1;
 }


 function chkFormular() {
  if (document.getElementById("z1").value == '') 
     {alert ("Wert für z1 eingeben!");
      return false};
  z1 = parseInt(document.getElementById("z1").value); 
  if  ((z1<1) || (z1>99))
     {alert ("falscher Wert für z1");
      document.getElementById("z1").value = ''; 
      return false};    
   if (document.getElementById("z2").value == '') 
     {alert ("Wert für z2 eingeben!");
      return false};
  z2 = parseInt(document.getElementById("z2").value); 
  if  ((z2<1) || (z2>99))
     {alert ("falscher Wert für z2");
      document.getElementById("z2").value = ''; 
      return false}; 
  if (document.getElementById("z3").value == '') 
     {alert ("Wert für z3 eingeben!");
      return false};
  z3 = parseInt(document.getElementById("z3").value); 
  if  ((z3<1) || (z3>99))
     {alert ("falscher Wert für z3");
      document.getElementById("z3").value = ''; 
      return false};    
  if (document.getElementById("z4").value == '') 
     {alert ("Wert für z4 eingeben!");
      return false};
  z4 = parseInt(document.getElementById("z4").value); 
  if  ((z4<1) || (z4>99))
     {alert ("falscher Wert für z4");
      document.getElementById("z4").value = ''; 
      return false};
	  document.getElementById("txt").innerHTML=z1+z2+z3+z4;
  setvalues();	  
 }
 
 function change() {
   var Hilf=parseInt(document.getElementById("z5").value)-2;
   document.getElementById("z5").value=Hilf;
   Hilf=parseInt(document.getElementById("z6").value)+2;
   document.getElementById("z6").value=Hilf;
   Hilf=parseInt(document.getElementById("z7").value)-2;
   document.getElementById("z7").value=Hilf;
   Hilf=parseInt(document.getElementById("z8").value)+2;
   document.getElementById("z8").value=Hilf;
   Hilf=parseInt(document.getElementById("z13").value)+2;
   document.getElementById("z13").value=Hilf;
   Hilf=parseInt(document.getElementById("z14").value)-2;
   document.getElementById("z14").value=Hilf;
   Hilf=parseInt(document.getElementById("z15").value)+2;
   document.getElementById("z15").value=Hilf;
   Hilf=parseInt(document.getElementById("z16").value)-2;
   document.getElementById("z16").value=Hilf;	 
 }
 
 function clearall() {
  for (var i = 1;  i < 17;  i++)
    document.getElementById("z"+i).value="";
  document.getElementById("txt").innerHTML="";
  }