# CLAUDE.md — Site de mariage Cesar & Brooke

> Fichier de contexte du projet. Claude Code doit le lire au démarrage de chaque session
> et le METTRE A JOUR apres chaque decision validee (voir la section "Entretien de ce fichier").

---

## 1. Le projet en une phrase

Site web statique (HTML / CSS / JavaScript) pour le mariage de **Cesar Reversade** et
**Brooke Lanziner**, le **28 aout 2027** a **La Ferme de Gy, 307 route du Thovey, 74210 Giez**
(Haute-Savoie, France).

- Page unique avec defilement et barre de navigation fixe.
- Contenu **entierement en anglais**. Les echanges avec Cesar se font **en francais**.
- Hebergement prevu : GitHub Pages ou Netlify (gratuit ; budget possible si besoin).
- Chaque invite recoit un lien personnel vers le site.

---

## 2. Qui est Cesar, et comment travailler avec lui

Cesar **n'est pas developpeur**. Il travaille sous **Windows**, dans VS Code avec Live Server.

Regles de collaboration, non negociables :

1. **Expliquer avant d'agir.** Annoncer ce qui va etre fait et pourquoi, puis le faire.
2. **Petites etapes.** Une seule chose a la fois. Jamais trois fichiers refondus d'un coup.
3. **Valider chaque etape** avant de passer a la suivante. Attendre son retour.
4. **Ne pas aller trop vite.** C'est une demande explicite et repetee.
5. **Commenter le code en francais**, meme si le contenu du site est en anglais.
6. Expliquer le vocabulaire technique a la premiere occurrence.
7. Utiliser le **mode plan** pour toute modification touchant plusieurs fichiers.

---

## 3. Exigences de qualite

Cesar n'est pas codeur, mais il est exigeant sur le resultat :

- Le site doit etre **beau**, soigne, artistique. Pas un template generique.
- **Fluide** : animations discretes, chargement rapide, aucun a-coup au defilement.
- **Mobile d'abord dans les faits** : la majorite des invites ouvriront le lien sur telephone.
- Accessible : contrastes suffisants, navigation clavier, respect de `prefers-reduced-motion`.

---

## 4. Direction artistique — GELEE, ne pas modifier sans accord explicite

### 4.1 Palette

| Variable CSS | Code | Nom | Role exclusif |
|---|---|---|---|
| `--chalk`  | `#F7F2E6` | Chalk  | Fond general. Creme rechauffe, accorde a l'enduit ocre du domaine. |
| `--linen`  | `#E8E0D0` | Linen  | Fond des sections alternees, pour rythmer le defilement. |
| `--sage`   | `#8E9C7C` | Sage   | Filets, separateurs, details discrets. Jamais du texte courant. |
| `--pine`   | `#2F3E33` | Pine   | Titres et texte courant. Egalement le texte pose sur les boutons roses. |
| `--cosmos` | `#D0708A` | Cosmos | **Uniquement ce qui se clique.** Liens, boutons, etat actif. |

**Regle absolue : le rose ne sert a rien d'autre qu'a signaler une action.**
S'il apparait sur un titre ou un filet decoratif, il perd sa fonction et le site devient illisible
a la lecture rapide.

Le texte des boutons roses est en `--pine`, **jamais en blanc** : le cosmos est trop clair pour
porter du blanc avec un contraste suffisant.

Alternative validee si Cesar veut changer l'accent : Zinnia `#DD7A70`. Une seule ligne a modifier.

Pistes ecartees, ne pas reproposer : dore / jaune des foins (querelle avec le rose), mauve
sauvage (trop froid), palette pierre-bois-sapin seule (trop terne).

### 4.2 Typographies

Google Fonts, gratuites :

- **Cormorant Garamond** — graisses 300 et 400, plus les italiques. Titres, prenoms, chiffres.
- **Jost** — graisses 300 et 400. Texte courant, navigation, formulaires.

Pas de police script ou manuscrite. Les touches "ecrites a la main" se font avec
**l'italique de Cormorant Garamond**.

---

## 5. Structure du site

Ordre des sections, valide :

1. **Wedding** — accueil. Prenoms, date, lieu, infos essentielles. Court et fort.
2. **Schedule** — deroule de la journee, horaires, repas, artistes.
3. **Quiz** (anciennement Our Story, renomme le 2026-10-03, ancre `#quiz`) — cinq questions interactives sur l'histoire du couple. **Le dessin au crayon n'y sert plus de fond** : voir 5.2.
4. **Travel** — deux sous-blocs : *Getting here* et *Where to stay*. Image d'ouverture : la vue du domaine.
5. **Q&A** — dress code, menu, questions diverses.

Regles de navigation :

- Barre fixe en haut, fond `--chalk` en permanence, bordure basse qui apparait au defilement
  (classe `is-scrolled`, geree dans `script.js`).
- Lien actif surligne selon la section visible.
- Menu burger sous 860 pixels.
- **Le RSVP ne figure PAS dans la barre de navigation.** Un seul bouton, dans la section Wedding.
- Pas de galerie photo separee : les photos sont reparties dans les sections.
- Pied de page : email de contact et numero pour le jour J.

### 5.1 Ouverture (hero)

Mise en page **en deux volets** : photo a gauche, texte sur fond creme a droite.
Sous 860 pixels, les deux volets s'empilent (`grid-template-rows: 52svh auto`).

Raison du choix : la photo du couple disponible est verticale et en pied. En fond plein ecran
elle serait recadree de facon desastreuse.

Un fond plein ecran redeviendra envisageable **uniquement** si le couple obtient une photo
horizontale ou ils sont petits dans le paysage.

Reglage de cadrage expose : `object-position` dans `.hero__photo img`, actuellement
`center 35%` sur grand ecran et `center 28%` sur mobile.

### 5.2 Regles de composition — etablies le 2026-09-17

Une premiere version de Schedule a ete jugee « pas belle du tout » par Cesar, qui a demande
une refonte complete en donnant carte blanche. Le diagnostic, a retenir pour les sections
suivantes :

> **Le defaut n'etait pas la quantite d'elements, mais leur heterogeneite.**
> Trois formats d'images differents, des blocs de tailles disparates, chacun traite a sa
> maniere. L'oeil ne trouvait aucun rythme. La beaute vient ici de la repetition d'une meme
> forme et du vide autour, jamais de l'accumulation.

Regles qui en decoulent :

1. **Une seule FORME d'image par section.** Formulation corrigee le 2026-09-18 : la regle
   disait d'abord « une seule zone image par section, pas de vignettes semees entre les
   paragraphes ». Elle interdisait donc ce qu'elle voulait permettre. Le diagnostic d'origine
   visait l'heterogeneite, pas le nombre. Plusieurs vignettes sont donc admises **a la
   condition stricte** qu'elles partagent un format et une largeur rigoureusement identiques,
   et qu'elles forment une serie visible. Motif de reference : les trois temps de Schedule,
   tous en `4/3` et brides a 260 px (230 px sur telephone). Ce qui reste interdit, et n'a
   jamais cesse de l'etre : des images de formats differents semees au fil du texte.
2. **Toutes les images d'un meme bloc partagent exactement le meme format.** Un `aspect-ratio`
   commun, pas des hauteurs qui se repondent approximativement.
3. **Aucun `border-radius` sur les images.** Les bords nets font editorial ; les coins
   arrondis font diapositive.
4. **Un bloc REELLEMENT different se detache par un bandeau pleine largeur teinte**, jamais en
   empilant une carte de plus dans la colonne. Precision ajoutee le 2026-09-18 apres coup :
   encore faut-il qu'il soit different. Un bandeau pose sur un element qui appartient a une
   serie ne le met pas en valeur, il l'exclut. Voir le bandeau du groupe, cree le 17 puis
   supprime le 18.
5. **Sur telephone, brider les vignettes en `max-width`.** Sans cela, une grille qui passe en
   une colonne rend chaque image pleine largeur — exactement l'effet que l'on fuit.
6. Le texte porte les sections, l'image accompagne.

**Composition retenue pour Schedule** — trois temps numerotes :

| Zone | Traitement |
|---|---|
| Rappel jour et lieu | `Saturday 28 August 2027 · La Ferme de Gy, Giez`, en petites capitales espacees sage, juste au-dessus de l'horaire. Classe `.daystamp`. Repere, jamais titre. |
| Horaire | `3:00 PM` et `2:00 AM` relies par un filet sage qui traverse la page. La duree se lit dans la distance, pas dans la taille des chiffres. |
| Bande « Then / Today » | Une seule bande continue, deux moities **jointives** en `aspect-ratio: 1337/802` : le dessin a gauche, la vue aerienne a droite. **Bridee a 640 px**, la largeur exacte de l'horaire. |
| 01 The table, 02 The stage, 03 The band | **Trois colonnes egales sur une seule ligne** (`repeat(3, 1fr)`), numero en Cormorant sage, sans encadre ni fond. Chacune ouvre par une vignette `.moment__figure` en `4/3`. |

**Les trois vignettes forment une serie et doivent le rester.** Meme `aspect-ratio: 4/3`,
largeur donnee par la colonne (donc egale par construction), bridee a 230 px sous 860 px.
Changer le format de l'une sans changer les deux autres ramenerait exactement le defaut
d'heterogeneite qui avait fait rejeter la premiere Schedule.

La vignette precede le numero dans le HTML : les trois colonnes demarrent alors a la meme
hauteur et les chiffres `01`, `02`, `03` restent alignes. Inverser l'ordre casse cet alignement.

**Le bandeau `--linen` du groupe a ete supprime le 2026-09-18**, ainsi que tout le CSS `.band*`.
Raison, a retenir : il avait ete cree la veille pour detacher `03`, alors seul bloc a porter une
image. Des que `01` et `02` ont recu la meme vignette, il ne distinguait plus rien — il separait
le groupe de ses deux freres. **Un bandeau teinte ne se justifie que face a un bloc reellement
different du reste.** Corollaire pour Our Story et Q&A : ne pas poser un bandeau par habitude.

**La photo du groupe doit rester en `4/3`**, son ratio natif. Un cadre carre a ete essaye puis
abandonne : il rognait un quart de la largeur et coupait les musiciens des deux bords, alors
qu'on doit voir les trois.

**A propos de la bande « Then / Today ».** Cesar aimait l'idee mais pas le format initial
(deux vignettes separees de traitements differents, qui faisaient collage). Version retenue :
un objet unique, large et bas.

- Les deux moities gardent **leurs deux colonnes meme sur telephone** : c'est leur
  rapprochement qui porte le sens, les empiler le detruirait.
- **Le format du cadre est celui du dessin : `aspect-ratio: 1337 / 802`.** Ce n'est pas un
  chiffre decoratif, c'est la taille exacte du fichier. Valable a TOUTES les largeurs d'ecran,
  sans exception mobile. Ne le changer que si le fichier du dessin change lui-meme.
- Meme largeur et meme `aspect-ratio` pour les deux moities : leurs hauteurs sont donc
  rigoureusement egales. `align-self: start` empeche la grille de les etirer, ce qui
  fausserait cette egalite.
- **Le dessin est en `object-fit: contain`, jamais `cover`.** C'est un trait de crayon fin :
  rogne, il devient illisible. La photo aerienne, elle, est en `cover`.
- **Pourquoi les deux points ci-dessus sont lies, corrige le 2026-09-18.** `contain` affiche le
  dessin en entier. Si le cadre n'a pas son format, il reste du vide en haut et en bas de sa
  moitie, pendant que la photo voisine remplit la sienne : les lignes du haut et du bas cessent
  d'etre alignees. Un cadre mobile en `4/3` avait ete pose pour gagner de la hauteur — il n'en
  donnait qu'a la photo et laissait **20 % de vide** autour du dessin. Cesar : « la hauteur
  n'est pas la meme et ca se voit, surtout en version mobile ». Le scan n'ayant aucune marge
  blanche (crayon bord a bord, verifie), caler le cadre sur le format du fichier suffit :
  alignement au pixel, et aucun trait perdu. **Ne pas resoudre ce probleme en passant le dessin
  en `cover` :** en `4/3` cela rognait 20 % de sa largeur, soit le batiment de gauche et la
  montagne de droite.
- Le fond de scan du dessin est un blanc froid `#F5F5F5` qui formerait un rectangle blanchatre
  sur le creme. `mix-blend-mode: multiply` le fait disparaitre et ne laisse que le trait de
  crayon. **Ne pas retirer cette ligne de CSS.** Effet secondaire recherche : le passe reste
  pale, le present colore.
- Les legendes se limitent a `Then` et `Today`. **Aucune date** : la signature manuscrite du
  dessin n'est pas dechiffrable avec certitude — voir l'avertissement sur « 1250 » en section 7.

**`porte-ferme.webp` n'est plus employee.** Elle encombrait Schedule. A reserver pour Q&A ou
Our Story. Rappel : elle ne fait que 400 px de large, donc jamais au-dela de cette taille.

---

## 6. Formulaire RSVP — specification

- **Un lien par invitation (par foyer)**, pas par invite : `.../rsvp?c=k4p9`
- Le code sert a **identifier** le foyer : pre-remplir les prenoms, savoir qui n'a pas repondu.
  Il ne **plafonne pas** le nombre de convives.
- Nombre de convives **libre** : boutons "add an adult" et "add a child", sans limite.
  Cesar veut etre genereux, mais connaitre le nombre reel.
- Adultes et enfants separes (menu enfant, chaise haute, tarif). Champ age pour les enfants.

Champs **par personne** :
- Attending / not attending
- Preferences alimentaires : vegetarian, vegan — **distinctes** des allergies
- Allergies et intolerances : gluten, dairy, nuts
- Champ libre

Champs **par foyer** : email, telephone, message libre.

Destination des reponses : **Google Sheet**.

**Limite de securite a respecter :** sur un site statique, la liste des codes est lisible dans
le code source. N'y mettre que des **prenoms et des nombres**. Jamais d'adresse, jamais de
numero de telephone.

---

## 7. Le lieu — faits verifies

Utilisables tels quels pour la redaction en anglais :

- Propriete de la **meme famille depuis 24 generations**, depuis Humbert, seigneur de Chevron.
  Plus de 800 ans d'histoire familiale.
- Batie autour des communs du XVIIe siecle du chateau de Gy, repensee au XIXe en **ferme modele**.
- **Facades boisees sculptees uniques en Savoie**, inspirees des architectures suisses, bavaroises
  et prussiennes decouvertes par Victor de Chevron Villette lors de missions diplomatiques.
- Embleme du domaine : une **tete de vache**.
- Restauration profonde dans les annees 2000, ouverture comme centre de reception en **juin 2011**.
- Monument Historique.
- Vue sur le Mont-Blanc et le lac d'Annecy depuis les jardins.
- Acces : 30 min d'Annecy, 1 h de Geneve. Gares : **Albertville et Annecy** (correction de
  Cesar le 2026-09-17 ; ce fichier n'indiquait qu'Albertville). Aeroport : Geneve.
  Parking prive de 200 voitures.

### 7.1 Prestataires — verifie le 2026-09-17

- **Traiteur : Idee'O Traiteur** — orthographe exacte, avec l'accent et l'apostrophe.
  Base a Gilly-sur-Isere, Savoie. Site : `ideeotraiteur.com`.
  **Point de vigilance :** leur site public ne revendique ni bio, ni produits locaux, ni
  boissons naturelles, ni service a volonte. Ces arguments figurent sur le site du mariage
  parce que Cesar les tient de son **devis**. A reconfirmer par ecrit avant la mise en ligne :
  ce sont des promesses que les invites liront comme acquises.

- **Groupe : The Honeyrunners** — avec l'article, c'est leur nom officiel.
  Toronto. Folk-rock et americana, menes au piano. Amis de Brooke, invites au mariage,
  et joueront en live pendant la soiree.
  Spotify : `open.spotify.com/artist/6sJKBtpEQZmSCSTb7LAtBZ`
  Le genre musical a ete verifie mais **Cesar a demande de ne pas le detailler** sur le site.

- **Coordonnees GPS du domaine : 45.750943, 6.247674**, obtenues via l'API officielle
  `api-adresse.data.gouv.fr`. Servent a la vignette de carte.

**A reconfirmer aupres du domaine avant publication :** hebergement sur place — maisonnette des
maries, dortoir 28 couchages, gite l'Orangerie (9 personnes), gite les Clarines (12 a 14 personnes).

**ATTENTION :** la date "1250" a circule dans une maquette. Elle etait **inventee**. Ne jamais la
reutiliser. Toute date ou chiffre nouveau doit etre verifie aupres du domaine.

Contact du domaine pour obtenir le kit photo haute definition : `contact@fermedegy.fr`

Ne pas recuperer de photos trouvees en ligne : droits des photographes et du domaine.

---

## 8. Fichiers et nommage

### 8.1 Arborescence

```
wedding-site/
  index.html
  styles.css
  script.js
  CLAUDE.md
  images/
    couple/     b-c1.jpg a b-c5.jpg, b-c7.jpg, brooke1.jpg, cesar1.jpg,
                brooke-perform.jpg  (voir 8.4)
    venue/      vue-generale.webp, vue-aerienne-generale.webp, vue-facade.webp,
                porte-ferme.webp, carte-giez.webp, honeyrunners.jpg,
                buffet-traiteur.jpg  (CACHE DE POSITION, voir section 10)
    story/      lift-to-water.mov
    site/       dessin-ferme-historique.webp, logo.png
  docs/
    screenshots/
```

Deux ecarts a corriger un jour, sans urgence :

- `honeyrunners.jpg` est range dans `venue/` alors que ce n'est pas une photo du lieu.
  Sa place serait un futur `images/music/`.
- `dessin-ferme-historique.png` est dans `site/`, alors que ce fichier annoncait `story/`.
  L'arborescence ci-dessus reflete desormais la realite du disque, pas l'intention initiale.

**`images/story/lift-to-water.mov` pese 74 Mo.** A ne surtout pas publier tel quel : ce seul
fichier est quinze fois plus lourd que tout le reste du site. S'il doit servir, il faudra le
convertir en MP4 compresse et le charger a la demande.

### 8.2 Convention de nommage — source de bugs frequents

Pour **tous** les fichiers : **minuscules, pas d'espaces, pas d'accents, pas d'esperluette**,
tirets comme separateurs.

GitHub Pages et Netlify tournent sous Linux, qui est **sensible a la casse**. Windows ne l'est pas.
C'est la cause classique du "ca marche chez moi, c'est casse en ligne".

### 8.3 Point de vigilance

Le dossier du projet se trouve actuellement dans **OneDrive** :
`C:\Users\cesar\OneDrive\Desktop\FAMILLE\WEDDING\wedding-site\`

La synchronisation OneDrive entre en conflit avec Git. **Deplacement recommande** vers
`C:\Users\cesar\Projets\wedding-site` avant la mise en place du depot Git.
A faire, non fait a ce jour.

### 8.4 Inventaire de `images/couple/` — verifie le 2026-09-17, complete le 2026-09-18

Neuf fichiers, **sept scenes differentes**. `b-c6` et `b-c8` ont ete supprimes : doublons
confirmes par comparaison pixel par pixel (ecart 0,53 et 1,31 sur une echelle de 0 a 255).

| Fichier | Contenu | Remarque |
|---|---|---|
| `b-c1` | Couple sur les marches, debout cote a cote | Pouce leve |
| `b-c2` | Couple sur les marches, pose dansante — **cadrage large** | Pouce leve |
| `b-c7` | **Meme instant que `b-c2`, cadrage serre** | Utilise dans `index.html` |
| `b-c3` | Couple au bord de l'eau, plein pied | Pouce leve |
| `b-c4` | Couple au bord de l'eau, cadrage rapproche | **Pas de pouce leve** |
| `b-c5` | Cesar seul — **mode portrait, fond flou** | |
| `cesar1` | **Meme pose que `b-c5`, net partout** | Lettrage "EL RASCO" en fond |
| `brooke1` | Brooke seule, geste de la robe | |
| `brooke-perform` | **Brooke de profil contre un ciel de coucher de soleil**, cheveux au vent, epaules nues. 1600 x 1083, 170 Ko | Ajoutee le 2026-09-18. Utilisee dans Schedule, bloc `02 The stage` |

**Piege a ne pas repeter :** `b-c2`/`b-c7` et `b-c5`/`cesar1` avaient d'abord ete pris pour
des doublons sur la foi de vignettes. Ce sont en realite deux cadrages et deux rendus
distincts. Ne jamais conclure au doublon sans comparaison pixel par pixel **et** verification
des deux images cote a cote en grand.

**`brooke-perform.jpg` est la seule exception utile a la reserve ci-dessous.** Horizontale,
tons chauds de coucher de soleil, aucun jaune sature : c'est la seule image du dossier qui
s'accorde franchement au rose cosmos. Precision a garder en tete : **ce n'est pas une photo de
scene.** Elle evoque, elle ne documente pas. Le bloc `02 The stage` l'assume.

**Toutes les AUTRES photos du couple sont verticales.** Verifie fichier par fichier. La mise en page
en deux volets de la section 5.1 reste donc justifiee.

**Reserve sur la direction artistique :** les six scenes proviennent de la meme soiree, en
decor urbain (beton, quai), sans rapport avec la Savoie. La robe est d'un **jaune vif et
saturé**, couleur explicitement ecartee de la palette en section 4.1 parce qu'elle se querelle
avec le rose cosmos. A surveiller des qu'une de ces photos cotoie un bouton RSVP.
La seance photo de fiancailles (section 13) repondrait aux deux problemes d'un coup.

---

## 9. Entretien de ce fichier — IMPORTANT

**Ce fichier est la memoire du projet. Il doit rester a jour.**

Cesar travaille en parallele dans une conversation Claude classique (navigateur) pour les
arbitrages de style, de couleur et de strategie marketing. Ce fichier est ce qu'il y transfere
pour donner le contexte. S'il est perime, cette conversation repart a l'aveugle.

Regles a appliquer :

1. **Apres chaque decision validee par Cesar**, mettre a jour la section concernee dans les
   minutes qui suivent. Ne pas attendre la fin de la session.
2. **Consigner le pourquoi, pas seulement le quoi.** "Ouverture en deux volets parce que la photo
   est verticale" vaut infiniment mieux que "ouverture en deux volets".
3. **Consigner aussi les pistes ecartees** et leur raison, pour ne pas les reproposer plus tard.
4. **Tenir a jour la section 11 (Journal)** : une ligne datee par decision.
5. **Tenir a jour la section 10 (Etat d'avancement)** : deplacer les items entre "fait",
   "en cours" et "a faire".
6. Si une decision **contredit** ce fichier, le signaler a Cesar avant d'ecrire, puis corriger
   la section concernee plutot que d'empiler les exceptions.

### 9.1 Captures d'ecran

Un fichier Markdown ne contient pas d'images, il y renvoie. Le dossier `docs/screenshots/`
est prevu pour cela.

- Apres chaque changement visuel notable, demander a Cesar une capture, ou en produire une.
- Nommage : `AAAA-MM-JJ-section-variante.png`, par exemple `2026-09-14-hero-deux-volets.png`.
- Les referencer dans la section 12 avec une ligne de contexte : ce qu'on voit, ce qui a change,
  ce qui reste a regler.
- Garder les versions precedentes plutot que les ecraser : la comparaison est utile.

---

## 10. Etat d'avancement

### Fait
- Structure des cinq sections validee
- Palette et typographies validees et gelees
- VS Code et Live Server installes
- Sous-dossiers d'images crees
- Photos du couple renommees correctement
- Premiere version des trois fichiers en place, ouverture en deux volets
- Photos du couple allegees : 1600 px de large, JPEG qualite 85 progressif, remplacement
  EN PLACE (memes noms, aucune copie). Dossier `images/` : 36,4 Mo -> 5,9 Mo.
  Rotation EXIF appliquee physiquement : les fichiers etaient stockes couches, ce qui aurait
  affiche les photos de travers en ligne. Bug desarme.
- **Section Schedule construite** (contenu provisoire) : horaire 15:00-02:00 en 24 h et AM/PM,
  bloc traiteur, bloc performances, bloc mis en avant sur The Honeyrunners avec leur photo.
  Dessin du domaine en filigrane de fond.
- **Section Travel construite** : bandeau `vue-generale`, vignette de carte cliquable,
  parking, distances.
- **Vignette de carte `images/venue/carte-giez.webp`** fabriquee a partir de tuiles
  OpenStreetMap, desaturee et recolorisee dans la palette du site, marqueur cosmos sur
  le domaine. 79 Ko, hebergee par nous, aucun traceur.

- **Quiz, question 1 construite** (2026-10-03). Format compact : video 9/16 a gauche
  (200 px, 140 px sur telephone, reglee par `--quiz-w`), question a droite. Deux questions par ecran.
  Les reponses apparaissent a cote de la video a la pause (indice « Watch closely… » avant). : video `images/story/lift-to-water.mp4`
  (coupee de 0:02 a 0:16, 720 x 1280, sans son, 2,9 Mo ; original `.mov` de 77 Mo a sortir
  du projet). Pause a 9 s, question « What will Cesar do next? », bonne reponse B.
  Image d'attente `lift-to-water-poster.jpg`. Code generique : bloc `.quiz` regle par
  attributs `data-pause`, `data-answer`, `data-right`, `data-wrong`.
- **Quiz, question 2 construite** (2026-10-03) : citation « For once, can't you just do what I say! »,
  reponses Brooke / Cesar, bonne reponse Brooke. Variante `.quiz--card` sans video : cadre pine en 16/9,
  remplace au clic par `images/story/foroncedoasisay.jpg` (allegee en place : 4032 px / 4 Mo ->
  1200 x 900 / 247 Ko).
- **Quiz, question 3 construite** (2026-10-03) : « What is Brooke's favorite animal? », 4 reponses
  (A Horses, B Cats, C Cows, D Dogs — leurres choisis par Claude, modifiables), bonne reponse Cows.
  Meme variante `.quiz--card` 16/9. Photo de reponse `images/story/cows.jpg` : montage 2 x 2 de
  cow1 a cow4, 1600 x 900, filet chalk de 6 px, 322 Ko. Chaque photo (verticale) est recadree en
  bande paysage autour du visage de Brooke et des vaches ; orange en diagonale (cow1 / cow4).
  Les originaux cow1-4 ne sont pas utilises par le site.
- **Quiz, question 4 construite** (2026-10-03) : « Who carries the groceries? », A Brooke / B Cesar,
  bonne reponse Brooke. Photo `images/story/grocery.jpg` : trois bandes verticales (grocery1 a 3),
  1600 x 900, filets chalk 6 px, 372 Ko. Bulle HTML « 8 months pregnant 😬 » en bas a droite de la
  3e photo + fleche SVG pine (viewBox 1600 x 900, coordonnees = pixels de l'image) jusqu'au ventre.

### En cours
- Choix de la photo d'ouverture et reglage du cadrage. `b-c7` en place ; `b-c4` recommandee
  (visages lisibles, lumiere de fin de journee, seule photo sans pouce leve)
- Renommage des photos du domaine en minuscules sans accent
- Contenu reel de Schedule : l'horaire detaille reste a fournir

### A faire
- **PRIORITAIRE — `images/venue/buffet-traiteur.jpg` est un CACHE DE POSITION**, un rectangle
  linen barre d'une croix sage portant le mot « PLACEHOLDER ». Fabrique le 2026-09-18 parce
  qu'aucun outil de generation d'image n'etait disponible. **Ne surtout pas mettre en ligne en
  l'etat.** Deposer la vraie image **sous ce meme nom de fichier** : aucune ligne de HTML ni de
  CSS n'est alors a toucher. Format attendu : `4/3`, environ 800 x 600.
- Convertir les photos du couple en WebP. Le redimensionnement est fait, la conversion non :
  elle ferait gagner encore 25 a 35 %, mais change l'extension des fichiers et impose de
  modifier `index.html`. A traiter comme une etape a part, pas en meme temps que l'allegement.
- Decider s'il faut garder les deux cadrages `b-c2` / `b-c7`, et les deux rendus
  `b-c5` / `cesar1` (voir section 8.4). Ce ne sont pas des doublons.
- Deplacer le projet hors de OneDrive
- Our Story : questions 2 a 5 (silhouettes, Who said it?, carte de la rencontre, ticket a gratter)
  puis score final « You know us x/5 ». Q&A encore a l'etat de bloc vide
- **Le bouton RSVP de l'ouverture pointe vers `#rsvp`, une ancre qui n'existe pas.**
  Le clic ne fait rien aujourd'hui. A regler avec le formulaire.
- **Reconfirmer par ecrit les arguments du traiteur** (bio, local, boissons naturelles,
  a volonte) avant la mise en ligne — voir section 7.1.
- Demander le kit photo haute definition au domaine : `porte-ferme.webp` ne fait que
  400 px de large et `vue-generale.webp` 900 px. Suffisant aujourd'hui, juste sur grand ecran.
- Formulaire RSVP et liaison au Google Sheet
- Animations discretes au defilement
- Mise en ligne et tests sur telephones reels

---

## 11. Journal des decisions

| Date | Decision | Raison |
|---|---|---|
| 2026-09 | Page unique avec ancres, pas de pages separees | Simplicite pour les invites, une seule URL a partager |
| 2026-09 | RSVP hors de la barre de navigation | Un seul point d'entree clair, dans la section Wedding |
| 2026-09 | Palette chalk / linen / sage / pine / cosmos | Accordee aux tons du domaine ; rose reserve aux actions |
| 2026-09 | Cormorant Garamond plus Jost | Elegance classique sans police script |
| 2026-09 | Ouverture en deux volets plutot qu'en plein ecran | La photo disponible est verticale et en pied |
| 2026-09 | Texte des boutons en pine, pas en blanc | Contraste insuffisant du blanc sur cosmos |
| 2026-09 | Nombre de convives libre dans le RSVP | Cesar veut etre genereux tout en connaissant le nombre reel |
| 2026-09-14 | Le prenom s'ecrit **"Cesar"**, sans accent, partout sur le site | Choix de Cesar. Ne plus reposer la question. |
| 2026-09-17 | Photos allegees en remplacant les originaux, sans copie de sauvegarde dans le projet | Demande explicite de Cesar : aucun doublon dans ses dossiers. Originaux pleine resolution a conserver ailleurs, hors projet. |
| 2026-09-17 | Allegement en JPEG, pas en WebP | Le WebP change l'extension et impose de toucher `index.html`. Une etape a la fois. |
| 2026-09-17 | Suppression de `b-c6` et `b-c8` uniquement | Seuls doublons confirmes pixel par pixel. `b-c2`/`b-c7` et `b-c5`/`cesar1` conserves : cadrages et rendus differents, pas des doublons. |
| 2026-09-17 | "The wedding of" passe de 0,72 a 0,86 rem | Trop discret au-dessus des prenoms. Demande de Cesar. |
| 2026-09-17 | **"Cesar & Brooke" tient sur une seule ligne**, jamais deux | Demande de Cesar. Deux prenoms coupes en deux lignes affaiblissent l'ouverture. |
| 2026-09-17 | Taille des prenoms calee sur la largeur du PANNEAU (`cqi`), plus sur celle de la fenetre (`vw`) | Sur grand ecran le panneau ne fait que la moitie de l'ecran : une taille en `vw` produisait un texte trop grand pour son cadre, d'ou le retour a la ligne. `.hero__content` elargi de 400 px a 30 rem pour la meme raison. |
| 2026-09-17 | Sections **Schedule** et **Travel** construites, contenu provisoire | Le site n'avait qu'une seule section reelle. Carte et parking places dans Travel, conformement a la section 5. |
| 2026-09-17 | Horaire affiche **en 12 h uniquement** (`3:00 PM → 2:00 AM`) | Choix de Cesar. Le double affichage 24 h / AM-PM a ete essaye puis abandonne : trop lourd. Les attributs `datetime` restent en 24 h pour les machines. |
| 2026-09-17 | Vignette de carte **OpenStreetMap hebergee par nous**, pas d'iframe Google | Une carte Google integree pese 1 a 2 Mo et depose des traceurs. L'invite veut son itineraire : un clic ouvre son application de cartes. Licence ODbL : la mention « © OpenStreetMap contributors » doit rester affichee. |
| 2026-09-17 | **Une seule image en grand par ecran**, le reste en vignette | Premiere version jugee saturee par Cesar : « on doit eviter l'effet je pose un carre devant le texte en mode PowerPoint ». Regle detaillee en section 5.2. |
| 2026-09-17 | Dessin du domaine **converti en WebP**, PNG supprime | 692 Ko -> 91 Ko, soit -87 %. Le canal alpha du PNG etait entierement opaque : il ne servait a rien. Devenu une image bien visible, son poids comptait. |
| 2026-09-17 | Dessin **apparie a la vue aerienne** (« Then / Today ») | Cesar : « le dessin seul n'est pas representatif du site ». La vue aerienne donne l'echelle du domaine que le dessin ne montre pas. |
| 2026-09-17 | **Schedule entierement refaite**, carte blanche donnee par Cesar | Premiere version jugee « pas belle du tout ». Diagnostic : heterogeneite des formats, pas surcharge de contenu. Voir section 5.2. |
| 2026-09-17 | ~~Le groupe passe dans un **bandeau `--linen` pleine largeur**~~ **ANNULEE le 2026-09-18** | Empile dans la colonne, il n'etait qu'un bloc de plus. Sorti de la colonne et teinte, il devient le troisieme temps de la soiree. |
| 2026-09-17 | `porte-ferme.webp` **retiree** de Schedule | Une image de trop. C'est l'accumulation qui saturait la section. |
| 2026-09-17 | Marge laterale portee par `.section__inner`, plus par `.section` | Permet a un bandeau de s'etendre sur toute la largeur de l'ecran tout en restant dans sa section. Motif reutilisable pour les sections suivantes. |
| 2026-09-18 | **Regle 5.2.1 reecrite** : « une seule FORME d'image par section », au lieu de « une seule zone image ». Plusieurs vignettes sont admises si leur format est rigoureusement identique. | La regle interdisait ce qu'elle voulait permettre. Le diagnostic de la Schedule rejetee visait l'heterogeneite des formats, pas leur nombre. Demande de Cesar d'illustrer les trois temps. |
| 2026-09-18 | **Une vignette `4/3` de 260 px pour 01 The table et 02 The stage**, au meme format que celle du groupe | Les trois temps forment desormais une serie. Une vignette posee avant le numero aligne les chiffres `01` et `02` sur la meme ligne. |
| 2026-09-18 | `brooke-perform.jpg` retenue pour **02 The stage**, bien que ce ne soit pas une photo de scene | Portrait au coucher de soleil, tons chauds accordes au rose cosmos. Signale a Cesar avant integration : elle evoque les artistes, elle ne les montre pas. Choix assume. |
| 2026-09-18 | **Rappel `Saturday 28 August 2027 · La Ferme de Gy, Giez` en tete de Schedule** | Demande de Cesar. Un invite qui arrive par une ancre, ou qui revient juste consulter l'horaire, n'a pas l'ouverture sous les yeux. En petites capitales sage : repere, pas titre. |
| 2026-09-18 | **Cadre de la bande « Then / Today » cale sur le format natif du dessin (`1337/802`)**, a toutes les largeurs. L'exception mobile `4/3` est supprimee | Cesar : « la hauteur de la photo Then et Today n'est pas la meme et ca se voit, surtout en version mobile ». Le dessin, affiche en `contain`, laissait 20 % de vide en haut et en bas sur mobile. Solution retenue plutot que le rognage demande : rogner en `4/3` aurait coute 20 % de la largeur du dessin. Le scan n'a aucune marge blanche, donc caler le cadre suffit. |
| 2026-09-18 | **Les trois temps passent sur une seule ligne**, en trois colonnes egales. Le bandeau `--linen` du groupe est supprime, ainsi que tout le CSS `.band*` | Demande de Cesar. Annule la decision du 2026-09-17. Elle n'est plus valable : le bandeau existait pour detacher `03`, seul bloc a porter une image. Depuis que les trois partagent la meme vignette, il separait le groupe de ses deux freres au lieu de le distinguer. |
| 2026-09-18 | **Bande « Then / Today » bridee de 1080 a 640 px**, la largeur exacte de l'horaire | Demande de Cesar : « il faut que la photo Then/Today soit plus petite, pas plus large que le 3PM 2AM ». A 1080 px elle ecrasait la section. Le rappel du jour, l'horaire et la bande partagent desormais une meme colonne centrale de 640 px. |
| 2026-09-18 | **Les deux moities restent deux fichiers**, pas une image fusionnee | Cesar avait envisage de les rassembler en une seule photo. Inutile : elles sont deja jointives, donc visuellement un seul objet. Les fusionner ferait perdre le `contain` et le `mix-blend-mode: multiply` propres au dessin, et le fond de scan blanchatre reapparaitrait. |
| 2026-09-18 | **Cache de position pour l'image du traiteur**, sous son nom definitif | Aucun outil de generation d'image disponible dans la session. Le nom definitif evite d'avoir a retoucher le code au moment du remplacement. Consigne en section 10 pour qu'il ne parte pas en ligne par oubli. |
| 2026-09-17 | **Esperluette du hero en romain, plus en italique** | L'italique de Cormorant Garamond dessine une esperluette calligraphique que Cesar ne reconnaissait pas comme un "&". **Exception assumee a la regle 4.2** (l'italique reste la touche manuscrite partout ailleurs). Le caractere HTML `&amp;` etait correct : le probleme etait le dessin de la police, pas le signe. |
| 2026-10-03 | **Our Story devient un jeu de cinq questions interactives**, une par moment de l'histoire, dans un cadre commun | Idee de Cesar. Une seule forme de cadre pour les cinq, conformement a la regle 5.2. |
| 2026-10-03 | **Pas de pourcentage des autres invites**, seulement juste / faux et un score final | Un site statique ne connait pas les reponses des autres. Option Google Sheet ecartee pour l'instant, a reconsiderer apres le RSVP. |
| 2026-10-03 | **Video sans son, demarrage automatique quand elle est visible aux deux tiers**, pas de bouton lecture | Demande de Cesar. Muette, elle peut demarrer seule sur tous les navigateurs. Bouton de secours affiche seulement si le telephone refuse (economie d'energie) ou si l'invite a demande moins d'animations. |
| 2026-10-03 | **Our Story renommee Quiz** (titre, menu, ancre `#quiz`) ; intro : « Five ordinary moments captured from our life together. Get all five right and win! » | Demande de Cesar. |
| 2026-10-03 | **Video reduite et question placee A COTE**, plus en surimpression | Demande de Cesar : avec cinq questions, le format pleine hauteur faisait trop defiler. Objectif : deux questions dans un ecran. A 140-200 px de large, la question ne tenait plus sur l'image. |
| 2026-10-03 | **Question 2 en rectangle horizontal (4/3), et non en cadre vertical 9/16 comme la question 1** | Demande explicite de Cesar. **Entorse assumee a la regle 5.2** (une seule forme d'image par section) : la photo a reveler est horizontale. Le « noir » est le vert pine de la palette. Cadre bride a 480 px, bord gauche aligne sur les autres questions. |
| 2026-10-03 | **Question 2 refaite** : cadre 16/9 pleine largeur (bords alignes sur la question 1), photo rognee en CSS (`object-position: center 8%`, fichier intact), reponses A Brooke / B Cesar SOUS le cadre, au meme style que la question 1. **Bulle** creme « For once… » a droite du visage de Brooke, apparait 0,9 s apres la photo | Demande de Cesar : montage « beau, pas un collage Paint ». La bulle est du texte HTML pose sur la photo, pas incrustee dans l'image : nette sur tout ecran, reglable en CSS. Remplace la decision precedente du cadre 4/3 bride a 480 px. |
| 2026-10-03 | **« Question 1 / 5 » devient « Quiz 1 / 5 »**, en etiquette posee dans le coin haut gauche de la video / photo | Demande de Cesar. Pastille pine semi-opaque + flou, texte creme : lisible sur fond clair comme sombre. Orthographe anglaise « Quiz » (Cesar avait ecrit « Quizz »). |
| 2026-10-03 | **Question 3 : quatre reponses** (une ligne de 4 sur ordinateur, 2 x 2 sur telephone) et montage 2 x 2 des photos de vaches | Cesar n'avait donne que la bonne reponse. Quatre choix rendent la devinette moins evidente qu'un pile ou face ; une seule ligne sur ordinateur garde deux questions par ecran. Grille 2 x 2 plutot que 4 bandes verticales : en bandes de 4/9, les vaches etaient coupees. |
| 2026-10-03 | **Annotation de la question 4 : bulle en HTML, fleche en SVG** | Un premier essai tout en SVG rendait le texte illisible sur telephone (il retrecit avec la photo). La bulle HTML garde une taille de texte lisible ; la fleche SVG suit l'image. Fleche pine, pas creme : elle passe sur un sol clair. Bulle posee sur le sol, sous Brooke, pour ne couvrir personne. |

---

## 12. Captures d'ecran

| Fichier | Date | Ce qu'on voit | Statut |
|---|---|---|---|
| _(a completer)_ | | | |

---

## 13. Questions ouvertes

- Ordre des prenoms : "Cesar & Brooke" ou "Brooke & Cesar" ? Le code utilise actuellement
  Cesar & Brooke.
- Une seance photo de fiancailles est-elle prevue ? Cela debloquerait l'ouverture plein ecran.
- Nombre approximatif d'invitations a prevoir pour les codes RSVP.
- Date limite de reponse au RSVP.
- Email de contact et numero du jour J a afficher en pied de page.
