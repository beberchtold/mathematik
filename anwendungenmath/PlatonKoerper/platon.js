  // Progamm zu Platon Körper auf www.mathematik.ch
  // Umwandlung des ursprünglichen Java-Applets von Walter Fendt in html5 und Javascript von Bernhard Berchtold
  // copyright Walter Fendt und Bernhard Berchtold
  
    var W;
    var H;
	sqrt2=Math.sqrt(2);
	sqrt3=Math.sqrt(3);
	sqrt5=Math.sqrt(5);
	r5p1 = Math.sqrt(5) + 1.0;
    r5m1 = Math.sqrt(5) - 1.0;
	var rotAxis=0;
    eps = 9.9999999999999995E-007;
	var t=4;
	var u0;
    var v0;
    nMax = 100;
    var nE;
    var nK;
    var xE=new Array();
    var yE=new Array();
    var zE=new Array();
    var k0=new Array();
    var k1=new Array();
    var xN1=new Array();
    var yN1=new Array();
    var zN1=new Array();
    var xN2=new Array();
    var yN2=new Array();
    var zN2=new Array();
    var theta = 15/180*Math.PI;
    var phi;
    var a1;
    var a2;
    var b1;
    var b2;
    var b3;
    var c1;
    var c2;
    var c3;
	var d;
    var ctx;
	var mode=5;  // Ikosaeder
	var timer;
	delay=400;  // in Millisekunden für  setTimeout(function(){......},delay)
	var Weiter=false;
	var stop;
	
window.onload=init;	
    
  function resizeCanvas() {
    var canvs = document.getElementById("containercanvas");
    canvs.width = canvs.offsetWidth;
    // canvs.height = canvs.offsetHeight;
	W=canvs.width;
	if (W>500) W=500;
	H=W; 
	if (initmade) {
	  resize1();
	  zeichne();
	} else init();	
  }

  function init() {
    canvas1=document.getElementById('myCanvas');
    ctx = canvas1.getContext('2d');
	W = canvas1.width;
	H = canvas1.height;
	u0=W/2; v0=H/2;
    document.getElementById(mode).style.backgroundColor ="#00FF00";		  
    coordsIcosahedron();
    initPolyhedron();
	zeichne();
  } 

  function resize1() {
	 canvas1.width=W; canvas1.height=H; 
  }

  function zeichne(){  	
	ctx.clearRect(0,0,W,H);
    ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.lineWidth="1";
    phi = -Math.PI/20 * t;
    calcCoeff();
    for(var i = 0; i < nK; i++)
      if(c1 * xN1[i] + c2 * yN1[i] + c3 * zN1[i] > -eps || c1 * xN2[i] + c2 * yN2[i] + c3 * zN2[i] > -eps)
        drawLine(k0[i], k1[i]);
      else
        drawDashes(k0[i], k1[i]);
    ctx.stroke();		
    ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.arc(u0,v0,1,0,2*Math.PI);
	ctx.stroke();
  }
  
  function button1() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode=1;
	document.getElementById(mode).style.backgroundColor ="#00FF00";
    coordsTetrahedron();
    initPolyhedron();	   
    zeichne();	   
  }

  function button2() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode=2;
	document.getElementById(mode).style.backgroundColor ="#00FF00";
    coordsHexahedron();
    initPolyhedron();	   
    zeichne();
  }
  
  function button3() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode=3;
	document.getElementById(mode).style.backgroundColor ="#00FF00";
    coordsOctahedron();
    initPolyhedron();	   
    zeichne();
  }
  
  function button4() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode=4;
	document.getElementById(mode).style.backgroundColor ="#00FF00";
    coordsDodecahedron();
    initPolyhedron();	   
    zeichne();
  }

  function button5() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode=5;
	document.getElementById(mode).style.backgroundColor ="#00FF00";
    coordsIcosahedron();
    initPolyhedron();	   
    zeichne();
  }

  function run() {
	  Weiter=!Weiter;
	  if (Weiter) {document.getElementById('STEP').disabled=true; document.getElementById('RUN').value ="Stop";}
	     else {document.getElementById('STEP').disabled=false; document.getElementById('RUN').value ="Run";}
	  stop=false;
	  dorun();
  }

  function dorun() {
	if (!stop && Weiter) {
       dostep();
    }  
  }

  function dostep() {  
    t=t+1;
	if (t==40) t=0;
	stop=true;
	timer = setTimeout(function(){action()},delay);
    zeichne();
	dorun();
  }

  function action() {
	stop=false;
	clearTimeout(timer);
	dorun();
  }
  
  function doAxis() {
	rotAxis=rotAxis+1;
    if (rotAxis==3)	rotAxis=0;
	if (rotAxis==0) document.getElementById("ax").innerHTML="durch Ecke";
	if (rotAxis==1) document.getElementById("ax").innerHTML="durch Kantenmittelpunkt";
	if (rotAxis==2) document.getElementById("ax").innerHTML="durch Flächenmittelpunkt";
    updateCoords();
    initPolyhedron();	
    zeichne();	
  }

  function calc() {
	theta = parseInt(document.getElementById("theta").value);
	if (theta<-90) theta=-90;
	if (theta>90) theta=90;
	document.getElementById("theta").value=theta;
	theta = theta * Math.PI/180;
    zeichne();	
  }

  function kippen(d,d1)
    {
        var d2 = d * Math.PI/180;
        var d3 = Math.cos(d2);
        var d4 = Math.sin(d2);
        for(var i = 0; i < nE; i++)
        {
            var d5 = xE[i];
            var d7 = yE[i];
            xE[i] = d5 * d3 - d7 * d4;
            yE[i] = d5 * d4 + d7 * d3;
        }
        d2 = d1 * Math.PI/180;
        d3 = Math.cos(d2);
        d4 = Math.sin(d2);
        for(var j = 0; j < nE; j++)
        {
            var d6 = yE[j];
            var d8 = zE[j];
            yE[j] = d6 * d3 - d8 * d4;
            zE[j] = d6 * d4 + d8 * d3;
        }
    }


  function coordsTetrahedron()
    {
        nE = 4;
        d = sqrt2 / 3;
        xE[0] = 2;
        yE[0] = 0.0;
        zE[0] = -sqrt2 / 2;
        xE[1] = -1;
        yE[1] = sqrt3;
        zE[1] = -sqrt2 / 2;
        xE[2] = -1;
        yE[2] = -sqrt3;
        zE[2] = -sqrt2 / 2;
        xE[3] = 0.0;
        yE[3] = 0.0;
        zE[3] = (3 * sqrt2) / 2;
        for(var i = 0; i < 4; i++)
        {
            xE[i] *= d;
            yE[i] *= d;
            zE[i] *= d;
        }

        if(rotAxis == 1)
            kippen(90, Math.acos(1.0 / sqrt3) * 180/Math.PI);
        else
        if(rotAxis == 2)
            kippen(0.0, 180);
    }

    function coordsHexahedron()
    {
        nE = 8;
        for(var i = 0; i < 8; i++)
        {   if (i/2==Math.floor(i/2)) faktor=0; else faktor=1;
	        if (Math.floor(i/2)/2==Math.floor(Math.floor(i/2)/2)) faktor1=0; else faktor1=1;
            xE[i] = 1 - 2 * Math.floor((i / 4));
            yE[i] = 1 - 2 * faktor1;
            zE[i] = 1 - 2 * faktor;
            xE[i] /= sqrt3;
            yE[i] /= sqrt3;
            zE[i] /= sqrt3;
        }

        if(rotAxis == 0)
            kippen(45, Math.acos(1.0 / sqrt3) * 180/Math.PI);
        else
        if(rotAxis == 1)
            kippen(45, 90);
    }

    function coordsOctahedron()
    {
        nE = 6;
        for(var i = 0; i < 6; i++)
            xE[i] = yE[i] = zE[i] = 0.0;

        xE[0] = yE[1] = zE[2] = 1.0;
        xE[3] = yE[4] = zE[5] = -1;
        if(rotAxis == 1)
            kippen(0.0, 45);
        else
        if(rotAxis == 2)
            kippen(45, Math.acos(1.0 / sqrt3) * 180/Math.PI);
    }

    function coordsDodecahedron()
    {
        d = Math.sqrt(12);
        nE = 20;
        xE[0] = 2;
        yE[0] = 2;
        zE[0] = 2;
        xE[1] = -2;
        yE[1] = 2;
        zE[1] = 2;
        xE[2] = 2;
        yE[2] = -2;
        zE[2] = 2;
        xE[3] = 2;
        yE[3] = 2;
        zE[3] = -2;
        xE[4] = 0.0;
        yE[4] = r5p1;
        zE[4] = r5m1;
        xE[5] = 0.0;
        yE[5] = r5p1;
        zE[5] = -r5m1;
        xE[6] = r5m1;
        yE[6] = 0.0;
        zE[6] = r5p1;
        xE[7] = -r5m1;
        yE[7] = 0.0;
        zE[7] = r5p1;
        xE[8] = r5p1;
        yE[8] = r5m1;
        zE[8] = 0.0;
        xE[9] = r5p1;
        yE[9] = -r5m1;
        zE[9] = 0.0;
        for(var i = 0; i < 10; i++)
        {
            xE[10 + i] = -xE[i];
            yE[10 + i] = -yE[i];
            zE[10 + i] = -zE[i];
        }

        for(var j = 0; j < 20; j++)
        {
            xE[j] /= d;
            yE[j] /= d;
            zE[j] /= d;
        }

        if(rotAxis == 0)
        {
            var d1 = Math.asin(2 / (r5p1 * sqrt3));
            kippen(90, d1 * 180/Math.PI);
        } else
        if(rotAxis == 2)
        {
            var d2 = Math.atan(2 * Math.sqrt((5 + 2 * sqrt5) / (50 + 22 * sqrt5)));
            kippen(0.0, d2 * 180/Math.PI);
        }
    }

    function coordsIcosahedron()
    {
        var d = Math.sqrt(10 - 2 * sqrt5);
        nE = 12;
        xE[0] = 0.0;
        yE[0] = 2;
        zE[0] = r5m1;
        xE[1] = 0.0;
        yE[1] = 2;
        zE[1] = -r5m1;
        xE[2] = r5m1;
        yE[2] = 0.0;
        zE[2] = 2;
        xE[3] = -r5m1;
        yE[3] = 0.0;
        zE[3] = 2;
        xE[4] = 2;
        yE[4] = r5m1;
        zE[4] = 0.0;
        xE[5] = 2;
        yE[5] = -r5m1;
        zE[5] = 0.0;
        for(var i = 0; i < 6; i++)
        {
            xE[6 + i] = -xE[i];
            yE[6 + i] = -yE[i];
            zE[6 + i] = -zE[i];
        }

        for(var j = 0; j < 12; j++)
        {
            xE[j] /= d;
            yE[j] /= d;
            zE[j] /= d;
        }

        if(rotAxis == 0)
        {
            d1 = Math.asin(Math.sqrt(2 / (5 + sqrt5)));
            kippen(90, d1 * 180/Math.PI);
        } else
        if(rotAxis == 2)
        {
            var d2 = Math.atan(Math.sqrt(2 / (7 + 3 * sqrt5)));
            kippen(0.0, d2 * 180/Math.PI);
        }
    }
  
  function initPolyhedron()
    {
        nK = 0;
        for(var i = 0; i < nE - 1; i++)
        {
            for(var j = i + 1; j < nE; j++)
                if(istKante(i, j))
                {
                    k0[nK] = i;
                    k1[nK] = j;
                    nK++;
                }
        }
    }

  function screenU(d,d1)
    {
        return u0 + Math.round(u0 * (a1 * d + a2 * d1));
    }

  function screenV(d,d1,d2)
    {
        return v0 + Math.round(v0 * (b1 * d + b2 * d1 + b3 * d2));
    }

  function drawLine(i,j)
    {
        var k = screenU(xE[i], yE[i]);
        var l = screenV(xE[i], yE[i], zE[i]);
        var i1 = screenU(xE[j], yE[j]);
        var j1 = screenV(xE[j], yE[j], zE[j]);
        ctx.strokeStyle = "blue";
		ctx.moveTo(k,l);
        ctx.lineTo(i1, j1);
    }

  function drawDashes(i,j)
    {
        var k = Math.round(screenU(xE[i], yE[i]));
        var l = Math.round(screenV(xE[i], yE[i], zE[i]));
        var i1 = Math.round(screenU(xE[j], yE[j]));
        var j1 = Math.round(screenV(xE[j], yE[j], zE[j]));
        var d = i1 - k;
        var d1 = j1 - l;
        var d2 = Math.sqrt(d * d + d1 * d1);
        var l1 = Math.floor(d2 / 15);
        var d3 = d / (3 * l1 + 2);
        var d4 = d1 / (3 * l1 + 2);
        ctx.strokeStyle = "blue";
        for(var i2 = 0; i2 <= l1; i2++)
        {
            var d5 = k + (i2 * 3) * d3;
            var d6 = l + (i2 * 3) * d4;
            var d7 = d5 + 2 * d3;
            var d8 = d6 + 2 * d4;
            var j2 = Math.round(d5);
            var k2 = Math.round(d6);
            var l2 = Math.round(d7);
            var i3 = Math.round(d8);
			ctx.moveTo(j2,k2);
            ctx.lineTo(l2, i3);
        }

    }

  function istFlaeche(i,j,k,ad)
    {
        var flag = false;
        var flag1 = false;
        var d = xE[i];
        var d1 = yE[i];
        var d2 = zE[i];
        var d3 = xE[j] - d;
        var d4 = yE[j] - d1;
        var d5 = zE[j] - d2;
        var d6 = xE[k] - d;
        var d7 = yE[k] - d1;
        var d8 = zE[k] - d2;
        var d9 = d4 * d8 - d5 * d7;
        var d10 = d5 * d6 - d3 * d8;
        var d11 = d3 * d7 - d4 * d6;
        for(var l = 0; l < nE; l++)
        {
            var d12 = xE[l] - d;
            var d14 = yE[l] - d1;
            var d15 = zE[l] - d2;
            var d16 = d9 * d12 + d10 * d14 + d11 * d15;
            if(d16 < -eps)
                flag = true;
            if(d16 > eps)
                flag1 = true;
            if(flag && flag1)
                break;
        }

        var d13 = Math.sqrt(d9 * d9 + d10 * d10 + d11 * d11);
        if(d13 < eps)
            return false;
        if(flag && !flag1)
            d13 = -d13;
        ad[0] = d9 / d13;
        ad[1] = d10 / d13;
        ad[2] = d11 / d13;
        return !flag || !flag1;
    }


	  function istKante(i,j)
    {
        var k = 0;
        var ad = new Array();
        var d = 0.0;
        var d1 = 0.0;
        var d2 = 0.0;
        for(var l = 0; l < nE; l++)
        {
            if(l == i || l == j)
                continue;
            var flag = istFlaeche(i, j, l, ad);
            if(!flag)
                continue;
            if(++k == 1)
            {
                d = ad[0];
                d1 = ad[1];
                d2 = ad[2];
                xN1[nK] = d;
                yN1[nK] = d1;
                zN1[nK] = d2;
            }
            if(k != 2)
                continue;
            var d3 = d * ad[0] + d1 * ad[1] + d2 * ad[2];
            if(Math.abs(d3 * d3 - 1.0) < eps)
            {
                k--;
                continue;
            }
            xN2[nK] = ad[0];
            yN2[nK] = ad[1];
            zN2[nK] = ad[2];
            break;
        }

        return k == 2;
    }

  function calcCoeff()
    {
        d = Math.sin(theta);
        d1 = Math.cos(theta);
        a1 = Math.sin(phi);
        a2 = -Math.cos(phi);
        b1 = d * a2;
        b2 = -d * a1;
        b3 = -d1;
        c1 = -d1 * a2;
        c2 = d1 * a1;
        c3 = -d;
    }

  function updateCoords()
    {
        switch(nE)
        {
        case 4: // '\004'
            coordsTetrahedron();
            break;

        case 8: // '\b'
            coordsHexahedron();
            break;

        case 6: // '\006'
            coordsOctahedron();
            break;

        case 20: // '\024'
            coordsDodecahedron();
            break;

        case 12: // '\f'
            coordsIcosahedron();
            break;
        }
    }



	