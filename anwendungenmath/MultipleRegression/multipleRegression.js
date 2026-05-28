// Gegeben sind n Punkte.
// Das Programm berechnet die Koeffizienten a, b und d in der Gleichung  der 
// Regressionsebene: z = a*x + b*y + d  auf zwei Arten:
// 1. Die Summe der Quadrate der z-Differenzen wird minimal
// 2. Die Summe der Quadrate der Abstände der Punkte wird minimal (mittels HNF) 
// 21.12.2003
// 19.3.2019 Migration von php nach javascript
// Autor: Bernhard Berchtold, www.mathematik.ch


function mittelwert(anz,u)
{
  var summe=0;
  for (var i = 1; i <= anz; i++)
    summe+=u[i];
  return (summe/anz);
}


function summe_produkte(anz,u,v)
{
  var summe=0;
  for (var i = 1; i <= anz; i++)
    summe+=u[i]*v[i];
  return summe;
}


function abweich(anz,u,uquer)
{  var abweichung=[];
   for (var i = 1; i <= anz; i++)
     abweichung[i]=u[i]-uquer;
   return abweichung;
}
 
function summe_residuen(anz,u,v,w,a,b,d)
{
   var summe=0;
   for (var i = 1; i <= anz; i++)
   {var hilf=w[i]-a*u[i]-b*v[i]-d;
    summe=summe+hilf*hilf;
   }
   return summe;
}

function summe_abstaende_qua(anz,u,v,w,a,b,c,d)
{
   var summe=0;
   for (var i = 1; i <= anz; i++)
   {var hilf=a*u[i]+b*v[i]+c*w[i]+d;
    summe=summe+hilf*hilf;
   }
   return summe;
}

function f(a,b,c,k1,k2,k3,k4,k5) 
{return (a*a*k1+a*b*(k2-k4)+a*c*k3-b*b*k1-b*c*k5);
 }

function g(a,b,c,k1,k3,k4,k5,k6)
{return (a*a*k5+a*b*k3+a*c*(k6-k4)-c*c*k5-b*c*k1);
 }

function h(a,b,c)
 { return (a*a+b*b+c*c-1);
 }

function ausgabe(v)
{ return Math.round(1E7*v)/1E7;}


function J11(a,b,c,k1,k2,k3,k4)    // Jacobi-Matrix Element J1,1
{ return 2*a*k1+(k2-k4)*b+k3*c; }

function J12(a,b,c,k1,k2,k4,k5)    // Jacobi-Matrix Element J1,2
{ return a*(k2-k4)-2*k1*b-k5*c; }

function J13(a,b,k3,k5)    // Jacobi-Matrix Element J1,3
{ return a*k3-k5*b; }

function J21(a,b,c,k3,k4,k5,k6)    // Jacobi-Matrix Element J2,1
{ return 2*a*k5+(k6-k4)*c+k3*b; }

function J22(a,c,k1,k3)    // Jacobi-Matrix Element J2,2
{ return a*k3-k1*c; }

function J23(a,b,c,k1,k4,k5,k6)    // Jacobi-Matrix Element J2,3
{ return a*(k6-k4)-2*k5*c-k1*b; }

function J31(a)    // Jacobi-Matrix Element J3,1
{ return 2*a; }

function J32(b)    // Jacobi-Matrix Element J3,2
{ return 2*b; }

function J33(c)    // Jacobi-Matrix Element J3,3
{ return 2*c; }


function detJ(J)
{
 return J[1][1]*(J[2][2]*J[3][3]-J[2][3]*J[3][2])-J[2][1]*(J[1][2]*J[3][3]-J[1][3]*J[3][2])+
    J[3][1]*(J[1][2]*J[2][3]-J[1][3]*J[2][2]);
}


function rechne()  { 
  var x=[]; var y=[]; var z=[];
  x[1]=parseFloat(document.getElementById("x1").value);
  y[1]=parseFloat(document.getElementById("y1").value);
  z[1]=parseFloat(document.getElementById("z1").value);
  var n=1;
  while ( !isNaN(x[n]) && !isNaN(y[n]) && !isNaN(z[n]) ) {
	n++;
	var hilfx="x"+n.toString(); var hilfy="y"+n.toString(); var hilfz="z"+n.toString();
	x[n]=parseFloat(document.getElementById(hilfx).value);
    y[n]=parseFloat(document.getElementById(hilfy).value);
    z[n]=parseFloat(document.getElementById(hilfz).value);  
  }	  
  n=n-1;
  document.getElementById("N").innerHTML=n;
  document.getElementById("Ebgl").innerHTML="";
  document.getElementById("Ebgl2").innerHTML="";
  document.getElementById("Warnung").innerHTML="";
  document.getElementById("xquer").innerHTML="";
  document.getElementById("yquer").innerHTML="";
  document.getElementById("zquer").innerHTML="";
  document.getElementById("sumqua").innerHTML="";
  document.getElementById("sumqua2").innerHTML="";
  document.getElementById("sumquaz").innerHTML="";
  document.getElementById("sumquaz2").innerHTML="";
  document.getElementById("r2").innerHTML="";
  
  if (n>2) {
   var xquer=mittelwert(n,x);
   var yquer=mittelwert(n,y);
   var zquer=mittelwert(n,z);
   document.getElementById("xquer").innerHTML=ausgabe(xquer);
   document.getElementById("yquer").innerHTML=ausgabe(yquer);
   document.getElementById("zquer").innerHTML=ausgabe(zquer);
   var xabw=abweich(n,x,xquer);
   var yabw=abweich(n,y,yquer);
   var zabw=abweich(n,z,zquer);   
   var xxabw=summe_produkte(n,xabw,xabw);
   var xyabw=summe_produkte(n,xabw,yabw);
   var xzabw=summe_produkte(n,xabw,zabw);
   var yyabw=summe_produkte(n,yabw,yabw);
   var yzabw=summe_produkte(n,yabw,zabw);   
   var zzabw=summe_produkte(n,zabw,zabw);
   var Nenner=xxabw*yyabw-(xyabw)*(xyabw);
   if (Nenner!=0)
     {var a=(xzabw*yyabw - yzabw*xyabw)/Nenner;
      var b=(yzabw*xxabw - xzabw*xyabw)/Nenner;
     }
   else 
     {if (xxabw==0) {var a=100000; var b=0;}
      if (yyabw==0) {var a=0; var b=100000;}
     }
   var d=zquer - a*xquer - b*yquer;
   
   var residuensumme=summe_residuen(n,x,y,z,a,b,d);
   if (zzabw!=0) var rquadrat=1 - (residuensumme/zzabw);
     else var rquadrat=1;

   // für Abstandminimalisierung gemäss HNF -> eine Ebene!
   var xx=summe_produkte(n,x,x);
   var xy=summe_produkte(n,x,y);
   var xz=summe_produkte(n,x,z);
   var yy=summe_produkte(n,y,y);
   var yz=summe_produkte(n,y,z);   
   var zz=summe_produkte(n,z,z);
   var k1=xy-n*xquer*yquer;
   var k2=yy-n*yquer*yquer;
   var k3=yz-n*yquer*zquer;
   var k4=xx-n*xquer*xquer;        
   var k5=xz-n*xquer*zquer;
   var k6=zz-n*zquer*zquer;
  }

  if (n>2) {
	if (xxabw==0) document.getElementById("Ebgl").innerHTML="E: x = "+x[1];
    if (yyabw==0) document.getElementById("Ebgl").innerHTML="E: y = "+y[1];
    if (zzabw==0) document.getElementById("Ebgl").innerHTML="E: z = "+z[1];   
	if (xxabw*yyabw*zzabw !=0)
     { 
       document.getElementById("Ebgl").innerHTML="E: z = a*x + b*y + d<br>a = "+ausgabe(a)+",  b = "+ausgabe(b)+",  d = "+ausgabe(d);
       document.getElementById("sumquaz").innerHTML=ausgabe(residuensumme);
       document.getElementById("r2").innerHTML=ausgabe(rquadrat);
       var norm=Math.sqrt(a*a+b*b+1);
       a=a/norm; b=b/norm; c=-1/norm; d=d/norm;  
       var sum_abstaende1=summe_abstaende_qua(n,x,y,z,a,b,c,d);
	   document.getElementById("sumqua").innerHTML=ausgabe(sum_abstaende1);     
     } 
  }
  else document.getElementById("Ebgl").innerHTML="Für die Minimalisierung der Quadrate der z-Differenzen müssen Sie mindestens drei Punkte eingeben!";
  
if (n>4) {
 if (xxabw*yyabw*zzabw !=0) {
	var ahilf=-1;  var gefunden=false;
    for (var i = 1; i<50; i++)
    {
      ahilf=ahilf+0.04; var bhilf=-1;
      for (var j=1; j<50; j++) 
      {
      	bhilf=bhilf+0.04;
        if ((1 - ahilf*ahilf - bhilf*bhilf)>0) 
          { var chilf=Math.sqrt(1 - ahilf*ahilf - bhilf*bhilf);
            if (!gefunden)
               	{a=ahilf; b=bhilf; var c=chilf; gefunden=true;}
                else {d=-a*xquer-b*yquer-c*zquer;
                      var dhilf=-ahilf*xquer-bhilf*yquer-chilf*zquer;
                      var sum_abstaende=summe_abstaende_qua(n,x,y,z,a,b,c,d);
                      var sum_abstaendehilf=summe_abstaende_qua(n,x,y,z,ahilf,bhilf,chilf,dhilf);
                      if (sum_abstaendehilf<sum_abstaende) {a=ahilf; b=bhilf; c=chilf;}
                     }	
            chilf=-chilf;
            d=-a*xquer-b*yquer-c*zquer;
            var dhilf=-ahilf*xquer-bhilf*yquer-chilf*zquer;
            sum_abstaende=summe_abstaende_qua(n,x,y,z,a,b,c,d);
            sum_abstaendehilf=summe_abstaende_qua(n,x,y,z,ahilf,bhilf,chilf,dhilf);
            if (sum_abstaendehilf<sum_abstaende) {a=ahilf; b=bhilf; c=chilf;}	         
         }
       }    
    }

    var aalt=100; var balt=100; var calt=100; var iterat=1;
	var J = []; J[1]=[]; J[2]=[]; J[3]=[];
    while ( ((Math.abs(a-aalt)>0.0000001) || (Math.abs(b-balt)>0.0000001) || (Math.abs(c-calt)>0.0000001)) && (iterat<100) )
     {aalt=a; balt=b; calt=c;
      J[1][1]=J11(a,b,c,k1,k2,k3,k4); J[1][2]=J12(a,b,c,k1,k2,k4,k5); J[1][3]=J13(a,b,k3,k5);
      J[2][1]=J21(a,b,c,k3,k4,k5,k6); J[2][2]=J22(a,c,k1,k3); J[2][3]=J23(a,b,c,k1,k4,k5,k6);
      J[3][1]=J31(a); J[3][2]=J32(b); J[3][3]=J33(c);          

      var determinanteJ=detJ(J);

      // Inverse der Jacobi-Matrix  (Elemente noch nicht durch detJ dividiert    
      var D11=J[2][2]*J[3][3]-J[2][3]*J[3][2]; var D12=-J[1][2]*J[3][3]+J[1][3]*J[3][2]; var D13=J[1][2]*J[2][3]-J[1][3]*J[2][2];
      var D21=-J[2][1]*J[3][3]+J[2][3]*J[3][1]; var D22=J[1][1]*J[3][3]-J[1][3]*J[3][1]; var D23=-J[1][1]*J[2][3]+J[1][3]*J[2][1];
      var D31=J[2][1]*J[3][2]-J[2][2]*J[3][1]; var D32=-J[1][1]*J[3][2]+J[1][2]*J[3][1]; var D33=J[1][1]*J[2][2]-J[1][2]*J[2][1];
      var aneu=a-1/determinanteJ*(D11*f(a,b,c,k1,k2,k3,k4,k5)+D12*g(a,b,c,k1,k3,k4,k5,k6)+D13*h(a,b,c));
      var bneu=b-1/determinanteJ*(D21*f(a,b,c,k1,k2,k3,k4,k5)+D22*g(a,b,c,k1,k3,k4,k5,k6)+D23*h(a,b,c));
      var cneu=c-1/determinanteJ*(D31*f(a,b,c,k1,k2,k3,k4,k5)+D32*g(a,b,c,k1,k3,k4,k5,k6)+D33*h(a,b,c));
      a=aneu; b=bneu; c=cneu;
      iterat++;
     }
   //  echo "Iterationen = ".iterat."<br>\n";
   d=-a*xquer-b*yquer-c*zquer;

   sum_abstaende=summe_abstaende_qua(n,x,y,z,a,b,c,d);
   var faktor=-1/c;
   a=a*faktor;  b=b*faktor; d=d*faktor;
   document.getElementById("Ebgl2").innerHTML="E: z = a*x + b*y + d<br>a = "+ausgabe(a)+",  b = "+ausgabe(b)+",  d = "+ausgabe(d);   
   document.getElementById("sumqua2").innerHTML=ausgabe(sum_abstaende);
   if (sum_abstaende1 - sum_abstaende < -1E-8) document.getElementById("Warnung").innerHTML="Warnung! Koeffizienten gemäss Variante 2 wahrscheinlich falsch!<br><br>";
   residuensumme=summe_residuen(n,x,y,z,a,b,d);
   document.getElementById("sumquaz2").innerHTML=ausgabe(residuensumme);  
  }
 }
  else document.getElementById("Ebgl2").innerHTML="Für die Minimalisierung der Quadrate der Abstände der Punkte müssen Sie mindestens fünf Punkte eingeben!";

}
