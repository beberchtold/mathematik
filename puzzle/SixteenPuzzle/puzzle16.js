// Progamm zu Puzzle 16 auf www.mathematik.ch
// copyright Bernhard Berchtold

  Gold = new Image();
  Gold.src="gold.png";
  Silber = new Image(); 
  Silber.src = "silber.png"; 
  Leer = new Image();
  Leer.src = "leer.png"; 
  var nummer = 0;
  var eingelesen = false;    // true, falls Lösung eingelesen wird
  var a = new Array(80);          
  var Zugnr = new Array(80);
  Loesnr = new Array(80);

window.onload=init;
  
 function init()
 {var i,j;
  for (i = 0; i <= 80; i++)
    a[i] = 5;                        // alle (Rand)felder mit 5 besetzt 
  for (j = 0; j <=2; j++)            // gold:1
    for (i =20 ; i <= 22; i++)
            a[i+9*j]  = 1;
  for (j = 0; j <=2; j++)            // silber:-1
    for (i =40 ; i <= 42; i++)
            a[i+9*j]  = -1;
  a[40]=0;                         // leer: 0
  Zugnummer.innerHTML = 0;
  Antwort.innerHTML = "Viel Erfolg!";
  }


  function Bildwechsel(Bildnr,Bildobjekt)
  {
   document.getElementById(Bildnr).src = Bildobjekt.src;
  }
 
  function Ziehe(Bildnr1,Bildnr2,farbe)   // Zug von 1 nach 2 mit farbe (gold=1, silber=-1)
  { var i;
  if (farbe==1) Bildwechsel(Bildnr2,Gold);
    else Bildwechsel(Bildnr2,Silber);
  Bildwechsel(Bildnr1,Leer);
  nummer++;
  Zugnummer.innerHTML = nummer;
  Zugnr[nummer]=Bildnr1*100+Bildnr2;       // z.B. von 10 nach 9:    1009
  if (Zugnr[nummer]!= Loesnr[nummer] && eingelesen) 
    { Antwort.innerHTML = "Viel Erfolg!";
      for (i = nummer+1; i <= 46; i++)   Zugnr[i]=0;
      eingelesen=false;
    }
  if (nummer == 80) Antwort.innerHTML = "80 Züge!";
  if (erfolg() && !eingelesen)  Antwort.innerHTML = "Gratuliere!";
  if (eingelesen && nummer==46) Antwort.innerHTML = "Ziel erreicht!";
 }
  
  function Bestimmeindex(Bildnr)
  {if (Bildnr<4) return(Bildnr+19);
    if (Bildnr>3 && Bildnr<7) return(Bildnr+25);
    if (Bildnr>6 && Bildnr<12) return(Bildnr+31);
    if (Bildnr>11 && Bildnr<15) return(Bildnr+37);
    if (Bildnr>14 && Bildnr<18) return(Bildnr+43);
  }


  function Pruefe(Bildnr)
  { var i, farbe;
   i=Bestimmeindex(Bildnr);
   if (a[i]!=0 && nummer<80 && !erfolg())                    // ziehen
     { farbe=a[i];
       if  (a[i-1]==0)  { a[i-1]=a[i]; a[i]=0; Ziehe(Bildnr,Bildnr-1,farbe);}
       if  (a[i+1]==0)  { a[i+1]=a[i]; a[i]=0; Ziehe(Bildnr,Bildnr+1,farbe);}
       if  (a[i-9]==0)  { a[i-9]=a[i]; a[i]=0; Ziehe(Bildnr,Bildnr-3,farbe);}
       if  (a[i+9]==0)  { a[i+9]=a[i]; a[i]=0; Ziehe(Bildnr,Bildnr+3,farbe);}
       if  (a[i-2]==0)  { a[i-2]=a[i]; a[i]=0; Ziehe(Bildnr,Bildnr-2,farbe);}
       if  (a[i+2]==0)  { a[i+2]=a[i]; a[i]=0; Ziehe(Bildnr,Bildnr+2,farbe);}
       if  (a[i-18]==0) { a[i-18]=a[i]; a[i]=0; Ziehe(Bildnr,Bildnr-6,farbe);}
       if  (a[i+18]==0) { a[i+18]=a[i]; a[i]=0; Ziehe(Bildnr,Bildnr+6,farbe);}
     }  
  }
  
  function Zugruecknehmen()
  { var i,j, Bildnr1,Bildnr2,farbe;
    if (nummer>0)
     {var Hilf = Zugnr[nummer];
      Bildnr1 = Math.floor(Hilf/100);
      Bildnr2 = Hilf-Bildnr1*100;
      i=Bestimmeindex(Bildnr1); j=Bestimmeindex(Bildnr2); farbe=a[j];
      a[i]=a[j]; a[j]=0;      
      if (farbe==1) Bildwechsel(Bildnr1,Gold);
         else Bildwechsel(Bildnr1,Silber);
      Bildwechsel(Bildnr2,Leer);
      nummer--;
      Zugnummer.innerHTML = nummer;
      if (eingelesen)  Antwort.innerHTML = "Demo!"
        else Antwort.innerHTML = "Viel Erfolg!";
     }             
   } 
 
 function Wiederausfuehren()
  { var i,j, Bildnr1,Bildnr2,farbe; 
    if (Zugnr[nummer+1]>0)
       { var Hilf = Zugnr[nummer+1];
         Bildnr1 =  Math.floor(Hilf/100);
         Bildnr2=Hilf-Bildnr1*100;
         i=Bestimmeindex(Bildnr1); j=Bestimmeindex(Bildnr2); farbe=a[i];
         a[j]=a[i]; a[i]=0;
         Ziehe(Bildnr1,Bildnr2,farbe);
       }          
  }  

function loesung()
{ var i;
  while (nummer>0) Zugruecknehmen();	
  nummer=0;
  Loesnr =[0000,1209,612,306,903,1109,1411,1214,612,406,104,301,903,1109,1711,1417,1214,612,
  906,1009,810,208,302,903,1109,1011,810,708,907,1509,1615,1016,810,508,605,406,704,
  907,1509,1215,1312,1013,810,908,609,1206,912];
  for (i = 1; i <= 46; i++)
     Zugnr[i]=Loesnr[i];
  eingelesen = true;
  Antwort.innerHTML = "Demo!";
  alert("Demozüge eingelesen! \nMit Klicken auf 'Zug vorwärts' können Sie die Partie abspielen");
}  

function erfolg()
{ var i,j;
  for (j = 0; j <=1; j++)
    for (i =20 ; i <= 22; i++)
          if  (a[i+9*j] != -1) return(false);
  if (a[38] !=-1 || a[39] != -1) return(false);
  if (a[41] !=1 || a[42] != 1) return(false);
  for (j = 1; j <=2; j++)          
    for (i =40 ; i <= 42; i++)
          if  (a[i+9*j] != 1) return(false);
  if (a[40] != 0) return (false);
  return(true)
}
