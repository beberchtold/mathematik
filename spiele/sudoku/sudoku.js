  // Progamm zu Sudoku auf www.mathematik.ch
  // Oktober 2015: Applet vom Januar 2002 umgeschrieben auf html5 und Javascript
  // April 2020: Button back und load entfernt; Ziffer löschen mit delete oder Button; infos im neuen Fenster
  // Mai 2020: Färbungsmöglichkeit; Bugfix bei gecheckter Hilfe und delete-Button 
 // copyright Bernhard Berchtold

    var W, H;
	var cellw;
	const digit=9;
    var backIndex;       
    var sol=new Array(9);    // char
	for (var i=0;i<9;i++)
		sol[i]=new Array(9);
    var locked=new Array(9);    // boolean
	for (i=0;i<9;i++)
		locked[i]=new Array(9);
    var help1=new Array(9);    // boolean um Ziffern zu streichen
	for (i=0;i<9;i++)
		help1[i]=new Array(9);    
    var prob=new Array(9);    // char  Problemstellung
	for (i=0;i<9;i++)
		prob[i]=new Array(9);
    var savesol=new Array(9);    // char
	for (i=0;i<9;i++)
		savesol[i]=new Array(9);	
    var saveuser=new Array(9);    // char
	for (i=0;i<9;i++) {
		saveuser[i]=new Array(9);
		for (var j=0;j<9;j++)
		  saveuser[i][j]=new Array(2);
	} 
    var forbidden=new Array(9);    // boolean
	for (i=0;i<9;i++) {
		forbidden[i]=new Array(9);
		for (j=0;j<9;j++)
		  forbidden[i][j]=new Array(9);
	} 		   
    var back=new Array(500);
    var xCur=0;
    var yCur=0;
    var xNew=0;
	var yNew=0;
	var savemessage="";  // aktueller Inhalt von message wird bei save_user hier gespeichert und bei load_user wieder geladen
    var create=false;
    var comp;   // computer löst puzzle
    var unloesbar;
	var help;
    var ctx;
	var canvas1;
	var initmade=false;
	const farbe=["#FFFF00","#DAA520","#BC8F8F","#EEE8AA","#BDB76B","#FFD700","#FFFFE0","#FFE5D5","#FFA07A"];
	var faerben=false;   // true, falls die 9 Blöcke gefärbt werden sollen
	var Nummer="";  // Bezeichnung des Problems
    
window.onload=resizeCanvas;

  function resizeCanvas() {
    var canvs = document.getElementById("containercanvas");
    canvs.width = canvs.offsetWidth;
	W=canvs.width;
	if (W>400) W=400;
	H=W;
	cellw=Math.floor(W/9);
	if (initmade) {
	  resize1();
      zeichne();
	} else init();	
  }

  function init() {
    initmade=true;
	window.addEventListener('resize', function(event){
      resizeCanvas()
    });
    canvas1 = document.getElementById('myCanvas');
	canvas1.addEventListener('click', function(evt) { 
      var mousePos = getMousePos(canvas1, evt);
      var x=mousePos.x; var y=mousePos.y;
      xNew = Math.floor(x / cellw);
      yNew = Math.floor(y / cellw);
      if (xNew < 0 || yNew < 0 || xNew > 8 || yNew > 8)
        return;
      getInfo();
      zeichne();
    }, false);
	resize1();
    ctx = canvas1.getContext('2d');
	document.getElementById("Loa").disabled=true;
	document.getElementById("faerbe").checked=false;
    problem(rand(2)+1);
  }

  function initPuzzle() {
	document.getElementById("zifferbuttons").style.display = "block";
	aktiviere_zifferbuttons();
    for (var i=0;i<9;i++)
        { for (var j=0;j<9;j++)
          { sol[i][j] = ' ';
            locked[i][j] = false;
            for (var i1 =0;i1<9;i1++)
                forbidden[i][j][i1] = false;
          }
        }
    document.getElementById("Show").checked=false;
	document.getElementById("Hilfe").checked=false;
	document.getElementById("wahl").selectedIndex="0";
	hilfebuttons_bgweiss();
	deaktiviere_hilfebuttons();
	backIndex = 0; xNew=0; yNew=0;
    comp=false; unloesbar=false; help=false;
    if (!create) document.getElementById("message").innerHTML="Klick auf 'Create' oder Auswahl aus 'Prob'";
    streiche(0);  
  }

  function resize1() {
	 canvas1.width=W; canvas1.height=H; 
  }

  function OnChangeCheckbox1 (checkbox) {
    help=checkbox.checked;
    getInfo();	
  }

  function OnChangeCheckbox2 (checkbox) {
	var i,j;
    if (checkbox.checked) aktiviere_hilfebuttons();
       else {deaktiviere_hilfebuttons();        
	        for (i=0;i<9;i++)
              for (j=0;j<9;j++)
                help1[i][j]=false;
            zeichne();
	   }	
  }
  
  function OnChangeCheckbox3 (checkbox) {
	faerben=checkbox.checked;
	zeichne();
  }

  function faerbebloecke() {
	const block=["001020011121021222","304050314151324252","607080617181627282","031323041424051525","334353344454354555","637383647484657585","061626071727081828","364656374757384858","667686677787687888"];
	for (var hilf=0;hilf<digit;hilf++) {
	  ctx.beginPath();
	  if (faerben) ctx.fillStyle = farbe[hilf];
	    else ctx.fillStyle = "white";
	  for (var hilf1=0;hilf1<digit;hilf1++) {  
        var i=parseInt(block[hilf].charAt(2*hilf1));
        var j=parseInt(block[hilf].charAt(2*hilf1+1));
        ctx.rect(cellw*i+1, cellw*j+1, cellw-2, cellw-2);    // noch füllen
	  }
	  ctx.fill();
    }	  
  }

  function streiche(nr) {
    var i,j,i1,j1;
    c = String.fromCharCode(48+nr);
    for (i=0;i<9;i++)
      for (j=0;j<9;j++)
        help1[i][j]=false;
         // Zeile  und Kolonne
    if (nr>0) {
      for (i=0;i<9;i++)
        for (j=0;j<9;j++) {
           if (sol[i][j]!=' ') help1[i][j]=true;
           if (sol[i][j]==c) {
              for (i1=0;i1<9;i1++) {
                  help1[i1][j]=true;         // Zeile
                  help1[i][i1]=true;         // Kolonne
              }
              // 9-er Box
              var hilf1= 3*(Math.floor(i/3)); var hilf2= 3*(Math.floor(j/3));
              for (i1=hilf1;i1<hilf1+3;i1++)
                for (j1=hilf2;j1<hilf2+3;j1++) help1[i1][j1]=true;
           }
        }
    }
	zeichne();
 }

  function lock() {
    for (var i=0;i<9;i++)
      for (var j=0;j<9;j++) locked[i][j] = (sol[i][j] != ' ');
	zeichne();	
    }

  function zeichne() {
    ctx.clearRect(0,0,W,H);	
    ctx.font="20px Arial";
	faerbebloecke();
	ctx.beginPath();
    for (var i=0;i<digit;i++)
        for (var j=0;j<digit;j++) { 
            if (help1[i][j]) {ctx.fillStyle = "LightGreen"; ctx.rect(cellw * i, cellw * j, cellw, cellw); ctx.fill(); }	 
            if (i==xNew && j==yNew) {ctx.fillStyle = "cyan"; ctx.rect(cellw * i, cellw * j, cellw, cellw); ctx.fill();}
			ctx.beginPath();
            ctx.strokeStyle = "gray";
            ctx.rect(cellw*i,cellw*j,cellw,cellw);
			ctx.stroke();
			ctx.beginPath();
            if (locked[i][j]) ctx.fillStyle = "red";
               else ctx.fillStyle = "black";
            ctx.fillText(""+sol[i][j], cellw*i+cellw/2-6, cellw*j+cellw/2+8);
			ctx.stroke();
			ctx.strokeStyle = "black";
		    ctx.beginPath();
            if (j%3==0) line(0,cellw*j+1,cellw*9,cellw*j+1);
            if (i%3==0) line(cellw*i+1,0,cellw*i+1,cellw*9);
		    ctx.stroke();
        }
	    ctx.beginPath();
		ctx.rect(1,1,cellw*digit,cellw*digit);
		ctx.stroke();
  }

  function proof(i,j,c)
    {
      // Zeile
      for (var i1 = 0; i1 < 9; i1++)
        if (sol[i1][j] == c) {return false;}
      // Kolonne
      for (var j1 = 0; j1 < 9; j1++)
        if (sol[i][j1] == c) {return false;}
      // 9-er Box
      var hilf1= 3*(Math.floor(i/3)); var hilf2= 3*(Math.floor(j/3));
      for (var i1 = hilf1 ; i1 < hilf1+3; i1++)
        {for (var j1 = hilf2; j1 < hilf2+3; j1++)
           if (sol[i1][j1] == c) {return false;}
         }
      return true;
    }

  function possibilities(i,j)  // zählt die Setzungsmögl. in einem String auf
    {
      var poss="";
      if (locked[i][j]) return "       ";
      for (var d = 0; d < 9; d++)
        if (proof(i,j,String.fromCharCode(49+d))) {
          if (poss!="") poss+=',';
          poss+=String.fromCharCode(49+d);
        }
      return poss;
    }

  function count(i,j)  // zählt die Anzahl Setzungsmögl.
    {
      var anzahl=0;
      if (locked[i][j] && !comp) return 0;
      if (sol[i][j] != ' ' && comp) return 0;
      for (var d = 0; d < 9; d++)
        if (comp) {if (proof(i,j,String.fromCharCode(49+d)) && !forbidden[i][j][d]) anzahl++;}
          else  {if (proof(i,j,String.fromCharCode(49+d)))  anzahl++;}
      return anzahl;
    }
    
  function eingabe(z) {
	if (z==0 && !locked[xNew][yNew]) {
		sol[xNew][yNew]=' ';
		hilfebuttons_bgweiss();
		if (document.getElementById("Show").checked) getInfo();
		zeichne();
		return;
		}
	var k = z+48;
	if (setvalue(xNew,yNew,String.fromCharCode(k))) {
      if (document.getElementById("Hilfe").checked) {
		 streiche(z);
		 hilfebuttons_bgweiss();
	     document.getElementById("H"+z).style.backgroundColor="LightGreen";
	  }
	  zeichne();
      getInfo();
      if (solved()) {
		  document.getElementById("message").innerHTML=Nummer+": gelöst. Gratuliere!";
		  document.getElementById("Show").checked=false;
	      document.getElementById("Hilfe").checked=false;
		  OnChangeCheckbox2(document.getElementById("Hilfe"));
		  document.getElementById("zifferbuttons").style.display = "none";
	  }
    }	  
  }

  function hilf(z) {
	streiche(z);
	hilfebuttons_bgweiss();
	document.getElementById("H"+z).style.backgroundColor="LightGreen";
	// Cursor auf ein Feld mit Inhalt z setzen, falls es das gibt
	var erfolg=false;
	for (var i=0;i<digit;i++) 
	   for (var j=0;j<digit;j++)    
		 if (sol[i][j]==String.fromCharCode(48+z)) {xNew=i;yNew=j; erfolg=true; j=digit;i=digit;}
	if (!erfolg) {  // Cursor verstecken
      xNew=-1;
	}
	document.getElementById("Verf").innerHTML="";
	zeichne();
  } 
  
  function keyPress(k)
    {   
    switch(k)
        {
        case 40: // up
            if (yNew<digit-1)
              {yNew++;getInfo();}
            break;

        case 38: // down
            if (yNew>0)
              {yNew--;getInfo();}
            break;

        case 39: // right
            if (xNew<digit-1)
              {xNew++;getInfo();}
            break;

        case 37: // left
            if (xNew>0)
              {xNew--;getInfo();}
            break;

		case 46: // delete-Taste
		    if (!locked[xNew][yNew]) {
		    sol[xNew][yNew]=' ';
		    hilfebuttons_bgweiss();
		    if (document.getElementById("Show").checked) getInfo();
		    zeichne();
		    return;
		}
			break;

        case 32: // Leertaste: verhindert, dass default Funktion der Befehlswiederholung ausgeführt wird
		event.preventDefault();
		break;

        default:
			c=String.fromCharCode(k);		
            if ((k>57 || k<49) && c != ' ')
                return;
            if (setvalue(xNew,yNew,c)) {
              if (document.getElementById("Hilfe").checked) {
		        streiche(k-48);
		        hilfebuttons_bgweiss();
	            document.getElementById("H"+c).style.backgroundColor="LightGreen";
				getInfo();
	          }
			  if (solved()) {
				  document.getElementById("message").innerHTML=Nummer+": gelöst. Gratuliere!";
				  document.getElementById("Show").checked=false;
				  document.getElementById("Hilfe").checked=false;
				  OnChangeCheckbox2(document.getElementById("Hilfe"));
				  document.getElementById("zifferbuttons").style.display = "none";
			  }
			}
            break;			
        }
        zeichne();
    }

  function setvalue(i,j,c){
	var k=c.charCodeAt(0);
    if (k<49 || k>57) return false;
    if (locked[i][j]) return false;
    if (comp && (sol[i][j] != ' ')) return false;
    if (forbidden[i][j][parseInt(c)-1]) return false;
    if (proof(i,j,c)) {
        xCur=i;yCur=j;xNew=i;yNew=j;
        back[backIndex] = 9*xCur+yCur;
        backIndex++;
        sol[xCur][yCur] = c;
        if (comp) forbidden[xCur][yCur][parseInt(c)-1]= true;
        return true;
    }
    return false;
  }
 
  // get row from cell number
  function getrow(cell) {
      return Math.floor(cell%9);
    }

  // get column from cell number
  function getcol(cell) {
      return Math.floor(cell/9);
    }

  // get cell number from row and col
  function getcell(col,row) {
      return (9*col+row);
    }

  function possible_move() {
    // Gibt es ein leeres Feld, das nicht mehr besetzt werden kann? -->false
      for (var i1 = 0; i1 < 9; i1++)
        { for (var j1 = 0; j1 < 9; j1++)
           if (sol[i1][j1] == ' ' && count(i1,j1)==0) { return false;}
        }
        return true;
    }

  function setting() {
     var d=0; var isetz=-1; var jsetz=-1;
     var success=false; var success1=false;
     if (solved()) return;
     if (unloesbar) return;
     comp=true;
     // Gibt es ein leeres Feld, das nicht mehr besetzt werden kann? Wenn ja -->backtrack
     if (!possible_move())  backtrack();
     // Gibt es ein Feld, das mit genau einer Ziffer zu besetzen ist?
    for (var i1 = 0; i1 < 9; i1++)
      for (var j1 = 0; j1 < 9; j1++) {
         var counthilf=count(i1,j1);
         if (counthilf==1) {
           success=true; isetz=i1; jsetz=j1; i1=9; j1=9;
         }
	  }	 
      if (!success) {
	   for (var i1 = 0; i1 < 9; i1++)
        for (var j1 = 0; j1 < 9; j1++) {
         var counthilf=count(i1,j1);     
	     if (counthilf==2 && !success) {
           success=true; isetz=i1; jsetz=j1; i1=9; j1=9;
         }
	   }
      } 	  
      if (!success) {
	   for (var i1 = 0; i1 < 9; i1++)
        for (var j1 = 0; j1 < 9; j1++) {
         var counthilf=count(i1,j1);     
	     if (counthilf==3 && !success) {
           success=true; isetz=i1; jsetz=j1; i1=9; j1=9;
         }
	   }
      }

     var anzahl=0;
	 var i=0;
     do {
        if (!success) {    // auf Zufallsfeld setzen
          do {i=rand(81);}
            while (sol[getcol(i)][getrow(i)]!=' ');
          isetz=getcol(i);  jsetz=getrow(i);
        }
        d=0;
        do {
            if (!forbidden[isetz][jsetz][d])
              success1=setvalue(isetz,jsetz,String.fromCharCode(49 + d));
            d++;
           }
           while (d<9 && !success1);
           success=false; anzahl++;
        } while (!success1 && anzahl<500);     // willkürliche Setzung
        if (anzahl==500) {unloesbar=true; return;}  // Setzung wahrscheinlich unmöglich
   }

  function anzleere() {
    var anz=0;
    for (var i=0;i<9;i++) {
	  for (var j=0;j<9;j++)
        if (sol[i][j]==' ') anz++;
      }
    return anz;
   }
   
  function solved() {
    for (var i=0;i<9;i++)
        {for (var j=0;j<9;j++)
           if (sol[i][j]==' ') return false;
        }
    return true;
    }
   
  function create1() {
     var R=new Array(9);
     var i;
     var success;
	 comp=true;
     initPuzzle();
       // Zufallszuordnung der 9 Ziffern in die 3 Blocks links oben, mitte, rechts unten
       R = permutation();
       for (i=0;i<9;i++)
            setvalue(Math.floor(i%3),Math.floor(i/3),String.fromCharCode(49 + R[i]));
       R = permutation();
       for (i=0;i<9;i++)
            setvalue(3+Math.floor(i%3),3+Math.floor(i/3),String.fromCharCode(49 + R[i]));
       R = permutation();
       for (i=0;i<9;i++)
            setvalue(6+Math.floor(i%3),6+Math.floor(i/3),String.fromCharCode(49 + R[i]));
       success = dosolve();   // immer wahr
   }

  function permutation() {
    var i,n=9;
    var R=new Array(n);
    R[0]=Math.floor(n*Math.random());
    var anzahl=1;
    while (anzahl<n) {
      R[anzahl]= Math.floor(n*Math.random());
      for (i=0; i<anzahl; i++)
         if (R[anzahl]==R[i]) i=anzahl+1;
      if (i==anzahl) anzahl++;
    }
    return R;
  }

  function speichern_in_prob() {
     // zwischenspeichern in prob
    for (var i=0;i<9;i++)
      for (var j=0;j<9;j++) prob[i][j]=sol[i][j];
    }

  function eindeutig(){  // sucht vom aktuellen Brett eindeutige Lösung
     var success;
     var i1,j1,d;
     save();
     success=dosolve();    // immer wahr!
     speichern_in_prob();
     load();
     trials=0;
     do {
        success=false;
        // testen auf eindeutige Lösbarkeit des aktuellen Brettes
        // leere Felder mit mehr als 1 Mögl mit anderer Zahl füllen als urspr Lösung
        // falls Lösung möglich, dann diese als neue Lösung testen
        // alle Felder mit Mögl > 1 suchen
        for (var i=0;i<9;i++)
            {for (var j=0;j<9;j++)
               if (count(i,j)>1) {
                 i1=i; j1=j;
                 // andere als urspr Lösung suchen
                 for (d=0;d<9;d++) {
                   if (d==parseInt(prob[i1][j1])-1) d++;
                   if (setvalue(i1,j1,String.fromCharCode(49 + d))) {
                    // loesbar mit diesem neuen Wert?
                      locked[i1][j1]=true;
                      success = dosolve();
                      if (success) {
                        speichern_in_prob();
                        load();
                        setvalue(i1,j1,String.fromCharCode(49 + d));
                        d=9; i=9;j=9;
                        save();
                       }
                       else {unloesbar=false; load();}
                   }
                 }
               }
            }
		trials++;
      }
      while (success && trials<10);
      //// bis keine andere Lösung mehr möglich
  }

  function docreate() {
	var timer = setTimeout(function(){docreate1()},10);
	//initPuzzle();
	document.getElementById("wahl").selectedIndex = "0";
	document.getElementById("message").innerHTML="Geduld! Falls fertig, erscheint hier die Anzahl Zeichen";
  }

  function docreate1() {
    var anz, d, i1, j1;
    create=true;
    create1();
    save_user();
	var iter=0;
    do {  // solange bis am Schluss Anzahl Leerfelder >= 51
        load_user();
        //  55 zufällige Felder leeren
        anz=0;
        do {
           var i=rand(81);                // erzeugt Zahl von 0 bis 80
           i1=getcol(i); j1=getrow(i);
           if (sol[i1][j1] != ' ') {
             sol[i1][j1] = ' ';
             for (d=0;d<9;d++) forbidden[i1][j1][d]=false;
             anz++;
           }
        } while (anz<55);	
        eindeutig();   // sucht eindeutiges Brett
		iter++;
    }
    while (anzleere()<51 && iter<20);
    create=false;
    comp=false;
	var anz=81-anzleere();
	if (iter<20) {
	  Nummer="Aktuelles Problem";
	  document.getElementById("message").innerHTML=Nummer+": "+anz+" Zeichen";
	  save_user();
	  zeichne();
	}
	   else document.getElementById("message").innerHTML="Create nicht gelungen! Klicken Sie nochmals auf Create";
  }

  function solvebutton() {
	deaktiviere_zifferbuttons();
	if (solved()) return;
      // alle vorhandenen Besetzungen absichern
    lock();
    var success = dosolve();
    if (success) {
	  document.getElementById("message").innerHTML=Nummer+": Gelöst!";
	  document.getElementById("Show").checked=false;
	  document.getElementById("Hilfe").checked=false;
	  OnChangeCheckbox2(document.getElementById("Hilfe"));
	  document.getElementById("zifferbuttons").style.display = "none";
	}
       else {
          if (document.getElementById("message").innerHTML=="zu wenig Zahlen");  // kein weiterer Kommentar
              else {
				  document.getElementById("message").innerHTML="unlösbar!";
			  }
       }
  }

  function dosolve() {   //Versuch, vom aktuellen Status zu lösen
    if (solved()) return true;
	var success=false;
    if (anzleere()>64)
      {document.getElementById("message").innerHTML="zu wenig Zahlen"; return false; }
    comp=true;
    // alle vorhandenen Besetzungen gelockt!   falls von solvebutton herkommend
    var trials=0;
    do {
       setting();
       trials++;
       success=solved();
    }
    while (!success && !unloesbar && (trials<20000));        // willkürliche Setzung sollte reichen
    return success;
  }

  function backtrack() {
    var xHilf, yHilf;
    var success=false;
    if (backIndex == 0)   return;    // backtrack nicht mehr möglich
    if (locked[xCur][yCur]) {unloesbar=true; return;}
    sol[xCur][yCur] =' ';
    if (count(xCur,yCur)>0) {
    // Setzung im aktuellen Feld noch möglich !
      var d=0;
          do{
            if (!forbidden[xCur][yCur][d])
              success=setvalue(xCur,yCur,String.fromCharCode(49 + d));
            d++;
           }
           while (d<9 && !success);
    }

   if (!success) {
     do {
        xHilf=xCur; yHilf=yCur;
        backIndex--;
        xCur=getcol(back[backIndex]); yCur= getrow (back[backIndex]);
        if (locked[xCur][yCur]) {unloesbar=true; return;}
        if (xHilf!=xCur || yHilf!=yCur) {
          for (d=0;d<9;d++) forbidden[xHilf][yHilf][d]=false;
        }
        sol[xCur][yCur] =' ';
      }
      while (!possible_move() || unloesbar);
    }
  }

  function save() {
    for (var i=0;i<9;i++)
      for (var j=0;j<9;j++) savesol[i][j] = sol[i][j];
    }

  function load() {
    initPuzzle();
    for (var i=0;i<9;i++)
      for (var j=0;j<9;j++) locked[i][j] = setvalue(i, j, savesol[i][j]);
    }

  function save_user() {
	savemessage=document.getElementById("message").innerHTML;
	document.getElementById("Loa").disabled=false;
    for (var i=0;i<9;i++)
      for (var j=0;j<9;j++)
        if (locked[i][j]) {
             saveuser[i][j][0] = sol[i][j];
             saveuser[i][j][1] = ' ';
        }
        else {
          saveuser[i][j][0] = ' ';
          saveuser[i][j][1] = sol[i][j];
        }
    } 
  
  function load_user() {
    initPuzzle();
	document.getElementById("message").innerHTML=savemessage;
	var pos = savemessage.lastIndexOf(':');
	Nummer=savemessage.substr(0,pos);
    for (var i=0;i<9;i++)
      for(var j=0;j<9;j++) {
        if (saveuser[i][j][0] != ' ') locked[i][j] = setvalue(i, j, saveuser[i][j][0]);
        if (saveuser[i][j][1] != ' ') setvalue(i, j, saveuser[i][j][1]);
      }
	zeichne();  
    }

  function getInfo() {
    if (help)
        document.getElementById("Verf").innerHTML=possibilities(xNew,yNew);
     else  document.getElementById("Verf").innerHTML="           ";
   }
	
  function rand(number) {
    return Math.floor(Math.random() * number);
  };  
  
  function line(x1,y1,x2,y2) {
	  ctx.moveTo(x1,y1);
	  ctx.lineTo(x2,y2);
  }
	
  function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }	
	
  function deaktiviere_zifferbuttons() {
	for (var i=1;i<10;i++)
	 document.getElementById(String.fromCharCode(i+48)).disabled=true; 
  }	

  function aktiviere_zifferbuttons() {
	for (var i=1;i<10;i++)
	 document.getElementById(String.fromCharCode(i+48)).disabled=false;
  }
  
  function deaktiviere_hilfebuttons() {
	for (var i=1;i<10;i++) {
	  document.getElementById("H"+String.fromCharCode(i+48)).disabled=true;
      document.getElementById("H"+i).style.backgroundColor="white";
    }	 
  }

  function aktiviere_hilfebuttons() {
	for (var i=1;i<10;i++)
	 document.getElementById("H"+String.fromCharCode(i+48)).disabled=false; 
  }
  
  function hilfebuttons_bgweiss() {
    for (var i=1;i<10;i++)
	  document.getElementById("H"+i).style.backgroundColor="white";
  }
