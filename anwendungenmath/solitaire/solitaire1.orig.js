// Progamm zu Spiel Solitaire auf www.mathematik.ch
// copyright Bernhard Berchtold

  Hintergrund = new Image();
  Hintergrund.src="feld.gif";
  Normal = new Image();
  Normal.src="feld1.gif";
  Gross = new Image(); 
  Gross.src = "feld2.gif"; 
  Leer = new Image(); 
  Leer.src = "feld0.gif"; 
  var first = true;         // um ersten Spielstein zu entfernen
  var ersterStein=0;
  var nummer=0;
  var Spielerzug=false;         // Spieler führt Zug nicht selber aus und spielt eingelesene Partie ab 
  var Art="Kreuz";
  a = new Array(120);  
  var Zugnr = new Array(50);

window.onload=init;  

 function init()
 {var i,j;
  for (i=0;i<=120;i++)
    a[i]=5;                        // alle (Rand)felder mit 5 besetzt 
  for (j=0;j<=6;j++)
    for (i=24;i<= 30;i++)
      a[i+11*j]=1;
  Kreuz();
  }
 function Bildwechsel(Bildnr,Bildobjekt) {
   document.getElementById(Bildnr).src = Bildobjekt.src;
  }
 function Springen(Bildnr1,Zwischen,Bildnr2)   // Sprung von 1 nach 2 über Zwischen
  {
  Bildwechsel(Bildnr1,Leer);
  Bildwechsel(Bildnr2,Normal);
  Bildwechsel(Zwischen,Leer);
  a[Bildnr1]=0;a[Bildnr2]=1;a[Zwischen]=0;
  nummer++;
  Zugnr[nummer]=Bildnr1*10000+Zwischen*100+Bildnr2;
  if (Spielerzug) Zugnr[nummer+1]=0;
  Spielerzug=false;                              // default wieder herstellen
 }
 function Pruefe(Bildnr)
  {var i;
   var gross = 0;
   for (i=24;i<=96;i++)
          if (a[i]==2) gross = 1;
  if (first && a[Bildnr]==1)
    {Bildwechsel(Bildnr,Leer);
     a[Bildnr] = 0; ersterStein=Bildnr;
     first=false;
    }
  if (a[Bildnr]==2)              // rückgängig: gezogenen Spielstein wieder klein machen
     {a[Bildnr]=1;
      Bildwechsel(Bildnr,Normal);
     }  
  if (a[Bildnr]==1  && gross==0)                    // Spielstein rauszupfen
     {if (a[Bildnr-1]==1 && a[Bildnr-2]==0)
         {a[Bildnr]=2;
          Bildwechsel(Bildnr,Gross) };
       if (a[Bildnr+1]==1 && a[Bildnr+2]==0)
         {a[Bildnr]=2;
          Bildwechsel(Bildnr,Gross) };
       if (a[Bildnr-11]==1 && a[Bildnr-22]==0)
         {a[Bildnr]=2;
          Bildwechsel(Bildnr,Gross) };
       if (a[Bildnr+11]==1 && a[Bildnr+22]==0)
         {a[Bildnr]=2;
          Bildwechsel(Bildnr,Gross) };
     }
  if (a[Bildnr]==0  && gross==1)                    // springen
     {if (a[Bildnr-1]==1 && a[Bildnr-2]==2)
          {Spielerzug=true;
           Springen(Bildnr-2,Bildnr-1,Bildnr) ;}
       if (a[Bildnr+1]==1 && a[Bildnr+2]==2)
          {Spielerzug=true;
           Springen(Bildnr+2,Bildnr+1,Bildnr);}
       if (a[Bildnr-11]==1 && a[Bildnr-22]==2)
          {Spielerzug=true;
           Springen(Bildnr-22,Bildnr-11,Bildnr);}
       if (a[Bildnr+11]==1 && a[Bildnr+22]==2)
          {Spielerzug=true;
           Springen(Bildnr+22,Bildnr+11,Bildnr);}
	  displayuser();
    }  
  }
  function Zugruecknehmen()
  {  if (nummer>0)
     {var Hilf=Zugnr[nummer];
      Bildnr1= Math.floor(Hilf/10000);
      Hilf=Hilf-Bildnr1*10000;
      Zwischen=Math.floor(Hilf/100);
      Bildnr2=Hilf-Zwischen*100;
      Bildwechsel(Bildnr1,Normal);
      Bildwechsel(Bildnr2,Leer);
      Bildwechsel(Zwischen,Normal);
      a[Bildnr1]=1;a[Bildnr2]=0;a[Zwischen]=1;
      nummer--;
	  document.getElementById("info").innerHTML="Klicken Sie auf 'Zug vorwärts', um den nächsten Zug durchzuführen.";
     }             
 } 
 function Wiederausfuehren()
  {if (Zugnr[nummer+1]>0) {
	var Hilf=Zugnr[nummer+1];
    Bildnr1 = Math.floor(Hilf/10000);
    Hilf=Hilf-Bildnr1*10000;
    Zwischen= Math.floor(Hilf/100);
    Bildnr2 = Hilf-Zwischen*100;
    Springen(Bildnr1,Zwischen,Bildnr2); 
  }
  else document.getElementById("info").innerHTML="Ziel erreicht";
 } 
 
 function Kreuz()            // und reset
  {Quadrat();
   Art="Kreuz"
   a[24]=5;a[25]=5;a[29]=5;a[30]=5;a[35]=5;a[36]=5;a[40]=5;a[41]=5;a[79]=5;a[80]=5;a[84]=5;a[85]=5;a[90]=5;a[91]=5;a[95]=5;a[96]=5;
   Bildwechsel(24,Hintergrund);Bildwechsel(25,Hintergrund);Bildwechsel(29,Hintergrund);Bildwechsel(30,Hintergrund);
   Bildwechsel(35,Hintergrund);Bildwechsel(36,Hintergrund);Bildwechsel(40,Hintergrund);Bildwechsel(41,Hintergrund);
   Bildwechsel(79,Hintergrund);Bildwechsel(80,Hintergrund);Bildwechsel(84,Hintergrund);Bildwechsel(85,Hintergrund);
   Bildwechsel(90,Hintergrund);Bildwechsel(91,Hintergrund);Bildwechsel(95,Hintergrund);Bildwechsel(96,Hintergrund);
 }