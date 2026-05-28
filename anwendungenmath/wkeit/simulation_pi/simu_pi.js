  // Progamm zur Berechnung von Pi mit MonteCarlo-Methode auf www.mathematik.ch
  // copyright Bernhard Berchtold
  // Ehemaliges php-Programm transferiert nach Javascript und html5 am 8.11.2015

	var W,H;
    var n=32000;
	var anzahl;
	var farbe = [0x0000FF, 0xFF0000];
    var ctx;
	
window.onload=init;

// nötig für data array [alpha | blue | green | red ]
// daher swap red with blue in array farbe
for (var j = 0; j<farbe.length; j++) {
    var color = farbe[j];
    farbe[j] = (255 << 24) | ((color & 0xff) << 16) | (color & 0x00ff00) | (color >> 16);
}

  function init() {
    canvas1=document.getElementById('myCanvas');
    ctx = canvas1.getContext("2d",{willReadFrequently:true});
	W = canvas1.width;
	H = canvas1.height;
	zeichne();
  }

 
 function zeichne() {
  var imageData = ctx.getImageData(0, 0, W, H);
  var buf = new ArrayBuffer(imageData.data.length);
  var buf8 = new Uint8ClampedArray(buf);
  var data = new Uint32Array(buf);
  document.getElementById("N").innerHTML=""+n;
  anzahl=0;
  for (var i = 0; i < n; i++) {
    var x = Math.random();
    var y = Math.random();  
    if (x*x+y*y < 1) 
    {
      anzahl++;
	  k=0;
    }
    else
      k=1;
    var xpixel=Math.floor(x*W);
    var ypixel=H-Math.floor(y*H);
  	data[ypixel * W + xpixel] = farbe[k];
  }
  imageData.data.set(buf8);
  ctx.putImageData(imageData, 0, 0);
  document.getElementById("Anzb").innerHTML=""+anzahl;
  var Resultat=Math.round(10000*anzahl/n)/2500;
  document.getElementById("Res").innerHTML=""+Resultat; 
 }

 function doppelt() {
  document.getElementById('half').disabled=false;
  if (n<=256000) {
	if (n==256000) document.getElementById('double').disabled=true;
	n=2*n;
	zeichne();
  }	
 }

 function halb() {
  document.getElementById('double').disabled=false;
  if (n>=16000) {
	if (n==16000) document.getElementById('half').disabled=true;
	n=n/2;
	zeichne();
  }	
 }