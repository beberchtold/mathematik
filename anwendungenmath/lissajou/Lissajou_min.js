var W,H;var xm,ym;var a=4,b=3,k=329;var as=4,bs=3,ks=329;var Farbzahl=0;var Farbe=["red","green","blue","yellow","turquoise","cyan"];var canvas1;var ctx;var initmade=false;var timer;delay=900;var Weiter=false;var stop;window.onload=resizeCanvas;function resizeCanvas(){var c=document.getElementById("containercanvas");c.width=c.offsetWidth;W=c.width;if(W>400){W=400}H=Math.round(0.9*W);xm=W/2;ym=H/2;if(initmade){resize1();zeichne()}else{init()}}function init(){initmade=true;window.addEventListener("resize",function(c){resizeCanvas()});canvas1=document.getElementById("myCanvas");resize1();ctx=canvas1.getContext("2d");benutzer()}function resize1(){canvas1.width=W;canvas1.height=H}function run(){Weiter=!Weiter;if(Weiter){document.getElementById("RUN").value="Stop";for(var c=1;c<18;c++){document.getElementById("b"+c).disabled=true}}else{document.getElementById("RUN").value="Run";for(var c=1;c<18;c++){document.getElementById("b"+c).disabled=false}}stop=false;dorun()}function dorun(){if(!stop&&Weiter){dostep()}}function dostep(){stop=true;timer=setTimeout(function(){action()},delay);zufallsfigur();dorun()}function action(){stop=false;clearTimeout(timer);dorun()}function zufallsfigur(){a=Math.floor(10*Math.random())+1;b=Math.floor(10*Math.random())+1;k=Math.floor(359*Math.random())+1;setzeWerte();var c=Farbe.length;Farbzahl=Math.floor(c*Math.random());zeichne()}function benutzer(){setzeWerte();zeichne()}function benutzer1(){k=1;benutzer()}function change_a(){if(a<10){a++}else{a=1}benutzer()}function change_b(){if(b<10){b++}else{b=1}benutzer()}function change_k(){if(k<359){k++}else{k=1}benutzer()}function change_k10(){if(k<349){k+=10}else{k=1}benutzer()}function zeichne(){ctx.clearRect(0,0,W,H);ctx.beginPath();ctx.strokeStyle=Farbe[Farbzahl];ctx.lineWidth="1";var f=(k/180)*Math.PI;var e=xm-Math.round((xm-1)*Math.cos(a*f));var j=ym+Math.round((ym-1)*Math.sin(b*f));ctx.moveTo(e,j);var c=bestimmeL();for(var h=2;h<c+2;h++){f=(k/180)*h*Math.PI;var d=xm-Math.round((xm-1)*Math.cos(a*f));var g=ym+Math.round((ym-1)*Math.sin(b*f));ctx.lineTo(d,g);e=d;j=g}ctx.stroke()}function bestimmeL(){var c=k*ggT(a,b);c=ggT(c,360);return 360/c}function ggT(e,d){var f=1.5;while(f>Math.floor(f)){f=e/d;var g=e-Math.floor(f)*d;e=d;d=g}return e}function setzeWerte(){document.getElementById("A").innerHTML=a;document.getElementById("B").innerHTML=b;document.getElementById("K").innerHTML=k}function Figur(c,d,e){a=c;b=d;k=e;setzeWerte();zeichne()}function save(){as=a;bs=b;ks=k}function load(){a=as;b=bs;k=ks;setzeWerte();zeichne()};