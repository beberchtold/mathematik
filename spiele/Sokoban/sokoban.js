  // Progamm zu Spiel Sokoban auf www.mathematik.ch
  // 1998: Ursprüngliches Applet (noch ohne Speichern und Laden des Zwischenstandes und ohne Lösungen) von R.Grothmann
  // 2003: Applet von B.Berchtold mit Speichern und Laden des Zwischenstandes und Lösungen (Lösungen von H.Kühnert)
  // Oktober 2015: Java-Applet Version vom April 2004 umgeschrieben in html5 und javascript
  // copyright Bernhard Berchtold

    var W,H;
    var ctx;
    n=16; m=19;
    EMPTY=0; WALL=1; BLOCK=2; TARGET=4; PUSHER=8; FLOOR=16;
    var W1;
	var PushI; var PushJ;
    var A = new Array(n); // fields  2-dim
	for (var i = 0; i < A.length; ++i) {
        A[i] = new Array(m);
      }
    var B = new Array(n); // für save()
	for (var i = 0; i < B.length; ++i) {
        B[i] = new Array(m);
      }
	var PushIb; var PushJb;
	var N=1; // level number
    var Level = new Array(50);    // Level[0] bleibt leer
    var Sol="";
    var nr=0;      // für zugplus nr
	var IWall = new Image();
    IWall.src = "iwall.gif";
	var IBlock = new Image();
    IBlock.src = "iblock.gif";
	var IFloor = new Image();
    IFloor.src = "ifloor.gif";
	var PA = new Array(3);
	PA[0]=new Image();
	PA[0].src = "ipusher.gif";    //links
	PA[1]= new Image();
	PA[1].src = "ipusher1.gif";   //unten
	PA[2]= new Image(); 
	PA[2].src = "ipusher2.gif";   //rechts
	PA[3]= new Image();
	PA[3].src = "ipusher3.gif";	  //oben
	var IPusher = PA[3];
	var ITarget = new Image();
    ITarget.src = "itarget.gif";

window.onload=init;
  
  function init() {
    canvas1=document.getElementById('myCanvas');
    ctx = canvas1.getContext('2d');
	W = canvas1.width;
	W1=Math.floor(W/m);
	H=n*W1;
	canvas1.height=H;
    doClear();
  } 

  function doClear() {
    nr=0;
    Sol="";
    document.getElementById("Zug+").disabled=true;	
    document.getElementById("Load").disabled=true;	
	readlevel(N);
  } 
  
  function moveb(ch) {
	 document.getElementById("Zug+").disabled=true;
     move(ch);	 
  }

  function levelplus() {
	if (N<50) {N=N+1; doClear();} 
  }

  function levelminus() {
	if (N>1) {N=N-1; doClear();}  
  }

  function save() {
    PushIb=PushI; PushJb=PushJ;
	var i,j;	
    for (i=0;i<n;i++)
      for (j=0;j<m;j++)  B[i][j]=A[i][j];
    document.getElementById("Load").disabled=false;	  
  }

  function doLoad() {
    PushI=PushIb; PushJ=PushJb;
	var i,j;
    for (i=0;i<n;i++)
      for (j=0;j<m;j++)  A[i][j]=B[i][j];
    zeichne();  
  }

  function moveby (di,dj)
  { setPusher(di,dj);
    var i=PushI+di,j=PushJ+dj;
    if (i<0 || i>=n || j<0 || j>=m || (A[i][j]&WALL)!=0) return false;
    if ((A[i][j]&BLOCK)!=0)
    { var ib=i+di,jb=j+dj;
      if ((A[ib][jb]&WALL)!=0 || ((A[ib][jb])&BLOCK)!=0) return false;
      A[ib][jb]|=BLOCK; paintone(ib,jb,W1*jb,W1*ib);
      A[i][j]^=BLOCK;
    }
    A[i][j]|=PUSHER;  paintone(i,j,W1*j,W1*i);
    A[PushI][PushJ]^=PUSHER;  paintone(PushI,PushJ,W1*PushJ,W1*PushI);
    PushI=i; PushJ=j;
    return true;
  }
  
  function setPusher (di,dj) { 
    if (di<0) pa=3;
    else if (di>0) pa=1;
    else if (dj<0) pa=0;
    else if (dj>0) pa=2;
    IPusher=PA[pa];           // Pusherbild in Bewegungsrichtung
  }

  function move(ch) {
    switch (ch)
    { case 'u' : moveby(-1,0); break;
      case 'd' : moveby(1,0); break;
      case 'l' : moveby(0,-1); break;
      case 'r' : moveby(0,1); break;
    }
	if (finished()) {
	  document.getElementById("message").innerHTML="Problem "+N+": Ziel erreicht!";	  
	}
  }

  // key pressed
  function keyPress( k )
	 {
		switch( k )
		{
		 default: // other
			break;
		 case 37: // Left Arrow
			 document.getElementById("Zug+").disabled=true; move('l');
			break;
		 case 38: // Up Arrow
			 document.getElementById("Zug+").disabled=true; move('u');
			break;
		 case 39: // Right Arrow
			 document.getElementById("Zug+").disabled=true; move('r');
			break;
		 case 40: // Down Arrow
			 document.getElementById("Zug+").disabled=true; move('d');
			break;
		}
	 }

  /** Test for the problem to be completely solved */
  function finished ()
  { var i,j;
    for (i=0; i<n; i++)
      for (j=0; j<m; j++)
        if ((A[i][j]&BLOCK)!=0 && (A[i][j]&TARGET)==0)
          return false;
    return true;
  }
  
  function readlevel(i)
  { try
    { N=i; nr=0;
	  read(Level[N]);
	  document.getElementById("message").innerHTML="Problem "+N;
    }
    catch (e)
    { document.getElementById("message").innerHTML=="Read_Error";
      return;
    }
    zeichne();
  }
 
  function read (intext)
  { try
    { 
	var lines = intext.split("\n");
      var i,j;
      for (i=0; i<n; i++)
      { 
        for (j=0; j<m; j++)
        { var c=EMPTY;
          switch (lines[i].charAt(j))
          { case '1' : c=WALL; break;
            case 'K' : c=BLOCK; break;
            case 'N' : c=BLOCK|TARGET; break;
            case 'S' : c=PUSHER; PushI=i; PushJ=j; break;
            case '3' : c=TARGET; break;
          }
          A[i][j]=c;
        }
      }
    }
    catch (e)
    { document.getElementById("message").innerHTML="Level Error!";	  
    }
    if (PushI>0 && PushJ>0)
    { mark(PushI,PushJ);
    }
  } 
  
  function zeichne () { 
    ctx.clearRect(0,0,W,H);
    var i,j;
    for (i=0;i<n;i++)
    { for (j=0;j<m;j++)
      { paintone(i,j,j*W1,i*W1);
      }
    }
  }
  
  function paintone (i,j,c,r) {
    var x=A[i][j];
    if (x==EMPTY) return;
    if ((x&WALL)!=0)
    { if (IWall==null)
      { ctx.beginPath();
        ctx.drawRect(c,r,W1-1,W1-1);
        ctx.fillStyle = "red";
		ctx.fill();
		ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.drawRect(c,r,W1-1,W1-1);
		ctx.stroke();
      }
      else
        ctx.drawImage(IWall,c,r,W1,W1);
    }
    else
    { if ((x&FLOOR)!=0 && IFloor!=null)
      { if (IFloor==null)
        { ctx.beginPath();
	      ctx.drawRect(c+1,r+1,W1-2,W1-2);
	      ctx.fillStyle = "gray";
		  ctx.fill();
        }
        else ctx.drawImage(IFloor,c,r,W1,W1);
      }
      if ((x&TARGET)!=0)
      { if (ITarget==null)
        { ctx.beginPath();
	      ctx.drawRect(c+1,r+1,W1-2,W1-2);
	      ctx.fillStyle = "green";
		  ctx.fill();
        }
        else ctx.drawImage(ITarget,c,r,W1,W1);
      }
      if ((x&PUSHER)!=0)
      { if (IPusher==null)
        { ctx.beginPath();
	      ctx.strokeStyle = "black";
          drawLine(c+W1/2,r,c+W1/2,r+W1-1);
          drawLine(c,r+W1/2,c+W1-1,r+W1/2);
		  ctx.stroke();
        }
        else ctx.drawImage(IPusher,c,r,W1,W1);
      }
      else if ((x&BLOCK)!=0)
      { if (IBlock==null)
        { ctx.beginPath();
	      ctx.drawRect(c+2,r+2,W1-5,W1-5);
	      ctx.fillStyle = "blue";
          ctx.fill();
		  ctx.beginPath();
          ctx.strokeStyle = "black";
          ctx.drawRect(c+2,r+2,W1-5,W1-5);
		  ctx.stroke();
        }
        else ctx.drawImage(IBlock,c,r,W1,W1);         
      }
    }
  }     

  function mark (i, j)
  { if (i<0 || i>=m || j<0 || j>=m || (A[i][j]&WALL)!=0 || (A[i][j]&FLOOR)!=0) return;
    A[i][j]|=FLOOR;
    mark(i+1,j); mark(i-1,j); mark(i,j-1); mark(i,j+1);
  }	
  
  function solution() {
	doClear();
	readsolution(N);
	Sol=Sol.toLowerCase();
	document.getElementById("Zug+").disabled=false;
  }

  function zugplus()
  { if (nr<Sol.length)
    { move(Sol.charAt(nr));
	  var hilf=nr+1;
      document.getElementById("message").innerHTML="Lösung "+N+": Zugnr "+hilf;
      nr++;
    }
    if (nr==Sol.length) 
	  document.getElementById("message").innerHTML="Lösung "+N+": Ziel erreicht!";  	
  }

Level[1]="                   \n                   \n                   \n    11111          \n    1   1          \n    1K  1          \n  111  K11         \n  1  K K 1         \n111 1 11 1   111111\n1   1 11 11111  331\n1 K  K          331\n11111 111 1S11  331\n    1     111111111\n    1111111        \n                   \n                   \n";