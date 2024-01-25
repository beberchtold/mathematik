  // Progamm zu puzzle14 auf www.mathematik.ch
  // Java-Applet vom April 2001 umgeschrieben in html5 und javascript im Oktober 2015
  // copyright Bernhard Berchtold

    W=324;
    H=W;
	sw=W/12;
	sh=sw;
	var zugnr=0;                     // Nr des Zuges
    var starti, startj, endi,endj;        // Bestimmungstücke des aktuellen Zuges
    var aktnr;
	var board= new Array(12);
	for (var i = 0; i < board.length; ++i)
      board[i] = new Array(12);  // Zustand
	var farbe= new Array(8);         // Farben der zu verschiebenden Stücke
	var canvas1;
    var ctx;

window.onload=init;
	
  function init() {
    window.onerror = Fehlerbehandlung();
    canvas1=document.getElementById('myCanvas');
    ctx = canvas1.getContext('2d');
    doClear();
  } 
  

  function doClear()   
      {  for (var i=0;i<12;i++)               // zu Position (i,j) gehört board[j-1][i-1]  ; i = 1..12, j = 1..12
           for (var j=0;j<12;j++)
             board[i][j]=-1;
         for (i=1;i<11;i++)
           for (j=1;j<11;j++)
             board[i][j]=0;
         board[1][1]=-1; board[1][10]=-1; board[10][1]=-1; board[10][10]=-1;
         board[2][2]=-1; board[2][9]=-1; board[9][2]=-1; board[9][9]=-1;
         board[2][1]=4; board[1][5]=9; board[3][7]=1; board[4][4]=10;
         board[4][8]=11; board[5][4]=2; board[5][6]=5; board[6][2]=2;
         board[6][8]=1; board[7][6]=3;
         board[8][2]=7; board[8][3]=6;  board[8][9]=8;
         zugnr=0;		 
         message.innerHTML="Zugnummer: "+zugnr;
         for (i=0;i<8;i++) farbe[i]="blue";
         farbe[3]="red";  farbe[4]="red";
         document.getElementById('Zug-').disabled = true;
		 document.getElementById('Zug+').disabled = false;
         zeichne();
    } 

  function zeichne() {  
	ctx.clearRect(0,0,W,H);		
      for (i = 1; i < 13; i++)
        {  x = (i-1) * sw;
           for (var j = 1; j < 13; j++)
             { y = (j-1) * sh;
               var nr=board[j-1][i-1];
			   ctx.beginPath();
               if (nr== -1)   	ctx.fillStyle = "gray";   // Randfeld
               if (nr== 0)   	ctx.fillStyle = "white";   // leeres Feld
               if (nr== 1)   	ctx.fillStyle = "red";
               if (nr== 2)   	ctx.fillStyle = "yellow";
               if (nr== 3)   	ctx.fillStyle = "blue";
               ctx.rect(x, y, sw, sh);
			   ctx.fill();
               if ((nr>3) && (nr<12)) 
                   putSquare(nr, i, j, farbe[nr-4]);
			   ctx.closePath();
             }
        }
    }   
    
   function putSquare(nr,i,j,color) {     // "nr" ist Nummer des Stückes: 4,5,6; 7,8; 9,10,11
       var x = (i-1) * sw;
       var y = (j-1) * sh;
	   ctx.beginPath();
       ctx.fillStyle = "white";
       ctx.rect(x, y, sw, sh);
       ctx.fill();
	   ctx.closePath();
       ctx.beginPath();
	   ctx.strokeStyle = color;	   
       ctx.rect(x+1, y+1, sw-2, sh-2);
	   ctx.stroke();
	   ctx.closePath();
       ctx.beginPath();	   
	   ctx.fillStyle = color;
       if (nr==7 || nr==8)
        { ctx.moveTo(x+3,y+sh-3);
          ctx.lineTo(x+sw-3,y+sh-3);
          ctx.lineTo(x+sw/2,y+3);
		  ctx.lineTo(x+3,y+sh-3);
        }
       if (nr==4 || nr==5 || nr==6) ctx.arc(x+14,y+14,10,0,2*Math.PI);
       if (nr==9 || nr==10 || nr==11) ctx.rect(x+5, y+5, sw-10, sh-10);
	   ctx.fill();
       ctx.closePath();	   
    }  

   function clearSquare(i,j) {
       var x = (i-1) * sw;
       var y = (j-1) * sh;
	   ctx.beginPath();
       ctx.rect(x, y, sw, sh);
	   ctx.fillStyle = "white";
	   ctx.fill();
	   ctx.closePath();
    }   

  function down(i,j)
  { nr=board[j-1][i-1];
    aktnr=nr; starti=i; startj=j; startcolor=farbe[nr-4]; endi=i;
    while (board[j][i-1]==0)
    { 
       clearSquare(i,j); board[j-1][i-1]=0;
       putSquare(nr,i,j+1,farbe[nr-4]); 
	   board[j][i-1]=nr;
       j++;
     }
     endj=j;
     if (board[j][i-1]==1)  { putSquare(nr,i,j,"red"); farbe[nr-4]="red";}
     if (board[j][i-1]==2)  { putSquare(nr,i,j,"yellow"); farbe[nr-4]="yellow";}
     if (board[j][i-1]==3)  { putSquare(nr,i,j,"blue"); farbe[nr-4]="blue";}
     ende();
   }   

 function up(i,j)
  { nr=board[j-1][i-1];
    aktnr=nr; starti=i; startj=j; startcolor=farbe[nr-4]; endi=i;
    while (board[j-2][i-1]==0)
    {
       clearSquare(i,j); board[j-1][i-1]=0;
       putSquare(nr,i,j-1,farbe[nr-4]); 
	   board[j-2][i-1]=nr;
       j--;
     }
     endj=j;
     if (board[j-2][i-1]==1)  { putSquare(nr,i,j,"red"); farbe[nr-4]="red";}
     if (board[j-2][i-1]==2)  { putSquare(nr,i,j,"yellow"); farbe[nr-4]="yellow";}
     if (board[j-2][i-1]==3)  { putSquare(nr,i,j,"blue"); farbe[nr-4]="blue";}
     ende();
   }       
    
 function right(i,j)
  { nr=board[j-1][i-1];
    aktnr=nr; starti=i; startj=j; startcolor=farbe[nr-4]; endj=j; 
    while (board[j-1][i]==0)
    {
       clearSquare(i,j); board[j-1][i-1]=0;
       putSquare(nr,i+1,j,farbe[nr-4]); board[j-1][i]=nr;
       i++;
     }
     endi=i;
      if (board[j-1][i]==1)  { putSquare(nr,i,j,"red"); farbe[nr-4]="red";}
      if (board[j-1][i]==2)  { putSquare(nr,i,j,"yellow"); farbe[nr-4]="yellow";}
      if (board[j-1][i]==3)  { putSquare(nr,i,j,"blue"); farbe[nr-4]="blue";}
      ende();
   }   

 function left(i,j)
  { nr=board[j-1][i-1];
    aktnr=nr; starti=i; startj=j; startcolor=farbe[nr-4]; endj=j;
    while (board[j-1][i-2]==0)
    {
       clearSquare(i,j); board[j-1][i-1]=0;
       putSquare(nr,i-1,j,farbe[nr-4]); board[j-1][i-2]=nr;
       i--;
     }
     endi=i;
      if (board[j-1][i-2]==1)   { putSquare(nr,i,j,"red"); farbe[nr-4]="red";}
      if (board[j-1][i-2]==2)   { putSquare(nr,i,j,"yellow"); farbe[nr-4]="yellow";}
      if (board[j-1][i-2]==3)   { putSquare(nr,i,j,"blue"); farbe[nr-4]="blue";} 
      ende();
   }   

   function back() {
	 document.getElementById('Zug-').disabled = true;
     zugnr--; 
	 message.innerHTML="Zug "+zugnr;
     clearSquare(endi,endj); board[endj-1][endi-1]=0;
     putSquare(aktnr,starti,startj,startcolor); 
	 board[startj-1][starti-1]=aktnr; farbe[aktnr-4]=startcolor;   
   }
   
   function go()
   {  document.getElementById('Zug-').disabled = false;
      if (zugnr<24)   zugnr++; 
      message.innerHTML="Zug "+zugnr;
      switch (zugnr)
      { case 1: right(10,9); break;
        case 2: down(6,2); break;
        case 3: right(5,5); break;
        case 4: down(8,5); break;
        case 5: left(8,11); break;
        case 6: right(9,5); break;
        case 7: down(11,5); break;
        case 8: left(11,8); break;
        case 9: down(8,8); break;
        case 10: right(7,6); break;
        case 11: down(11,6); break;
        case 12: left(11,8); break;
        case 13: up(7,11); break;
        case 14: left(11,9); break;
        case 15: down(8,9); break;
        case 16: down(8,8); break;
        case 17: left(3,9); break;
        case 18: down(2,3); break;
        case 19: down(7,9); break;
        case 20: right(4,9); break;
        case 21: right(2,9); break;
        case 22: down(6,9); break;
        case 23: right(2,8); break;
        case 24: down(6,8); break;
      }
   }

  function ende() { 
    if (zugnr==24) {
	  document.getElementById('Zug-').disabled = true;
      document.getElementById('Zug+').disabled = true;
	}	  
  }
	
  function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }


  function Fehlerbehandlung() {
  }
	