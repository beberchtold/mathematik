W=320;H=W;xmax=10;xmin=-xmax;ymax=xmax;ymin=-ymax;einheit=W/(xmax-xmin);xF=0;yF=0;yl=-4;xF1=-6;xF2=-xF1;var yA;var yB;xC=xmin+0.5;var yC=2;var r,r2;var yP1;var xP1;xP=new Array();yP=new Array();var anzahl=0;var mode=2;var canvas1;var ctx;var mousedown=false;window.onload=init;function init(){canvas1=document.getElementById("myCanvas");ctx=canvas1.getContext("2d");document.getElementById("parabel").checked=true;canvas1.addEventListener("mousedown",function(a){mousedown=true},false);canvas1.addEventListener("mouseup",function(a){mousedown=false},false);canvas1.addEventListener("mousemove",function(b){if(mousedown){var a=getMousePos(canvas1,b);var c=invmap(1,a.y);if(mode==1){yC=c;if(yC>yA){yC=yA}if(yC<yB){yC=yB}zeichne()}if(mode==3){yC=c;if(yC>yB){yC=yB}zeichne()}if(mode==2){yC=c;if(yC<(yl+yF)/2){yC=(yl+yF)/2}zeichne()}}},false);zeichne()}function OnChangeradio0(a){if(a.checked){mode=1;yA=8;yB=-8;yC=2;anzahl=0;zeichne()}}function OnChangeradio1(a){if(a.checked){mode=2;yC=2;anzahl=0;zeichne()}}function OnChangeradio2(a){if(a.checked){mode=3;yC=-7;yA=8;yB=-1;anzahl=0;zeichne()}}function Line(b,d,a,c){ctx.beginPath();ctx.moveTo(map(0,b),map(1,d));ctx.lineWidth="1";ctx.lineTo(map(0,a),map(1,c));ctx.stroke()}function map(a,b){s=2;if(a<0.5){s=(b-xmin)/(xmax-xmin)*W}if(a>0.5){s=(ymax-b)/(ymax-ymin)*H}return s}function invmap(a,b){ss=2;if(a<0.5){ss=xmin+(b*(xmax-xmin))/W}if(a>0.5){ss=(-b*(ymax-ymin))/H-ymin}return ss}function zeichne(){ctx.clearRect(0,0,W,H);ctx.beginPath();ctx.lineWidth="1";ctx.font="14px sans-serif";ctx.strokeStyle="#A0A0A0";Line(xC,ymin,xC,ymax);ctx.stroke();ctx.fillText("C",map(0,xC)+2,map(1,yC)+14);ctx.beginPath();ctx.strokeStyle="orange";ctx.arc(map(0,xC),map(1,yC),3,0,2*Math.PI);ctx.stroke();ctx.beginPath();ctx.strokeStyle="black";if((mode==1)||(mode==3)){ctx.fillText("A",map(0,xC)+2,map(1,yA));ctx.fillText("B",map(0,xC)+2,map(1,yB)+8);Line(xC,yB,xC,yA);ctx.stroke();ctx.beginPath();ctx.arc(map(0,xF1),map(1,yF),2,0,2*Math.PI);ctx.stroke();ctx.fillText("F1",map(0,xF1)-7,map(1,yF)+16);ctx.fillText("F2",map(0,xF2)-7,map(1,yF)+16);ctx.beginPath();ctx.arc(map(0,xF2),map(1,yF),2,0,2*Math.PI);ctx.stroke();ctx.beginPath();ctx.strokeStyle="green";r=Math.abs(yA-yC);r2=Math.abs(yC-yB);ctx.arc(map(0,xF1),map(1,yF),r*einheit,0,2*Math.PI);ctx.stroke();ctx.beginPath();ctx.arc(map(0,xF2),map(1,yF),r2*einheit,0,2*Math.PI);ctx.stroke();xP1=(r*r-r2*r2-xF1*xF1+xF2*xF2)/2/(xF2-xF1);xP[anzahl]=xP1;yP1=Math.sqrt(r*r-(xP1-xF1)*(xP1-xF1));yP[anzahl]=yP1;if(anzahl<300){anzahl=anzahl+1}ctx.strokeStyle="blue";for(var a=0;a<anzahl;a++){ctx.beginPath();ctx.arc(map(0,xP[a]),map(1,yP[a]),1,0,2*Math.PI);ctx.stroke();ctx.beginPath();ctx.arc(map(0,xP[a]),map(1,-yP[a]),1,0,2*Math.PI);ctx.stroke();if(mode==3){ctx.beginPath();ctx.arc(map(0,-xP[a]),map(1,yP[a]),1,0,2*Math.PI);ctx.stroke();ctx.beginPath();ctx.arc(map(0,-xP[a]),map(1,-yP[a]),1,0,2*Math.PI);ctx.stroke()}}ctx.beginPath();ctx.arc(map(0,xP1),map(1,yP1),2,0,2*Math.PI);ctx.stroke();ctx.beginPath();ctx.arc(map(0,xP1),map(1,-yP1),2,0,2*Math.PI);ctx.stroke();if(mode==3){ctx.beginPath();ctx.arc(map(0,-xP1),map(1,yP1),2,0,2*Math.PI);ctx.stroke();ctx.beginPath();ctx.arc(map(0,-xP1),map(1,-yP1),2,0,2*Math.PI);ctx.stroke()}}if(mode==2){Line(xmin,yl,xmax,yl);Line(xC,(yl+yF)/2,xC,ymax);ctx.stroke();ctx.beginPath();ctx.arc(map(0,xF),map(1,yF),2,0,2*Math.PI);ctx.stroke();ctx.fillText("F",map(0,xF)-5,map(1,yF)+16);ctx.fillText("l",W/2,map(1,yl)+14);ctx.beginPath();ctx.strokeStyle="green";Line(xmin,yC,xmax,yC);ctx.stroke();ctx.beginPath();r=yC-yl;ctx.arc(map(0,xF),map(1,yF),r*einheit,0,2*Math.PI);ctx.stroke();yP1=yC;yP[anzahl]=yP1;xP1=f(0,yP1);xP[anzahl]=xP1;if(anzahl<300){anzahl=anzahl+1}ctx.strokeStyle="blue";for(var a=0;a<anzahl;a++){ctx.beginPath();ctx.arc(map(0,xP[a]),map(1,yP[a]),1,0,2*Math.PI);ctx.stroke();ctx.beginPath();ctx.arc(map(0,-xP[a]),map(1,yP[a]),1,0,2*Math.PI);ctx.stroke()}ctx.beginPath();ctx.arc(map(0,xP1),map(1,yP1),2,0,2*Math.PI);ctx.stroke();ctx.beginPath();ctx.arc(map(0,-xP1),map(1,yP1),2,0,2*Math.PI);ctx.stroke()}}function dostep(){if(mode==2){yC=yC+0.5;if(yC>ymax){yC=(yl+yF)/2}}if(mode==1){ctx.beginPath();ctx.strokeStyle="white";ctx.arc(map(0,xF1),map(1,yF),r*einheit,0,2*Math.PI);ctx.stroke();ctx.beginPath();ctx.arc(map(0,xF2),map(1,yF),r2*einheit,0,2*Math.PI);ctx.stroke();yC=yC+0.5;if(yC>yA){yC=yB+0.5}}if(mode==3){ctx.beginPath();ctx.strokeStyle="white";ctx.arc(map(0,xF1),map(1,yF),r*einheit,0,2*Math.PI);ctx.stroke();ctx.beginPath();ctx.arc(map(0,xF2),map(1,yF),r2*einheit,0,2*Math.PI);ctx.stroke();yC=yC+0.5;if(yC>yB){yC=ymin}}zeichne()}function getMousePos(b,a){var c=b.getBoundingClientRect();return{x:a.clientX-c.left,y:a.clientY-c.top}}function f(a,b){s=0;s=Math.sqrt(r*r-b*b)+a;return s}function BerechneLaenge(b,e,a,c){var d=Math.sqrt((a-b)*(a-b)+(c-e)*(c-e));return d};