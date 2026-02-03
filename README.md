# Olele Academy

Site vitrine (e-commerce, formations, coaching). Ce README décrit la structure du projet pour qu’un autre développeur s’y retrouve facilement.

---

## Structure du projet

```
oll dev/
├── index.html              # Page d’accueil
├── profil.html             # Page Profil
├── formations.html          # Page Formations
├── coaching.html           # Page Coaching
├── resultats.html          # Page Résultats
├── contact.html            # Page Contact
├── style.css               # Feuille de style actuelle (à migrer vers assets/css si besoin)
├── main.js                 # Script actuel (à migrer vers assets/js si besoin)
├── README.md               # Ce fichier
│
└── assets/
    ├── css/                 # Feuilles de style par page (à remplir)
    │   ├── global.css       # Styles communs
    │   ├── index.css        # Accueil
    │   ├── profil.css
    │   ├── formations.css
    │   ├── coaching.css
    │   ├── resultats.css
    │   └── contact.css
    │
    ├── js/                  # Scripts par page (à remplir)
    │   ├── global.js        # Logique commune
    │   ├── index.js
    │   ├── profil.js
    │   ├── formations.js
    │   ├── coaching.js
    │   ├── resultats.js
    │   └── contact.js
    │
    └── images/              # Toutes les images du site
        ├── logo/            # Logos
        ├── hero/            # Bannières / sections hero
        ├── profil/          # Visuels page Profil
        ├── formations/      # Visuels Formations
        ├── coaching/        # Visuels Coaching
        ├── resultats/       # Captures, graphiques, preuves
        ├── temoignages/     # Photos ou visuels témoignages
        └── icons/           # Icônes
```

---

## Changements effectués (à ce jour)

### 1. Pages HTML (racine)
- **index.html** : page d’accueil existante (sections : hero, stats, profil, résultats, etc.).
- **profil.html**, **formations.html**, **coaching.html**, **resultats.html**, **contact.html** : pages créées avec le même header (logo, nav, thème, menu burger) et un bloc `<main>` à compléter. Elles pointent encore vers `style.css` et `js/script.js` (à adapter si tu bascules sur les fichiers dans `assets/`).

### 2. Dossier `assets/css/`
- Un fichier CSS par page : **global.css**, **index.css**, **profil.css**, **formations.css**, **coaching.css**, **resultats.css**, **contact.css**.
- Contenu minimal (commentaires) pour l’instant ; à remplir au fur et à mesure.

### 3. Dossier `assets/js/`
- Un fichier JS par page : **global.js**, **index.js**, **profil.js**, **formations.js**, **coaching.js**, **resultats.js**, **contact.js**.
- Même principe : fichiers vides avec un en-tête commenté, à compléter plus tard.

### 4. Dossier `assets/images/`
- Sous-dossiers thématiques pour ranger les images :
  - **logo/** – logos
  - **hero/** – visuels des bannières
  - **profil/** – images de la page Profil
  - **formations/** – visuels Formations
  - **coaching/** – visuels Coaching
  - **resultats/** – captures / preuves de résultats
  - **temoignages/** – visuels pour les témoignages
  - **icons/** – icônes

---

## Pour un autre dev

- **Pages** : une page HTML par section (accueil, profil, formations, etc.) à la racine.
- **Styles** : prévoir `global.css` pour le commun, puis un CSS par page dans `assets/css/`. Actuellement les pages chargent encore `style.css` à la racine.
- **Scripts** : idem dans `assets/js/` (global + un JS par page). Les pages référencent encore `js/script.js` si ce dossier existe.
- **Images** : tout va dans `assets/images/`, en utilisant les sous-dossiers selon le type (logo, hero, profil, etc.).

Ce README sera mis à jour au fur et à mesure de l’avancement du projet.
