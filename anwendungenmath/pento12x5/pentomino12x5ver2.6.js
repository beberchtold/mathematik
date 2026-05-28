// Programm zu Pentominos auf www.mathematik.ch
// copyright Bernhard Berchtold
// 160 Lösungen für Kreuz an Position 17
// 179 Lösungen für Kreuz an Position 18
// 135 Lösungen für Kreuz an Position 19
// 238 Lösungen für Kreuz an Position 20
// 164 Lösungen für Kreuz an Position 30 (Zeile2)
// 114 Lösungen für Kreuz an Position 31
// 146 Lösungen für Kreuz an Position 32
// 122 Lösungen für Kreuz an Position 33
//  50 Lösungen für Kreuz an Position 34
// Es gibt also insgesamt 1010 nichtkongruente Lösungen (Kreuz in Zeile2 erzeugt wegen Achsensymm doppelte Lösungen)


var W,B;   // Breite W,Höhe B der canvas 
var sw,sh;
var ctx;
var board=new Array(100);   // hier ist pieces[i][0] drin,  also z.B. board[20]=3 (in Feldnr 20 ist Stück 3 von 12)
var saveboard=new Array(60);
var pieceColor = new Array(13);
var pieces = new Array(63);  // wird später zu 2-dim array
var used = new Array();  //  used[i] gibt an, ob Stück # i (von 0 bis 12) bereits auf dem board ist
var startpos;     // Startfeld für Kreuz
var numused;     // Anzahl der im Moment sich auf dem board befindeten Stücke, von 0 to 12
var anzahl;      // Anzahl Lösungen
var endeanzahl;  // Insgesamt Anzahl Lösungen, abhängig von Anfangspos des Kreuzes
var fromstart=true;
var square;   // aktuelles freies Feld
var wahl;     // aktuelle Nummer des Pentomino (1..12), 2=Kreuz wird nicht gebraucht
var success=false;   // true falls ein piece gelegt werden kann
var aktp = new Array(13);       //  aktp[0] wird nicht gebraucht, aktp[3]=12 bedeutet: 3. Stück auf Feld ist Nr 12
var aktsquare = new Array(13); 
var entfernt=false;
const kL="Keine Lösung gefunden!";
const kwL="Keine weitere Lösung gefunden!";
const info="Durch Klick auf ein Pentomino wählen Sie es zur Setzung aus.<br>";
var anzAnf;   // Anzahl am Anfang gesetzte Stücke
var pentoString=new Array(13);
var setused = new Array();  //  setused[i] gibt an, ob Stück # i (von 0 bis 12) vom user gesetzt ist
const setstring=".gif\" alt=\"\" style=\"margin-right:16px;cursor:pointer\" onclick=wahlp(";
var timer;
var first=true;  // einmalig bei run den timer stellen
var abbruch=false;

window.onload=init;

    function init() {
       var canvas1 = document.getElementById("myCanvas");
       ctx = canvas1.getContext("2d");
       W = canvas1.width;
       B = canvas1.height;
       sw = Math.floor(W/12);
	   sh=sw;	   
       for (var i=0; i<100; i++)   // fülle im Prinzip die Randfelder mit -1's
           board[i] = -1;
       for (i=1; i<13; i++)   // fülle die eigentlichen Felder mit Leer (0's)
         for (var j=1; j<6; j++)
             board[j*14+i] = 0;
       MakeColors(); 
       zeichne();     
       for (var i = 0; i < 63; i++) {
          pieces[i] = new Array(5);
        }
        pieces[0]=[2, 13,14,15,28];  // Kreuz, am Anfang setzen;für die 12 Pentominos gibt es 63 Stellungen
        pieces[1]=[1, 1,2,3,4];      // 1 = I         
        pieces[2]=[1, 14,28,42,56];
        pieces[3]=[3, 1,14,27,28];   // 3 = Z   
        pieces[4]=[3, 14,15,16,30];
        pieces[5]=[3, 1,15,29,30];
        pieces[6]=[3, 12,13,14,26];
        pieces[7]=[4, 14,28,29,30];  // 4 = V     
        pieces[8]=[4, 1,2,14,28];
        pieces[9]=[4, 14,26,27,28];
        pieces[10]=[4, 1,2,16,30];
        pieces[11]=[5, 1,2,15,29];   // 5 = T    
        pieces[12]=[5, 12,13,14,28];
        pieces[13]=[5, 14,27,28,29];
        pieces[14]=[5, 14,15,16,28];
        pieces[15]=[6, 14,15,29,30]; // 6 = W
        pieces[16]=[6, 13,14,26,27];
        pieces[17]=[6, 1,15,16,30];
        pieces[18]=[6, 1,13,14,27];
        pieces[19]=[7, 1,2,14,16];   // 7 = U
        pieces[20]=[7, 1,15,28,29];
        pieces[21]=[7, 2,14,15,16];
        pieces[22]=[7, 1,14,28,29];
        pieces[23]=[8, 14,15,16,17];  // 8 = L       
        pieces[24]=[8, 14,28,41,42];
        pieces[25]=[8, 1,2,3,17];
        pieces[26]=[8, 1,14,28,42];
        pieces[27]=[8, 1,15,29,43];        
        pieces[28]=[8, 1,2,3,14];
        pieces[29]=[8, 14,28,42,43];
        pieces[30]=[8, 11,12,13,14];
        pieces[31]=[9, 1,12,13,14];   // 9 = N      
        pieces[32]=[9, 14,15,29,43];
        pieces[33]=[9, 1,2,13,14];
        pieces[34]=[9, 14,28,29,43];
        pieces[35]=[9, 1,15,16,17];        
        pieces[36]=[9, 14,27,28,41];
        pieces[37]=[9, 1,2,16,17];
        pieces[38]=[9, 13,14,27,41];
        pieces[39]=[10, 12,13,14,15];   // 10 = Y      
        pieces[40]=[10, 13,14,28,42];
        pieces[41]=[10, 1,2,3,15];
        pieces[42]=[10, 14,28,29,42];
        pieces[43]=[10, 1,2,3,16];        
        pieces[44]=[10, 14,15,28,42];
        pieces[45]=[10, 13,14,15,16];
        pieces[46]=[10, 14,27,28,42];
        pieces[47]=[11, 13,14,15,29];  // 11 = F
        pieces[48]=[11, 1,13,14,28];
        pieces[49]=[11, 14,15,16,29];
        pieces[50]=[11, 14,15,27,28];
        pieces[51]=[11, 12,13,14,27];        
        pieces[52]=[11, 1,15,16,29];
        pieces[53]=[11, 13,14,15,27];
        pieces[54]=[11, 13,14,28,29];
        pieces[55]=[12, 1,14,15,29];         
        pieces[56]=[12, 1,2,14,15];   // 12 = P
        pieces[57]=[12, 14,15,28,29];
        pieces[58]=[12, 1,13,14,15];
        pieces[59]=[12, 1,14,15,16];        
        pieces[60]=[12, 13,14,27,28];
        pieces[61]=[12, 1,2,15,16];
        pieces[62]=[12, 1,14,15,28];
		
	   pentoString[1] = "<img src=\"2.gif\" alt=\"I\"";
	   pentoString[3] = "<img src=\"5.gif\" alt=\"Z\"";
       pentoString[4] = "<img src=\"7.gif\" alt=\"V\"";
	   pentoString[5] = "<img src=\"11.gif\" alt=\"T\"";
       pentoString[6] = "<img src=\"15.gif\" alt=\"W\"";
	   pentoString[7] = "<img src=\"21.gif\" alt=\"U\"";
       pentoString[8] = "<img src=\"29.gif\" alt=\"L\"";
	   pentoString[9] = "<img src=\"38.gif\" alt=\"N\"";
       pentoString[10] = "<img src=\"40.gif\" alt=\"Y\"";
       pentoString[11] = "<img src=\"48.gif\" alt=\"F\"";
	   pentoString[12] = "<img src=\"62.gif\" alt=\"P\"";
       Start();		
    } 
    	
    function zeichne() {  
        ctx.clearRect(0,0,W,B);
		var w = 12 * sw;
        var h = 5 * sh;
        ctx.beginPath();
        for (var i = 0; i <= 12; i++) {
           ctx.moveTo(1+i*sw,0);
           ctx.lineTo(1+i*sw,h);
        }        
        for (var j = 0; j <= 5; j++) {
           ctx.moveTo(0,j*sh+1);
           ctx.lineTo(w,j*sh);           
        }
        ctx.stroke();        
    }

    function Start() {   
       for (i=1; i<13; i++)   // fülle die eigentlichen Felder mit Leer (0's)
         for (var j=1; j<6; j++) board[j*14+i] = 0;
       for (i=0; i<15; i++)  { aktp[i]=1;  aktsquare[i]=0; }            
       for (i=1; i<=14; i++) used[i] = false;
	   for (i=1; i<=14; i++) setused[i] = false;
	   for (i = 0; i < 60; i++) saveboard[i]=0;
       zeichne();
       showfreeSquare(15);	   
       document.getElementById("label").firstChild.data = "Anzahl Lösungen: 0";
	   document.getElementById("label1").firstChild.data ="";
       startpos = parseInt(document.getElementById("Startpos").value);
	   document.getElementById("Startpos").disabled = false;
	   document.getElementById("goBttn").disabled = false;
	   document.getElementById("wahlp").innerHTML = "";
	   showPentos();  
       switch(startpos)  {
         case 17:
           endeanzahl=160;
           break;
         case 18:
           endeanzahl=179;
           break;
         case 19:
           endeanzahl=135;
           break;
         case 20:
           endeanzahl=238;
           break;
		 case 30:
           endeanzahl=82;
           break;
         case 31:
           endeanzahl=57;
           break;
         case 32:
           endeanzahl=73;
           break;
         case 33:
           endeanzahl=61;
           break;
		 case 34:
           endeanzahl=25;
           break;  
      }
       anzahl=0;
       square = 15;  // erstes freies Feld oben links
       success=false;
       fromstart=true;
       playPiece(0,startpos);   // Kreuz wird an Position startpos gesetzt
	   wahl=2;   // Kreuz ist aktuelles Pentomino
	   anzAnf=1;
       numused=1;
    }

    function wahlPento(nr) {
	   if (used[nr]) return;
	   document.getElementById("label1").firstChild.data="";	   
	   document.getElementById("wahlp").innerHTML = "Klicken Sie auf eine Lage, um das Pentomino zu setzen. Das oberste Feld links wird ins Feld mit dem blauen Quadrat gesetzt.<br>";
	   while (board[square] != 0)  // finde das nächste leere Feld
         square++;
	   showfreeSquare(square);    // mit color blue
	   wahl=nr;
	   switch(wahl)  {
		case 1:
		  for (var i=1;i<3;i++) document.getElementById("wahlp").innerHTML += "<img src=\""+i+setstring+i+")>";
        break;
		case 3:
		  for (var i=3;i<7;i++) document.getElementById("wahlp").innerHTML += "<img src=\""+i+setstring+i+")>";	  
        break;
		case 4:
		  for (var i=7;i<11;i++) document.getElementById("wahlp").innerHTML += "<img src=\""+i+setstring+i+")>";	
        break;		 
		case 5:
		  for (var i=11;i<15;i++) document.getElementById("wahlp").innerHTML += "<img src=\""+i+setstring+i+")>";	
        break;
        case 6:
		  for (var i=15;i<19;i++) document.getElementById("wahlp").innerHTML += "<img src=\""+i+setstring+i+")>";	
        break;
        case 7:
		  for (var i=19;i<23;i++) document.getElementById("wahlp").innerHTML += "<img src=\""+i+setstring+i+")>";	
        break;
        case 8:
		  for (var i=23;i<31;i++) document.getElementById("wahlp").innerHTML += "<img src=\""+i+setstring+i+")>";	
        break;
        case 9:
		  for (var i=31;i<39;i++) document.getElementById("wahlp").innerHTML += "<img src=\""+i+setstring+i+")>";	
        break;
        case 10:
		  for (var i=39;i<47;i++) document.getElementById("wahlp").innerHTML += "<img src=\""+i+setstring+i+")>";	
        break;
        case 11:
		  for (var i=47;i<55;i++) document.getElementById("wahlp").innerHTML += "<img src=\""+i+setstring+i+")>";	
        break;
        case 12:
		  for (var i=55;i<63;i++) document.getElementById("wahlp").innerHTML += "<img src=\""+i+setstring+i+")>";	
        break;		
	   }
	}	

 //  "square" ist Nummer des nächsten leeren Feldes
    function NeueStellung() {
	  if (abbruch) return;
	  if (numused==anzAnf-1) {
		 abbruch=true;  // führt zu ende
         return;		 
	  }
      var p=aktp[numused+1];
      while (p<63 && !success)
           if ((used[pieces[p][0]] == false) && putPiece(p,square))  {
               numused++;
               success=true; aktp[numused]=p; aktsquare[numused]=square;
               used[pieces[p][0]] = true;
               playPiece(p,square);	// Stück p wird gesetzt

               if (numused == 12) {  
               	// puzzle ist gelöst oder wird unterbrochen			                            
                  anzahl++;
                  document.getElementById("label").firstChild.data ="Lösung "+anzahl+" gefunden!";
				  document.getElementById("label1").firstChild.data ="";
		          document.getElementById("Startpos").disabled = false;
				  document.getElementById("goBttn").disabled = false;
				  document.getElementById("wahlp").innerHTML = "";
               }
           }
           else p++; 
    }

    function run() {
		if (numused==12 && success) success=false;
        if (first) {timer = setTimeout(function(){step()},10);}
		  else while ((numused<12)&& (!abbruch)) {step();}
      
      // Abbruch nach allen gefundenen Lösungen
      if (anzahl==endeanzahl) {
    	document.getElementById("label").firstChild.data ="Ende: Anzahl Lösungen: "+endeanzahl;
        document.getElementById("goBttn").disabled  = true;
		document.getElementById("Startpos").disabled = false;
      }
	  if (abbruch)  {
		 load();
		 if (anzahl>0) {
			document.getElementById("label1").firstChild.data =kwL;	
		 }
		   else {document.getElementById("label1").firstChild.data =kL;
                }
         document.getElementById("goBttn").disabled  = true; 
		 document.getElementById("WahlPento").innerHTML="";
	  }
    }

    function step()  {
	  if (abbruch) return;	
      if (numused < 12 && success)  {
       	 success=false;
       	 if (entfernt) {
            entfernt=false;
            aktp[numused+1]=1;
         }
       	 while (board[square] != 0)  // finde das nächste leere Feld
             square++; 
         NeueStellung();      
      } 
      if (!success) {
       	 if (entfernt) {
            aktp[numused+1]=1;
         }
       	 removePiece(aktp[numused],aktsquare[numused]);  // backtrack
         used[pieces[aktp[numused]][0]] = false;
         square=aktsquare[numused];
         aktp[numused]++;
         numused--;
         entfernt=true;
         NeueStellung();
      }
      if (first) {first=false; clearTimeout(timer);run();} 	  
    }

    function doGo() {
	  document.getElementById("goBttn").disabled  = true;
	  document.getElementById("wahlp").innerHTML = "";
	  if (startpos==31 && board[15]==12 && (board[17]==12 || board[43]==12)) {
		document.getElementById("label1").firstChild.data =kL;
		return; 
	  }
	  first=true;  
	  document.getElementById("Startpos").disabled = true;
	  document.getElementById("label1").firstChild.data ="Ich rechne...";
	  document.getElementById("WahlPento").innerHTML="";
      if (abbruch) {abbruch=false;fromstart=true;}
      save();	  
      success=false;
      if (fromstart) {fromstart=false; success=true;}    // erstes Stück wird am Anfang mit Start() gesetzt
      run();
    }

    function wahlp(p) {   // von Klick auf Bild, piece p wird gesetzt
	  if (!used[wahl] && putPiece(p,square)) {
		playPiece(p,square);
	    used[wahl] = true;
		setused[wahl]=true;
	    anzAnf++;
	    numused++;
		document.getElementById("wahlp").innerHTML = "";
		while (board[square] != 0)  // finde das nächste leere Feld
         square++;
	    showfreeSquare(square);
		showPentos();
	  }
    }		
	
    // kann ein Stück plaziert werden?  
    function putPiece(p, square) {                                                
        if (board[square] != 0)   return false;

        for (var i = 1; i <= 4; i ++)
            if (board[square + pieces[p][i]] != 0)  
               return false;
        return true;
    }    

    function showfreeSquare(nr) {
	   var x = ((nr % 14)-1) * sw;
       var y = Math.floor(((nr / 14)-1)) * sh;
       ctx.fillStyle="blue";
       ctx.fillRect(x+5,y+5,10,10);	
	}

    function clearfreeSquare(nr) {
	   var x = ((nr % 14)-1) * sw;
       var y = Math.floor(((nr / 14)-1)) * sh;
       ctx.fillStyle="white";
       ctx.fillRect(x+5,y+5,10,10);	
	}
	
	function putSquare(name, square) {  // "name" ist die Stücknummer
       var x = ((square % 14)-1) * sw;
       var y = Math.floor(((square / 14)-1)) * sh;
       ctx.fillStyle=pieceColor[name];
       ctx.fillRect(x+1, y+1, sw - 1, sh - 1);
       board[square] = name;
    }

    function playPiece(pieceData, startSquare) {
       putSquare(pieces[pieceData][0],startSquare);
       for (var i = 1; i < 5; i++) {
          putSquare(pieces[pieceData][0],startSquare+pieces[pieceData][i]);
	   }
    }

    function clearSquare(square) {
       var x = ((square % 14)-1) * sw;
       var y = Math.floor(((square / 14)-1)) * sh;
       ctx.fillStyle=pieceColor[0];
       ctx.fillRect(x+1, y+1, sw - 1, sh - 1);
       board[square] = 0;
    }
    
    function removePiece(pieceData, startSquare) {
       clearSquare(startSquare);
       for (var i = 1; i < 5; i++)
          clearSquare(startSquare+pieces[pieceData][i]);
    }
     
    function showPentos() {
	   document.getElementById("WahlPento").innerHTML=info;
       for (var i=1; i<13; i++) {
		   if ((i!=2) && (!used[i])) showPento(i);
	   } 	
	}
	
	function showPento(nr) {  // Pento nr wird gezeigt
	   document.getElementById("WahlPento").innerHTML += pentoString[nr]+"style=\"margin-right:16px;cursor:pointer\" onclick=wahlPento("+nr+")>";		
	}

    function save() {   //der aktuellen Lösung
       for (var i = 0; i < 60; i++)
		   saveboard[i]=board[15+i+2*Math.floor(i/12)];
	}

    function load() {   //der aktuellen Lösung
       for (var i = 0; i < 60; i++)
		   putSquare(saveboard[i],15+i+2*Math.floor(i/12));
	}
	
    function MakeColors() {
        pieceColor[0] = "white";
        pieceColor[1] = "#C80000";
        pieceColor[2] = "#9696FF";
        pieceColor[3] = "#00C8C8";
        pieceColor[4] = "#FF96FF";
        pieceColor[5] = "#00C800";
        pieceColor[6] = "#96FFFF";
        pieceColor[7] = "#C8C800";
        pieceColor[8] = "#0000C8";
        pieceColor[9] = "#FF9696";
        pieceColor[10] = "#C800C8";
        pieceColor[11] = "#FFFF96";
        pieceColor[12] = "#96FF96";
    }