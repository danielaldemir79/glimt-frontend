# Glimt

Glimt är en fotodagbok där användaren kan spara minnen med titel, datum, beskrivning och bild. Minnena ska kunna hittas med datumval och bläddring mellan minnesdagar samt visas i en tidslinje. Det går att skapa, visa, redigera och ta bort inlägg. Appen byggs med React och ska fungera på både dator och mobil.

## Innan du startar frontend

Backend måste vara installerad, databasen skapad och API:t startat innan
frontend kan köras.

Följ avsnitten `Installera och skapa databasen` och
`Starta API:t för webbappen` i backend repots README:

https://github.com/danielaldemir79/glimt-api

Låt API terminalen fortsätta köra. Öppna sedan en ny terminal och fortsätt
med stegen nedan. Om API:t inte körs visar webbappen ett felmeddelande och
kan inte hämta eller spara minnen.

## Starta frontend

Du behöver ha Node.js 22.12 eller senare installerat.

1. Öppna en terminal i frontend-repots rotmapp.
2. Installera projektets paket:

   ```bash
   npm install
   ```

3. Starta utvecklingsservern:

   ```bash
   npm run dev
   ```

4. Öppna `http://localhost:5173/`. Frontend måste använda port 5173 på grund av vår CORS inställning i API:t, som bara tillåter anrop från den adressen.


## Tekniska val

### React och Web API   

Frontend och backend ligger i separata repon. React ansvarar för gränssnittet och skickar HTTP anrop via HTTPS till vårt ASP.NET Core Web API. API:t hanterar databaslogiken och hämtar, skapar, uppdaterar och tar bort minnen i SQLite.

### Komponentindelning och API-lager

Gränssnittet är uppdelat i mindre React komponenter för bland annat formulär, navigering, lista och minneskort. Det gör att varje komponent får ett tydligt ansvar och att koden blir enklare att läsa, ändra och underhålla.

API anropen ligger separat i `memoryApi.js`. På så sätt hålls kommunikationen med backend samlad på ett ställe och behöver inte upprepas i flera komponenter.

### Fetch och FormData

Frontend använder `fetch` för att skicka anrop till API:t. Information om minnen skickas som JSON.

Bilder skickas med `FormData`, eftersom det är ett sätt att skicka filer till API:t.

### State och datahämtning

React `useState` används för information som förändras medan appen används, till exempel minnen, valt datum och formulärets läge. `useEffect` används för att hämta minnen från API:t när applikationen startar.

### Filtrering och uppdatering av minnen

Valda minnen och datum tas fram från listan med alla minnen. Vi behöver därför inte spara samma information på flera ställen.

När ett minne skapas, ändras eller tas bort uppdateras listan direkt. Frontend behöver därför inte hämta alla minnen från API:t igen.

### Felhantering

Om ett GET-, POST-, PUT- eller DELETE-anrop misslyckas visas ett begripligt felmeddelande i appen i stället för att sidan kraschar.

### Formulär och skydd mot flera sparningar

Formulärets värden sparas i React state. Fälten använder också webbläsarens inbyggda kontroller, till exempel `required`, `maxLength` och begränsning av tillåtna bildformat.

Spara-knappen stängs av medan ett minne sparas. Det förhindrar att användaren råkar skicka samma formulär flera gånger.

### Bilduppladdning

Frontend skickar först den valda bildfilen till API:ts bilduppladdning. API:t returnerar bildens publika sökväg, som sedan sparas tillsammans med minnets övriga uppgifter. Om ingen ny bild väljs vid redigering behålls den befintliga bilden.

### Förhandsvisning och detaljvy

Minneskorten fungerar som förhandsvisningar. Bilderna fyller kortens fasta bildyta och långa beskrivningar begränsas till tre rader för att korten ska behålla en jämn layout. Titlar begränsas till 45 tecken i formuläret och lång text bryts så att den inte hamnar utanför kortet.

När användaren klickar på ett minneskort öppnas en detaljvy ovanpå sidan. Där visas hela bilden utan beskärning samt minnets fullständiga titel, datum och beskrivning. Detaljvyn kan scrollas om innehållet är större än skärmen.

### Datumnavigering

Appen använder webbläsarens inbyggda datumväljare och knappar för att bläddra mellan dagar som innehåller minnen. Det ger enkel kod, fungerar på olika enheter och undviker onödig kalenderlogik.

Knapparna för äldre och nyare minne är inaktiverade när det inte finns något minnesdatum att gå till. Därför är båda knapparna gråmarkerade när appen startar utan valt datum. När ett datum med närliggande minnen väljs aktiveras den knapp som går att använda.

### Responsiv layout

Minneskorten visas med CSS Grid. Antalet kolumner anpassas efter skärmens bredd, vilket gör att appen fungerar på mobil, surfplatta och dator. Sidans innehåll har en maxbredd så att det inte blir för utspritt på stora skärmar.

Bilderna visas med samma höjd och `object-fit: cover`. Det gör att bilder med olika originalformat fyller korten utan att bli utdragna.

### Tillgänglighet

Vi har gjort appen lättare att använda med tangentbord och skärmläsare. En skärmläsare är ett hjälpmedel som läser upp sidans innehåll för personer som har svårt att se.

Formulärfälten har labels som hjälper skärmläsaren att beskriva fälten. Felmeddelanden använder `role="alert"` för att visa att meddelandet är viktigt. Detaljvyn använder `role="dialog"` för att visa att en ruta har öppnats ovanpå sidan.

Det syns också tydligt vilket fält eller vilken knapp som är vald när appen används med tangentbord.

## Begränsningar och vidareutveckling

Adressen till API:t är just nu skriven direkt i frontendkoden. I en publicerad version hade den i stället kunnat läsas från en miljövariabel.

Detaljvyn kan vidareutvecklas så att den går att stänga med Escape och hanterar tangentbordsfokus bättre. API:t kan också få samma gräns på 45 tecken för titeln som formuläret redan har.
