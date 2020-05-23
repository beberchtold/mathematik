function initmenu() {
	document.getElementById("menuicon").addEventListener('click', menu);
}

function menu() {
    var neuFenster = window.open("/menu_js.html", "Menu","width=300,height=520,left=100,top=100");
    neuFenster.focus();
	}