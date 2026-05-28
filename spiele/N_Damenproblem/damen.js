// Progamm zum N_Damenproblem auf www.mathematik.ch
// copyright Bernhard Berchtold

var N=8; var W;  // Brettgrösse NxN, Breite W, Höhe = W;
var canvas;
var ctx;
x1=new Array(12);     // int
var anzahl=0;
var eff_anz=0;
loesung=new Array(1788);   // wird später zu einem 2-dim array
board=new Array(12);   // boolean, wird später zu einem 2-dim array
var ende;
var Weiter;
var LZ;     // letzteZeile
var nostop=true;   // falls true, so hält Compi nicht nach jeder Lösung an
var timer;
var delay=100;  // in Millisekunden für  setTimeout(function(){......},delay)
var geschlagen=false;   // zeigt an, ob letzte Dame geschlagen werden kann
var stop=false;  // falls true, so wird Programm abgebrochen (falls es z.B. für n=12 dem Benutzer zu lange dauert)

window.onload=init;

    function init() {
        canvas = document.getElementById("myCanvas");
		W=canvas.width;
        ctx = canvas.getContext("2d");
        for (var i = 0; i < 12; i++) {
          board[i] = new Array(12);
        }
        for (var i = 0; i < 1788; i++) {
          loesung[i] = new Array(12);
        }
		N=8;
		document.getElementById("Anz").value=N;
		zeichne();
     }
        
    function zeichne() {
        ctx.clearRect(0,0,W,W);
        var l = W / N-1;
        var j1 = l * N;
        ctx.beginPath();
        for(var i = 0; i <= N; i++) {
           ctx.moveTo(1,l*i+1);
           ctx.lineTo(j1+1, l*i+1);
        }
        for(var j = 0; j <= N; j++)  {
           ctx.moveTo(l*j+1,1);
           ctx.lineTo(l*j+1, j1+1);            
        }
        ctx.stroke();
     }

    function set(i,j) {
        var l = W / N-1;
        ctx.beginPath(); 
        ctx.fillStyle="blue";
        ctx.arc((i+0.5)*l, (j+0.5)*l, (l - 20)/2,0,2*Math.PI);
        ctx.fill();            
     }

    function clear(i,j) {
        var l = W / N-1;
        ctx.beginPath();
        ctx.fillStyle="white";
        ctx.fillRect(i*l+2, j*l+2, l-2, l-2);
     }
	 
    function Startn() { // n wurde verändert
		document.getElementById("run_stop").disabled  = true;
		N=document.getElementById("Anz").value;     
        zeichne();
		document.getElementById("label2").firstChild.data ="Klicken Sie auf Start";
		document.getElementById("label").firstChild.data ="0";
        document.getElementById("label1").firstChild.data ="0";
	}		
   
    function Start() {
		stop=true;
		document.getElementById("Anz").disabled  = true;
		document.getElementById("run_stop").disabled  = true;
		N=document.getElementById("Anz").value;
        ende=Math.ceil(N/2);     
        zeichne();
        LZ = 0;                        // Letzte Zeile
        Weiter = true;
        
        for (var x=0;x<12;x++)
        {
            for (var y=0;y<12;y++)
                board[x][y] = false;
        }

        stop=false;
        document.getElementById("run_stop").value = "Stop";
        document.getElementById("run_stop").disabled  = false;
        document.getElementById("run_stop").onclick = function() {
             if (stop) {
             	stop=false;
             	document.getElementById("run_stop").value = "Stop";
             	document.getElementById("label2").firstChild.data ="Zum Anhalten klicken Sie auf Stop";
             	document.getElementById("start").disabled  = true;
				document.getElementById("Anz").disabled  = true;
             	NeueStellung(); 
             	runstep();
             }
             else {
             	document.getElementById("run_stop").value = "Go";
             	stop=true;
				document.getElementById("Anz").disabled  = false;
             }
        }        

        document.getElementById("start").disabled  = true;
        geschlagen=false;
        anzahl = 0;    // Anzahl insgesamt gefundener Loesungen
        eff_anz = 0;   // Anzahl effektiver Loesungen  (ohne Kongruenzabb)
        for(var i = 0; i < N; i++)  { x1[i] = 0; }
       
        document.getElementById("label2").firstChild.data ="Zum Anhalten klicken Sie auf Stop";

        set(0,0);
        document.getElementById("label").firstChild.data ="0";
        document.getElementById("label1").firstChild.data ="0";
        runstep();
     }   


     function step() {
        test();
        if (!geschlagen) {
            if (LZ == (N - 1))
                {   // Eine Loesung gefunden
                    var gefunden=true;
                    anzahl++; 
                    testaufkongruenz();
                    nostop = document.getElementById("ohneHalt").checked;
                    if (nostop) {
                      NeueStellung();                   
                    }
                    else {
                           stop=true;
						   document.getElementById("Anz").disabled  = false;
                           document.getElementById("start").disabled  = false;
                           document.getElementById("run_stop").value = "Go";
                           document.getElementById("label2").firstChild.data ="Für Weiter klicken Sie auf Go";  
                    }
                }
            else { 
              LZ++; x1[LZ] = 0;
              set(0,LZ);          
           }
           if (!gefunden) runstep();
        }
     }

     function test() {
       geschlagen=Dame_geschlagen();
       if (geschlagen)  {
          timer = setTimeout(function(){NeueStellung()},delay);          
       }
     }

     function runstep() {
        if (Weiter) {
            step();
        }
        else {
          document.getElementById("start").disabled  = false;	
          if (!stop) {
          	document.getElementById("label2").firstChild.data ="Fertig! Für Neustart klicken Sie auf Start";
            document.getElementById("run_stop").disabled  = true;
			document.getElementById("Anz").disabled  = false;
            }        
            else {
              document.getElementById("label2").firstChild.data ="Für Weiter klicken Sie auf Go";
            }
        } 
    } 


    function Dame_geschlagen() {   
        for(var Zeile = 0; Zeile < LZ; Zeile++)
        {   // Zwei Damen in der gleichen Spalte ?
            if (x1[Zeile] == x1[LZ]) { 
               return true;
            }
            // Zwei Damen auf der gleichen Diagonalen ?
            if (Math.abs(x1[Zeile] - x1[LZ]) == LZ - Zeile) {
               return true;
            }
        }
        return false;
    }


    function NeueStellung()
    {   
        delay = document.getElementById("Delay").value;
        
        // Dame ein Feld nach rechts verschieben.
        // Falls Brettrand erreicht, letzte Dame verschieben
        
        clear(x1[LZ],LZ);          // alte Dame löschen
        while ( (++x1[LZ] >= N) && (LZ >0) ) {
          LZ--;
          clear(x1[LZ],LZ);          // alte Dame löschen
        }
        set(x1[LZ],LZ);        // neue Dame setzen
        
        // Fertig?
        Weiter = ( ((x1[0] != ende) || (LZ != 0)) && (!stop) );
        geschlagen=false;
        clearTimeout(timer);
        runstep();
    }


    // Nächster Schritt durch Klicken auf button run_stop
     function gostep() {
       document.getElementById("run_stop").disabled  = true;
       document.getElementById("stopbutton").disabled  = false;
       document.getElementById("label2").firstChild.data ="Ich rechne ...";
       NeueStellung();
     }


    function setzeboard() {
       for(var x = 0; x < N; x++)  {
         for(var y = 0; y < N; y++)
           board[x][y] = false;
       }
       for(var k = 0; k < N; k++)
          board[k][x1[k]] = true;
    }


    function testaufkongruenz() {
       setzeboard();
       var gleich = false;    
       for(var zaehler = 0; zaehler < eff_anz; zaehler++) {
         gleich = sameboard(zaehler);
         if (gleich) zaehler=eff_anz;
        }

       if(!gleich)
       {
          for(var k = 0; k < N; k++)
             loesung[eff_anz][k] = x1[k];
          eff_anz++;   
         document.getElementById("label").firstChild.data =""+anzahl + " : neu!";
         document.getElementById("label1").firstChild.data =""+eff_anz;              
       } else
         {
          document.getElementById("label").firstChild.data =""+anzahl+ " : alt!";
          document.getElementById("label1").firstChild.data =""+eff_anz;
         }

   }
       

    function sameboard(i)  {      // gibt boolean zurück
        oboard = new Array(N);
        for (var j = 0; j < N; j++) {
          oboard[j] = new Array(N);
        }
        
        for(var x = 0; x < N; x++)
        {
            for(var y = 0; y < N; y++)
                oboard[x][y] = false;
        }

        for(var x = 0; x < N; x++)
            oboard[x][loesung[i][x]] = true;

        if(testEqualMatrix(oboard))
            return true;
        oboard = rotateMatrix(oboard);
        if(testEqualMatrix(oboard))
            return true;
        oboard = rotateMatrix(oboard);
        if(testEqualMatrix(oboard))
            return true;
        oboard = rotateMatrix(oboard);
        if(testEqualMatrix(oboard))
            return true;
        oboard = mirrorMatrix(oboard);
        if(testEqualMatrix(oboard))
            return true;
        oboard = rotateMatrix(oboard);
        if(testEqualMatrix(oboard))
            return true;
        oboard = rotateMatrix(oboard);
        if(testEqualMatrix(oboard))
            return true;
        oboard = rotateMatrix(oboard);
        return testEqualMatrix(oboard);
    }

    function testEqualMatrix(matrix) {
      for(var x = 0; x < N; x++)
        {
          for(var y = 0; y < N; y++)
                if(board[x][y] != matrix[x][y])
                    return false;
        }
        return true;
    }

    function rotateMatrix(matrix) {
        result = new Array(N);
        for (var i = 0; i < N; i++) {
          result[i] = new Array(N);
        }        
        for(var x = 0; x < N; x++)
        {
            for(var y = 0; y < N; y++)
                result[N - 1 - y][x] = matrix[x][y];
        }
        return result;
    }

    function mirrorMatrix(matrix) {
        result = new Array(N);
        for (var i = 0; i < N; i++) {
          result[i] = new Array(N);
        }         
        for(var x = 0; x < N; x++)
        {
            for(var y = 0; y < N; y++)
                result[y][x] = matrix[x][y];
        }
        return result;
    }
 