  // Progamm zur Berechnung von Pi mit Buffon Nadelproblem auf www.mathematik.ch
  // copyright Bernhard Berchtold
  // Ehemaliges php-Programm transferiert nach Javascript und html5 am 10.11.2015

	var W,H;
    var n=400;
	var anzahl;
    var ctx;
	
window.onload=init;

 function init() {
   canvas1=document.getElementById('myCanvas');
   ctx = canvas1.getContext('2d');
   W = canvas1.width;
   H = canvas1.height;
   zeichne();
 }

 function zeichne() {
  document.getElementById("N").innerHTML=""+n;
  ctx.clearRect(0,0,W,H);
  anzahl=0;
  var needleLength = Math.floor(H/3);
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth="1";
  line(0,needleLength,W,needleLength);
  line(0,2*needleLength,W,2*needleLength);
  ctx.stroke();
  for (i=0;i<n;i++) { 
    ctx.beginPath();
    y = Math.random();
    var theta = Math.PI * Math.random();
    var k = (W/2) + 4 * (Math.random() - 0.5) * needleLength;
    var i2 = (needleLength / 2) * Math.sin(theta);
    var j2 = (needleLength / 2) * Math.cos(theta);
    var l = (1.0 + y) * needleLength;
    var i1 = k + i2;
    var j1 = l + j2;
    var k1 = k - i2;
    var l1 = l - j2;
    // Check ob Nadel trifft oder nicht, daher blau oder rot zeichen        
    if( Math.floor(j1 / needleLength) != Math.floor(l1 / needleLength))
        {anzahl++; ctx.strokeStyle = "blue";}
    else ctx.strokeStyle = "red";
	line(i1,j1,k1,l1);
    ctx.stroke();
  }
  var Wkeit = anzahl/n; 
  document.getElementById("Anzb").innerHTML=""+Math.round(10000*Wkeit)/10000;
  var Resultat=Math.round(10000*2/Wkeit)/10000;
  document.getElementById("Res").innerHTML=""+Resultat;
 }

 function line(x1,y1,x2,y2) {
	ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);	
 }

 function doppelt() {
  document.getElementById('half').disabled=false;
  if (n<=12800) {
	if (n==12800) document.getElementById('double').disabled=true;
	n=2*n;
	zeichne();
  }	
 }

 function halb() {
  document.getElementById('double').disabled=false;
  if (n>=50) {
	if (n==50) document.getElementById('half').disabled=true;
	n=n/2;
	zeichne();
  }	
 }