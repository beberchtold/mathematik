var W,H;var cellw;const digit=9;var backIndex;var sol=new Array(9);for(var i=0;i<9;i++){sol[i]=new Array(9)}var locked=new Array(9);for(i=0;i<9;i++){locked[i]=new Array(9)}var help1=new Array(9);for(i=0;i<9;i++){help1[i]=new Array(9)}var prob=new Array(9);for(i=0;i<9;i++){prob[i]=new Array(9)}var savesol=new Array(9);for(i=0;i<9;i++){savesol[i]=new Array(9)}var saveuser=new Array(9);for(i=0;i<9;i++){saveuser[i]=new Array(9);for(var j=0;j<9;j++){saveuser[i][j]=new Array(2)}}var forbidden=new Array(9);for(i=0;i<9;i++){forbidden[i]=new Array(9);for(j=0;j<9;j++){forbidden[i][j]=new Array(9)}}var back=new Array(500);var xCur=0;var yCur=0;var xNew=0;var yNew=0;var savemessage="";var create=false;var comp;var unloesbar;var help;var ctx;var canvas1;var initmade=false;const farbe=["#FFFF00","#DAA520","#BC8F8F","#EEE8AA","#BDB76B","#FFD700","#FFFFE0","#FFE5D5","#FFA07A"];var faerben=false;var Nummer="";window.onload=resizeCanvas;function resizeCanvas(){var a=document.getElementById("containercanvas");a.width=a.offsetWidth;W=a.width;if(W>400){W=400}H=W;cellw=Math.floor(W/9);if(initmade){resize1();zeichne()}else{init()}}function init(){initmade=true;window.addEventListener("resize",function(a){resizeCanvas()});canvas1=document.getElementById("myCanvas");canvas1.addEventListener("click",function(d){var b=getMousePos(canvas1,d);var a=b.x;var e=b.y;xNew=Math.floor(a/cellw);yNew=Math.floor(e/cellw);if(xNew<0||yNew<0||xNew>8||yNew>8){return}getInfo();zeichne()},false);resize1();ctx=canvas1.getContext("2d");document.getElementById("faerbe").checked=false;problem(rand(2)+1)}function initPuzzle(){aktiviere_zifferbuttons();for(var b=0;b<9;b++){for(var a=0;a<9;a++){sol[b][a]=" ";locked[b][a]=false;for(var d=0;d<9;d++){forbidden[b][a][d]=false}}}document.getElementById("Show").checked=false;document.getElementById("Hilfe").checked=false;document.getElementById("wahl").selectedIndex="0";hilfebuttons_bgweiss();deaktiviere_hilfebuttons();backIndex=0;xNew=0;yNew=0;comp=false;unloesbar=false;help=false;if(!create){document.getElementById("message").innerHTML="Klick auf 'Create' oder Auswahl aus 'Prob'"}streiche(0)}function resize1(){canvas1.width=W;canvas1.height=H}function OnChangeCheckbox1(a){help=a.checked;getInfo()}function OnChangeCheckbox2(d){var b,a;if(d.checked){aktiviere_hilfebuttons()}else{deaktiviere_hilfebuttons();for(b=0;b<9;b++){for(a=0;a<9;a++){help1[b][a]=false}}zeichne()}}function OnChangeCheckbox3(a){faerben=a.checked;zeichne()}function faerbebloecke(){const f=["001020011121021222","304050314151324252","607080617181627282","031323041424051525","334353344454354555","637383647484657585","061626071727081828","364656374757384858","667686677787687888"];for(var d=0;d<digit;d++){ctx.beginPath();if(faerben){ctx.fillStyle=farbe[d]}else{ctx.fillStyle="white"}for(var e=0;e<digit;e++){var b=parseInt(f[d].charAt(2*e));var a=parseInt(f[d].charAt(2*e+1));ctx.rect(cellw*b+1,cellw*a+1,cellw-2,cellw-2)}ctx.fill()}}function streiche(e){var b,a,d,g;c=String.fromCharCode(48+e);for(b=0;b<9;b++){for(a=0;a<9;a++){help1[b][a]=false}}if(e>0){for(b=0;b<9;b++){for(a=0;a<9;a++){if(sol[b][a]!=" "){help1[b][a]=true}if(sol[b][a]==c){for(d=0;d<9;d++){help1[d][a]=true;help1[b][d]=true}var h=3*(Math.floor(b/3));var f=3*(Math.floor(a/3));for(d=h;d<h+3;d++){for(g=f;g<f+3;g++){help1[d][g]=true}}}}}}zeichne()}function lock(){for(var b=0;b<9;b++){for(var a=0;a<9;a++){locked[b][a]=(sol[b][a]!=" ")}}zeichne()}function zeichne(){ctx.clearRect(0,0,W,H);ctx.font="20px Arial";faerbebloecke();ctx.beginPath();for(var b=0;b<digit;b++){for(var a=0;a<digit;a++){if(help1[b][a]){ctx.fillStyle="LightGreen";ctx.rect(cellw*b,cellw*a,cellw,cellw);ctx.fill()}if(b==xNew&&a==yNew){ctx.fillStyle="cyan";ctx.rect(cellw*b,cellw*a,cellw,cellw);ctx.fill()}ctx.beginPath();ctx.strokeStyle="gray";ctx.rect(cellw*b,cellw*a,cellw,cellw);ctx.stroke();ctx.beginPath();if(locked[b][a]){ctx.fillStyle="red"}else{ctx.fillStyle="black"}ctx.fillText(""+sol[b][a],cellw*b+cellw/2-6,cellw*a+cellw/2+8);ctx.stroke();ctx.strokeStyle="black";ctx.beginPath();if(a%3==0){line(0,cellw*a+1,cellw*9,cellw*a+1)}if(b%3==0){line(cellw*b+1,0,cellw*b+1,cellw*9)}ctx.stroke()}}ctx.beginPath();ctx.rect(1,1,cellw*digit,cellw*digit);ctx.stroke()}function proof(b,a,h){for(var d=0;d<9;d++){if(sol[d][a]==h){return false}}for(var f=0;f<9;f++){if(sol[b][f]==h){return false}}var g=3*(Math.floor(b/3));var e=3*(Math.floor(a/3));for(var d=g;d<g+3;d++){for(var f=e;f<e+3;f++){if(sol[d][f]==h){return false}}}return true}function possibilities(b,a){var e="";if(locked[b][a]){return"       "}for(var f=0;f<9;f++){if(proof(b,a,String.fromCharCode(49+f))){if(e!=""){e+=","}e+=String.fromCharCode(49+f)}}return e}function count(b,a){var f=0;if(locked[b][a]&&!comp){return 0}if(sol[b][a]!=" "&&comp){return 0}for(var e=0;e<9;e++){if(comp){if(proof(b,a,String.fromCharCode(49+e))&&!forbidden[b][a][e]){f++}}else{if(proof(b,a,String.fromCharCode(49+e))){f++}}}return f}function eingabe(b){if(b==0&&!locked[xNew][yNew]){sol[xNew][yNew]=" ";hilfebuttons_bgweiss();if(document.getElementById("Show").checked){getInfo()}zeichne();return}var a=b+48;if(setvalue(xNew,yNew,String.fromCharCode(a))){if(document.getElementById("Hilfe").checked){streiche(b);hilfebuttons_bgweiss();document.getElementById("H"+b).style.backgroundColor="LightGreen"}zeichne();getInfo();if(solved()){document.getElementById("message").innerHTML=Nummer+": gelöst. Gratuliere!";document.getElementById("Show").checked=false;document.getElementById("Hilfe").checked=false;OnChangeCheckbox2(document.getElementById("Hilfe"))}}}function hilf(e){streiche(e);hilfebuttons_bgweiss();document.getElementById("H"+e).style.backgroundColor="LightGreen";var a=false;for(var d=0;d<digit;d++){for(var b=0;b<digit;b++){if(sol[d][b]==String.fromCharCode(48+e)){xNew=d;yNew=b;a=true;b=digit;d=digit}}}if(!a){xNew=-1}document.getElementById("Verf").innerHTML="";zeichne()}function keyPress(a){switch(a){case 40:if(yNew<digit-1){yNew++;getInfo()}break;case 38:if(yNew>0){yNew--;getInfo()}break;case 39:if(xNew<digit-1){xNew++;getInfo()}break;case 37:if(xNew>0){xNew--;getInfo()}break;case 46:if(!locked[xNew][yNew]){sol[xNew][yNew]=" ";hilfebuttons_bgweiss();if(document.getElementById("Show").checked){getInfo()}zeichne();return}break;case 32:event.preventDefault();break;default:c=String.fromCharCode(a);if((a>57||a<49)&&c!=" "){return}if(setvalue(xNew,yNew,c)){if(document.getElementById("Hilfe").checked){streiche(a-48);hilfebuttons_bgweiss();document.getElementById("H"+c).style.backgroundColor="LightGreen";getInfo()}if(solved()){document.getElementById("message").innerHTML=Nummer+": gelöst. Gratuliere!";document.getElementById("Show").checked=false;document.getElementById("Hilfe").checked=false;OnChangeCheckbox2(document.getElementById("Hilfe"))}}break}zeichne()}function setvalue(d,b,e){var a=e.charCodeAt(0);if(a<49||a>57){return false}if(locked[d][b]){return false}if(comp&&(sol[d][b]!=" ")){return false}if(forbidden[d][b][parseInt(e)-1]){return false}if(proof(d,b,e)){xCur=d;yCur=b;xNew=d;yNew=b;back[backIndex]=9*xCur+yCur;backIndex++;sol[xCur][yCur]=e;if(comp){forbidden[xCur][yCur][parseInt(e)-1]=true}return true}return false}function getrow(a){return Math.floor(a%9)}function getcol(a){return Math.floor(a/9)}function getcell(a,b){return(9*a+b)}function possible_move(){for(var a=0;a<9;a++){for(var b=0;b<9;b++){if(sol[a][b]==" "&&count(a,b)==0){return false}}}return true}function setting(){var k=0;var b=-1;var a=-1;var m=false;var e=false;if(solved()){return}if(unloesbar){return}comp=true;if(!possible_move()){backtrack()}for(var f=0;f<9;f++){for(var n=0;n<9;n++){var l=count(f,n);if(l==1){m=true;b=f;a=n;f=9;n=9}}}if(!m){for(var f=0;f<9;f++){for(var n=0;n<9;n++){var l=count(f,n);if(l==2&&!m){m=true;b=f;a=n;f=9;n=9}}}}if(!m){for(var f=0;f<9;f++){for(var n=0;n<9;n++){var l=count(f,n);if(l==3&&!m){m=true;b=f;a=n;f=9;n=9}}}}var h=0;var g=0;do{if(!m){do{g=rand(81)}while(sol[getcol(g)][getrow(g)]!=" ");b=getcol(g);a=getrow(g)}k=0;do{if(!forbidden[b][a][k]){e=setvalue(b,a,String.fromCharCode(49+k))}k++}while(k<9&&!e);m=false;h++}while(!e&&h<500);if(h==500){unloesbar=true;return}}function anzleere(){var d=0;for(var b=0;b<9;b++){for(var a=0;a<9;a++){if(sol[b][a]==" "){d++}}}return d}function solved(){for(var b=0;b<9;b++){for(var a=0;a<9;a++){if(sol[b][a]==" "){return false}}}return true}function create1(){var b=new Array(9);var a;var d;comp=true;initPuzzle();b=permutation();for(a=0;a<9;a++){setvalue(Math.floor(a%3),Math.floor(a/3),String.fromCharCode(49+b[a]))}b=permutation();for(a=0;a<9;a++){setvalue(3+Math.floor(a%3),3+Math.floor(a/3),String.fromCharCode(49+b[a]))}b=permutation();for(a=0;a<9;a++){setvalue(6+Math.floor(a%3),6+Math.floor(a/3),String.fromCharCode(49+b[a]))}d=dosolve()}function permutation(){var a,e=9;var b=new Array(e);b[0]=Math.floor(e*Math.random());var d=1;while(d<e){b[d]=Math.floor(e*Math.random());for(a=0;a<d;a++){if(b[d]==b[a]){a=d+1}}if(a==d){d++}}return b}function speichern_in_prob(){for(var b=0;b<9;b++){for(var a=0;a<9;a++){prob[b][a]=sol[b][a]}}}function eindeutig(){var h;var e,f,g;save();h=dosolve();speichern_in_prob();load();trials=0;do{h=false;for(var b=0;b<9;b++){for(var a=0;a<9;a++){if(count(b,a)>1){e=b;f=a;for(g=0;g<9;g++){if(g==parseInt(prob[e][f])-1){g++}if(setvalue(e,f,String.fromCharCode(49+g))){locked[e][f]=true;h=dosolve();if(h){speichern_in_prob();load();setvalue(e,f,String.fromCharCode(49+g));g=9;b=9;a=9;save()}else{unloesbar=false;load()}}}}}}trials++}while(h&&trials<10)}function docreate(){var a=setTimeout(function(){docreate1()},10);document.getElementById("wahl").selectedIndex="0";document.getElementById("message").innerHTML="Geduld! Falls fertig, erscheint hier die Anzahl Zeichen"}function docreate1(){var f,h,e,g;create=true;create1();save_user();var a=0;do{load_user();f=0;do{var b=rand(81);e=getcol(b);g=getrow(b);if(sol[e][g]!=" "){sol[e][g]=" ";for(h=0;h<9;h++){forbidden[e][g][h]=false}f++}}while(f<55);eindeutig();a++}while(anzleere()<51&&a<20);create=false;comp=false;var f=81-anzleere();if(a<20){Nummer="Aktuelles Problem";document.getElementById("message").innerHTML=Nummer+": "+f+" Zeichen";save_user();zeichne()}else{document.getElementById("message").innerHTML="Create nicht gelungen! Klicken Sie nochmals auf Create"}}function solvebutton(){deaktiviere_zifferbuttons();if(solved()){return}lock();var a=dosolve();if(a){document.getElementById("message").innerHTML=Nummer+": Gelöst!";document.getElementById("Show").checked=false;document.getElementById("Hilfe").checked=false;OnChangeCheckbox2(document.getElementById("Hilfe"))}else{if(document.getElementById("message").innerHTML=="zu wenig Zahlen"){}else{document.getElementById("message").innerHTML="unlösbar!"}}}function dosolve(){if(solved()){return true}var b=false;if(anzleere()>64){document.getElementById("message").innerHTML="zu wenig Zahlen";return false}comp=true;var a=0;do{setting();a++;b=solved()}while(!b&&!unloesbar&&(a<20000));return b}function backtrack(){var f,a;var e=false;if(backIndex==0){return}if(locked[xCur][yCur]){unloesbar=true;return}sol[xCur][yCur]=" ";if(count(xCur,yCur)>0){var b=0;do{if(!forbidden[xCur][yCur][b]){e=setvalue(xCur,yCur,String.fromCharCode(49+b))}b++}while(b<9&&!e)}if(!e){do{f=xCur;a=yCur;backIndex--;xCur=getcol(back[backIndex]);yCur=getrow(back[backIndex]);if(locked[xCur][yCur]){unloesbar=true;return}if(f!=xCur||a!=yCur){for(b=0;b<9;b++){forbidden[f][a][b]=false}}sol[xCur][yCur]=" "}while(!possible_move()||unloesbar)}}function save(){for(var b=0;b<9;b++){for(var a=0;a<9;a++){savesol[b][a]=sol[b][a]}}}function load(){initPuzzle();for(var b=0;b<9;b++){for(var a=0;a<9;a++){locked[b][a]=setvalue(b,a,savesol[b][a])}}}function save_user(){savemessage=document.getElementById("message").innerHTML;for(var b=0;b<9;b++){for(var a=0;a<9;a++){if(locked[b][a]){saveuser[b][a][0]=sol[b][a];saveuser[b][a][1]=" "}else{saveuser[b][a][0]=" ";saveuser[b][a][1]=sol[b][a]}}}}function load_user(){initPuzzle();document.getElementById("message").innerHTML=savemessage;var d=savemessage.lastIndexOf(":");Nummer=savemessage.substr(0,d);for(var b=0;b<9;b++){for(var a=0;a<9;a++){if(saveuser[b][a][0]!=" "){locked[b][a]=setvalue(b,a,saveuser[b][a][0])}if(saveuser[b][a][1]!=" "){setvalue(b,a,saveuser[b][a][1])}}}zeichne()}function getInfo(){if(help){document.getElementById("Verf").innerHTML=possibilities(xNew,yNew)}else{document.getElementById("Verf").innerHTML="           "}}function rand(a){return Math.floor(Math.random()*a)}function line(b,e,a,d){ctx.moveTo(b,e);ctx.lineTo(a,d)}function getMousePos(b,a){var d=b.getBoundingClientRect();return{x:a.clientX-d.left,y:a.clientY-d.top}}function deaktiviere_zifferbuttons(){for(var a=1;a<10;a++){document.getElementById(String.fromCharCode(a+48)).disabled=true}}function aktiviere_zifferbuttons(){for(var a=1;a<10;a++){document.getElementById(String.fromCharCode(a+48)).disabled=false}}function deaktiviere_hilfebuttons(){for(var a=1;a<10;a++){document.getElementById("H"+String.fromCharCode(a+48)).disabled=true;document.getElementById("H"+a).style.backgroundColor="white"}}function aktiviere_hilfebuttons(){for(var a=1;a<10;a++){document.getElementById("H"+String.fromCharCode(a+48)).disabled=false}}function hilfebuttons_bgweiss(){for(var a=1;a<10;a++){document.getElementById("H"+a).style.backgroundColor="white"}};