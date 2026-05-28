// Programm zur Formel von Cardano auf www.mathematik.ch
// AUTHOR and Copyright: Bernhard Berchtold
// 19. Nov 2015 ersetzt nun php-Programm

  var a,b,c,d;

  function r(x,y)
   {return Math.sqrt(x*x+y*y);}

  function phi(x,y)
   {return Math.atan2(y,x);}

  function realteil(r,phi)
   {return r*Math.cos(phi);}

  function imagteil(r,phi)
   {return r*Math.sin(phi);}

  function realteil_produkt(x1,y1,x2,y2)
   {return x1*x2-y1*y2;}

  function imagteil_produkt(x1,y1,x2,y2)
   {return x1*y2+y1*x2;}

  function ausgabe(v)
   {return Math.round(1E5*v)/1E5;}

  function ausgabe_komplex(x,y) {
	if (y>0) return ""+ausgabe(x)+" + "+ausgabe(y)+"i";
    if (y==0) return ""+ausgabe(x);
    if (y<0) return ""+ausgabe(x)+" - "+ausgabe(-y)+"i";
   }

  function berechne() {
    var ok=chkFormular();
    if (!ok) return;   
    document.getElementById("txt").innerHTML="<p><b>Lösungen von ax<sup>3</sup> + bx<sup>2</sup> + cx + d = 0</b></p>";
    document.getElementById("a").value=a;
    document.getElementById("b").value=b;
    document.getElementById("c").value=c;
    document.getElementById("d").value=d;
    var p=(3*a*c-b*b)/(9*a*a);
    var q=2*b*b*b/(54*a*a*a)-b*c/(6*a*a)+d/(2*a);
    var Diskriminante=p*p*p+q*q;  
    if (Diskriminante>=0) 
       {var wurzelD=Math.sqrt(Diskriminante); var z1=-q+wurzelD; var z2=-q-wurzelD;
        if (z1>=0) u=Math.pow(z1,1/3); else u=-Math.pow(-z1,1/3);
        if (z2>=0) v=Math.pow(z2,1/3); else v=-Math.pow(-z2,1/3);
        var y1=u+v;
        var x_u=u; var y_u=0; var x_v=v; var y_v=0;
       }   
    else 
      {var r_wurzelD=Math.sqrt(-Diskriminante);
       var r_z1=r(-q,r_wurzelD); var phi_z1=phi(-q,r_wurzelD);
       var r_z2=r(-q,-r_wurzelD); var phi_z2=phi(-q,-r_wurzelD);     
       var r_u=Math.pow(r_z1,1/3); var phi_u=phi_z1/3; 
       var r_v=Math.pow(r_z2,1/3); var phi_v=phi_z2/3; 
       var y1=2*r_u*Math.cos(phi_u);
       var x_u=realteil(r_u,phi_u); var y_u=imagteil(r_u,phi_u);
       var x_v=realteil(r_v,phi_v); var y_v=imagteil(r_v,phi_v);      
      }
    var x_f1=-0.5; var y_f1=Math.sqrt(3)/2; var x_f2=-0.5; var y_f2=-Math.sqrt(3)/2;
    var x_y2=realteil_produkt(x_f1,y_f1,x_u,y_u)+realteil_produkt(x_f2,y_f2,x_v,y_v);
    var y_y2=imagteil_produkt(x_f1,y_f1,x_u,y_u)+imagteil_produkt(x_f2,y_f2,x_v,y_v);
    var x_y3=realteil_produkt(x_f1,y_f1,x_v,y_v)+realteil_produkt(x_f2,y_f2,x_u,y_u);
    var y_y3=imagteil_produkt(x_f1,y_f1,x_v,y_v)+imagteil_produkt(x_f2,y_f2,x_u,y_u);
    document.getElementById("txt").innerHTML+="p = "+ausgabe(p)+" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    document.getElementById("txt").innerHTML+="q = "+ausgabe(q)+" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    document.getElementById("txt").innerHTML+="D = "+ausgabe(Diskriminante)+"<br>"; 
    document.getElementById("txt").innerHTML+="z<sub>1</sub> = -q + <math><msqrt><mrow><mi>D</mi></mrow></msqrt></math> = ";
	if (Diskriminante>=0)
      document.getElementById("txt").innerHTML+=""+ausgabe(z1);
    else
      document.getElementById("txt").innerHTML+=ausgabe_komplex(realteil(r_z1,phi_z1),imagteil(r_z1,phi_z1));
    document.getElementById("txt").innerHTML+=", z<sub>2</sub> = -q - <math><msqrt><mrow><mo>D</mo></mrow></msqrt></math> = ";  
    if (Diskriminante>=0) 
	  document.getElementById("txt").innerHTML+=""+ausgabe(z2);
    else 
	  document.getElementById("txt").innerHTML+=ausgabe_komplex(realteil(r_z2,phi_z2),imagteil(r_z2,phi_z2));
	document.getElementById("txt").innerHTML+="<br>u = <math><mroot><mrow><msub><mo>z</mo><mn>1</mn></msub></mrow><mn>3</mn></mroot></math> = "+ausgabe_komplex(x_u,y_u);
    document.getElementById("txt").innerHTML+=", v = <math><mroot><mrow><msub><mo>z</mo><mn>2</mn></msub></mrow><mn>3</mn></mroot></math> = "+ausgabe_komplex(x_v,y_v); 
    document.getElementById("txt").innerHTML+="<br>y<sub>1</sub> = "+ausgabe(y1);
    document.getElementById("txt").innerHTML+=", y<sub>2</sub> = "+ausgabe_komplex(x_y2,y_y2);
    document.getElementById("txt").innerHTML+=", y<sub>3</sub> = "+ausgabe_komplex(x_y3,y_y3); 
    var versch=b/(3*a);
    var x1=y1-versch;
    var x_x2=x_y2-versch; var x_x3=x_y3-versch; 
    document.getElementById("txt").innerHTML+="<br><br><b>x<sub>1</sub> = "+ausgabe(x1)+"</b><br>";
    document.getElementById("txt").innerHTML+="<b>x<sub>2</sub> = "+ausgabe_komplex(x_x2,y_y2)+"</b><br>";
    document.getElementById("txt").innerHTML+="<b>x<sub>3</sub> = "+ausgabe_komplex(x_x3,y_y3)+"</b>";
 }

 function chkFormular()
 {
  if (document.getElementById("a").value == '') 
    {alert ("Wert für a eingeben!");
    return false;}
  a = parseFloat(document.getElementById("a").value); 
  if (a==0)
    {alert ("a darf nicht 0 sein");
    document.getElementById("a").value = ''; 
    return false;}    
  if (document.getElementById("b").value == '') 
    {alert ("Wert für b eingeben!");
    return false;}
  b = parseFloat(document.getElementById("b").value);  
  if (document.getElementById("c").value == '') 
    {alert ("Wert für c eingeben!");
    return false;}
  c = parseFloat(document.getElementById("c").value);    
  if (document.getElementById("d").value == '') 
    {alert ("Wert für d eingeben!");
    return false;}
  d = parseFloat(document.getElementById("d").value); 
  return true;	  
 }