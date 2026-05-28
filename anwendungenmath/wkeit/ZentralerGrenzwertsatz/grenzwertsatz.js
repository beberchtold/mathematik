  // Progamm zu Grenzwertsatz auf www.mathematik.ch
  // April 2016: php-Programm vom Januar 2002 umgeschrieben auf html5 und Javascript
  // copyright Bernhard Berchtold

    var W,H;
	var n,N,mue,sigma,total;
	var anzahl=new Array(20);
	
window.onload=init;
  
   function Mittelwert(total,anzahl)
   {var m = 0;
    for (var k=0;k<=19;k++)  m += anzahl[k]*(2.5+5*k) ;
     if (total>0) m = m/total;
     return(m);
   }
   
   function Streu(total,Mittelwert,anzahl)
   {var s = 0;
    for (var k=0;k<=19;k++)  s += anzahl[k]*(Mittelwert-(2.5+5*k))*(Mittelwert-(2.5+5*k));
     if (total>0) s = s/total;
     return(s);
   }

  function ypixel(y) { 
    return (H-20-Math.round((H-40)*3*y));   // y-Werte um Faktor 3 erhöht
  }

  function f(u) {
    return (1/Math.sqrt(2*Math.PI))*Math.exp(-u*u/2);
  }

 function init() {
    canvas1 = document.getElementById('myCanvas');
    ctx = canvas1.getContext('2d');
	W = canvas1.width;
	H = canvas1.height;
    rechne();
  }

  function rechne() {
    var Zahl=new Array(10000);
	var summe=new Array(100);
	if (document.getElementById("n").value == '') 
     {alert ("Wert für n eingeben!");
      return};
    n=parseInt(document.getElementById("n").value);
	if (n<1000) {n=1000; document.getElementById("n").value=n}
	if (n>10000) {n=10000; document.getElementById("n").value=n}
    if (document.getElementById("N").value == '') 
     {alert ("Wert für N eingeben!");
      return};
    N=parseInt(document.getElementById("N").value);
	if (N<5) {N=5; document.getElementById("N").value=N}
	if (N>20) {N=20; document.getElementById("N").value=N}
    total = Math.floor(n/N);
    for (k = 0; k <= 19; k++) anzahl[k]=0;
    var j=1; summe[1] = 0;
    for (var i = 1; i <= n; i++)
      { x = Math.random();
     	Zahl[i] =  Math.floor(x * 100)+1;   	
     	summe[j] += Zahl[i];
     	if (i/N == Math.floor(i/N))
     	 { k = Math.floor(summe[j]/(5*N)); anzahl[k]++;
     	   j++; summe[j]=0;
     	 }
      }
	mue = Mittelwert(total,anzahl);
    var Mittelwert_gerundet = Math.round(100*mue)/100;
    var Streuung = Streu(total,mue,anzahl);
    sigma = Math.sqrt(Streuung);
    var sigma_gerundet = Math.round(100*sigma)/100; 
	document.getElementById("Total").innerHTML=total;
	document.getElementById("MittelWert").innerHTML=Mittelwert_gerundet;
	document.getElementById("StandardAbweichung").innerHTML=sigma_gerundet;
    zeichne();
  }

  function zeichne() {  // wird durch Drücken auf button ausgelöst
    ctx.clearRect(0,0,W,H);
    ctx.beginPath();
    ctx.lineWidth="1";
    ctx.font="12px Arial";
	var breite = W/20; 
    ctx.fillStyle = "black";
    for (k=0;k<=19;k++)
      {ctx.fillText(5*k+2,k*breite+5,H-1); }  
    ctx.fillStyle = "red";
    for (k=0;k<=19;k++)
      {if (k % 2 == 0) ctx.fillText(anzahl[k],k*breite+2,20);
       else ctx.fillText(anzahl[k],k*breite+2,30);}
    ctx.fillStyle = "blue"; 
    for (k=0;k<=19;k++)
      { var y1=ypixel(N/n*anzahl[k]); ctx.fillRect(k*breite,y1,breite,H-y1-20);}
    ctx.strokeStyle = "red";  
    for (i = 0; i < 100; i++)
      { y1=ypixel(5/sigma*f((i-mue)/sigma)); y2=ypixel(5/sigma*f((i+1-mue)/sigma));
        line(W/100*i,y1,W/100*(i+1),y2);
      }
    ctx.stroke(); 
  }
  
  function line(x1,y1,x2,y2) {
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
  }


 