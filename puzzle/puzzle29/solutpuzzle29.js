function Bikoeff(e,n){if(n>e)return 0;n>e-n&&(n=e-n);for(var t=1,r=1;n>=r;r++)t=t*(e-r+1)/r;return t}function fak(e){for(var n=1,t=2;e>=t;t++)n*=t;return n}function gue(e){for(var n=new Array,t=1;46>t;t++)n[t]=0;for(n[0]=fak(e),e>1&&(n[e-1]=e),n[1]=n[0]*Bikoeff(e,2),t=2;e-1>t;t++){for(var r=0,o=-1,u=0;e-t-1>=u;u++)o=-1*o,r+=o*Bikoeff(e-t,u)*Math.pow(e-t-u,e);n[t]=Bikoeff(e,e-t)*r}return n}function control(e,n,t){for(var r=0,o=0;e>=o;o++)r+=t[o];var u=r/n;return u}function EW(e,n,t){for(var r=0,o=0;e>o;o++)r+=o*t[o];var u=r/n;return u}function rechne(){var e=9;e=parseInt(document.getElementById("n").value),(isNaN(e)||1>e||e>35)&&(e=9),document.getElementById("n").value=e,document.getElementById("N").innerHTML=e;var n=Math.pow(e,e);document.getElementById("M").innerHTML=n;var t=new Array;t=gue(e);var r=control(e,n,t),o=Math.round(1e4*EW(e,n,t))/1e4;document.getElementById("Ausgabe").innerHTML="";for(var u=0;e>=u;u++)document.getElementById("Ausgabe").innerHTML+=u,document.getElementById("Ausgabe").innerHTML+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",document.getElementById("Ausgabe").innerHTML+=t[u],document.getElementById("Ausgabe").innerHTML+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",document.getElementById("Ausgabe").innerHTML+=t[u]/n,document.getElementById("Ausgabe").innerHTML+="<br>";document.getElementById("RES").innerHTML=o,document.getElementById("KONTROL").innerHTML=r}