// Progamm zu Puzzle 39 auf www.mathematik.ch
// copyright Bernhard Berchtold
 
  Tuer = new Image();
  Tuer.src = "door.webp";
  Hund = new Image();
  Hund.src = "puzzle39.png";
  leer = new Image();
  leer.src = "leer.png";
  var wahl;               // Wahl Tuer 1, 2, 3 oder 4
  var gefunden=false;           
  var zufall;
  var sequenz="";
  var anzahl=0;           // Anzahl Versuche


  zufall =  Math.floor(Math.random()*4)+1;    // Hinter dieser Tür ist der Hund zu Beginn   

  function Bildwechsel(Bildnr,Bildobjekt) {
   document.getElementById(Bildnr).src = Bildobjekt.src;
  }

  function AB(a,b) {
    var x;
    x =  Math.random(); 
    if (x<0.5) {return a}
     else {return b};   
  } 

  function Ziehe(wahl) {
   if (gefunden) exit;
   anzahl++;
   Anzahl.innerHTML = anzahl;
   if (wahl==zufall) {
    Bildwechsel(wahl,Hund);   // gefunden
	if (anzahl==1) sequenz=wahl;
	  else sequenz=sequenz+" - "+wahl;
    Antwort.innerHTML = "Gefunden! Sequenz = "+sequenz;
	gefunden=true;
   }	
   else {  
	pause(wahl);   
	if (anzahl==1) sequenz=wahl;
	  else  sequenz=sequenz+" - "+wahl;
	Antwort.innerHTML="Hund ist nicht hinter Tür "+wahl+". Klicken Sie auf eine Tür"+"<br> Sequenz = "+sequenz;
	// Hund wechselt Position
	var hilf;
	if (zufall==1) hilf=2;
	if (zufall==2) hilf=AB(1,3);
	if (zufall==3) hilf=AB(2,4);
	if (zufall==4) hilf=3;
	zufall=hilf;
   }	    
 }

  function neuesSpiel() {
    Bildwechsel(1,Tuer); Bildwechsel(2,Tuer); Bildwechsel(3,Tuer);Bildwechsel(4,Tuer);
	gefunden=false;
    anzahl=0;
	sequenz="";
	Anzahl.innerHTML = anzahl;
    Antwort.innerHTML = "Klicken Sie auf eine Türe";
    zufall =  Math.floor(Math.random()*4)+1; 	
  }
  
  function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
  
  async function pause(wahl) {
	Bildwechsel(wahl,leer);   // nicht gefunden
	await Sleep(700); // Pausiert die Funktion für 700 Millisekunden
	Bildwechsel(wahl,Tuer);   // Tuer wieder geschlossen
}

