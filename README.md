# Glimt

Glimt är en fotodagbok där användaren kan spara minnen med titel, datum, beskrivning och bild. Minnena ska kunna hittas med datumval och bläddring mellan minnesdagar samt visas i en tidslinje. Det ska gå att skapa, visa och redigera inlägg. Appen byggs med React och ska fungera på både dator och mobil.

## Starta frontend

Du behöver ha Node.js installerat.

1. Öppna en terminal i frontend-repots rotmapp.
2. Installera projektets paket:

   ```bash
   npm install
   ```

3. Starta utvecklingsservern:

   ```bash
   npm run dev
   ```

4. Öppna adressen som visas i terminalen, vanligtvis `http://localhost:5173/`.

## Starta backend

Backend-repot finns här:

https://github.com/danielaldemir79/glimt-api

Du behöver ha .NET 10 SDK installerat.

1. Öppna en terminal i backend-repots rotmapp.

2. Hämta projektets paket:

   ```bash
   dotnet restore
   ```

3. Skapa databasen:

   ```bash
   dotnet ef database update
   ```

4. Starta API:t:

   ```bash
   dotnet run --launch-profile https
   ```

API:t körs på `https://localhost:7092`.

## Tekniska val

### React och Web API   

Frontend och backend ligger i separata repon. React ansvarar för gränssnittet och skickar HTTP anrop till vårt ASP.NET Core Web API. API:t hanterar databaslogiken och sparar minnen i SQLite.

### Felhantering

Om ett GET- eller POST-anrop misslyckas visas ett begripligt felmeddelande i appen i stället för att sidan kraschar.

### Datumnavigering

Appen använder webbläsarens inbyggda datumväljare och knappar för att bläddra mellan dagar som innehåller minnen. Det ger enkel kod, fungerar på olika enheter och undviker onödig kalenderlogik.

### Responsiv layout

Minneskorten visas med CSS Grid. Antalet kolumner anpassas efter skärmens bredd, vilket gör att appen fungerar på mobil, surfplatta och dator. Sidans innehåll har en maxbredd så att det inte blir för utspritt på stora skärmar.

Bilderna visas med samma höjd och `object-fit: cover`. Det gör att bilder med olika originalformat fyller korten utan att bli utdragna.