var vert=new Array(9);function problem6(a){switch(a){case 1:vert=["----3-","------","3-2---","2--16-","--3--5","4-----"];break;case 2:vert=["6-321-","--25--","------","-2-1-5","---4--","------"];break;case 3:vert=["-2-5--","--6--4","------","------","--24-5","43----"];break;case 4:vert=["-4---6","3-----","------","------","----2-","--6-52"];bnr=1;break;case 5:vert=["3-4---","------","----5-","----6-","2-----","------"];bnr=1;break;case 6:vert=["--35--","------","-3----","-2--6-","------","654---"];bnr=2;break}}function problem(c){if(c==0){return}unloesbar=false;initPuzzle();bnr=0;if(document.getElementById("9x9").checked){switch(c){case 1:vert=["1928-6---","8-6-71--4","25------3","4--56--7-","------4-6","---------","-78----4-","6-1-5---2","5----7-9-"];break;case 2:vert=["-927-6---","5-----6--","-264-9---","-6--4512-","-153-----","-4-6-----","------39-","---51-2-6","6-------7"];break;case 3:vert=["6917-4---","----6---3","---5-----","-8------6","7------54","---4--5--","5--1---49","--46---92","32---78--"];break;case 4:vert=["-9-8-5---","-----4968","---6-----","-1--462-9","9531-2---","74-------","--------5","-68---7-4","-24-6-8--"];break;case 5:vert=["4--1378--","681---5--","---5-8---","---4-----","---3--16-","--9-----3","7---5-418","51--9--4-","-34-8----"];bnr=1;break;case 6:vert=["7-3---9-5","-----5-3-","----48-96","2485-9---","5--3-7---","---------","8-74--3--","1-----2--","9-6-1--2-"];bnr=2;break}}else{problem6(c)}erzeugeBloecke(bnr);for(var b=0;b<digit;b++){for(var a=0;a<digit;a++){prob[b][a]=vert[b].charAt(a);if(prob[b][a]=="-"){prob[b][a]=" "}locked[b][a]=setvalue(b,a,prob[b][a])}}zeichne();document.getElementById("message").innerHTML="<b>Problem "+c+": "+(digit*digit-anzleere())+" Ziffern</b>"};