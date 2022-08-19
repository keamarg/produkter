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

- [x] iframe fylder alt indhold i højde

- [x] transitions

- [x] Fjern active fra kategori knapper

- [x] Social media buttons/ fix modal

- [x] Luk/tilbage knap fra artikel

- [x] Indikation af hvilke emneord en artikel har i sig

**Udvid det så der kan være flere “materialeknapper”**

- [x] Den, der hedder artikel .pt, f.eks. til dilemmaspil som har 2 .pdf’er
- [x] Sørg for, at navnet på knappen er dynamisk, da det også kan være andet end en artikel.

**Nice to have:**

- [ ] vue tooltips til sidebar ikoner
- [ ] Krydsning af knapper (f.eks. e-bøger OG Teknik)
- [ ] Evt. læg den ned i “søgning på ….” og giv mulighed for at fravælge
- [ ] Dynamisk loading af produkter m. infinite scroll (https://cs50.harvard.edu/web/2020/weeks/6/) ca. 19 minutter inde /31 er snapsen

## Optimeringer:

- [ ] css optimering (scoped? partials?)
- [ ] refactor css (scoped?)
- [ ] fade overgang til cards i bunden af forsiden (ved tryk på hjem)
- [ ] Udskift value1 og value2 variable med sigende navne
- [ ] fælles funktioner til components, f.eks. getIndex (som de der allerede er refaktoreret til assets/common.js)

## Ikke teknisk:

- [ ] Beskrivelse af sitet
- [ ] Beskrivelse til FB/LI/TW inkl. godt "card image"

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
