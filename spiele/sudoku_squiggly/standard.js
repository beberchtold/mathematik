function standard(){const b=["243   ,  4   ,    5 ,3  46 , 1   3,  6   ","12 5  ,     6,6 3 2 ,3     ,      ,   4 1","234   ,1     ,    4 ,  3 6 ,  2   ,   1 2","214   ,4     ,     6,3  2  ,    5 ,   3 1","1245  ,  3 5 ,      ,6 1   ,     5,    2 ","125 3 ,      , 6  4 , 12   ,      ,5 6   ","2 3 4 ,   5  , 61   ,      , 2 4  ,5   3 ","    21,  6   ,    4 ,   2  ,4  3  , 34  5","    64,  3    ,   1  ,   5  , 1  2 ,    43"];const a=["31 48  96, 62      ,  9   54 ,         ,6  24  5 ,5  6  41 ,      13 ,93    864, 41936 5 ","2 973 415,       8 ,  5 2   3,1  3     ,   6 58 1, 5  4 326,5    7   ,8  4     ,  615 9 ","759 1 83 ,4  3 57 9,3     2  ,86 25  7 ,  31   5 ,    9   2, 3294 1  ,    3  2 ,     8 9 ","32     84,  92743  ,71   326 , 61      ,4   5    ,9   174  ,14   6 9 , 97     8,    4    ","9 485  6 ,7  2   59,  697   4, 8       ,  26  5  ,         , 6 3  125,2    6 9 ,3 9  2 47"," 1 5     ,5 7 2    ,3  9     ,     9   ,  923 7  ,2  1 84  , 4    6 5,  87  1 2, 73 5 89 "," 9  7   4,  49    6,17   3 2 , 6 32    ,8   6   7,    94 6 , 3 6   42,4    16  ,6   8  9 ","714 6   2,    9   8,5    7 4 ,6  72  3 , 7134 28 ,3   8    ,    547  ,         ,4 3  28 5"," 4    3  ,  2    5 ,    81   ,      418,   5 9   ,        6,   43 2  ,1        ,   7     "];for(i=0;i<9;i++){block6gel[i]="3";block6nr[i]=["001020011121","304050314151","021222031323","324252334353","041424051525","344454354555"]}for(i=0;i<9;i++){vert6[i]=b[i].split(",")}for(i=0;i<9;i++){block9gel[i]=4;block9nr[i]=["001020011121021222","304050314151324252","607080617181627282","031323041424051525","334353344454354555","637383647484657585","061626071727081828","364656374757384858","667686677787687888"]}for(i=0;i<9;i++){vert9[i]=a[i].split(",")}i=0;while(i<9&&vert6[i]!=",,,,,"){addneu(6);i++}i=0;while(i<9&&vert9[i]!=",,,,,,,,"){addneu(9);i++}};