// Programm zur Generierung von magischen Ramanujan Quadraten auf www.mathematik.ch
// AUTHOR and Copyright: Bernhard Berchtold
// Dezember 2022

 var z1,z2,z3,z4;
 const gruen="#00FF00";
 const gelb="#FFFF00";
 const blau="#00FFFF";
 const vio="#FF68FF";
 const weiss="#FFFFFF";
 
 function setvalues() {
   document.getElementById("txt").innerHTML=z1+z2+z3+z4;
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
   const fehler="Zahl zwischen 1 und 99";
   z1 = parseInt(document.getElementById("z1").value);
   if  ((z1<1) || (z1>99) || isNaN(z1))
     {alert (fehler);
      document.getElementById("z1").value = '';
      document.getElementById("z1").focus();	  
      return false};
   document.getElementById("z1").value=z1;
   z2 = parseInt(document.getElementById("z2").value); 
   if  ((z2<1) || (z2>99) || isNaN(z2))
     {alert (fehler);
      document.getElementById("z2").value = '';
      document.getElementById("z2").focus();	  
      return false};
   document.getElementById("z2").value=z2;
   z3 = parseInt(document.getElementById("z3").value); 
   if  ((z3<1) || (z3>99) || isNaN(z3))
     {alert (fehler);
      document.getElementById("z3").value = '';
      document.getElementById("z3").focus();	  
      return false};
   document.getElementById("z3").value=z3;
   z4 = parseInt(document.getElementById("z4").value); 
   if  ((z4<1) || (z4>99) || isNaN(z4))
     {alert (fehler);
      document.getElementById("z4").value = '';
      document.getElementById("z4").focus();	  
      return false};
  document.getElementById("z4").value=z4;
  setvalues();	  
 }
 
 function generate() {
  // erzeuge 4 Zufallszahlen >3 und <100
  if (document.getElementById("z1").value!='' && document.getElementById("z2").value!='' && document.getElementById("z3").value!='' && document.getElementById("z4").value!='' && document.getElementById("z5").value=='')
    {chkFormular();  // Benutzer meinte wohl 'Rechne'
	return}
  z1=Math.floor(95*Math.random())+4;
  document.getElementById("z1").value=z1;
  do 
	z2=Math.floor(95*Math.random())+4;	
  while (Math.abs(z1-z2)<5);
  document.getElementById("z2").value=z2;
  do
    z3=Math.floor(95*Math.random())+4;
  while (Math.abs(z1-z3)<5 || Math.abs(z2-z3)<5);
  document.getElementById("z3").value=z3;
  do
    z4=Math.floor(95*Math.random())+4;
  while (Math.abs(z1-z4)<5 || Math.abs(z2-z4)<5 || Math.abs(z3-z4)<7);	
  document.getElementById("z4").value=z4;
  horiz();
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
 
 function horiz() {
   for (var i = 1;  i < 5;  i++)
	 document.getElementById("z"+i).style.backgroundColor=gruen;
   for (var i = 5;  i < 9;  i++)
	 document.getElementById("z"+i).style.backgroundColor=gelb;
   for (var i = 9;  i < 13;  i++)
	 document.getElementById("z"+i).style.backgroundColor=blau;
   for (var i = 13;  i < 17;  i++)
	 document.getElementById("z"+i).style.backgroundColor=vio;
 }

 function vertik() {
   for (var i = 1;  i < 14;  i+=4)
	 document.getElementById("z"+i).style.backgroundColor=gruen;
   for (var i = 2;  i < 15;  i+=4)
	 document.getElementById("z"+i).style.backgroundColor=gelb;
   for (var i = 3;  i < 16;  i+=4)
	 document.getElementById("z"+i).style.backgroundColor=blau;
   for (var i = 4;  i < 17;  i+=4)
	 document.getElementById("z"+i).style.backgroundColor=vio;
 } 

 function diag() {
   for (var i = 1;  i < 17;  i+=5)
	 document.getElementById("z"+i).style.backgroundColor=gruen;
   for (var i = 13;  i > 3;  i-=3)
	 document.getElementById("z"+i).style.backgroundColor=gelb;
   document.getElementById("z2").style.backgroundColor=blau;
   document.getElementById("z5").style.backgroundColor=blau;
   document.getElementById("z12").style.backgroundColor=blau;
   document.getElementById("z15").style.backgroundColor=blau;
   document.getElementById("z3").style.backgroundColor=vio;
   document.getElementById("z8").style.backgroundColor=vio;
   document.getElementById("z9").style.backgroundColor=vio;
   document.getElementById("z14").style.backgroundColor=vio;
 } 

 function eck() {
   for (var i = 1;  i < 7;  i++) {
	 document.getElementById("z"+i).style.backgroundColor=gruen;
	 if (i==2) i=4;
   }
   for (var i = 3;  i < 9;  i++) {
	 document.getElementById("z"+i).style.backgroundColor=gelb;
	 if (i==4) i=6;
   }
   for (var i = 9;  i < 15;  i++) {
	 document.getElementById("z"+i).style.backgroundColor=blau;
	 if (i==10) i=12;
   }
   for (var i = 11;  i < 17;  i++) {
	 document.getElementById("z"+i).style.backgroundColor=vio;
	 if (i==12) i=14;
   }
 }

 function mitte() {
   for (var i = 1;  i < 17;  i+=3) {
	 document.getElementById("z"+i).style.backgroundColor=gruen;
	 if (i==4) i=10;
   }
   for (var i = 6;  i < 12;  i++) {
	 document.getElementById("z"+i).style.backgroundColor=gelb;
	 if (i==7) i=9;
   }
   for (var i = 2;  i < 16;  i++) {
	 document.getElementById("z"+i).style.backgroundColor=blau;
	 if (i==3) i=13;
   }
   for (var i = 5;  i < 13;  i+=3) {
	 document.getElementById("z"+i).style.backgroundColor=vio;
	 if (i==8) i=6;
   }
 }

 function lire() {
   for (var i = 1;  i < 15;  i++) {
	 document.getElementById("z"+i).style.backgroundColor=gruen;
	 if (i==2) i=12;
   }
   for (var i = 5;  i < 11;  i++) {
	 document.getElementById("z"+i).style.backgroundColor=gelb;
	 if (i==6) i=8;
   }
   for (var i = 7;  i < 13;  i++) {
	 document.getElementById("z"+i).style.backgroundColor=blau;
	 if (i==8) i=10;
   }
   for (var i = 3;  i < 17;  i++) {
	 document.getElementById("z"+i).style.backgroundColor=vio;
	 if (i==4) i=14;
   }
 }

 function entfaerbe() {
   for (var i = 1;  i < 17;  i++)
	 document.getElementById("z"+i).style.backgroundColor=weiss;	
 }
 
 function clearall() {
  document.getElementById("z1").style.backgroundColor=gruen;
  document.getElementById("z2").style.backgroundColor=gelb;
  document.getElementById("z3").style.backgroundColor=blau;
  document.getElementById("z4").style.backgroundColor=blau;
  for (var i = 5;  i < 17;  i++)
	document.getElementById("z"+i).style.backgroundColor=weiss;
  for (var i = 1;  i < 17;  i++)  
    document.getElementById("z"+i).value="";
  document.getElementById("txt").innerHTML="";
  }