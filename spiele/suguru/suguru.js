var table="";
var sequence="";
var SmallFont=false;
var W=31;
var xold=0,yold=0;
var xpos=0,ypos=0;
var levelNumber=1;
var levelneu=["581111222231445526374455567748886697788AA60000050000100400000000054000004000000000"];
var levelneuhilf="";
const colorpalette = ["LightGreen","#ffa07a","Cyan","LightBlue","Gold","LightYellow","Silver","Khaki","Chocolate","#32d0d0","Olive","Pink","#ffb645","SpringGreen","Blue","LightPink","LightCoral","LimeGreen","#f5deb3","#7fff00","#b0e0e6"];
const letters="QAZWXSRVCEDF";
var currentLevel = { "diff": 1, "level": 1, "xSize": 0, "ySize": 0, "blocks": "", "digits": "" };
const solvedtext=" <b>Gratuliere! Gelöst!</b>";

function init() {
	table=document.getElementById("suguru");
	sequence="";
	xold=0,yold=0;
    xpos=0,ypos=0;
	difficulty.addEventListener('change', function(evt) {
	  if (document.getElementById("difficulty").value<7 && levelNumber>20) levelNumber=1;
	  loadLevelUI();	
	});
	suguru.addEventListener('click', function(evt) {
      var mousePos = getMousePos(suguru, evt);
      var x=mousePos.x; var y=mousePos.y;
      xpos = Math.floor(x / W); 
      ypos = Math.floor(y / W);
      if (xpos < 0 || ypos < 0 || xpos >= currentLevel.xSize || ypos >= currentLevel.ySize) 
        return;
	  cell = getCell(xold, yold);
	  if (cell.bgColor=="Blue") cell.classList.remove("activewhite");
	     else cell.classList.remove("active");
	  xold=xpos; yold=ypos;
	  cell = getCell(xpos, ypos);
	  if (cell.bgColor=="Blue") cell.classList.add("activewhite");	
	    else cell.classList.add("active");
	  for (var z=1; z<20; z++)
        if (document.getElementById("z"+z).style.backgroundColor == "lightgreen") {
		    if (z<10) eingabe(z);
			  else eingabe(letters[z-10]);
		}
    }, false);
	loadLevelUI();
}


function loadLevelUI() {
	sequence="";
	xold=0,yold=0;
    xpos=0,ypos=0;
	clearElement(table);
	document.getElementById("info").innerHTML = "";
	currentLevel.diff=document.getElementById("difficulty").value;
	if (currentLevel.diff==7 && levelNumber>levelneu.length) {
		levelNumber=levelneu.length;
	}
	currentLevel.level=levelNumber;
	loadLevel(currentLevel.diff,levelNumber);
}


function Levelplus() {
	if (document.getElementById("difficulty").value<7 && levelNumber<20) {
		levelNumber++;
		loadLevelUI();
	}
    if (document.getElementById("difficulty").value==7 && levelNumber<levelneu.length) {
	    levelNumber++;
		loadLevelUI();
    }
}

function Levelminus() {
	if (document.getElementById("difficulty").value<8 && levelNumber>1) {
		levelNumber--;
	    loadLevelUI();
	}
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
				back();
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
					back();
					return false;
				}
			}
		}
	}

	if (value <= cellsInBlock) {
		cell.classList.remove("invalid");
		if (won) {
			console.log("Won");
			document.getElementById("wintext").innerHTML += solvedtext;
			document.getElementById("stepButton").disabled=true;
		}	
		return true;
	} else {
		cell.classList.add("invalid");
		cell.innerHTML = "";
		back();
		return false;
	}
}

function back() {
	if (sequence.length>2) {
		document.getElementById("wintext").innerHTML = "<big><b>Nr "+ currentLevel.level+"</b></big>";
		var value=sequence.substring(sequence.length-1);
		var y=sequence.substring(sequence.length-2,sequence.length-1);
		var x=sequence.substring(sequence.length-3,sequence.length-2);
		sequence=sequence.substring(0,sequence.length-3);
		var cell = getCell(xpos, ypos);
		if (cell.bgColor=="Blue") cell.classList.remove("activewhite");
	       else cell.classList.remove("active");
		cell = getCell(x,y);
		cell.innerHTML = "";
		if (cell.bgColor=="Blue") cell.classList.add("activewhite");	
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
	document.getElementById("difficulty").value=7;	
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
  if (xSize<3 || xSize>9) return;
  var ySize = document.getElementById("Hoehe").value;
  if(ySize<2 || ySize>9) return;
  levelNumber = levelneu.length+1;
  currentLevel.level = levelNumber;
  levelneuhilf="";
  currentLevel.xSize=xSize; currentLevel.ySize=ySize;
  levelneuhilf+=xSize; levelneuhilf+=ySize;
  document.getElementById("Zifferbuttons").style.display = "block";
  eingabeneu();
}

function faerbe(z) {
	for (var i=1; i<20; i++) {
        document.getElementById("z"+i).style.backgroundColor = "#E0FFFF";
	}
	if (z>0) document.getElementById("z"+z).style.backgroundColor = "lightgreen";
	   else eingabe(0);
}

function eingabeneu() {
  var Wh=parseInt(window.innerWidth/currentLevel.xSize);
	if (Wh>60) W=60;
	if (Wh>31 && Wh<61) W=Wh;
	for (var y = 0; y < currentLevel.ySize; y++) {
		var row = table.insertRow();
		for (var x = 0; x < currentLevel.xSize; x++) {
			var cell = row.insertCell();
			cell.width=W; cell.height=W;
		}
	}
	document.getElementById("newSuguru").style.display = "none";
	document.getElementById("Breite").value="";
	document.getElementById("Hoehe").value="";
	document.getElementById("info").innerHTML = "Markieren der Blöcke: Jede Zelle eines Blocks hat dieselbe Ziffer bzw. denselben Buchstaben, z.B..<br>";	
	document.getElementById("info").innerHTML += "<img src='suguru1.png' width='140' height='167' style='margin-right:20px'>";
	document.getElementById("info").innerHTML += "<img src='sugurutext.png' width='138' height='168'>";
	document.getElementById("0").style.display="none";
	for (var i=3;i<10;i++) document.getElementById("z"+i.toString()).style.display="inline-block";
	if (currentLevel.xSize*currentLevel.ySize>25) document.getElementById("Letterbuttons").style.display="block";
	cell = getCell(0,0);
	cell.classList.add("active");
	xpos=0,ypos=0;
	document.getElementById("z1").style.backgroundColor = "lightgreen";
	eingabe(1);
}

function input(z) {
	cell = getCell(xpos, ypos);
	if (cell.innerHTML==0) cell.innerHTML=z;
		else return;
	if (SmallFont) cell.style.fontSize="1.2em";
		else cell.style.fontSize="1.5em";
	validateCell(cell);
}

function eingabe(z) {
	cell = getCell(xpos, ypos);
	if (z!=0) cell.innerHTML=z;
    if (tablefull()) {
        document.getElementById("Letterbuttons").style.display="none";			
		for (var x = 0; x < currentLevel.xSize; x++) 
          for (var y = 0; y < currentLevel.ySize; y++) {
			  cell = getCell(x,y);
			  levelneuhilf+=cell.innerHTML;
			  if (cell.innerHTML<10) cell.bgColor=colorpalette[cell.innerHTML-1];
			    else {
                    var pos = letters.indexOf(cell.innerHTML);
					cell.bgColor=colorpalette[pos+9];  
			   }
	          cell.innerHTML="";		  
			}
	    for (var i=1; i<20; i++) document.getElementById("z"+i).style.backgroundColor = "#E0FFFF";
		document.getElementById("info").innerHTML = "Geben Sie nun die Ziffern ein. Wenn Sie fertig sind, klicken Sie auf 'End Input'.<br>";
		document.getElementById("info").innerHTML += "Das neue Problem wird dann bei 'New' hinzugefügt.";
		document.getElementById("Letterbuttons").style.display="none";
		document.getElementById("0").style.display="inline-block";
		var area = currentLevel.ySize * currentLevel.xSize;
	    var blocks = levelneuhilf.substring(2, 2 + area);
	    var max=searchmax(blocks);   // gibt die maximale Anzahl Ziffern in einem Block für Anzeige inputbuttons
        for (var i=max+1;i<10;i++) document.getElementById("z"+i.toString()).style.display="none";
	}
	if (z==0) {
		for (var x = 0; x < currentLevel.xSize; x++) 
          for (var y = 0; y < currentLevel.ySize; y++) {
			  cell = getCell(x,y);
			  if (cell.innerHTML=="") cell.innerHTML=0;
			  levelneuhilf+=cell.innerHTML;
		}
		document.getElementById("newbutton").style.display="block";
		levelneu[levelNumber-1]=levelneuhilf;
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
	document.getElementById("wintext").innerHTML = "<big><b>Nr "+level+"</b></big>";
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
	document.getElementById("SF").style.backgroundColor="#E0FFFF";
	SmallFont=false;
	if (diff<7 && level==20) document.getElementById("nextButton").disabled=true;
	if (diff==7 && level==levelneu.length) document.getElementById("nextButton").disabled=true;
	if (level==1) document.getElementById("previousButton").disabled=true;  
	document.getElementById("info").innerHTML = "";
	document.getElementById("solve").style.display = "block";
	document.getElementById("inputbuttons").style.display="block";
	for (var i=3;i<10;i++) document.getElementById(i.toString()).style.display="inline-block";
	switch (diff) { 
	   case "1": level1=levels1[level-1]; break;
	   case "2": level1=levels2[level-1]; break;
	   case "3": level1=levels3[level-1]; break;
	   case "4": level1=levels4[level-1]; break;
	   case "5": level1=levels5[level-1]; break;
	   case "6": level1=levels6[level-1]; break;
	   case "7": level1=levelneu[level-1]; break;
	}
	document.getElementById("Zifferbuttons").style.display = "none";
    var xSize = parseInt(level1[0]);
	var ySize = parseInt(level1[1]);
	currentLevel.xSize = xSize;
	currentLevel.ySize = ySize;
	var area = ySize * xSize;
	blocks = level1.substring(2, 2 + area);
	digits = level1.substring(2 + area, level1.length);
	var max=searchmax(blocks);   // gibt die maximale Anzahl Ziffern in einem Block für Anzeige inputbuttons
    for (var i=max+1;i<10;i++) document.getElementById(i.toString()).style.display="none";
	currentLevel.blocks = blocks;
	currentLevel.digits = digits;
	var Wh=parseInt(window.innerWidth/xSize);
	if (Wh>60) W=60;
	if (Wh>31 && Wh<61) W=Wh;
	clearElement(table);

	for (var y = 0; y < ySize; y++) {
		var row = table.insertRow();
		for (var x = 0; x < xSize; x++) {
			var cell = row.insertCell();
			cell.width=W; cell.height=W;
			var digit = digits[x * ySize + y];
			if (digit > 0) {
				cell.style.fontWeight="bold";
				cell.style.fontSize="1.9em";
				if (W<45) cell.style.fontSize="1.5em";
				cell.innerHTML = digit;
			}
			var block = blocks[x * ySize + y];
			cell.setAttribute("data-x", x);
			cell.setAttribute("data-y", y);
			cell.setAttribute("data-block", block);
			if (block<10) cell.bgColor=colorpalette[block-1];
			   else {
                    var pos = letters.indexOf(block);
					cell.bgColor=colorpalette[pos+9];  
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
	if (diff==7) {
		var ok=true;
		ok=endcontrol();			
		if (!ok) document.getElementById("wintext").innerHTML += " Problemstellung fehlerhaft";		 
	}
	cell = getCell(0,0);
	cell.classList.add("active");
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
if (levelneuhilf=="") {document.getElementById("uploadInfo").innerHTML="Sie haben noch kein neues Suguru erstellt"; return }
	var levelneutxt="Suguru von mathematik.ch,"+levelneu;
    downloadFile(levelneutxt, 'levelneu.txt');	
}

function upload() {
	document.getElementById("upload").click();
}
