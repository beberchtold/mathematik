// Progamm zum puzzle Theseus und Minotaur auf www.mathematik.ch
// copyright Bernhard Berchtold
	 var maze = new Array(
			"+---+---+---+---+---+---+---+---+---+---+---+---+---+---+    ",
			"|                   |               |                   |    ",
			"+---+---+   +   +   +   +---+   +---+---+   +---+---+   +---+",
			"|   |   |   |   |   |   |                   |             X  ",
			"+   +   +   +---+   +   +---+   +---+---+---+---+---+   +---+",
			"|                                                       |    ",
			"+   +   +---+   +   +   +---+   +   +   +---+---+   +   +    ",
			"|   |   |       |   |           |   |               |   |    ",
			"+   +   +---+   +   +   +   +   +   +---+---+---+   +   +    ",
			"| T |   |       |   |   |   |   |               |   | M |    ",
			"+   +   +   +   +   +   +   +   +   +---+---+   +   +   +    ",
			"|   |   |   |       |   |                       |   |   |    ",
			"+   +   +   +   +   +   +   +   +   +---+---+   +   +   +    ",
			"|   |   |   |   |   |   |   |   |               |   |   |    ",
			"+   +   +   +   +   +   +   +   +   +---+---+   +   +   +    ",
			"|   |   |   |   |   |   |   |   |               |   |   |    ",
			"+   +   +   +   +   +   +   +   +   +---+---+   +   +   +    ",
			"|                                                       |    ",
			"+---+---+---+---+---+---+---+---+---+---+---+---+---+---+    "	);
	

	 const Dx = 9;
	 const Dy = 15;

	// Theseus
	 var Tx = 4;
	 var Ty = 0;
	// Minotaur
	 var Mx = 4;
	 var My = 13;
	// exit from maze
	 const Ex = 1;
	 const Ey = 14;
        // pictures
         var Tpic="T1.png";
         var Mpic="M1.png";
        
	// game running data
	 var G = false;
	 var U = 2;
	// for solving the game
	 var counter=-1;
	 const solutionstr="UURRRDDLDDDDRRRUUUUURRUURRRURRRLLLDLLLDDDDDDDRRRRRRL LUUULLLLUUUUULLDDDDDDDDRRRRRRRUUUUUURUR";
     var solvemode=false;

	// onTimeout()
	function minMove() {
		var bMoved = true;
		if(G)
		{
		 // game over (won or lost)
		 return;
		}

		// Minotaur move
		n = "x" + eval(Mx) + "y" + eval(My);
		var helppic = document.getElementById(n).src;
		var pos = helppic.search("M.png");
		if (pos>-1) helppic="1.png";
		 else
		   { pos = helppic.lastIndexOf("M");
		     helppic=helppic.substring(pos+1,pos+6);
		   }
		 document.getElementById(n).src = helppic;

		if(( My > Ty )&&( maze[2*Mx+1].charAt(4*My+0) == " " ))
		{
		 My--;
		}
		else
		if(( My < Ty )&&( maze[2*Mx+1].charAt(4*My+4) == " " ))
		{
		 My++;
		}
		else
		if(( Mx > Tx )&&( maze[2*Mx+0].charAt(4*My+2) == " " ))
		{
		 Mx--;
		}
		else
		if(( Mx < Tx )&&( maze[2*Mx+2].charAt(4*My+2) == " " ))
		{
		 Mx++;
		}
		else
		{
		 // no move possible
		 bMoved = false;
		}

		n = "x" + eval(Mx) + "y" + eval(My);
        helppic = document.getElementById(n).src;
        pos = helppic.search(".png");
		helppic = helppic.substring(pos-1,pos+4);
		Mpic = "M" + helppic;
		document.getElementById(n).src = Mpic;

		// lost?
		if(( Tx == Mx )&&( Ty == My ))
		{
		 Antwort.innerHTML = "Verloren!";
		 G = true;
		}
		else
		{
		 if(( bMoved )&&( U < 2 ))
		 {
			U++;
			setTimeout( "minMove()", 10 );
		 }
		 else U = 0;
		}
	}

	// onClick()
	function move(x,y) {
	    if(G) return;  // game over (won or lost)

	    if(U!=0) return;  // undergoing operation (Minotaur move)

	      // Theseus move
	    if(( x < 0 )||( x >= Dx )||( y < 0 )||( y >= Dy ))
		{
		 // out-of-range
		 return;
		}
		else
		if(( x == Mx )&&( y == My ))
		{
		 // click on Minotaur
		 return;
		}
		else
		if( (( x == Tx + 1 )&&( y == Ty )&&( maze[2*Tx+2].charAt(4*Ty+2) == " " ))
                 || (( x == Tx - 1 )&&( y == Ty )&&( maze[2*Tx+0].charAt(4*Ty+2) == " " ))
                 || (( x == Tx )&&( y == Ty + 1 )&&( maze[2*Tx+1].charAt(4*Ty+4) == " " ))
                 || (( x == Tx )&&( y == Ty - 1 )&&( maze[2*Tx+1].charAt(4*Ty+0) == " " )) )
		{
		 n = "x" + eval(Tx) + "y" + eval(Ty);
		 var helppic = document.getElementById(n).src;
		 var pos = helppic.search("T.png");
		 if (pos>-1) helppic="1.png";
		 else
		   { pos = helppic.lastIndexOf("T");
		     helppic=helppic.substring(pos+1,pos+6);
		   }
		 document.getElementById(n).src = helppic;
		 Tx = x;
		 Ty = y;
		 n = "x" + eval(Tx) + "y" + eval(Ty);
         helppic = document.getElementById(n).src;
         pos = helppic.search(".png");
		 helppic = helppic.substring(pos-1,pos+4);
		 Tpic = "T" + helppic;
		 document.getElementById(n).src = Tpic;
		 		 
		 // won?
		 if(( x == Ex )&&( y == Ey ))
		 {
           Antwort.innerHTML = "Gratuliere!";
		   G = true;
		   return;
		 }
		}
		else
		if(( x == Tx )&&( y == Ty ))
		{
		 // Theseus will skip this turn
		}
		else
		{
		 // click too far away from Theseus
		 return;
		}

	     U = 1;
	     setTimeout("minMove()", 10);
	}
	
	 function init() {
	   var i = 0;
	   var j = 0;
	   var n = "";
	   solvemode=false;
	   var breite=document.getElementById('lab').clientWidth;
	   breite=Math.floor(breite/15);
	   if (breite<22) breite=22;
	   if (breite>34) breite=34;
	   var hoehe=""+10*breite+"px";
	   var laenge=""+15*breite+"px";
	   document.getElementById('lab').style.width=laenge;
	   document.getElementById('lab').style.height=hoehe;
	      
       const row=new Array (
           "32222322232222zr",
           "33111130220320er",
           "100200202222203r",
           "11301120112201zr",
           "T130111112221Mzr",
           "11110110022011zr",
           "11111111122011zr",
           "11111111122011zr",
           "10000000000000zr",
           "uuuuuuuuuuuuuu4r"
          );
	   
	   for( i = 0; i <= Dx; i++ )
         {
          for( j = 0; j <= Dy; j++ )
	        {
             var pos=row[i].charAt(j);
			 var pos_left=breite*j;
			 var pos_top=breite*i;
			 document.write("<div style=\"position: absolute; left:" + pos_left + "px; top:" + pos_top + "px;\">");
             document.write("<IMG ID=x" + eval(i) + "y" + eval(j) + " SRC=" + pos + ".png" + " width="+breite+" height="+breite+">");
			 document.write("</div>");
            }
       }	   
    }

	// restart game
	function restart() {
	   var i = 0;
	   var j = 0;
	   var n = "";
	   counter=-1;

	   if ( (Tx!=Mx) || (Ty!=My))
	    {
	      n = "x" + eval(Tx) + "y" + eval(Ty);
              var helppic = document.getElementById(n).src;
              var pos = helppic.search("T.png");
              if (pos>-1) helppic="1.png";
	        else
	          { pos = helppic.lastIndexOf("T");
		    helppic=helppic.substring(pos+1,pos+6);
	          }
              document.getElementById(n).src = helppic;
	   }

	   n = "x" + eval(Mx) + "y" + eval(My);
	   var helppic = document.getElementById(n).src;
	   var pos = helppic.search("M.png");
	   if (pos>-1) helppic="1.png";
	     else
	       { pos = helppic.lastIndexOf("M");
		 helppic=helppic.substring(pos+1,pos+6);
	       }
	   document.getElementById(n).src = helppic;
            
	   Antwort.innerHTML = " ";
	   G = false;
	   U = 0;
           Tx = 4; Ty = 0;
           Mx = 4; My = 13;
           document.getElementById("x1y14").src = "e.png";
	   document.getElementById("x4y0").src = "T.png";
	   document.getElementById("x4y13").src = "M.png"; 
	}

	// key pressed
	function keyPress(k) {
		if (solvemode) return;
		switch(k)
		{
		 default: // other
			break;
		 case 68: // D or d
			 move(Tx,Ty);
			break;
		 case 37: // Left Arrow
			 move(Tx,Ty-1);
			break;
		 case 38: // Up Arrow
			 move(Tx-1,Ty);
			break;
		 case 39: // Right Arrow
			 move(Tx,Ty+1);
			break;
		 case 40: // Down Arrow
			 move(Tx+1,Ty);
			break;
		 case 82: //  R or r
			 restart();
			break;
		}
	}
	 
	// Solution
    function initloesung() {
		document.getElementById('user').style.display="none";
		document.getElementById('user1').style.display="none";
	    document.getElementById('computer').style.display="block";
		solvemode=true;
		restart();
	}

	function loesung() {
		counter++;
        if (counter==solutionstr.length) {info.innerHTML = "Ziel erreicht!";return;}
        var pos=solutionstr.charAt(counter);
        switch (pos)
          {
            case "L": move(Tx,Ty-1);
            case "U": move(Tx-1,Ty);
            case "R": move(Tx,Ty+1);
            case "D": move(Tx+1,Ty);
            case " ": move(Tx,Ty);
          }          
    }
	
	// zurück zur Aufgabenstellung
	function start() {
		document.getElementById('computer').style.display="none";
	    document.getElementById('user').style.display="block";
		document.getElementById('user1').style.display="block";
		solvemode=false;
		restart();	
	 }
