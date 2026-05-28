// Progamm zu Juliamengen auf www.mathematik.ch
// copyright Bernhard Berchtold
// Ehemaliges php-Programm transferiert nach Javascript und html5 am 3.11.2015

var W,H;
var n = 100;
var cx = -0.7;
var cy = 0.3;
var mandelbrot = false;
var farbe = [0x000000, 0x00001F, 0x00003F, 0x00005F, 0x00007F, 0x00009F, 0x0000BF, 0x0000DF, 0x0000FF, 0x001FFF, 0x003FFF, 0x005FFF, 0x007FFF, 0x009FFF, 0x00BFFF, 0x00DFFF, 0x00FFFF, 0x1FFFFF, 0x3FFFFF, 0x5FFFFF, 0x7FFFFF, 0x9FFFFF, 0x65FFFF, 0xDFFFFF, 0xffffff, 0xDFFFFF, 0xBFFFFF, 0x9FFFFF, 0x7FFFFF, 0x5FFFFF, 0x3FFFFF, 0x1FFFFF, 0x00ffff, 0x00DFFF, 0x00BFFF, 0x009FFF, 0x007FFF, 0x005FFF, 0x003FFF, 0x001FFF, 0x0000ff, 0x0000DF, 0x0000BF, 0x00009F, 0x00007F, 0x00005F, 0x00003F, 0x00001f];
Rmax = 4;
const X0 = -1.60;
const X1 = 1.60;
const DiffX = X1-X0;
const X0M = -2.20;
const X1M = 1.0;
const DiffXM = X1M-X0M;
const Y0 = -1.30;
const Y1 = 1.30;
const DiffY= Y1-Y0;
var ctx;


window.onload = init;

// nötig für data array [alpha | blue | green | red ]
// daher swap red with blue in array farbe
for (var j = 0; j<farbe.length; j++) {
    var color = farbe[j];
    farbe[j] = (255 << 24) | ((color & 0xff) << 16) | (color & 0x00ff00) | (color >> 16);
}

function init() {
    var canvas1 = document.getElementById("myCanvas");
    ctx = canvas1.getContext("2d",{willReadFrequently:true});
	W = canvas1.width;
	H = Math.round(0.80 * W);
    if (H % 2 != 0) H++;
    canvas1.addEventListener("click", function (b) {
        if (mandelbrot) {
			var W1=canvas1.offsetWidth;
			var H1 = Math.round(0.80 * W1);
            var a = getMousePos(canvas1, b);
            cx = X0M + a.x * DiffXM / (W1-1);
			if (cx<X0M) cx=X0M;
			if (cx>X1M) cx=X1M;
            cx = Math.round(cx * 1000) / 1000;
            cy = Y1 - a.y * DiffY / (H1-1);
			if (cy>Y1) cy=Y1;
			if (cy<Y0) cy=Y0;
            cy = Math.round(cy * 1000) / 1000;
            setzeWerte();
			document.getElementById("cursorpos").style.display = "none";
        }
    }, false);
    canvas1.addEventListener("mousemove", function (b) {
        if (mandelbrot) {
			var W1=canvas1.offsetWidth;
			var H1 = Math.round(0.80 * W1);
            var a = getMousePos(canvas1, b);
            var c = X0M + a.x * DiffXM / (W1-1);		
			if (c<X0M) c=X0M;
			if (c>X1M) c=X1M;
			c = Math.round(c * 100) / 100;
            var d = Y1 - a.y * DiffY / (H1-1);
			if (d<Y0) d=Y0;
			if (d>Y1) d=Y1;
            d = Math.round(d * 100) / 100;
			document.getElementById("cursorpos").style.display = "block";
			cursorpos.innerHTML="Cursorposition: x="+c+" y="+d;
        }
    }, false);
	setzeWerte();
    zeichne();
}

function mandel() {
    if (!mandelbrot) zeichnemandelbrot();
      else zeichne();
}

function zeichne() {
    mandelbrot = false;
	var imageData = ctx.getImageData(0,0,W,H);
    var buf = new ArrayBuffer(imageData.data.length);
    var buf8 = new Uint8ClampedArray(buf);
    var data = new Uint32Array(buf);
	var i = DiffX / W;
    var h = DiffY / H;
    for (var g = 0; g < W; g++) {
        for (var f = 0; f < H / 2; f++) {
            var c = X0 + i * g;
            var b = Y0 + h * f;
            var d = 0;
            while ((c * c + b * b < Rmax) && (d < n)) {
                var a = c;
                c = c * c - b * b + cx;
                b = 2 * a * b - cy;
                d++
            }
            if (d == n) {
                d = 0
            }
            var e = d - farbe.length * Math.floor(d / farbe.length);
            data[f * W + g] = farbe[e];
            var x = W - 1 - g;
            var y = H - 1 - f;
			data[y * W + x] = farbe[e];
        }
    }
    imageData.data.set(buf8);
    ctx.putImageData(imageData, 0, 0);
}

function zeichnemandelbrot() {
    mandelbrot = true;
    var imageData = ctx.getImageData(0,0,W,H);
    var buf = new ArrayBuffer(imageData.data.length);
    var buf8 = new Uint8ClampedArray(buf);
    var data = new Uint32Array(buf);
	var i = DiffXM / W;
    var h = DiffY / H;
    for (var g = 0; g < W; g++) {
        for (var f = 0; f < H / 2; f++) {
            var rc = X0M + i * g; var rz=rc;
            var ic = Y0 + h * f; var iz=ic;
            var d = 0;
            while ((rz * rz + iz * iz < Rmax) && (d < n)) {
                var a = rz;
                rz = rz * rz - iz * iz + rc;
                iz = 2 * a * iz + ic;
                d++
            }
            if (d == n) {
                d = 0
            }
            var e = d - farbe.length * Math.floor(d / farbe.length);
            data[f * W + g] = farbe[e];
            var y = H - 1 - f;
			data[y * W + g] = farbe[e];
        }
    }
    imageData.data.set(buf8);
    ctx.putImageData(imageData, 0, 0);
}

function einlesen() {
    if (document.getElementById("rc").value == "") {
        cx = -0.7
    } else {
        cx = parseFloat(document.getElementById("rc").value)
    }
    if (cx < X0M) cx = X0M;
    if (cx > X1M) cx = X1M;
    if (document.getElementById("ic").value == "") {
        cy = 0.3
    } else {
        cy = parseFloat(document.getElementById("ic").value)
    }
    if (cy < Y0) cy = Y0;
    if (cy > Y1) cy = Y1;
    setzeWerte();
    zeichne();
}

function setzeWerte() {
    document.getElementById("rc").value = cx;
    document.getElementById("ic").value = cy;
}

function getMousePos(b, a) {
    var c = b.getBoundingClientRect();
    return {x:a.clientX - c.left,y:a.clientY - c.top}
}

function logo() {
    cx = 0;
    cy = 1;
    setzeWerte();
    zeichne();
}

function doppelt() {
	document.getElementById('half').disabled=false;
	if (n<=200) {
	  if (n==200) document.getElementById('double').disabled=true;
	  n=2*n;
	  document.getElementById("N").innerHTML = n;
	  if (mandelbrot) zeichnemandelbrot();
		else zeichne();
	}	
  }

function halb() {
	document.getElementById('double').disabled=false;
	if (n>=50) {
	  if (n==50) document.getElementById('half').disabled=true;
	  n=n/2;
	  document.getElementById("N").innerHTML = n;
	  if (mandelbrot) zeichnemandelbrot();
		else zeichne();
	}	
  }