var W;var H;xmax=1.1;xmin=-xmax;ymax=xmax;ymin=-ymax;var xm;var ym;var r;xA=-1;yA=0;WinkelA=Math.PI;var xB=0.8;var yB=-f(xB);var xP=-0.2;var yP=f(xP);var canvas1;var ctx;var mousedown=false;var initmade=false;window.onload=resizeCanvas;function resizeCanvas(){var a=document.getElementById("containercanvas");a.width=a.offsetWidth;W=a.width;if(W>400){W=400}H=W;einheit=W/(xmax-xmin);xm=W/2;ym=H/2;r=W/(xmax-xmin);if(initmade){resize1();zeichne()}else{init()}}function init(){initmade=true;window.addEventListener("resize",function(a){resizeCanvas()});canvas1=document.getElementById("myCanvas");resize1();ctx=canvas1.getContext("2d");document.getElementById("VarP").checked=true;canvas1.addEventListener("mousedown",function(a){mousedown=true},false);canvas1.addEventListener("mouseup",function(a){mousedown=false},false);canvas1.addEventListener("mousemove",function(b){if(mousedown){var a=getMousePos(canvas1,b);var d=invmap(0,a.x);var c=invmap(1,a.y);if(document.getElementById("VarB").checked){xB=d;if(xB>1){xB=1}if(xB<-1){xB=-1}yB=f(xB);if(c<0){yB=-yB}zeichne()}else{xP=d;if(xP>1){xP=1}if(xP<-1){xP=-1}yP=f(xP);if(c<0){yP=-yP}zeichne()}}},false);zeichne()}function resize1(){canvas1.width=W;canvas1.height=H}function OnChangeCheckbox1(a){if(a.checked){document.getElementById("VarB").checked=false}else{document.getElementById("VarB").checked=true}}function OnChangeCheckbox2(a){if(a.checked){document.getElementById("VarP").checked=false;document.getElementById("Tk").checked=false}else{document.getElementById("VarP").checked=true}}function OnChangeCheckbox3(a){if(a.checked){xB=1;yB=0;document.getElementById("VarP").checked=true;document.getElementById("VarB").checked=false;zeichne()}}function Line(b,d,a,c){ctx.beginPath();ctx.moveTo(map(0,b),map(1,d));ctx.lineWidth="1";ctx.lineTo(map(0,a),map(1,c));ctx.stroke()}function map(a,b){s=2;if(a<0.5){s=(b-xmin)/(xmax-xmin)*W}if(a>0.5){s=(ymax-b)/(ymax-ymin)*H}return s}function invmap(a,b){ss=2;if(a<0.5){ss=xmin+(b*(xmax-xmin))/W}if(a>0.5){ss=(-b*(ymax-ymin))/H-ymin}return ss}function zeichne(){ctx.clearRect(0,0,W,H);ctx.beginPath();ctx.strokeStyle="black";ctx.lineWidth="1";ctx.arc(xm,ym,r,0,2*Math.PI);ctx.stroke();ctx.beginPath();Line(xA,yA,0,0);Line(xB,yB,0,0);Line(xA,yA,xB,yB);ctx.strokeStyle="red";Line(xA,yA,xP,yP);Line(xB,yB,xP,yP);ctx.stroke();var a=BerechneWinkel(xA,yA,xB,yB,xP,yP);var b=Math.round(18000*a/Math.PI)/100;peripherie.innerHTML=b;zentri.innerHTML=2*b;var c=BerechnePhi(xB,yB);ctx.beginPath();ctx.strokeStyle="black";if(yB<0){if(a<Math.PI/2){ctx.arc(xm,ym,20,2*Math.PI-c,2*Math.PI-WinkelA)}else{ctx.arc(xm,ym,20,2*Math.PI-WinkelA,2*Math.PI-c)}}else{if(a>Math.PI/2){ctx.arc(xm,ym,20,2*Math.PI-c,2*Math.PI-WinkelA)}else{ctx.arc(xm,ym,20,2*Math.PI-WinkelA,2*Math.PI-c)}}ctx.stroke();ctx.font="14px Arial";ctx.fillText("A",map(0,xA)-10,map(1,yA)+10);ctx.fillText("B",map(0,xB),map(1,yB)+10);if(yP>0){ctx.fillText("P",map(0,xP)-10,map(1,yP)-3)}else{ctx.fillText("P",map(0,xP)-10,map(1,yP)+12)}ctx.fillText("M",map(0,0)-5,map(1,0)-5)}function dostep(){if(document.getElementById("VarB").checked){var a=BerechnePhi(xB,yB);a=a+Math.PI*5/180;if(a>2*Math.PI){a=a-2*Math.PI}xB=Math.cos(a);yB=Math.sin(a)}else{var a=BerechnePhi(xP,yP);a=a+Math.PI*5/180;if(a>2*Math.PI){a=a-2*Math.PI}xP=Math.cos(a);yP=Math.sin(a)}zeichne()}function getMousePos(b,a){var c=b.getBoundingClientRect();return{x:a.clientX-c.left,y:a.clientY-c.top}}function f(a){s=0;s=Math.sqrt(1-(a*a));return s}function BerechnePhi(a,c){var b=Math.abs(Math.atan(c/a));if((a<0)&&(c>0)){b=Math.PI-b}if((a<0)&&(c<0)){b=Math.PI+b}if((a>0)&&(c<0)){b=2*Math.PI-b}return b}function BerechneWinkel(e,d,l,k,h,g){var i=Math.sqrt((l-e)*(l-e)+(k-d)*(k-d));var m=Math.sqrt((l-h)*(l-h)+(k-g)*(k-g));var j=Math.sqrt((e-h)*(e-h)+(d-g)*(d-g));if((m!=0)&&(j!=0)&&(i!=0)){Hilf=Math.acos((m*m+j*j-i*i)/2/m/j)}else{Hilf=NaN}return Hilf};