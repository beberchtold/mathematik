function resizeCanvas(){var e=document.getElementById("containercanvas");e.width=e.offsetWidth,W=e.width,W>400&&(W=400),H=Math.round(.8*W),xm=W/2,ym=H/2,initmade?(resize1(),zeichne()):init()}function init(){initmade=!0,window.addEventListener("resize",function(){resizeCanvas()}),canvas1=document.getElementById("myCanvas"),resize1(),ctx=canvas1.getContext("2d"),benutzer()}function resize1(){canvas1.width=W,canvas1.height=H}function run(){Weiter=!Weiter,Weiter?(document.getElementById("STEP").disabled=!0,document.getElementById("USER").disabled=!0):(document.getElementById("STEP").disabled=!1,document.getElementById("USER").disabled=!1),stop=!1,dorun()}function dorun(){!stop&&Weiter&&dostep()}function dostep(){stop=!0,timer=setTimeout(function(){action()},delay),zufallsfigur(),dorun()}function action(){stop=!1,clearTimeout(timer),dorun()}function zufallsfigur(){a=Math.floor(5*Math.random())+1,b=Math.floor(5*Math.random())+1,k=Math.floor(359*Math.random())+1,setzeWerte(),bestimmeL(),zeichne()}function benutzer(){a=Math.floor(document.getElementById("a").value),1>a&&(a=1),a>5&&(a=5),b=Math.floor(document.getElementById("b").value),1>b&&(b=1),b>5&&(b=5),k=Math.floor(document.getElementById("k").value),1>k&&(k=1),k>359&&(k=359),setzeWerte(),bestimmeL(),zeichne()}function zeichne(){ctx.clearRect(0,0,W,H),ctx.beginPath(),0==Farbzahl&&(ctx.strokeStyle="red"),1==Farbzahl&&(ctx.strokeStyle="green"),2==Farbzahl&&(ctx.strokeStyle="blue"),3==Farbzahl&&(ctx.strokeStyle="yellow"),ctx.lineWidth="1";var e=k/180*Math.PI,t=xm-Math.round(xm*Math.cos(a*e)),n=ym+Math.round(ym*Math.sin(b*e));ctx.moveTo(t,n);for(var o=2;L+2>o;o++){e=k/180*o*Math.PI;var r=xm-Math.round(xm*Math.cos(a*e)),i=ym+Math.round(ym*Math.sin(b*e));ctx.lineTo(r,i),t=r,n=i}ctx.stroke()}function bestimmeL(){var e=k*ggT(a,b);e=ggT(e,360),L=360/e,Farbzahl=Math.floor(4*Math.random())}function ggT(e,t){for(var n=1.5;n>Math.floor(n);){n=e/t;var a=e-Math.floor(n)*t;e=t,t=a}return e}function setzeWerte(){document.getElementById("a").value=a,document.getElementById("b").value=b,document.getElementById("k").value=k,document.getElementById("A").innerHTML=a,document.getElementById("B").innerHTML=b,document.getElementById("K").innerHTML=k}function Figur(e,t,n){a=e,b=t,k=n,setzeWerte(),bestimmeL(),zeichne()}var W,H,xm,ym,a,b,k,L,Farbzahl,canvas1,ctx,initmade=!1,timer;delay=900;var Weiter=!1,stop;window.onload=resizeCanvas;