Sitebuilder template
===================


Futtató környezet beállítása
-------------
(Ezekre a lépésekre csak akkor van szükség, ha szeretnénk a gépünkön futtatni a projektet, ha csak css-t kell módosítani vagy képeket cserélni ez a rész kihagyható.)

Add hozzá a következő sorokat a vhost fájlodhoz:

```
#########################################################################
#### Website
#########################################################################

<VirtualHost *:80>
  ServerAdmin webmaster@localhost
  DocumentRoot "c:/wamp/www/PATH_TO_ROOT_FOLDER/"
  ServerName website.local
  ErrorLog "logs/website.log"
  CustomLog "logs/website.log" common
</VirtualHost>
```
Cseréld ki a PATH_TO_ROOT_FOLDER placeholdert a saját mappaszerkezetednek megfelelően.
```
c:/wamp/www/website/
```

Nyisd meg a c:\Windows\System32\drivers\etc\hosts filet és add  hozzá a következő sorokat:
```
#Website
127.0.0.1 website.local
```

Írd át a Gruntfile.js-be a `website.local` url a projekt url-ére.

Grunt használata
-------------

Amennyiben még nem történt meg az első parancs, amit ki kell adnod az **npm install**. Ezzel telepíted a szükséges függőségeket.

A következő funkciókat biztosítja a grunt:

 - sass fordítás,
 - autoprefix (nincs szükség külön kiírni a sass fájlokban a vendor prefixeket pl.: -moz-)
 - imagemin
 - borwser sync
 - concat
 - sprite generator
 - uglify js
 - autoprefixer

Szükséges módosítások a Grunfile.js fájlban:
Ha új frontend függőséget adsz hozzá a projekthez, azokat a fájlokat, amik szükségesek a projekt futásához, add hozzá a **concat** objektumhoz.

**grunt**: elindítja a browserSyncet és a watch taskot

**grunt watch**: elindítja az összes taskot, amire a fejlesztés során szükséged lehet.

**grunt build**:  lefordítja a sass fájlokat, tömöríti a képeket, legenerálja az új spriteot, tömöríti a js fájlokat.

Ha csak egy részfeladatra van szükséged, akkor a **Gruntfile.js** fájlban megtalálhatod a többi parancsot.

Képek a projektben
-------------
A képek tömörítése miatt a forrásképeket nem a `dist` mappában, hanem az `src` mappában tároljuk. Innen az npm tömörítés után létrehoz egy példányt a fájlról a ``dist` mappában. Az útvonalak az alábbiak alapján alakulnak:

 - src/images -> dist/images

Sprite generálás:
A projekt automatikusan generálja a spriteot a `src/icons` mappában található képekből. Minden képhez a fájlnév alapján generál sass változókat és css szabályokat, amiket például az alábbi módon használhatunk:

```html
<i class="icon icon--FILENAME"><i>
```
ebben az esetben az elem háttérképe az ikonunk lesz, a megfelelő background-position, width, height ... beállításokkal együtt.

elérhető a következő két mixin is:
```
addIconBefore($FILENAME);
addIconAfter($FILENAME);
```
A before vagy after pseudo elembe állítja be a szükséges css szabályokat, hogy megjelenjen az ikonunk.

Livereload
-------------
`</bod>` tag elé illesszük be a következő kódot: `<script src="//localhost:35729/livereload.js"></script>`

