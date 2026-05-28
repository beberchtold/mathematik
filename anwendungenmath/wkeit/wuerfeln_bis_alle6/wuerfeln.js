var Ziffer=new Array();

function simu() {   
    var zaehler=0;
	document.getElementById("txt").innerHTML="";
	for (var k = 1; k <= 6; k++) Ziffer[k]=true;
    // Zufallszahlen mit Werten zwischen 1 und 6 solange erzeugen, bis alle Ziffern gewürfelt.

    while (Ziffer[1] || Ziffer[2] || Ziffer[3] || Ziffer[4] || Ziffer[5] || Ziffer[6])  
    {    	
      var hilf = Math.floor(6*Math.random())+1;
      zaehler++;
      Ziffer[hilf]=false;
	  document.getElementById("txt").innerHTML+="<img src=\"img/"+hilf+".gif\" width=40 height=40>"+"&nbsp;";     
    }
	document.getElementById("RES1").innerHTML=zaehler;
}							  
	
function rechne() {
  var n=1000;
  var summe=0;
  n=parseInt(document.getElementById("n").value);
  if (isNaN(n) || n<100) n=100;
  if (n>10000) n=10000;
  document.getElementById("n").value=n;
  document.getElementById("N").innerHTML=n;
  for (var j = 1; j <= n; j++)  
  {
    for (var k = 1; k <= 6; k++) Ziffer[k]=true;   
    var zaehler=0;
    // Zufallszahlen mit Werten zwischen 1 und 6 solange erzeugen, bis alle Ziffern gewürfelt.

    while (Ziffer[1] || Ziffer[2] || Ziffer[3] || Ziffer[4] || Ziffer[5] || Ziffer[6])  
    {    	
      var hilf = Math.floor(6*Math.random())+1;
      zaehler++;
      Ziffer[hilf]=false;      
    }
    summe=summe+zaehler;
  } // end for j

  var result=summe/n;
  document.getElementById("RES").innerHTML=result;
}
