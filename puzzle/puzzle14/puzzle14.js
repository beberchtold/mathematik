W=336;H=W;sw=W/12;sh=sw;var zugnr;var starti,startj,endi,endj;var aktnr;var board=new Array(12);for(var i=0;i<board.length;++i){board[i]=new Array(12)}var farbe=new Array(8);var canvas1;var ctx;window.onload=init;function init(){canvas1=document.getElementById("myCanvas");ctx=canvas1.getContext("2d");canvas1.addEventListener("click",function(b){var a=getMousePos(canvas1,b);var g=a.x;var f=a.y;var d=Math.floor(g/sw)+1;var c=Math.floor(f/sh)+1;var e=board[c-1][d-1];if(e>3&&e<12){if(document.getElementById("links").checked){move_left(d,c);document.getElementById("Zug-").disabled=false;return}if(document.getElementById("rechts").checked){move_right(d,c);document.getElementById("Zug-").disabled=false;return}if(document.getElementById("oben").checked){move_up(d,c);document.getElementById("Zug-").disabled=false;return}if(document.getElementById("unten").checked){move_down(d,c);document.getElementById("Zug-").disabled=false}}},false);doClear()}function doClear(){for(var b=0;b<12;b++){for(var a=0;a<12;a++){board[b][a]=-1}}for(b=1;b<11;b++){for(a=1;a<11;a++){board[b][a]=0}}board[1][1]=-1;board[1][10]=-1;board[10][1]=-1;board[10][10]=-1;board[2][2]=-1;board[2][9]=-1;board[9][2]=-1;board[9][9]=-1;board[2][1]=4;board[1][5]=9;board[3][7]=1;board[4][4]=10;board[4][8]=11;board[5][4]=2;board[5][6]=5;board[6][2]=2;board[6][8]=1;board[7][6]=3;board[8][2]=7;board[8][3]=6;board[8][9]=8;for(b=0;b<8;b++){farbe[b]="blue"}farbe[3]="red";farbe[4]="red";zugnr=0;message.innerHTML="    Viel Glück!";document.getElementById("Zug-").disabled=true;zeichne()}function zeichne(){ctx.clearRect(0,0,W,H);ctx.beginPath();ctx.strokeStyle="black";ctx.lineWidth="1";for(var c=0;c<13;c++){var a=c*sw;ctx.moveTo(a,0);ctx.lineTo(a,H)}for(c=0;c<13;c++){var e=c*sh;ctx.moveTo(0,e);ctx.lineTo(W,e)}ctx.stroke();ctx.closePath();for(c=1;c<13;c++){a=(c-1)*sw;for(var b=1;b<13;b++){e=(b-1)*sh;var d=board[b-1][c-1];ctx.beginPath();if(d==-1){ctx.fillStyle="gray"}if(d==0){ctx.fillStyle="white"}if(d==1){ctx.fillStyle="red"}if(d==2){ctx.fillStyle="yellow"}if(d==3){ctx.fillStyle="blue"}ctx.rect(a+1,e+1,sw-1,sh-1);ctx.fill();if((d>3)&&(d<12)){putSquare(d,c,b,farbe[d-4])}ctx.closePath()}}}function putSquare(e,d,c,b){var a=(d-1)*sw;var f=(c-1)*sh;ctx.beginPath();ctx.fillStyle="white";ctx.rect(a+1,f+1,sw-1,sh-1);ctx.fill();ctx.closePath();ctx.beginPath();ctx.strokeStyle=b;ctx.rect(a+1,f+1,sw-1,sh-1);ctx.stroke();ctx.closePath();ctx.beginPath();ctx.fillStyle=b;if(e==7||e==8){ctx.moveTo(a+3,f+sh-3);ctx.lineTo(a+sw-3,f+sh-3);ctx.lineTo(a+sw/2,f+3);ctx.lineTo(a+3,f+sh-3)}if(e==4||e==5||e==6){ctx.arc(a+14,f+14,10,0,2*Math.PI)}if(e==9||e==10||e==11){ctx.rect(a+5,f+5,sw-10,sh-10)}ctx.fill();ctx.closePath()}function clearSquare(c,b){var a=(c-1)*sw;var d=(b-1)*sh;ctx.beginPath();ctx.strokeStyle="black";ctx.fillStyle="white";ctx.rect(a+1,d+1,sw-1,sh-1);ctx.fill();ctx.closePath()}function move_down(b,a){nr=board[a-1][b-1];aktnr=nr;starti=b;startj=a;startcolor=farbe[nr-4];endi=b;while(board[a][b-1]==0){clearSquare(b,a);board[a-1][b-1]=0;putSquare(nr,b,a+1,farbe[nr-4]);board[a][b-1]=nr;a++}endj=a;if(board[a][b-1]==1){putSquare(nr,b,a,"red");farbe[nr-4]="red"}if(board[a][b-1]==2){putSquare(nr,b,a,"yellow");farbe[nr-4]="yellow"}if(board[a][b-1]==3){putSquare(nr,b,a,"blue");farbe[nr-4]="blue"}ende()}function move_up(b,a){nr=board[a-1][b-1];aktnr=nr;starti=b;startj=a;startcolor=farbe[nr-4];endi=b;while(board[a-2][b-1]==0){clearSquare(b,a);board[a-1][b-1]=0;putSquare(nr,b,a-1,farbe[nr-4]);board[a-2][b-1]=nr;a--}endj=a;if(board[a-2][b-1]==1){putSquare(nr,b,a,"red");farbe[nr-4]="red"}if(board[a-2][b-1]==2){putSquare(nr,b,a,"yellow");farbe[nr-4]="yellow"}if(board[a-2][b-1]==3){putSquare(nr,b,a,"blue");farbe[nr-4]="blue"}ende()}function move_right(b,a){nr=board[a-1][b-1];aktnr=nr;starti=b;startj=a;startcolor=farbe[nr-4];endj=a;while(board[a-1][b]==0){clearSquare(b,a);board[a-1][b-1]=0;putSquare(nr,b+1,a,farbe[nr-4]);board[a-1][b]=nr;b++}endi=b;if(board[a-1][b]==1){putSquare(nr,b,a,"red");farbe[nr-4]="red"}if(board[a-1][b]==2){putSquare(nr,b,a,"yellow");farbe[nr-4]="yellow"}if(board[a-1][b]==3){putSquare(nr,b,a,"blue");farbe[nr-4]="blue"}ende()}function move_left(b,a){nr=board[a-1][b-1];aktnr=nr;starti=b;startj=a;startcolor=farbe[nr-4];endj=a;while(board[a-1][b-2]==0){clearSquare(b,a);board[a-1][b-1]=0;putSquare(nr,b-1,a,farbe[nr-4]);board[a-1][b-2]=nr;b--}endi=b;if(board[a-1][b-2]==1){putSquare(nr,b,a,"red");farbe[nr-4]="red"}if(board[a-1][b-2]==2){putSquare(nr,b,a,"yellow");farbe[nr-4]="yellow"}if(board[a-1][b-2]==3){putSquare(nr,b,a,"blue");farbe[nr-4]="blue"}ende()}function back(){document.getElementById("Zug-").disabled=true;zugnr--;message.innerHTML="Zug "+zugnr;clearSquare(endi,endj);board[endj-1][endi-1]=0;putSquare(aktnr,starti,startj,startcolor);board[startj-1][starti-1]=aktnr;farbe[aktnr-4]=startcolor}function fertig(){var d=true;for(var b=2;b<10;b++){for(var a=2;a<10;a++){d=true;var c=board[a-1][b-1];if(c<4||c>6){d=false}else{if(farbe[c-4]!="blue"){d=false}}c=board[a-1][b];if(c<4||c>6){d=false}else{if(farbe[c-4]!="blue"){d=false}}c=board[a-1][b+1];if(c<4||c>6){d=false}else{if(farbe[c-4]!="blue"){d=false}}c=board[a][b-1];if(c<7||c>8){d=false}else{if(farbe[c-4]!="red"){d=false}}c=board[a][b];if(c!=0){d=false}c=board[a][b+1];if(c<7||c>8){d=false}else{if(farbe[c-4]!="red"){d=false}}c=board[a+1][b-1];if(c<9||c>11){d=false}else{if(farbe[c-4]!="blue"){d=false}}c=board[a+1][b];if(c<9||c>11){d=false}else{if(farbe[c-4]!="blue"){d=false}}c=board[a+1][b+1];if(c<9||c>11){d=false}else{if(farbe[c-4]!="blue"){d=false}}if(d){return true}}}return false}function ende(){zugnr++;message.innerHTML="Zug "+zugnr;if(fertig()){message.innerHTML="Gratuliere!!"}}function getMousePos(b,a){var c=b.getBoundingClientRect();return{x:a.clientX-c.left,y:a.clientY-c.top}};