  // Progamm zu Simulation Kettenlinie auf www.mathematik.ch
  // Februar 2016: Ursprüngliches Applet von R.Grothmann umgeschrieben auf html5 und Javascript 
  // copyright Bernhard Berchtold

    var W,H;
    var x1=-1; var y1=0;
	var x2=0.9; var y2=0.3;
	var k=1;
	var b=0;
	var L=2.5;
	const N=50;
    var red=false;
	var point=0;
	var canvas1;
    var ctx;
	var initmade=false;
	
window.onload=resizeCanvas;	
    
  function resizeCanvas() {
    var canvs = document.getElementById("containercanvas");
    canvs.width = canvs.offsetWidth;
	W=canvs.width;
	H=W;
	if (initmade) {
	  resize1();
	  zeichne();
	} else init();	
  }
  
  function init() {
	initmade=true;
	window.addEventListener('resize', function(event){
      resizeCanvas()
    });
    canvas1=document.getElementById('myCanvas');
  	resize1();
    ctx = canvas1.getContext('2d');
	canvas1.addEventListener('mousedown', function(evt) { 
	  var mousePos = getMousePos(canvas1, evt);
      var c=mousePos.x,r=mousePos.y;
	  if (Math.abs(c-col(x1))<5 && Math.abs(r-row(y1))<5) point=1;
	  if (Math.abs(c-col(x2))<5 && Math.abs(r-row(y2))<5) point=2;
      }, false);
	canvas1.addEventListener('mouseup', function(evt) { 
	  point=0;
      }, false);	  
	canvas1.addEventListener('mousemove', function(evt) {  
     if (point==0) return;
	 var mousePos = getMousePos(canvas1, evt);
	 var c=mousePos.x,r=mousePos.y;
	 if (point==1)
		{ x1=x(c); y1=y(r);
		  if (x1<-1) x1=-1;
		  if (x1>x2-0.2) x1=x2-0.2;
		  if (y1<-1) y1=-1;
		  if (y1>1) y1=1;
		}
		else
		{ x2=x(c); y2=y(r);
		  if (x2>1) x2=1;
		  if (x2<x1+0.2) x2=x1+0.2;
		  if (y2<-1) y2=-1;
		  if (y2>1) y2=1;
		}
	 compute_kette();
	 zeichne();	   
    }, false);
	compute_kette();
	zeichne();
  } 
  
  function resize1() {
	 canvas1.width=W; canvas1.height=H; 
  }

  function compute_kette() {
	if ((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)>L*L-0.5)
	  { red=true; return;}
	red=false;
	var f=(x2-x1)/2;
	var y=(y2-y1)/f;
	var bnew=0,knew=0;
	var n=0;
	while (n<30) {
	  bnew=compute_b(k,b,y);
	  knew=compute_k(k,b,L/f);
	  if (Math.abs(b-bnew)<0.00001 && Math.abs(k-knew)<0.00001) break;
	  b=bnew;
	  k=knew;
	  n++;
	}
	b=(x1+x2)/2+bnew*f;
	k=knew/f;
	}

	function fs(k,b,L) {
	  return (sinh(k*(1-b))-sinh(k*(-1-b)))/k-L;
	}

	function fc(k,b,y) {	
	  return (cosh(k*(1-b))-cosh(k*(-1-b)))/k-y;
	}
	
	function compute_b(k,b,y) {
      var b1=b+1;
	  var r=fc(k,b,y);
	  var r1=fc(k,b1,y);
	  var n=0;
	  while (Math.abs(b1-b)>0.00001 && n<20)
		{ var bnew=b-r*(b1-b)/(r1-r);
		  r1=r; b1=b; b=bnew;
		  r=fc(k,b,y);
		  n++;
		}
	  return b;
	}
	 
	function compute_k(k,b,L) { 
	  var k1=k+1;
	  var r=fs(k,b,L);
	  var r1=fs(k1,b,L);
	  var n=0;
	  while (Math.abs(k1-k)>0.00001 && n<20)
		{ var knew=k-r*(k1-k)/(r1-r);
		  if (knew<0) knew=-knew;
		  r1=r; k1=k; k=knew;
		  r=fs(k,b,L);
		  n++;
		}
	  return k;
	}
	 
	function chain(x,a,b,k) {	
	  return a+cosh(k*(x-b))/k;
	}

	function x(c) {
	  return -1.2+c/W*2.4;
	}
	
	function y(r) {
	  return 1.2-r/H*2.4;
	}

	function col(x) {
	  return Math.round((x+1.2)/2.4*W);
	}
	
	function row(y) {
	  return Math.round((1.2-y)/2.4*H);
	}
	
	function sinh(x) {
	  return (Math.exp(x)-Math.exp(-x))/2;
	}

	function cosh(x) {
	  return (Math.exp(x)+Math.exp(-x))/2;
	}

	function mark(x,y) {
	  ctx.rect(col(x)-5,row(y)-5,10,10);
	  ctx.stroke();
	}

	function Line(x1,y1,x2,y2) {   
	  ctx.beginPath();
	  ctx.moveTo(x1,y1);
      ctx.lineTo(x2,y2);
	  ctx.stroke();
    }

   function zeichne() {
     ctx.beginPath();
     ctx.strokeStyle = "black";	 
	 ctx.clearRect(0,0,W,H);
	 mark(x1,y1); mark(x2,y2);
	 if (red) {
	   ctx.strokeStyle = "red";
	   Line(col(x1),row(y1),col(x2),row(y2));
	 }
	 else {
	   var c1,r1,c2,r2;
	   c1=col(x1); r1=row(y1);
	   var r2end=row(y2);
	   var a=y1-chain(x1,0,b,k);
	   var dx=(x2-x1)/N;
	   for (var i=1;i<=N;i++) {
		 var x=x1+i*dx;
		 var y=chain(x,a,b,k);
		 c2=col(x); r2=row(y); if (y1<y2 && r2<r2end) r2=r2end;
		 Line(c1,r1,c2,r2);
		 c1=c2; r1=r2;	 
	   }
	 }
   }

  function dostep() {
	x1=x1+0.1;
	if (x1>x2-0.2) x1=-1;
	compute_kette();
    zeichne();
  }

  function dostepv() {
	y1=y1+0.1;
	if (y1>1) y1=-1;
	compute_kette();
    zeichne();
  }  
  
  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }