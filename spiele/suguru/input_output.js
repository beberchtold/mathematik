function downloadFile(data, filename, type = 'text/plain') {
    const blob = new Blob([data], { type })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}


var oReader = new FileReader();
 
function OnShowSelectedFile() {
    var aFileList, elInfo, elText;
     
    // Prüfen, ob aktuell eine Datei geladen wird und diesen Vorgang abbrechen
    if (oReader.readyState == FileReader.LOADING)
        oReader.abort();
     
    // Dateiliste laden
	aFileList=document.getElementById("upload").files;
	
	elInfo = document.getElementById("uploadInfo");
     
    // Prüfen, ob eine Datei gewählt wurde
    if (aFileList.length > 0) {
        // Prüfen, ob es sich um eine Text-Datei handelt
        if (aFileList[0].type.indexOf("text/") == 0)
        {
            // Event-Funktion definieren
            oReader.onloadend = function() {
                // Falls ein Fehler aufgetreten ist, Infofeld mit Fehler anzeigen
                if (oReader.error != null)
                {
					elInfo.innerHTML = "Fehler beim Laden der Datei!";
                }
                // Andernfalls Text lesen und verarbeiten
                else {
					elText = oReader.result;
					var felder = elText.split(',');
					// return, falls kein txt-file von mathematik.ch
					if (felder[0]!="Suguru von mathematik.ch") {
                        elInfo.innerHTML = "Keine Datei von mathematik.ch";
						return;
					}
					levelneu=[];
					for (var i=1;i<felder.length;i++) {
					   levelneu[i-1] = felder[i];
					}
					document.getElementById("difficulty").value=7;
					levelNumber = levelneu.length;
					loadLevelUI();			
                }
				elInfo.innerHTML="<small>Probleme eingelesen!</small>";
            }       
            // Lesen der Datei als Text starten
            oReader.readAsText(aFileList[0]);
        }
        // Andernfalls Infofeld anzeigen, dass das Dateiformat nicht unterstützt wird
        else {
            elInfo.innerHTML = "<small>Das Dateiformat wird nicht unterstützt!</small>";
        }
    }
}