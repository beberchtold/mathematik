  // Progamm zu Fraktale mit IFS auf www.mathematik.ch
  // copyright Bernhard Berchtold
  // Ehemaliges php-Programm transferiert nach Javascript und html5 am 2.11.2015

	var W,H;
	var fractal;
    var n=40000;
	var anzahl;
	var farbe = [0x000000, 0x003200, 0x006400, 0x009600, 0x00C200, 0x00FF00, 0x32FF00, 0x64FF00, 0x96FF00];
	var q=new Array(1);
	var a=new Array(8);
	var b=new Array(8);
	var c=new Array(8);
	var d=new Array(8);
	var e=new Array(8);
	var f=new Array(8);
	var wahl=1;
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
	farn();
  }
  
  function iterate(k,x,y,a,b,c,d,e,f)
    { q[0]=a[k]*x+b[k]*y+e[k];
      q[1]=c[k]*x+d[k]*y+f[k];
      return q;
    }
 
 function BerechneWkeit(anzahl,a,b,c,d) 
{ var p=new Array(anzahl);
  var h=new Array(anzahl);
  var Summe=0.0;
  for (var i=1;i<=anzahl;i++)
    {
      h[i]=Math.abs(a[i]*d[i]-b[i]*c[i]);
      Summe=Summe+h[i];
    }
  if (Summe==0) 
     Summe=0.0001;
  p[0]=0.0;
  for (i=1;i<anzahl;i++)
    {
      h[i]=h[i]/Summe;
      if (h[i]==0)
         h[i]=0.003;
      p[i]=p[i-1]+h[i];
    }
  p[anzahl]=1.0;
  return p;
} 

 function zeichne()
 {
  var imageData = ctx.getImageData(0, 0, W, H);
  var buf = new ArrayBuffer(imageData.data.length);
  var buf8 = new Uint8ClampedArray(buf);
  var data = new Uint32Array(buf);
  q[0]=0.0; q[1]=0.0;
  p=BerechneWkeit(anzahl,a,b,c,d);
  document.getElementById("ART").innerHTML=fractal+"&nbsp;("+n+"&nbsp;Punkte)";
  for (i=1;i<=n;i++) {        
    var zufall=Math.random();
    var k=0;
    while (! ((p[k] <= zufall) && (zufall<=p[k+1]))) k++;
    k++;    
    q=iterate(k,q[0],q[1],a,b,c,d,e,f);          
    var xpixel=Math.round(q[0]*W);
    var ypixel=H-Math.round(q[1]*H*0.97);
	data[ypixel * W + xpixel] = farbe[k];
   }
  imageData.data.set(buf8);
  ctx.putImageData(imageData, 0, 0);  
 }

  function farn() {
	document.getElementById(wahl).style.backgroundColor ="#E0FFFF";
	wahl=1;
	document.getElementById("1").style.backgroundColor ="#00FF00";
	fractal="Farn"; 
    anzahl=4;
	a=[0,0,0.197,-0.15,0.849];b=[0,0,-0.226,0.283,0.037];c=[0,0,0.226,0.26,-0.037];
	d=[0,0.16,0.197,0.237,0.849];e=[0,0.5,0.4,0.575,0.075];f=[0,0,0.049,-0.084,0.183];
    zeichne();
  }

  function ahorn() {
	document.getElementById(wahl).style.backgroundColor ="#E0FFFF";
	wahl=2;
	document.getElementById("2").style.backgroundColor ="#00FF00";
	fractal="Ahorn";
    anzahl=5;
	a=[0,0.352,0.353,0.5,0.502,0.004];b=[0,0.355,-0.354,0,-0.002,0];c=[0,-0.355,0.354,0,0.002,0];
	d=[0,0.352,0.353,0.5,0.588,0.578];e=[0,0.354,0.288,0.25,0.25,0.501];f=[0,0.5,0.153,0.462,0.105,0.03];
    zeichne();	
  }

  function sierpinski() {
	document.getElementById(wahl).style.backgroundColor ="#E0FFFF";
	wahl=3;
	document.getElementById("3").style.backgroundColor ="#00FF00";
	fractal="Sierpinski";
    anzahl=3;
	a=[0,0.5,0.5,0.5];b=[0,0,0,0];c=b;d=[0,0.5,0.5,0.5];e=[0,0,0.5,0.25];f=[0,0,0,0.5];
    zeichne();	
  }

  function eiche() {
	document.getElementById(wahl).style.backgroundColor ="#E0FFFF";
	wahl=4;
	document.getElementById("4").style.backgroundColor ="#00FF00";
	fractal="Eiche";
    anzahl=5;
	a=[0,0.195,0.462,-0.058,-0.035,-0.637];b=[0,-0.488,0.414,-0.07,0.07,0];c=[0,0.344,-0.252,0.453,-0.469,0];
	d=[0,0.443,0.361,-0.111,-0.022,0.501];e=[0,0.4431,0.2511,0.5976,0.4884,0.8562];f=[0,0.2452,0.5692,0.0969,0.5069,0.2513];
    zeichne();	
  }

  function baum() {
    document.getElementById(wahl).style.backgroundColor ="#E0FFFF";
	wahl=5;
	document.getElementById("5").style.backgroundColor ="#00FF00";	  
	fractal="Baum";
    anzahl=8;
	a=[0,0.0086,0.4481,0.0118,-0.0447,0.6314,0.2711,-0.1151,0.0165];b=[0,-0.127,0.5287,-0.0022,-0.4193,-0.1371,0.3458,0.2965,0];
	c=[0,0.0053,-0.2171,0.0001,0.4365,0.1303,-0.2493,-0.2193,0];d=[0,0.2035,0.5339,0.3729,-0.043,0.6644,0.3761,-0.1556,0.0613];
	e=[0,0.5239,0.2934,0.5114,0.4809,0.1062,0.3631,0.6246,0.5087];f=[0,0.1685,0.4904,0.0195,0.0941,0.2368,0.3575,0.4381,0.0022];
	zeichne();
  }

  function koch() {
	document.getElementById(wahl).style.backgroundColor ="#E0FFFF";
	wahl=6;
	document.getElementById("6").style.backgroundColor ="#00FF00";
    fractal="Koch";
    anzahl=4;
	a=[0,0.3333,0.3333,0.1667,-0.1667];b=[0,0,0,-0.2887,0.2887];c=[0,0,0,0.2887,0.2887];
	d=[0,0.3333,0.3333,0.1667,0.1667];e=[0,0,0.6667,0.3333,0.6667];f=[0,0,0,0,0];
	zeichne();
  }
  
  function duerer() {
	document.getElementById(wahl).style.backgroundColor ="#E0FFFF";
	wahl=7;
	document.getElementById("7").style.backgroundColor ="#00FF00";
	fractal="Dürer";
    anzahl=5;
	a=[0,0.382,0.382,0.382,0.382,0.382];b=[0,0,0,0,0,0];c=b;
	d=a;e=[0,0.3072,0.6033,0.0139,0.1253,0.492];f=[0,0.619,0.4044,0.4044,0.0595,0.0595];
	zeichne();
  }

  function menger() {
	document.getElementById(wahl).style.backgroundColor ="#E0FFFF";
	wahl=8;
	document.getElementById("8").style.backgroundColor ="#00FF00";
	fractal="Menger";
    anzahl=8;
	a=[0,0.333,0.333,0.333,0.333,0.333,0.333,0.333,0.333];b=[0,0,0,0,0,0,0,0,0];c=b;
	d=a;e=[0,0,0.3333,0.6667,0,0.6667,0,0.3333,0.6667];f=[0,0,0,0,0.3333,0.3333,0.6667,0.6667,0.6667];
    zeichne();	
  }

  function drache() {
	document.getElementById(wahl).style.backgroundColor ="#E0FFFF";
	wahl=9;
	document.getElementById("9").style.backgroundColor ="#00FF00";
	fractal="Drache";
    anzahl=3;
	a=[0,0,0,0];b=[0,0.58,0.58,0.58];c=[0,-0.58,-0.58,-0.58];
	d=a;e=[0,0.0861,0.44,0.0952];f=[0,0.58,0.77,0.9893];
    zeichne();	
  }

  function doppelt() {
	document.getElementById('half').disabled=false;
	if (n<=80000) {
	  if (n==80000) document.getElementById('double').disabled=true;
	  n=2*n;
	  zeichne();
	}	
  }

  function halb() {
	document.getElementById('double').disabled=false;
	if (n>=10000) {
      if (n==10000) document.getElementById('half').disabled=true;
	  n=n/2;
	  zeichne();
	}	
  }