  // Progamm zu Squiggly Sudoku auf www.mathematik.ch
  // 26.10.2020 Warnung, falls bei Lösungssuche anziter ueberschritten
  // copyright Bernhard Berchtold

    const version="3.9.6";
	var W,H;
	var cellw;
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
	var solut=new Array(9);    // char  Lösung
	for (i=0;i<9;i++)
		solut[i]=new Array(9);
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
    var xCur=0; var yCur=0;
    var xNew=0; var yNew=0;
	var Nummer="";  // Nummer der aktuellen Problemstellung (falls es sie gibt); wird dann bei Gelöst und Gratuliere angezeigt
    var create=false;
    var comp;   // computer löst puzzle
    var unloesbar;
	var help=false;
    var ctx;
	var digit=6;
	var savemessage="";  // aktueller Inhalt von message wird bei save_user hier gespeichert und bei load_user wieder geladen; auch verwendet bie create, falls neue Boxstruktur
	var savemessageBox="";  // aktueller Inhalt von Boxmessage kann gespeichert und später so geladen werden
	var block = new Array(9);   // aktuelle Struktur
	var block6nr = new Array(9);  // für neu gespeicherte Strukturen in 6x6
	for (i=0;i<9;i++)
		block6nr[i]=["","","","","",""];
	var block9nr = new Array(9);  // für neu gespeicherte Strukturen in 9x9
	for (i=0;i<9;i++)
		block9nr[i]=["","","","","","","","",""];
	var block6gel = new Array(9);  // für Speicherung blockgelungen in neuen Problemen
	var block9gel = new Array(9);  // für Speicherung blockgelungen in neuen Problemen
	var blockuser=["","","","","","","","",""];  //zum Speichern der Situation durch user
	var anzblock=0;  // für die Anzahl Blöcke bei create durch user
	var zushg=true; // beim Erstellen neuer Boxstruktur: false, falls Box nicht mehr zusammenhängend sein kann
	var bnr=0;  // 0 ist symmetrisch, 1 und 2 asymmetrisch, 10 ist eigener Block des users
	var bnruser=0;  //zum Speichern der Situation durch user
	var anzcreate=0;  // Anzahl createversuche
	var neueBoxstruktur=false;  // true, wenn user oder Comp neue Boxstruktur erstellt hat
	var erfolgstruktur=true;  // falls aktuelle Struktur mind eine eindeutige Problemstellung erlebt hat
	var blockgelungen; // gibt diejenige Blocknr (0..digit) an, bei der nach Füllung der ersten digit Ziffern create gelungen ist
	const farbe=["#FFFF00","#DAA520","#BC8F8F","#EEE8AA","#BDB76B","#FFD700","#FFFFE0","#FFE5D5","#FFA07A"];
	var vert6 = new Array(9);  // für Laden der neu entstandenen Probleme  (wird dann zweifacher array)
	for (i=0;i<9;i++)
		vert6[i]=new Array(6);
	var vert9 = new Array(9);  // für Laden der neu entstandenen Probleme  (wird dann zweifacher array)
	for (i=0;i<9;i++)
		vert9[i]=new Array(9);
	var eingabeprob=false;  // true, falls user Ziffern für eigene Problemstellung eingibt -> dann button 1-deut? sichtbar
	var probfull="Sie haben bereits 9 neue Probleme gespeichert.<br>Sie können <input type=\"button\" onclick=\"removenp9(6)\" value=\"np9 entfernen\"> und dann das aktuelle Problem speichern.";
    var warnung=false;  // true, falls Lösung nicht gefunden werden kann

window.onload=init;

  function init() {
    canvas1 = document.getElementById('myCanvas');
	W = canvas1.width;
	H = canvas1.height;
	cellw=Math.floor(W/digit);
	canvas1.addEventListener('click', function(evt) {
	  var W1=canvas1.offsetWidth;
	  var cellw1=Math.floor(W1/digit);
      var mousePos = getMousePos(canvas1, evt);
      var x=mousePos.x; var y=mousePos.y;
      xNew = Math.floor(x / cellw1);
      yNew = Math.floor(y / cellw1);
      if (xNew < 0 || yNew < 0 || xNew > digit-1 || yNew > digit-1)
        return;
      if (bnr!=10) {getInfo(); zeichne();} else zeichneBlock();
    }, false);
    ctx = canvas1.getContext('2d');
	document.getElementById("Loa").disabled=true;
	erzeugeBloecke(0);
	problem(rand(3)+1);
  }

  function initPuzzle() {
    clearf();
	if (!create) {
	  document.getElementById("zifferbuttons").style.display = "block";
	  document.getElementById("steuerbuttons1").style.display = "block";
	  document.getElementById("steuerbuttons2").style.display = "block";
	  document.getElementById("chb3u4").style.display = "block";
	  document.getElementById("bNBCle").style.display = "block";
	}
  }

  function clearf() {
	document.getElementById("uploadInfo").innerHTML="";
	document.getElementById("Resultat").innerHTML="";
	document.getElementById("Antwort").innerHTML="";
	document.getElementById("messageBox").innerHTML="";
	document.getElementById("wahl").selectedIndex="0";
    document.getElementById("right").style.display = "none";	
	if (bnr==10) {  // falls während erzeugeStruktur() Clear-Button gedrückt wird
	   bnr=0;  // symm Struktur   
	   erzeugeBloecke(0);
	   document.getElementById("steuerbuttons2").style.display="inline-block";
	   document.getElementById("bNBCle").style.display="none";
	}
    for (var i=0;i<digit;i++) {
	    for (var j=0;j<digit;j++)
          { sol[i][j] = ' ';
            locked[i][j] = false;
            for (var i1 =0;i1<digit;i1++)
                forbidden[i][j][i1] = false;
          }
        }
	if (digit==6) document.getElementById("9x9").checked=false;
	xNew=0; yNew=0;
    comp=false; help=false;  //create=false; 
	if (!eingabeprob) {
	  document.getElementById("Sol").disabled=false;
	  backIndex = 0;
	  document.getElementById("zifferbuttons").style.display="none";
	  document.getElementById("steuerbuttons1").style.display="none";
	  document.getElementById("Show").checked=false;
	  document.getElementById("Hilfe").checked=false;
	  hilfebuttons_bgweiss();
	  deaktiviere_hilfebuttons();
	  document.getElementById("testeind").style.display="none";
	  if (neueBoxstruktur) {document.getElementById("message").innerHTML="<b>Create oder CreateUser</b>";}
	  else 
	   {document.getElementById("message").innerHTML="<b>Create, CreateUser oder Auswahl aus 'Prob'</b>";}
	}
    streiche(0);
  }  

 function OnChangeCheckbox3 (checkbox) {
	document.getElementById("wahl").selectedIndex="0";
	document.getElementById("probneu6").selectedIndex="0"; document.getElementById("probneu9").selectedIndex="0";
	document.getElementById("Loa").disabled=true;   // erst wieder aktiviert, wenn vorher 'Save' geklickt wird
	anzcreate=0;
    if (checkbox.checked) {
	  digit=9;
	  document.getElementById("prob6").style.display="none";
	  document.getElementById("prob9").style.display="inline";
	  document.getElementById("Z9x9").style.display="inline";
	  document.getElementById("H9x9").style.display="inline";
      probfull=probfull.replace("(6)","(9)");	  
	}
    else {
	  digit=6;
	  document.getElementById("prob6").style.display="inline";
	  document.getElementById("prob9").style.display="none";
	  document.getElementById("Z9x9").style.display = "none";
	  document.getElementById("H9x9").style.display = "none";
      probfull=probfull.replace("(9)","(6)");	  
	}
    erzeugeBloecke(bnr);
	cellw=Math.floor(W/digit);
	problem(rand(8)+1);   
	}

  function OnChangeCheckbox1 (checkbox) {
    help=checkbox.checked;
    getInfo();	
  }

  function OnChangeCheckbox2 (checkbox) {
	var i,j;
    if (checkbox.checked) aktiviere_hilfebuttons();
       else {deaktiviere_hilfebuttons();
             for (i=0;i<digit;i++)
               for (j=0;j<digit;j++)
                 help1[i][j]=false;
             zeichne();
	   }	
  }

  function erzeugeBloecke(nr) {
	var blocknr = new Array(9);
	unloesbar=false;
	if (digit==6) {
	  blocknr[0]=["000111021222","102030402131","504151324252","031323041405","243415253545","334353445455"];
	  blocknr[1]=["001020300131","404132423334","505152435344","112122132314","021203040515","245425354555"];
	  blocknr[2]=["001020212223","304050314132","010203040515","111213142425","333435455554","514252435344"];
	  blocknr[3]=["001011121314","010203040515","202122232434","253545444333","304050314151","324252535455"];
	  blocknr[4]=["001020011121","304050314151","021222031323","324252334353","041424051525","344454354555"];  // Standard-Sudoku
	  blocknr[5]=["001020213141","010203130414","051525353444","111222322324","304050515242","334353544555"];
	  blocknr[6]=["001020303121","010203040515","111222323334","131424232535","404151504243","445455455352"];
	  blocknr[7]=["001011212201","021213030405","151425354544","555453434241","243423333231","203040505152"];
	}
    else {
	  blocknr[0]=["001001112112223223","203040506031415142","708061718152627263","020313041424051506","334353344454354555","827383647484758586","251626360717270818","463747572838485868","655666766777877888"];	
	  blocknr[1]=["000111020313141516","102030211222232425","405031415161627263","607080718182738374","324252334353344454","040506071708182838","644555657585847686","352636465666273757","476777874858687888"];
	  blocknr[2]=["001020304001113112","020313142434441525","040506071626361737","081827283848474657","212232424123334353","354555546463655666","506070516152627273","586878886777878685","807181828374847576"];
	  blocknr[3]=["001020011121021222","031323041424051525","061626071727081828","304050606171727374","314151425262435363","323334354536463738","445464555647574858","657585848382818070","667686677787687888"];
	  blocknr[4]=["001020011121021222","304050314151324252","607080617181627282","031323041424051525","334353344454354555","637383647484657585","061626071727081828","364656374757384858","667686677787687888"];  // Standard-Sudoku
	  blocknr[5]=["001020304031413233","011121021222031304","051525140616260717","081828384858273757","232434445443534555","353646566647656474","425251506070806171","627282816373838485","677787768675687888"];
	  blocknr[6]=["000111121303021020","040515252636354546","060708182827171638","142423223242526263","213141403051506070","333444435354556564","374748586867777888","566676868757758584","617181807282837374"];
	  blocknr[7]=["001011212212132333","010203041415162627","050607171808283837","203031414050607080","242535364645555657","324252536373747576","344443546465666777","474858687888878685","516171818272628384"];
	}
	for (var i=0;i<digit;i++) { 
	  block[i]=blocknr[nr][i];
	  }
  }

  function markiereBoxrand() {
	var a,b,c;
	for (var i=0;i<digit;i++)
      for (var j=0;j<digit;j++) {
		a=findeBoxnr(i,j);
	    if (i<digit-1) b=findeBoxnr(i+1,j);
		if (j<digit-1) c=findeBoxnr(i,j+1);
		if ((b!=a) && (i<digit-1)) line(cellw*(i+1),cellw*j,cellw*(i+1),cellw*(j+1));   // vertikal 
	    if ((c!=a) && (j<digit-1)) line(cellw*i,cellw*(j+1),cellw*(i+1),cellw*(j+1));   // horizontal
	  } 
  }
  
  function streiche(nr) {
    var i,j,i1,j1,hi;
    c = String.fromCharCode(48+nr);
    for (i=0;i<digit;i++)
      for (j=0;j<digit;j++)
        help1[i][j]=false;
         // Zeile  und Kolonne
    if (nr>0) {
      for (i=0;i<digit;i++)
        for (j=0;j<digit;j++) {
           if (sol[i][j]!=' ') help1[i][j]=true;
           if (sol[i][j]==c) {
              for (i1=0;i1<digit;i1++) {
                  help1[i1][j]=true;         // Zeile
                  help1[i][i1]=true;         // Kolonne
              }
              // 9-er Box     für 6x6; 6-er Box
			  hi=findeBoxnr(i,j);
			  for (var hilf1=0;hilf1<digit;hilf1++) { 
	            i1=parseInt(block[hi].charAt(2*hilf1)); 
                j1=parseInt(block[hi].charAt(2*hilf1+1));
		        help1[i1][j1]=true;
	          }
           }
        }
    }
	zeichne();
 }

  function lock() {
    for (var i=0;i<digit;i++)
      for (var j=0;j<digit;j++) locked[i][j] = (sol[i][j] != ' ');
	zeichne();	
    }

  function richtig() {  // vergleicht aktuelle Stellung sol[i][j] mit Lösung prob[i][j]
	for (var i=0;i<digit;i++)
        for (var j=0;j<digit;j++)
           if (sol[i][j]!=' ' && sol[i][j]!=solut[i][j]) { 
			  document.getElementById("Antwort").innerHTML="Leider falsch";
			  canvas1.focus();
			  return;
			}
    document.getElementById("Antwort").innerHTML="Alles korrekt!";
    canvas1.focus();	
  }
  
  function zeichne() {
    ctx.clearRect(0,0,W,H);	
    ctx.font="20px Arial";
	ctx.lineWidth = 2;
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
        }
	    ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 3;
		ctx.rect(1,1,cellw*digit,cellw*digit);
		markiereBoxrand();
		ctx.stroke();	
  }

  function zeichneBlock() {  // user erzeugt neue Boxstruktur; bnr=10
    ctx.clearRect(0,0,W,H);
    for (var i=0;i<digit;i++)
        for (var j=0;j<digit;j++) { 	 
		  if (i==xNew && j==yNew) {
			 if (findeBoxnr(i,j)==-1) {
				if (i>0) var li=findeBoxnr(i-1,j);
				if (i<digit-1) var re=findeBoxnr(i+1,j);
				if (j>0) var ob=findeBoxnr(i,j-1);
				if (j<digit-1) var un=findeBoxnr(i,j+1);
				if (li==anzblock || re==anzblock || ob==anzblock || un==anzblock || !zushg || block[anzblock]=="") {
				  block[anzblock]=block[anzblock]+i+""+j;
				  zushg=true;
				  var feldnr=block[anzblock].length/2+1;  //nächstes Feld
				  if (feldnr<digit+1) document.getElementById("messageBox").innerHTML="<b>Fügen Sie Feld "+feldnr+" der Box "+(anzblock+1)+" hinzu.</b>";
				    else document.getElementById("messageBox").innerHTML="<b>Fügen Sie Feld 1 der Box "+(anzblock+2)+" hinzu.</b>";
				  if ((block[anzblock].length<2*digit) && (freieNachbarn(i,j)==0)) {
					// gibt es ein anderes Feld des gleichen Blocks, das noch ein NachbarLeerfeld hat?
					var ja=false;
					for (var hilf1=0;hilf1<block[anzblock].length/2-1;hilf1++) { 
                      var ihi=parseInt(block[anzblock].charAt(2*hilf1)); 
                      var jhi=parseInt(block[anzblock].charAt(2*hilf1+1));
                      if (freieNachbarn(ihi,jhi)>0) {ja=true;}
					}
					if (!ja) { zushg=false;
					  document.getElementById("messageBox").innerHTML="<b>Keine freien Nachbarn mehr.</b> Ev. gelingt Create später nicht, da kein eindeutiges Problem für diese Struktur existiert.";
					  document.getElementById("messageBox").innerHTML+="<br><br><b>Fügen Sie Feld "+feldnr+" der Box "+(anzblock+1)+" hinzu.</b>";
					}
				  }					
				}
			 }
          }				 
		  ctx.beginPath();
          ctx.strokeStyle = "gray";
          ctx.rect(cellw*i,cellw*j,cellw,cellw);
		  ctx.stroke();
        }	    
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.rect(1,1,cellw*digit,cellw*digit);
	ctx.stroke();
	for (var k=0;k<=anzblock;k++) faerbeBlock(k);
	if ((block[anzblock].length==2*digit) && (anzblock<digit-1)) {anzblock++;}
	if (anzblock==digit-1) {
		// letzten Block durch Computer bestimmen
	  for (var i=0;i<digit;i++)
        for (var j=0;j<digit;j++) {
		  var hilf=findeBoxnr(i,j);
		  if (hilf==-1) block[anzblock]=block[anzblock]+i+""+j;
		}
	  bnr=1;  // oder bnr=2;   ev weglassen?
	  blockgelungen=10; erfolgstruktur=false; neueBoxstruktur=true;
	  document.getElementById("messageBox").innerHTML="";
	  document.getElementById("message").innerHTML="";
	  document.getElementById("message").innerHTML="<b>Create oder CreateUser</b>";
	  document.getElementById("steuerbuttons2").style.display = "inline-block";
	  zeichne();
	  clearf();
	}
  }

function compzeichneBlock() {
    ctx.clearRect(0,0,W,H);
	while (anzblock<digit) {  // erzeuge nun block[anzblock]
      // suche erstes Leerfeld von links, das einen freien Nachbar hat
	  for (var i=0;i<digit;i++)
		  for (var j=0;j<digit;j++) {
			  if ((findeBoxnr(i,j)==-1) && (freieNachbarn(i,j)>0))  { // was, wenn es das nicht mehr gibt?
				block[anzblock]=i+""+j; j=digit; i=digit;  
			  }
		  }
		if (block[anzblock]=="") { // immer noch leer, also keine freien Nachbarn mehr
		  return false;
		}		
	  do {
	  var hilf=block[anzblock].length/2-1;
	  var i=parseInt(block[anzblock].charAt(2*hilf)); var j=parseInt(block[anzblock].charAt(2*hilf+1)); // letztes besetztes Feld
	  if (freieNachbarn(i,j)>0) {
		  setzeFeld(i,j);	  
	    }	
	  else {
		  // gibt es ein anderes Feld des gleichen Blocks, das noch ein NachbarLeerfeld hat?
			var ja=false;
			for (var hilf1=0;hilf1<block[anzblock].length/2-1;hilf1++) { 
                var ihi=parseInt(block[anzblock].charAt(2*hilf1)); 
                var jhi=parseInt(block[anzblock].charAt(2*hilf1+1));
                if (freieNachbarn(ihi,jhi)>0) {ja=true;
				  setzeFeld(ihi,jhi);
				  hilf1=block[anzblock].length/2-1;
				}
			}
			if (!ja) { return false;}  // gibt keine freien Nachbarn mehr    
	  }  
	 
	 }
	 while (block[anzblock].length<2*digit);
	anzblock++; 
	}
	anzblock=digit-1;
	return true;
  }

  function setzeFeld(a,b) {
	var erfolg=false;
	while (!erfolg) {
	  var hilf=rand(4);
	  switch(hilf) {
        case 0: if (a>0) var li=findeBoxnr(a-1,b);
		        if (li==-1) {block[anzblock]=block[anzblock]+(a-1)+""+b; erfolg=true;}
		break;
		case 1: if (a<digit-1) var re=findeBoxnr(a+1,b);
		        if (re==-1) {block[anzblock]=block[anzblock]+(a+1)+""+b; erfolg=true;}
		break;
		case 2: if (b>0) var ob=findeBoxnr(a,b-1);
		        if (ob==-1) {block[anzblock]=block[anzblock]+a+""+(b-1); erfolg=true;}
		break;
		case 3: if (b<digit-1) var un=findeBoxnr(a,b+1);
		        if (un==-1) {block[anzblock]=block[anzblock]+a+""+(b+1); erfolg=true;}
		break;		  
	  }		
	}  
  }

  function faerbebloecke() {
	for (var hilf=0;hilf<digit;hilf++) {
	  ctx.beginPath();
	  ctx.fillStyle = farbe[hilf];
	  for (var hilf1=0;hilf1<digit;hilf1++) {  
        var i=parseInt(block[hilf].charAt(2*hilf1));
        var j=parseInt(block[hilf].charAt(2*hilf1+1));
        ctx.rect(cellw*i+1, cellw*j+1, cellw-2, cellw-2);    // noch füllen
	  }
	  ctx.fill();
    }	  
  }

  function findeBoxnr(i,j) {
	// Feld (i,j) ist in welcher Box? Finde Box Nr hilf
	var hilf=-1;
    var a=0;
	while (a<digit) {
	   for (var hilf1=0;hilf1<digit;hilf1++) {
	     if ((parseInt(block[a].charAt(2*hilf1))==i) && (parseInt(block[a].charAt(2*hilf1+1))==j)) {return a;} 
       }
       a++;
	}
    return hilf;   // hilf ist -1, falls Feld (i,j) in keinem Block	
  }

  function erzeugeStruktur() {  
	bnr=10; anzblock=0; anzcreate=0;
	document.getElementById("chb3u4").style.display = "none";
	document.getElementById("zifferbuttons").style.display = "none";
	document.getElementById("steuerbuttons1").style.display = "none";
    document.getElementById("steuerbuttons2").style.display = "none";
    document.getElementById("message").innerHTML="Klicken Sie auf die Felder, die zur Box hinzugefügt werden sollen. Sie können nur Felder zu einer Box hinzufügen, die Nachbar eines existierenden Feldes der Box sind, ausser es gibt keine freien Nachbarn mehr.<br>";
	document.getElementById("message").innerHTML+="Sie sollten darauf achten, keine eingeschlossenenen Leerfelder zu erzeugen.<br>";
	document.getElementById("message").innerHTML+="Die letzte Box wird vom Computer hinzugefügt.<br><br>";
	document.getElementById("message").innerHTML+="'NeueBoxstruktur User' startet den Prozess neu.<br>";
	document.getElementById("message").innerHTML+="'Clear' bricht den Prozess ab und ladet Boxstruktur von p1.<br>";
	for (var i=1;i<digit;i++) block[i]=""; 
	block[0]="00"; //Start immer oben links
	xNew=0;yNew=0; document.getElementById("messageBox").innerHTML="<b>Fügen Sie Feld 2 der Box 1 hinzu</b>";
	zeichneBlock();
  }

function comperzeugeStruktur() {
	document.getElementById("zifferbuttons").style.display = "none";
	document.getElementById("steuerbuttons1").style.display = "none";
    document.getElementById("steuerbuttons2").style.display = "none";
	document.getElementById("bNBCle").style.display = "none";
	anzcreate=0; blockgelungen=10; erfolgstruktur=false;
	var zaehler=0;
	bnr=1; // damit nicht symm Struktur bleibt, falls vorher bnr=0
	document.getElementById("NBsC").disabled=true;
	do {
		anzblock=0;
		for (var i=0;i<digit;i++) block[i]="";
		var success=compzeichneBlock();
		if (!success) zaehler++;
	}
	while (!success && (zaehler<400));
    document.getElementById("NBsC").disabled=false; 
	for (var i=0;i<digit;i++)
      for (var j=0;j<digit;j++) {	  
		ctx.beginPath();
        ctx.strokeStyle = "gray";
        ctx.rect(cellw*i,cellw*j,cellw,cellw);
		ctx.stroke();
      }	    
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.rect(1,1,cellw*digit,cellw*digit);
	ctx.stroke();
	document.getElementById("messageBox").innerHTML="";
	document.getElementById("message").innerHTML="";
	if (zaehler==400) {
		document.getElementById("message").innerHTML="Konnte Boxstruktur nicht erzeugen.<br> Klicken Sie nochmals auf 'NeueBoxstruktur Computer'";}
	  else {
        document.getElementById("steuerbuttons2").style.display = "inline-block";
		neueBoxstruktur=true; 
		blockgelungen=10;   // noch unbekannt, welcher Block der Struktur für Setzung der digit Ziffern bei create taugt
		for (var k=0;k<=anzblock;k++) faerbeBlock(k);
		document.getElementById("message").innerHTML="<b>Create oder CreateUser</b>";
		clearf();
	  }
  }

  function freieNachbarn(i,j) {
	var anzahl=0;
    if ((i>0) && (findeBoxnr(i-1,j)==-1)) anzahl++;
	if ((i<digit-1) && (findeBoxnr(i+1,j)==-1)) anzahl++;
	if ((j>0) && (findeBoxnr(i,j-1)==-1)) anzahl++;
	if ((j<digit-1) && (findeBoxnr(i,j+1)==-1)) anzahl++;
	return anzahl;
  }

  function faerbeBlock(hilf) {
	ctx.beginPath();	
	ctx.fillStyle = farbe[hilf];
	for (var hilf1=0;hilf1<block[hilf].length/2;hilf1++) { 	
       var i=parseInt(block[hilf].charAt(2*hilf1)); 
       var j=parseInt(block[hilf].charAt(2*hilf1+1));
       ctx.rect(cellw*i+1, cellw*j+1, cellw-2, cellw-2);    // noch füllen
	}   
	ctx.fill(); 
  }
	  
  function proof(i,j,c)
    { var hilf;
      // Zeile
      for (var i1 = 0; i1 < digit; i1++)
        if (sol[i1][j] == c) {return false;}
      // Kolonne
      for (var j1 = 0; j1 < digit; j1++)
        if (sol[i][j1] == c) {return false;}
      // 9-er Box     für 6x6; 6-er Box
      hilf=findeBoxnr(i,j);
	  for (var hilf1=0;hilf1<digit;hilf1++) { 
	    i1=parseInt(block[hilf].charAt(2*hilf1)); 
        j1=parseInt(block[hilf].charAt(2*hilf1+1));
		if (sol[i1][j1] == c) {return false;}
	  }
      return true;
    }

  function possibilities(i,j)  // zählt die Setzungsmögl. in einem String auf
    {
      var poss="";
      if (locked[i][j]) return "       ";
      for (var d = 0; d < digit; d++)
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
      for (var d = 0; d < digit; d++)
        if (comp) {if (proof(i,j,String.fromCharCode(49+d)) && !forbidden[i][j][d]) anzahl++;}
          else  {if (proof(i,j,String.fromCharCode(49+d)))  anzahl++;}
      return anzahl;
    }
    
  function eingabe(z) {
	if (digit*digit==anzleere() && !eingabeprob) return;
	if (z==0 && !locked[xNew][yNew]) {
		sol[xNew][yNew]=' ';
		hilfebuttons_bgweiss();
		if (document.getElementById("Show").checked) getInfo();
		zeichne();
		document.getElementById("Antwort").innerHTML="";
		return;
		}
	var k = z+48;
	document.getElementById("Sav").disabled=false;
	if (eingabeprob) hinweisEingabe();
	if (setvalue(xNew,yNew,String.fromCharCode(k))) {
      if (document.getElementById("Hilfe").checked) {
		 streiche(z);
		 hilfebuttons_bgweiss();
	     document.getElementById("H"+z).style.backgroundColor="LightGreen";
	  }
	  if (!eingabeprob) document.getElementById("right").style.display="inline-block";
	  document.getElementById("Resultat").innerHTML="";
	  document.getElementById("Antwort").innerHTML="";
	  document.getElementById("messageBox").innerHTML="";
	  zeichne();
      getInfo();
      if (solved()) {
		document.getElementById("Hilfe").checked=false;
		OnChangeCheckbox2 (document.getElementById("Hilfe"));
		document.getElementById("message").innerHTML="<b>"+Nummer+" gelöst. Gratuliere!</b><br><br>Klick auf 'Create' versucht eine neue Problemstellung für diese Boxstruktur zu finden.";
        document.getElementById("zifferbuttons").style.display = "none";
		document.getElementById("steuerbuttons1").style.display="none";
		document.getElementById("right").style.display="none";
		zeichne();
	  }
    }
  }

  function hinweisEingabe() {
	document.getElementById("Sol").disabled=true;  // Solve-Button deaktiviert
	document.getElementById("testeind").style.display="inline-block";  // user gibt Ziffern in leeres Feld ein
	document.getElementById("message").innerHTML="Geben Sie die Ziffern ein und prüfen Sie die Stellung auf Eindeutigkeit.<br>";
	if (document.getElementById("probneu"+digit).length<10) document.getElementById("message").innerHTML+="Sobald sie eindeutig ist, erscheint der Button 'Save aktuelles ...' und Sie können sie unter 'Probneu' speichern.";
      else document.getElementById("message").innerHTML+="Bereits 9 Probleme in 'Probneu' vorhanden. Sie können das Problem später nur speichern, wenn Sie dann das aktuelle np9 entfernen.";	
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
  
  function keyPress(k) {   
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
			  document.getElementById("Antwort").innerHTML="";
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
		    if (digit*digit==anzleere() && !eingabeprob) return;
			c=String.fromCharCode(k);		
            if ((k>48+digit || k<49) && c != ' ') return;
			if (eingabeprob) hinweisEingabe();
			document.getElementById("Sav").disabled=false;
            if (setvalue(xNew,yNew,c)) {
              if (document.getElementById("Hilfe").checked) {
		        streiche(k-48);
		        hilfebuttons_bgweiss();
	            document.getElementById("H"+c).style.backgroundColor="LightGreen";
				getInfo();
	          }
			  if (!eingabeprob) document.getElementById("right").style.display="inline-block";
			  document.getElementById("Resultat").innerHTML="";
			  document.getElementById("Antwort").innerHTML="";
			  document.getElementById("messageBox").innerHTML="";
			  if (solved()) {
				document.getElementById("Hilfe").checked=false;
				OnChangeCheckbox2 (document.getElementById("Hilfe"));
				document.getElementById("message").innerHTML="<b>"+Nummer+" gelöst. Gratuliere!</b><br><br>Klick auf 'Create' versucht eine neue Problemstellung für diese Boxstruktur zu finden.";
			    document.getElementById("zifferbuttons").style.display = "none";
				document.getElementById("steuerbuttons1").style.display="none";
				document.getElementById("right").style.display="none";
			  }
			}	
            break;			
        }
        if (bnr<10) zeichne();   // falls bnr=10, so erzeugt user neue Blockstruktur, also nichts zeichnen
    }

  function setvalue(i,j,c){
	var k=c.charCodeAt(0);
    if (k<49 || k>48+digit) return false;
    if (locked[i][j]) return false;
    if (comp && (sol[i][j] != ' ')) return false;
    if (forbidden[i][j][parseInt(c)-1]) return false;
    if (proof(i,j,c)) {
        xCur=i;yCur=j;xNew=i;yNew=j;
        back[backIndex] = digit*xCur+yCur;
        backIndex++;
        sol[xCur][yCur] = c;
        if (comp) forbidden[xCur][yCur][parseInt(c)-1]= true;
        return true;
    }
    return false;
  }
 
  // get row from cell number
  function getrow(cell) {
      return Math.floor(cell%digit);
    }

  // get column from cell number
  function getcol(cell) {
      return Math.floor(cell/digit);
    }

  // get cell number from row and col
  function getcell(col,row) {
      return (digit*col+row);
    }

  function possible_move() {
    // Gibt es ein leeres Feld, das nicht mehr besetzt werden kann? -->false
      for (var i1 = 0; i1 < digit; i1++)
        { for (var j1 = 0; j1 < digit; j1++)
           if (sol[i1][j1] == ' ' && count(i1,j1)==0) { return false;}
        }
        return true;
    }

  function setting() {
     var d=0; var isetz=-1; var jsetz=-1;
     var success=false; var success1=false;
     var success2=false; var success3=false; var success4=false;
     if (solved()) return;
     if (unloesbar) return;
     comp=true;
     // Gibt es ein leeres Feld, das nicht mehr besetzt werden kann? Wenn ja -->backtrack
     if (!possible_move())  backtrack();
     // Gibt es ein Feld, das mit genau einer Ziffer zu besetzen ist?
     for (var i1 = 0; i1 < digit; i1++)
      for (var j1 = 0; j1 < digit; j1++) {
         var counthilf=count(i1,j1);
         if (counthilf==1) {
           success=true; isetz=i1; jsetz=j1; i1=9; j1=9;
         }
         if (counthilf==2 && !success) {
           success2=true; isetz=i1; jsetz=j1;
         }
         if (counthilf==3 && !success && !success2) {
           success3=true; isetz=i1; jsetz=j1;
         }
         if (counthilf==4 && !success && !success2 && !success3) {
           success4=true; isetz=i1; jsetz=j1;
         }
       }
     var anzahl=0;
	 var i=0;
     do {
        if (!success && !success2 && !success3 && !success4 ) {    // auf Zufallsfeld setzen
          do {i=rand(digit*digit);}
            while (sol[getcol(i)][getrow(i)]!=' ');
          isetz=getcol(i);  jsetz=getrow(i);
        }
        d=0;
        do {
            if (!forbidden[isetz][jsetz][d])
              success1=setvalue(isetz,jsetz,String.fromCharCode(49 + d));
            d++;
           }
           while (d<digit && !success1);
           success=false; success2=false; success3=false; success4=false; anzahl++;
        } while (!success1 && anzahl<100);     // willkürliche Setzung
        if (anzahl==100) {unloesbar=true; return;}  // Setzung wahrscheinlich unmöglich
   }

  function anzleere() {
    var anz=0;
    for (var i=0;i<digit;i++) {
	  for (var j=0;j<digit;j++)
        if (sol[i][j]==' ') anz++;
      }
    return anz;
   }
   
  function solved() {
    for (var i=0;i<digit;i++)
        {for (var j=0;j<digit;j++)
           if (sol[i][j]==' ') return false;
        }
    return true;
    }
   
  function create1() {
     var R=new Array(digit);
     var i;
     var success;
	 comp=true; create=true;
     initPuzzle();    // hier wird Variable block besetzt;
     var hilf; // asymm 1:Zufallszuordnung: 6 bzw. 9 Ziffern in block[3], symm: in block[0], sonst Zufallsblock 0..digit
	 // hilf mit demjenigen Block besetzen, der schon mal zum Erfolg geführt hat -> globale Variable blockgelungen
	 if (bnr==0) hilf=0;
	 if (bnr>0) {if (blockgelungen<10) hilf=blockgelungen; else hilf=rand(digit);}
	 var zaehler=1;
	 do {   
       R = permutation();
       for (i=0;i<digit;i++) {
         var i1=block[hilf].charAt(2*i); 
         var j1=block[hilf].charAt(2*i+1);
         setvalue(i1,j1,String.fromCharCode(49 + R[i]));
       }
       success = dosolve();   // immer wahr? nicht für block0 in 9x9 !
	   if (!success) zaehler++;
	 }
	 while (!success && zaehler<10);
	 unloesbar=(zaehler==10);
	 if (success) blockgelungen=hilf;
   }

  function permutation() {
    var R=new Array(digit);
    R[0]=rand(digit);
    var anzahl=1;
    while (anzahl<digit) {
      R[anzahl]= rand(digit);
      for (var i=0; i<anzahl; i++)
         if (R[anzahl]==R[i]) i=anzahl+1;
      if (i==anzahl) anzahl++;
    }
    return R;
  }

  function speichern_in_prob() {
     // zwischenspeichern in prob
    for (var i=0;i<digit;i++)
      for (var j=0;j<digit;j++) prob[i][j]=sol[i][j];
    }

  function speichern_in_solut() {
	for (var i=0;i<digit;i++)
      for (var j=0;j<digit;j++) solut[i][j]=sol[i][j];  
  }

  function eindeutig(){  // sucht vom aktuellen Brett eindeutige Lösung (bei create durch Comp)
     var success;
     var i1,j1,d;
     save();
     success=dosolve();    // immer wahr!?
     speichern_in_prob();
     load();
     trials=0;
     do {
        success=false;
        // testen auf eindeutige Lösbarkeit des aktuellen Brettes
        // leere Felder mit mehr als 1 Mögl mit anderer Zahl füllen als urspr Lösung
        // falls Lösung möglich, dann diese als neue Lösung testen
        // alle Felder mit Mögl > 1 suchen
        for (var i=0;i<digit;i++)
            {for (var j=0;j<digit;j++)
               if (count(i,j)>1) {
                 i1=i; j1=j;
                 // andere als urspr Lösung suchen
                 for (d=0;d<digit;d++) {
                   if (d==parseInt(prob[i1][j1])-1) d++;
                   if (setvalue(i1,j1,String.fromCharCode(49 + d))) {
                    // loesbar mit diesem neuen Wert?
                      locked[i1][j1]=true;
                      success = dosolve();
                      if (success) {
                        speichern_in_prob();
                        load();
                        setvalue(i1,j1,String.fromCharCode(49 + d));
                        d=digit;i=digit;j=digit;
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
      // bis keine andere Lösung mehr möglich
  }

  function docreate() {  // ausgelöst von Klick auf button Create
	document.getElementById("messageBox").innerHTML="";
    document.getElementById("zifferbuttons").style.display = "none";
	document.getElementById("steuerbuttons1").style.display = "none";
	document.getElementById("chb3u4").style.display = "none";
	document.getElementById("bNBCle").style.display = "none";
	document.getElementById("testeind").style.display = "none";
	unloesbar=false;
	document.getElementById("wahl").selectedIndex = "0";
	document.getElementById("message").innerHTML="Geduld! Ich versuche, eine eindeutige Problemstellung für diese Boxstruktur zu finden.<br>Falls gelungen, erscheint hier die Anzahl Ziffern, sonst erscheint eine Meldung des Misserfolgs.";
	var timer = setTimeout(function(){docreate1()},20);
  }

  function docreate1() {
    var anz,anz1,anz2,d,i1,j1;
    var anz1=25; var anz2=29;
    create1();   // dort wird create auf true gesetzt
	if (unloesbar) {
	  document.getElementById("chb3u4").style.display = "inline-block";
	  document.getElementById("bNBCle").style.display = "inline-block";
	  create=false;
      comp=false;
	  document.getElementById("message").innerHTML="<b>Create nicht gelungen!</b><br>Klicken Sie nochmals auf Create.";
	  anzcreate++;
	  if (anzcreate>4) {  // bei bnr==0 ist symm.Struktur: benötigt manchmal auch mehrere Createversuche 
		document.getElementById("message").innerHTML="<b>Create nicht gelungen!</b>";  
		if (erfolgstruktur) document.getElementById("messageBox").innerHTML="Eindeutige Problemstellung ist für diese Struktur schon mal gelungen, aber schwierig zu finden.<br>Wählen Sie nochmal 'Create' falls Sie noch Geduld haben, sonst 'NeueBoxstruktur...' oder ein Problem aus 'Prob'.<br>";
		else
	      document.getElementById("messageBox").innerHTML="Eindeutige Problemstellung ist für diese Struktur eventuell unmöglich.<br>Wählen Sie 'NeueBoxstruktur...' oder ein Problem aus 'Prob'.<br>Sie können es aber auch noch einige Male mit 'Create' versuchen - vielleicht klappt es ja doch noch.<br>"; 
	  }
	  return;}
    save_user();
	var iter=0;
	if (digit==9) {anz1=50;anz2=54;}
    do {  // solange bis am Schluss Anzahl Leerfelder >= anz1
        load_user();
        //  anz2 zufällige Felder leeren
        anz=0;
        do {
           var i=rand(digit*digit);                // erzeugt Zahl von 0 bis digit*digit-1
           i1=getcol(i); j1=getrow(i);
           if (sol[i1][j1] != ' ') {
             sol[i1][j1] = ' ';
             for (d=0;d<digit;d++) forbidden[i1][j1][d]=false;
             anz++;
           }
        } while (anz<anz2);	
        eindeutig();   // sucht eindeutiges Brett
		iter++;
    }
    while (anzleere()<anz1 && iter<20);   // falls iter=20; Anzleere kann > als verlangt sein! Ist Probstellung dann eindeutig?
    save_user();
    create=false;
    comp=false;
	var anz=digit*digit-anzleere();
	document.getElementById("steuerbuttons2").style.display = "inline-block";
	document.getElementById("bNBCle").style.display = "inline-block";
	document.getElementById("chb3u4").style.display = "inline-block";
	if (iter<20) {
	  Nummer="aktuelles Problem: ";
	  document.getElementById("message").innerHTML="<b>"+Nummer+anz+" Ziffern</b>";
	  savemessage=document.getElementById("message").innerHTML;
	  anzcreate=0;
	  zeichne();
	  document.getElementById("Sav").disabled=false;
      // Falls noch kein Prob dieser Boxstruktur, so automatisch in save6neu bzw save9neu speichern
	  if (digit==6 && !erfolgstruktur) save6neu();
	  if (digit==9 && !erfolgstruktur) save9neu();
	  document.getElementById("zifferbuttons").style.display = "inline-block";
	  document.getElementById("steuerbuttons2").style.display = "inline-block";
		//Werte von sol in vert speichern
        vert=["","","","","","","","",""];
        for (var i=0;i<digit;i++) {
         for (var j=0;j<digit;j++)
           if (locked[i][j]) {
             vert[i] += sol[i][j];
           }
           else {
             vert[i] += ' ';
           }
        }
      dosolve();  // immer richtig, daher kein success=... Lösung jetzt in sol
      speichern_in_solut();  // Lösung jetzt in solut
	  initPuzzle();
      for (var i=0;i<digit;i++)  // sol wieder korrekt füllen mit Startwerten von prob
        for (var j=0;j<digit;j++) {  
          prob[i][j]=vert[i].charAt(j);
          if (prob[i][j]=='-') prob[i][j]=' ';
          locked[i][j] = setvalue(i,j,prob[i][j]);
        }		
    zeichne();
	document.getElementById("message").innerHTML=savemessage;
    if (!erfolgstruktur) {erfolgstruktur=true; document.getElementById("messageBox").innerHTML=savemessageBox;}
		else {
		  if (document.getElementById("probneu"+digit).length<10) {
			  document.getElementById("saveaktprob").style.display = "inline-block";
		      document.getElementById("messageBox").innerHTML="Sie können das Problem mit 'Save aktuelles Problem...' in 'Probneu' speichern";
		  }
		  else document.getElementById("messageBox").innerHTML=probfull;
	  }
    }
	else {
	  document.getElementById("zifferbuttons").style.display = "none";
	  document.getElementById("steuerbuttons1").style.display = "none";
	  document.getElementById("message").innerHTML="<b>Create nicht gelungen!</b><br>Klicken Sie nochmals auf Create.";
	 }
  }

  function solvebutton() {
	if (solved()) return;
	var success;
	document.getElementById("messageBox").innerHTML="";
      // alle vorhandenen Besetzungen absichern
	if (digit==9 && Nummer=="np9" && sol[0][1]=="4" && anzleere()==64) {
      for (var i=0;i<digit;i++)
        for (var j=0;j<digit;j++) sol[i][j] = solut[i][j];
	  success=true;}
      else {lock(); success = dosolve();}
    if (success) {
	  document.getElementById("message").innerHTML="<b>"+Nummer+" gelöst!</b><br><br>Klick auf 'Create' versucht eine neue Problemstellung für diese Boxstruktur zu finden.";
	  document.getElementById("zifferbuttons").style.display = "none";
	  document.getElementById("steuerbuttons1").style.display="none";
	  document.getElementById("right").style.display="none";
	  document.getElementById("Antwort").innerHTML="";
	  streiche(0);   // alle help[][] auf false
	  zeichne();
	}
       else {
          if (document.getElementById("message").innerHTML=="<b>zu wenig Zahlen</b>");  // kein weiterer Kommentar
              else {
				  if (warnung) document.getElementById("message").innerHTML="<b>Konnte Lösung nicht finden.</b>"
				  else 
				  document.getElementById("message").innerHTML="<b>unlösbar!</b>";
			  }
       }
  }

  function dosolve() {   //Versuch, vom aktuellen Status zu lösen
    if (solved()) return true;
    if (((digit==6) && (anzleere()>31)) || (anzleere()>72))
      {document.getElementById("message").innerHTML="<b>zu wenig Zahlen</b>"; return false; }
    var success=false;
	var anziter=5000;
	if (!create) anziter=30000;   // bei der Lösung von Standard-Sudoku mit 17 Zeichen müssen mind. 20000 gemacht werden
    comp=true;
    // alle vorhandenen Besetzungen gelockt!   falls von solvebutton und testeindeutig() herkommend
    var trials=0;
    do {
       setting();
       trials++;
       success=solved();
    }
    while (!success && !unloesbar && (trials<anziter));        // willkürliche Setzung 4000: sollte reichen ?? 20000 bei standard-Sudoku
    warnung= (trials==anziter);
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
           while (d<digit && !success);
    }

   if (!success) {
     do {
        xHilf=xCur; yHilf=yCur;
        backIndex--;
        xCur=getcol(back[backIndex]); yCur= getrow (back[backIndex]);
		if (typeof locked[xCur] == "undefined") {unloesbar=true;return;}  // Fall mit xCur=30 ??
        if (locked[xCur][yCur]) {unloesbar=true; return;}
        if (xHilf!=xCur || yHilf!=yCur) {
          for (d=0;d<digit;d++) forbidden[xHilf][yHilf][d]=false;
        }
        sol[xCur][yCur] =' ';
      }
      while (!possible_move() || unloesbar);
    }
  }

  function save() {              //verwendet in eindeutig() und testeindeutig()
    for (var i=0;i<digit;i++)
      for (var j=0;j<digit;j++) savesol[i][j] = sol[i][j];
    }

  function load() {              //verwendet in eindeutig()
    initPuzzle();
	if (!comp) document.getElementById("message").innerHTML="";
    for (var i=0;i<digit;i++)
      for (var j=0;j<digit;j++) locked[i][j] = setvalue(i,j,savesol[i][j]);
    }

   function richtig_load() {              //verwendet in richtig()
    initPuzzle();
    for (var i=0;i<digit;i++)
      for (var j=0;j<digit;j++) sol[i][j] = savesol[i][j];
    }

   function testload() {              //verwendet in testeindeutig()
    initPuzzle();  
    for (var i=0;i<digit;i++)
      for (var j=0;j<digit;j++) locked[i][j] = setvalue(i,j,savesol[i][j]);
    }

  function save_user() {    // auch in docreate1 verwendet
	bnruser=bnr;
	savemessage=document.getElementById("message").innerHTML;
	document.getElementById("Loa").disabled=false;
    for (var i=0;i<digit;i++) {
	  blockuser[i]=block[i];
      for (var j=0;j<digit;j++)
        if (locked[i][j]) {
             saveuser[i][j][0] = sol[i][j];
             saveuser[i][j][1] = ' ';
        }
        else {
          saveuser[i][j][0] = ' ';
          saveuser[i][j][1] = sol[i][j];
        }
    }
  }
  
  function load_user() {   // auch in docreate1 verwendet
	bnr=bnruser;
	initPuzzle();  // hier wird load-Button deaktiviert
	for (var i=0;i<digit;i++) block[i]=blockuser[i];
    for (var i=0;i<digit;i++) {
      for(var j=0;j<digit;j++) {
        if (saveuser[i][j][0] != ' ') locked[i][j] = setvalue(i, j, saveuser[i][j][0]);
        if (saveuser[i][j][1] != ' ') setvalue(i, j, saveuser[i][j][1]);
      }
	}
	zeichne();
	document.getElementById("message").innerHTML=savemessage;
	var pos = savemessage.lastIndexOf(':');
	Nummer=savemessage.substr(0,pos);
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
  
  function deaktiviere_hilfebuttons() {
	for (var i=1;i<digit+1;i++) {
	  document.getElementById("H"+String.fromCharCode(i+48)).disabled=true;
      document.getElementById("H"+i).style.backgroundColor="white";
    }	 
  }

  function aktiviere_hilfebuttons() {
	for (var i=1;i<digit+1;i++)
	 document.getElementById("H"+String.fromCharCode(i+48)).disabled=false; 
  }
  
  function hilfebuttons_bgweiss() {
    for (var i=1;i<digit+1;i++)
	  document.getElementById("H"+i).style.backgroundColor="white";
  }

  function save6neu() {  // Blockstruktur und Problem speichern; wird aufgerufen, sobald create gelungen ist
    if (eingabeprob) {document.getElementById("message").innerHTML=""; eingabeprob=false;}
    var x = document.getElementById("probneu6");
	var nr=x.length-1;
    if (nr==9) {
		document.getElementById("messageBox").innerHTML=probfull;
		savemessageBox=document.getElementById("messageBox").innerHTML;
		return;
	}   
	document.getElementById("messageBox").innerHTML="Problem ist unter 'Probneu' als np"+(nr+1)+" gespeichert.";
	savemessageBox=document.getElementById("messageBox").innerHTML;
	if (document.getElementById("message").innerHTML.indexOf("Save aktuelles")>-1) document.getElementById("message").innerHTML="";
    var option = document.createElement("option");
    option.text = "np"+(nr+1);
    x.add(option);
    block6gel[nr]=blockgelungen;     // blockgelungen speichern
	// Block speichern
	for (var i=0;i<digit;i++) block6nr[nr][i]=block[i];	
	//Werte von sol in vert6 als string speichern 
    vert6[nr]=["","","","","",""];
    for (var i=0;i<digit;i++) {
      for (var j=0;j<digit;j++)
        if (locked[i][j]) {
             vert6[nr][i] += sol[i][j];
        }
        else {
          vert6[nr][i] += ' ';
        }
    }
  }  
  
  function save9neu() {
	if (eingabeprob) {document.getElementById("message").innerHTML=""; eingabeprob=false;}
	var x = document.getElementById("probneu9");
	var nr=x.length-1;	
	if (nr==9) {
		document.getElementById("messageBox").innerHTML=probfull;
		savemessageBox=document.getElementById("messageBox").innerHTML;
		return;
	}
	document.getElementById("messageBox").innerHTML="Problem ist unter 'Probneu' als np"+(nr+1)+" gespeichert.<br>";
	savemessageBox=document.getElementById("messageBox").innerHTML;
	if (document.getElementById("message").innerHTML.indexOf("Save aktuelles")>-1) document.getElementById("message").innerHTML="";
    var option = document.createElement("option");
    option.text = "np"+(nr+1);
    x.add(option);
    block9gel[nr]=blockgelungen;     // blockgelungen speichern
	// Block speichern
	for (var i=0;i<digit;i++) block9nr[nr][i]=block[i];  	
	//Werte von sol in vert9 als string speichern
    vert9[nr]=["","","","","","","","",""];	
    for (var i=0;i<digit;i++) {
      for (var j=0;j<digit;j++)
        if (locked[i][j]) {
             vert9[nr][i] += sol[i][j];
        }
        else {
          vert9[nr][i] += ' ';
        }
    }	
  }

  function problemneu(nr) {
	if (nr==0) return;
	document.getElementById("probneu6").selectedIndex="0";
	document.getElementById("probneu9").selectedIndex="0";
	eingabeprob=false; document.getElementById("testeind").style.display="none";
	erfolgstruktur=true;				 
	document.getElementById("saveaktprob").style.display = "none";
    unloesbar=false;
	initPuzzle();
	if (digit==9) {
	  vert=vert9[nr-1];
	  blockgelungen=block9gel[nr-1]; // gesetzt bei saveneu
	  for (var i=0;i<digit;i++)  block[i]=block9nr[nr-1][i];	  
	}
	else problemneu6(nr);
	for (var i=0;i<digit;i++)
      for (var j=0;j<digit;j++) {  
        prob[i][j]=vert[i][j];
        if (prob[i][j]=='') prob[i][j]=' ';
        locked[i][j] = setvalue(i,j,prob[i][j]);
      }
	zeichne();
	Nummer="np"+nr;
	var anz=digit*digit-anzleere();
	document.getElementById("message").innerHTML="<b>Problem neu "+nr+": "+anz+" Ziffern</b>";
	if (digit==9 && Nummer=="np9" && sol[0][1]=="4" && anzleere()==64) {loesungMinimalprob();}
	else {var timer = setTimeout(function(){dosolution(vert,nr,anz)},20);}	
  }	
  
  function problemneu6(nr) { 	  
	vert=vert6[nr-1];
	blockgelungen=block6gel[nr-1]; 
    for (var i=0;i<digit;i++)  block[i]=block6nr[nr-1][i];
  }	

  function dosolution(vert,nr,anz) {
	dosolve();  // Lösung jetzt in sol
    speichern_in_solut();  // Lösung jetzt in solut
	initPuzzle();
    for (var i=0;i<digit;i++)  // sol wieder korrekt füllen mit Startwerten von prob
      for (var j=0;j<digit;j++) {  
        prob[i][j]=vert[i].charAt(j);
        if (prob[i][j]=='-') prob[i][j]=' ';
        locked[i][j] = setvalue(i,j,prob[i][j]);
      }
	zeichne();
	document.getElementById("message").innerHTML="<b>Problem neu "+nr+": "+anz+" Ziffern</b>";
  }  

  function usersaveneu() {
    document.getElementById("saveaktprob").style.display = "none";
	eingabeprob=false;
	document.getElementById("testeind").style.display = "none";
	document.getElementById("Resultat").innerHTML="";
    neueBoxstruktur=false;	
  	bnruser=bnr;
	save();
	if (digit==6) save6neu(); else save9neu();	
  }
  
  function dotest() {
	save_user();
	if (((digit==6) && (anzleere()>31)) || (anzleere()>72))
      {document.getElementById("message").innerHTML="<b>zu wenig Zahlen</b>"; return; }
    document.getElementById("testeind").style.display="none";
    document.getElementById("Resultat").innerHTML="<b>Ich teste...</b>";
	if (digit==9) document.getElementById("Resultat").innerHTML+="<b> Das dauert ein bisschen.</b>";
	var timer = setTimeout(function(){testeindeutig()},20);
  }

  function testeindeutig() {
	lock();
    save();  // Brett jetzt in savesol=sol
	unloesbar=false;
	var success=dosolve();   // immer richtig? Natürlich nicht!
	if (!success) {
		document.getElementById("Resultat").innerHTML="";
		document.getElementById("testeind").style.display="inline-block";
		load_user();
		if (warnung) document.getElementById("Resultat").innerHTML="<b>Test dauert zu lange</b>"
		else 
		document.getElementById("Resultat").innerHTML="<b>Problem unlösbar!</b><br>Korrigieren Sie die Stellung.";
		return;
	}
	speichern_in_prob();  // alle Felder von sol jetzt in prob
	// Suche leeres Feld und setze Ziffer, die nicht im Resultat von dosolve steht
	for (var i=0;i<digit;i++)
       for (var j=0;j<digit;j++) {     		   
          if (locked[i][j]==" ") {
			var k=1;
			do {
			  testload();
			  var c=String.fromCharCode(48+k);
			  if (c!=prob[i][j]) {
			  setvalue(i,j,c);
			  unloesbar=false;
	          success=dosolve();  // neue Lösung in sol
	          //vergleiche Schlussbretter
	          if (success) {
			    var gleich=vergleich();  // sol[i][j] mit prob[i][j];
				if (!gleich) {
				  testload();  // Hier wird load-Button deaktiviert
				  zeichne();
				  document.getElementById("testeind").style.display="inline-block";
				  load_user();
				  document.getElementById("Resultat").innerHTML="<b>nicht eindeutig!</b><br>Korrigieren bzw. ergänzen Sie die Stellung.";
				  return;
				}
	          }
			}
		    k++;
			} while (k<=digit);
		  }
	   }
	testload();
      // Falls noch kein Prob dieser Boxstruktur, so automatisch in save6neu bzw save9neu speichern
	  if (digit==6 && !erfolgstruktur) save6neu();
	  if (digit==9 && !erfolgstruktur) save9neu();
	  document.getElementById("zifferbuttons").style.display = "inline-block";
	  document.getElementById("steuerbuttons2").style.display = "inline-block";
		//Werte von sol in vert speichern
        vert=["","","","","","","","",""];
        for (var i=0;i<digit;i++) {
         for (var j=0;j<digit;j++)
           if (locked[i][j]) {
             vert[i] += sol[i][j];
           }
           else {
             vert[i] += ' ';
           }
        }
      dosolve();  // Lösung jetzt in sol
      speichern_in_solut();  // Lösung jetzt in solut
	  initPuzzle();
      for (var i=0;i<digit;i++)  // sol wieder korrekt füllen mit Startwerten von prob
        for (var j=0;j<digit;j++) {  
          prob[i][j]=vert[i].charAt(j);
          if (prob[i][j]=='-') prob[i][j]=' ';
          locked[i][j] = setvalue(i,j,prob[i][j]);
        }		
    zeichne();
	Nummer="aktuelles Problem";
	var anz=digit*digit-anzleere();
	document.getElementById("message").innerHTML="<b>"+Nummer+": "+anz+" Ziffern</b>";
	document.getElementById("saveaktprob").style.display = "none";
    if (!erfolgstruktur) {erfolgstruktur=true; document.getElementById("messageBox").innerHTML=savemessageBox;}
		else {		
			if (document.getElementById("probneu"+digit).length<10) {
				document.getElementById("messageBox").innerHTML+="<b>Eindeutig!</b> Sie können das Problem mit 'Save aktuelles Problem...' in 'Probneu' speichern";
                document.getElementById("saveaktprob").style.display = "inline-block";				
			}
            else document.getElementById("messageBox").innerHTML+="<b>Eindeutig!</b> "+probfull;
	    } 
	document.getElementById("testeind").style.display="none";
	document.getElementById("Resultat").innerHTML="";
	document.getElementById("Sol").disabled=false;
  }

  function vergleich() {
	for (i=0;i<digit;i++)
       for (j=0;j<digit;j++) {
          if (sol[i][j]!=prob[i][j]) return false;
	   }		  
    return true;  
  }
  
  function createuser() {
	eingabeprob=true;
    initPuzzle();
    hinweisEingabe();	
  }
 
  function addneu(anz) {  // aus Datei eingelesene Probleme in probneu speichern; ev vorhandene werden überschrieben!
    var x = document.getElementById("probneu"+anz);
	var nr=x.length;
	// alle vorhandenen wurden in input_output.js entfernt (dort wird removeneu(6) und removeneu(9) aufgerufen
    var option = document.createElement("option");
    option.text = "np"+nr;
    x.add(option);
  }
  
  function removeneu(anz) { // entfernt alle neuen Probleme 
	var x = document.getElementById("probneu"+anz);
	var nr=x.length;
	for (var i=1;i<nr;i++) x.remove(1);	
  }
  
  function removenp9(anz) { // entfernt np9
	var x = document.getElementById("probneu"+anz);
    x.remove(9); 
    if (document.getElementById("messageBox").innerHTML.indexOf(probfull)>-1)
		document.getElementById("saveaktprob").style.display="inline-block";
  }

  function dateihandling(nr) {
	if (nr==0) return;
	document.getElementById("dateien").selectedIndex="0";
    switch(nr) {
        case 1: //upload
			document.getElementById("upload").click();
            break;
		case 2: //download
		    if (document.getElementById("probneu6").length==1 && document.getElementById("probneu9").length==1) {alert("Noch keine Probleme in 'Probneu' vorhanden");return;}
			OnDownloadFile();
            break;
        case 3: //upload Standardprobleme
			standard();
            break;		
	}	
  }