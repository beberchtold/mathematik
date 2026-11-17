var first=true;  //für algorithm, function step()
var table="";
var maxanz;  //für max Anzahl Probleme in diff
var sequence="";
var fontsize;
var SmallFont=false;
var W=30;
var xold=0,yold=0;
var xpos=0,ypos=0;
var levelNumber=1;
var levelneu=["581111222231445526374455567748886697788AA60000050000100400000000054000004000000000"];
var levelneuhilf="";
var eingabeblock=false;
var levelsolut="";
const colorpalette = ["LightGreen","#ffa07a","Cyan","LightBlue","Gold","LightYellow","Silver","Khaki","Chocolate","#32d0d0","Olive","Pink","#ffb645","SpringGreen","Blue","LightPink","LightCoral","LimeGreen","#f5deb3","#7fff00","#b0e0e6","LightGreen","#ffa07a","Cyan","LightBlue","Gold","LightYellow","Silver"];
const letters="QAZWXSRVCEDFBGHIK";
var currentLevel = { "diff": 1, "level": 1, "xSize": 0, "ySize": 0, "blocks": "", "digits": "" };
const solvedtext=" <strong>Gratuliere! Gelöst!</strong>";
var control=true;  // für Kontrolle neu eingegebener Probleme

function init() {
	table=document.getElementById("suguru");
	table.addEventListener("keydown", (evt) => {
	  keyPress(evt.key);
	});
	difficulty.addEventListener('change', (evt) => {
	  difficulty.blur();
	  document.getElementById("gotoNr").value=null;
	  levelNumber=1;
	  levelsolut="";
	  loadLevelUI();	
	});
	suguru.addEventListener('click', (evt) => {
      var mousePos = getMousePos(suguru, evt);
      var x=mousePos.x; var y=mousePos.y+7;
      xpos = Math.floor(x/W);
      ypos = Math.floor(y/W);
	  if (ypos<0) ypos=0;
	  if (xpos<0) xpos=0;
      if (xpos >= currentLevel.xSize) xpos=currentLevel.xSize-1;
	  if (ypos >= currentLevel.ySize) ypos=currentLevel.ySize-1;
	  activateCell();
	  var z=1;
	  while (z<10 && document.getElementById(""+z).style.backgroundColor != "lightgreen") z++;
	  if (z<10) input(z);
	  z=0;
	  while (z<27 && document.getElementById("z"+z).style.backgroundColor != "lightgreen") z++;
	  if (z==27) return;
	  if (z<10) {
		  if (!eingabeblock) {
			var count = getmaxFieldsinBlock(xpos,ypos);
			if (z>count) return;
		}
		eingabe(z);		
	  }
		else eingabe(letters[z-10]);
    }, false);
	loadLevelUI();
}

function keyPress(k) {
	if (k=="ArrowLeft" && xpos > 0) {xpos--; activateCell(); return;}
	if (k=="ArrowUp" && ypos > 0) {event.preventDefault(); ypos--; activateCell(); return;}
	if (k=="ArrowRight" && xpos < currentLevel.xSize-1) {xpos++; activateCell(); return;} 
	if (k=="ArrowDown" && ypos < currentLevel.ySize-1) {event.preventDefault(); ypos++; activateCell(); return;} 
	if ("1"<=k && k<="9") {
		if (document.getElementById("inputbuttons").style.display=="inline-block") { 
			input(k);
			faerbeinputbutton(k);
		}
		else {
			if (document.getElementById("z"+k).style.display=="none") return;  // Ziffer grösser als max Anzahl Felder
			if (!eingabeblock) {
			var count = getmaxFieldsinBlock(xpos,ypos);
			if (k>count) return;
			}
			eingabe(k);
			faerbe(k);
		}
		return;
	}
	if (k==" ") {
		event.preventDefault();
		if (document.getElementById("Zifferbuttons").style.display=="block") {
			eingabe(0);
			faerbe(0);
		}
		return;
    }
	if (document.getElementById("Letterbuttons").style.display=="block") {
	  if (("A"<=k && k<="I") || ("a"<=k && k<="i") || k=="K" || k=="k" || k=="Z" || k=="z") {
		eingabe(k.toUpperCase());
		faerbe(-1);
		return;
	  }
	  if (("Q"<=k && k<="S") || ("q"<=k && k<="s") || ("V"<=k && k<="X") || ("v"<=k && k<="x")) {
	    eingabe(k.toUpperCase());
		faerbe(-1);
		return;
	  }
	}
}

function activateCell() {
	cell = getCell(xold, yold);
	if (cell.style.backgroundColor=="blue") cell.classList.remove("activewhite");
	    else cell.classList.remove("active");
	xold=xpos; yold=ypos;
	cell = getCell(xpos, ypos);
	if (cell.style.backgroundColor=="blue") cell.classList.add("activewhite");	
	    else cell.classList.add("active");
}

function loadLevelUI() {
	sequence="";
	xold=0;yold=0;
    xpos=0;ypos=0;
	clearElement(table);
	faerbeinputbutton(0);
	first=true;
	setting=0;   // var setting in algorithm.js
	currentLevel.diff=document.getElementById("difficulty").value;
	if (currentLevel.diff==8 && levelNumber>levelneu.length) {
		levelNumber=levelneu.length;
	}
	currentLevel.level=levelNumber;
	if (!comp) levelsolut="";
	loadLevel(currentLevel.diff,levelNumber);
}


function Levelplus() {
	if (levelNumber<maxanz) {
		document.getElementById("gotoNr").value=null;
		levelNumber++;
		levelsolut="";
		control=true;
		loadLevelUI();
	}
}

function Levelminus() {
	if (levelNumber>1) {
		document.getElementById("gotoNr").value=null;
		levelNumber--;
		levelsolut="";
		control=true;
	    loadLevelUI();
	}
}

function gotonr() {
	var number=document.getElementById("gotoNr").value;
	if (number>maxanz) {document.getElementById("gotoNr").value=null; return;}
    if (number<1) {document.getElementById("gotoNr").value=null; return;}
	gotoNr.blur();
	levelNumber = number;
	levelsolut="";
	control=true;
	loadLevelUI();
}

// From https://stackoverflow.com/a/3955238/3141917
function clearElement(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

function getCell(x,y) {
	return table.firstChild.childNodes[y].childNodes[x];
}

// Returns: if a given cell is not invalid.
function validateCell(cell) {
	var value = cell.innerHTML;
	if (value == 0) {
		// Reset validity classes
		for (var x = 0; x < currentLevel.xSize; x++) {
			for (var y = 0; y < currentLevel.ySize; y++) {
				var checkCell = getCell(x, y);
				checkCell.classList.remove("invalid");
			}
		}		
		return true;
	}
	var x = parseInt(cell.getAttribute("data-x"));
	var y = parseInt(cell.getAttribute("data-y"));
	var block = cell.getAttribute("data-block");
    sequence+=x; sequence+=y; sequence+=value;
	document.getElementById("backButton").disabled=false;

	// Validate neighbors
	for (var xOffset = -1; xOffset <= 1; xOffset++) {
		for (var yOffset = -1; yOffset <= 1; yOffset++) {
			var checkX = x + xOffset;
			var checkY = y + yOffset;
			if (checkX < 0 || checkX >= currentLevel.xSize || checkY < 0 || checkY >= currentLevel.ySize || (xOffset == 0 && yOffset == 0)) {
				continue;
			}
			
			var checkCell = getCell(checkX, checkY);
			checkCell.classList.remove("invalid");
			
			if (checkCell.innerHTML == value) {
				cell.classList.add("invalid");
				checkCell.classList.add("invalid");
				return false;
			}
		}
	}

	// Validate block
	// Also check if the player won
	var cellsInBlock = 1;
	var won = true;
	for (var searchX = 0; searchX < currentLevel.xSize; searchX++) {
		for (var searchY = 0; searchY < currentLevel.ySize; searchY++) {
			if (searchX == x && searchY == y) {
				continue;
			}
			
			var checkCell = getCell(searchX, searchY);
			checkCell.classList.remove("invalid");

			if (checkCell.innerHTML == "") {
				won = false;
			}

			if (checkCell.getAttribute("data-block") == block) {
				cellsInBlock++;	
				if (checkCell.innerHTML == value) {
					checkCell.classList.add("invalid");
					cell.classList.add("invalid");
					return false;
				}
			}
		}
	}

	if (value <= cellsInBlock) {
		cell.classList.remove("invalid");
		if (won && !comp) {
			console.log("Won");
			document.getElementById("wintext").innerHTML += solvedtext;
			document.getElementById("stepButton").disabled=true;
		}
		return true;
	} else {
		cell.classList.add("invalid");
		cell.innerHTML = "";
		return false;
	}
}

function back() {
	if (sequence.length>2) {
		document.getElementById("inputbuttons").style.display = "inline-block";	
		document.getElementById("wintext").innerHTML = "<h2>Nr "+currentLevel.level+" von "+maxanz+"</h2>";
		var value=sequence.substring(sequence.length-1);
		var y=sequence.substring(sequence.length-2,sequence.length-1);
		var x=sequence.substring(sequence.length-3,sequence.length-2);
		sequence=sequence.substring(0,sequence.length-3);
		var cell = getCell(xpos, ypos);
		if (cell.style.backgroundColor=="blue") cell.classList.remove("activewhite");
	       else cell.classList.remove("active");
		cell = getCell(x,y);
		cell.innerHTML = "";
		if (cell.style.backgroundColor=="blue") cell.classList.add("activewhite");	
	       else cell.classList.add("active");
	    xpos=x; ypos=y;
		xold=x; yold=y;
        if (sequence=="") document.getElementById("backButton").disabled=true;		
	}
}

function changeSF() {
	SmallFont=!SmallFont;
	if (SmallFont)  document.getElementById("SF").style.backgroundColor="lightgreen";
	  else document.getElementById("SF").style.backgroundColor="#E0FFFF";	
}

function createnewSuguru() {
	document.getElementById("difficulty").value=8;
	document.getElementById("difficulty").disabled=true;
	document.getElementById("gotoNr").disabled=true;
	document.getElementById("inputbuttons").style.display="none";
	document.getElementById("previousButton").style.display = "none";
	document.getElementById("reloadButton").style.display = "none";
	document.getElementById("nextButton").style.display = "none";
	document.getElementById("solve").style.display = "none";
	document.getElementById("newSuguru").style.display = "block";
	document.getElementById("newbutton").style.display="none";
	document.getElementById("downloadbutton").style.display="none";
	document.getElementById("uploadbutton").style.display="none";
	document.getElementById("uploadInfo").innerHTML="";
	clearElement(table);
	document.getElementById("wintext").innerHTML = "";
}


function inputsize() {
  var xSize = document.getElementById("Breite").value;
  if (xSize<3 || xSize>10) {document.getElementById("Breite").value=""; return;}
  var ySize = document.getElementById("Hoehe").value;
  if(ySize<2 || ySize>10) {document.getElementById("Hoehe").value=""; return;}
  levelNumber = levelneu.length+1;
  currentLevel.level = levelNumber;
  levelneuhilf="";
  currentLevel.xSize=xSize; currentLevel.ySize=ySize;
  if (xSize<10) levelneuhilf+=xSize;
    else levelneuhilf+="A";
  if (ySize<10) levelneuhilf+=ySize;
    else levelneuhilf+="A";
  document.getElementById("Zifferbuttons").style.display = "block";
  document.getElementById("z0").style.display = "none";
  xold=0; yold=0; xpos=0; ypos=0;
  eingabeneu();
}

function faerbeinputbutton(z) {
	for (var i=1; i<10; i++) {
        document.getElementById(""+i).style.backgroundColor = "#E0FFFF";
	}
	if (z>0 && z<10) {
		document.getElementById(""+z).style.backgroundColor = "lightgreen";
	}
}

function faerbe(z) {
	for (var i=0; i<27; i++) {
        document.getElementById("z"+i).style.backgroundColor = "#E0FFFF";
	}
	if (z==-1) return;
	if (z>=0 && z<28) document.getElementById("z"+z).style.backgroundColor = "lightgreen";
	   else eingabe(100);
}

function eingabeneu() {
    var Wh=parseInt((window.innerWidth-25)/currentLevel.xSize);
    W=30;
    if (Wh>58) W=58;
    if (Wh>30 && Wh<59) W=Wh;
	for (var y = 0; y < currentLevel.ySize; y++) {
		var row = table.insertRow();
		for (var x = 0; x < currentLevel.xSize; x++) {
			var cell = row.insertCell();
			cell.style.width=W+"px"; cell.style.height=W+"px";
		}
	}
	table.focus();
	setfontSize();
	document.getElementById("newSuguru").style.display = "none";
	eingabeblock=true;
	document.getElementById("Breite").value="";
	document.getElementById("Hoehe").value="";
	document.getElementById("info").innerHTML = "Markieren der Blöcke: Jede Zelle eines Blocks hat dieselbe Ziffer bzw. denselben Buchstaben, z.B..<br>";	
	document.getElementById("info").innerHTML += "<img src='suguru1.png' width='140' height='167' style='margin-right:20px'>";
	document.getElementById("info").innerHTML += "<img src='sugurutext.png' width='138' height='168'><br>";
	document.getElementById("info").innerHTML += "Ein Block kann höchstens 9 Felder haben.<br>";
	document.getElementById("100").style.display="none";
	for (var i=1;i<10;i++) document.getElementById("z"+i.toString()).style.display="inline-block";
	if (currentLevel.xSize*currentLevel.ySize>25) document.getElementById("Letterbuttons").style.display="block";
	cell = getCell(0,0);
	cell.classList.add("active");
	xpos=0; ypos=0;
	document.getElementById("z1").style.backgroundColor = "lightgreen";
	eingabe(1);
}

function input(z) {
	cell = getCell(xpos, ypos);
	cell.style.fontSize=fontsize;
	if (SmallFont) cell.style.fontSize=0.9*parseFloat(fontsize)+"em";
	if (cell.innerHTML==0) cell.innerHTML=z;
		else return;
	if (!validateCell(cell)) back();
}

function eingabe(z) {
	var fieldcount=0;
	for (var x = 0; x < currentLevel.xSize; x++)  
          for (var y = 0; y < currentLevel.ySize; y++) {
			  cell = getCell(x,y);
			  if (cell.innerHTML==""+z) fieldcount++;
		}
	if (fieldcount>8) {   // Block hat bereits 9 Felder
		return;
	}
    cell = getCell(xpos, ypos);
	cell.style.fontSize=fontsize;
	if (z!=100) cell.innerHTML=z;
	if (z==0) cell.innerHTML="";
    if (tablefull()) {
		eingabeblock=false;
        document.getElementById("Letterbuttons").style.display="none";			
		for (x = 0; x < currentLevel.xSize; x++) 
          for (y = 0; y < currentLevel.ySize; y++) {
			  cell = getCell(x,y);
			  levelneuhilf+=cell.innerHTML;
			  if (cell.innerHTML<10) cell.style.backgroundColor=colorpalette[cell.innerHTML-1];
			    else {
                    var pos = letters.indexOf(cell.innerHTML);
					cell.style.backgroundColor=colorpalette[pos+9];					
			   }
	          cell.innerHTML="";		  
			}
	    document.getElementById("z0").style.display = "inline-block";
		for (var i=0; i<27; i++) document.getElementById("z"+i).style.backgroundColor = "#E0FFFF";
		document.getElementById("info").innerHTML = "Geben Sie nun die Ziffern ein. Wenn Sie fertig sind, klicken Sie auf 'End Input'.<br>";
		document.getElementById("info").innerHTML += "Das neue Problem wird dann bei 'New' hinzugefügt. ";
		document.getElementById("info").innerHTML += "Das Problem wird auf Fehler, aber nicht auf Eindeutigkeit geprüft.<br>";
		document.getElementById("Letterbuttons").style.display="none";
		document.getElementById("100").style.display="inline-block";
		var area = currentLevel.ySize * currentLevel.xSize;
	    var blocks = levelneuhilf.substring(2, 2 + area);
	    var max=searchmax(blocks);   // gibt die maximale Anzahl Ziffern in einem Block für Anzeige inputbuttons
        for (i=max+1;i<10;i++) document.getElementById("z"+i.toString()).style.display="none";
	}
	if (z==100) {
		for (x = 0; x < currentLevel.xSize; x++) 
          for (y = 0; y < currentLevel.ySize; y++) {
			  cell = getCell(x,y);
			  if (cell.innerHTML=="") cell.innerHTML=0;
			  levelneuhilf+=cell.innerHTML;
		}
		document.getElementById("newbutton").style.display="block";
		levelneu[levelNumber-1]=levelneuhilf;
		document.getElementById("difficulty").disabled=false;
		document.getElementById("gotoNr").disabled=false;
		control=true;
		loadLevelUI();
	}
}

function tablefull() {
	var res=true;
	for (var x = 0; x < currentLevel.xSize; x++) 
          for (var y = 0; y < currentLevel.ySize; y++) {
			  cell = getCell(x,y);
			  if (cell.innerHTML=="") res=false;
		}
	return res;
}

function getMousePos(suguru,evt) {
	var rect = suguru.getBoundingClientRect();
        return {
          x: evt.clientX-rect.left, 
          y: evt.clientY-rect.top-10
        };
}	
	  
function loadLevel(diff,level) {
	document.getElementById("Letterbuttons").style.display="none";
	var level1="";
	document.getElementById("previousButton").style.display = "inline-block";
	document.getElementById("reloadButton").style.display = "inline-block";
	document.getElementById("nextButton").style.display = "inline-block";
	document.getElementById("newbutton").style.display = "block";
	document.getElementById("downloadbutton").style.display="inline-block";
	document.getElementById("uploadbutton").style.display="inline-block";
	document.getElementById("backButton").disabled=true;
	document.getElementById("nextButton").disabled=false;
	document.getElementById("previousButton").disabled=false;
	document.getElementById("stepButton").disabled=false;
	document.getElementById("solveButton").disabled=false;
	document.getElementById("reloadButton").disabled = false;
	document.getElementById("SF").style.backgroundColor="#E0FFFF";
	SmallFont=false; 
	document.getElementById("info").innerHTML = "";
	document.getElementById("solve").style.display = "block";
	document.getElementById("inputbuttons").style.display="inline-block";
	for (var i=3;i<10;i++) document.getElementById(i.toString()).style.display="inline-block";
	switch (diff) { 
	   case "1": level1=levels1[level-1]; maxanz=levels1.length; break;
	   case "2": level1=levels2[level-1]; maxanz=levels2.length; break;
	   case "3": level1=levels3[level-1]; maxanz=levels3.length; break;
	   case "4": level1=levels4[level-1]; maxanz=levels4.length; break;
	   case "5": level1=levels5[level-1]; maxanz=levels5.length; break;
	   case "6": level1=levels6[level-1]; maxanz=levels6.length; break;
	   case "7": level1=levels7[level-1]; maxanz=levels7.length; break;
	   case "8": level1=levelneu[level-1]; maxanz=levelneu.length; break;
	}
	document.getElementById("wintext").innerHTML = "<h2>Nr "+level+" von "+maxanz+"</h2>";
	if (levelsolut=="") levelsolut=level1;
	   else level1=levelsolut;
	document.getElementById("Zifferbuttons").style.display = "none";
    var xSize = parseInt(level1[0],16);
	var ySize = parseInt(level1[1],16);
	currentLevel.xSize = xSize;
	currentLevel.ySize = ySize;
	var area = ySize * xSize;
	blocks = level1.substring(2, 2 + area);
	digits = level1.substring(2 + area, level1.length);
	var max=searchmax(blocks);   // gibt die maximale Anzahl Ziffern in einem Block für Anzeige inputbuttons
    for (i=max+1;i<10;i++) document.getElementById(i.toString()).style.display="none";
	currentLevel.blocks = blocks;
	currentLevel.digits = digits;
	var Wh=parseInt((window.innerWidth-25)/xSize);
	W=30;
	if (Wh>58) W=58;
	if (Wh>30 && Wh<59) W=Wh;
	setfontSize();
	clearElement(table);
	for (var y = 0; y < ySize; y++) {
		var row = table.insertRow();
		for (var x = 0; x < xSize; x++) {
			var cell = row.insertCell();
			cell.style.width=W+"px"; cell.style.height=W+"px";
			var digit = digits[x * ySize + y];
			if (digit > 0) {
				cell.style.fontWeight="bold";
				cell.style.fontSize=1.1*parseFloat(fontsize)+"em";
                if (W<33) cell.style.fontSize=fontsize;				
				cell.innerHTML = digit;
				}	
			var block = blocks[x * ySize + y];
			cell.setAttribute("data-x", x);
			cell.setAttribute("data-y", y);
			cell.setAttribute("data-block", block);
			if (block<10) cell.style.backgroundColor=colorpalette[block-1];
			   else {
                    var pos = letters.indexOf(block);
					cell.style.backgroundColor=colorpalette[pos+9];  
			   }
			if (y > 0 && blocks[x * ySize + y - 1] != block) {
				// Top border
				cell.classList.add("border-top");
			}
			if (x > 0 && blocks[(x - 1) * ySize + y] != block) {
				// Left border
				cell.classList.add("border-left");
			}
			if (y < ySize - 1 && blocks[x * ySize + y + 1] != block) {
				// Bottom border
				cell.classList.add("border-bottom");
			}
			if (x < xSize - 1 && blocks[(x + 1) * ySize + y] != block) {
				// Right border
				cell.classList.add("border-right");
			}
		}
	}
	if (diff==8 && control) {
		var ok=true;
		ok=endcontrol();			
		if (!ok) {
			probfail();		
		}
        else {
			first=true;
			stepButtonclicked();
			ok=endcontrol();			
			if (!ok) {
				probfail();
			}
			else {
				control=false;
				loadLevelUI();
			}
		}
	}
	cell = getCell(0,0);
	cell.classList.add("active");
	table.focus();
}

function searchmax(text) {   // findet max Anzahl gleiche Ziffern in text -> grösste Ziffer im suguru
  var max=2;
  for (z=1;z<10;z++) {
    var count = text.split(z);
    if (count.length>max+1) max=count.length-1;
  }
  for (z=0;z<letters.length;z++) {
	count = text.split(letters[z]);
	if (count.length>max+1) max=count.length-1;
  }
return max;
}

function getmaxFieldsinBlock(x,y) {   // findet max Anzahl Felder des Blocks des Feldes (x,y)
   // Ermittlung der Blocknr im String
	var blocknr=levelneuhilf.charAt(2+x*currentLevel.ySize+y);
	// Ermittlung Anzahl Felder in dem Block mit dieser Blocknr
	var text = levelneuhilf.substring(2, 2 + currentLevel.ySize * currentLevel.xSize);
	return text.split(blocknr).length - 1;
}

function hideinfo() {
	if (document.getElementById("infobutton").value=="Info nicht mehr anzeigen") {
		document.getElementById("infotext").style.display = "none";
		document.getElementById("infobutton").value="Info wieder anzeigen";
        return;		
	}
	if (document.getElementById("infobutton").value=="Info wieder anzeigen") {
		document.getElementById("infotext").style.display = "block";
		document.getElementById("infobutton").value="Info nicht mehr anzeigen";
	}	
}

function download() {
if (levelneuhilf=="") {document.getElementById("uploadInfo").innerHTML="Sie haben noch kein neues Suguru erstellt"; return;}
	var levelneutxt="Suguru von mathematik.ch,"+levelneu;
    downloadFile(levelneutxt, 'levelneu.txt');	
}

function upload() {
	control=true;
	document.getElementById("gotoNr").value=null;
	document.getElementById("upload").click();
}

function setfontSize() {
	fontsize="1.6em";
	if (W<50) fontsize="1.5em";
	if (W<41) fontsize="1.4em";
	if (W<33) {
		fontsize="1.3em";
	}
}

function probfail() {
	document.getElementById("wintext").innerHTML = "<h2>Nr "+currentLevel.level+" von "+maxanz+"</h2>";
	document.getElementById("wintext").innerHTML += " Problemstellung fehlerhaft";
	end=true;  // end in algorithm.js definiert
	document.getElementById("compfailtext").innerHTML="";
	document.getElementById("stepButton").disabled = true;
	document.getElementById("solveButton").disabled = true;
	document.getElementById("reloadButton").disabled = true;
    document.getElementById("inputbuttons").style.display = "none";		
}