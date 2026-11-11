/* WohnPlan Web 1.5.1 – floor materials, richer colours, favourites | Created by MS */
(function(){
'use strict';
const STORAGE='WohnPlan_ColourPresets_1_5_1';
const palette=[
['Schneeweiß','Snow white','#FFFFFF'],['Warmweiß','Warm white','#F7F3E9'],['Elfenbein','Ivory','#FFF4DC'],
['Creme','Cream','#EEE4D1'],['Sand','Sand','#D9C3A5'],['Beige','Beige','#C8AF91'],
['Taupe','Taupe','#A99B90'],['Steingrau','Stone grey','#C8CED0'],['Hellgrau','Light grey','#E3E7EB'],
['Mittelgrau','Mid grey','#A6B1BA'],['Anthrazit','Anthracite','#485461'],['Schwarz','Black','#27313D'],
['Eisblau','Ice blue','#D4E8FA'],['Himmelblau','Sky blue','#9FC9F1'],['Taubenblau','Dusty blue','#91B1C6'],
['Marineblau','Navy blue','#375B83'],['Petrol','Teal','#317A86'],['Türkis','Turquoise','#63B5B8'],
['Mint','Mint','#C7E9DC'],['Salbei','Sage','#ACC5AD'],['Olivgrün','Olive green','#858E67'],
['Waldgrün','Forest green','#49765C'],['Moosgrün','Moss green','#718F6B'],['Limette','Lime','#CBE28F'],
['Zartrosa','Soft pink','#F4D8DC'],['Altrosa','Dusty rose','#D3ABB4'],['Koralle','Coral','#E89986'],
['Terrakotta','Terracotta','#BF795D'],['Ziegelrot','Brick red','#A9544F'],['Bordeaux','Burgundy','#78465A'],
['Flieder','Lilac','#D7C8ED'],['Lavendel','Lavender','#BDA9D5'],['Pflaume','Plum','#776184'],
['Sonnengelb','Sun yellow','#F3D18D'],['Senfgelb','Mustard','#D9B25D'],['Honig','Honey','#D7A365'],
['Naturholz','Natural wood','#C69B70'],['Eiche hell','Light oak','#E6C8A3'],['Eiche dunkel','Dark oak','#9C714D'],
['Nussbaum','Walnut','#76533A'],['Mahagoni','Mahogany','#8F5541'],['Wenge','Wenge','#503C37']
].map(([de,en,hex])=>({de,en,hex}));
const materials=[
{id:'birke',de:'Birke hell',en:'Light birch',base:'#E9D6B7',ink:'#BC9F7A',type:'plank'},
{id:'eiche_hell',de:'Eiche hell',en:'Light oak',base:'#DEC29A',ink:'#B68E61',type:'plank'},
{id:'eiche',de:'Eiche natur',en:'Natural oak',base:'#C9A373',ink:'#916D4B',type:'plank'},
{id:'nussbaum',de:'Nussbaum',en:'Walnut',base:'#90684A',ink:'#644833',type:'plank'},
{id:'holz_grau',de:'Grauholz',en:'Grey wood',base:'#A5A3A1',ink:'#77797B',type:'plank'},
{id:'holz_dunkel',de:'Dunkelholz',en:'Dark wood',base:'#614E43',ink:'#473930',type:'plank'},
{id:'fischgraet',de:'Fischgrät-Parkett',en:'Herringbone parquet',base:'#D6B389',ink:'#A47E57',type:'herringbone'},
{id:'dielen',de:'Breite Holzdielen',en:'Wide wooden planks',base:'#CFAD83',ink:'#99764D',type:'wideplank'},
{id:'beton',de:'Betonoptik',en:'Concrete',base:'#BAB9B6',ink:'#989A9B',type:'concrete'},
{id:'fliesen_hell',de:'Fliesen hell',en:'Light tiles',base:'#ECE7DC',ink:'#BAB8AF',type:'tiles'},
{id:'fliesen_dunkel',de:'Fliesen dunkel',en:'Dark tiles',base:'#666F76',ink:'#414C56',type:'tiles'},
{id:'fliesen_grau',de:'Fliesen grau',en:'Grey tiles',base:'#BAC2C7',ink:'#858F95',type:'tiles'},
{id:'marmor',de:'Marmor',en:'Marble',base:'#F0EFF0',ink:'#B9C3CA',type:'marble'},
{id:'schiefer',de:'Schiefer',en:'Slate',base:'#5C6D77',ink:'#3D515F',type:'slate'},
{id:'naturstein',de:'Naturstein',en:'Natural stone',base:'#C6C2AE',ink:'#999987',type:'stone'},
{id:'terrakotta',de:'Terrakotta-Fliesen',en:'Terracotta tiles',base:'#CA8C70',ink:'#A7654F',type:'tiles'},
{id:'terrazzo',de:'Terrazzo',en:'Terrazzo',base:'#E5DDD0',ink:'#ACA28D',type:'terrazzo'},
{id:'teppich_beige',de:'Teppichboden beige',en:'Beige carpet',base:'#CDBDAB',ink:'#A69A88',type:'carpet'},
{id:'teppich_grau',de:'Teppichboden grau',en:'Grey carpet',base:'#91969D',ink:'#747981',type:'carpet'},
{id:'vinyl',de:'Vinyl-Holzoptik',en:'Wood-effect vinyl',base:'#C8AE8A',ink:'#AD9878',type:'wideplank'}
];
const materialByID=new Map(materials.map(x=>[x.id,x]));
const hexOK=x=>typeof x==='string'&&/^#[0-9a-fA-F]{6}$/.test(x);
const safe=x=>String(x).replace(/[&<>"']/g,a=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[a]));
const tr=(de,en)=>window.WP_I18N?.language()==='en'?en:de;
function patternBody(m){
 const b=m.base,i=m.ink;
 const base='<rect width="100%" height="100%" fill="'+b+'"/>';
 switch(m.type){
 case 'plank':return {w:120,h:54,body:base+
  '<path d="M0 0H120M0 27H120M35 0V27M95 27V54" stroke="'+i+'" stroke-width="1.5" opacity=".65" fill="none"/>'+
  '<path d="M8 10Q30 5 51 12T111 13M5 39Q29 35 48 40T117 41" stroke="'+i+'" stroke-width=".75" opacity=".5" fill="none"/>'};
 case 'wideplank':return {w:140,h:76,body:base+
  '<path d="M0 0H140M0 38H140M49 0V38M101 38V76" fill="none" stroke="'+i+'" stroke-width="1.6" opacity=".6"/>'+
  '<path d="M14 15Q40 8 80 15T138 14M7 60Q43 53 67 60T140 59" stroke="'+i+'" stroke-width="1.2" opacity=".4" fill="none"/>'};
 case 'herringbone':return {w:80,h:80,body:base+
  '<path d="M0 0L40 40L80 0M-20 20L20 60L60 20L100 60M0 80L40 40L80 80M0 40L40 0M40 80L80 40" stroke="'+i+'" stroke-width="2" opacity=".7" fill="none"/>'+
  '<path d="M10 5L34 29M49 51L73 75" stroke="'+i+'" stroke-width=".8" opacity=".35"/>'};
 case 'tiles':return {w:55,h:55,body:base+
  '<path d="M0 0H55V55H0Z" fill="none" stroke="'+i+'" stroke-width="3" opacity=".7"/>'+
  '<path d="M5 5H50V50H5Z" fill="none" stroke="#FFFFFF" stroke-width=".6" opacity=".35"/>'};
 case 'slate':return {w:86,h:58,body:base+
  '<path d="M0 0H86V58H0Z M0 29H86 M36 0V29 M65 29V58" stroke="'+i+'" fill="none" stroke-width="2" opacity=".9"/>'+
  '<path d="M7 10Q30 3 46 9 M31 48Q60 39 78 46" stroke="#EFF0EB" stroke-width=".9" opacity=".16" fill="none"/>'};
 case 'stone':return {w:95,h:65,body:base+
  '<path d="M0 0H95M0 34H95M30 0V34M71 34V65" stroke="'+i+'" stroke-width="2" opacity=".72" fill="none"/>'+
  '<path d="M7 15Q17 7 26 18M51 50Q63 40 81 53" stroke="'+i+'" stroke-width=".8" opacity=".35" fill="none"/>'};
 case 'concrete':return {w:75,h:75,body:base+
  '<circle cx="16" cy="18" r="2" fill="'+i+'" opacity=".29"/><circle cx="62" cy="24" r="1.5" fill="'+i+'" opacity=".27"/>'+
  '<circle cx="44" cy="57" r="2.2" fill="#ffffff" opacity=".31"/><circle cx="8" cy="64" r="1.4" fill="'+i+'" opacity=".28"/>'+
  '<path d="M4 36Q34 32 70 35" stroke="'+i+'" opacity=".16" fill="none"/>'};
 case 'marble':return {w:125,h:85,body:base+
  '<path d="M-9 68Q30 24 50 47T138 5M-5 8Q35 30 53 12T126 44" stroke="'+i+'" stroke-width="1.9" opacity=".55" fill="none"/>'+
  '<path d="M17 78Q51 44 86 79M41 6Q50 32 85 30" stroke="#D7D1C6" stroke-width=".9" fill="none"/>'};
 case 'terrazzo':return {w:90,h:75,body:base+
  '<path d="M10 14l9 -6 6 13zM65 19l12 -5 -3 12zM34 53l12 -4 -4 11z" fill="'+i+'" opacity=".73"/>'+
  '<circle cx="13" cy="56" r="5" fill="#B8C7B9"/><circle cx="56" cy="49" r="4" fill="#D1AD96"/>'+
  '<path d="M52 5L60 12L49 18Z" fill="#C7C0B5"/><path d="M73 58l12 -4 -7 11Z" fill="#B8AAA3"/>'};
 case 'carpet':return {w:18,h:18,body:base+
  '<path d="M2 3L5 6M12 2L15 5M7 11L10 14M15 13L17 16" stroke="'+i+'" stroke-width=".8" opacity=".55"/>'+
  '<circle cx="4" cy="13" r=".8" fill="#ffffff" opacity=".42"/>'};
 default:return {w:80,h:80,body:base};
 }
}
function svgDefs(prefix='wp151-floor'){
 return materials.map(m=>{const p=patternBody(m);
  return '<pattern id="'+prefix+'-'+m.id+'" patternUnits="userSpaceOnUse" width="'+p.w+'" height="'+p.h+'">'+p.body+'</pattern>'
 }).join('');
}
function textureOverlay(r,points,prefix='wp151-floor'){
 if(!r||!materialByID.has(r.bodenMaterial))return '';
 return '<polygon points="'+points+'" fill="url(#'+prefix+'-'+r.bodenMaterial+')" stroke="none" pointer-events="none"/>';
}
function baseFloor(r,defaultColour){return materialByID.get(r?.bodenMaterial)?.base||r?.bodenfarbe||defaultColour}
function wallStroke(r,defaultColour){return hexOK(r?.wandfarbe)?r.wandfarbe:defaultColour}
function loadPrefs(){
 try{const x=JSON.parse(localStorage.getItem(STORAGE)||'{}');
  return {recent:Array.isArray(x.recent)?x.recent.filter(isValid).slice(0,14):[],
          favorites:Array.isArray(x.favorites)?x.favorites.filter(isValid).slice(0,26):[]}
 }catch(_){return {recent:[],favorites:[]}}
}
function isValid(x){return x&&((x.type==='color'&&hexOK(x.value))||(x.type==='material'&&materialByID.has(x.value)))}
function savePrefs(x){try{localStorage.setItem(STORAGE,JSON.stringify(x))}catch(_){}}
function key(x){return x.type+':'+x.value}
function addRecent(x){const d=loadPrefs();d.recent=[x,...d.recent.filter(z=>key(z)!==key(x))].slice(0,14);savePrefs(d)}
function toggleFavorite(x){const d=loadPrefs(),i=d.favorites.findIndex(z=>key(z)===key(x));
 if(i>=0)d.favorites.splice(i,1);else d.favorites.unshift(x);
 d.favorites=d.favorites.slice(0,26);savePrefs(d);
}
function materialLabel(id){const m=materialByID.get(id);return m?tr(m.de,m.en):id}
function colorName(hex){const m=palette.find(c=>c.hex.toLowerCase()===hex?.toLowerCase());return m?tr(m.de,m.en):hex}
function openPicker({choice,kind,modal,closeModal,commit,changed,toast,root}){
 if(!choice)return;
 const item=choice.value;
 const room=choice.kind==='room';
 if(item.gesperrt||choice.room.gesperrt){toast(tr('Dieses Element ist gesperrt','This item is locked'));return}
 const target=kind==='wall'?'wall':room?'floor':'furniture';
 let tab=target==='floor'&&materialByID.has(item.bodenMaterial)?'material':'color';
 let selectedColor=(target==='wall'?item.wandfarbe:target==='floor'?item.bodenfarbe:item.farbe)||'#B9D2E8';
 if(!hexOK(selectedColor))selectedColor='#B9D2E8';
 let selectedMat=materialByID.has(item.bodenMaterial)?item.bodenMaterial:'eiche';
 const targetText=target==='floor'?tr('Boden','Floor'):target==='wall'?tr('Wand','Wall'):tr('Möbel','Furniture');
 const title=tr('Farben & Materialien','Colours & materials')+' · '+targetText;
 modal(title,'<div id="wp151-picker" class="wp151-picker"></div>',
  '<button type="button" id="wp151-cancel">'+tr('Abbrechen','Cancel')+'</button>'+
  '<button type="button" class="primary" id="wp151-save">'+tr('Übernehmen','Apply')+'</button>',{large:true});
 const mount=root.querySelector('#wp151-picker');
 function colorEntry(hex){return {type:'color',value:hex}}
 function materialEntry(id){return {type:'material',value:id}}
 function currentEntry(){return tab==='material'?materialEntry(selectedMat):colorEntry(selectedColor)}
 function favoriteMark(x,prefs){return prefs.favorites.some(z=>key(z)===key(x))?'★':'☆'}
 function colourSwatch(c,prefs,i,compact=false){
  const x=colorEntry(c.hex),selected=tab==='color'&&selectedColor.toLowerCase()===c.hex.toLowerCase();
  return '<div class="wp151-swatch-row'+(selected?' wp151-selected':'')+'">'+
   '<button type="button" class="wp151-choice chip" data-wp151-colour="'+safe(c.hex)+'" aria-pressed="'+selected+'" title="'+safe(tr(c.de,c.en))+'">'+
   '<span class="wp151-sample" style="background:'+c.hex+'"></span>'+
   '<span class="wp151-swatch-name">'+safe(tr(c.de,c.en))+'</span></button>'+
   '<button type="button" class="wp151-star chip" data-wp151-star="color:'+c.hex+'" title="'+tr('Favorit umschalten','Toggle favourite')+'" aria-label="'+tr('Favorit umschalten','Toggle favourite')+'">'+favoriteMark(x,prefs)+'</button>'+
  '</div>';
 }
 function materialSwatch(m,prefs){
  const x=materialEntry(m.id),on=tab==='material'&&selectedMat===m.id;
  const prefix='wp151-sample-'+m.id,def=patternBody(m);
  const icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 64" preserveAspectRatio="none" aria-hidden="true">'+
   '<defs><pattern id="'+prefix+'" patternUnits="userSpaceOnUse" width="'+def.w+'" height="'+def.h+'">'+def.body+'</pattern></defs>'+
   '<rect x="0" y="0" width="104" height="64" rx="4" fill="url(#'+prefix+')"/></svg>';
  return '<div class="wp151-swatch-row'+(on?' wp151-selected':'')+'">'+
    '<button type="button" class="wp151-choice chip" data-wp151-material="'+m.id+'" aria-pressed="'+on+'">'+
    '<span class="wp151-material-sample">'+icon+'</span><span class="wp151-swatch-name">'+safe(tr(m.de,m.en))+'</span></button>'+
    '<button type="button" class="wp151-star chip" data-wp151-star="material:'+m.id+'" aria-label="'+tr('Favorit umschalten','Toggle favourite')+'">'+favoriteMark(x,prefs)+'</button></div>';
 }
 function render(){
  const prefs=loadPrefs();
  const recent=prefs.recent.filter(x=>target==='floor'||x.type==='color').slice(0,8);
  const fav=prefs.favorites.filter(x=>target==='floor'||x.type==='color').slice(0,12);
  const small=x=>x.type==='color'?'<button type="button" class="wp151-chip chip" data-wp151-colour="'+x.value+'"><span style="background:'+x.value+'"></span>'+safe(colorName(x.value))+'</button>':
    '<button type="button" class="wp151-chip chip" data-wp151-material="'+x.value+'"><span class="wp151-chip-material" style="background:'+materialByID.get(x.value).base+'"></span>'+safe(materialLabel(x.value))+'</button>';
  mount.innerHTML='<p class="wp151-description">'+tr('Wähle eine Farbe oder eine passende Oberflächenstruktur. Die Vorschau erscheint direkt im Grundriss und im PDF.','Choose a colour or material. The result appears in your plan and PDF.')+'</p>'+
   '<div class="wp151-target"><span>'+tr('Bearbeiteter Bereich','Editing')+':</span><b>'+targetText+'</b></div>'+
   (target==='floor'?'<div class="wp151-tabs" role="tablist">'+
     '<button type="button" role="tab" class="chip" aria-selected="'+(tab==='color')+'" data-wp151-tab="color">'+tr('Bodenfarben','Floor colours')+'</button>'+
     '<button type="button" role="tab" class="chip" aria-selected="'+(tab==='material')+'" data-wp151-tab="material">'+tr('Bodenbeläge','Floor materials')+'</button></div>':'')+
   (fav.length?'<section class="wp151-mini"><h3>★ '+tr('Favoriten','Favourites')+'</h3><div class="wp151-chip-row">'+fav.map(small).join('')+'</div></section>':'')+
   (recent.length?'<section class="wp151-mini"><h3>↶ '+tr('Zuletzt verwendet','Recently used')+'</h3><div class="wp151-chip-row">'+recent.map(small).join('')+'</div></section>':'')+
   '<section><h3 class="wp151-section-title">'+(tab==='material'?tr('Bodenbeläge','Floor materials'):tr('Farbauswahl','Colour selection'))+'</h3>'+
   '<div class="wp151-swatch-grid">'+(tab==='material'?materials.map(m=>materialSwatch(m,prefs)).join(''):palette.map((c,i)=>colourSwatch(c,prefs,i)).join(''))+'</div></section>'+
   (tab==='color'?'<label class="wp151-own-colour">'+tr('Eigene Farbe','Custom colour')+
    '<input type="color" id="wp151-custom" value="'+selectedColor+'"><button type="button" class="wp151-custom-star chip" data-wp151-star="color:'+selectedColor+'" aria-label="'+tr('Favorit umschalten','Toggle favourite')+'">'+favoriteMark(colorEntry(selectedColor),prefs)+'</button><span class="wp151-hex">'+selectedColor+'</span></label>':'')+
   '<p class="wp151-footer-tip">'+tr('Mit ☆ kannst du eine Farbe oder einen Bodenbelag als Favorit speichern.','Use ☆ to save favourite colours or materials.')+'</p>';
  const custom=mount.querySelector('#wp151-custom');
  if(custom)custom.oninput=()=>{selectedColor=custom.value;mount.querySelector('.wp151-hex').textContent=selectedColor;const star=mount.querySelector('.wp151-custom-star');if(star){star.dataset.wp151Star='color:'+selectedColor;star.textContent=favoriteMark(colorEntry(selectedColor),loadPrefs())}mount.querySelectorAll('.wp151-selected').forEach(el=>el.classList.remove('wp151-selected'));};
 }
 mount.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b||!mount.contains(b))return;
  if(b.dataset.wp151Tab){tab=b.dataset.wp151Tab;render();return}
  if(b.dataset.wp151Colour){selectedColor=b.dataset.wp151Colour;tab='color';render();return}
  if(b.dataset.wp151Material){selectedMat=b.dataset.wp151Material;tab='material';render();return}
  if(b.dataset.wp151Star){
   const [kind,value]=b.dataset.wp151Star.split(':');
   toggleFavorite({type:kind,value});render();
  }
 });
 root.querySelector('#wp151-cancel').onclick=closeModal;
 root.querySelector('#wp151-save').onclick=()=>{
  const x=currentEntry();
  if(!isValid(x)){toast(tr('Ungültige Auswahl','Invalid selection'));return}
  commit();
  if(target==='wall')item.wandfarbe=selectedColor;
  else if(target==='furniture')item.farbe=selectedColor;
  else if(x.type==='material'){
   item.bodenMaterial=selectedMat;item.bodenfarbe=materialByID.get(selectedMat).base;
  }else{item.bodenfarbe=selectedColor;delete item.bodenMaterial}
  addRecent(x);
  closeModal();changed();toast(tr('Gestaltung übernommen','Appearance updated'));
 };
 render();
}
window.WP_151={palette,materials,svgDefs,textureOverlay,baseFloor,wallStroke,openPicker};
})();