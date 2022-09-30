# Progressive Web Apps - Aktuelle Trends der IKT 2022

Dieses Projekt enthält die Semesteraufgabe des Moduls "Aktuelle Trends der IKT 2022". Durch die zur verfügung gestellten Grundgerüst wurden die Funktionalitäten angepasst und eingefügt, so dass am Ende eine *Progressive Web Application* entstand. 

## Installation

- Zum Ausführen des Projektes wird [Node.js](https://nodejs.org) verwendet. Es muss es auf dem Rechner installiert werden. 

- In der Wahl der IDE ist es dem Entwickler überlassen. Die App wurde mit "Visual Studio code" umgesetzt.

- Zum Starten des Projektes wechsle in Terminal des Rechners oder in den Projektordner in den Projektordner (`cd IKT-PWA-22`) und führen dort 

	`npm install` 

	aus (es genügt auch `npm i`). Damit werden alle erforderlichen Abhängigkeiten installiert. Es entsteht der `node_modules`-Ordner. 

- Um den Projekt zu starten, gebe den Befehl

	`npm start` 
    ein.  Klicke danach auf [localhost:8080](http://localhost:8080) oder gebe die URL direkt in Ihren Browser ein.

- Sollte man die Änderungen an der Implementierung vornehmen und diese ausprobieren wollen, muss man den Server zunächst wieder stoppen:

	`Ctrl-C`

	und geben dann erneut 

	`npm start` 

	ein. 

## Anpassungen

Für das Design der Anwendung wurde [Material Design Lite](https://getmdl.io/) verwendet . Man kann natürlich auch andere CSS-Frameworks verwenden. 

Für die Farbkombinationen findet man [hier](https://getmdl.io/customize/#cdn-code). Es genügt auch, die entsprechenden Farben in den Dateinamen einzutragen 

`material.{primary}-{accent}.min.css` 

(z.B. `material.indigo-pink.min.css`).

--

Man kann natürlich auch ein anderes Bild als ins Titel einbinden.Es sollte beachtet werden , dass mithilfe responsiven Verhaltens drei verschiedene Bilder davon benötigen, idealerweise mit den Pixel-Maßen `1200 x 457` (`*-lg.jpg`), `900 x 343` (`*.jpg`) und `480 x 183` (`*-sm.jpg`). 
--

Auch das eigene `favicon.ico` in den Projektordner ein kann man einbinden. Erstellen kann man sich ein solches `favicon` z.B. [hier]
(https://favicon.io/) oder [hier](https://www.ionos.de/tools/favicon-generator). 



 ## App

Die App TravelPanda kann neue Blockeinträge verfassen. Nach dem klick von dem `+` Button, wird man auf den Kamera und Location Zugriff gefragt. Wenn man den Kamerazugriff verweigert kommt ein File Picker, wo man selbst ein Bild hochladen kann. Zugleich erscheint eine Benachrichtigung.Die App ist installierbar und offline nutzbar.Es besitzt ein responsives Frontend und ein backend. Als Datenbak ist MongoDB Compass verbunden.Und es verwendet die IndexDB, Gelocation API,Hintergrundsynchronation und die Push-Nachrichten.
