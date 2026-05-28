function makeArray() {
     for (i = 0; i<makeArray.arguments.length; i++)
         this[i] = makeArray.arguments[i];
 }

// NUMERIC FORMATTING

function Fixed(s,wid,dec) {
   // many combinations of possibilities
   // maybe prepare for upcoming truncate
   var z = 1
   if (dec > 0) {
      z /= Math.pow( 10, dec );
      if (s < -z)  s -= 0.5 * z;
      else
         if (s > z)  s += 0.5 * z;
         else
            s = 0;
      }

   // assure a string
   s = "" + s;

   // chop neg, if any
   var neg = 0;
   if (s.charAt(0) == "-") {
      neg = 2;
      s = s.substring( 1, s.length );
      }

   // chop exponent, if any
   var exp = "";
   var e = s.lastIndexOf( "E" );
   if (e < 0)  e = s.lastIndexOf( "e" );
   if (e > -1) {
      exp = s.substring( e, s.length );
      s = s.substring( 0, e );
      }

   // if dec > 0 assure "."; dp == index of "."
   var dp = s.indexOf( ".", 0 );
   if (dp == -1) {
      dp = s.length;
      if (dec > 0) {
         s += ".";
         dp = s.length - 1;
         }
      }

   // assure leading digit
   if (dp == 0) {
      s = '0' + s;
      dp = 1;
      }

   // not enough dec pl?  add 0's
   while ((dec > 0) && ((s.length - dp - 1) < dec))
      s += "0";

   // too many dec pl?  take a substring
   var places = s.length - dp - 1;
   if (places > dec) {
      if (dec == 0) {
         s = s.substring( 0, dp );
         }
      else {
         s = s.substring( 0, dp + dec + 1 );
         }
      }

   // recover exponent, if any
   s += exp;

   // recover neg, if any
   if (neg > 0)
      s = "-" + s;

   // if not enough width, add spaces IN FRONT
   //    too many places?  tough!
   while (s.length < wid)
      s = " " + s;

   return s
}

function Prb(x) {
   if (x < 0)  x = 0;
   else
      if (x > 1)  x = 1;
   return x;
}

function PosV(x) {
   if (x < 0)  x = -x;
   return x;
}

function makeArray() {
     for (i = 0; i<makeArray.arguments.length; i++)
         this[i] = makeArray.arguments[i];
}

function myBubbleSort(arrayName,length) {
    for (var i=0; i<(length-1); i++)
        for (var j=i+1; j<length; j++)
            if (Math.abs(arrayName[j]) < Math.abs(arrayName[i])) {
                 var dummy = arrayName[i];
                 arrayName[i] = arrayName[j];
                 arrayName[j] = dummy;
            }
}

function makeArray() {
    for (i = 0; i<makeArray.arguments.length; i++)
        this[i] = makeArray.arguments[i];
 }

var data =new makeArray(' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ');
var data2 =new makeArray(' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ');
var data1 =new makeArray(' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ');
var data3 =new makeArray(' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ');
var data4 =new makeArray(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var data5 =new makeArray(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

var OldArray = new makeArray(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30);
var rankArray = new makeArray(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30);
var rankArray1 = new makeArray(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30);
var rankArray2 = new makeArray(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30);

var sum1=0;
var sum2=0;

var arr = new makeArray(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var data2 =new makeArray(' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ');
var data1 =new makeArray(' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ');
var data3 =new makeArray(' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ');
var data4 =new makeArray(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var data5 =new makeArray(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

function uttest(data1,data2,data4,data5) {
  for (var i=0;i<10;i++) {
	data4[i]=parseFloat(document.getElementById("el"+i).value);
    data5[i]=parseFloat(document.getElementById("el"+(i+10)).value);
  }
  for (var i=10;i<20;i++) {
	data4[i]=parseFloat(document.getElementById("el"+(i+10)).value);
    data5[i]=parseFloat(document.getElementById("el"+(i+20)).value);
  }  
  for (var i=20;i<30;i++) {
	data4[i]=parseFloat(document.getElementById("el"+(i+20)).value);
    data5[i]=parseFloat(document.getElementById("el"+(i+30)).value);
  }

 var length = 30;
 var length11 = 30;
 var length12 = 30;
 var length2 = 30;
 var length31 = 0;
 var length32 = 0;
 var i2 = 0;
 var i1 = 0;
 
for (var j=0; j<length; j++) {
  if (data4[j] == '' || data4[j] == ' ' || isNaN(data4[j])) {
        data4[j]='';
        length11=length11-1;	
	}
}
for (var j=0; j<length; j++) {
  if (data5[j] == '' || data5[j] == ' ' || isNaN(data5[j])) {
    data5[j]='';
    length12=length12-1;
  }
}
for (var j=0; j<length; j++) {
  if (data4[j] != '' && data5[j] != '') {
        data1[i1]=data4[j];
        data2[i1]=data5[j];
        i1++;
        length31++;
	}
}
for (var j=length31; j<length; j++) data1[j]=' ';
for (var j=length31; j<length; j++) data2[j]=' ';

document.getElementById("n").innerHTML=length31;

for (var i=0;i<10;i++) {
	document.getElementById("el"+i).value=data1[i];
    document.getElementById("el"+(i+10)).value=data2[i];
  }
for (var i=10;i<20;i++) {
	document.getElementById("el"+(i+10)).value=data1[i];
    document.getElementById("el"+(i+20)).value=data2[i];
  }
for (var i=20;i<30;i++) {
	document.getElementById("el"+(i+20)).value=data1[i];
    document.getElementById("el"+(i+30)).value=data2[i];
  }

var x1=0;
var x2=0;
var xq1=0;
var xq2=0;
var xyq=0;
var mw1;
var mw2;
var md;
var s1;
var s2;
var sd;
var sxx;
var syy;
var sxy;
var a0;
var a1;
var b0;
var b1;
var r;

for (var j=0; j<length31; j++) {
	x1 += data1[j]*1.0;
	xq1 += data1[j]*data1[j];
    xyq += data1[j]*data2[j];
	x2 += data2[j]*1.0;
	xq2 += data2[j]*data2[j];
  }

sxx = xq1 -x1*x1/length31;
syy = xq2 -x2*x2/length31;
sxy = xyq - x1*x2/length31;
mw1 = x1/length31;
mw2 = x2/length31;

s1 = (xq1 - length31*mw1*mw1)/(length31-1);
s2 = (xq2 - length31*mw2*mw2)/(length31-1);
a1 = sxy/syy;
b1 = sxy/sxx;
a0 = mw1 - a1*mw2;
b0 = mw2 - b1*mw1;
r =sxy/Math.sqrt(sxx*syy);

document.getElementById("mw1").innerHTML=Fixed(mw1,10,4);
document.getElementById("mw2").innerHTML=Fixed(mw2,10,4);
document.getElementById("s1").innerHTML=Fixed(Math.sqrt(s1),10,4);
document.getElementById("s2").innerHTML=Fixed(Math.sqrt(s2),10,4);
document.getElementById("a0").innerHTML=Fixed(a0,10,4);
document.getElementById("a1").innerHTML=Fixed(a1,10,4);
document.getElementById("b0").innerHTML=Fixed(b0,10,4);
document.getElementById("b1").innerHTML=Fixed(b1,10,4);
document.getElementById("r").innerHTML=Fixed(r,10,6);

for (var j=10; j<length2; j++) {
    data1[j]=' ';
    data2[j]=' ';
   }
}