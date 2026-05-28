// Progamm zu Puzzle 23 auf www.mathematik.ch
// copyright Bernhard Berchtold

  Gold = new Image();
  Gold.src="hase1.png";
  Silber = new Image(); 
  Silber.src = "hase2.png"; 
  Leer = new Image();
  Leer.src = "leer.png";
  Goldjump_l = new Image();
  Goldjump_r = new Image();  
  Goldjump_l.src="hase1_jump_l.png";
  Goldjump_r.src="hase1_jump_r.png";  
  Silberjump_l = new Image();
  Silberjump_r = new Image();  
  Silberjump_l.src="hase2_jump_l.png";
  Silberjump_r.src="hase2_jump_r.png";  
  var nummer = 0;
  var eingelesen = false;    // true, falls Lösung eingelesen wird
  var a = new Array(9);          
  var Zugnr = new Array(15);
  Loesnr = new Array(15);
  var zaehler=0;
  var wait1,wait2;
  var Bildnummer;  // für Animation
  var j;

window.onload=init;

function init() {
  var i,j;
  a[0]=5; a[8]=5;                       // alle (Rand)felder mit 5 besetzt           
  for (i =1 ; i <= 3; i++)    // gold:1
            a[i]  = 1;            
  for (i =5 ; i <= 7; i++)  // silber:-1
            a[i]  = -1;
  a[4]=0;                         // leer: 0
  Zugnummer.innerHTML = 0;
  Antwort.innerHTML = "Viel Erfolg!";
}

function Bildwechsel(Bildnr,Bildobjekt) {
  var Hilf=Bildnr+7;
  document.getElementById(Hilf).src = Bildobjekt.src;
}

function Ziehe(Bildnr1,Bildnr2,farbe) {  // Zug von 1 nach 2 mit farbe (gold=1, silber=-1)
  var i;
  Bildnummer=Bildnr1;
  Bildwechsel(Bildnr1,Leer);
  if (Math.abs(Bildnr1-Bildnr2)==1) {
    if (farbe==1) Bildwechsel(Bildnr2,Gold);
      else Bildwechsel(Bildnr2,Silber);
    }
  if (Math.abs(Bildnr1-Bildnr2)==2) {
	j=0;
    if (farbe==1)  startup_gold(); 
      else startup_silber(); 
    }
  nummer++;
  Zugnummer.innerHTML = nummer;
  Zugnr[nummer]=Bildnr1*10+Bildnr2;       // z.B. von 7 nach 5:    75
  if (Zugnr[nummer]!= Loesnr[nummer] && eingelesen) {
	Antwort.innerHTML = "Viel Erfolg!";
    for (i = nummer+1; i <= 15; i++)   Zugnr[i]=0;
    eingelesen=false;
  }
  if (erfolg() && !eingelesen)  Antwort.innerHTML = "Gratuliere!";
  if (eingelesen && nummer==15) Antwort.innerHTML = "Ziel erreicht!";
}


function Pruefe(Bildnr) {
  var i, farbe;
  i=Bildnr;
  if (a[i]!=0 && !erfolg()) {                   // ziehen
    farbe=a[i];
    if  ((a[i-1]==0) && (a[i]==-1))  { a[i-1]=a[i]; a[i]=0; Ziehe(Bildnr,Bildnr-1,farbe);}
    if  ((a[i+1]==0) && (a[i]==1))  { a[i+1]=a[i]; a[i]=0; Ziehe(Bildnr,Bildnr+1,farbe);}
    if  ((a[i-2]==0) && (a[i]==-1))  { a[i-2]=a[i]; a[i]=0; Ziehe(Bildnr,Bildnr-2,farbe);}
    if  ((a[i+2]==0) && (a[i]==1))  { a[i+2]=a[i]; a[i]=0; Ziehe(Bildnr,Bildnr+2,farbe);}
  }  
}
  
function Zugruecknehmen() {
	var i,j, Bildnr1,Bildnr2,farbe;
    if (nummer>0) {
	  var Hilf = Zugnr[nummer];
      Bildnr1 = Math.floor(Hilf/10);
      Bildnr2 = Hilf-Bildnr1*10;
      i=Bildnr1; j=Bildnr2; farbe=a[j];
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
 
function Wiederausfuehren() {
	var i,j, Bildnr1,Bildnr2,farbe; 
    if (Zugnr[nummer+1]>0) {
		var Hilf = Zugnr[nummer+1];
        Bildnr1 =  Math.floor(Hilf/10);
        Bildnr2=Hilf-Bildnr1*10;
        i=Bildnr1; j=Bildnr2; farbe=a[i];
        a[j]=a[i]; a[i]=0;
        Ziehe(Bildnr1,Bildnr2,farbe);
    }          
}  


function loesung() {
  var i;
  while (nummer>0) Zugruecknehmen();	
  nummer=0;
  Loesnr =[00,34,53,65,46,24,12,31,53,75,67,46,24,32,53,45];
  for (i = 1; i <= 15; i++)
     Zugnr[i]=Loesnr[i];
  eingelesen = true;
  Antwort.innerHTML = "Demo!";
  alert("Demozüge eingelesen! \nMit Klicken auf 'Zug vorwärts' können Sie die Partie abspielen");
}  

function erfolg() {
  var i,j;
  for (i =1 ; i <= 3; i++)
    if  (a[i] != -1) return(false);    
  for (i =5 ; i <= 7; i++)
    if  (a[i] != 1) return(false);    
  return(true)
}

function startup_gold() {
  if (j == 0) {
    j = 1;
    wait1=setTimeout("startup_gold()",1);
  }
   else {animation_gold();}
}

function animation_gold ()
{
 zaehler++;
 switch(zaehler)
  {case 1:
     Bildwechsel(Bildnummer-7,Goldjump_l);
     Bildwechsel(Bildnummer-6,Goldjump_r);
     break;
   case 2:
     Bildwechsel(Bildnummer-7,Leer);
     Bildwechsel(Bildnummer-6,Leer);
     break;
   case 3:
     Bildwechsel(Bildnummer+2,Gold);
     clearTimeout(wait1);
     clearTimeout(wait2); 
     zaehler=0;
     break;
  }
 if (zaehler>0)
  {if (j > 0)
    { j--; wait2=setTimeout("animation_gold()", 250);} // in ms 
   else { wait1=setTimeout("startup_gold()",1); }
  }
} 

// var j = 0;
function startup_silber () {
  if (j == 0) {
    j = 1;
    wait1=setTimeout("startup_silber()",1);
  }
   else { animation_silber();}
}

function animation_silber () {
  zaehler++;
  switch(zaehler)
  {case 1:
     Bildwechsel(Bildnummer-8,Silberjump_l);
     Bildwechsel(Bildnummer-7,Silberjump_r);
     break;
   case 2:
     Bildwechsel(Bildnummer-8,Leer);
     Bildwechsel(Bildnummer-7,Leer);
     break;
   case 3:
     Bildwechsel(Bildnummer-2,Silber);
     clearTimeout(wait1);
     clearTimeout(wait2); 
     zaehler=0;
     break;
  }
 if (zaehler>0)
  {if (j > 0)
    { j--; wait2=setTimeout("animation_silber()", 250);} // in ms 
   else { wait1=setTimeout("startup_silber()",1); }
  }
}
 