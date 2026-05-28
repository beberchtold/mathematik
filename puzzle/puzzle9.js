var Letters="ABCCDEFFDFEGAHDBBFGAAIJ";
var Solution="78449166961370988637725";
var Stack;
var nullStack = new StackEl(-1);

window.onload=init;

function init() {
    Stack = new StackEl(Letters);
    restore();
}

function StackEl(str) {
    this.str = str;
    this.next = nullStack;
    return this;
}

function push() {
	document.getElementById("info").innerHTML = "";
    var value = "";
    var form = document.game;
    var N = Letters.length;
    for (i = 0; i < N; i++)
        value += form.elements[i].value;
    tmp = Stack;
    Stack = new StackEl(value);
    Stack.next = tmp;
}
 
// function change(n)
// keeps relationship between digits:
// when one changes - all change
// checks, if digit already used

function change(n) {
	document.getElementById("info").innerHTML = "";
    var form = document.game;
    if (form.elements[n].value.length == 0)
        form.elements[n].value = Stack.str.substring(n, n+1);
    var c = Letters.substring(n, n+1);
    var N = Letters.length;
    for (i = 0; i < N; i++)
        if (form.elements[i].value == form.elements[n].value)
        if (i != n)
            form.elements[n].value = Stack.str.substring(n,n+1);
    for (i = 0; i < N; i++)
        if (Letters.substring(i, i+1) == c)
            form.elements[i].value = form.elements[n].value;
}

// function restore()
// puts back original teaser

function restore() {
	document.getElementById("info").innerHTML = "";
    var form = document.game;
    str = Stack.str;
    if (Stack.next != nullStack)
        Stack = Stack.next;
    var N = str.length;
    for (i = 0; i < N; i++)
        form.elements[i].value = str.substring(i, i+1);
}

// function finished()
// checks if the teaser has been solved

function finished() {
    var form = document.game;
    var N = Letters.length; 
    for (i = 0; i < N; i++)
        if (form.elements[i].value != Solution.substring(i, i+1))
        {
            document.getElementById("info").innerHTML = "Leider falsch. Versuchen Sie's nochmal!";
            return;
        }
    document.getElementById("info").innerHTML = "Gratuliere! Sie haben's geschafft!";
}
