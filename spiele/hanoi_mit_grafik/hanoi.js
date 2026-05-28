  // Progamm zu Spiel Türme von Hanoi auf www.mathematik.ch
  // 2002: Ursprüngliches Applet Version 2.0 von Robert Kirkland, www.mazeworks.com
  // 2004: Eventhandling (MouseAdaper, MouseMotionAdapter, ActionListener und AdjustmentListener), Threadbehandlung von B.Berchtold
  // Oktober 2015: Neue Version in html5 und javascript
  // Januar 2020: Stoppuhr hinzugefügt; Scheibe nach 1. Klick auf Pfosten nach oben
  // copyright Bernhard Berchtold

    var W,H;
    var ctx; 
	PEG1=0, PEG2=1, PEG3=2;
	PEGS = 3;
	COLOR_1 = "#663300";
    COLOR_2 = "#996600";
    COLOR_3 = "#cc9933";
    COLOR_4 = "#ffcc00";
    COLOR_5 = "#ffffcc";
	var PEG_SPACE;
	var DISC_HEIGHT;
	var deltaH;
	var discs;
    var sourceDisc, sourcePeg, targetPeg;
	var sourcePeg_gewaehlt=false;
	var moveCount=0;
    var minMoves;
	SIZE=[[68,18],[76,16],[84,14],[92,13],[100,12],[108,12],[112,11],[116,10],[120,9],[124,9]];
    var peg = new Array(10);
    for (var i = 0; i < peg.length; ++i)
      peg[i] = new Array(3);
    var pegTop = new Array();
    var discWidth = new Array();
	var BoardI;
	var solut = new Array (Math.pow(2,10));
    for (var i = 0; i < solut.length; ++i)
      solut[i] = new Array(2);
	var loesungsmodus=false;
	var sum = 0, running = false, started;
	
  window.onload=init;
  
  function init() {
	BoardI=document.getElementById("boardpng");
    canvas1=document.getElementById('myCanvas');
    ctx = canvas1.getContext('2d');
	W = canvas1.width;
	H=Math.round(W/2);
	DISC_HEIGHT=Math.round(H/15);    // erzeugt minimale Höhe 10
	if (DISC_HEIGHT<11) DISC_HEIGHT=11; 
	PEG_SPACE=Math.round(W/6);
	deltaH=Math.round(20*H/225)+1;         // erzeugt minimales deltaH 14	
	canvas1.addEventListener('click', function(evt) {
	  if (loesungsmodus) return;
	  document.getElementById("message2").innerHTML=" ";
	  var W1=canvas1.offsetWidth;
	  var PEG_SPACE1=Math.round(W1/6);
      var mousePos = getMousePos(canvas1, evt);
	  var x=mousePos.x;
	  if (!sourcePeg_gewaehlt) {
	    if (x>10 && x < (W1/2-2*PEG_SPACE1+30)) sourcePeg=0;
		  else if ((x>W1/2 - 30) && (x < W1/2 + 30)) sourcePeg=1;
		    else if ((x>W1/2+2*PEG_SPACE1-30) && (x < W1-10)) sourcePeg=2;
			  else return;
		if (pegTop[sourcePeg]<0) {
		  document.getElementById("message").innerHTML="Turm ist leer!"
		  return;
		}
		var hilf=sourcePeg+1;
		document.getElementById("message").innerHTML="Scheibe von Turm "+hilf;
		sourceDisc = getTopDisc(sourcePeg);
		sourcePeg_gewaehlt=true;
		document.getElementById("solut").disabled=true;
		document.getElementById("Zug+").disabled=true;
		document.getElementById("reset").disabled=true;
		// Scheibe zuoberst auf sourcePeg
		zeichne();
		var width = Math.round(getDiscWidth(sourceDisc)*W1/450);
		var hilfi=(((2*hilf)-1)*PEG_SPACE)-width/2;
        drawDisc( hilfi,19,width);
		if ((document.getElementById("Stoppuhr").checked) && (moveCount==0)) {runstop();}
      }
	  else {
	    if (x>10 && x < (W1/2-2*PEG_SPACE1+30)) targetPeg=0;
		  else if ((x>W1/2 - 30) && (x < W1/2 + 30)) targetPeg=1;
		    else if ((x>W1/2+2*PEG_SPACE1-30) && (x < W1-10)) targetPeg=2;
              else return;			
		sourcePeg_gewaehlt=false;
		document.getElementById("reset").disabled=false;
		document.getElementById("solut").disabled=false;
		var hilf=targetPeg+1;
		document.getElementById("message2").innerHTML="auf Turm "+hilf;
		moveDisc1(sourceDisc,sourcePeg,targetPeg);		
		document.getElementById("Anz").innerHTML=moveCount; 
	    zeichne();
        if (ende()) {
		  if (running) {runstop();}
		  document.getElementById("message2").innerHTML=" ";	
		  if (moveCount==minMoves) document.getElementById("message").innerHTML="Gratuliere! Ziel in minimaler Anzahl Züge erreicht!";
		    else document.getElementById("message").innerHTML="O.K. Die minimale Anzahl Züge zum Ziel wäre "+minMoves;	
		}		
	  }
	}, false);  
    doClear();
  }

  function doClear() {
	moveCount = 0;
	loesungsmodus=false;
	document.getElementById("Anz").innerHTML=0;
	document.getElementById("Zug+").disabled=true;
    discs=document.getElementById("AnzS").value;
	resetUhr();
	document.getElementById("AnzS").value=discs;
	document.getElementById("message2").innerHTML=" ";
	document.getElementById("message").innerHTML="Bewegen Sie alle Scheiben auf den Turm ganz rechts.";
	minMoves = Math.pow(2,discs) - 1;
	Board(discs);
	zeichne();
  } 
  
      // draw discs
    function drawBoard() {
	  // var hilf=	getPegTop(0); alert(hilf);
	  for (var p=PEG1; p<=PEG3; p++) {
         for (var d=0; d<=getPegTop(p); d++) {
            var disc = getDisc(d,p);
            if (disc!=0) {
               var width = Math.round(getDiscWidth(disc)*W/450);
               drawDisc( (((2*p)+1)*PEG_SPACE)-(width/2),
                  H-deltaH-((d+1)*DISC_HEIGHT),width );
            }
         }
      }
	}

   function ende() { 
      return (pegTop[2] == discs - 1);
    }

   function solve(discs,source,aux,target) {
      if (discs==0) return ;                      // base to end recursion
      solve(discs-1,source,target,aux) ;          // recursive call #1
      moveDisc(source,target) ;	  // move disc
	  solut[Anzahl][0]=source; solut[Anzahl][1]=target; Anzahl++;
      solve(discs-1,aux,source,target) ;          // recursive call #2	  
   }            
     
   function Board(i) {
      discs = i;
      for (var j = 0; j < i; j++)
            peg[j][0] = i - j;

      pegTop[0] = i - 1;
      for (var k = 1; k < 3; k++)
            pegTop[k] = -1;

      for (var l = i - 1; l >= 0; l--)
            discWidth[l] = SIZE[i - 3][0] - SIZE[i - 3][1] * (i - 1 - l);
      moveCount = 0;
      minMoves = Math.floor(Math.pow(2, i)) - 1;
    }

  function zeichne () { 
    ctx.clearRect(0,0,W,H);
    ctx.drawImage(BoardI,0,0,W,H);
	drawBoard();
  } 

   // manual move
  function moveDisc1(i,j,k)    //Disc i von peg j nach peg k
    { 
      if (j >= 0 && k >= 0 && j != k && (pegTop[k] < 0 || peg[pegTop[k]][k] > i))
        { setDisc(i, k);
          moveCount++;
          return true;
        } else
        { document.getElementById("message2").innerHTML=" ";  
	      document.getElementById("message").innerHTML="Ungültiger Zug";
          setDisc(i, j);
          return false;
        }
    }

   // AutoSolve move
  function moveDisc(i,j)
    { 
        setDisc(getTopDisc(i), j);
        moveCount++;
    }
 
  function setDisc(i,j)
    {
        peg[++pegTop[j]][j] = i;
    }

  function getDisc(i,j)
    {
        return peg[i][j];
    }

  function getTopDisc(i)
    {
        return peg[pegTop[i]--][i];
    }

  function getPegTop(i)
    {
        return pegTop[i];
    }
 
  function getDiscWidth(i)
    {
        return discWidth[i - 1];
    }

  function isStartPeg(i)
    {
        return i >= 0 && pegTop[i] >= 0;
    }
	

  function drawDisc(i,j,k)
    {   ctx.fillStyle="white";
		ctx.rect(i,j,k,DISC_HEIGHT-2);
		ctx.fill();                           // Stück des Stabes löschen
        ctx.beginPath();
		ctx.strokeStyle=COLOR_3;
		ctx.moveTo(i + 4, j);
        ctx.lineTo(i + k - 4, j);
		ctx.moveTo(i + 2, j + 1);
        ctx.lineTo(i + k - 2, j + 1);
		ctx.stroke();
		ctx.beginPath();
        ctx.rect(i, j + 7, k, 1);
		ctx.stroke();
		ctx.beginPath();
        ctx.strokeStyle=COLOR_4;
		ctx.moveTo(i + 1, j + 2);
        ctx.lineTo(i + k - 1, j + 2);
		ctx.stroke();
		ctx.beginPath();
        ctx.rect(i, j + 5, k, 1);
		ctx.stroke();
		ctx.beginPath();
        ctx.strokeStyle=COLOR_5;
		ctx.moveTo(i + 1, j + 3);
        ctx.lineTo(i + k - 1, j + 3);
		ctx.moveTo(i, j + 4);
        ctx.lineTo(i + k, j + 4);
		ctx.stroke();
		ctx.beginPath();
        ctx.strokeStyle=COLOR_2;
        ctx.rect(i, j + 9, k, 1);
        ctx.stroke();
		ctx.beginPath();		
		ctx.moveTo(i + 1, j + 11);
        ctx.lineTo(i + k - 1, j + 11);
		ctx.stroke();
		if (DISC_HEIGHT>11){
		  ctx.beginPath();
          ctx.strokeStyle=COLOR_1;
		  ctx.moveTo(i + 1, j + 12);
          ctx.lineTo(i + k - 1, j + 12);
		  if (DISC_HEIGHT>12){
		    ctx.moveTo(i + 2, j + 13);
            ctx.lineTo(i + k - 2, j + 13);
		  }
          if (DISC_HEIGHT>13){		  
          ctx.moveTo(i + 4, j + 14);
          ctx.lineTo(i + k - 4, j + 14);
		  }
		  ctx.stroke();
		}		
    }     
	 
  function solution() {
	doClear();
	Anzahl=0;
	solve(discs,0,1,2);
	doClear();
	loesungsmodus=true;
	document.getElementById("Zug+").disabled=false;
	document.getElementById("reset").disabled=false;
	zugplus();
	document.getElementById("message").innerHTML="Lösungsmodus: Klicken Sie auf Zug+";
  }

  function zugplus() {
	if (moveCount<minMoves) {
		 moveDisc(solut[moveCount][0],solut[moveCount][1]);
		 zeichne();
         document.getElementById("Anz").innerHTML=moveCount;
         document.getElementById("Stoppuhr").checked=false;		 
	  }		 
	if (moveCount==minMoves) {
		 document.getElementById("message").innerHTML="Ziel erreicht!";
		 document.getElementById("Zug+").disabled=true;
	  } 
   }

  function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        }
      }

function runstop() {
  if (!running) {
    started = Date.now();
    running = true;
	setInterval();
  } else {
    sum += Date.now() - started;
    running = false;
  }
}

setInterval(function() {
  if (running) {
    tim = Date.now() - started + sum;
    document.getElementById("tracker").innerHTML = (tim / 1000).toFixed(1);
  }
}, 100);

function resetUhr() {
	running = false;
	document.getElementById("Stoppuhr").checked=false;
    sum = 0;
    document.getElementById("tracker").innerHTML = "0.0";
}