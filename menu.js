function keyPress(k) {   
    switch(k)
        {
        case 27: // Taste Esc
            history.back();
            break;	
        case 32: // Leertaste: verhindert, dass default Funktion der Befehlswiederholung ausgeführt wird
		event.preventDefault();
		break;
       }
	}