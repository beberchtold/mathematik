function resizeCanvas(){var e=document.getElementById("containercanvas");e.width=e.offsetWidth,W=e.width,H=W/2,initmade?(resize1(),zeichne()):init()}function Bikoeff(e,n){var t;t=n>e?0:1,n>e-n&&(n=e-n);for(var i=1;n>=i;i++)t=t*(e-i+1)/i;return t}function f(e){return 1/Math.sqrt(2*Math.PI)*Math.exp(-e*e/2)}function calcintegral(e,n){for(var t=f(e)+f(n),i=0,a=0,r=(n-e)/50,m=1;50>m;m+=2)i+=f(e+m*r);for(m=2;50>m;m+=2)a+=f(e+m*r);var l=r/3*(t+4*i+2*a);return l>1&&(l=1),l}function xpixel(e,n,t){return Math.round(W/6/t*(e-n+3*t))}function ypixel(e,n){for(var t=2.5;n/10>1;)t*=2,n/=10;return H-20-Math.round((H-20)*t*e)}function init(){initmade=!0,window.addEventListener("resize",function(){resizeCanvas()}),canvas1=document.getElementById("myCanvas"),resize1(),ctx=canvas1.getContext("2d"),rechne()}function resize1(){canvas1.width=W,canvas1.height=H}function pfalse(){alert("falscher Wert für p"),document.getElementById("p").value=""}function rechne(){if(document.getElementById("message").innerHTML="",""==document.getElementById("n").value)return alert("Wert für n eingeben!"),void 0;if(n=parseInt(document.getElementById("n").value),20>n&&(n=20,document.getElementById("n").value=20),""==document.getElementById("p").value)return alert("Wert für p eingeben!"),void 0;for(var Hilf=document.getElementById("p").value,i=0,op=!1,dezpunkt=!1;i<Hilf.length;){var Zahl=Hilf.charCodeAt(i);if(46==Zahl){if(dezpunkt)return pfalse(),void 0;dezpunkt=!0}if(42>Zahl||Zahl>57||44==Zahl||0==i&&48>Zahl||i==Hilf.length-1&&48>Zahl)return pfalse(),void 0;if(48>Zahl&&op)return pfalse(),void 0;48>Zahl&&46!=Zahl&&(dezpunkt=!1),op=48>Zahl,i++}if(p=parseFloat(eval(Hilf)),void 0==p||0>=p||p>=1||isNaN(p))return pfalse(),void 0;if(""==document.getElementById("a").value)return alert("Wert für a eingeben!"),void 0;if(a=parseInt(document.getElementById("a").value),0>a&&(a=0),a>n&&(a=n),document.getElementById("a").value=a,""==document.getElementById("b").value)return alert("Wert für b eingeben!"),void 0;if(b=parseInt(document.getElementById("b").value),a>b&&(b=a),b>n&&(b=n),document.getElementById("b").value=b,summe=0,1001>n)for(var x=a;b>=x;x++)summe+=Bikoeff(n,x)*Math.pow(p,x)*Math.pow(1-p,n-x);simpson=0,mue=n*p,sigma=Math.sqrt(mue*(1-p)),simpson=calcintegral((a-.5-mue)/sigma,(b+.5-mue)/sigma),schreibeWerte(),zeichne()}function zeichne(){ctx.clearRect(0,0,W,H),ctx.beginPath(),ctx.strokeStyle="black",ctx.lineWidth="1",ctx.font="11px Arial",line(0,H-20,W,H-20);var e=W/120,t=sigma/20,i=-3*sigma,r=ypixel(1/sigma*f(i/sigma),n);ctx.moveTo(0,r);for(var m=1;120>=m;m++)i=-3*sigma+m*t,r=ypixel(1/sigma*f(i/sigma),n),ctx.lineTo(m*e,r);for(m=0;12>m;m++){i=Math.round(mue-3*sigma+m*sigma/2);var l=xpixel(i,mue,sigma);ctx.fillText(i,l-6,H-8),line(l,H-18,l,H-20)}ctx.stroke();var u=xpixel(a-.5,mue,sigma),o=xpixel(b+.5,mue,sigma);if(W-3>u&&o>2)for(ctx.fillStyle="green",j=0,m=u;o>=m;m++)m>=0&&W>m&&(r=ypixel(1/sigma*f((a-.5+6*j*sigma/W-mue)/sigma),n),ctx.fillRect(m,r,1,H-21-r)),j++}function schreibeWerte(){var e=sigma*sigma;9>e&&(document.getElementById("message").innerHTML="Warnung: Varianz<9"),document.getElementById("N").innerHTML=n,document.getElementById("P").innerHTML=Math.round(1e3*p)/1e3,document.getElementById("A").innerHTML=a,document.getElementById("B").innerHTML=b,document.getElementById("Aminus").innerHTML=a-.5,document.getElementById("Bplus").innerHTML=b+.5,document.getElementById("MU").innerHTML=runde(mue),document.getElementById("VAR").innerHTML=runde(e),document.getElementById("SIGMA").innerHTML=runde(sigma),document.getElementById("RESBI").innerHTML=1001>n?runde(summe):"n ist zu gross für Binomialverteilung",document.getElementById("RESNOR").innerHTML=runde(simpson)}function runde(e){return Math.round(1e5*e)/1e5}function line(e,n,t,i){ctx.moveTo(e,n),ctx.lineTo(t,i)}var W,H,n,p,a,b,mue,sigma,summe,simpson,canvas1,initmade=!1;window.onload=resizeCanvas;