// Programm zu Pentominos auf www.mathematik.ch
// copyright Bernhard Berchtold
// 389 Lösungen für Kreuz an Position 15.
// 342 Lösungen für Kreuz an Position 16.
// 291 Lösungen für Kreuz an Position 17.
// 442 Lösungen für Kreuz an Position 26.
// 262 Lösungen für Kreuz an Position 27.
// 276 Lösungen für Kreuz an Position 28.
// 337 Lösungen für Kreuz an Position 29.
// Es gibt daher also insgesamt 2339 nichtkongruente Lösungen


var W;   // Breite W der canvas 
var B;   // Höhe = B der canvas 
var ctx;
var board=new Array(100);   
var pieceColor = new Array(13);
var pieces = new Array(63);  // wird später zu 2-dim array
var used = new Array();  //  used[i] gibt an, ob Stück # i (von 0 bis 62) bereits auf dem board ist
var startpos;     // Startfeld für Kreuz
var numused;     // Anzahl der im Moment sich auf dem board befindeten Stücke, von 0 to 12
var anzahl;      // Anzahl Lösungen
var endeanzahl;  // Insgesamt Anzahl Lösungen, abhängig von Anfangspos des Kreuzes
var fromstart=true;
var stopped=false;   // falls true, so hält Computer nach jeder Lösung an
var pause=false;
var square;
var success=false;   // true falls ein piece gelegt werden kann
var aktp = new Array(13);       //  aktp[0] wird nicht gebraucht, aktp[3]=12 bedeutet: 3. Stück auf Feld ist Nr 12
var aktsquare = new Array(13); 
var entfernt=false;
var schrittweise=true;
var timer;
var delay=100;
var Weiter=true;

window.onload=init;

    function init() {
       var canvas1 = document.getElementById("myCanvas");
       ctx = canvas1.getContext("2d");
       W = canvas1.width;
       B = canvas1.height;   
       for (var i=0; i<100; i++)   // fülle im Prinzip die Randfelder mit -1's
           board[i] = -1;
       for (i=1; i<11; i++)   // fülle die eigentlichen Felder mit Leer (0's)
         for (var j=1; j<7; j++)
             board[j*12+i] = 0;
       MakeColors(); 
       zeichne();
        
       for (var i = 0; i < 63; i++) {
          pieces[i] = new Array(5);
        }
        pieces[0]=[2, 11,12,13,24];        // Kreuz: Sonderpentomino; am Anfang setzen
        pieces[1]=[1, 1,2,3,4];                // für die 12 Pentominos gibt es 63 mögliche Stellungen
        pieces[2]=[1, 12,24,36,48];
        pieces[3]=[3, 1,12,23,24];        
        pieces[4]=[3, 12,13,14,26];
        pieces[5]=[3, 1,13,25,26];
        pieces[6]=[3, 10,11,12,22];
        pieces[7]=[4, 12,24,25,26];         
        pieces[8]=[4, 1,2,12,24];
        pieces[9]=[4, 12,22,23,24];
        pieces[10]=[4, 1,2,14,26];
        pieces[11]=[5, 1,2,13,25];        
        pieces[12]=[5, 10,11,12,24];
        pieces[13]=[5, 12,23,24,25];
        pieces[14]=[5, 12,13,14,24];
        pieces[15]=[6, 12,13,25,26];
        pieces[16]=[6, 11,12,22,23];
        pieces[17]=[6, 1,13,14,26];
        pieces[18]=[6, 1,11,12,23];
        pieces[19]=[7, 1,2,12,14];        
        pieces[20]=[7, 1,13,24,25];
        pieces[21]=[7, 2,12,13,14];
        pieces[22]=[7, 1,12,24,25];
        pieces[23]=[8, 12,13,14,15];         
        pieces[24]=[8, 12,24,35,36];
        pieces[25]=[8, 1,2,3,15];
        pieces[26]=[8, 1,12,24,36];
        pieces[27]=[8, 1,13,25,37];        
        pieces[28]=[8, 1,2,3,12];
        pieces[29]=[8, 12,24,36,37];
        pieces[30]=[8, 9,10,11,12];
        pieces[31]=[9, 1,10,11,12];        
        pieces[32]=[9, 12,13,25,37];
        pieces[33]=[9, 1,2,11,12];
        pieces[34]=[9, 12,24,25,37];
        pieces[35]=[9, 1,13,14,15];        
        pieces[36]=[9, 12,23,24,35];
        pieces[37]=[9, 1,2,14,15];
        pieces[38]=[9, 11,12,23,35];
        pieces[39]=[10, 10,11,12,13];         
        pieces[40]=[10, 11,12,24,36];
        pieces[41]=[10, 1,2,3,13];
        pieces[42]=[10, 12,24,25,36];
        pieces[43]=[10, 1,2,3,14];        
        pieces[44]=[10, 12,13,24,36];
        pieces[45]=[10, 11,12,13,14];
        pieces[46]=[10, 12,23,24,36];
        pieces[47]=[11, 11,12,13,25];
        pieces[48]=[11, 1,11,12,24];
        pieces[49]=[11, 12,13,14,25];
        pieces[50]=[11, 12,13,23,24];
        pieces[51]=[11, 10,11,12,23];        
        pieces[52]=[11, 1,13,14,25];
        pieces[53]=[11, 11,12,13,23];
        pieces[54]=[11, 11,12,24,25];
        pieces[55]=[12, 1,12,13,25];         
        pieces[56]=[12, 1,2,12,13];
        pieces[57]=[12, 12,13,24,25];
        pieces[58]=[12, 1,11,12,13];
        pieces[59]=[12, 1,12,13,14];        
        pieces[60]=[12, 11,12,23,24];
        pieces[61]=[12, 1,2,13,14];
        pieces[62]=[12, 1,12,13,24];    
    }     	

    function zeichne() {  
        ctx.clearRect(0,0,W,B);
        var sw = Math.floor(W/10);
        var w = 10 * sw;
        var sh = Math.floor(B/6);
        var h = 6 * sh;
        ctx.beginPath();
        for (var i = 0; i <= 10; i++) {
           ctx.moveTo(1+i*sw,0);
           ctx.lineTo(1+i*sw,h);
        }        
        for (var j = 0; j <= 6; j++) {
           ctx.moveTo(0,j*sh+1);
           ctx.lineTo(w,j*sh);           
        }
        ctx.stroke();        
    }


    function Start() {   
       for (i=1; i<11; i++)   // fülle die eigentlichen Felder mit Leer (0's)
         for (var j=1; j<7; j++)
             board[j*12+i] = 0;
       for (i=0; i<13; i++)  { aktp[i]=1;  aktsquare[i]=0; }            
       for (i=1; i<=12; i++)
           used[i] = false;
       zeichne(); 
       document.getElementById("pauseBttn").onclick = function() {
           pause=true;
           document.getElementById("stepBttn").disabled  = false;
           document.getElementById("goBttn").disabled  = false; 
           document.getElementById("startBttn").disabled  = false;       
       }
       document.getElementById("stepBttn").disabled  = false;
       document.getElementById("goBttn").disabled  = false;    
       document.getElementById("label1").firstChild.data ="Klicken Sie auf Step oder Go";
       document.getElementById("label").firstChild.data ="Anzahl Lösungen: 0";
       startpos = eval(document.getElementById("Startpos").value);
       switch(startpos)  {
         case 15:
           endeanzahl=389;
           break;
         case 16:
           endeanzahl=342;
           break;
         case 17:
           endeanzahl=291;
           break;
         case 26:
           endeanzahl=442;
           break;
         case 27:
           endeanzahl=262;
           break;
         case 28:
           endeanzahl=276;
           break;
         case 29:
           endeanzahl=337;
           break;
      }
       anzahl=0;
       square = 13;  // erstes freies Feld oben links
       stopped=false; success=false;
       fromstart=true;
       playPiece(0,startpos);   // Kreuz wird an Position startpos gesetzt
       numused=1;
    }   


    //  "square" is the number of the next empty square to be filled
    function NeueStellung() {
      var p=aktp[numused+1];
      while (p<63 && !success)
           if ((used[pieces[p][0]] == false) && putPiece(p,square))  {
               numused++;
               success=true; aktp[numused]=p; aktsquare[numused]=square;
               used[pieces[p][0]] = true;
               playPiece(p,square);	// Stück p wird gesetzt

               if (numused == 12) {  
               	// puzzle ist gelöst oder wird unterbrochen 
                  document.getElementById("stepBttn").disabled  = false;
                  document.getElementById("goBttn").disabled  = false; 
                  document.getElementById("pauseBttn").disabled  = true;
                  document.getElementById("startBttn").disabled  = false;
                  stopped = true;
                  document.getElementById("label1").firstChild.data ="Klicken Sie auf Step oder Go";                             
                  anzahl++;
                  document.getElementById("label").firstChild.data ="Lösung "+anzahl+" gefunden!";                   
               }
           }
           else p++; 
    }

    function run() {      
      if ((!stopped) && (!pause) && Weiter) {
      	 Weiter=false;
      	 if (numused==12 && success) success=false;      // nach gefundener Lösung: ohne Halt weiter
         timer = setTimeout(function(){step()},delay); 
      }
    
      if (pause) document.getElementById("label1").firstChild.data ="Pause. Für Weiter klicken Sie auf Step oder Go.";
    
      // Abbruch nach 100 gefundenen Lösungen
      if (anzahl==endeanzahl) {
    	document.getElementById("label").firstChild.data ="Ende: Anzahl Lösungen: "+endeanzahl; 
        stopped=true;
        document.getElementById("stepBttn").disabled  = false;
        document.getElementById("goBttn").disabled  = false; 
        document.getElementById("pauseBttn").disabled  = true;
        document.getElementById("startBttn").disabled  = false;
      }  
    }

    function step()  {
      delay = document.getElementById("Delay").value;
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
      if (!schrittweise) {
      	Weiter=true;
        clearTimeout(timer);
        run();
      }  
    }

    function doStep() {
      schrittweise=true;
      if (stopped) {stopped=false; success=false;}
      if (fromstart) {fromstart=false; success=true;}
      step();
    }

    function doGo() {
      document.getElementById("startBttn").disabled  = true;
      document.getElementById("pauseBttn").disabled  = false;
      document.getElementById("stepBttn").disabled  = true;
      document.getElementById("goBttn").disabled  = true;      
      success=false;
      schrittweise=false;
      if (fromstart) {fromstart=false; success=true;}    // erstes Stück wird am Anfang mit Start() gesetzt
      pause=false;
      document.getElementById("label1").firstChild.data ="Ich rechne...";
      stopped=false;
      run();
    }

    // kann ein Stück plaziert werden?  
    function putPiece(p, square) {                                                
        if (board[square] != 0)   return false;

        for (var i = 1; i <= 4; i ++)
            if (board[square + pieces[p][i]] != 0)  
               return false;
        return true;
    }    


    function putSquare(name, square) {  // "name" ist die Stücknummer
       var sw = Math.floor(W/10);
       var sh = Math.floor(B/6);
       var x = ((square % 12)-1) * sw;
       var y = Math.floor(((square / 12)-1)) * sh;
       ctx.fillStyle=pieceColor[name];
       ctx.fillRect(x+1, y+1, sw - 1, sh - 1);
       board[square] = name;
    }

    function playPiece(pieceData, startSquare) {
       putSquare(pieces[pieceData][0],startSquare);
       for (var i = 1; i < 5; i++)
          putSquare(pieces[pieceData][0],startSquare+pieces[pieceData][i]);
    }
    
    function clearSquare(square) {
       var sw = Math.floor(W/10);
       var sh = Math.floor(B/6);
       var x = ((square % 12)-1) * sw;
       var y = Math.floor(((square / 12)-1)) * sh;
       ctx.fillStyle=pieceColor[0];
       ctx.fillRect(x+1, y+1, sw - 1, sh - 1);
       board[square] = 0;
    }
    
    function removePiece(pieceData, startSquare) {
       clearSquare(startSquare);
       for (var i = 1; i < 5; i++)
          clearSquare(startSquare+pieces[pieceData][i]);
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
