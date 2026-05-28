  // Progamm zu einseitigeAbleitung auf www.mathematik.ch
  // copyright Bernhard Berchtold

    var W,H;
    deltax = 40;
    xmax = 9;
    xmin = -1;
    ymax = 8;
    ymin = -1;
    x0= 5.5;
    x1 = 6;
    var ctx;
	var px=3;
	var qx=8;
	var py,qy;
	var mode=0; // gegen x0
	var moder=2; // linksseitig	
	var mousedown=false;
    
window.onload=init;

  function init() {
    canvas1=document.getElementById('myCanvas');
    ctx = canvas1.getContext('2d');
	W = canvas1.width;
	H = canvas1.height;
	py = f(px);
	qy = f(qx);
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	document.getElementById(moder).style.backgroundColor ="#00FF00";		
	canvas1.addEventListener('mousedown', function(evt) { 
	  mousedown=true;
      }, false);
	canvas1.addEventListener('mouseup', function(evt) { 
	  mousedown=false;
      }, false);	  
	canvas1.addEventListener('mousemove', function(evt) {  
     if (mousedown) {
	  var mousePos = getMousePos(canvas1, evt);
	  
      if (moder==2) {
   	  px = invmap(0,mousePos.x);  
      if (mode==0 & (px >= x0))
         px = x0; 
      if (mode==1 & (px >= x1))
         px = x1;
      if (px <= xmin)
         px = xmin;
      py = f(px);
      zeichne();
	  }
	  if (moder==3) {
      qx = invmap(0, mousePos.x);
      if (qx >= xmax)
         qx = xmax;
      if (mode==0 & (qx <= x0))
         qx = x0;
      if (mode==1 & (qx <= x1))
         qx = x1;
      qy = f(qx);	    
      zeichne();
	  }
	 }
      }, false);
	zeichne();
  }

  function button0() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode="0";
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	px=3; py=f(px); qx=8; qy=f(qx);
	zeichne();
  }

    function button1() {
	document.getElementById(mode).style.backgroundColor ="#E0FFFF";
	mode="1";
	document.getElementById(mode).style.backgroundColor ="#00FF00";
	px=3; py=f(px); qx=8; qy=f(qx);
	zeichne();
  }

  function buttonl() {
	document.getElementById(moder).style.backgroundColor ="#E0FFFF";
	moder="2";
	document.getElementById(moder).style.backgroundColor ="#00FF00";
	px=3; py=f(px);
	rsteig.innerHTML="";
	zeichne();
  }

   function buttonr() {
	document.getElementById(moder).style.backgroundColor ="#E0FFFF";
	moder="3";
	document.getElementById(moder).style.backgroundColor ="#00FF00";
	qx=8; qy=f(qx);
	lsteig.innerHTML="";
	zeichne();
  }  

  function Line(x1,y1,x2,y2)
    {   
		ctx.beginPath();
		ctx.moveTo(map(0, x1), map(1, y1));
	    ctx.lineWidth="1";
        ctx.lineTo(map(0, x2), map(1, y2));
		ctx.stroke();	
    }

  function map(sw,z)
    {   s = 2;
        if (sw < 0.5)
            s = (z - xmin) / (xmax - xmin) * W;
        if (sw > 0.5)
            s = (ymax - z) / (ymax - ymin) * H;
        return s;
    }

  function invmap(sw,z)
    {   ss = 2;
        if(sw < 0.5)
            ss = xmin + (z * (xmax - xmin)) / W;
        if(sw > 0.5)
            ss = (-z * (ymax - ymin)) / H - ymin;
        return ss;
    }

  function koordsys()
    {  var r0=map(1,0);
	    Line(xmin,0,xmax,0);
        Line(1.0, -0.03, 1.0, 0.03);
		ctx.strokeText('1', map(0,1) - 4, map(1,0) + 12);
		// Pfeil
		ctx.beginPath();
        ctx.moveTo(W-5,r0-5); ctx.lineTo(W,r0);
        ctx.moveTo(W-5,r0+5); ctx.lineTo(W,r0);
		ctx.stroke();
		var c0=map(0,0);
		Line(0,ymin,0,ymax);
        Line(-0.03, 1.0, 0.03, 1.0);
		ctx.strokeText('1', map(0,0) - 12, map(1,1));
        // Pfeil
		ctx.beginPath();
        ctx.moveTo(c0-5,5); ctx.lineTo(c0,0);
        ctx.moveTo(c0+5,5); ctx.lineTo(c0,0);
        ctx.stroke(); 		
    }


  // Berechnen und Plot der Kurve
  function zeichne(){
	var wahl=1;
	if (moder==3) { wahl=2; }    	
	ctx.clearRect(0,0,W,H);
    ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.lineWidth="1";
	koordsys();
	for (i = 0; i <= deltax; i++)
         {  var x;
            if (i == 0)
                x = (i / deltax) * (x0 - xmin) + xmin;
            else
                x = ((i - 1) / deltax) * (x0 - xmin) + xmin;
            var x2 = (i / deltax) * (x0 - xmin) + xmin;
            var y1 = f(x);
            var y2 = f(x2);
            Line(x, y1, x2, y2);
         }
        for(i = 0; i <= deltax; i++)
        {  
            if (i == 0)
                x = (i / deltax) * (xmax - x0) + x0;
            else
                x = ((i - 1) / deltax) * (xmax - x0) + x0;
            x2 = (i / deltax) * (xmax - x0) + x0;
            y1 = f(x);
            y2 = f(x2);
            Line(x, y1, x2, y2);
        }
        if (mode==0)
        {   var seksteig=Math.round(1000*(f(x0)-py)/(x0-px))/1000;
            if (Math.abs(px - x0) >= 0.01 && (wahl == 1))
            {   ctx.strokeStyle = "red";
                Zeichne(px, py, x0, f(x0));
                if ((x0-px) >= 0.01) lsteig.innerHTML = seksteig;
            }
            if (Math.abs(px - x0) < 0.01 && (wahl == 1))
            {   ctx.strokeStyle = "blue";
                Line(xmin, ldf(xmin), xmax, ldf(xmax));
				ctx.font = "16px sans-serif";
			    ctx.fillText('Linksseitige Ableitung', 40,20);
                lsteig.innerHTML = 2*x0/5;
            }
            seksteig=Math.round(1000*(f(x0)-qy)/(x0-qx))/1000;
            if (Math.abs(qx - x0) >= 0.01 && (wahl == 2))
            {   ctx.strokeStyle = "red";
                Zeichne(qx, qy, x0, f(x0));
                if ((qx-x0) >= 0.01) rsteig.innerHTML = seksteig;
            }
            if (Math.abs(qx - x0) < 0.01 && (wahl == 2))
            {   ctx.strokeStyle = "blue";
                Line(xmin, rdf(xmin), xmax, rdf(xmax));
				ctx.font = "16px sans-serif";
                ctx.fillText('Rechtsseitige Ableitung', 40,20);
                rsteig.innerHTML = 0;
            }
            ctx.strokeStyle = "gray";
            Line(x0, f(x0), x0, 0);
            ctx.strokeStyle = "black";
			ctx.font = "12px sans-serif";
			ctx.strokeText('x0', map(0, x0)-2, map(1,0) + 12);
        }
       if (mode==1)
        {   var seksteig = Math.round(1000*(f(x1)-py)/(x1-px))/1000;
            if (Math.abs(px - x1) >= 0.01 && (wahl == 1))
            {   ctx.strokeStyle = "red";
                Zeichne(px, py, x1, f(x1));
                if ((x1-px) >= 0.01) lsteig.innerHTML = seksteig;
            }
            if (Math.abs(px - x1) < 0.01 && (wahl == 1))
            {   ctx.strokeStyle = "blue";
                Line(xmin, df(xmin), xmax, df(xmax));
				ctx.font = "16px sans-serif";
                ctx.fillText("Linksseitige Ableitung", 40, 20);
                lsteig.innerHTML =-2*(x1-x0)/5;
            }
            seksteig = Math.round(1000*(f(x1)-qy)/(x1-qx))/1000;
            if (Math.abs(qx - x1) >= 0.01 && (wahl == 2))
            {   ctx.strokeStyle = "red";
                Zeichne(qx, qy, x1, f(x1));
                if ((qx-x0) >= 0.01) rsteig.innerHTML = seksteig;
            }
            if (Math.abs(qx - x1) < 0.01 && (wahl == 2))
            {   ctx.strokeStyle = "blue";
                Line(xmin, df(xmin), xmax, df(xmax));
				ctx.font = "16px sans-serif";
                ctx.fillText("Rechtsseitige Ableitung", 40, 20);
                rsteig.innerHTML = -2*(x1-x0)/5;
            }
            ctx.strokeStyle = "gray";
            Line(x1, f(x1), x1, 0);
            ctx.strokeStyle = "black";
			ctx.font = "12px sans-serif";
            ctx.strokeText("x1", map(0, x1), map(1, 0) + 12);
        }

        ctx.strokeStyle = "gray";
        if (wahl == 1)
            Line(px, py, px, 0);
        if (wahl == 2)
            Line(qx, qy, qx, 0);
        if (wahl == 1) {
		   ctx.beginPath();
		   ctx.strokeStyle = "red";
           ctx.arc(map(0, px), map(1, py), 2, 0, 2*Math.PI);
	       ctx.fillStyle="red";
           ctx.fill();
		   ctx.stroke();			 
		  }
        if (wahl == 2) {
		   ctx.beginPath();
		   ctx.strokeStyle = "red";
           ctx.arc(map(0, qx), map(1, qy), 2, 0, 2*Math.PI);
	       ctx.fillStyle="red";
           ctx.fill();
		   ctx.stroke();			 
		  }
        if (mode==0) 
		  { ctx.beginPath();
	        ctx.strokeStyle = "blue";
	        ctx.arc(map(0, x0), map(1, f(x0)), 2, 0, 2*Math.PI);
	        ctx.fillStyle="blue";
            ctx.fill();
			ctx.stroke();
	      }

 if (mode==1) 
		  { ctx.beginPath();
	        ctx.strokeStyle = "blue";
			ctx.arc(map(0, x1), map(1, f(x1)), 2, 0, 2*Math.PI);
	        ctx.fillStyle="blue";
            ctx.fill();
			ctx.stroke();
	      }	  
        ctx.strokeStyle = "black";
		ctx.font = "12px sans-serif";
        if(wahl == 1)
            ctx.strokeText("x", map(0, px)-2, map(1, 0) + 12);
        if(wahl == 2)
            ctx.strokeText("x", map(0, qx)-2, map(1, 0) + 12);		
    ctx.stroke();			
  }

  function dostep(){
	if (mode==0) {
		if (moder==2) {
			if (px<x0) {
				px=px+0.1;
				if (px>x0) px=x0;
				py=f(px);
				zeichne();
			}
		}
		if (moder==3) {
			if (qx>x0) {
				qx=qx-0.1;
				if (qx<x0) qx=x0;
				qy=f(qx);
				zeichne();
			}
		}	
	} 
	if (mode==1) {
		if (moder==2) {
			if (px<x1) {
				px=px+0.1;
				if (px>x1) px=x1;
				py=f(px);
				zeichne();
			}
		}
		if (moder==3) {
			if (qx>x1) {
				qx=qx-0.1;
				if (qx<x1) qx=x1;
				qy=f(qx);
				zeichne();
			}
		}	
	}   
	  
  }

  function Zeichne(x1, y1, x2, y2)
    {   if (Math.abs(x1 - x2) < 0.01)
            Line(x1, ymin, x1, ymax);
        if (Math.abs(x1 - x2) >= 0.01)
        {   var seksteig = (y2 - y1) / (x2 - x1);
            var xs = xmin;
            var ys = seksteig * (xmin - x1) + y1;
            var xe = xmax;
            var ye = seksteig * (xmax - x1) + y1;
            Line(xs, ys, xe, ye);
        }
    }  

  function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }

  function f(x)
    {   s = 0.0;
        if(x < x0)
            s = (x * x) / 5 + 0.5;
        if(x >= x0)
            s = (-(x - x0) * (x - x0)) / 5 + (x0 * x0) / 5 + 0.5;
        return s;
    }

    function df(x)
    {   s = 0.0;
        if(x1 < x0)
            s = f(x1) + ((2 * x1) / 5) * (x - x1);
        if(x1 >= x0)
            s = ((-2 * (x1 - x0)) / 5) * (x - x1) + f(x1);
        return s;
    }

    function ldf(x)
    {   s = 0;
        s = f(x0) + ((2 * x0) / 5) * (x - x0);
        return s;
    }

    function rdf(x)
    {   s = 0;
        s = f(x0);
        return s;
    }	