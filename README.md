# keaprodukter

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## To do:

- [ ] Mulighed for at trykke "pil ned" i søgefeltet, så man kan vælge mellem muligheder i stedet for at trykke med musen
- [ ] **NOFIX** DYNAMISK LOADING BRUGES IKKE PT. Dynamisk loading til mobil (virker ikke med onscroll)
- [x] iframe fylder alt indhold i højde
- [x] transitions
- [x] Fjern active fra kategori knapper
- [x] Social media buttons/ fix modal
- [x] Luk/tilbage knap fra artikel
- [x] Indikation af hvilke emneord en artikel har i sig
- [x] String sammenligning i søgefelt skal være case insensitive
- [x] Fix github branches, dvs. find ud af at smelte "old-project-state/keaproxy" ind, hvis det er det vi ender med at bruge.
- [x] Merge "old-project-state/keaproxy" til master (https://stackoverflow.com/questions/161813/how-do-i-resolve-merge-conflicts-in-a-git-repository).
- [x] Udvid det så der kan være flere “materialeknapper”
- [x] Den, der hedder artikel .pt, f.eks. til dilemmaspil som har 2 .pdf’er
- [x] Sørg for, at navnet på knappen er dynamisk, da det også kan være andet end en artikel.
- [x] Ændre "like hjerte" til at ligge inde på selve produktet, i stedet for på thumbnail, det samme med "share"
- [x] Gentænk menuen til venstre (hjerte, arkiv, del), fjern den evt. helt, og læg funktionalitetet ud andre steder. "Arkiv" ligner en indkøbskurv, og navnet "arkiv" får folk til at tænke på, at man vil arkivere noget. Kald den evt. "alle produkter" eller lignende i stedet.
- [x] Ændre "carousel", så produktnavn står øverst, dernæst evt. en kort subtitel. Skriv forfatter osv. under selve produktet.
- [x] Lav forfatternavne osv. under selve produktet som knapper, så man med et tryk f.eks. kan søge på alt af "Jesper Balslev"
- [x] Fjern "video" som en selvstændig side, lav det til en "drop down" på produktsiden.

## Bugs (next: bug1m):

- [ ] bug1c hjerte ved like fremstår som "knækket" når man klikker, skal først "knække" når man genbesøger (har bøvlet med det tidligere uden held, fjern evt. funktionaliteten)
- [ ] bug1g Bug eller ej? Tilbagepil sender én tilbage til foregående side "udenfor" kea produkter hvis man kommer fra et direkte link til et produkt
- [ ] bug1e søgefelt på mobil giver ikke forslag
- [ ] bug1j fejl i gradient på toppen af accordion til video på "product" siden (sker ikke i development mode)
- [ ] bug1k baggrundsbillede forstørres på "product" siden når man åbner accordion
- [ ] bug1d **NOFIX-** DYNAMISK LOADING BRUGES IKKE PT. Henter produkter ind "onscroll", selvom man ikke er inde i arkivet, hvis der scrolles
- [ ] bug1h **NOFIX-** DYNAMISK LOADING BRUGES IKKE PT. Når man søger på et "keyword" er man nødt til at hente alle produkter ind for at få deres keywords. Er der nogen måde vi kan få keywords allerede i "listekaldet", uden at hente alle produkter ind. Alternativt skal man hive alle produkter ind hver gang siden loader, men det er måske ikke så hensigtsmæssigt, både ift. loadtid og antal api kald (det ville i så fald være et kald per produkt ud over det samlede kald) UPDATE: Vi kan muligvis klare det via et "description" field, som holder en kopi af keywords i portfolio listen. I første omgang deaktiverer vi funktionaliteten med at hente ind løbende, og ser på hvor meget det rent faktisk betyder.
- [x] bug1l youtube afspilning virker ikke når man åbner accordion på "product" siden
- [x] bug1a Localstorage "likes" forsvinder pludseligt på refresh
- [x] bug1b Alle relevante produkter skal loade under likes og søgninger
- [x] bug1f tilbagepil farver hele linjen under produkt i safari
- [x] bug1i Hvis man refresher "results" siden efter et klik på en "author", så får man en tom liste. Jeg har undersøgt det, men kan ikke helt trænge til bunds i det (this.$route.params.kind virker, men kun indtil refresh. Har været nede af en vej med at bruge props, men det lykkedes ikke helt... tænker måske det har noget at gøre med "searchquery" i "navigation" komponenten, som emitter noget, der måske gemmer params ved refresh, men kan simpelthen ikke huske hvordan jeg har bygget det op i sin tid)

**Nice to have:**

- [ ] "Featured" liste til forsiden (markeret via felt i Alma?)
- [ ] vue tooltips til sidebar ikoner
- [ ] håndtering af billedstørrelse (f.eks. implementering af alma felt, der definerer hvordan et givent billede skal vises eg. background-position)
- [ ] Krydsning af knapper (f.eks. e-bøger OG Teknik)
- [ ] Evt. læg den ned i “søgning på ….” og giv mulighed for at fravælge
- [x] ved sharing, link direkte til hovedsiden i stedet for iframe siden (kan måske løses a la det her https://stackoverflow.com/questions/41946851/directly-link-to-page-with-specific-content-loaded-in-iframe eller det her: https://stackoverflow.com/questions/32790086/using-a-javascript-function-to-load-a-page-in-an-iframe)
- [x] Dynamisk loading af produkter m. infinite scroll (https://cs50.harvard.edu/web/2020/weeks/6/) ca. 19 minutter inde /31 er snapsen
- [x] "Down arrow" til at indikere, at der kan loades mere

## Node bugs (almaproxy):

- [x] Endpoint kræver fysisk sti på serveren (kan muligvis fixes med router) **FIXED med "query" api kald**
- [x] Http CORS issues
- [x] Https CORS issues (se mail fra René)
- [x] Sesssion issues (kan f.eks. ses, når man loader produkter; hvis man refresher kan starter den ikke forfra med "offset" når den henter ind). Forsøgt løst server side, men tror vi er nødt til at finde en front end løsning på problemet.

## Optimeringer:

- [ ] css optimering (scoped? partials?)
- [ ] refactor css (scoped?)
- [ ] fade overgang til cards i bunden af forsiden (ved tryk på hjem)
- [ ] Udskift value1 og value2 variable med sigende navne
- [ ] fælles funktioner til components, f.eks. getIndex (som de der allerede er refaktoreret til assets/common.
- [x] oprydning i node proxy kode
      js)

## Ikke teknisk:

- [ ] Beskrivelse af sitet
- [ ] Beskrivelse til FB/LI/TW inkl. godt "card image"
- [ ] Alma template - endelig form

## Ændre midlertidige addresser mm.:

- [x] keaprodukter-2
- [x] dist folderen på kea projekter (skal vel bare ligge direkte i keaprodukter)

## Projektmapper:

### GitHub:

- produkter (ny) — DEVELOPMENT
- keaprodukter (gammel)

### projekter.kea.dk:

- produkter (gammel)
- keaprodukter (ny) — PRODUCTION

## Arbejdsgang (alt køres fra projektmappe):

**Kør fra localhost**

1. Åben projekt i editor ( f.eks. vscode (code .))
2. Kør localhost fra terminal (npm run serve)
3. Sæt SASS op til at overvåge ændringer i css (sass --watch src/styles)

**Push til production**

1. Build fra terminal (npm run build)
2. Add, commit, push til GitHub

Kopier “dist” mappen til production serveren (fra projektfolderen):
scp -r dist/\* projekterkea@kea.dk:/home/projekterkea/www/keaprodukter
