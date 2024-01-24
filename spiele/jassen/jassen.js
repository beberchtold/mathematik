// Programm zur Simulation jassen auf www.mathematik.ch
// AUTHOR and Copyright: Bernhard Berchtold
// 25.11.2015, ersetzt php-Programm vom November 2008

var n;
var zahl=new Array();
var a=new Array();

  function ziehung()
  { var R=new Array();
    R[1]= Math.floor(36*Math.random())+1;
    var anzahl=2;
    while (anzahl<10) {
      var gleich=false;
      R[anzahl]= Math.floor(36*Math.random())+1;
      for (var i=1;i<anzahl;i++)
        if (R[anzahl]==R[i]) {gleich=true; break;}
        if (!gleich) anzahl++;
    }     
    return R;
    }

  function pruefe(R)
  {  var b=new Array();  
     a[2]=0;    // a[2] = Anzahl vier Gleiche
     b[1]=[4,13,22,31]; 
     b[2]=[5,14,23,32];                 
     b[3]=[6,15,24,33];  
     b[4]=[7,16,25,34];
     b[5]=[8,17,26,35];  
     b[6]=[9,18,27,36];       
     for (var j=1;j<7;j++) {
       var hilf=array_diff(b[j],R);
       if (count(hilf)==0) a[2]++;  
     }
     
     a[9]=0;    // a[9] = Anzahl Neunblätter
     b[1]=[1,2,3,4,5,6,7,8,9]; 
     b[2]=[10,11,12,13,14,15,16,17,18];                 
     b[3]=[19,20,21,22,23,24,25,26,27];  
     b[4]=[28,29,30,31,32,33,34,35,36];  
     for (j=1;j<5;j++) {
       hilf=array_diff(b[j],R);
       if (count(hilf)==0) {a[9]++; R=array_diff(R,b[j]); j=5;} 
     }

     a[8]=0;    // a8 = Anzahl Achtblätter
     if (a[9]==0)
     {    
       b[1]=[1,2,3,4,5,6,7,8]; b[2]=[2,3,4,5,6,7,8,9]; 
       b[3]=[10,11,12,13,14,15,16,17]; b[4]=[11,12,13,14,15,16,17,18];                 
       b[5]=[19,20,21,22,23,24,25,26]; b[6]=[20,21,22,23,24,25,26,27];  
       b[7]=[28,29,30,31,32,33,34,35]; b[8]=[29,30,31,32,33,34,35,36];  
       for ( j=1; j<9; j++) {
         hilf=array_diff(b[j],R);
         if (count(hilf)==0) {a[8]++; R=array_diff(R,b[j]); j=9;} 
       }
     }

     a[7]=0;    // a7 = Anzahl Siebenblätter
     if (a[9] + a[8] == 0)
     {    
       b[1]=[1,2,3,4,5,6,7]; b[2]=[2,3,4,5,6,7,8]; b[3]=[3,4,5,6,7,8,9]; 
       b[4]=[10,11,12,13,14,15,16]; b[5]=[11,12,13,14,15,16,17]; b[6]=[12,13,14,15,16,17,18];                 
       b[7]=[19,20,21,22,23,24,25]; b[8]=[20,21,22,23,24,25,26]; b[9]=[21,22,23,24,25,26,27];  
       b[10]=[28,29,30,31,32,33,34]; b[11]=[29,30,31,32,33,34,35]; b[12]=[30,31,32,33,34,35,36];  
       for ( j=1; j<13; j++) {
         hilf=array_diff(b[j],R);
         if (count(hilf)==0) {a[7]++; R=array_diff(R,b[j]); j=13;} 
       }
     }
   
     a[6]=0;    // a6 = Anzahl Sechsblätter
     if (a[9] + a[8] + a[7] == 0)
     {
       b[1]=[1,2,3,4,5,6]; b[2]=[2,3,4,5,6,7]; b[3]=[3,4,5,6,7,8]; b[4]=[4,5,6,7,8,9]; 
       b[5]=[10,11,12,13,14,15]; b[6]=[11,12,13,14,15,16]; b[7]=[12,13,14,15,16,17]; b[8]=[13,14,15,16,17,18];                 
       b[9]=[19,20,21,22,23,24]; b[10]=[20,21,22,23,24,25]; b[11]=[21,22,23,24,25,26]; b[12]=[22,23,24,25,26,27];  
       b[13]=[28,29,30,31,32,33]; b[14]=[29,30,31,32,33,34]; b[15]=[30,31,32,33,34,35]; b[16]=[31,32,33,34,35,36];  
       for ( j=1; j<17; j++) {
         hilf=array_diff(b[j],R);
         if (count(hilf)==0) {a[6]++; R=array_diff(R,b[j]); j=17;} 
       }
     }
   
     a[5]=0;    // a5 = Anzahl Fünflätter
     if (a[9] + a[8] + a[7] + a[6] == 0)
     {
       b[1]=[1,2,3,4,5]; b[2]=[2,3,4,5,6]; b[3]=[3,4,5,6,7]; b[4]=[4,5,6,7,8]; b[5]=[5,6,7,8,9];
       b[6]=[10,11,12,13,14]; b[7]=[11,12,13,14,15]; b[8]=[12,13,14,15,16]; b[9]=[13,14,15,16,17]; b[10]=[14,15,16,17,18];                 
       b[11]=[19,20,21,22,23]; b[12]=[20,21,22,23,24]; b[13]=[21,22,23,24,25]; b[14]=[22,23,24,25,26]; b[15]=[23,24,25,26,27];  
       b[16]=[28,29,30,31,32]; b[17]=[29,30,31,32,33]; b[18]=[30,31,32,33,34]; b[19]=[31,32,33,34,35]; b[20]=[32,33,34,35,36];  
       for ( j=1; j<21; j++) {
         hilf=array_diff(b[j],R);
         if (count(hilf)==0) {a[5]++; R=array_diff(R,b[j]); j=21;} 
       }
     }


      a[4]=0;    // a4 = Anzahl Vierblätter
      if (a[9] + a[8] + a[7] + a[6]==0)
      {
        b[1]=[1,2,3,4]; b[2]=[2,3,4,5]; b[3]=[3,4,5,6]; b[4]=[4,5,6,7]; b[5]=[5,6,7,8]; b[6]=[6,7,8,9];
        b[7]=[10,11,12,13]; b[8]=[11,12,13,14]; b[9]=[12,13,14,15]; b[10]=[13,14,15,16]; b[11]=[14,15,16,17]; b[12]=[15,16,17,18];                 
        b[13]=[19,20,21,22]; b[14]=[20,21,22,23]; b[15]=[21,22,23,24]; b[16]=[22,23,24,25]; b[17]=[23,24,25,26]; b[18]=[24,25,26,27]; 
        b[19]=[28,29,30,31]; b[20]=[29,30,31,32]; b[21]=[30,31,32,33]; b[22]=[31,32,33,34]; b[23]=[32,33,34,35]; b[24]=[33,34,35,36]; 
        for ( j=1; j<25; j++) {
          hilf=array_diff(b[j],R);
          if (count(hilf)==0) {a[4]++; R=array_diff(R,b[j]);}
        }
      }

     a[3]=0;    // a = Anzahl Dreiblätter
      if (a[9] + a[8] + a[7] == 0)
      {
        b[1]=[1,2,3]; b[2]=[2,3,4]; b[3]=[3,4,5]; b[4]=[4,5,6]; b[5]=[5,6,7]; b[6]=[6,7,8]; b[7]=[7,8,9];
        b[8]=[10,11,12]; b[9]=[11,12,13]; b[10]=[12,13,14]; b[11]=[13,14,15]; b[12]=[14,15,16]; b[13]=[15,16,17]; b[14]=[16,17,18];                 
        b[15]=[19,20,21]; b[16]=[20,21,22]; b[17]=[21,22,23]; b[18]=[22,23,24]; b[19]=[23,24,25]; b[20]=[24,25,26]; b[21]=[25,26,27]; 
        b[22]=[28,29,30]; b[23]=[29,30,31]; b[24]=[30,31,32]; b[25]=[31,32,33]; b[26]=[32,33,34]; b[27]=[33,34,35]; b[28]=[34,35,36];
        for ( j=1; j<29; j++) {
          hilf=array_diff(b[j],R);
          if (count(hilf)==0)  a[3]++;  
        }
      }
  }	

 function spiele()
 {
   document.getElementById("txt").innerHTML="<p><b>Resultate der Simulation Jassen</b></p>";
   n=parseInt(document.getElementById("n").value);
   if (isNaN(n) || n<1) n=1; if (n>600) n=600;    
   document.getElementById("n").value=n;
   if (n==1) {
	 zahl=ziehung();
	 var R = zahl;
     pruefe(R);
     zahl=sort(zahl);    // zahl jetzt von 0 bis 8 indiziert
     for (var j=0;j<9;j++) 
      { document.getElementById("txt").innerHTML+="<img src=\"img/"+zahl[j]+".gif\" width=52 height=80>"+"&nbsp;";  
      }
     document.getElementById("txt").innerHTML+="<br><br>";
	 if (a[9]+a[8]+a[7]+a[6]+a[5]+a[4]+a[3]+a[2] == 0)
       document.getElementById("txt").innerHTML+="Sie haben leider kein Weis<br>";
     if (a[9]>0) document.getElementById("txt").innerHTML+="<b>Sie haben 1 Neunblatt</b><br>";
     if (a[8]>0) document.getElementById("txt").innerHTML+="<b>Sie haben 1 Achtblatt</b><br>";
     if (a[7]>0) document.getElementById("txt").innerHTML+="<b>Sie haben 1 Siebenblatt</b><br>";
     if (a[6]>0) document.getElementById("txt").innerHTML+="<b>Sie haben 1 Sechsblatt</b><br>";
     if (a[5]>0) document.getElementById("txt").innerHTML+="<b>Sie haben 1 Fünfblatt</b><br>";
     if (a[2]>0) document.getElementById("txt").innerHTML+="<b>Sie haben "+a[2]+"-mal 4 gleiche</b><br>";
     if (a[4]==2) document.getElementById("txt").innerHTML+="<b>Sie haben 2 Vierblätter</b><br>";
     if (a[4]==1) document.getElementById("txt").innerHTML+="<b>Sie haben 1 Vierblatt</b><br>";
     if (a[3]>1) document.getElementById("txt").innerHTML+="Sie haben "+a[3]+" Dreiblätter<br>";
     if (a[3]==1) document.getElementById("txt").innerHTML+="Sie haben 1 Dreiblatt<br>"; 
  }	  
  if (n>1) {
	a2tot=0; a3tot=0; a4tot=0; a5tot=0; a6tot=0; a7tot=0; a8tot=0; a9tot=0;  
    for (var i=1;i<n+1;i++)
    {// Ziehung von 9 Karten aus 36
     zahl=ziehung();  R = zahl;
     pruefe(R);
     a2tot=a2tot+a[2]; a3tot=a3tot+a[3]; a4tot=a4tot+a[4]; a5tot=a5tot+a[5]; 
     a6tot=a6tot+a[6]; a7tot=a7tot+a[7]; a8tot=a8tot+a[8]; a9tot=a9tot+a[9]; 
      if (a[9]>0) document.getElementById("txt").innerHTML+="<b>Im Spiel "+i+" hatten Sie 1 Neunblatt</b><br>";
      if (a[8]>0) document.getElementById("txt").innerHTML+="<b>Im Spiel "+i+" hatten Sie 1 Achtblatt</b><br>";
      if (a[7]>0) document.getElementById("txt").innerHTML+="<b>Im Spiel "+i+" hatten Sie 1 Siebenblatt</b><br>";
      if (a[6]>0) document.getElementById("txt").innerHTML+="<b>Im Spiel "+i+" hatten Sie 1 Sechsblatt</b><br>";
      if (a[5]>0) document.getElementById("txt").innerHTML+="<b>Im Spiel "+i+" hatten Sie 1 Fünfblatt</b><br>";
      if (a[2]>0) document.getElementById("txt").innerHTML+="<b>Im Spiel "+i+" hatten Sie "+a[2]+"-mal 4 gleiche</b><br>";
      if (a[4]==2) document.getElementById("txt").innerHTML+="<b>Im Spiel "+i+" hatten Sie 2 Vierblätter</b><br>";
      if (a[4]==1) document.getElementById("txt").innerHTML+="<b>Im Spiel "+i+" hatten Sie 1 Vierblatt</b><br>";
      if (a[3]>1) document.getElementById("txt").innerHTML+="Im Spiel "+i+" hatten Sie "+a[3]+" Dreiblätter<br>";
      if (a[3]==1) document.getElementById("txt").innerHTML+="Im Spiel "+i+" hatten Sie 1 Dreiblatt<br>";                    
   } 	  
  }
  if (n>99) {
  	a9proz=Math.round(a9tot*10000/n)/100; a8proz=Math.round(a8tot*10000/n)/100; a7proz=Math.round(a7tot*10000/n)/100; 
	a6proz=Math.round(a6tot*10000/n)/100; a5proz=Math.round(a5tot*10000/n)/100; a4proz=Math.round(a4tot*10000/n)/100;
	a3proz=Math.round(a3tot*10000/n)/100; a2proz=Math.round(a2tot*10000/n)/100;
    document.getElementById("txt").innerHTML+="<br><b>Sie hatten insgesamt "+a9tot+" Neunblätter = "+a9proz+" Prozent</b><br>";
  	document.getElementById("txt").innerHTML+="<b>Sie hatten insgesamt "+a8tot+" Achtblätter = "+a8proz+" Prozent</b><br>";
  	document.getElementById("txt").innerHTML+="<b>Sie hatten insgesamt "+a7tot+" Siebenblätter = "+a7proz+" Prozent</b><br>";
  	document.getElementById("txt").innerHTML+="<b>Sie hatten insgesamt "+a6tot+" Sechsblätter = "+a6proz+" Prozent</b><br>";
  	document.getElementById("txt").innerHTML+="<b>Sie hatten insgesamt "+a5tot+" Fünfblätter = "+a5proz+" Prozent</b><br>";
  	document.getElementById("txt").innerHTML+="<b>Sie hatten insgesamt "+a2tot+"-mal vier gleiche = "+a2proz+" Prozent</b><br>";
  	document.getElementById("txt").innerHTML+="<b>Sie hatten insgesamt "+a4tot+" Vierblätter = "+a4proz+" Prozent</b><br>";
  	document.getElementById("txt").innerHTML+="<b>Sie hatten insgesamt "+a3tot+" Dreiblätter = "+a3proz+" Prozent</b><br>";
     } 	 
}

function sort(inputArr, sort_flags) {
  //  discuss at: http://phpjs.org/functions/sort/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //  revised by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //        note: SORT_STRING (as well as natsort and natcasesort) might also be
  //        note: integrated into all of these functions by adapting the code at
  //        note: http://sourcefrog.net/projects/natsort/natcompare.js
  //        note: This function deviates from PHP in returning a copy of the array instead
  //        note: of acting by reference and returning true; this was necessary because
  //        note: IE does not allow deleting and re-adding of properties without caching
  //        note: of property position; you can set the ini of "phpjs.strictForIn" to true to
  //        note: get the PHP behavior, but use this only if you are in an environment
  //        note: such as Firefox extensions where for-in iteration order is fixed and true
  //        note: property deletion is supported. Note that we intend to implement the PHP
  //        note: behavior by default if IE ever does allow it; only gives shallow copy since
  //        note: is by reference in PHP anyways
  //        note: Since JS objects' keys are always strings, and (the
  //        note: default) SORT_REGULAR flag distinguishes by key type,
  //        note: if the content is a numeric string, we treat the
  //        note: "original type" as numeric.
  //  depends on: i18n_loc_get_default
  //   example 1: var arr = ['Kevin', 'van', 'Zonneveld']
  //   example 1: sort(arr);
  //   example 1: $result = arr;
  //   returns 1: ['Kevin', 'Zonneveld', 'van']
  //   example 2: ini_set('phpjs.strictForIn', true);
  //   example 2: fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
  //   example 2: sort(fruits);
  //   example 2: $result = fruits;
  //   returns 2: {0: 'apple', 1: 'banana', 2: 'lemon', 3: 'orange'}

  var valArr = [],
    keyArr = [],
    k = '',
    i = 0,
    sorter = false,
    that = this,
    strictForIn = false,
    populateArr = [];

  switch (sort_flags) {
    case 'SORT_STRING':
      // compare items as strings
      sorter = function(a, b) {
        return that.strnatcmp(a, b);
      };
      break;
    case 'SORT_LOCALE_STRING':
      // compare items as strings, original by the current locale (set with  i18n_loc_set_default() as of PHP6)
      var loc = this.i18n_loc_get_default();
      sorter = this.php_js.i18nLocales[loc].sorting;
      break;
    case 'SORT_NUMERIC':
      // compare items numerically
      sorter = function(a, b) {
        return (a - b);
      };
      break;
    case 'SORT_REGULAR':
      // compare items normally (don't change types)
    default:
      sorter = function(a, b) {
        var aFloat = parseFloat(a),
          bFloat = parseFloat(b),
          aNumeric = aFloat + '' === a,
          bNumeric = bFloat + '' === b;
        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
        } else if (aNumeric && !bNumeric) {
          return 1;
        } else if (!aNumeric && bNumeric) {
          return -1;
        }
        return a > b ? 1 : a < b ? -1 : 0;
      };
      break;
  }

  // BEGIN REDUNDANT
  try {
    this.php_js = this.php_js || {};
  } catch (e) {
    this.php_js = {};
  }

  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js
    .ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;

  for (k in inputArr) { // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k]);
      if (strictForIn) {
        delete inputArr[k];
      }
    }
  }

  valArr.sort(sorter);

  for (i = 0; i < valArr.length; i++) { // Repopulate the old array
    populateArr[i] = valArr[i];
  }
  return strictForIn || populateArr;
}

function array_diff(arr1) {
  //  discuss at: http://phpjs.org/functions/array_diff/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Sanjoy Roy
  //  revised by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_diff(['Kevin', 'van', 'Zonneveld'], ['van', 'Zonneveld']);
  //   returns 1: {0:'Kevin'}

  var retArr = {},
    argl = arguments.length,
    k1 = '',
    i = 1,
    k = '',
    arr = {};

  arr1keys: for (k1 in arr1) {
    for (i = 1; i < argl; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (arr[k] === arr1[k1]) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys;
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
}

function count(mixed_var, mode) {
  //  discuss at: http://phpjs.org/functions/count/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: Waldo Malqui Silva
  //    input by: merabi
  // bugfixed by: Soren Hansen
  // bugfixed by: Olivier Louvignes (http://mg-crea.com/)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
  //   returns 1: 6
  //   example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
  //   returns 2: 6

  var key, cnt = 0;
  if (mixed_var === null || typeof mixed_var === 'undefined') {
    return 0;
  } else if (mixed_var.constructor !== Array && mixed_var.constructor !== Object) {
    return 1;
  }
  if (mode === 'COUNT_RECURSIVE') {
    mode = 1;
  }
  if (mode != 1) {
    mode = 0;
  }
  for (key in mixed_var) {
    if (mixed_var.hasOwnProperty(key)) {
      cnt++;
      if (mode == 1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor ===
        Object)) {
        cnt += this.count(mixed_var[key], 1);
      }
    }
  }
  return cnt;
}