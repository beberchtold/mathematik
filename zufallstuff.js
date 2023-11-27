// zufallstuff.js für www.mathematik.ch (Hauptseite)
// copyright Bernhard Berchtold


// Zufallsknacknüsse
var Link=[
'<a href="/puzzle/puzzle1.html"><img src="/img/puzzle1.png" class="a" alt="puzzle1"></a>',
'<a href="/puzzle/puzzle2.html"><img src="/img/puzzle2.png" class="a" alt="puzzle2"></a>',
'<a href="/puzzle/puzzle3.html"><img src="/img/puzzle3.png" class="a" alt="puzzle3"></a>',
'<a href="/puzzle/puzzle4.html"><img src="/img/puzzle4.png" class="a" alt="puzzle4"></a>',
'<a href="/puzzle/puzzle5.html"><img src="/puzzle/img/puzzle5.png" class="a" alt="puzzle5"></a>',
'<a href="/puzzle/puzzle6.html"><img src="/puzzle/img/puzzle6.jpg" class="a" alt="puzzle6"></a>',
'<a href="/puzzle/puzzle7/"><img src="/img/door.png" class="a" alt="Tuer"></a>',
'<a href="/puzzle/puzzle9.html"><img src="/img/puzzle9.png" class="a" alt="puzzle9"></a>',
'<a href="/puzzle/puzzle10.html"><img src="/img/puzzle10.jpg" class="a" alt="puzzle10"></a>',
'<a href="/puzzle/puzzle11.html"><img src="/puzzle/img/prinz3.png" class="a" alt="Prinz"></a>',
'<a href="/puzzle/puzzle15.html"><img src="/img/puzzle15.png" class="a" alt="puzzle15"></a>',
'<a href="/puzzle/puzzle17.html"><img src="/puzzle/img/puzzle17.png" class="a" alt="puzzle17"></a>',
'<a href="/puzzle/puzzle18.html"><img src="/img/puzzle18.jpg" class="a" alt="puzzle18"></a>',
'<a href="/puzzle/puzzle19.html"><img src="/img/puzzle19.jpg" class="a" alt="puzzle19"></a>',
'<a href="/puzzle/puzzle21.html"><img src="/img/puzzle21.png" class="a" alt="puzzle21"></a>',
'<a href="/puzzle/puzzle22.html"><img src="/img/puzzle22.jpg" class="a" alt="puzzle22"></a>',
'<a href="/puzzle/puzzle24.html"><img src="/img/puzzle24.jpg" class="a" alt="puzzle24"></a>',
'<a href="/puzzle/puzzle31.html"><img src="/img/puzzle31.png" class="a" alt="puzzle31"></a>',
'<a href="/puzzle/puzzle33.html"><img src="/puzzle/img/puzzle33_hund.gif" class="a" alt="puzzle33"></a>',
'<a href="/puzzle/puzzle35.html"><img src="/img/puzzle35.jpg" class="a" alt="puzzle35"></a>'
];


// Zufallsspiel
var Spiel=[
'<a href="/anwendungenmath/blackjack/"><img src="/img/blackjack.jpg" class="a" alt="Blackjack"></a>',
'<a href="/anwendungenmath/solitaire/"><img src="/img/solitaire.png" class="a" alt="Solitaire"></a>',
'<a href="/spiele/Sokoban/"><img src="/img/sokoban.png" class="a" alt="Sokoban"></a>',
'<a href="/spiele/hanoi_mit_grafik/"><img src="/img/hanoi.png" class="a" alt="Hanoi"></a>',
'<a href="/puzzle/SixteenPuzzle/"><img src="/img/sixteenpuzzle.png" class="a" alt="16puzzle"></a>',
'<a href="/puzzle/puzzle23/"><img src="/img/puzzle23.png" class="a" alt="puzzle23"></a>',
'<a href="/anwendungenmath/pento/"><img src="/img/pentominos.png" class="a" alt="Pentominos"></a>',
'<a href="/puzzle/puzzle14/"><img src="/img/puzzle14.png" class="a" alt="puzzle14"></a>',
'<a href="/puzzle/puzzle12/"><img src="/img/theseus_klein.png" class="a" alt="Theseus"></a>',
'<a href="/puzzle/puzzle20/"><img src="/img/puzzle20.png" class="a" alt="puzzle20"></a>',
'<a href="/puzzle/puzzle26/"><img src="/puzzle/puzzle26/solut26.jpg" class="a" alt="puzzle26"></a>',
'<a href="/spiele/euromillions/"><img src="/img/euromillions.png" class="a" alt="Euromillions"></a>',
'<a href="/spiele/eurodreams/"><img src="/img/eurodreams.png" class="a" alt="Eurodreams"></a>',
'<a href="/spiele/swisslotto/"><img src="/img/swisslotto.png" class="a" alt="Swisslotto"></a>',
'<a href="/spiele/numbers/"><img src="/img/numbers.png" class="a" alt="numbers"></a>',
'<a href="/spiele/sudoku/"><img src="/img/sudoku.png" class="a" alt="Sudoku"></a>',
'<a href="/spiele/sudoku_x/"><img src="/img/sudokux.png" class="a" alt="SudokuX"></a>',
'<a href="/spiele/sudoku_squiggly/"><img src="/img/sudoku_sq.png" class="a" alt="SquigglySudoku"></a>'
];

//Zufallsmathematiker
var math=[
'<a href="/mathematiker/euler.html"><img src="/img/euler.jpg" class="b" alt="Euler"></a>',
'<a href="/mathematiker/newton.html"><img src="/img/newton.jpg" class="b" alt="Newton"></a>',
'<a href="/mathematiker/fermat.html"><img src="/img/fermat.jpg" class="b" alt="Fermat"></a>',
'<a href="/mathematiker/gauss.html"><img src="/img/gauss.jpg" class="b" alt="Gauss"></a>',
'<a href="/mathematiker/galois.html"><img src="/img/galois.jpg" class="b" alt="Galois"></a>',
'<a href="/mathematiker/goedel.html"><img src="/img/goedel.jpg" class="b" alt="Goedel"></a>',
'<a href="/mathematiker/hilbert.html"><img src="/img/hilbert.jpg" class="b" alt="Hilbert"></a>',
'<a href="/mathematiker/einstein.html"><img src="/mathematiker/Einstein.jpg" class="b" alt="Einstein"></a>',
'<a href="/mathematiker/leibniz.html"><img src="/img/leibniz.jpg" class="b" alt="Leibniz"></a>',
'<a href="/mathematiker/abel.html"><img src="/img/abel.jpg" class="b" alt="Abel"></a>'
];

var txt=["Lissajous Figur","Platon Körper"];
var txtbi = ["Binomial&shy;verteilung","Approximation<br>Binomialverteilung"];
var txtfrac=["Fraktale","Mandelbrot"]; 
var txtmath=["Leonhard Euler","Isaac Newton","Pierre Fermat","C.F. Gauss","Evariste Galois","Kurt Gödel","David Hilbert","Albert Einstein","G.W. Leibniz","Niels Abel"];
if (window.innerWidth < 420) {
	txt[0]="Lissajous";txtbi[1]="Approximation<br>Binomialvert";txtmath[0]="L. Euler"; txtmath[4]="E. Galois"; txtmath[7]="A. Einstein";
	}

function start() {
	var anzahl=Spiel.length; var i=Math.floor(anzahl*Math.random());document.getElementById("message_spiel").innerHTML=Spiel[i];
    anzahl=Link.length; i=Math.floor(anzahl*Math.random());document.getElementById("message_raetsel").innerHTML=Link[i];
    i=Math.floor(2*Math.random());document.getElementById("message_pl").innerHTML=Wahl[i];
    document.getElementById("text_pl").innerHTML="<b>"+txt[i]+"</b>";
    i=Math.floor(2*Math.random());document.getElementById("message_bi").innerHTML=Wahlbi[i];
    document.getElementById("text_bi").innerHTML="<b>"+txtbi[i]+"</b>";
    i=Math.floor(2*Math.random());document.getElementById("message_frac").innerHTML=fractal[i];
    document.getElementById("text_frac").innerHTML="<b>"+txtfrac[i]+"</b>";
	anzahl=math.length; i=Math.floor(anzahl*Math.random());document.getElementById("message_math").innerHTML=math[i];
    document.getElementById("text_math").innerHTML="<b>"+txtmath[i]+"</b>";
}


// Lissajous oder PlatonKörper
var Wahl=[
'<a href="/anwendungenmath/lissajou/"><img src="/img/lissajou.jpg" class="a" alt="Lissajou"></a>',
'<a href="/anwendungenmath/PlatonKoerper/"><img src="/img/ikosaeder.png" class="a" alt="Ikosaeder"></a>'
];


// Binomialverteilung oder Approximation
var Wahlbi=[
'<a href="/anwendungenmath/wkeit/binomialvert.html"><img src="/img/binomialverteilung.png" class="a" alt="Binomialvert"></a>',
'<a href="/anwendungenmath/wkeit/approx_bin_norm.html"><img src="/img/approx.jpg" class="a" alt="Approx"></a>'
];


// fractal oder Mandelbrot
var fractal=[
'<a href="/anwendungenmath/fractal"><img src="/img/farn.png" class="a" alt="Farn"></a>',
'<a href="/anwendungenmath/fractal/julia/julia.html"><img src="/img/mandelbrot.png" class="a" alt="Mandelbrot"></a>'
];

