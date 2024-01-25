  // Progamm zu puzzle14 auf www.mathematik.ch
  // Java-Applet vom April 2001 umgeschrieben in html5 und javascript im Oktober 2015
  // copyright Bernhard Berchtold

    W=324;
    H=W;
	sw=W/12;
	sh=sw;
	var zugnr;                     // Nr des Zuges
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
    canvas1=document.getElementById('myCanvas');
    ctx = canvas1.getContext('2d');  
	canvas1.addEventListener('click', function(evt) {  
	  var mousePos = getMousePos(canvas1, evt);
      var mx = mousePos.x; var my = mousePos.y;
      var i = Math.floor(mx/sw)+1; var j = Math.floor(my/sh)+1;
      var nr= board[j-1][i-1];
      if (nr>3 && nr<12)
         { if (document.getElementById('links').checked)  
            { move_left(i,j); document.getElementById('Zug-').disabled = false; return;}
          if (document.getElementById('rechts').checked) 
            { move_right(i,j); document.getElementById('Zug-').disabled = false; return;}
          if (document.getElementById('oben').checked)  
            { move_up(i,j); document.getElementById('Zug-').disabled = false; return;}
          if (document.getElementById('unten').checked)  
            { move_down(i,j); document.getElementById('Zug-').disabled = false;}
         }     
    }, false);
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

         for (i=0;i<8;i++) farbe[i]="blue";
         farbe[3]="red";  farbe[4]="red";
         zugnr=0;
         message.innerHTML="Zug 0         ";
         document.getElementById('Zug-').disabled = true;
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

  function move_down(i,j)
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

 function move_up(i,j)
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
    
 function move_right(i,j)
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

 function move_left(i,j)
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
   
   function fertig()
   { var hilf=true; 
     for (var i=2;i<10;i++)
       for (var j=2;j<10;j++)
         { hilf=true;
           var nr=board[j-1][i-1];
          if ( nr < 4 || nr >6) hilf=false;
            else  if (farbe[nr-4] != "blue")  hilf=false;
          nr=board[j-1][i];
          if ( nr < 4 || nr >6) hilf=false;
             else if (farbe[nr-4] != "blue") hilf=false;
          nr=board[j-1][i+1];
          if ( nr < 4 || nr >6) hilf=false;
             else if (farbe[nr-4] != "blue") hilf=false; 
          nr=board[j][i-1];
          if ( nr < 7 || nr >8) hilf=false;
            else if (farbe[nr-4] != "red") hilf=false; 
          nr=board[j][i];
          if ( nr !=0) hilf=false;
          nr=board[j][i+1];
          if ( nr < 7 || nr >8) hilf=false;
             else if (farbe[nr-4] != "red") hilf=false; 
          nr=board[j+1][i-1];
          if ( nr < 9 || nr >11) hilf=false;
            else if (farbe[nr-4] != "blue") hilf=false;
          nr=board[j+1][i];
          if ( nr < 9 || nr >11) hilf=false;
             else if (farbe[nr-4] != "blue") hilf=false; 
          nr=board[j+1][i+1];
          if ( nr < 9 || nr >11) hilf=false;
             else if (farbe[nr-4] != "blue") hilf=false;
          if (hilf) return true;
         }
     return false;
   }

   function ende()
  {   zugnr++; 
      message.innerHTML="Zug "+zugnr;
     if (fertig())
       message.innerHTML="Gratuliere! "+zugnr+" Züge"; 
  }
	
  function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }	