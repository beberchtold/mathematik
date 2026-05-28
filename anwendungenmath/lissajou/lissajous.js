  // Progamm zu Lissajous-Figuren auf www.mathematik.ch
  // copyright Bernhard Berchtold

    var W,H;
    var xm,ym;
    var a=4,b=3,k=329;
	var as=4,bs=3,ks=329;          // zum Speichern einer Figur
	var Farbzahl=0;
	var Farbe=["red","green","blue","yellow"];
    var ctx;
	var mode="b7";
	var timer;
	delay=900;  // in Millisekunden für  setTimeout(function(){......},delay)
	var Weiter=false;
	var stop;
	
window.onload=init;
  
  function init() {
    canvas1=document.getElementById('myCanvas');
    ctx = canvas1.getContext('2d');
	W = canvas1.width;
	H = canvas1.height;
	xm = W/2; ym = H/2;
	benutzer();
  }
  
  function run() {
	  Weiter=!Weiter;
	  if (Weiter) {
		document.getElementById('RUN').value ="Stop";
		for (var i=1;i<21;i++) {
			document.getElementById('b'+i).disabled=true;
		}	
	  }
	    else {
		  document.getElementById('RUN').value ="Run";
		  for (var i=1;i<21;i++) {
			document.getElementById('b'+i).disabled=false;
		}
		}
	  stop=false;
	  dorun();
  }

  function dorun() {
	if (!stop && Weiter) {
       dostep();
    }  
  }

  function dostep() {  
	stop=true;
	timer = setTimeout(function(){action()},delay);
    zufallsfigur();
	dorun();
  }

  function action() {
	stop=false;
	clearTimeout(timer);
	dorun();
  }

  function zufallsfigur() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	a = Math.floor(10*Math.random())+1;
	b = Math.floor(10*Math.random())+1;
	k = Math.floor(359*Math.random())+1;
	setzeWerte();
	var n=Farbe.length;
	Farbzahl=Math.floor(n*Math.random());
	zeichne(); 
  }

  function benutzer() {
    setzeWerte();
    zeichne();	
	}
	
  function benutzer1() {
	k = 1;
    benutzer();	
	}
  
  function change_a() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	if (a<10) a++;
    benutzer();	
	}
	
  function change_aminus() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	if (a>1) a--;
    benutzer();	
	}	

  function change_b() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	if (b<10) b++;
    benutzer();	
	}

  function change_bminus() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	if (b>1) b--;
    benutzer();	
	}

  function change_k() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	if (k<359) k++;
    benutzer();	
	}	

  function change_kminus() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	if (k>1) k--;
    benutzer();	
	}

  function change_k10() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	if (k<349) k+=10;
    benutzer();	
	}
	
  // Berechnen und Plot der Kurve
  function zeichne(){  	
	ctx.clearRect(0,0,W,H);
    ctx.beginPath();
	ctx.strokeStyle = Farbe[Farbzahl];
	ctx.lineWidth="1";  
    var T = (k / 180) * Math.PI;
	var x1 = xm - Math.round((xm-1) * Math.cos(a * T));
    var y1 = ym + Math.round((ym-1) * Math.sin(b * T));
	ctx.moveTo(x1,y1);
	var L=bestimmeL();
	for (var i = 2; i < L + 2; i++)
        {
          T = (k / 180) *i * Math.PI;
          var x2 = xm - Math.round((xm-1) * Math.cos(a * T));
          var y2 = ym + Math.round((ym-1) * Math.sin(b * T));
          ctx.lineTo(x2, y2);
          x1 = x2;
          y1 = y2;
        }
    ctx.stroke();	
  }
	
  function F1() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode="b7";
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	Figur(1,1,103);  
  }

  function F2() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode="b8";
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	Figur(1,2,269);
  }  

  function F3() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode="b9";
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	Figur(2,5,29);  
  }

  function F4() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode="b10";
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	Figur(3,2,41);
  }  

  function F5() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode="b11";
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	Figur(4,1,247);  
  }

  function F6() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode="b12";
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	Figur(4,2,137);
  }  

  function F7() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode="b13";
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	Figur(5,1,127);  
  }

  function F8() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode="b14";
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	Figur(5,2,331);
  }

  function F9() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode="b15";
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	Figur(5,3,329);  
  }

  function F10() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode="b16";
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	Figur(8,1,29);
  }

  function bestimmeL() { 
	var hilf = k * ggT(a, b);
    hilf = ggT(hilf, 360);
	return 360 / hilf;	
  } 

  function ggT(a,b)
    {
     var Q = 1.5;
     while ( Q > Math.floor(Q))
        {
          Q = a / b;
          var c = a - Math.floor(Q) * b;
          a = b;
          b = c;
        }
     return a;
    }

  function setzeWerte() {
	document.getElementById("A").innerHTML=a;
	document.getElementById("B").innerHTML=b;
	document.getElementById("K").innerHTML=k;	
  }

  function Figur(a1,b1,k1) {
	a=a1; b=b1; k=k1;
	setzeWerte();
	zeichne(); 
  }
  
  function save() {
	as=a; bs=b; ks=k;  
  }

 function load() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	a=as; b=bs; k=ks;
	setzeWerte();
	zeichne(); 
  }