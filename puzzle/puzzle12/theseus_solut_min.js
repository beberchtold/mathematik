function minMove(){var bMoved=!0;if(!G){n="x"+eval(Mx)+"y"+eval(My);var helppic=document.getElementById(n).src,pos=helppic.search("M.png");pos>-1?helppic="1.png":(pos=helppic.lastIndexOf("M"),helppic=helppic.substring(pos+1,pos+6)),document.getElementById(n).src=helppic,My>Ty&&" "==maze[2*Mx+1].charAt(4*My+0)?My--:Ty>My&&" "==maze[2*Mx+1].charAt(4*My+4)?My++:Mx>Tx&&" "==maze[2*Mx+0].charAt(4*My+2)?Mx--:Tx>Mx&&" "==maze[2*Mx+2].charAt(4*My+2)?Mx++:bMoved=!1,n="x"+eval(Mx)+"y"+eval(My),helppic=document.getElementById(n).src,pos=helppic.search(".png"),helppic=helppic.substring(pos-1,pos+4),Mpic="M"+helppic,document.getElementById(n).src=Mpic,Tx==Mx&&Ty==My?G=!0:bMoved&&2>U?(U++,setTimeout("minMove()",10)):U=0}}function move(x,y){if(!G&&0==U&&!(0>x||x>=Dx||0>y||y>=Dy||x==Mx&&y==My)){if(x==Tx+1&&y==Ty&&" "==maze[2*Tx+2].charAt(4*Ty+2)||x==Tx-1&&y==Ty&&" "==maze[2*Tx+0].charAt(4*Ty+2)||x==Tx&&y==Ty+1&&" "==maze[2*Tx+1].charAt(4*Ty+4)||x==Tx&&y==Ty-1&&" "==maze[2*Tx+1].charAt(4*Ty+0)){n="x"+eval(Tx)+"y"+eval(Ty);var helppic=document.getElementById(n).src,pos=helppic.search("T.png");if(pos>-1?helppic="1.png":(pos=helppic.lastIndexOf("T"),helppic=helppic.substring(pos+1,pos+6)),document.getElementById(n).src=helppic,Tx=x,Ty=y,n="x"+eval(Tx)+"y"+eval(Ty),helppic=document.getElementById(n).src,pos=helppic.search(".png"),helppic=helppic.substring(pos-1,pos+4),Tpic="T"+helppic,document.getElementById(n).src=Tpic,x==Ex&&y==Ey)return G=!0,void 0}else if(x!=Tx||y!=Ty)return;U=1,setTimeout("minMove()",10)}}function init(){var i=0,j=0,n="";const row=new Array("32222322232222zr","33111130220320er","100200202222203r","11301120112201zr","T130111112221Mzr","11110110022011zr","11111111122011zr","11111111122011zr","10000000000000zr","uuuuuuuuuuuuuu4r");for(document.write('<div style="position: relative; width:330px; height:220px">'),i=0;Dx>=i;i++)for(j=0;Dy>=j;j++){var pos=row[i].charAt(j),pos_left=22*j,pos_top=22*i;document.write('<div style="position: absolute; left:'+pos_left+"px; top:"+pos_top+'px;">'),document.write("<IMG ID=x"+eval(i)+"y"+eval(j)+" SRC="+pos+".png width=22 height=22>"),document.write("</div>")}document.write("</div>"),document.write('<INPUT onClick="loesung()" TYPE=button VALUE="Loesung">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'),document.write('<TD ALIGN=center><INPUT onClick="restart()" TYPE=button VALUE="Restart">')}function restart(){var i=0,j=0,n="";if(counter=-1,Tx!=Mx||Ty!=My){n="x"+eval(Tx)+"y"+eval(Ty);var helppic=document.getElementById(n).src,pos=helppic.search("T.png");pos>-1?helppic="1.png":(pos=helppic.lastIndexOf("T"),helppic=helppic.substring(pos+1,pos+6)),document.getElementById(n).src=helppic}n="x"+eval(Mx)+"y"+eval(My);var helppic=document.getElementById(n).src,pos=helppic.search("M.png");pos>-1?helppic="1.png":(pos=helppic.lastIndexOf("M"),helppic=helppic.substring(pos+1,pos+6)),document.getElementById(n).src=helppic,G=!1,U=0,Tx=4,Ty=0,Mx=4,My=13,document.getElementById("x1y14").src="e.png",document.getElementById("x4y0").src="T.png",document.getElementById("x4y13").src="M.png"}function loesung(){if(counter++,!(counter>=solutionstr.length)){var e=solutionstr.charAt(counter);switch(e){case"L":move(Tx,Ty-1);case"U":move(Tx-1,Ty);case"R":move(Tx,Ty+1);case"D":move(Tx+1,Ty);case" ":move(Tx,Ty)}}}var maze=new Array("+---+---+---+---+---+---+---+---+---+---+---+---+---+---+    ","|                   |               |                   |    ","+---+---+   +   +   +   +---+   +---+---+   +---+---+   +---+","|   |   |   |   |   |   |                   |             X  ","+   +   +   +---+   +   +---+   +---+---+---+---+---+   +---+","|                                                       |    ","+   +   +---+   +   +   +---+   +   +   +---+---+   +   +    ","|   |   |       |   |           |   |               |   |    ","+   +   +---+   +   +   +   +   +   +---+---+---+   +   +    ","| T |   |       |   |   |   |   |               |   | M |    ","+   +   +   +   +   +   +   +   +   +---+---+   +   +   +    ","|   |   |   |       |   |                       |   |   |    ","+   +   +   +   +   +   +   +   +   +---+---+   +   +   +    ","|   |   |   |   |   |   |   |   |               |   |   |    ","+   +   +   +   +   +   +   +   +   +---+---+   +   +   +    ","|   |   |   |   |   |   |   |   |               |   |   |    ","+   +   +   +   +   +   +   +   +   +---+---+   +   +   +    ","|                                                       |    ","+---+---+---+---+---+---+---+---+---+---+---+---+---+---+    ");const Dx=9,Dy=15;var Tx=4,Ty=0,Mx=4,My=13;const Ex=1,Ey=14;var Tpic="T1.png",Mpic="M1.png",G=!1,U=2,counter=-1;const solutionstr="UURRRDDLDDDDRRRUUUUURRUURRRURRRLLLDLLLDDDDDDDRRRRRRL LUUULLLLUUUUULLDDDDDDDDRRRRRRRUUUUUURUR";