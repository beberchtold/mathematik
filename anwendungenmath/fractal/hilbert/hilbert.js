  // Progamm zu Hilbert- und Peanokurven auf www.mathematik.ch
  // copyright Bernhard Berchtold
  // Ehemaliges php-Programm transferiert nach Javascript und html5 am 2.11.2015

    var n=1;
	var peano=false;
	var generatorX, generatorY;
	var x, y, distance, direction;
	var canvas1;
    var ctx;
	var initmade=false;
	
window.onload=resizeCanvas;
    
  function resizeCanvas() {
    var canvs = document.getElementById("containercanvas");
    canvs.width = canvs.offsetWidth;
	W=canvs.width;
	if (W>400) W=400;
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
	document.getElementById('ordt').disabled=true;
	document.getElementById("Peano").checked=false;
	zeichne();
  }

  function resize1() {
	canvas1.width=W; canvas1.height=H; 
  }
  
  function OnChangeCheckbox (checkbox) {
    peano=checkbox.checked;
	if (peano && n>=5) {n=5; document.getElementById('ordh').disabled=true;}
	if (!peano && n<7) document.getElementById('ordh').disabled=false;
	zeichne();
  }

 function zeichne() {
   if (peano) document.getElementById("Peanotxt").innerHTML="Peano";
     else document.getElementById("Peanotxt").innerHTML="Hilbert";
   document.getElementById("N").innerHTML=""+n;
   ctx.clearRect(0,0,W,H);
   ctx.beginPath();
   if (peano) ctx.strokeStyle = "red";
     else ctx.strokeStyle = "blue"; 
   ctx.lineWidth="1";

   x=1; y=H-2; direction=0;
   if (!peano) {
  	 distance = y / (Math.pow(2,n) - 1);       /* Laenge einer Vorwaertsbewegung */
  	 generatorX =  "LYFRXFXRFYL";          
     generatorY =  "RXFLYFYLFXR";         
   }
   else  {
    distance = y / (Math.pow(3,n) - 1);        
    generatorX = "XFYFXLFLYFXFYRFRXFYFX";   
    generatorY = "YFXFYRFRXFYFXLFLYFXFY";
    ctx.strokeStyle = "red";    
  }             
  interpret ("X",n);
  ctx.stroke();
 }

  function draw (c) {
    if (c == 'L')  direction = direction-90;
    if (c == 'R') { 
    	direction = direction+90;
    }
    if (c == 'F') {
        x2 = x + distance * Math.cos (direction * Math.PI/180);
        y2 = y + distance * Math.sin (direction * Math.PI/180);
		ctx.moveTo(Math.round(x), Math.round(y));
        ctx.lineTo(Math.round(x2), Math.round(y2));
        x = x2; y = y2;
    }
  }	
  
  function interpret(command, level) {  
    for (var i = 0; i < command.length; i++) {
       var c=command.substring(i,i+1);
       if (level == 0) draw(c);
          else  {if (c == 'X')  interpret (generatorX, level-1);
               else {if (c == 'Y')  interpret (generatorY, level-1);
                   else draw(c);
               }
          }
    }
  }

  function ordnungh() {
	document.getElementById('ordt').disabled=false;
	if ((n<5) && (peano)) {n=n+1; if (n==5) document.getElementById('ordh').disabled=true; zeichne();}
	if ((n<7) && (!peano)) {n=n+1; if (n==7) document.getElementById('ordh').disabled=true; zeichne();}
  }

  function ordnungt() {
	if (n==2) document.getElementById('ordt').disabled=true;
	if (n>1) {n=n-1; document.getElementById('ordh').disabled=false; zeichne();}
  }
