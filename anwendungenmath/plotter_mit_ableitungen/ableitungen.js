var W;var H;var Xmin=-4.1;var Xmax=4.1;var Ymin=-2.1;var Ymax=2.1;var ctx;var DiffX;var DiffY;var term;var canvas1;var initmade=false;window.onload=resizeCanvas;function resizeCanvas(){var a=document.getElementById("containercanvas");a.width=a.offsetWidth;W=a.width;H=W;if(initmade){resize1();zeichneKS();zeichne_funktion();if(document.getElementById("Abl1").checked){zeichne_ableitung1()}if(document.getElementById("Abl2").checked){zeichne_ableitung2()}}else{init()}}function ok1(){var hilf=document.getElementById("Xmin").value;var check=pruefe_grenze(hilf);if(!check){return false}Xmin=eval(hilf);if(isNaN(Xmin)){return false}hilf=document.getElementById("Xmax").value;var check=pruefe_grenze(hilf);if(!check){return false}Xmax=eval(hilf);if(isNaN(Xmax)){return false}hilf=document.getElementById("Ymin").value;var check=pruefe_grenze(hilf);if(!check){return false}Ymin=eval(hilf);if(isNaN(Ymin)){return false}hilf=document.getElementById("Ymax").value;var check=pruefe_grenze(hilf);if(!check){return false}Ymax=eval(hilf);if(isNaN(Ymax)){return false}DiffX=Xmax-Xmin;if(DiffX<=0){return false}DiffY=Ymax-Ymin;if(DiffY<=0){return false}return true}function pruefe_grenze(a){if(a.split(",").length-1>0){return false}if(a.split(".").length-1>1){return false}if((a.length>2)&&(a.charAt(0)=="-")&&(a.charAt(1)=="0")&&(a.charAt(2)!=".")){return false}if((a.length>1)&&(a.charAt(0)=="0")&&(a.charAt(1)!=".")){return false}return true}function f(x){hilf=eval(term);if(isNaN(hilf)){return 100000}return hilf}function f1(b,a,d,c){hilf=(c-d)/(a-b);if(d==100000||c==100000){return 100000}return hilf}function init(){initmade=true;window.addEventListener("resize",function(a){resizeCanvas()});term="Math.sin(x)";canvas1=document.getElementById("myCanvas");resize1();ctx=canvas1.getContext("2d");DiffX=Xmax-Xmin;DiffY=Ymax-Ymin;zeichneKS();zeichne_funktion()}function resize1(){canvas1.width=W;canvas1.height=H}function zeichne(){if(!ok1()){return}zeichneKS();term=document.getElementById("f").value;ergaenze_term();var a=1.234567;try{var c=f(a)}catch(b){Fehlerbehandlung();return}zeichne_funktion();if(document.getElementById("Abl1").checked){zeichne_ableitung1()}if(document.getElementById("Abl2").checked){zeichne_ableitung2()}}function zeichneKS(){ctx.clearRect(0,0,W,H);ctx.beginPath();ctx.strokeStyle="black";ctx.lineWidth="1";ctx.font="10px Arial";var c=row(0);ctx.moveTo(0,c);ctx.lineTo(W,c);var b=Math.floor(Xmin);var a=Math.floor(Xmax);var e=c;var k=b;if(DiffX<=20){while(k<=a){var g=col(k);ctx.moveTo(g,e+3);ctx.lineTo(g,e-3);ctx.strokeText(k,g-3,e+10);k=k+1}}k=b+5-b%5;if(DiffX>20&&DiffX<80){while(k<=a){var g=col(k);ctx.moveTo(g,e+3);ctx.lineTo(g,e-3);ctx.strokeText(k,g-5,e+10);k=k+5}}ctx.moveTo(W-5,c-5);ctx.lineTo(W,c);ctx.moveTo(W-5,c+5);ctx.lineTo(W,c);var d=col(0);ctx.moveTo(d,0);ctx.lineTo(d,H);var j=Math.floor(Ymin);var i=Math.floor(Ymax);g=d;var h=j;if(DiffY<=20){while(h<=i){if(h==0){h=h+1}e=row(h);ctx.moveTo(g-3,e);ctx.lineTo(g+3,e);ctx.strokeText(h,g-12,e+3);h=h+1}}h=j+5-j%5;if(DiffY>20&&DiffY<80){while(h<=i){if(h==0){h=h+5}e=row(h);ctx.moveTo(g-3,e);ctx.lineTo(g+3,e);ctx.strokeText(h,g-16,e+3);h=h+5}}ctx.moveTo(d-5,5);ctx.lineTo(d,0);ctx.moveTo(d+5,5);ctx.lineTo(d,0);ctx.stroke()}function zeichne_funktion(){ctx.beginPath();ctx.strokeStyle="green";var e=f(Xmin);var b=row(e);ctx.moveTo(0,b);for(var d=0;d<W;d++){var a=Xmin+DiffX/W*d;var c=f(a);if(Math.abs(c-e)<DiffY/2&&c!=100000){ctx.lineTo(d,row(c))}else{ctx.moveTo(d,row(c))}e=c}ctx.stroke()}function zeichne_ableitung1(){ctx.beginPath();ctx.strokeStyle="red";var b=Xmin;var h=f(b);for(var e=1;e<W;e++){var a=Xmin+DiffX/W*e;var d=f(a);var c=f1(b,a,h,d);if(e==1){ctx.moveTo(1,row(c))}else{if(Math.abs(c-g)<DiffY/2&&d!=100000){ctx.lineTo(e,row(c))}else{ctx.moveTo(e,row(c))}}b=a;h=d;var g=c}ctx.stroke()}function zeichne_ableitung2(){ctx.beginPath();ctx.strokeStyle="blue";var c=Xmin;var l=f(c);var g=0;while(l==100000){c=c+DiffX/W;l=f(c);g++}var b=c+DiffX/W;var k=f(b);var e=f1(c,b,l,k);c=b;l=k;var h=g+1;while(h<W){h++;b=c+DiffX/W;k=f(b);var d=f1(c,b,l,k);var j=f1(c,b,e,d);if(h==g+2){ctx.moveTo(h,row(j))}else{if(Math.abs(j-a)<DiffY/2){ctx.lineTo(h,row(j))}else{ctx.moveTo(h,row(j))}}c=b;l=k;e=d;var a=j}ctx.stroke()}function col(a){return((a-Xmin)/DiffX*W)}function row(a){return((Ymax-a)/DiffY*H)}function ergaenze_term(){term=term.replace(/asin/g,"hilfa");term=term.replace(/acos/g,"hilfb");term=term.replace(/atan/g,"hilfc");term=term.replace(/sin/g,"Math.sin");term=term.replace(/cos/g,"Math.cos");term=term.replace(/tan/g,"Math.tan");term=term.replace(/hilfa/g,"Math.asin");term=term.replace(/hilfb/g,"Math.acos");term=term.replace(/hilfc/g,"Math.atan");term=term.replace(/abs/g,"Math.abs");term=term.replace(/pow/g,"Math.pow");term=term.replace(/sqrt/g,"Math.sqrt");term=term.replace(/log/g,"Math.log");term=term.replace(/ln/g,"Math.log");term=term.replace(/exp/g,"Math.ixp");term=term.replace(/e/g,"Math.E");term=term.replace(/Math.ixp/g,"Math.exp");term=term.replace(/pi/g,"Math.PI")}function Fehlerbehandlung(){alert("Fehler im Funktionsterm. Bitte korrigieren.")};