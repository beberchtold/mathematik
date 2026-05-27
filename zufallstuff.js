// zufallstuff.js für www.mathematik.ch (Hauptseite)
// copyright Bernhard Berchtold

// Zufallsknacknüsse
var Link=[
'<a href="/puzzle/puzzle1.html"><img src="/imgH/puzzle1.png" width="200" height="200" class="H" alt="puzzle1"></a>',
'<a href="/puzzle/puzzle2.html"><img src="/imgH/puzzle2.webp" width="200" height="150" class="H" alt="puzzle2"></a>',
'<a href="/puzzle/puzzle3.html"><img src="/imgH/puzzle3.webp" width="200" height="150" class="H" alt="puzzle3"></a>',
'<a href="/puzzle/puzzle4.html"><img src="/imgH/puzzle4.png" width="150" height="94" class="H" alt="puzzle4"></a>',
'<a href="/puzzle/puzzle5.html"><img src="/imgH/puzzle5.png" width="220" height="167" class="H" alt="puzzle5"></a>',
'<a href="/puzzle/puzzle6.html"><img src="/imgH/puzzle6.webp" width="220" height="190" class="H" alt="puzzle6"></a>',
'<a href="/puzzle/puzzle7/"><img src="/imgH/puzzle7.png" width="150" height="103" class="H" alt="puzzle7"></a>',
'<a href="/puzzle/puzzle9.html"><img src="/imgH/puzzle9.webp" width="200" height="150" class="H" alt="puzzle9"></a>',
'<a href="/puzzle/puzzle10.html"><img src="/imgH/puzzle10.webp" width="200" height="160" class="H" alt="puzzle10"></a>',
'<a href="/puzzle/puzzle11.html"><img src="/imgH/puzzle11.webp" width="200" height="200" class="H" alt="Prinz"></a>',
'<a href="/puzzle/puzzle15.html"><img src="/imgH/puzzle15.webp" width="200" height="200" class="H" alt="puzzle15"></a>',
'<a href="/puzzle/puzzle17.html"><img src="/imgH/puzzle17.webp" width="200" height="200" class="H" alt="puzzle17"></a>',
'<a href="/puzzle/puzzle18.html"><img src="/imgH/puzzle18.webp" width="200" height="133" class="H" alt="puzzle18"></a>',
'<a href="/puzzle/puzzle19.html"><img src="/imgH/puzzle19.webp" width="200" height="136" class="H" alt="puzzle19"></a>',
'<a href="/puzzle/puzzle21.html"><img src="/imgH/puzzle21.png" width="200" height="134" class="H" alt="puzzle21"></a>',
'<a href="/puzzle/puzzle22.html"><img src="/imgH/puzzle22.webp" width="200" height="169" class="H" alt="puzzle22"></a>',
'<a href="/puzzle/puzzle24.html"><img src="/imgH/puzzle24.webp" width="200" height="150" class="H" alt="puzzle24"></a>',
'<a href="/puzzle/puzzle31.html"><img src="/imgH/puzzle31.png" width="225" height="150" class="H" alt="puzzle31"></a>',
'<br><a href="/puzzle/puzzle33.html"><img src="/imgH/puzzle33.gif" width="145" height="72" class="H" alt="puzzle33"></a>',
'<a href="/puzzle/puzzle35.html"><img src="/imgH/puzzle35.webp" width="220" height="156" class="H" alt="puzzle35"></a>'
];

// Zufallsspiel
var Spiel=[
'<a href="/anwendungenmath/blackjack/"><img src="/imgH/blackjack.jpg" width="200" height="152" class="H" alt="Blackjack"></a>',
'<a href="/anwendungenmath/solitaire/"><img src="/imgH/solitaire.png" width="200" height="131" class="H" alt="Solitaire"></a>',
'<a href="/spiele/Sokoban/"><img src="/imgH/sokoban.png" class="H" width="200" height="127" alt="Sokoban"></a>',
'<a href="/spiele/hanoi_mit_grafik/"><img src="/imgH/hanoi.png" width="200" height="130" class="H" alt="Hanoi"></a>',
'<a href="/puzzle/SixteenPuzzle/"><img src="/imgH/sixteenpuzzle.png" width="210" height="143" class="H" alt="16puzzle"></a>',
'<a href="/puzzle/puzzle23/"><img src="/imgH/puzzle23.png" width="181" height="90" class="H" alt="puzzle23"></a>',
'<a href="/anwendungenmath/pento/"><img src="/imgH/pentominos.png" width="200" height="124" class="H" alt="Pentominos"></a>',
'<a href="/puzzle/puzzle14/"><img src="/imgH/puzzle14.png" width="200" height="130" class="H" alt="puzzle14"></a>',
'<a href="/puzzle/puzzle12/"><img src="/imgH/theseus.png" width="184" height="114" class="H" alt="Theseus"></a>',
'<a href="/puzzle/puzzle20/"><img src="/imgH/puzzle20.png" width="200" height="132" class="H" alt="puzzle20"></a>',
'<a href="/puzzle/puzzle26/"><img src="/imgH/solut26.webp" width="200" height="123" class="H" alt="puzzle26"></a>',
'<a href="/spiele/eurodreams/"><img src="/imgH/eurodreams.png" width="200" height="130" class="H" alt="Eurodreams"></a>',
'<a href="/spiele/swisslotto/"><img src="/imgH/swisslotto.png" width="200" height="130" class="H" alt="Swisslotto"></a>',
'<a href="/spiele/numbers/"><img src="/imgH/numbers.png" width="225" height="150" class="H" alt="numbers"></a>',
'<a href="/spiele/sudoku/"><img src="/imgH/sudoku.png" width="200" height="133" class="H" alt="Sudoku"></a>',
'<a href="/spiele/sudoku_x/"><img src="/imgH/sudokux.png" width="210" height="147" class="H" alt="SudokuX"></a>',
'<a href="/spiele/sudoku_squiggly/"><img src="/imgH/sudoku_sq.png" width="200" height="140" class="H" alt="SquigglySudoku"></a>',
'<a href="/anwendungenmath/pento12x5/"><img src="/imgH/pento12x5.png" width="220" height="200" class="H" alt="Pentominos"></a>',
'<a href="/spiele/suguru/"><img src="/imgH/suguru.png" width="220" height="193" class="H" alt="Suguru"></a>'
];

//Zufallsmathematiker
var math=[
'<a href="/mathematiker/euler.html"><img src="/imgH/euler.webp" width="200" height="181" class="H" alt="Euler"></a>',
'<a href="/mathematiker/newton.html"><img src="/imgH/newton.webp" width="220" height="199" class="H" alt="Newton"></a>',
'<a href="/mathematiker/fermat.html"><img src="/imgH/fermat.webp" width="200" height="174" class="H" alt="Fermat"></a>',
'<a href="/mathematiker/gauss.html"><img src="/imgH/gauss.webp" width="200" height="181" class="H" alt="Gauss"></a>',
'<a href="/mathematiker/galois.html"><img src="/imgH/galois.webp" width="220" height="181" class="H" alt="Galois"></a>',
'<a href="/mathematiker/goedel.html"><img src="/imgH/goedel.webp" width="220" height="181" class="H" alt="Goedel"></a>',
'<a href="/mathematiker/hilbert.html"><img src="/imgH/hilbert.webp" width="220" height="181" class="H" alt="Hilbert"></a>',
'<a href="/mathematiker/einstein.html"><img src="/imgH/einstein.webp" width="200" height="150" class="H" alt="Einstein"></a>',
'<a href="/mathematiker/leibniz.html"><img src="/imgH/leibniz.webp" width="220" height="181" class="H" alt="Leibniz"></a>',
'<a href="/mathematiker/abel.html"><img src="/imgH/abel.webp" width="220" height="181" class="H" alt="Abel"></a>',
'<a href="/mathematiker/riemann.html"><img src="/imgH/riemann.webp" width="240" height="200" class="H" alt="Riemann"></a>'
];

var txt=["Lissajous Figur","Platon Körper","Ellipsenumfang"];
var txtbi = ["Binomial&shy;verteilung","Approximation Binomialverteilung","Euromillions"];
var txtfrac=["Fraktale mit IFS","Mandelbrotmenge","Sierpinski-Dreieck"]; 
var txtmath=["Euler","Newton","Fermat","Gauss","Galois","Gödel","Hilbert","Einstein","Leibniz","Abel","Riemann"];
if (window.innerWidth < 420) {
	txt=["Lissajous","PlatonKörper","Ellipse"];txtbi[1]="Approximation Binomialvert";txtfrac=["Fraktale","Mandelbrot","Sierpinski"];
	}

function start() {
	var anzahl=Spiel.length; var i=Math.floor(anzahl*Math.random()); document.getElementById("message_spiel").innerHTML=Spiel[i];
    anzahl=Link.length; i=Math.floor(anzahl*Math.random()); document.getElementById("message_raetsel").innerHTML=Link[i];
    i=Math.floor(3*Math.random()); document.getElementById("message_pl").innerHTML=Wahl[i];
    document.getElementById("text_pl").innerHTML="<b>"+txt[i]+"</b>";
    i=Math.floor(3*Math.random()); document.getElementById("message_bi").innerHTML=Wahlbi[i];
    document.getElementById("text_bi").innerHTML="<b>"+txtbi[i]+"</b>";
    i=Math.floor(3*Math.random()); document.getElementById("message_frac").innerHTML=fractal[i];
    document.getElementById("text_frac").innerHTML="<b>"+txtfrac[i]+"</b>";
	anzahl=math.length; i=Math.floor(anzahl*Math.random()); document.getElementById("message_math").innerHTML=math[i];
    document.getElementById("text_math").innerHTML="<b>"+txtmath[i]+"</b>";
}

// Lissajous, PlatonKörper oder Ellipsenumfang
var Wahl=[
'<a href="/anwendungenmath/lissajou/"><img src="/imgH/lissajou.webp" width="200" height="170" class="H" alt="Lissajou"></a>',
'<a href="/anwendungenmath/PlatonKoerper/"><img src="/imgH/ikosaeder.webp" width="200" height="200" class="H" alt="Ikosaeder"></a>',
'<a href="/anwendungenmath/ellipsenumfang/"><img src="/imgH/ellipse.webp" width="250" height="159" class="H" alt="Ellipsenumfang"></a>'
];

// Binomialverteilung, Approximation oder Euromillions
var Wahlbi=[
'<a href="/anwendungenmath/wkeit/binomialvert.html"><img src="/imgH/binomialverteilung.png" width="200" height="133" class="H" alt="Binomialvert"></a>',
'<a href="/anwendungenmath/wkeit/approx_bin_norm.html"><img src="/imgH/approx.jpg" width="200" height="115" class="H" alt="Approx"></a>',
'<a href="/spiele/euromillions/"><img src="/imgH/euromillions.png" width="200" height="130" class="H" alt="Euromillions"></a>',
];

// fractal, Mandelbrot oder Sierpinski
var fractal=[
'<a href="/anwendungenmath/fractal"><img src="/imgH/farn.png" width="200" height="200" class="H" alt="Farn"></a>',
'<a href="/anwendungenmath/fractal/julia/julia.html"><img src="/imgH/mandelbrot.png" width="209" height="180" class="H" alt="Mandelbrot"></a>',
'<a href="/anwendungenmath/fractal/sierpinski/"><img src="/imgH/sierpinski.webp" width="220" height="185" class="H" alt="Sierpinski"></a>'
];