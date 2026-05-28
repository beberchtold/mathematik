// Progamm zu Puzzle 20 auf www.mathematik.ch
// copyright Bernhard Berchtold

  var n=3;                    // n x n Board  
  Leer = new Image();
  Leer.src = "leer.jpg";
  Weiss = new Image();
  Weiss.src = "weiss.jpg";
  var Nr = new Array(26); 
  var a = new Array(26);    // a: linkes Feld, b: rechtes Feld (Zielfeld)    
  var b = new Array(26);
  var z;                    // Inhalt von Zwischenspeicher
  var Zugnr;               // Anzahl Züge; bei n*n Zügen wird geprueft
     
  for (i =1 ; i <= 25; i++) {
      Nr[i] = new Image();
      Nr[i].src = i+".jpg"; 
  }
  
  window.onload=function() {Setze_n(3);}        // default 3x3-Feld


function Setze_n(nhilf) {
  var i;      
  for (i =0 ; i <= 25; i++) {
      a[i]  = i;        // leer: 0
      b[i]  = 0;
    }
  n=nhilf; z=0; Zugnr=0; document.getElementById("message").innerHTML ="Viel Erfolg!";
  if (n<5) {a[5]=0;a[10]=0;a[15]=0;a[20]=0;a[21]=0;a[22]=0;a[23]=0;a[24]=0;a[25]=0;b[5]=-1;b[10]=-1;b[15]=-1;b[20]=-1;b[21]=-1;b[22]=-1;b[23]=-1;b[24]=-1;b[25]=-1;}
  if (n<4) {a[4]=0;a[9]=0;a[14]=0;a[16]=0;a[17]=0;a[18]=0;a[19]=0;b[4]=-1;b[9]=-1;b[14]=-1;b[16]=-1;b[17]=-1;b[18]=-1;b[19]=-1;}  	
  for (i =1 ; i <= 25; i++)  Bildwechsel(i,Nr[i]);
  for (i =26 ; i <= 51; i++)  Bildwechsel(i,Leer);
  if (n==3) {
       for (i =4 ; i <= 14; i=i+5) { Bildwechsel(i,Weiss); Bildwechsel(i+1,Weiss); Bildwechsel(i+26,Weiss); Bildwechsel(i+27,Weiss);}
       for (i =16 ; i <= 25; i++) { Bildwechsel(i,Weiss); Bildwechsel(i+26,Weiss);}
    }
  if (n==4) {
       for (i =5 ; i <= 20; i=i+5) { Bildwechsel(i,Weiss); Bildwechsel(i+26,Weiss);}
       for (i =21 ; i <= 25; i++)  { Bildwechsel(i,Weiss); Bildwechsel(i+26,Weiss);}
       
    }
}

function Bildwechsel(Bildnr,Bildobjekt) {
   document.getElementById(Bildnr).src = Bildobjekt.src;
}


function Ziehe(Bildnr) {   //  falls Bildnr nicht leer und Zwischenbild leer: Zug von Bildnr nach Zwischenbild (Nr26) 
  if (n<5) {a[5]=0;a[10]=0;a[15]=0;a[20]=0;a[21]=0;a[22]=0;a[23]=0;a[24]=0;a[25]=0;}
   if (n<4) {a[4]=0;a[9]=0;a[14]=0;a[16]=0;a[17]=0;a[18]=0;a[19]=0;}  
  if (a[Bildnr]>0 && z==0) {
    z=Bildnr;
    Bildwechsel(z,Leer);
    Bildwechsel(26,Nr[z]);
    a[Bildnr]=0;
    }
}

function Zurueck(Bildnr)   //  falls Bildnr leer und Zwischenbild besetzt: Zug von Zwischenbild (Nr26) nach Bildnr
                           //  falls Bildnr nicht leer, so wird Stein zurückspediert
  {
   if (n<5) {b[5]=-1;b[10]=-1;b[15]=-1;b[20]=-1;b[21]=-1;b[22]=-1;b[23]=-1;b[24]=-1;b[25]=-1;}
   if (n<4) {b[4]=-1;b[9]=-1;b[14]=-1;b[16]=-1;b[17]=-1;b[18]=-1;b[19]=-1;}
   if (b[Bildnr-26]==0 && z>0) {   
    if (z<6) b[Bildnr-26]=z;
    if (z>5 && z<11) b[Bildnr-26]=z+95;
    if (z>10 && z<16) b[Bildnr-26]=z+990;
    if (z>15 && z<21) b[Bildnr-26]=z+9985;
    if (z>20 && z<26) b[Bildnr-26]=z+99980;     
    Bildwechsel(26,Leer);
    Bildwechsel(Bildnr,Nr[z]);
    z=0;
    Zugnr++;
    if (Zugnr==n*n) {
      if (pruefe()) document.getElementById("message").innerHTML ="Gratuliere!";
        else document.getElementById("message").innerHTML ="Leider falsch!";
      }
    }
    else if (b[Bildnr-26]>0) {
    Bildwechsel(Bildnr,Leer);
    Hilf=b[Bildnr-26];
    if (Hilf>100000) Hilf=Hilf-99980;
    if (Hilf>10000) Hilf=Hilf-9985;
    if (Hilf>1000) Hilf=Hilf-990;
    if (Hilf>100) Hilf=Hilf-95;           
    Bildwechsel(Hilf,Nr[Hilf]);
    b[Bildnr-26]=0;
    a[Hilf]=Hilf;	
    Zugnr--;	}

}

function pruefe() {
 if (n==3) { 
   zielsumme=1106;   // in Zeile und Kolonne
   if (b[1]+b[2]+b[3] != zielsumme) return false;
   if (b[6]+b[7]+b[8] != zielsumme) return false;
   if (b[11]+b[12]+b[13] != zielsumme) return false;
   if (b[1]+b[6]+b[11] != zielsumme) return false;
   if (b[2]+b[7]+b[12] != zielsumme) return false;
   if (b[3]+b[8]+b[13] != zielsumme) return false;
   return true;         
 }
 if (n==4) {
   zielsumme=11110;
   if (b[1]+b[2]+b[3]+b[4] != zielsumme) return false;
   if (b[6]+b[7]+b[8]+b[9] != zielsumme) return false;
   if (b[11]+b[12]+b[13]+b[14] != zielsumme) return false;
   if (b[16]+b[17]+b[18]+b[19] != zielsumme) return false;   
   if (b[1]+b[6]+b[11]+b[16] != zielsumme) return false;
   if (b[2]+b[7]+b[12]+b[17] != zielsumme) return false;
   if (b[3]+b[8]+b[13]+b[18] != zielsumme) return false;
   if (b[4]+b[9]+b[14]+b[19] != zielsumme) return false;
   return true;         
 }
 if (n==5) {
   zielsumme=111115;
   if (b[1]+b[2]+b[3]+b[4]+b[5] != zielsumme) return false;
   if (b[6]+b[7]+b[8]+b[9]+b[10] != zielsumme) return false;
   if (b[11]+b[12]+b[13]+b[14]+b[15] != zielsumme) return false;
   if (b[16]+b[17]+b[18]+b[19]+b[20] != zielsumme) return false;
   if (b[21]+b[22]+b[23]+b[24]+b[25] != zielsumme) return false;      
   if (b[1]+b[6]+b[11]+b[16]+b[21] != zielsumme) return false;
   if (b[2]+b[7]+b[12]+b[17]+b[22] != zielsumme) return false;
   if (b[3]+b[8]+b[13]+b[18]+b[23] != zielsumme) return false;
   if (b[4]+b[9]+b[14]+b[19]+b[24] != zielsumme) return false;
   if (b[5]+b[10]+b[15]+b[20]+b[25] != zielsumme) return false;   
   return true; 	
 } 	
}