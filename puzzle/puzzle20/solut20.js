// Progamm zu Puzzle 20 auf www.mathematik.ch
// copyright Bernhard Berchtold

  var n=3;                    // n x n Board  
  var Nr = new Array(26);    
  var b = [0,1,10,14,18,22,23,2,6,15,19,20,24,3,7,11,12,16,25,4,8,9,13,17,21,5];
  var z;                    // Inhalt von Zwischenspeicher
     
  for (i=1;i<=25;i++) {
      Nr[i] = new Image();
      Nr[i].src = i+".jpg"; 
  } 

function Bildwechsel(Bildnr,Bildobjekt) {
   document.getElementById(Bildnr).src = Bildobjekt.src;
}

function Zeile(u,v) {  // vertauscht Zeile u mit Zeile v
  if (u==v) return;
  for (i=1;i<6;i++) {
	var z1=i+5*(u-1); var z2=i+5*(v-1);
	Bildwechsel(26,Nr[b[z1]]);
	Bildwechsel(26+z1,Nr[b[z2]]);
	Bildwechsel(26+z2,Nr[b[z1]]);
	z=b[z1];b[z1]=b[z2];b[z2]=z;
  }
}

function Spalte(u,v) {  // vertauscht Kolonne u mit Zeile v
  var c = new Array(26);
  if (u==v) return;
  for (i=1;i<26;i=i+5) {
	var z1=i+(u-1); var z2=i+(v-1);
	Bildwechsel(26,Nr[b[z1]]);
	Bildwechsel(26+z1,Nr[b[z2]]);
	Bildwechsel(26+z2,Nr[b[z1]]);
	z=b[z1];b[z1]=b[z2];b[z2]=z;
  }  
}