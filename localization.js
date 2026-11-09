/* WohnPlan language pack — Created by MS. Display-only translation; saved project data is unchanged. */
(function () {
  'use strict';
  var KEY = 'WohnPlan_Web_Language';
  var language = 'de';
  try { language = localStorage.getItem(KEY) === 'en' ? 'en' : 'de'; } catch (_) {}
  var phrases = [
    ['Werkzeuge','Tools'],['Menü schließen','Close menu'],['Werkzeugmenü','Tools menu'],
    ['📐 Planen','📐 Plan'],['🛋 Einrichten','🛋 Furnish'],
    ['Planen','Plan'],['Einrichten','Furnish'],['Räume & Wände','Rooms & walls'],
    ['Raum hinzufügen','Add room'],['Tür einfügen','Add door'],['Fenster einfügen','Add window'],
    ['Einrichtung','Furniture'],['Möbelkatalog öffnen','Open furniture catalog'],
    ['Möbelgruppe einfügen','Add furniture group'],['Anzeige','Display'],
    ['Raster anzeigen','Show grid'],['Magnetisches Raster','Snap to grid'],
    ['Bemaßung anzeigen','Show dimensions'],['Hinweis','Tip'],
    ['Objekt antippen und ziehen. Mit den blauen Griffen Möbel vergrößern. Türen und Fenster lassen sich nur entlang ihrer Wand verschieben.',
     'Tap and drag an object. Use the blue handles to resize furniture. Doors and windows can only move along their wall.'],
    ['Kein Raum','No room'],['Export','Export'],['Projekte','Projects'],
    ['Rückgängig','Undo'],['Wiederholen','Redo'],['Projektübersicht öffnen','Open projects'],
    ['Neuer Grundriss','New floor plan'],['Werkzeugmenü','Tools menu'],['Einführung anzeigen','Show introduction'],
    ['Grundriss zentrieren','Fit floor plan'],['Vergrößern','Zoom in'],['Verkleinern','Zoom out'],
    ['Tippe auf einen Raum, ein Möbel, eine Tür oder ein Fenster.','Tap a room, furniture, a door or a window.'],
    ['Tippe ein Element an · Auf freier Fläche ziehen: Grundriss verschieben · Zwei Finger: Zoomen',
     'Select an object · Drag the background to pan · Pinch with two fingers to zoom'],
    ['Raum bearbeiten','Edit room'],['Möbel bearbeiten','Edit furniture'],
    ['Tür bearbeiten','Edit door'],['Fenster bearbeiten','Edit window'],
    ['Maße','Dimensions'],['✎ Größe','✎ Size'],['✎ Position','✎ Position'],
    ['Verschieben','Move'],['↻ Drehen','↻ Rotate'],['⇄ Spiegeln','⇄ Mirror'],
    ['⇄ Anschlag','⇄ Hinge'],['⊕ Kopieren','⊕ Duplicate'],['🗑','🗑'],
    ['Nach innen','Open inward'],['Nach außen','Open outward'],
    ['🔓 Entsperren','🔓 Unlock'],['🔒 Sperren','🔒 Lock'],
    ['Entsperren','Unlock'],['Sperren','Lock'],['Löschen','Delete'],
    ['Abbrechen','Cancel'],['Speichern','Save'],['Übernehmen','Apply'],
    ['Geöffnet','Open'],['Öffnen','Open'],['Kopieren','Duplicate'],
    ['Projekt bearbeiten','Edit project'],['Projektname','Project name'],
    ['In Ordner verschieben','Move to folder'],['Ordner','Folder'],
    ['Ohne Ordner','No folder'],['Ordnername','Folder name'],['Ordner anlegen','Create folder'],
    ['Projektordner anlegen','Create project folder'],['Projekt löschen','Delete project'],
    ['In Papierkorb verschieben','Move to trash'],['Endgültig löschen','Delete permanently'],
    ['Wiederherstellen','Restore'],['Erstellen','Create'],['Neuer Ordner','New folder'],
    ['Deine WohnPlan-Projekte','Your WohnPlan projects'],['Alle Projekte','All projects'],
    ['Papierkorb','Trash'],['Zurück zu Projekten','Back to projects'],
    ['Keine Projekte in dieser Ansicht.','No projects in this view.'],
    ['Erstelle einen neuen Grundriss oder wähle einen anderen Ordner.',
     'Create a new floor plan or select another folder.'],
    ['Jedes Projekt startet mit einer leeren Zeichenfläche. Danach kannst du Räume oder Raumvorlagen hinzufügen.',
     'Every project starts with an empty canvas. Then add rooms or room templates.'],
    ['Das Projekt wird zunächst in den Papierkorb verschoben und kann dort wiederhergestellt werden.',
     'The project moves to the trash first, where it can be restored.'],
    ['Neuen Raum erstellen','Create room'],['Vorlage','Template'],['Raumname','Room name'],
    ['Form','Shape'],['Rechteck','Rectangle'],['L-Form','L shape'],['Individuell','Custom'],
    ['Länge in cm','Length (cm)'],['Breite in cm','Width (cm)'],
    ['Länge (cm)','Length (cm)'],['Breite (cm)','Width (cm)'],
    ['L-Aussparung Breite (cm)','L cut-out width (cm)'],
    ['L-Aussparung Tiefe (cm)','L cut-out depth (cm)'],
    ['Mehrere Räume lassen sich nebeneinander anordnen. Rechtecke und L-Formen sind möglich.',
     'You can arrange multiple rooms side by side. Rectangles and L shapes are supported.'],
    ['Raumfläche','Room area'],['Bezeichnung','Name'],['Tiefe (cm)','Depth (cm)'],
    ['Position X (cm)','X position (cm)'],['Position Y (cm)','Y position (cm)'],
    ['Wand','Wall'],['Wand 1','Wall 1'],
    ['Abstand ab Wandanfang (cm)','Distance from wall start (cm)'],
    ['Türbreite','Door width'],['Fensterbreite','Window width'],
    ['Türbreite (cm)','Door width (cm)'],['Fensterbreite (cm)','Window width (cm)'],
    ['Öffnungsrichtung','Swing direction'],['Anschlag','Hinge side'],
    ['Links','Left'],['Rechts','Right'],
    ['Tür und Fenster können im Grundriss mit dem Finger entlang ihrer Wand gezogen werden.',
     'Drag doors and windows along their wall in the floor plan.'],
    ['Die Außenwände kannst du auch direkt an den blauen Punkten verschieben.',
     'You can resize outer walls by dragging the blue handles.'],
    ['Du kannst Breite und Tiefe auch direkt an den vier blauen Ziehpunkten verändern.',
     'You can also change width and depth using the four blue handles.'],
    ['Tür einsetzen','Insert door'],['Fenster einsetzen','Insert window'],
    ['Einsetzen','Insert'],['Position ab Wandanfang (cm)','Position from wall start (cm)'],
    ['Breite in cm','Width (cm)'],['Öffnet','Opens'],
    ['Wähle eine Wand und die ungefähre Position. Danach kannst du das Element direkt mit dem Finger entlang der Wand verschieben.',
     'Choose a wall and an approximate position. Then drag the opening along the wall.'],
    ['Möbelkatalog · 2D-Vorschau','Furniture catalog · 2D preview'],
    ['Möbel suchen: Sofa, TV, Esstisch …','Search furniture: sofa, TV, dining table …'],
    ['Suche löschen','Clear search'],
    ['Das Möbel erscheint nach der Auswahl als Vorschau im Plan. Tippe dann an die gewünschte Stelle zum Einfügen.',
     'Your furniture appears as a preview on the plan. Tap where you want to place it.'],
    ['Keine Möbel gefunden. Ändere die Suche oder Kategorie.',
     'No furniture found. Try another search or category.'],
    ['Favorit','Favorite'],['Favoriten','Favorites'],['Zuletzt','Recent'],['Alle','All'],
    ['Wohnen','Living room'],['Schlafen','Bedroom'],['Essen','Dining room'],['Küche','Kitchen'],
    ['Bad','Bathroom'],['Büro','Office'],['Kinder','Kids'],['Flur','Hallway'],
    ['Outdoor','Outdoor'],['Elektronik','Electronics'],['Sonstiges','Other'],
    ['Sofas','Sofas'],['Sessel','Armchairs'],['Couchtische','Coffee tables'],
    ['Esstische','Dining tables'],['Betten','Beds'],['Schränke','Wardrobes'],
    ['Küchenmodule','Kitchen units'],['Geräte','Appliances'],['Sanitär','Bathroom fixtures'],
    ['Schreibtische','Desks'],['Stühle & Bänke','Chairs & benches'],
    ['Eigene Möbel','Custom furniture'],['Schränke & Regale','Cabinets & shelves'],
    ['Teppiche','Rugs'],['Kindermöbel','Kids furniture'],
    ['Weitere Möbel','More furniture'],['Haushalt','Household'],
    ['Badmöbel','Bathroom furniture'],['Aufbewahrung','Storage'],
    ['Sitzmöbel','Seating'],['Dekoration','Decoration'],['Garderobe','Coat racks'],
    ['Hobbys','Hobbies'],['Fernseher','Televisions'],['Audio','Audio'],
    ['Computer','Computers'],['Arbeitsplätze','Workstations'],['Ausstattung','Equipment'],
    ['Gartenmöbel','Garden furniture'],
    ['Möbelgruppe auswählen','Select furniture group'],
    ['Sofaecke','Sofa set'],['Essgruppe · 4 Personen','Dining set · 4 people'],
    ['Arbeitsplatz','Workspace'],['Schlafzimmer-Set','Bedroom set'],
    ['Leerer Grundriss','Empty floor plan'],['Möbelgruppe eingefügt','Furniture group added'],
    ['Export & Sicherheit','Export & backup'],
    ['Mit einem Backup kannst du WohnPlan-Projekte zwischen iPad und Windows übertragen. Alle Änderungen werden auch lokal im jeweiligen Browser gespeichert.',
     'A backup lets you transfer WohnPlan projects between devices. Changes are also saved locally in this browser.'],
    ['Projekt-Backup als JSON','Export project backup (JSON)'],
    ['Für andere Geräte und als zusätzliche Sicherung','For other devices and extra safety'],
    ['Backup importieren','Import backup'],['Ersetzt nach Bestätigung die Web-Projekte','Replaces local projects after confirmation'],
    ['Grundriss als PNG speichern','Save floor plan as PNG'],
    ['Sauberes Bild des gesamten Plans','Clean image of the complete plan'],
    ['Drucken / als PDF sichern','Print / save as PDF'],
    ['Im Druckdialog „Als PDF speichern“ auswählen','Select “Save as PDF” in the print dialog'],
    ['Willkommen bei WohnPlan! 🏠','Welcome to WohnPlan! 🏠'],
    ['Räume planen','Plan rooms'],['Möbel einrichten','Furnish rooms'],
    ['Direkt mit dem Finger arbeiten','Work directly by touch'],
    ['Automatisch speichern','Automatic saving'],['Loslegen!','Get started!'],
    ['Mit „Raum hinzufügen“ ein Rechteck oder eine L-Form anlegen und Maße eingeben.',
     'Select “Add room” to create a rectangle or L shape and enter dimensions.'],
    ['Vollbild-Möbelkatalog öffnen, 2D-Vorschau auswählen und an der gewünschten Stelle einsetzen.',
     'Open the full-screen catalog, select a 2D preview and place it on the plan.'],
    ['Möbel ziehen, an blauen Ecken vergrößern, Türen und Fenster an Wänden verschieben. Mit zwei Fingern zoomen.',
     'Drag furniture, resize it at blue corners, slide doors and windows along walls, and pinch to zoom.'],
    ['WohnPlan speichert lokal in diesem Browser. Exportiere regelmäßig ein Backup für den Gerätewechsel und zur Datensicherung.',
     'WohnPlan saves locally in this browser. Export backups regularly for switching devices and protecting your data.'],
    ['Einstellungen','Settings'],['Sprache','Language'],['Deutsch','German'],
    ['Englisch','English'],['Versionshinweise','Release notes'],
    ['Sprache auswählen','Choose language'],['App-Version','App version'],
    ['Änderungen werden automatisch auf diesem Gerät gespeichert.',
     'Changes are saved automatically on this device.'],
    ['Neuerungen in Version 1.0.1','What is new in version 1.0.1'],
    ['Planen: Räume, Türen und Fenster. Einrichten: Möbel und Möbelgruppen.',
     'Plan: rooms, doors and windows. Furnish: furniture and furniture groups.'],
    ['Neue Spracheinstellung: Deutsch und Englisch.',
     'New language setting: German and English.'],
    ['Versionshinweise in den Einstellungen.',
     'Release notes are now available in Settings.'],
    ['Deine Projekte und Backups bleiben erhalten.',
     'Your projects and backups are preserved.'],
    ['Schließen','Close'],['✓ Gespeichert','✓ Saved'],['● Bereit','● Ready'],
    ['● Speichern …','● Saving …'],['⚠ Speichern fehlgeschlagen','⚠ Save failed'],
    ['Projekt wiederhergestellt','Project restored'],
    ['Neuer Grundriss erstellt','New floor plan created'],
    ['Raum hinzugefügt','Room added'],['Möbel eingesetzt','Furniture placed'],
    ['Vorschau verschieben und in den Raum tippen.','Move the preview and tap inside the room.'],
    ['Bitte zuerst einen Raum hinzufügen','Please add a room first'],
    ['Raum ist gesperrt','Room is locked'],['Dieses Element ist gesperrt','This object is locked'],
    ['Erst entsperren','Unlock first'],['Bitte erst entsperren','Please unlock first'],
    ['Ziehe den Raum direkt auf der Planfläche.','Drag the room directly on the plan.'],
    ['Backup-Datei zum Speichern bereit','Backup file ready to save'],
    ['Bildexport nicht verfügbar','Image export unavailable'],
    ['Bildexport nicht möglich','Image export failed'],
    ['Lokaler Speicher ist nicht verfügbar – bitte Backup exportieren.',
     'Local storage is unavailable – please export a backup.'],
    ['Dieses Projekt endgültig löschen? Das kann nicht rückgängig gemacht werden.',
     'Delete this project permanently? This cannot be undone.'],
    ['Projekt in den Papierkorb verschieben?','Move project to trash?']
  ];
  var catalog = {
    sofa:'3-seat sofa',sessel:'Armchair',couchtisch:'Rectangular coffee table',esstisch:'Rectangular dining table',
    bett:'Double bed',schrank:'Wardrobe',kommode:'Chest of drawers',kueche:'Kitchen counter',
    kuehlschrank:'Refrigerator',spuele:'Kitchen sink',dusche:'Shower',wc:'Toilet',
    schreibtisch:'Desk',stuhl:'Chair',eigenes:'Custom furniture',
    sofaZwei:'2-seat sofa',sofaEcke:'Left corner sofa',sofaU:'U-shaped sofa',sofaSchlaf:'Sofa bed',
    sofaModul:'Modular sofa',hocker:'Stool',tvMoebel:'TV console',regal:'Living room shelf',
    beistelltisch:'Side table',teppich:'Rectangular rug',einzelbett:'Single bed',
    kingbett:'King-size bed',hochbett:'Loft bed',kinderbett:'Child bed',
    nachttisch:'Bedside table',sideboard:'Sideboard',garderobe:'Coat rack',
    esstischRund:'Round dining table',essbank:'Dining bench',barhocker:'Bar stool',
    vitrine:'Display cabinet',kuecheninsel:'Kitchen island',herd:'Stove',
    geschirrspueler:'Dishwasher',waschmaschine:'Washing machine',trockner:'Dryer',
    mikrowelle:'Microwave',badewanne:'Bathtub',waschbecken:'Sink',
    doppelwaschbecken:'Double sink',badschrank:'Bathroom cabinet',
    schreibtischEcke:'Corner desk',buecherregal:'Bookshelf',buerostuhl:'Office chair',
    aktenschrank:'Filing cabinet',pflanze:'Houseplant',raumteiler:'Room divider',
    bank:'Bench',klavier:'Piano',fitnessgeraet:'Fitness machine',
    sofaVier:'4-seat sofa',sofaChester:'Chesterfield sofa',sofaEckeRechts:'Right corner sofa',
    sofaPanorama:'Sectional sofa',relaxsessel:'Recliner',ohrensessel:'Wingback chair',
    fernsehsessel:'TV recliner',couchtischRund:'Round coffee table',
    couchtischOval:'Oval coffee table',wohnwand:'Entertainment wall',kamin:'Fireplace',
    teppichRund:'Round rug',teppichLaeufer:'Runner rug',
    tvKlein:'32-inch television',tvGross:'65-inch television',tvWand:'Wall-mounted TV',
    tvMitLowboard:'TV with console',lautsprecher:'Floor speaker',soundbar:'Soundbar',
    spielekonsole:'Game console',esstischQuadrat:'Square dining table',
    esstischOval:'Oval dining table',esstischAusziehbar:'Extendable dining table',
    esstischFamilie:'Family dining table · 8 seats',bartisch:'Bar-height table',
    armlehnstuhl:'Armchair dining chair',polsterstuhl:'Upholstered dining chair',
    eckbank:'Corner bench',buffetschrank:'Buffet cabinet',boxspringbett:'Box-spring bed',
    etagenbett:'Bunk bed',schwebetuerenschrank:'Sliding-door wardrobe',
    eckschrank:'Corner wardrobe',schminktisch:'Vanity table',sitztruhe:'Bed bench',
    kuechenEcke:'Corner kitchen unit',kuechenHochschrank:'Tall kitchen cabinet',
    kuechenOberschrank:'Upper kitchen cabinet',backofen:'Oven',
    dunstabzug:'Extractor hood',doppelspuele:'Double kitchen sink',
    barTheke:'Bar counter',eckdusche:'Corner shower',duscheGross:'Walk-in shower',
    badewanneEcke:'Corner bathtub',bidet:'Bidet',spiegelschrank:'Mirror cabinet',
    handtuchheizkoerper:'Towel radiator',monitor:'Monitor',monitorDoppel:'Dual monitors',
    pc:'Desktop PC',laptop:'Laptop',schreibtischPC:'Desk with PC',
    schreibtischLaptop:'Laptop workstation',gamingTisch:'Gaming desk',
    schreibtischHoehenverstellbar:'Height-adjustable desk',
    schreibtischDoppel:'Double desk',drucker:'Printer',rollcontainer:'Mobile drawer unit',
    wickeltisch:'Changing table',kinderschreibtisch:'Kids desk',spielzeugregal:'Toy shelf',
    spielteppich:'Play rug',spielkueche:'Play kitchen',spielzelt:'Play tent',
    schuhschrank:'Shoe cabinet',flurspiegel:'Wall mirror',schirmstaender:'Umbrella stand',
    gartenSofa:'Outdoor sofa',gartenTisch:'Garden table',liegestuhl:'Sun lounger',
    sonnenschirm:'Parasol',grill:'Grill',pflanzkuebel:'Planter',
    heizkoerper:'Radiator',wandschrank:'Built-in cupboard',fluegel:'Grand piano'
  };
  var dict = Object.create(null);
  phrases.forEach(function(p) { dict[p[0]] = p[1]; });
  var originalTexts = new WeakMap();
  var originalAttributes = new WeakMap();
  function lookup(raw) {
    if (language !== 'en') return raw;
    var s = String(raw || '');
    var m = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
    var core = m ? m[2] : s;
    var translated = dict[core];
    if (!translated && /^🗑 Papierkorb \(\d+\)$/.test(core))
      translated = core.replace('Papierkorb', 'Trash');
    if (!translated && /^↩ Zurück zu Projekten$/.test(core))
      translated = '↩ Back to projects';
    if (!translated && /^\d+ Räume · /.test(core))
      translated = core.replace('Räume', 'rooms');
    if (!translated && /^\d+ Möbel gleichzeitig einfügen$/.test(core))
      translated = core.replace('Möbel gleichzeitig einfügen', 'furniture items at once');
    if (!translated && /^Raster 10\/50 cm/.test(core))
      translated = core.replace('Raster', 'Grid');
    if (!translated && /^Wand \d+/.test(core))
      translated = core.replace('Wand', 'Wall');
    if (!translated && /^Raumfläche: /.test(core))
      translated = core.replace('Raumfläche', 'Room area');
    if (!translated && /^PNG-Fehler: /.test(core))
      translated = core.replace('PNG-Fehler', 'PNG error');
    if (!translated && /^Import fehlgeschlagen: /.test(core))
      translated = core.replace('Import fehlgeschlagen', 'Import failed');
    if (!translated && /^WohnPlan-Sicherung importiert$/.test(core))
      translated = 'WohnPlan backup imported';
    if (!translated && /^Kein Raum ausgewählt$/.test(core))
      translated = 'No room selected';
    return (m ? m[1] : '') + (translated || core) + (m ? m[3] : '');
  }
  // Text nodes are translated visually only. Internal IDs, option values and
  // objects in localStorage remain German for backward compatibility.
  function translateTextNode(node) {
    if (!node || !node.parentElement) return;
    var parent = node.parentElement;
    if (parent.closest('svg,script,style,textarea')) return;
    var raw = node.nodeValue || '';
    if (!raw.trim()) return;
    var memo = originalTexts.get(node);
    if (!memo || raw !== memo.last) memo = { source: raw, last: raw };
    var target = lookup(memo.source);
    if (parent.tagName === 'OPTION' && !parent.hasAttribute('value'))
      parent.setAttribute('value', memo.source.trim());
    memo.last = target;
    originalTexts.set(node, memo);
    if (raw !== target) node.nodeValue = target;
  }
  function translateAttributes(el) {
    if (!el || !el.getAttribute || el.closest('svg,script,style')) return;
    ['title','placeholder','aria-label'].forEach(function(attr) {
      var raw = el.getAttribute(attr);
      if (raw === null) return;
      var memo = originalAttributes.get(el) || {};
      var entry = memo[attr];
      if (!entry || raw !== entry.last) entry = { source:raw, last:raw };
      var translated = lookup(entry.source);
      entry.last = translated;
      memo[attr] = entry;
      originalAttributes.set(el, memo);
      if (raw !== translated) el.setAttribute(attr, translated);
    });
  }
  function walk(node) {
    if (!node) return;
    if (node.nodeType === 3) { translateTextNode(node); return; }
    if (node.nodeType !== 1) return;
    if (node.closest('svg,script,style')) return;
    translateAttributes(node);
    for (var child = node.firstChild; child; child = child.nextSibling) walk(child);
  }
  var busy = false;
  var observer = new MutationObserver(function(records) {
    if (busy) return;
    busy = true;
    try {
      records.forEach(function(rec) {
        if (rec.type === 'characterData') translateTextNode(rec.target);
        if (rec.type === 'childList') rec.addedNodes.forEach(walk);
      });
    } finally { busy = false; }
  });
  function setLanguage(code) {
    language = code === 'en' ? 'en' : 'de';
    try { localStorage.setItem(KEY, language); } catch (_) {}
    document.documentElement.lang = language === 'en' ? 'en' : 'de';
    walk(document.body);
  }
  function catalogName(item) {
    return language === 'en' ? (catalog[item.id] || item.name) : item.name;
  }
  // Keep translations readable for confirmations and text added by dialogs.
  window.WP_I18N = {
    language:function(){ return language; },
    setLanguage:setLanguage,
    translate:lookup,
    catalogName:catalogName,
    refresh:function(){ walk(document.body); }
  };
  document.documentElement.lang = language;
  observer.observe(document.body,{subtree:true,childList:true,characterData:true});
  walk(document.body);
})();
