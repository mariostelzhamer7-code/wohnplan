/* WohnPlan Web 1.3 – detailed SVG furniture and placement geometry */
(function(){
 'use strict';
 const COLOR=/^#[0-9a-fA-F]{6}$/;
 const col=x=>COLOR.test(x||'')?x:'#b9d2e8';
 const mix=(hex,white)=>{const n=parseInt(hex.slice(1),16),p=white/100,f=v=>Math.min(255,Math.round(v+(255-v)*p));return '#'+[f(n>>16&255),f(n>>8&255),f(n&255)].map(x=>x.toString(16).padStart(2,'0')).join('')};
 function drawShape(c,color){
  if(!c)return '';
  const id=c.id||'',style=c.style||'',base=col(color),light=mix(base,66),light2=mix(base,87),dark='#607d99',ink='#476480',white='#f8fcff';
  const R=(x,y,w,h,f=base,rx=2,stroke=dark)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+rx+'" fill="'+f+'" stroke="'+stroke+'" stroke-width="1.8"/>';
  const C=(x,y,rad,f=light,stroke=dark)=>'<circle cx="'+x+'" cy="'+y+'" r="'+rad+'" fill="'+f+'" stroke="'+stroke+'" stroke-width="1.8"/>';
  const E=(x,y,rx,ry,f=base)=>'<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="'+ry+'" fill="'+f+'" stroke="'+dark+'" stroke-width="2"/>';
  const P=(d,f='none',stroke=dark,sw=2)=>'<path d="'+d+'" fill="'+f+'" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linecap="round" stroke-linejoin="round"/>';
  const T=(x,y,txt,fs=14)=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="750" font-size="'+fs+'" fill="'+ink+'">'+txt+'</text>';
  const pillows=(n,top=8)=>Array.from({length:n},(_,i)=>R(4+92*i/n+2,top,Math.max(8,92/n-4),18,white,4)).join('');
  const chair=(x,y,rotation=0)=>'<g transform="rotate('+rotation+' '+x+' '+y+')">'+R(x-9,y-8,18,16,light,4)+R(x-10,y-11,20,5,base,2)+'</g>';
  const table=(shape='rect',seats=0)=>{
   let s=shape==='round'?C(50,50,38,base):shape==='oval'?E(50,50,47,33,base):R(7,16,86,68,base,shape==='square'?3:9);
   if(seats){for(let i=0;i<seats;i++){const theta=2*Math.PI*i/seats-Math.PI/2, x=50+47*Math.cos(theta),y=50+47*Math.sin(theta);
    s+=C(Math.max(6,Math.min(94,x)),Math.max(6,Math.min(94,y)),6,light2);
   }}return s
  };
  const bed=(p,quilt=0)=>{
   let s=R(1,1,98,98,base,6)+R(4,4,92,92,light,5)+pillows(p);
   if(quilt===1)s+=R(5,39,90,56,mix(base,28),3)+P('M7 57H93 M7 72H93','none',light2,2);
   else if(quilt===2)s+=R(5,34,90,61,mix(base,14),3)+P('M50 35V94','none',light2,2);
   else s+=R(5,35,90,60,mix(base,38),4)+P('M5 51H95','none',white,2);
   return s;
  };
  const shelf=(cols=2,rows=3,glass=false)=>{
   let s=R(1,1,98,98,base,2);
   for(let i=1;i<rows;i++)s+=P('M2 '+i*100/rows+'H98');
   for(let i=1;i<cols;i++)s+=P('M'+i*100/cols+' 2V98');
   if(glass)s+=R(5,5,90,90,'#d7eaf8',2)+'<path d="M50 6V94" stroke="'+dark+'" stroke-width="2"/>';
   return s;
  };
  const drawers=n=>{let s=R(1,1,98,98,base);for(let i=0;i<n;i++){const y=3+i*94/n;s+=R(5,y,90,94/n-2,light,1)+C(50,y+(94/n-2)/2,2,ink)}return s};
  const burners=(n=4,oven=false)=>{let s=R(1,1,98,98,base,3),pts=n===2?[[30,29],[70,29]]:[[25,27],[74,27],[25,67],[74,67]];
   pts.forEach(([x,y])=>s+=C(x,y,n===2?17:15,light2)+C(x,y,5,base));
   if(oven)s+=R(8,66,84,27,'#729bbf',2)+R(13,70,74,18,'#dcebf8',2);
   return s
  };
  const sink=n=>{let s=R(1,1,98,98,base,3);for(let i=0;i<n;i++){let x=n===1?15:5+i*49,ww=n===1?70:42;s+=R(x,16,ww,65,white,8)+C(x+ww/2,50,3,dark)}s+=P('M48 13q0 -15 9 -9','none',ink,3);return s};
  const ring=(x=50,y=50,rr=34)=>C(x,y,rr,white)+C(x,y,rr-8,light2);
  const screen=(count=1)=>{let s='';if(count===1){s=R(3,12,94,67,'#577ca2',5)+R(9,18,82,54,'#c3e1fb',2)+P('M50 80V90 M34 90H66','none',ink,3)}
   else s=R(2,16,46,62,'#577ca2',3)+R(7,21,36,51,'#c3e1fb',2)+R(52,16,46,62,'#577ca2',3)+R(57,21,36,51,'#c3e1fb',2)+P('M25 78V90 M75 78V90','none',ink,2);
   return s};
  const sofa=(seats,chester=false)=>{let s=R(2,9,96,82,base,11)+R(4,10,92,20,light,7);
   for(let i=0;i<seats;i++){let ww=84/seats;s+=R(8+i*ww,35,ww-2,47,light,7);if(chester)s+=C(8+(i+.5)*ww,56,2,ink)}
   s+=R(1,27,12,58,base,7)+R(87,27,12,58,base,7);return s};
  const corner=(right=false,u=false)=>{let s=R(1,1,98,42,base,6)+R(right?59:1,2,40,96,base,5);
   if(u)s+=R(1,64,98,35,base,5);
   s+=R(7,8,39,27,light,5)+R(52,8,39,27,light,5)+R(right?66:7,48,26,39,light,5);
   if(u)s+=R(9,69,82,23,light,5);return s};
  const shade=(s='rect')=>s==='round'?C(50,50,48,base):R(1,1,98,98,base,6);
  let s='';
  if(['bett','einzelbett','kingbett','boxspringbett','hochbett','kinderbett','etagenbett','liegestuhl'].includes(id)){
   if(id==='einzelbett')s=bed(1)+R(3,1,94,8,base,2);
   else if(id==='kingbett')s=bed(3,2);
   else if(id==='boxspringbett')s=R(0,0,100,100,dark,10)+bed(2,1)+P('M1 96H99','none',ink,3);
   else if(id==='hochbett')s=bed(1,1)+P('M8 5V95 M19 5V95 M8 38H19 M8 58H19 M8 78H19','none',ink,3);
   else if(id==='etagenbett')s=bed(1,1)+R(5,42,90,50,light2,3)+pillows(1,48)+P('M92 6V94 M83 6V94 M83 34H92 M83 63H92','none',ink,2.8);
   else if(id==='kinderbett')s=bed(1)+P('M4 9H96 M4 91H96 M5 10V90 M95 10V90','none',ink,4)+C(75,73,7,'#f5d9ac');
   else if(id==='liegestuhl')s=R(5,3,90,94,base,12)+R(12,9,76,35,light2,9)+R(12,44,76,46,light,6)+P('M5 45H95');
   else s=bed(2,2);
  }
  else if(['sofa','sofaZwei','sofaVier','sofaChester','sofaSchlaf','sofaModul','gartenSofa','sofaPanorama','sofaU','sofaEcke','sofaEckeRechts'].includes(id)){
   if(id==='sofaEcke'||id==='sofaEckeRechts'||id==='sofaU'||id==='sofaPanorama')s=corner(id==='sofaEckeRechts',id==='sofaU'||id==='sofaPanorama');
   else if(id==='sofaSchlaf')s=sofa(2)+R(16,44,69,43,light2,5)+P('M16 88H85');
   else if(id==='sofaModul')s=R(2,2,96,96,base,10)+R(8,8,84,84,light,8);
   else s=sofa(id==='sofaZwei'?2:id==='sofaVier'?4:3,id==='sofaChester');
  }
  else if(['esstisch','esstischQuadrat','esstischRund','esstischOval','esstischAusziehbar','esstischFamilie','bartisch','gartenTisch','couchtisch','couchtischRund','couchtischOval','beistelltisch'].includes(id)){
   const dining=id.startsWith('esstisch')||id==='bartisch'||id==='gartenTisch';
   const seats=id==='esstischFamilie'?8:id==='esstischQuadrat'?4:id==='esstischRund'?4:id==='esstischOval'?6:id==='esstischAusziehbar'?6: dining?4:0;
   s=table(id.includes('Rund')?'round':id.includes('Oval')?'oval':id==='esstischQuadrat'?'square':'rect',seats);
   if(id==='esstischAusziehbar')s+=P('M44 18V82 M56 18V82','none',ink,2)+'<path d="M50 19V81" stroke="'+white+'" stroke-width="2" stroke-dasharray="4 5"/>';
   if(id==='bartisch')s+=R(37,28,26,45,light2,4)+P('M40 50H60','none',ink,3);
   if(id==='couchtisch')s+=P('M12 22L88 78 M88 22L12 78','none',light2,2);
   if(id==='beistelltisch')s+=C(50,50,23,light2);
  }
  else if(['herd','backofen','mikrowelle','dunstabzug','geschirrspueler','kuehlschrank','waschmaschine','trockner','grill','spielekonsole'].includes(id)){
   if(id==='herd')s=burners(4);
   if(id==='backofen')s=R(1,1,98,98,base)+R(9,12,82,12,dark,2)+R(8,29,84,58,'#7199bb',4)+R(15,36,70,44,'#dbecfa',3)+P('M18 32H82','none',ink,2)+C(22,18,3,light2)+C(77,18,3,light2);
   if(id==='mikrowelle')s=R(1,14,98,72,base,6)+R(7,21,67,56,'#a2bdd7',3)+R(13,26,54,43,light2,3)+R(82,24,11,10,light,3)+C(87,58,3,light2);
   if(id==='dunstabzug')s=P('M33 7H67V27L92 75H8L33 27Z',light)+P('M8 80H92','none',ink,5)+C(49,19,4,light2);
   if(id==='geschirrspueler')s=R(1,1,98,98,base)+R(8,11,84,12,light2)+R(8,31,84,55,light,4)+P('M15 43H85 M15 60H85 M23 35V81 M44 35V81 M65 35V81','none',dark,1.5)+C(77,18,3,ink);
   if(id==='kuehlschrank')s=R(1,1,98,98,base,4)+P('M3 38H97','none',ink,3)+R(84,16,5,18,light2,2)+R(84,48,5,25,light2,2);
   if(id==='waschmaschine'||id==='trockner')s=R(1,1,98,98,base)+R(6,6,88,19,light2)+ring(50,61,29)+(id==='trockner'?P('M26 68q24 -30 48 0','none',ink,4):P('M28 58Q50 77 72 52','none','#4b98ce',3))+C(81,15,4,ink);
   if(id==='grill')s=R(10,13,80,75,dark,11)+R(16,20,68,57,base,4)+Array.from({length:5},(_,i)=>P('M'+(25+i*13)+' 22V76','none',ink,2)).join('')+P('M13 83H86','none',white,4);
   if(id==='spielekonsole')s=R(14,12,72,78,base,8)+R(22,20,56,17,dark)+C(39,60,8,light2)+C(62,60,8,light2);
  }
  else if(['spuele','doppelspuele','waschbecken','doppelwaschbecken'].includes(id))s=sink(id==='doppelspuele'||id==='doppelwaschbecken'?2:1);
  else if(['kueche','kuecheninsel','kuechenEcke','kuechenHochschrank','kuechenOberschrank','barTheke','spielkueche'].includes(id)){
   if(id==='kuechenEcke')s=P('M1 1H99V39H39V99H1Z',base)+R(51,5,42,28,light)+R(5,50,28,42,light);
   else if(id==='kuechenHochschrank'||id==='kuechenOberschrank')s=shelf(id==='kuechenHochschrank'?1:2,id==='kuechenHochschrank'?4:2);
   else if(id==='barTheke')s=R(2,17,96,64,base,8)+P('M3 28H97','none',light2,5)+C(22,91,7,light2)+C(78,91,7,light2);
   else s=R(1,1,98,98,base)+C(28,30,13,light2)+C(68,30,13,light2)+R(10,60,80,27,light2,7);
  }
  else if(['kleiner','kommode','schrank','schwebetuerenschrank','eckschrank','nachttisch','sideboard','tvMoebel','regal','buecherregal','vitrine','aktenschrank','badschrank','spiegelschrank','rollcontainer','garderobe','raumteiler','buffetschrank','kamin','wohnwand','schuhschrank','wandschrank','kuechenHochschrank','wickeltisch','spielzeugregal'].includes(id)){
   if(['kommode','nachttisch','rollcontainer','schuhschrank'].includes(id))s=drawers(id==='nachttisch'?2:id==='rollcontainer'?4:id==='schuhschrank'?3:5);
   else if(id==='schwebetuerenschrank')s=R(1,1,98,98,base)+R(6,6,54,88,light)+R(45,6,48,88,light2)+P('M48 7V93 M58 7V93','none',ink,3);
   else if(id==='eckschrank')s=P('M1 1H99V39H39V99H1Z',base)+P('M14 14V85 M14 14H88','none',ink,3);
   else if(id==='vitrine'||id==='spiegelschrank')s=shelf(2,3,true);
   else if(id==='buecherregal'||id==='spielzeugregal')s=shelf(3,4)+(id==='spielzeugregal'?C(19,16,8,'#f5c27b'):R(8,8,8,17,'#d59a6d'));
   else if(id==='raumteiler')s=shelf(4,2);
   else if(id==='regal'||id==='wohnwand')s=shelf(4,id==='wohnwand'?2:3)+(id==='wohnwand'?R(30,42,41,30,'#6f93b5'):'' );
   else if(id==='tvMoebel')s=R(1,1,98,98,base)+R(10,25,80,13,'#7094b5',2)+R(10,57,36,31,light2)+R(54,57,36,31,light2);
   else if(id==='kamin')s=R(1,1,98,98,base)+R(19,19,62,66,'#4f657a')+P('M50 77Q23 51 51 33Q77 51 50 77Z','#e4a66b','#e4a66b');
   else if(id==='wickeltisch')s=R(1,1,98,98,base)+R(7,7,86,49,light2,8)+P('M8 65H92 M8 79H92');
   else s=shelf(2,id==='schrank'||id==='wandschrank'?2:3);
  }
  else if(['stuhl','polsterstuhl','armlehnstuhl','barhocker','sessel','relaxsessel','ohrensessel','fernsehsessel','buerostuhl','hocker','essbank','bank','eckbank','sitztruhe'].includes(id)){
   if(id==='eckbank')s=corner(false);
   else if(id==='essbank'||id==='bank'||id==='sitztruhe')s=R(1,22,98,60,base,6)+R(5,24,90,19,light,4)+(id==='sitztruhe'?P('M5 62H95'):'' );
   else if(id==='barhocker'||id==='hocker')s=C(50,50,31,base)+P('M50 18V82 M18 50H82','none',light2,4);
   else if(id==='buerostuhl')s=R(15,9,70,64,base,14)+R(22,15,56,21,light)+P('M50 72V92 M23 92H77','none',ink,3)+C(20,88,5,dark)+C(80,88,5,dark);
   else s=R(18,22,64,62,base,9)+R(19,12,62,22,light,6)+(id==='stuhl'||id==='polsterstuhl'?'':R(5,33,16,45,base)+R(79,33,16,45,base))+(id==='relaxsessel'||id==='fernsehsessel'?R(16,78,68,18,light2,7):'')+(id==='ohrensessel'?R(9,12,20,27,light,4)+R(73,12,20,27,light,4):'');
  }
  else if(['teppich','teppichRund','teppichLaeufer','spielteppich','sonnenschirm','spielzelt'].includes(id)){
   s=id==='teppichRund'||id==='sonnenschirm'||id==='spielzelt'?C(50,50,48,light2):R(1,1,98,98,light2,6);
   if(id==='sonnenschirm')s+=Array.from({length:8},(_,i)=>P('M50 50L'+(50+46*Math.cos(i*Math.PI/4))+' '+(50+46*Math.sin(i*Math.PI/4)))).join('')+C(50,50,7,base);
   else if(id==='spielzelt')s+=P('M10 86L50 7L90 86Z',base)+P('M40 86L50 54L60 86','none',ink,3);
   else s+=P('M13 13H87V87H13Z','none',dark,2)+'<path d="M15 15H85V85H15Z" fill="none" stroke="'+dark+'" stroke-dasharray="4 4"/>';
  }
  else if(id==='pflanze'||id==='pflanzkuebel')s=C(50,50,45,'#b9cdb5','#66896c')+Array.from({length:id==='pflanze'?7:5},(_,i)=>'<ellipse cx="50" cy="22" rx="11" ry="24" fill="'+(i%2?'#5f9b76':'#85bb87')+'" transform="rotate('+(i*360/(id==='pflanze'?7:5))+' 50 50)"/>').join('')+C(50,50,10,'#527a56');
  else if(id==='tvKlein'||id==='tvGross'||id==='tvWand'||id==='monitor'||id==='monitorDoppel')s=screen(id==='monitorDoppel'?2:1)+(id==='tvWand'?P('M50 78V94','none',ink,5):'');
  else if(id==='laptop')s=R(6,12,88,59,'#577da5')+R(12,18,76,48,'#b0d7f5')+P('M4 74H96L87 91H13Z',base);
  else if(id==='pc')s=R(24,5,52,90,base,6)+R(31,14,38,27,dark)+C(50,69,11,light2);
  else if(id==='drucker')s=R(6,26,88,60,base,7)+R(19,4,63,40,white)+R(16,66,67,18,light2)+C(80,41,3,'#3f996e');
  else if(id==='tvMitLowboard')s=R(1,1,98,98,base)+R(8,13,84,42,'#5d8db5')+R(13,19,74,31,'#b4d8f4')+R(8,69,84,20,light2);
  else if(id==='lautsprecher'||id==='soundbar')s=R(4,8,92,84,base,6)+C(50,60,24,light2)+C(50,24,10,light2);
  else if(['schreibtisch','schreibtischPC','schreibtischLaptop','gamingTisch','schreibtischHoehenverstellbar','schreibtischDoppel','schreibtischEcke','kinderschreibtisch','schminktisch'].includes(id)){
   s=id==='schreibtischEcke'?P('M1 1H99V43H43V99H1Z',base):R(1,1,98,98,base,4);
   if(id==='schreibtischDoppel')s+=screen(2);
   else if(id==='schreibtischPC'||id==='gamingTisch')s+=R(23,13,54,36,'#567fa5')+R(29,19,42,24,'#c8e1f3')+P('M50 50V62');
   else if(id==='schreibtischLaptop')s+=R(30,21,40,38,'#567fa5')+R(34,24,32,26,light2);
   else if(id==='schminktisch')s+=C(50,34,23,white)+C(22,80,6,'#e4c3bb')+C(78,80,6,'#e4c3bb');
   else s+=R(20,20,60,15,light2)+P('M20 70H80');
  }
  else if(id==='badewanne'||id==='badewanneEcke')s=R(1,1,98,98,base,16)+R(11,11,78,78,white,20)+C(75,27,4,dark)+(id==='badewanneEcke'?P('M4 96L96 4','none',dark,3):'');
  else if(['dusche','eckdusche','duscheGross'].includes(id))s=R(1,1,98,98,light2,5)+P(id==='duscheGross'?'M70 1V99':'M8 92A84 84 0 0 1 92 8','none',ink,3)+C(76,21,7,dark);
  else if(id==='wc'||id==='bidet')s=E(50,57,33,39,white)+R(20,2,60,24,base,6)+(id==='bidet'?C(50,55,6,dark):'');
  else if(id==='badschrank'||id==='spiegelschrank')s=shelf(2,2,true);
  else if(id==='handtuchheizkoerper'||id==='heizkoerper')s=R(1,1,98,98,light2)+Array.from({length:8},(_,i)=>P('M'+(7+i*12)+' 6V94','none',ink,2)).join('');
  else if(id==='flurspiegel')s=R(1,1,98,98,base,8)+R(7,7,86,86,'#cce4f5',6)+P('M15 74L73 16');
  else if(id==='schirmstaender')s=C(50,50,42,base)+C(50,50,26,light2)+P('M50 25V74');
  else if(id==='garderobe')s=R(1,1,98,98,base)+Array.from({length:4},(_,i)=>C(14+i*24,36,7,dark)).join('');
  else if(id==='fluegel'||id==='klavier')s=P(id==='fluegel'?'M5 12Q95 -3 90 57Q78 91 25 95L5 60Z':'M1 1H99V99H1Z',base)+Array.from({length:8},(_,i)=>R(9+i*10.3,69,10,27,white,0)).join('');
  else if(id==='fitnessgeraet')s=R(4,4,92,92,light2)+C(21,28,16,dark)+C(79,72,16,dark)+P('M21 28L79 72 M78 20L25 81','none',ink,5);
  else s=R(1,1,98,98,base,5)+R(9,9,82,82,light2,4)+P('M16 50H84','none',ink,2);
  // Extra features distinguish closely related models in catalog previews as well as plans.
  switch(id){
   case 'gartenSofa':s+=P('M6 37H94 M6 70H94','none',white,2);break;
   case 'armlehnstuhl':s+=P('M8 35V80 M92 35V80','none',white,4);break;
   case 'gartenTisch':s+=C(50,50,7,light2)+P('M50 10V90 M10 50H90','none',white,2);break;
   case 'kuechenOberschrank':s+=R(6,6,88,15,light2,1)+R(6,80,88,14,light2,1);break;
   case 'wandschrank':s+=P('M50 2V98 M38 43H62','none',white,4);break;
   case 'kuecheninsel':s+=C(30,48,13,white)+C(70,48,13,white)+C(25,93,6,light2)+C(75,93,6,light2);break;
   case 'spielkueche':s+=R(20,44,60,37,'#f2cbd2',5)+C(50,17,7,'#fbd69b');break;
   case 'waschbecken':s+=P('M33 12Q50 -1 67 12 M50 13V26','none',ink,4);break;
   case 'eckdusche':s+=P('M4 4H96V96','none',ink,4);break;
   case 'schreibtischHoehenverstellbar':s+=P('M15 88V55 M85 88V55','none',ink,5)+T(50,93,'↕',17);break;
   case 'kinderschreibtisch':s+=C(20,22,7,'#e4b989')+C(80,22,7,'#e4b989');break;
   case 'polsterstuhl':s+=R(25,39,50,34,'#e9bdba',7);break;
   case 'eckbank':s+=P('M13 13H88 M14 27H34 M61 27H87 M14 51V92','none',white,4);break;
   case 'sofaPanorama':s+=R(36,45,30,25,light2,6);break;
   case 'barhocker':s+=P('M23 72H77 M35 68V86 M65 68V86','none',ink,3);break;
   case 'teppichLaeufer':s+=Array.from({length:4},(_,i)=>P('M12 '+(23+i*17)+'H88','none',dark,1.4)).join('');break;
   case 'spielteppich':s+=C(50,49,17,'#e8c3a2')+C(28,31,9,'#dceaa9')+C(72,68,11,'#c6aedc');break;
   case 'garderobe':s+=Array.from({length:4},(_,i)=>C(14+i*24,56,5,white)).join('');break;
   case 'badschrank':s+=P('M8 9H92 M8 91H92','none',white,5);break;
   case 'aktenschrank':s+=Array.from({length:3},(_,i)=>R(15+i*25,10,17,70,light2,1)).join('');break;
   case 'buffetschrank':s+=R(9,60,82,29,light2)+P('M50 60V88');break;
   case 'bank':s+=Array.from({length:4},(_,i)=>P('M11 '+(31+i*10)+'H89','none',ink,1.5)).join('');break;
   case 'spiegelschrank':s+=P('M11 84L84 11','none',white,5);break;
   case 'doppelwaschbecken':s+=C(28,28,4,'#3c9ac9')+C(71,28,4,'#3c9ac9');break;
   case 'relaxsessel':s+=P('M12 78L24 95H76L88 78','none',ink,3);break;
   case 'fernsehsessel':s+=R(35,80,30,14,light2);break;
   case 'tvKlein':s+=R(17,28,66,36,light2,2);break;
   case 'tvGross':s+=R(4,23,92,47,light2,2);break;
   case 'monitor':s+=P('M41 82H59 M50 73V93','none',ink,3);break;
   case 'soundbar':s=R(1,35,98,29,base,9)+Array.from({length:9},(_,i)=>C(15+i*9,50,2,ink)).join('');break;
   case 'handtuchheizkoerper':s+=P('M7 18H93 M7 49H93 M7 80H93','none',white,5);break;
   case 'gamingTisch':s+=P('M15 69L50 84L85 69','none','#87b4f0',4)+C(50,30,7,'#78a5e8');break;
   default:break;
  }
  return s;
 }
 function level(item,cat){
  if(cat && cat.rug)return 0;
  const n=Number(item?.ebene);
  return Number.isFinite(n)?Math.max(0,Math.min(9,Math.round(n))):1;
 }
 function pointInRoom(r,x,y){
  if(x < -0.01||y<-.01||x > r.breite+.01||y>r.tiefe+.01)return false;
  if(r.form==='L-Form' && x>r.breite-r.aussparungBreite+.01 && y>r.tiefe-r.aussparungTiefe+.01)return false;
  return true;
 }
 function corners(o){
  const w=Math.max(1,+o.breite||1),h=Math.max(1,+o.tiefe||1),x=+o.x||0,y=+o.y||0;
  const angle=((+o.drehung||0)%360)*Math.PI/180,c=Math.cos(angle),s=Math.sin(angle),cx=x+w/2,cy=y+h/2;
  return [[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]].map(([dx,dy])=>({x:cx+dx*c-dy*s,y:cy+dx*s+dy*c}));
 }
 function containsPoint(o,x,y){
  const w=Math.max(1,+o.breite||1),h=Math.max(1,+o.tiefe||1),ox=+o.x||0,oy=+o.y||0,rad=-(+o.drehung||0)*Math.PI/180,c=Math.cos(rad),s=Math.sin(rad),cx=ox+w/2,cy=oy+h/2,dx=x-cx,dy=y-cy;
  return Math.abs(dx*c-dy*s) <= w/2 && Math.abs(dx*s+dy*c) <= h/2;
 }
 function overlaps(a,b){
  const A=corners(a),B=corners(b);
  for(const q of [A,B]){
   for(let i=0;i<4;i++){
    const j=(i+1)%4,dx=q[j].x-q[i].x,dy=q[j].y-q[i].y,nx=-dy,ny=dx,pa=A.map(p=>nx*p.x+ny*p.y),pb=B.map(p=>nx*p.x+ny*p.y);
    if(Math.max(...pa)<=Math.min(...pb)+2||Math.max(...pb)<=Math.min(...pa)+2)return false;
   }
  }
  return true;
 }
 function exactPosition(r,o,position,gridSnap=true){
  let x=+position.x||0,y=+position.y||0,w=+o.breite||0,h=+o.tiefe||0;
  const rotation=((+o.drehung||0)%180+180)%180;
  const diff=Math.abs(rotation-90)<1?{w:h,h:w}:{w,h};
  const centerX=(w-diff.w)/2, centerY=(h-diff.h)/2;
  const xMin=-centerX, xMax=r.breite-diff.w-centerX, yMin=-centerY,yMax=r.tiefe-diff.h-centerY;
  // Keep the object on the wall when moved close to it, regardless of grid spacing.
  x=Math.max(xMin,Math.min(Math.max(xMin,xMax),x));
  y=Math.max(yMin,Math.min(Math.max(yMin,yMax),y));
  const magnet=18;
  if(Math.abs(x-xMin)<magnet)x=xMin;
  if(Math.abs(x-xMax)<magnet)x=xMax;
  if(Math.abs(y-yMin)<magnet)y=yMin;
  if(Math.abs(y-yMax)<magnet)y=yMax;
  if(r.form==='L-Form'){
   const cutX=r.breite-r.aussparungBreite,cutY=r.tiefe-r.aussparungTiefe;
   if(x+centerX+diff.w>cutX && y+centerY+diff.h>cutY){
    const left=cutX-diff.w-centerX,up=cutY-diff.h-centerY;
    if(Math.abs(left-x)<Math.abs(up-y))x=Math.max(xMin,left);
    else y=Math.max(yMin,up);
   }
  }
  return {x:Math.round(x*100)/100,y:Math.round(y*100)/100};
 }
 function outsideRoom(r,o){return corners(o).some(p=>!pointInRoom(r,p.x,p.y))}
 function isDoorBlocked(r,door,obj,openingAnchor){
  if(door.typ!=='Tür')return false;
  let a=openingAnchor(r,door);
  if(!a)return false;
  const hinge=door.gespiegelt?{x:a.ex,y:a.ey}:{x:a.x,y:a.y};
  const far=door.gespiegelt?{x:a.x,y:a.y}:{x:a.ex,y:a.ey};
  const d={x:(far.x-hinge.x)/door.breite,y:(far.y-hinge.y)/door.breite};
  const sign=door.oeffnetNachAussen?-1:1;
  const perpendicular={x:-a.uy*sign,y:a.ux*sign};
  const local={...obj,x:(obj.x||0)+r.x,y:(obj.y||0)+r.y};
  for(let n=1;n<=11;n++)for(let radius=.28;radius<=1.01;radius+=.18){
   const angle=n*Math.PI/24;
   const wx=hinge.x+door.breite*radius*(d.x*Math.cos(angle)+perpendicular.x*Math.sin(angle));
   const wy=hinge.y+door.breite*radius*(d.y*Math.cos(angle)+perpendicular.y*Math.sin(angle));
   if(containsPoint(local,wx,wy))return true;
  }
  return false;
 }
 function audit(project,lookup,openingAnchor){
  const issues=[];
  for(const r of project?.raeume||[]){
   const visible=(r.objekte||[]).filter(o=>!o.ausgeblendet);
   for(const o of visible){
    if(outsideRoom(r,o))issues.push({room:r,object:o,kind:'outside',message:'Außerhalb des Raums: '+(o.name||o.typ)});
    for(const other of visible){
     if(other===o || String(other.id)<String(o.id))continue;
     if(lookup(o.typ)?.rug||lookup(other.typ)?.rug)continue;
     if(level(o,lookup(o.typ))!==level(other,lookup(other.typ)))continue;
     if(overlaps(o,other))issues.push({room:r,object:o,kind:'overlap',message:'Überlappung: '+(o.name||o.typ)+' / '+(other.name||other.typ)});
    }
    if(lookup(o.typ)?.rug)continue;
    for(const door of r.oeffnungen||[])if(isDoorBlocked(r,door,o,openingAnchor)){
     issues.push({room:r,object:o,kind:'door',message:'Türöffnung blockiert: '+(o.name||o.typ)});
    }
   }
  }
  return issues;
 }
 function distances(r,o){
  const points=corners(o),minx=Math.min(...points.map(p=>p.x)),maxx=Math.max(...points.map(p=>p.x)),miny=Math.min(...points.map(p=>p.y)),maxy=Math.max(...points.map(p=>p.y));
  return {left:Math.round(minx),right:Math.round(r.breite-maxx),top:Math.round(miny),bottom:Math.round(r.tiefe-maxy)};
 }
 window.WP_13={drawShape,level,exactPosition,outsideRoom,isDoorBlocked,audit,distances,overlaps,corners};
})();
