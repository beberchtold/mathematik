// Programm zur Simulation Euromillions auf www.mathematik.ch
// AUTHOR and Copyright: Bernhard Berchtold
// Dezember 2004
// Aenderung Mai 11: neu 2 von 11 Sternen (vorher 2 von 9 Sternen)
// 17. Nov 2015 ersetzt nun php-Programm
// März 2019: 2 von 12 Sternen

   var n=1;
   var z1,z2,z3,z4,z5;
   var s1,s2;
   var zahl=new Array(6);

  function ziehung()
    {  var R=new Array(6); 	
    	R[0]= Math.floor(50*Math.random())+1;
        var anzahl=1;
        while (anzahl<5) {
           var gleich=false;
           R[anzahl]= Math.floor(50*Math.random())+1;
           for (var i=0; i<anzahl; i++)
             if (R[anzahl]==R[i]) {gleich=true; break;}
           if (!gleich) anzahl++;
        }
        // Ziehung der zwei Sterne (von 12 Sternen)
        R[5]=0; R[6]=0;
        while (R[5]==R[6]) {
          R[5] = Math.floor(12*Math.random())+1;
          R[6] = Math.floor(12*Math.random())+1;
        }      
        return R;
    }

 function vergleichzahlen(zahl,z1,z2,z3,z4,z5)
 { var a=0;
   for (var i = 0;  i < 5;  i++)
      if (zahl[i]==z1) a++;
   for (i = 0;  i < 5;  i++)
      if (zahl[i]==z2) a++;
   for (i = 0;  i < 5;  i++)
      if (zahl[i]==z3) a++;
   for (i = 0;  i < 5;  i++)
      if (zahl[i]==z4) a++;
   for (i = 0;  i < 5;  i++)
      if (zahl[i]==z5) a++;                       
  return a;	
 }

 function vergleichsterne(zahl,s1,s2)
 { var b=0;
   if (zahl[5]==s1) b++;
   if (zahl[6]==s1) b++;
   if (zahl[5]==s2) b++;
   if (zahl[6]==s2) b++;      
   return b;	
 }

 function gewinn1(a,b)
 { var gewinn_betrag=0;
   if ((a==5) && (b==2)) gewinn_betrag=50000000;      
   if ((a==5) && (b==1)) gewinn_betrag=445000;
   if ((a==5) && (b==0)) gewinn_betrag=75000;
   if ((a==4) && (b==2)) gewinn_betrag=4300;
   if ((a==4) && (b==1)) gewinn_betrag=200;
   if ((a==4) && (b==0)) gewinn_betrag=90;
   if ((a==3) && (b==2)) gewinn_betrag=80;
   if ((a==3) && (b==1)) gewinn_betrag=20;          
   if ((a==2) && (b==2)) gewinn_betrag=15;
   if ((a==3) && (b==0)) gewinn_betrag=12;    
   if ((a==1) && (b==2)) gewinn_betrag=10;
   if ((a==2) && (b==1)) gewinn_betrag=8;
   if ((a==2) && (b==0)) gewinn_betrag=4;
   return gewinn_betrag;	
 }
 
 function ziehe() {
   document.getElementById("txt").innerHTML="<p><b>Resultate der Simulation Euromillions</b></p>";
   n=parseInt(document.getElementById("n").value);
   if (isNaN(n) || n<1) n=1; if (n>1000) n=1000;
   var ok=chkFormular();
   if (!ok) return;   
   document.getElementById("n").value=n;
   document.getElementById("z1").value=z1;
   document.getElementById("z2").value=z2;
   document.getElementById("z3").value=z3;
   document.getElementById("z4").value=z4;
   document.getElementById("z5").value=z5;
   document.getElementById("s1").value=s1;
   document.getElementById("s2").value=s2;
   var einbezahlte_Summe_Euro=n*2;
   var Gewinnsumme=0; 
   var gewinn=false;
   for (var i=1; i<n+1; i++) {  // Ziehung
    zahl = ziehung();
    // Vergleich
    var a = vergleichzahlen(zahl,z1,z2,z3,z4,z5);
    var b = vergleichsterne(zahl,s1,s2);
    if (a==1) var z=" Zahl und "; else var z=" Zahlen und ";
    if (b==1) var s=" Stern richtig"; else var s=" Sterne richtig"; 
    if ( (n>1) &&  ( ((a==1) && (b==2)) || ((a>1) && (b>=0))  || (a>2) ))
        { gewinn=true;
          document.getElementById("txt").innerHTML+="Spiel "+i+": "+a+z+b+s+"<br>";
          Gewinnsumme=Gewinnsumme+gewinn1(a,b);
        }
    if (n==1) {
        document.getElementById("txt").innerHTML+="Die Zufallszahlen des Computers heissen:<br>";
        document.getElementById("txt").innerHTML+=zahl[0]+"&nbsp;&nbsp;&nbsp;&nbsp;";
        document.getElementById("txt").innerHTML+=zahl[1]+"&nbsp;&nbsp;&nbsp;&nbsp;";  
        document.getElementById("txt").innerHTML+=zahl[2]+"&nbsp;&nbsp;&nbsp;&nbsp;";
        document.getElementById("txt").innerHTML+=zahl[3]+"&nbsp;&nbsp;&nbsp;&nbsp;";
        document.getElementById("txt").innerHTML+=zahl[4]+"<br>";
        document.getElementById("txt").innerHTML+="Die gezogenen Sterne sind:  ";
        document.getElementById("txt").innerHTML+=zahl[5]+"&nbsp;&nbsp;&nbsp;&nbsp;";
        document.getElementById("txt").innerHTML+=zahl[6]+"<br><br>";   
        document.getElementById("txt").innerHTML+="<b>Sie haben "+a+z+b+s+"</b><br>"; 
        Gewinnsumme=Gewinnsumme+gewinn1(a,b);    
    }
  }
  if ((n>1) && (!gewinn)) document.getElementById("txt").innerHTML+="Sie haben leider in keinem der "+n+" Spiele etwas gewonnen<br><br>";  
  var bilanz=Gewinnsumme-einbezahlte_Summe_Euro;
  document.getElementById("txt").innerHTML+="<br>Sie haben total <b>"+einbezahlte_Summe_Euro+"</b> Euro eingesetzt<br>";
  document.getElementById("txt").innerHTML+="Sie haben total <b>"+Gewinnsumme+"</b> Euro gewonnen<br>"; 
  if (bilanz>0)
    document.getElementById("txt").innerHTML+="Sie haben insgesamt einen Gewinn von <b>"+bilanz+"</b> Euro erzielt!<br>";
  if (bilanz==0)
    document.getElementById("txt").innerHTML+="Sie haben weder gewonnen noch verloren!<br>";
  if (bilanz<0)
    { bilanz=bilanz*(-1);
      document.getElementById("txt").innerHTML+="Sie haben insgesamt einen Verlust von <b>"+bilanz+"</b> Euro erlitten!<br>";   	
    }
 }
 
 function generatenumbers()
 {
  var R =new Array(4);
  R[0]= Math.floor(50*Math.random())+1;
  anzahl=1;
  while (anzahl<5) {
     gleich=false;
     R[anzahl]= Math.floor(50*Math.random())+1;
     for (i=0; i<anzahl; i++)
        if (R[anzahl]==R[i]) {gleich=true; break;}
     if (!gleich) anzahl++;
   }
 document.getElementById("z1").value=R[0];
 document.getElementById("z2").value=R[1];
 document.getElementById("z3").value=R[2];
 document.getElementById("z4").value=R[3];
 document.getElementById("z5").value=R[4];
 }

 function generatestars()
 { s1=0; s2=0;
 while(s1==s2)
   {s1=Math.floor(12*Math.random())+1;
    s2=Math.floor(12*Math.random())+1;
   }
 document.getElementById("s1").value=s1;
 document.getElementById("s2").value=s2;
 }
 
 function chkFormular()
 {
  if (document.getElementById("z1").value == '') 
     {alert ("Wert für z1 eingeben!");
      return false};
  z1 = parseInt(document.getElementById("z1").value); 
  if  ((z1<1) || (z1>50))
     {alert ("falscher Wert für z1");
      document.getElementById("z1").value = ''; 
      return false};    
   if (document.getElementById("z2").value == '') 
     {alert ("Wert für z2 eingeben!");
      return false};
  z2 = parseInt(document.getElementById("z2").value); 
  if  ((z2<1) || (z2>50) || (z2==z1))
     {alert ("falscher Wert für z2");
      document.getElementById("z2").value = ''; 
      return false}; 
  if (document.getElementById("z3").value == '') 
     {alert ("Wert für z3 eingeben!");
      return false};
  z3 = parseInt(document.getElementById("z3").value); 
  if  ((z3<1) || (z3>50) || (z3==z1) || (z3==z2) )
     {alert ("falscher Wert für z3");
      document.getElementById("z3").value = ''; 
      return false};    
  if (document.getElementById("z4").value == '') 
     {alert ("Wert für z4 eingeben!");
      return false};
  z4 = parseInt(document.getElementById("z4").value); 
  if  ((z4<1) || (z4>50) || (z4==z1) || (z4==z2) || (z4==z3) )
     {alert ("falscher Wert für z4");
      document.getElementById("z4").value = ''; 
      return false};    
  if (document.getElementById("z5").value == '') 
     {alert ("Wert für z5 eingeben!");
      return false};
  z5 = parseInt(document.getElementById("z5").value); 
  if  ((z5<1) || (z5>50) || (z5==z1) || (z5==z2) || (z5==z3) || (z5==z4) )
     {alert ("falscher Wert für z5");
      document.getElementById("z5").value = ''; 
      return false};     
  if (document.getElementById("s1").value == '') 
     {alert ("Wert für s1 eingeben!");
      return false};
  s1 = parseInt(document.getElementById("s1").value); 
  if  ((s1<1) || (s1>12) )
     {alert ("falscher Wert für s1");
      document.getElementById("s1").value = ''; 
      return false};
  if (document.getElementById("s2").value == '') 
     {alert ("Wert für s2 eingeben!");
      return false};
  s2 = parseInt(document.getElementById("s2").value); 
  if  ((s2<1) || (s2>12) || (s2==s1) )
     {alert ("falscher Wert für s2");
      document.getElementById("s2").value = ''; 
      return false};
  return true;	  
 }