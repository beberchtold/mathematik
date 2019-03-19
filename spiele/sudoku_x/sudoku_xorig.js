function resizeCanvas(){var e=document.getElementById("containercanvas");e.width=e.offsetWidth,W=e.width,W>400&&(W=400),H=W,cellw=Math.floor(W/digit),initmade?(resize1(),zeichne()):init()}function init(){initmade=!0,window.addEventListener("resize",function(){resizeCanvas()}),canvas1=document.getElementById("myCanvas"),canvas1.addEventListener("click",function(e){var t=getMousePos(canvas1,e),i=t.x,r=t.y;xNew=Math.floor(i/cellw),yNew=Math.floor(r/cellw),0>xNew||0>yNew||xNew>digit-1||yNew>digit-1||(getInfo(),zeichne())},!1),resize1(),ctx=canvas1.getContext("2d"),initPuzzle()}function initPuzzle(){aktiviere_zifferbuttons();for(var e=0;digit>e;e++)for(var t=0;digit>t;t++){sol[e][t]=" ",locked[e][t]=!1;for(var i=0;digit>i;i++)forbidden[e][t][i]=!1}document.getElementById("Show").checked=!1,document.getElementById("Hilfe").checked=!1,hilfebuttons_bgweiss(),deaktiviere_hilfebuttons(),backIndex=0,xNew=0,yNew=0,comp=!1,unloesbar=!1,help=!1,create||(document.getElementById("message").innerHTML="Viel Erfolg!"),streiche(0)}function resize1(){canvas1.width=W,canvas1.height=H}function OnChangeCheckbox3(e){e.checked?(digit=9,document.getElementById("7").value="7",document.getElementById("8").value="8",document.getElementById("9").value="9",document.getElementById("H7").value="7",document.getElementById("H8").value="8",document.getElementById("H9").value="9",document.getElementById("7").disabled=!1,document.getElementById("8").disabled=!1,document.getElementById("9").disabled=!1,document.getElementById("H7").disabled=!1,document.getElementById("H8").disabled=!1,document.getElementById("H9").disabled=!1):(digit=6,document.getElementById("7").value=" ",document.getElementById("8").value=" ",document.getElementById("9").value=" ",document.getElementById("H7").value=" ",document.getElementById("H8").value=" ",document.getElementById("H9").value=" ",document.getElementById("7").disabled=!0,document.getElementById("8").disabled=!0,document.getElementById("9").disabled=!0,document.getElementById("H7").disabled=!0,document.getElementById("H8").disabled=!0,document.getElementById("H9").disabled=!0),cellw=Math.floor(W/digit),initPuzzle()}function OnChangeCheckbox1(e){help=e.checked,getInfo()}function OnChangeCheckbox2(e){var t,i;if(e.checked)aktiviere_hilfebuttons();else{for(deaktiviere_hilfebuttons(),t=0;digit>t;t++)for(i=0;digit>i;i++)help1[t][i]=!1;zeichne()}}function streiche(e){var t,i,r,o;for(c=String.fromCharCode(48+e),t=0;digit>t;t++)for(i=0;digit>i;i++)help1[t][i]=!1;if(e>0)for(t=0;digit>t;t++)for(i=0;digit>i;i++)if(" "!=sol[t][i]&&(help1[t][i]=!0),sol[t][i]==c){for(r=0;digit>r;r++)help1[r][i]=!0,help1[t][r]=!0;var n=3*Math.floor(t/3),d=digit/3*Math.floor(i/(digit/3));for(r=n;n+3>r;r++)for(o=d;d+digit/3>o;o++)help1[r][o]=!0;if(t==i)for(var l=0;digit>l;l++)help1[l][l]=!0;if(t+i==digit-1)for(var a=0;digit>a;a++)help1[a][digit-1-a]=!0}zeichne()}function lock(){for(var e=0;digit>e;e++)for(var t=0;digit>t;t++)locked[e][t]=" "!=sol[e][t];zeichne()}function zeichne(){ctx.clearRect(0,0,W,H),ctx.font="20px Arial";for(var e=0;digit>e;e++)for(var t=0;digit>t;t++)ctx.fillStyle="white",help1[e][t]&&(ctx.fillStyle="LightGreen"),e==xNew&&t==yNew&&(ctx.fillStyle="cyan"),ctx.rect(cellw*e,cellw*t,cellw,cellw),ctx.fill(),ctx.stroke(),ctx.beginPath(),ctx.strokeStyle="black",ctx.rect(cellw*e,cellw*t,cellw,cellw),ctx.stroke(),ctx.beginPath(),t%3==0&&9==digit&&line(0,cellw*t+1,cellw*digit,cellw*t+1),t%2==0&&6==digit&&line(0,cellw*t+1,cellw*digit,cellw*t+1),e%3==0&&line(cellw*e+1,0,cellw*e+1,cellw*digit),ctx.stroke(),ctx.beginPath(),ctx.fillStyle=locked[e][t]?"red":"black",ctx.fillText(""+sol[e][t],cellw*e+cellw/2-6,cellw*t+cellw/2+8),ctx.stroke()}function proof(e,t,i){for(var r=0;digit>r;r++)if(sol[r][t]==i)return!1;for(var o=0;digit>o;o++)if(sol[e][o]==i)return!1;for(var n=3*Math.floor(e/3),d=digit/3*Math.floor(t/(digit/3)),r=n;n+3>r;r++)for(var o=d;d+digit/3>o;o++)if(sol[r][o]==i)return!1;if(e==t)for(var l=0;digit>l;l++)if(sol[l][l]==i)return!1;if(e+t==digit-1)for(var a=0;digit>a;a++)if(sol[a][digit-1-a]==i)return!1;return!0}function possibilities(e,t){var i="";if(locked[e][t])return"       ";for(var r=0;digit>r;r++)proof(e,t,String.fromCharCode(49+r))&&(""!=i&&(i+=","),i+=String.fromCharCode(49+r));return i}function count(e,t){var i=0;if(locked[e][t]&&!comp)return 0;if(" "!=sol[e][t]&&comp)return 0;for(var r=0;digit>r;r++)comp?proof(e,t,String.fromCharCode(49+r))&&!forbidden[e][t][r]&&i++:proof(e,t,String.fromCharCode(49+r))&&i++;return i}function eingabe(e){var t=e+48;setvalue(xNew,yNew,String.fromCharCode(t))&&(document.getElementById("Hilfe").checked&&(streiche(t-48),hilfebuttons_bgweiss(),document.getElementById("H"+e).style.backgroundColor="LightGreen"),zeichne(),getInfo(),solved()&&(document.getElementById("message").innerHTML="Gratuliere!"))}function hilf(e){var t=e+48;streiche(t-48),hilfebuttons_bgweiss(),document.getElementById("H"+e).style.backgroundColor="LightGreen",zeichne()}function keyPress(e){switch(e){case 40:8>yNew&&(yNew++,getInfo());break;case 38:yNew>0&&(yNew--,getInfo());break;case 39:8>xNew&&(xNew++,getInfo());break;case 37:xNew>0&&(xNew--,getInfo());break;default:if(c=String.fromCharCode(e),(e>48+digit||49>e)&&" "!=c)return;setvalue(xNew,yNew,c)&&(document.getElementById("Hilfe").checked&&(streiche(e-48),hilfebuttons_bgweiss(),document.getElementById("H"+c).style.backgroundColor="LightGreen",getInfo()),solved()&&(document.getElementById("message").innerHTML="Gratuliere!"))}zeichne()}function setvalue(e,t,i){var r=i.charCodeAt(0);return 49>r||r>48+digit?!1:locked[e][t]?!1:comp&&" "!=sol[e][t]?!1:forbidden[e][t][parseInt(i)-1]?!1:proof(e,t,i)?(xCur=e,yCur=t,xNew=e,yNew=t,back[backIndex]=digit*xCur+yCur,backIndex++,sol[xCur][yCur]=i,comp&&(forbidden[xCur][yCur][parseInt(i)-1]=!0),!0):!1}function getrow(e){return Math.floor(e%digit)}function getcol(e){return Math.floor(e/digit)}function getcell(e,t){return digit*e+t}function possible_move(){for(var e=0;digit>e;e++)for(var t=0;digit>t;t++)if(" "==sol[e][t]&&0==count(e,t))return!1;return!0}function setting(){var e=0,t=-1,i=-1,r=!1,o=!1,n=!1,d=!1,l=!1;if(!solved()&&!unloesbar){comp=!0,possible_move()||backtrack();for(var a=0;digit>a;a++)for(var c=0;digit>c;c++){var u=count(a,c);1==u&&(r=!0,t=a,i=c,a=9,c=9),2!=u||r||(n=!0,t=a,i=c),3!=u||r||n||(d=!0,t=a,i=c),4!=u||r||n||d||(l=!0,t=a,i=c)}var f=0,s=0;do{if(!(r||n||d||l)){do s=rand(digit*digit);while(" "!=sol[getcol(s)][getrow(s)]);t=getcol(s),i=getrow(s)}e=0;do forbidden[t][i][e]||(o=setvalue(t,i,String.fromCharCode(49+e))),e++;while(digit>e&&!o);r=!1,n=!1,d=!1,l=!1,f++}while(!o&&500>f);return 500==f?(unloesbar=!0,void 0):void 0}}function anzleere(){for(var e=0,t=0;digit>t;t++)for(var i=0;digit>i;i++)" "==sol[t][i]&&e++;return e}function solved(){for(var e=0;digit>e;e++)for(var t=0;digit>t;t++)if(" "==sol[e][t])return!1;return!0}function create1(){var e,t,i=new Array(digit);for(comp=!0,initPuzzle(),i=permutation(),e=0;digit>e;e++)setvalue(Math.floor(e%3),Math.floor(e/3),String.fromCharCode(49+i[e]));if(9==digit){for(i=permutation(),e=0;digit>e;e++)setvalue(3+Math.floor(e%3),3+Math.floor(e/3),String.fromCharCode(49+i[e]));for(i=permutation(),e=0;digit>e;e++)setvalue(6+Math.floor(e%3),6+Math.floor(e/3),String.fromCharCode(49+i[e]))}t=dosolve()}function permutation(){var e=digit,t=new Array(e);t[0]=Math.floor(e*Math.random());for(var i=1;e>i;){t[i]=Math.floor(e*Math.random());for(var r=0;i>r;r++)t[i]==t[r]&&(r=i+1);r==i&&i++}return t}function speichern_in_prob(){for(var e=0;digit>e;e++)for(var t=0;digit>t;t++)prob[e][t]=sol[e][t]}function eindeutig(){var e,t,i,r;save(),e=dosolve(),speichern_in_prob(),load(),trials=0;do{e=!1;for(var o=0;digit>o;o++)for(var n=0;digit>n;n++)if(count(o,n)>1)for(t=o,i=n,r=0;digit>r;r++)r==parseInt(prob[t][i])-1&&r++,setvalue(t,i,String.fromCharCode(49+r))&&(locked[t][i]=!0,e=dosolve(),e?(speichern_in_prob(),load(),setvalue(t,i,String.fromCharCode(49+r)),r=digit,o=digit,n=digit,save()):(unloesbar=!1,load()));trials++}while(e&&10>trials)}function docreate(){setTimeout(function(){docreate1()},10);document.getElementById("wahl").selectedIndex="0",document.getElementById("message").innerHTML="Geduld! Falls fertig, erscheint hier die Anzahl Zeichen"}function docreate1(){var e,t,i,r,o,n,t=29,i=32;create=!0,create1(),save_user();var d=0;9==digit&&(t=51,i=55);do{load_user(),e=0;do{var l=rand(digit*digit);if(o=getcol(l),n=getrow(l)," "!=sol[o][n]){for(sol[o][n]=" ",r=0;digit>r;r++)forbidden[o][n][r]=!1;e++}}while(i>e);eindeutig(),d++}while(anzleere()<t&&20>d);save_user(),create=!1,comp=!1;var e=digit*digit-anzleere();20>d?(document.getElementById("message").innerHTML=""+e+" Zeichen",zeichne()):document.getElementById("message").innerHTML="Create nicht gelungen! Klicken Sie nochmals auf Create"}function solvebutton(){if(deaktiviere_zifferbuttons(),!solved()){lock();var e=dosolve();e?(document.getElementById("message").innerHTML="Gelöst!",zeichne()):"zu wenig Zahlen"==document.getElementById("message").innerHTML||(document.getElementById("message").innerHTML="unlösbar!")}}function dosolve(){if(solved())return!0;var e=!1;if(6==digit&&anzleere()>31||anzleere()>64)return document.getElementById("message").innerHTML="zu wenig Zahlen",!1;comp=!0;var t=0;do setting(),t++,e=solved();while(!e&&!unloesbar&&2e4>t);return e}function backtrack_user(){0!=backIndex&&(locked[xCur][yCur]||solved()||(hilfebuttons_bgweiss(),sol[xCur][yCur]=" ",backIndex--,xCur=getcol(back[backIndex]),yCur=getrow(back[backIndex]),xNew=xCur,yNew=yCur,zeichne()))}function backtrack(){var e,t,i=!1;if(0!=backIndex){if(locked[xCur][yCur])return unloesbar=!0,void 0;if(sol[xCur][yCur]=" ",count(xCur,yCur)>0){var r=0;do forbidden[xCur][yCur][r]||(i=setvalue(xCur,yCur,String.fromCharCode(49+r))),r++;while(digit>r&&!i)}if(!i)do{if(e=xCur,t=yCur,backIndex--,xCur=getcol(back[backIndex]),yCur=getrow(back[backIndex]),locked[xCur][yCur])return unloesbar=!0,void 0;if(e!=xCur||t!=yCur)for(r=0;digit>r;r++)forbidden[e][t][r]=!1;sol[xCur][yCur]=" "}while(!possible_move()||unloesbar)}}function save(){for(var e=0;digit>e;e++)for(var t=0;digit>t;t++)savesol[e][t]=sol[e][t]}function load(){initPuzzle();for(var e=0;digit>e;e++)for(var t=0;digit>t;t++)locked[e][t]=setvalue(e,t,savesol[e][t])}function save_user(){for(var e=0;digit>e;e++)for(var t=0;digit>t;t++)locked[e][t]?(saveuser[e][t][0]=sol[e][t],saveuser[e][t][1]=" "):(saveuser[e][t][0]=" ",saveuser[e][t][1]=sol[e][t])}function load_user(){initPuzzle();for(var e=0;digit>e;e++)for(var t=0;digit>t;t++)" "!=saveuser[e][t][0]&&(locked[e][t]=setvalue(e,t,saveuser[e][t][0]))," "!=saveuser[e][t][1]&&setvalue(e,t,saveuser[e][t][1]);zeichne()}function getInfo(){document.getElementById("Verf").innerHTML=help?possibilities(xNew,yNew):"           "}function rand(e){return Math.floor(Math.random()*e)}function line(e,t,i,r){ctx.moveTo(e,t),ctx.lineTo(i,r)}function getMousePos(e,t){var i=e.getBoundingClientRect();return{x:t.clientX-i.left,y:t.clientY-i.top}}function deaktiviere_zifferbuttons(){for(var e=1;digit+1>e;e++)document.getElementById(String.fromCharCode(e+48)).disabled=!0}function aktiviere_zifferbuttons(){for(var e=1;digit+1>e;e++)document.getElementById(String.fromCharCode(e+48)).disabled=!1}function deaktiviere_hilfebuttons(){for(var e=1;digit+1>e;e++)document.getElementById("H"+String.fromCharCode(e+48)).disabled=!0,document.getElementById("H"+e).style.backgroundColor="white"}function aktiviere_hilfebuttons(){for(var e=1;digit+1>e;e++)document.getElementById("H"+String.fromCharCode(e+48)).disabled=!1}function hilfebuttons_bgweiss(){for(var e=1;digit+1>e;e++)document.getElementById("H"+e).style.backgroundColor="white"}for(var W,H,cellw,backIndex,sol=new Array(9),i=0;9>i;i++)sol[i]=new Array(9);var locked=new Array(9);for(i=0;9>i;i++)locked[i]=new Array(9);var help1=new Array(9);for(i=0;9>i;i++)help1[i]=new Array(9);var prob=new Array(9);for(i=0;9>i;i++)prob[i]=new Array(9);var savesol=new Array(9);for(i=0;9>i;i++)savesol[i]=new Array(9);var saveuser=new Array(9);for(i=0;9>i;i++){saveuser[i]=new Array(9);for(var j=0;9>j;j++)saveuser[i][j]=new Array(2)}var forbidden=new Array(9);for(i=0;9>i;i++)for(forbidden[i]=new Array(9),j=0;9>j;j++)forbidden[i][j]=new Array(9);var back=new Array(500),xCur=0,yCur=0,xNew=0,yNew=0,create=!1,comp,unloesbar,help,ctx,canvas1,initmade=!1,digit=6;