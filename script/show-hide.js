function ReverseDisplay() {
if(document.getElementById('menu').style.display == "none")
  { document.getElementById('menu').style.display = "block";
    document.getElementById('content').style.display = "none";
    document.getElementById('menuicon').style.display = "none";
	document.getElementById('closeicon').style.display = "inline-block"; }
else
  { document.getElementById('menu').style.display = "none";
    document.getElementById('content').style.display = "block";
    document.getElementById('closeicon').style.display = "none";
    document.getElementById('menuicon').style.display = "inline-block";	}
}