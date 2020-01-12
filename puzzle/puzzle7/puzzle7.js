// Progamm zu Puzzle 7 auf www.mathematik.ch
// copyright Bernhard Berchtold
 
  Tuer = new Image();
  Tuer.src = "door.gif";
  Auto = new Image();
  Auto.src = "car.gif";
  Ziege = new Image();
  Ziege.src = "ziege.gif";
  var wahl;               // Wahl Tuer 1, 2 oder 3 (bei erster oder zweiter Wahl)
  var ersteWahl=0;           // bei erster Wahl Tür 1, 2 oder 3
  var zufall;
  var p,q;
  var umwahl, moderator;
  var anzahl=0;           // Gesamtanzahl Spiele
  var gewonnen=0;         // davon gewonnen
  var mitUmwahlGewonnen=0;   // davon mit Umwahl gewonnen
  var VerbotKlick=false;
  var zufallspiel=false;


  zufall =  Math.floor(Math.random()*3)+1;    // Hinter dieser Tür ist das Auto   

  function Bildwechsel(Bildnr,Bildobjekt)
  {
   document.getElementById(Bildnr).src = Bildobjekt.src;
  }


  function AB(a,b) {
    var x;
    x =  Math.random(); 
    if (x<0.5) {p=a;q=b;}
     else {p=b;q=a;}    
  } 


  function Ziehe(wahl) {
   if (VerbotKlick) exit;
   if (ersteWahl>0 && wahl==moderator) exit;
   if (ersteWahl>0 && wahl==zufall) {
    Bildwechsel(wahl,Auto);   // gewonnen
    Antwort.innerHTML = "Gewonnen!<br> Neues Spiel oder 100 Zufallspiele?";
    anzahl++; Anzahl.innerHTML = anzahl;
    gewonnen++; Gewonnen.innerHTML = gewonnen;
    Umwahl.innerHTML = mitUmwahlGewonnen;
    VerbotKlick=true;
   }	
   if (ersteWahl>0 && wahl!=zufall) {
    Bildwechsel(wahl,Ziege);   // verloren
    Antwort.innerHTML = "Verloren!<br> Neues Spiel oder 100 Zufallspiele?";
    anzahl++; Anzahl.innerHTML = anzahl;
    Umwahl.innerHTML = mitUmwahlGewonnen;
    VerbotKlick=true;	
   }	
   if (ersteWahl==0) {
    ersteWahl=wahl;
    if (wahl==1) {      
      if (zufall==1) {
      	AB(2,3); moderator=p; umwahl=q;}
      if (zufall==2) {
      	moderator=3; umwahl=2; mitUmwahlGewonnen++;}
      if (zufall==3) {
      	moderator=2; umwahl=3; mitUmwahlGewonnen++;}          
    }          
    if (wahl==2) {      
      if (zufall==1) {
      	moderator=3; umwahl=1; mitUmwahlGewonnen++;}
      if (zufall==2) {
      	AB(1,3); moderator=p; umwahl=q;}
      if (zufall==3) {
      	moderator=1; umwahl=3; mitUmwahlGewonnen++;}   
    }       
    if (wahl==3) {      
      if (zufall==1) {
      	moderator=2; umwahl=1; mitUmwahlGewonnen++;}
      if (zufall==2) {
      	moderator=1; umwahl=2; mitUmwahlGewonnen++;}
      if (zufall==3) {
      	AB(1,2); moderator=p; umwahl=q;}
      
    }    	
    if (!zufallspiel) {
    	Bildwechsel(moderator,Ziege);
        Antwort.innerHTML = "Bestätigen oder Umwählen";
    }    
   }
 }

  function neuesSpiel() {
    Bildwechsel(1,Tuer); Bildwechsel(2,Tuer); Bildwechsel(3,Tuer);
    ersteWahl=0;
    if (zufallspiel) {
       zufallspiel=false; anzahl=0; gewonnen=0; mitUmwahlGewonnen=0;
       Anzahl.innerHTML = 0; Gewonnen.innerHTML = 0; Umwahl.innerHTML = 0;       
    }
    VerbotKlick=false;
    Antwort.innerHTML = "Klicken Sie auf eine Türe";
    zufall =  Math.floor(Math.random()*3)+1; 	
  }

  function Zufallspiel() {
    zufallspiel=true;
    Bildwechsel(1,Tuer); Bildwechsel(2,Tuer); Bildwechsel(3,Tuer);
    anzahl=0; gewonnen=0; mitUmwahlGewonnen=0; ohneUmwahlGewonnen=0;
    VerbotKlick=false;
    for (i=1;i<101;i++)
      {
        ersteWahl=0;
        zufall =  Math.floor(Math.random()*3)+1;              // erzeugt Wert von zufall                                                   
        wahl = Math.floor(2*Math.random())+1;                 // 1. Wahl
        Ziehe(wahl);
        wahl = moderator;
        while (wahl == moderator) {             // 2. Wahl
          wahl = Math.floor(2*Math.random())+1;
        }                          
        if (wahl==zufall) gewonnen++;
      }
    VerbotKlick=true;
    Anzahl.innerHTML = 100;
    Gewonnen.innerHTML = gewonnen;
    Umwahl.innerHTML = mitUmwahlGewonnen;
    Antwort.innerHTML = "Neues Spiel oder 100 Zufallspiele?";
  }