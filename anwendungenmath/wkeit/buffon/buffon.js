var W,H;var n=400;var anzahl;var canvas1;var ctx;var initmade=false;window.onload=resizeCanvas;function resizeCanvas(){var a=document.getElementById("containercanvas");a.width=a.offsetWidth;W=a.width;H=Math.floor(0.6*W);if(initmade){resize1();zeichne()}else{init()}}function init(){initmade=true;window.addEventListener("resize",function(a){resizeCanvas()});canvas1=document.getElementById("myCanvas");resize1();Walt=W;ctx=canvas1.getContext("2d");zeichne()}function resize1(){canvas1.width=W;canvas1.height=H}function zeichne(){document.getElementById("N").innerHTML=""+n;ctx.clearRect(0,0,W,H);anzahl=0;var h=Math.floor(H/3);ctx.beginPath();ctx.strokeStyle="black";ctx.lineWidth="1";line(0,h,W,h);line(0,2*h,W,2*h);ctx.stroke();for(i=0;i<n;i++){ctx.beginPath();y=Math.random();var a=Math.PI*Math.random();var g=(W/2)+4*(Math.random()-0.5)*h;var c=(h/2)*Math.sin(a);var o=(h/2)*Math.cos(a);var d=(1+y)*h;var f=g+c;var p=d+o;var j=g-c;var b=d-o;if(Math.floor(p/h)!=Math.floor(b/h)){anzahl++;ctx.strokeStyle="blue"}else{ctx.strokeStyle="red"}line(f,p,j,b);ctx.stroke()}var m=anzahl/n;document.getElementById("Anzb").innerHTML=""+Math.round(10000*m)/10000;var e=Math.round(10000*2/m)/10000;document.getElementById("Res").innerHTML=""+e}function line(b,d,a,c){ctx.moveTo(b,d);ctx.lineTo(a,c)}function doppelt(){document.getElementById("half").disabled=false;if(n<=12800){if(n==12800){document.getElementById("double").disabled=true}n=2*n;zeichne()}}function halb(){document.getElementById("double").disabled=false;if(n>=50){if(n==50){document.getElementById("half").disabled=true}n=n/2;zeichne()}};