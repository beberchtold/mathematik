// Progamm zu Phasenplot komplexe Funktionen auf www.mathematik.ch
// copyright Bernhard Berchtold
// 4.1.2016
// Mai 2020: infos.html in neuem Fenster

X0 = -3; X1 = 3;
Y0 = -3; Y1 = 3;
var term;
var canvas1;
var ctx;
var initmade = false;
var W;
var H;
var palet1=true;

window.onload = function () {
    resizeCanvas();
}

function resizeCanvas() {
    var a = document.getElementById("containercanvas");
    a.width = a.offsetWidth;
    W = a.width;
    if (W > 400) W = 400;
    H = W;
    if (initmade) {
        resize1();
		zeichne();       
    } 
	else init();
}

function init() {
    initmade = true;
    window.addEventListener("resize", function (a) {
        resizeCanvas();
    });
    canvas1 = document.getElementById("myCanvas");
    resize1();
    ctx = canvas1.getContext("2d");
	term='(z*z-1)/(z-2+i)';
	zeichne();
}

function resize1() {
    canvas1.width = W;
    canvas1.height = H
}

function palette1() {
  if (!palet1) {palet1=true; zeichne();} 
}

function palette2() {
  if (palet1) {palet1=false; zeichne();}
}

function zeichne() {
	var imageData = ctx.getImageData(0, 0, W, H);
    var buf = new ArrayBuffer(imageData.data.length);
    var buf8 = new Uint8ClampedArray(buf);
    var data = new Uint32Array(buf);
	var i = (X1 - X0) / W;
    var h = (Y1 - Y0) / H;
    for (var g = 0; g < W; g++) {
      for (var f = 0; f < H; f++) {
        var x = X0 + i * g;
        var y = Y1 - h * f;
		var fkt = parseterm(term,x,y);
		var r2=fkt[0]*fkt[0]+fkt[1]*fkt[1];
        //Phase ermitteln
        var phif=-Math.atan2(fkt[1],fkt[0]);
        if (phif<0) phif+=2*Math.PI;
        //Zeichenfarbe wählen
		var phi_n = Math.floor(phif*3/Math.PI);
        var maxf = Math.round(3*255/Math.PI*(phif-phi_n*Math.PI/3));
        if (palet1) {
		  var ranteil=90;
		  if (r2<=1) ranteil=255;
		    else if (1<r2 && r2<=4) ranteil=200;
		       else if (4<r2 && r2<=9) ranteil=145;
		  var fhexa=hexadez(maxf);
		  var fhexaquer=hexadez(255-maxf);
		  switch (phi_n) {		
            case 0: Red = 'FF'; Green = '00'; Blue = fhexa; break;
            case 1: Red = fhexaquer; Green = '00'; Blue = 'FF'; break;
            case 2: Red = '00'; Green = fhexa; Blue = 'FF'; break;
            case 3: Red = '00'; Green = 'FF'; Blue = fhexaquer; break;
            case 4: Red = fhexa; Green = 'FF'; Blue = '00'; break;
            default: Red = 'FF'; Green = fhexaquer; Blue = '00';
          }
	    }
        else {
          var ranteil=255;			
		  switch (phi_n) {		
            case 0: Red = 75; Green = 0; Blue = maxf; break;
            case 1: Red = 255-maxf; Green = 0; Blue = 75; break;
            case 2: Red = 0; Green = maxf; Blue = 75; break;
            case 3: Red = 0; Green = 75; Blue = 255-maxf; break;
            case 4: Red = maxf; Green = 75; Blue = 0; break;
            default: Red = 75; Green = 255-maxf; Blue = 0;
		  }	
		}		
		var color='0x'+Red+Green+Blue;
		data[f * W + g] = (ranteil << 24) | ((color & 0xff) << 16) | (color & 0x00ff00) | (color >> 16);
        }
    }
    imageData.data.set(buf8);
    ctx.putImageData(imageData, 0, 0);
}

function einlesen() {
	var Fehler=false;
	ctx.clearRect(0,0,W,H);
	term = document.getElementById("f").value;
	var zaehler1=0; var zaehler2=0;
	var hilf="0123456789+-*/zi()";
	for (var i=0;i<term.length;i++) {
	  var ch1=term.charAt(i);
	  if (hilf.indexOf(ch1)==-1) {Fehler=true;alert('Ungültiges Zeichen');return;}
	  if (ch1=='(') zaehler1++;
	  if (ch1==')') zaehler2++;	  
    }
    if (zaehler1!=zaehler2) {Fehler=true;alert('Fehler bei Anzahl Klammern');}
	if (term.charAt(0)=='*' || term.charAt(0)=='/') {Fehler=true;alert('1.Zeichen darf nicht * oder / sein');}
	if (!Fehler) {
	  for (i=0;i<term.length-1;i++) {
	    ch1=term.charAt(i);
	    if (ch1=='+' || ch1=='-' || ch1=='*' || ch1=='/') var op=true;
	    if (ch1=='(' || ch1==')') var klamm=true;
	    var ch2=term.charAt(i+1);
	    if (op && (ch2=='+' || ch2=='-' || ch2=='*' || ch2=='/')) {Fehler=true;alert('2 Opzeichen hintereinander');return;}
	      else op=false;
	    if (klamm && (ch2=='(' || ch2==')')) {Fehler=true;alert('2 Klammern hintereinander');return;}
          else klamm=false;
        if ((ch1>='0' && ch1<='9') ||  (ch1=='i') || (ch1=='z')) var operand=true;
	    if (operand && ((ch2>='0' && ch2<='9') || (ch2=='i') || (ch2=='z'))) {Fehler=true;alert('Zahl>9 oder Opzeichen zwischen zwei Zeichen fehlt');return;}
          else operand=false;
	  }
	}
	if (!Fehler) {
	  if (term.charAt(0)=='-' || term.charAt(0)=='+') term='0'+term;
	  zeichne();
	}
}

function beispiel() {
  document.getElementById("f").value="(z*z-1)/(z-2+i)*(z-2-i)/(z*z+2+i)";
  einlesen();
}

function sum(x1,y1,x2,y2) {
  return [x1+x2,y1+y2];
}
function product(x1,y1,x2,y2) {
  var p1=(x1-y1)*(x2+y2);
  var p2=y1*x2;
  var p3=x1*y2;
  return [p1+p2-p3,p2+p3];
}
function quot(x1,y1,x2,y2) {
  var N=x2*x2+y2*y2;
  var hilf=product(x1,y1,x2,-y2);
  return [hilf[0]/N,hilf[1]/N];
}
function hexadez(x) {
  var rest=x%16;
  var n=(x-rest)/16;
  if (rest>9) rest=String.fromCharCode(rest+55);
  if (n>9) 	n=String.fromCharCode(n+55);
  return ''+n+rest;  
}

function parseterm(term,x,y) {   // fehlt: Zahlen über 9...., verschachtelte Klammern;
// falsch: z+2*i ist (z+2)*i; also 2*i+z oder z+(2*i) angeben
  var stack=new Array();
  var k=0;
  var op='';  
  for (var i=0;i<term.length;i++) {
	var ch=term.charAt(i);
	if (ch=='(') {// Zeichen von term bis ) kopieren in term1; function parseterm1 aufrufen.
	  var pos = term.indexOf(")");
	  var term1=term.slice(i+1,pos);
	  var fkt1 = parseterm1(term1,x,y);
	  stack[k]=fkt1[0];k++;stack[k]=fkt1[1];k++;
	  term=term.replace(')',' ');   // da indexOf erstes Vorkommen von ) angibt
	  i=pos;
	}
    if (op=='') {
	  if (ch=='z') {stack[k]=x;k++;stack[k]=y;k++;}
	  if (ch=='i') {stack[k]=0;k++;stack[k]=1;k++;}
	  if (ch>='0' && ch<='9') {stack[k]=parseInt(ch);k++;stack[k]=0;k++;}
      if (ch=='+' || ch=='-' || ch=='*' || ch=='/') op=ch;
	}
    else {
	  if (ch=='z') {stack[k]=x;k++;stack[k]=y;k++;}	  
	  if (ch=='i') {stack[k]=0;k++;stack[k]=1;k++;}
	  if (ch>='0' && ch<='9') {stack[k]=parseInt(ch);k++;stack[k]=0;k++;}
	  if (op=='*') var res=product(stack[k-4],stack[k-3],stack[k-2],stack[k-1]);
	  if (op=='+') var res=sum(stack[k-4],stack[k-3],stack[k-2],stack[k-1]);
	  if (op=='-') var res=sum(stack[k-4],stack[k-3],-stack[k-2],-stack[k-1]);
	  if (op=='/') var res=quot(stack[k-4],stack[k-3],stack[k-2],stack[k-1]);	  	
	  stack[k-2]=res[0]; stack[k-1]=res[1]; op=''; 
	}   
  }	
  return [stack[k-2],stack[k-1]];
}

function parseterm1(term1,x,y) {
  var stack1=new Array();  // Abarbeitung einer Klammer
  var k=0;
  var op='';  
  for (var i=0;i<term1.length;i++) {
	var ch=term1.charAt(i);
    if (op=='') {
	  if (ch=='z') {stack1[k]=x;k++;stack1[k]=y;k++;}	  
	  if (ch=='i') {stack1[k]=0;k++;stack1[k]=1;k++;}
	  if (ch>='0' && ch<='9') {stack1[k]=parseInt(ch);k++;stack1[k]=0;k++;}
      if (ch=='+' || ch=='-' || ch=='*' || ch=='/') op=ch;
	}
    else {
	  if (ch=='z') {stack1[k]=x;k++;stack1[k]=y;k++;}	  
	  if (ch=='i') {stack1[k]=0;k++;stack1[k]=1;k++;}
	  if (ch>='0' && ch<='9') {stack1[k]=parseInt(ch);k++;stack1[k]=0;k++;}
	  if (op=='*') var res1=product(stack1[k-4],stack1[k-3],stack1[k-2],stack1[k-1]);
	  if (op=='+') var res1=sum(stack1[k-4],stack1[k-3],stack1[k-2],stack1[k-1]);
	  if (op=='-') var res1=sum(stack1[k-4],stack1[k-3],-stack1[k-2],-stack1[k-1]);
	  if (op=='/') var res1=quot(stack1[k-4],stack1[k-3],stack1[k-2],stack1[k-1]);	  	
	  stack1[k-2]=res1[0]; stack1[k-1]=res1[1];op='';  
	}   
  }	
  return [stack1[k-2],stack1[k-1]];
}	
	