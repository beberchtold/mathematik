function problem(e){initPuzzle();if(e==0){return}var a=new Array(9);switch(e){case 1:a=["-23816-5-","16-4-52--","5--2-----","-75---681","---7-----","31--5--27","6--1-----","-475-31--","-3------8"];break;case 2:a=["31-48--96","-62------","--9---54-","---------","6--24--5-","5--6--41-","------13-","93----864","-41936-5-"];break;case 3:a=["2-973-415","-------8-","--5-2---3","1--3-----","---6-58-1","-5--4-326","5----7---","8--4-----","--615-9--"];break;case 4:a=["759-1-83-","4--3-57-9","3-----2--","86-25--7-","--31---5-","----9---2","-3294-1--","----3--2-","-----8-9-"];break;case 5:a=["32-----84","--92743--","71---326-","-61------","4---5----","9---174--","14---6-9-","-97-----8","----4----"];break;case 6:a=["9-485--6-","7--2---59","--697---4","-8-------","--26--5--","---------","-6-3--125","2----6-9-","3-9--2-47"];break;case 7:a=["-1-5-----","5-7-2----","3--9-----","-----9---","--923-7--","2--1-84--","-4----6-5","--87--1-2","-73-5-89-"];break;case 8:a=["-9--7---4","--49----6","17---3-2-","-6-32----","8---6---7","----94-6-","-3-6---42","4----16--","6---8--9-"];break;case 9:a=["714-6---2","----9---8","5----7-4-","6--72--3-","-7134-28-","3---8----","----547--","---------","4-3--28-5"];break;case 10:a=["217-----8","8----6-4-","3--------","--3-21--9","9----35--","-2-9--4--","-82--9--4","---7-59-2","--564----"];break;case 11:a=["-4----3--","--2----5-","----81---","------418","---5-9---","--------6","---43-2--","1--------","---7-----"];break}for(var c=0;c<9;c++){for(var b=0;b<9;b++){prob[c][b]=a[c].charAt(b);if(prob[c][b]=="-"){prob[c][b]=" "}locked[c][b]=setvalue(c,b,prob[c][b])}}save();zeichne();Nummer="p"+e;var d=81-anzleere();document.getElementById("message").innerHTML="Problem "+Nummer+": "+d+" Zeichen"};