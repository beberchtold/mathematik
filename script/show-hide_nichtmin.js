function ReverseDisplay() {
if(document.getElementById('menu').style.display == "none")
  { document.getElementById('menu').style.display = "block";
    document.getElementById('content').style.display = "none"; 
    window.document.images[0].src = "/img/menu_closeicon.gif";}
else
  { document.getElementById('menu').style.display = "none";
    document.getElementById('content').style.display = "block";
    window.document.images[0].src = "/img/menuicon.png"; }
}