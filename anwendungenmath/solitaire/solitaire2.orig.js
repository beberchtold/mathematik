// Progamm zu Spiel Solitaire auf www.mathematik.ch
// Quadrat, Achteck und Lösungen
// copyright Bernhard Berchtold

 function Quadrat()         // und reset
 { var i,j;
   Art="Quadrat"
   for (i=0;i<=50;i++) Zugnr[i]=0;
   for (j= 0;j<=6;j++)
      for (i=24;i<=30;i++)
        { if (a[i+11*j] != 1)
          { a[i+11*j] = 1;
            Bildwechsel(i+11*j,Normal);
          }
        }
   nummer=0;first=true;ersterStein=0;
   displayuser();
 }
function Achteck()            // und reset
 { Quadrat();
   Art="Achteck"
   a[24]=5;a[25]=5;a[29]=5;a[30]=5;a[35]=5;a[41]=5;a[79]=5;a[85]=5;a[90]=5;a[91]=5;a[95]=5;a[96]=5;
   Bildwechsel(24,Hintergrund);Bildwechsel(25,Hintergrund);Bildwechsel(29,Hintergrund);Bildwechsel(30,Hintergrund);
   Bildwechsel(35,Hintergrund);Bildwechsel(41,Hintergrund);
   Bildwechsel(79,Hintergrund);Bildwechsel(85,Hintergrund);
   Bildwechsel(90,Hintergrund);Bildwechsel(91,Hintergrund);Bildwechsel(95,Hintergrund);Bildwechsel(96,Hintergrund);
   displayuser();
 }

function loesung1()
{ Kreuz();
  Pruefe(60);
  Zugnr=[0,626160,837261,747372,717273,526374,747372,617283,948372,929394,395061,617283,948372,818283,837261,697071,484950,615039,716049,464748,685746,494847,585960,464748,374859,596061,283950,615039,262728,283950,515049,384960];
  displaycomp();
}

function loesungQuadrat()
{ Quadrat();
  Pruefe(61);
  Zugnr=[0,636261,606162,837261,747372,958473,968574,617283,747372,415263,636261,405162,495051,283950,302928,615039,283950,837261,626160,515049,818283,948372,597081,607182,938271,727170,697071,928170,918069,384960,374859,464748,243546,253647,272625,584736,253647,605958,586980,717069,686970,907968,576879,798081,817059,594837,464748,374859];
  displaycomp();
}  

function loesungAchteck()
{ Achteck();
  Pruefe(74);
  Zugnr=[0,727374,948372,717273,747372,697071,928170,717069,686970,496071,515049,283950,495051,525150,474849,263748,494847,464748,717273,626160,847362,636261,938271,594837,575859,273849,363738,493827,615039,403938,717069,806958,273849,496071,585960,716049];
  displaycomp();
}

function displayuser()
 { document.getElementById('user').style.display="block";
   document.getElementById('user1').style.display="block";
   document.getElementById('comp').style.display="none"; 
 }
 
function displaycomp()
 { document.getElementById('user').style.display="none";
   document.getElementById('user1').style.display="none";
   document.getElementById('comp').style.display="block";
   document.getElementById("info").innerHTML="Klicken Sie auf 'Zug vorwärts', um den nächsten Zug durchzuführen.";
 }
 