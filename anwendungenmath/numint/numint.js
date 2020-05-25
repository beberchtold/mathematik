var W;var H;var Xmin;var Xmax;var Ymin;var Ymax;var ctx;var DiffX;var DiffY;var term;var x=new Array();var y=new Array();var ym=new Array();var nint;var reslpunkt;var resrpunkt;var resmpunkt;var restrapez;var mode=1;var canvas1;var initmade=false;window.onload=resizeCanvas;function resizeCanvas(){var a=document.getElementById("containercanvas");a.width=a.offsetWidth;W=a.width;if(W>400){W=400}H=W;if(initmade){resize1();if(mode==2){zeichnelpunkt()}if(mode==3){zeichnerpunkt()}if(mode==1){zeichnetrapez()}if(mode==4){zeichnempunkt()}zeichneKS();zeichne_funktion()}else{init()}}function ok1(){var hilf=document.getElementById("Xmin").value;var check=pruefe_grenze(hilf);if(!check){return false}Xmin=eval(hilf);if(isNaN(Xmin)){return false}hilf=document.getElementById("Xmax").value;var check=pruefe_grenze(hilf);if(!check){return false}Xmax=eval(hilf);if(isNaN(Xmax)){return false}DiffX=Xmax-Xmin;if(DiffX<=0){return false}return true}function pruefe_grenze(a){if(a.split(",").length-1>0){return false}if(a.split(".").length-1>1){return false}if((a.length>2)&&(a.charAt(0)=="-")&&(a.charAt(1)=="0")&&(a.charAt(2)!=".")){return false}if((a.length>1)&&(a.charAt(0)=="0")&&(a.charAt(1)!=".")){return false}return true}function f(x){hilf=eval(term);return hilf}function init(){initmade=true;window.addEventListener("resize",function(a){resizeCanvas()});canvas1=document.getElementById("myCanvas");resize1();ctx=canvas1.getContext("2d");document.getElementById(mode).style.backgroundColor="#00FF00";reset()}function resize1(){canvas1.width=W;canvas1.height=H}function reset(){nint=document.getElementById("Anz").value;if(nint<1){nint=1}if(nint>200){nint=200}document.getElementById("Anz").value=nint;document.getElementById("simpson").innerHTML="";leereResultate();term=document.getElementById("f").value;ergaenze_term();try{var c=f(Xmin)}catch(b){Fehlerbehandlung();return}if(!ok1()){alert("Fehler bei Grenzen KS!");return}BerechneYGrenzen();ctx.clearRect(0,0,W,H);Berechne_x_y();reslpunkt=runde(leftpoint());if(mode==2){document.getElementById("lpunkt").style.color="red";zeichnelpunkt()}resrpunkt=runde(rightpoint());if(mode==3){document.getElementById("rpunkt").style.color="red";zeichnerpunkt()}restrapez=runde(trapez());if(mode==1){document.getElementById("trapez").style.color="red";zeichnetrapez()}resmpunkt=runde(midpoint());if(mode==4){document.getElementById("mpunkt").style.color="red";zeichnempunkt()}var a=runde(simpson());document.getElementById("simpson").innerHTML=a;document.getElementById("trapez").innerHTML=restrapez;document.getElementById("lpunkt").innerHTML=reslpunkt;document.getElementById("rpunkt").innerHTML=resrpunkt;document.getElementById("mpunkt").innerHTML=resmpunkt;zeichneKS();zeichne_funktion()}function button1(){document.getElementById(mode).style.backgroundColor="#E0FFFF";mode=1;document.getElementById(mode).style.backgroundColor="#00FF00";leereResultate();document.getElementById("trapez").style.color="red";document.getElementById("trapez").innerHTML=restrapez;document.getElementById("lpunkt").innerHTML=reslpunkt;document.getElementById("rpunkt").innerHTML=resrpunkt;document.getElementById("mpunkt").innerHTML=resmpunkt;ctx.clearRect(0,0,W,H);zeichnetrapez();zeichneKS();zeichne_funktion()}function button2(){document.getElementById(mode).style.backgroundColor="#E0FFFF";mode=2;document.getElementById(mode).style.backgroundColor="#00FF00";leereResultate();document.getElementById("lpunkt").style.color="red";document.getElementById("lpunkt").innerHTML=reslpunkt;document.getElementById("rpunkt").innerHTML=resrpunkt;document.getElementById("trapez").innerHTML=restrapez;document.getElementById("mpunkt").innerHTML=resmpunkt;ctx.clearRect(0,0,W,H);zeichnelpunkt();zeichneKS();zeichne_funktion()}function button3(){document.getElementById(mode).style.backgroundColor="#E0FFFF";mode=3;document.getElementById(mode).style.backgroundColor="#00FF00";leereResultate();document.getElementById("rpunkt").style.color="red";document.getElementById("rpunkt").innerHTML=resrpunkt;document.getElementById("lpunkt").innerHTML=reslpunkt;document.getElementById("trapez").innerHTML=restrapez;document.getElementById("mpunkt").innerHTML=resmpunkt;ctx.clearRect(0,0,W,H);zeichnerpunkt();zeichneKS();zeichne_funktion()}function button4(){document.getElementById(mode).style.backgroundColor="#E0FFFF";mode=4;document.getElementById(mode).style.backgroundColor="#00FF00";leereResultate();document.getElementById("mpunkt").style.color="red";document.getElementById("rpunkt").innerHTML=resrpunkt;document.getElementById("lpunkt").innerHTML=reslpunkt;document.getElementById("trapez").innerHTML=restrapez;document.getElementById("mpunkt").innerHTML=resmpunkt;ctx.clearRect(0,0,W,H);zeichnempunkt();zeichneKS();zeichne_funktion()}function leftpoint(){var b=0;var c=DiffX/nint;for(var a=0;a<nint;a++){b=b+c*y[a]}return b}function rightpoint(){var b=0;var c=DiffX/nint;for(var a=1;a<=nint;a++){b=b+c*y[a]}return b}function midpoint(){var b=0;var c=DiffX/nint;for(var a=0;a<nint;a++){b=b+c*ym[a]}return b}function trapez(){var b=0;var c=DiffX/nint;for(var a=0;a<nint;a++){b=b+c*(y[a]+y[a+1])/2}return b}function simpson(){var b=0;if(nint%2!=0){return}var c=DiffX/nint;for(var a=0;a<nint;a+=2){b=b+c*(y[a]+4*y[a+1]+y[a+2])/3}return b}function zeichneKS(){ctx.beginPath();ctx.strokeStyle="black";ctx.lineWidth="1";ctx.font="10px Arial";var c=row(0);ctx.moveTo(0,c);ctx.lineTo(W,c);var b=Math.floor(Xmin);var a=Math.floor(Xmax);var e=c;var k=b;if(DiffX<=20){while(k<=a){var g=col(k);ctx.moveTo(g,e+3);ctx.lineTo(g,e-3);ctx.strokeText(k,g-3,e+10);k=k+1}}k=b+5-b%5;if(DiffX>20&&DiffX<80){while(k<=a){var g=col(k);ctx.moveTo(g,e+3);ctx.lineTo(g,e-3);ctx.strokeText(k,g-5,e+10);k=k+5}}ctx.moveTo(W-5,c-5);ctx.lineTo(W,c);ctx.moveTo(W-5,c+5);ctx.lineTo(W,c);var d=col(0);ctx.moveTo(d,0);ctx.lineTo(d,H);var j=Math.floor(Ymin);var i=Math.floor(Ymax);g=d;var h=j;if(DiffY<=20){while(h<=i){if(h==0){h=h+1}e=row(h);ctx.moveTo(g-3,e);ctx.lineTo(g+3,e);ctx.strokeText(h,g-12,e+3);h=h+1}}h=j+5-j%5;if(DiffY>20&&DiffY<80){while(h<=i){if(h==0){h=h+5}e=row(h);ctx.moveTo(g-3,e);ctx.lineTo(g+3,e);ctx.strokeText(h,g-16,e+3);h=h+5}}ctx.moveTo(d-5,5);ctx.lineTo(d,0);ctx.moveTo(d+5,5);ctx.lineTo(d,0);ctx.stroke()}function zeichne_funktion(){ctx.beginPath();ctx.strokeStyle="green";var a=Xmin;var c=DiffX/W;while(isNaN(f(a))){a=a+c}var j=a;var g=f(a);var b=row(g);var h=col(a);ctx.moveTo(h,b);for(var e=h+1;e<W;e++){a=Xmin+DiffX/W*e;var d=f(a);if(Math.abs(d-g)<DiffY/2&&!isNaN(d)){ctx.lineTo(e,row(d))}else{ctx.moveTo(e,row(d))}g=d}ctx.stroke()}function zeichnelpunkt(){var d=W/nint;if(d<1){d=1}var a=row(0);if(a>H){a=H}ctx.beginPath();ctx.fillStyle="#F06060";for(var c=0;c<nint;c++){var b=row(y[c]);ctx.rect(col(x[c]),b,d,a-b);ctx.fill()}}function zeichnerpunkt(){var d=W/nint;if(d<1){d=1}var a=row(0);if(a>H){a=H}ctx.beginPath();ctx.fillStyle="#F06060";for(var c=0;c<nint;c++){var b=row(y[c+1]);ctx.rect(col(x[c]),b,d,a-b);ctx.fill()}}function zeichnempunkt(){var d=W/nint;if(d<1){d=1}var a=row(0);if(a>H){a=H}ctx.beginPath();ctx.fillStyle="#F06060";for(var c=0;c<nint;c++){var b=row(ym[c]);ctx.rect(col(x[c]),b,d,a-b);ctx.fill()}}function zeichnetrapez(){if(nint>W){zeichnelpunkt();return}var b=row(0);if(b>H){b=H}ctx.fillStyle="#F06060";for(var d=0;d<nint;d++){ctx.beginPath();var a=col(x[d]);var c=row(y[d]);if(c<0){c=0}if(c>H){c=H}var e=col(x[d+1]);ctx.moveTo(a,b);ctx.lineTo(a,c);ctx.lineTo(e,row(y[d+1]));ctx.lineTo(e,b);ctx.fill()}}function Berechne_x_y(){var b=DiffX/nint;x[nint]=Xmax;y[nint]=f(Xmax);for(var a=0;a<nint;a++){x[a]=Xmin+a*b;y[a]=f(x[a]);ym[a]=f(Xmin+b/2+a*b)}}function BerechneYGrenzen(){var a=Xmin;var b=DiffX/100;while(isNaN(f(a))){a=a+b}Ymin=f(a);Ymax=Ymin;while(a+b<=Xmax){a=a+b;var c=f(a);if(!isNaN(c)&&c<Ymin){Ymin=c}if(!isNaN(c)&&c>Ymax){Ymax=c}}DiffY=Ymax-Ymin;if(DiffY<50){Ymin=Ymin-0.1*DiffY;Ymax=Ymax+0.1*DiffY}if(DiffY==0){if(Ymax>50){Ymax=50}}if(Ymin<-50){Ymin=-50}DiffY=Ymax-Ymin;if(DiffY==0){DiffY=1.03*Ymax}}function col(a){return((a-Xmin)/DiffX*W)}function row(a){return((Ymax-a)/DiffY*H)}function runde(a){return Math.round(1000000*a)/1000000}function ergaenze_term(){term=term.replace(/asin/g,"hilfa");term=term.replace(/acos/g,"hilfb");term=term.replace(/atan/g,"hilfc");term=term.replace(/sin/g,"Math.sin");term=term.replace(/cos/g,"Math.cos");term=term.replace(/tan/g,"Math.tan");term=term.replace(/hilfa/g,"Math.asin");term=term.replace(/hilfb/g,"Math.acos");term=term.replace(/hilfc/g,"Math.atan");term=term.replace(/abs/g,"Math.abs");term=term.replace(/pow/g,"Math.pow");term=term.replace(/sqrt/g,"Math.sqrt");term=term.replace(/log/g,"Math.log");term=term.replace(/ln/g,"Math.log");term=term.replace(/exp/g,"Math.ixp");term=term.replace(/e/g,"Math.E");term=term.replace(/Math.ixp/g,"Math.exp");term=term.replace(/pi/g,"Math.PI")}function leereResultate(){document.getElementById("trapez").style.color="black";document.getElementById("lpunkt").style.color="black";document.getElementById("rpunkt").style.color="black";document.getElementById("mpunkt").style.color="black";document.getElementById("trapez").innerHTML="";document.getElementById("lpunkt").innerHTML="";document.getElementById("rpunkt").innerHTML="";document.getElementById("mpunkt").innerHTML=""}function Fehlerbehandlung(){alert("Fehler im Funktionsterm. Bitte korrigieren.")};