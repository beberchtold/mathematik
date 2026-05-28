  // Progamm zum Testen von Hypothesen auf www.mathematik.ch
  // Das ursprüngliche Java-Applet stammt von www.fh-niederrhein.de/~gkorsch/mserv/mservheiss/m12/hypotest/hypotest.html
  // Oktober 2015: Applet vom Januar 2002 umgeschrieben auf html5 und Javascript
  // copyright Bernhard Berchtold

    var W;
	var H;
    var abu;
    var abo;
    var n=100;
    var p=0.5;
    var alpha=5;
    var summez=false;  
    var yfak=1;
	var mode=3; //zweiseitig
	var modew=4; //Wkeit
    var ctx;
	var ctx2;
	var canvas1;
	var canvas2;
	var initmade=false;
	
window.onload=resizeCanvas;	
    
  function resizeCanvas() {
    var canvs = document.getElementById("containercanvas");
    canvs.width = canvs.offsetWidth;
    // canvs.height = canvs.offsetHeight;
	W=canvs.width;
	H=0.5*W;
	if (initmade) {
	  resize1();
      zeichne();
	  zeichnen2();
	} else init();	
  }

  function init() {
    initmade=true;
	window.addEventListener('resize', function(event){
      resizeCanvas()
    });
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	document.getElementById(modew).style.backgroundColor ="#00FF00";
    canvas1 = document.getElementById('myCanvas');
	canvas2 = document.getElementById('myCanvas2');
	canvas2.addEventListener('click', function(evt) { 
    var mousePos = getMousePos(canvas2, evt);
    var x=mousePos.x;
	var pi = Math.floor((20 * (x + W / 40)) / W);
    var p = pi/20;
    document.getElementById("Pbeta").innerHTML="" + p;
    var beta = 1.0 - f(n, p);
      if (beta <= 0.001)
          beta = 0.0;
        else
          beta = Math.round(10000 * beta) / 100;
          document.getElementById("Beta").innerHTML="" + beta + "%";
      }, false);
	resize1();
    ctx = canvas1.getContext('2d');
	ctx2 = canvas2.getContext('2d');
	zeichne();
	zeichnen2();
  }

  function resize1() {
	 canvas1.width=W; canvas1.height=H;
     canvas2.width=W; canvas2.height=H;	 
  }

  function button1() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode="1";
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	zeichne();
	document.getElementById("Pbeta").innerHTML="";
	document.getElementById("Beta").innerHTML="";	  
	zeichnen2();
  }

  function button2() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode="2";
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	zeichne();
	document.getElementById("Pbeta").innerHTML="";
	document.getElementById("Beta").innerHTML="";	  
	zeichnen2();
  }  

  function button3() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode="3";
	document.getElementById(mode).style.backgroundColor ="#00FF00";	  
    zeichne();
	document.getElementById("Pbeta").innerHTML="";
	document.getElementById("Beta").innerHTML="";
	zeichnen2();
  }

  function button4() {
	document.getElementById(modew).style.backgroundColor ="#E0FFFF";
	modew="4";
	document.getElementById(modew).style.backgroundColor ="#00FF00";
	summez=false;
	zeichne();	  
  }

  function button5() {
	document.getElementById(modew).style.backgroundColor ="#E0FFFF";
	modew="5";
	document.getElementById(modew).style.backgroundColor ="#00FF00";
	summez=true; yfak=1;
	zeichne();	  
  }

  function button6() {
	document.getElementById(modew).style.backgroundColor ="#E0FFFF";
	modew="6";
	document.getElementById(modew).style.backgroundColor ="#00FF00";
	summez=true; yfak=10;
	zeichne();	  
  }
  
  function einlesen() {
    p = document.getElementById("p0").value;
	if (p<0) p=0.0;
	if (p>1) p=1.0;
	n = parseInt(document.getElementById("Anz").value);
	if (n<1) p=1;
	if (n>300) n=300;
	alpha = document.getElementById("Sniveau").value;
	if (alpha<0.5) alpha=0.5;
	if (alpha>8.5) alpha=8.5;
    summez=(modew==5);
	document.getElementById("Pbeta").innerHTML="";
	document.getElementById("Beta").innerHTML="";
    zeichne();
    zeichnen2();	
  }

  function zeichne() {  // wird durch Drücken auf button Start ausgelöst
    ctx.clearRect(0,0,W,H);
	ctx.beginPath();
	ctx.strokeStyle = "gray";
	ctx.rect(0,0,W-1,H-1);
	ctx.stroke();
    axen(n,p,summez,yfak);	
    if (mode==1)  linkss(W,H,n,summez,p,alpha/100,yfak);
    if (mode==2)  rechtss(W,H,n,summez,p,alpha/100,yfak);
    if (mode==3)  zweis(W,H,n,summez,p,alpha/100,yfak);	
  }


  function comb(n,k)
    {
        var dwert = 1.0;
        if (k > n)
            dwert = 0.0;
        else
        if (k == 0)
        {
            dwert = 1.0;
        } else
        {
          for (var i = 1; i <= k; i++)
                dwert = (dwert * ((n + 1) - i)) / i;

        }
        return dwert;
    }

  function b(n,k,p)
    {
        var bwert = comb(n, k) * Math.pow(p, k) * Math.pow(1.0 - p, n - k);
        return bwert;
    }

  function linkss(W,H,n,sz,p,a,yfak)
    {   
        var grges = false;
        var su = 0.0;
        var ewert = Math.floor(n * p);
        var maxst = b(n, ewert, p);
        for (var i = 0; i <= n; i++)
        {   ctx.beginPath();
            var ew;
            if (su < 0.99990000000000001)
                ew = b(n, i, p);
            else
                ew = 0.0;
            su += ew;
            if (su <= a)
            {
                ctx.strokeStyle = "red";
            } else
            {
                if (!grges)
                {
                    grges = true;
                    abu = i;
                    abo = n;
                    document.getElementById("VerB").innerHTML="{0 .. " + (i - 1) + "}";
                    var alpha = Math.ceil(100000 * (su - ew)) / 1000;
                    document.getElementById("Alpha").innerHTML="" + alpha + "%";
                }
                ctx.strokeStyle = "blue";
            }
            zeichnen(W,H,i,n,sz,su,ew,yfak,maxst);
			ctx.stroke();
        }

        if (sz)
        {   ctx.beginPath();
            ctx.strokeStyle = "magenta";
            var yk = H - Math.floor((0.050000000000000003 + a * 0.90000000000000002 * yfak) * H);
            line(0, yk, W - 1, yk);
			ctx.stroke();
        }
	  	
    }

    function rechtss(W,H,n,sz,p,a,yfak)
    {  
        var grges = false;
        var su = 0.0;
        var ewert = Math.floor(n * p);
        var maxst = b(n, ewert, p);
        for (var i = n; i >= 0; i--)
        {  ctx.beginPath();
            var ew;
            if (su < 0.99990000000000001)
                ew = b(n, i, p);
            else
                ew = 0.0;
            su += ew;
            if (su <= a)
            {
                ctx.strokeStyle = "red";
            } else
            {
                if (!grges)
                {
                    grges = true;
                    abu = 0;
                    abo = i;
                    document.getElementById("VerB").innerHTML="{" + (i + 1) + " .. " + n + "}";
                    var alpha = Math.ceil(100000 * (su - ew)) / 1000;
                    document.getElementById("Alpha").innerHTML="" + alpha + "%";
                }
                ctx.strokeStyle = "blue";
            }
            zeichnen(W,H,i,n,sz,su,ew,yfak,maxst);
			ctx.stroke();
        }

        if (sz)
        {   ctx.beginPath();
            ctx.strokeStyle = "magenta";
            var yk = H - Math.floor((0.050000000000000003 + a * 0.90000000000000002 * yfak) * H);
            line(0, yk, W - 1, yk);
			ctx.stroke();	
        }
	  
    }

  function zweis(W,H,n,sz,p,a,yfak)
    {  
        var verw = "";
        var iwk = 0.0;
        var grges = false;
        var su = 0.0;
        var ewert = Math.floor(n * p);
        var maxst = b(n, ewert, p);
        for (var i = 0; i <= ewert; i++)
        {  ctx.beginPath();
            var ew;
            if (su < 0.99990000000000001)
                ew = b(n, i, p);
            else
                ew = 0.0;
            su += ew;
            if (su <= a / 2)
            {
                ctx.strokeStyle = "red";
            } else
            {
                if (!grges)
                {
                    grges = true;
                    abu = i;
                    verw = "{0.." + (i - 1) + "}";
                    iwk = su - ew;
                }
                ctx.strokeStyle = "blue";
            }
            zeichnen(W,H,i,n,sz,su,ew,yfak,maxst);
			ctx.stroke();
        }

        var so = 0.0;
        grges = false;
        for (var i = n; i > ewert; i--)
        {   ctx.beginPath();
            var ew;
            if (so < 0.99990000000000001)
                ew = b(n, i, p);
            else
                ew = 0.0;
            so += ew;
            if (so <= a / 2)
            {
                ctx.strokeStyle = "red";
            } else
            {
                if (!grges)
                {
                    grges = true;
                    abo = i;
                    document.getElementById("VerB").innerHTML=verw + " & " + "{" + (i + 1) + ".." + n + "}";
                    var alpha = Math.ceil(100000 * ((iwk + so) - ew)) / 1000;
                    document.getElementById("Alpha").innerHTML="" + alpha + "%";
                }
                ctx.strokeStyle = "blue";
            }
            zeichnen(W,H,i,n,sz,so,ew,yfak,maxst);
			ctx.stroke();
        }

        if (sz)
        {   ctx.beginPath();
            ctx.strokeStyle = "magenta";
            var yk = H - (0.050000000000000003 + a * 0.45000000000000001 * yfak) * H;
            line(0, yk, W - 1, yk);
			ctx.stroke();
			ctx.beginPath();
            var xk = (n * p * W) / n;
            ctx.strokeStyle = "green";
            line(xk, 1, xk, H - 1);
			ctx.stroke();
        }
	  	
    }

  function zeichnen(W,H,i,n,sz,su,ew,yfak,mx)
    {
        var xk = (i * W) / n;
        if (sz)
        {
            var yk = (0.050000000000000003 + su * 0.90000000000000002 * yfak) * H;
			ctx.beginPath();
			ctx.arc(xk-1,H-yk-1,1,0,2*Math.PI);
			ctx.stroke();
        } else
        {
            var yk = (ew * 0.90000000000000002 * H) / mx;
            line(xk, 0.94999999999999996 * H, xk, 0.94999999999999996 * H - yk);
        }
    }

  function line(x1,y1,x2,y2) {
	  ctx.moveTo(x1,y1);
	  ctx.lineTo(x2,y2);
  }

  function line2(x1,y1,x2,y2) {
	  ctx2.moveTo(x1,y1);
	  ctx2.lineTo(x2,y2);
  }
  
  function axen(n,p,sz,yf)
    {   ctx.font="12px Arial";
		ctx.beginPath();
        var ym = 1.0;
        var maxst = b(n, Math.floor(n * p), p);
        if (sz)
            ym = 1.0 / yf;
        else
            ym = Math.ceil(1000 * maxst) / 1000;
        ctx.strokeStyle = "gray";
        var yk = Math.floor(0.050000000000000003 * H);
        line(0, yk, 4, yk);
        ctx.fillText("" + ym, 6, yk + 8);
        yk = (0.5 * H);
        line(0, yk, 4, yk);
        ctx.fillText("" + ym / 2, 6, yk + 4);
        yk = (0.94999999999999996 * H);
        line(0, yk, 4, yk);
        ctx.fillText("0", 6, yk);
        var i = 1;
        do
        {
            var xk = (0.25 * i * W);
            line(xk, H - 5, xk, H);
            ctx.fillText("" + (i * 0.25 * n), xk - 8, H - 10);
        } while(++i < 4);
        ctx.fillText("" + n, W - 20, H - 10);
		ctx.stroke();
    }

  function axen2()
    {   ctx2.font="12px Arial";
	    ctx2.fillStyle="black";
	    ctx2.beginPath();
        ctx2.strokeStyle = "gray";
        var yk = 0.050000000000000003 * H;
        line2(0, yk, 4, yk);
        ctx2.fillText("1.0", 6, yk + 8);
        yk = 0.5 * H;
        line2(0, yk, 4, yk);
        ctx2.fillText("0.5", 6, yk + 4);
        yk = 0.94999999999999996 * H;
        line2(0, yk, 4, yk);
        ctx2.fillText("0", 6, yk);
        var i = 1;
        do
        {
            var xk = 0.25 * i * W;
            line2(xk, H - 5, xk, H);
            ctx2.fillText("" + i * 0.25, xk - 8, H - 6);
        } while (++i < 4);
        ctx2.fillText("1", W - 8, H - 6);
		ctx2.stroke();
    }

	
  function f(n,p)
    {
        var su = 0.0;
        for (var i = 0; i < abu; i++)
            su += b(n, i, p);
        for (var i = abo + 1; i <= n; i++)
            su += b(n, i, p);
        return su;
    }
 
   function zeichnen2() { 
      ctx2.clearRect(0,0,W,H);
	  ctx2.beginPath();
	  ctx2.strokeStyle = "gray";
	  ctx2.rect(0,0,W-1,H-1);
	  ctx2.stroke();
	    axen2();		
        var su = 0.0;
        ctx2.fillStyle = "rgb(180,0,0)";
        var p = 0.050000000000000003;
        var dp = 0.050000000000000003;
        for (; p <= 1.0; p += dp)
        {  
            yk = (0.050000000000000003 + (1.0 - f(n, p)) * 0.90000000000000002) * H;
            xk = p * W;
            ctx2.rect(xk - 1, H - 1 - yk, 3, 3);
			ctx2.fill();
        }
    }
	
  function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }	