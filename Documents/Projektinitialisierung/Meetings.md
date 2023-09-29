# Meeting Notes

## 1. Juni Sprint 6 Review (Prof. Reder und Prof. Landvoigt)
- Definition of done einarbeiten bei User Stories (z.B. Monat nur als Zahl suchen und nicht als Text)
- Überlegen ob es sinnvoll ist Datum mit Fulltextsearch suchen
- Suche überarbeiten -> 05 Tag? Monat?
- evtl. Umkreissuche einbauen -> Reith sollte dann auch Leonding eingegeben werden können
- Bilder eine maximale Größe einstellen (runter skalieren?)
- Userdaten updaten
- Edit Event
- Einladung für private Events
- Favorisierte Events erstellen

## 27. April Sprint 5 Review (Prof. Rager und Prof. Schraml)
- Ort, Name und evtl. Datum als String eingeben und dann suchen (Autocompletion)✅
- Bei Event Preview nicht löschen sondern nochmal Möglichkeit zum überarbeiten geben (Edit-Button)
- Gespeicherte Events --> Favorisierte Events, ...✅
- Öffentliche Events nicht favorisieren, Private Events direkt favorisieren
- Event bearbeiten können (bei privaten) z.B. Datum, Titel, ...
- Userdaten bearbeiten (PUT)✅
- Location Suche nach Region einschränken
- Bing Maps✅
- Ticketpreis Button (Freier Entritt - ändern?) der Preisfeld wieder einblendet)✅
- Imageupload✅
- Payment recherchieren, wie das gemacht werden kann (Molly,...)
- Payment Seite verändern --> Kontaktinformationen ändern auf Kreditkarte✅

## 30. März 2023 (Felix und Nico)
### Weitere Schritte
#### Create Event endgültig abschließen
- Public und Private Bug ✅
- Ticketpreis nicht anzeigen wenn Private ✅
- Event created Successfully (Preview -> Added Successfully (evtl. nach 5 Sekunden redirect auf Home))✅
- Location API ✅
- Serverseitige Validierung (Event mit gleichem Titel, Location und Datum nicht veröffentlichen) ✅
#### Home Seite
- Nur Public Events anzeigen✅
- Accordeon Upcoming und Past Events (z.B. Flashscore)
#### Start Seite Suchfilter
- Location
- Kategorie
- Datum
- Error Message wenn kein Event gefunden wurde ✅
#### Profil
- Meine Events Page (eigens erstellte Events anzeigen)✅
- Teilgenommene Events Page (alle Events zu denen ich eingeladen wurde -> funktion zum Einladen später)
- Profil bearbeiten
#### Einladen bei privaten Events
- Noch fraglich

## 23. März 2023 (Prof. Rager und Prof. Schraml)
+ unique Email adresse
+ Serverseitige validierung fehlt
+ Datum und Location suchen
+ Suchbegriffe die Suche erleichtern sollen
+ Wenn kein Event gefunden wird Errorbox
+ Logik Eventname und Ort (2 Konzerte mit dem selben Namen aber in 2 verschiedene Orte)
+ Zahlungsseite soll vorm erstellen eines Events kommen oder ein Hinweis
+ Anfangs gratis
+ öffentlich schalten zahlungspflichtig
+ Comunity Version gratis für privat Events und Business Version zahlungspflichtig 
+ events vielleicht in drafts speichern
+ Aktuelle Daten verwenden bei Präsentationen
+ Ux-Desig (Start, End Datum bei create Event)
+ Eventbeschreibung bearbeiten
+ Rager mit Design nicht so zufrieden
+ Wie bei Willhaben vorm veröffentlichen eine Ansicht wie es veröffentlicht aussehen würde
+ Login bzw Registrierung nötig beim Teilnehmen eines privat Events
+ Link versenden vereinfachen
+ Für ältere Leute einen Beschreibungstext zum Link (Hochzeitsplanungsapps anschauen)
+ Email versenden erleichtern in der App schon


## 16. März 2023 (Prof. Landvoigt👑) Sprint Review
Anschauen was JWT macht<br>
Stunden besser verteilen<br>
User Stories besser ausschmücken und genauer beschreiben

## 14. Februar 2023 (Prof. Reder) Sprint Review
Bei Kategorie evtl. kein Enum nehmen sondern eine eigene Tabelle in der DB <br>
Bevor man mit einem Task beginnt eine UserStory erstellen (es sollte zu jedem Task eine UserStory existieren) <br>
UserStories auch rein fürs Frontend schreiben (nicht nur für vollständige Features) <br>
Zusammenschreiben was seit dem letzten mal nicht funktioniert hat (Schwierigkeiten im Projekt) <br>
Stundeneinteilung jeweils pro Sprint auflisten (pro Sprint eigene Gesamtstundenzahl)

## 2. Februar 2023 (Prof. Rager und Prof. Schramml)
Pop-Up Icon für Map ändern bzw. weg geben (z.B. mit Textfläche unterlegen) <br>
Event-Preview eventuell als Accordion aufziehen lassen und zweite View ersparen <br>
Generelles Icon Schema überarbeiten <br>
Bei Map mehr Informationen anzeigen (wichtige Informationen, wie z.B. Hauptbahnhof einblenden) <br>
Gruppen Feature für Social Feature <br>
MongoDB überdenken und evtl. aud SQL ändern (mit Herrn Professor Reder besprechen)

## 12. Jänner 2023 (Prof. Rager und Prof. Schramml)
Social Feature (public Events): nicht für alle Posten sondern eigene kleine Gruppen einstellen

## 24. November 2022 (Prof. Rager und Prof. Schramml)
Vorstellung der gemachten Tätigkeiten <br>
Aufgabenverteilung besser organisieren <br>
Besprechung wie man Risiken wie DSGVO (genauer gesagt Wiederrufsrecht, Max Schrems, Szene1 und Facebook anschauen wie es die machen) und Server beheben kann <br>
Präsentation Clickdummy und weitere Vorgehensweise

## 15. November 2022 (Prof. Landvoigt)
Vorstellung des Projektantrags. <br>
Verbesserungsvorschläge von Prof. Landvoigt:
+ Datenschutzrisiko
+ Serverrisiko
+ Aufgabenverteilung überarbeiten (Eine Aufgabe nicht mehrere Personen zuweisen)

## 15.6 2023 Sprint Review (Prof. Reder, Prof. Landvoigt)
+ Beim Ändern eines Events benötigt es einen automatischen Reload
+ Vll statt Einladungscode barcode verwenden (Reder)
+ Angemeldet und Registriert bei Event 
+ Liken und Speichern klar darstellen was was ist
+ Favouritisierte Events sollten automatisch Reloaded werden wenn ein Event aus den Favouritisierten Events gelöscht wurde
+ BaseUrls verwenden (Urls als konstanten speichern in einem eigenen File)
+ Befragung (Zielgruppe, Fragestellung)

## 29. Juni 2023 (Prof. Landvoigt, Prof. Reder)
Documentation <br>
+ funktion die öfters verwendet wird als util auslagern
+ link auf Documentation von JWT bei Verwendung
+ Ursprung des kopierten codes angeben
+ frontend und backend ordner npm i
+ aufschreiben was nächstes jahr gemacht wird
  
