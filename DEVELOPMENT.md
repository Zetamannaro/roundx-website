# Sviluppo del sito RoundX

Struttura statica ispirata all'organizzazione di Zetamannaro/particula-website.
Questa è una base tecnica, non il design definitivo.

## Branch
- `main`: branch principale; per ora contiene soltanto il README iniziale.
- `design/roundx-home`: sviluppo del nuovo sito.
- Le revisioni possono essere proposte a main tramite pull request.
- Due branch non equivalgono a due ambienti web pubblicati: l'hosting di test e produzione va configurato separatamente.

## File
- `index.html`: struttura e contenuti della pagina.
- `styles.css`: stile e layout.
- `script.js`: interazioni.
- `background.js`: eventuali effetti di sfondo.
- `assets/`: immagini, loghi e altre risorse.
- `.nojekyll`: consente di servire i file statici senza Jekyll su GitHub Pages.

## Anteprima locale
Dalla cartella del repository, con Python 3 installato:
```sh
python3 -m http.server 8000
```
Aprire http://localhost:8000.

## Pubblicazione
Nessun dominio personalizzato è configurato in questo branch.
Il file CNAME di Particula non è stato copiato.
Hosting e DNS del sito attuale sono indipendenti da questa struttura.
La pagina iniziale contiene noindex,nofollow per la fase di sviluppo:
rimuoverlo nella versione destinata alla produzione.
Non caricare password, chiavi API o dati riservati.
