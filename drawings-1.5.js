/* WohnPlan 1.5 – Individual top-down vector furniture illustrations | Created by MS */
(function(){
'use strict';
const prevDraw=window.WP_13?.drawShape;
const light=(c,p)=>{const v=parseInt(c.slice(1),16),rgb=[v>>16&255,v>>8&255,v&255];return '#'+rgb.map(a=>Math.round(a+(255-a)*p).toString(16).padStart(2,'0')).join('')};
const dark=(c,p)=>{const v=parseInt(c.slice(1),16),rgb=[v>>16&255,v>>8&255,v&255];return '#'+rgb.map(a=>Math.round(a*(1-p)).toString(16).padStart(2,'0')).join('')};
const palette={sofa:'#b0c9df',chair:'#c5d3dd',plant:'#72a77e',rug:'#d2c2ae',bed:'#b8cedb',table:'#c7b69e',storage:'#b7cadd',kitchen:'#b2ced9',bath:'#c8d9e5',office:'#adc5dc',outdoor:'#b1c8ad',decor:'#c8c6d6'};
function draw(c,custom){
 const v=c.variant,k=c.kind;
 const base=/^#[0-9a-fA-F]{6}$/.test(custom||'')?custom:(palette[k]||'#b8cee1');
 const soft=light(base,.52),pale=light(base,.78),shadow=dark(base,.33),ink=dark(base,.51);
 const edge='#5e7489',white='#fafcff',black='#37566c',green=custom&&/^#[0-9a-fA-F]{6}$/.test(custom)?base:'#6ca477',gDark=dark(green,.28),gLight=light(green,.36),wood='#b88d63',glass='#c8e5ee';
 const R=(x,y,w,h,fill=base,rad=5,stroke=edge,sw=1.9)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+rad+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';
 const C=(x,y,r,fill=base,stroke=edge,sw=1.7)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';
 const E=(x,y,rx,ry,fill=base,stroke=edge,sw=1.8)=>'<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="'+ry+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';
 const P=(d,fill='none',stroke=edge,sw=2)=>'<path d="'+d+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linejoin="round" stroke-linecap="round"/>';
 const L=(x1,y1,x2,y2,stroke=edge,sw=2)=>P('M'+x1+' '+y1+'L'+x2+' '+y2,'none',stroke,sw);
 const PL=(coords,fill=base,stroke=edge,sw=2)=>'<polygon points="'+coords+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linejoin="round"/>';
 const group=(x,y,deg,inside)=>'<g transform="translate('+x+' '+y+') rotate('+deg+')">'+inside+'</g>';
 const radial=(count,radius,content)=>Array.from({length:count},(_,i)=>{const a=2*Math.PI*i/count-Math.PI/2;return group(50+Math.cos(a)*radius,50+Math.sin(a)*radius,a*180/Math.PI+90,content(i))}).join('');
 const seed=[...String(c.id)].reduce((n,ch)=>(n*33+ch.charCodeAt(0))>>>0,53);
 let s='';
 if(k==='sofa'){
  const pads=n=>Array.from({length:n},(_,i)=>R(9+i*82/n,36,82/n-3,43,soft,7)).join('');
  const arms=R(1,28,13,55,base,7)+R(86,28,13,55,base,7);
  const classic=n=>R(2,7,96,86,base,12)+R(7,11,86,21,soft,8)+pads(n)+arms;
  const dots=(n,rows=2)=>Array.from({length:n*rows},(_,i)=>C(15+(i%n)*(70/Math.max(1,n-1)),43+Math.floor(i/n)*21,2.3,ink,ink,.6)).join('');
  switch(v){
  case 'loveseat':s=classic(2)+R(38,77,24,8,pale,3);break;
  case 'midcentury':s=classic(3)+R(6,87,12,9,wood,1)+R(82,87,12,9,wood,1)+L(32,39,32,79,edge,1);break;
  case 'boucle':s=classic(3)+Array.from({length:8},(_,i)=>C(12+i*11,13,5,pale,'none',0)).join('');break;
  case 'chester':s=classic(2)+dots(4,3)+R(3,23,10,63,soft,7)+R(87,23,10,63,soft,7);break;
  case 'curved':s=P('M6 70Q-2 24 29 14Q50 1 71 14Q102 24 94 70L82 88Q50 100 18 88Z',base)+E(50,50,33,31,soft)+P('M22 27Q50 9 78 27','none',pale,5);break;
  case 'wave':s=P('M3 85Q11 70 3 55Q11 41 3 26Q15 9 29 16Q50 5 71 16Q86 9 97 26Q89 41 97 55Q89 70 97 85Z',base)+P('M8 38Q28 29 48 38T93 38 M8 65Q28 56 48 65T93 65','none',soft,9);break;
  case 'modular3':s=R(1,7,98,86,base,6)+Array.from({length:3},(_,i)=>R(5+i*31,12,28,75,i%2?soft:pale,5)).join('');break;
  case 'modular4':s=R(1,7,98,86,base,6)+Array.from({length:4},(_,i)=>R(4+i*23.5,11,22,77,i%2?soft:pale,5)).join('');break;
  case 'leftchaise':s=R(2,4,96,42,base,10)+R(2,4,33,92,base,9)+R(8,12,23,72,soft,7)+R(39,14,24,27,soft)+R(66,14,25,27,soft)+R(4,43,9,49,pale,3);break;
  case 'rightchaise':s=R(2,4,96,42,base,10)+R(65,4,33,92,base,9)+R(69,12,23,72,soft,7)+R(37,14,24,27,soft)+R(9,14,25,27,soft)+R(87,43,9,49,pale,3);break;
  case 'ularge':s=PL('3,4 97,4 97,96 72,96 72,43 28,43 28,96 3,96',base)+R(8,9,84,25,soft)+R(7,40,16,48,soft)+R(77,40,16,48,soft)+R(31,12,37,21,pale);break;
  case 'roundedcorner':s=P('M5 6H93V80Q88 99 69 96H52V48H5Z',base)+R(12,12,38,27,soft,8)+E(74,30,15,20,soft)+R(65,52,22,34,soft,8);break;
  case 'futon':s=R(3,8,94,84,base,2)+R(9,13,82,20,soft,2)+R(9,37,82,45,pale,2)+L(8,84,92,84,ink,3);break;
  case 'pullout':s=classic(2)+R(16,45,68,48,pale,2)+R(20,50,60,12,white,2)+L(21,67,79,67,soft,2);break;
  case 'reclining':s=classic(3)+Array.from({length:3},(_,i)=>C(23+27*i,55,8,pale)).join('')+C(35,84,4,ink)+C(65,84,4,ink);break;
  case 'rattan':s=classic(3)+Array.from({length:7},(_,i)=>L(8+i*13,10,8+i*13,31,wood,1.5)).join('')+L(6,85,94,85,wood,3);break;
  case 'velvet':s=classic(3)+Array.from({length:3},(_,i)=>P('M'+(15+28*i)+' 53q13 -12 23 0','none',pale,3)).join('');break;
  case 'semicircle':s=P('M5 87Q8 15 50 7Q92 15 95 87Z',base)+P('M17 85Q20 29 50 21Q80 29 83 85','none',pale,9)+P('M35 76Q50 58 65 76','none',soft,5);break;
  }
 }
 else if(k==='chair'){
  const body=(arm=false)=>R(17,12,66,76,base,arm?13:7)+R(22,17,56,22,soft,7)+R(24,43,52,37,soft,8)+(arm?R(7,36,16,44,base)+R(77,36,16,44,base):'');
  switch(v){
  case 'egg':s=E(50,49,43,47,base)+E(50,53,30,34,pale)+R(34,20,32,18,soft,12);break;
  case 'wing':s=body(true)+R(4,12,25,24,soft,11)+R(71,12,25,24,soft,11);break;
  case 'rocking':s=body(false)+P('M3 88Q50 110 97 88','none',wood,5)+R(7,29,10,45,wood,2)+R(83,29,10,45,wood,2);break;
  case 'beanbag':s=P('M45 3Q80 3 84 29Q105 49 88 74Q70 102 40 96Q6 96 8 64Q-1 36 23 16Z',soft)+P('M21 43Q49 10 78 40Q92 75 57 85Q24 82 21 43Z',base,ink,1.5);break;
  case 'butterfly':s=PL('11,14 49,28 88,14 75,51 88,86 50,67 12,86 25,51',soft)+L(10,10,90,91,wood,3)+L(90,10,10,91,wood,3);break;
  case 'club':s=body(true)+R(13,20,74,15,pale,13);break;
  case 'swivel':s=body(false)+C(50,51,17,pale)+P('M50 78V94 M26 92H74 M31 82L69 98 M69 82L31 98','none',ink,3);break;
  case 'reading':s=body(true)+R(26,7,48,22,pale,8)+R(24,75,52,17,soft,6);break;
  case 'lounge':s=R(14,8,70,60,base,16)+R(25,14,50,46,soft,12)+R(18,73,64,24,pale,10)+L(17,68,83,68,ink,2);break;
  case 'papasan':s=C(50,50,47,wood)+C(50,50,40,soft)+Array.from({length:8},(_,i)=>{let a=i*Math.PI/4;return L(50,50,50+36*Math.cos(a),50+36*Math.sin(a),pale,1.5)}).join('');break;
  case 'tulip':s=C(50,52,39,base)+C(50,53,26,soft)+R(36,3,28,27,pale,15);break;
  case 'recliner':s=body(true)+R(22,77,56,22,soft,6)+L(28,85,72,85,ink,2);break;
  case 'ottoman':s=C(50,50,43,base)+C(50,50,37,soft)+Array.from({length:6},(_,i)=>{const a=i*Math.PI/3;return L(50,50,50+33*Math.cos(a),50+33*Math.sin(a),pale,1.7)}).join('');break;
  case 'pouf':s=R(3,15,94,73,base,20)+Array.from({length:5},(_,i)=>L(13,24+i*12,86,24+i*12,pale,2)).join('');break;
  case 'wicker':s=body(true)+Array.from({length:6},(_,i)=>L(16+i*14,17,16+i*14,81,wood,1.1)).join('');break;
  case 'ball':s=C(50,50,48,shadow)+C(50,50,40,base)+P('M22 79Q5 28 48 10Q92 12 79 66Q48 95 22 79Z',soft,edge,2);break;
  case 'vienna':s=C(50,54,29,wood)+P('M24 32Q50 4 76 32','none',wood,8)+C(50,54,17,pale);break;
  case 'shell':s=P('M11 30Q2 8 50 7Q98 8 89 30L77 84Q50 106 23 84Z',base)+E(50,56,24,25,soft);break;
  case 'bistro':s=R(23,30,54,55,base,4)+R(20,8,60,21,pale,4)+L(26,12,26,89,ink,3)+L(74,12,74,89,ink,3);break;
  case 'cantilever':s=R(16,31,68,53,soft)+R(18,4,64,26,base)+P('M14 13V94H86V84','none',ink,5);break;
  case 'leather':s=body(false)+R(23,45,54,31,'#b38a66',6);break;
  case 'rounded':s=E(50,56,34,38,base)+E(50,56,26,27,soft)+R(25,8,50,24,pale,13);break;
  case 'barback':s=body(false)+R(7,87,86,9,wood,1);break;
  case 'barround':s=C(50,50,37,wood)+C(50,50,27,soft)+L(16,80,84,80,ink,3);break;
  case 'bench':s=R(2,15,96,70,base,10)+Array.from({length:4},(_,i)=>R(7+i*22,23,19,53,soft,4)).join('');break;
  case 'cornerbench':s=PL('4,4 96,4 96,44 44,44 44,96 4,96',base)+R(8,10,80,26,soft)+R(10,42,25,46,soft);break;
  }
 }
 else if(k==='plant'){
  const pot=(r=15)=>C(50,50,r,wood,ink,1.8)+C(50,50,r*.73,'#a98c68',wood,1);
  const leaf=(len=33,width=11,tint=green)=>E(0,-len*.45,width,len*.6,tint,gDark,1.1);
  const flower=(x,y,tint)=>C(x,y,7,tint,gDark,.8)+C(x,y,2,'#f5d087','#ccac57',.6);
  const petals=(num,len,wid,tint=green)=>radial(num,10,()=>leaf(len,wid,tint));
  switch(v){
  case 'monstera':s=pot(13)+petals(6,45,15)+radial(6,29,()=>C(0,-7,3.5,white,gDark,.5));break;
  case 'palm':s=pot(12)+petals(9,68,6)+radial(9,27,()=>P('M0 -35L-6 -16 M0 -31L6 -12','none',gDark,1.5));break;
  case 'cactus':s=C(50,50,30,'#c8a17b')+C(50,50,20,green)+C(62,43,10,gDark)+Array.from({length:9},(_,i)=>{let a=i*Math.PI*2/9;return L(50+25*Math.cos(a),50+25*Math.sin(a),50+34*Math.cos(a),50+34*Math.sin(a),gDark,2)}).join('');break;
  case 'succulent':s=pot(27)+petals(12,34,9,gLight)+petals(7,19,8,green)+C(50,50,5,gDark);break;
  case 'bonsai':s=pot(15)+P('M50 50Q31 31 45 16 M50 50Q76 32 67 12','none',wood,6)+C(35,25,19,green)+C(68,25,18,gLight)+C(54,9,12,gDark);break;
  case 'ficus':s=pot(14)+petals(11,49,7)+radial(11,32,()=>C(0,0,7,gLight,gDark,1));break;
  case 'banana':s=pot(13)+petals(5,72,18)+radial(5,26,()=>P('M0 -36V-6','none',gDark,2));break;
  case 'olive':s=pot(13)+petals(12,45,6,gLight)+radial(7,33,()=>C(0,-3,2.8,'#526782','#526782',.5));break;
  case 'orchid':s=pot(15)+P('M50 50L56 20L74 7','none',gDark,2)+radial(5,23,()=>E(0,-6,9,7,'#f4d7ec','#c59bbb',1))+C(50,24,6,'#efbade');break;
  case 'snake':s=pot(19)+radial(7,7,()=>P('M-7 7Q-14 -30 0 -43Q17 -24 7 7Z',gLight,gDark,1.6));break;
  case 'fern':s=pot(12)+petals(11,67,5,gLight)+radial(11,28,()=>E(0,-5,8,3,green,gDark,.7));break;
  case 'bamboo':s=pot(19)+Array.from({length:5},(_,i)=>R(23+i*12,18-(i%2)*12,5,57,green,2,gDark,1)).join('')+radial(5,21,()=>leaf(18,5,gLight));break;
  case 'hanging':s=C(50,50,21,wood)+C(50,50,14,green)+radial(12,26,()=>P('M0 2Q12 17 3 33','none',green,3));break;
  case 'rubber':s=pot(14)+radial(6,13,()=>E(0,-30,16,24,green,gDark,1.8));break;
  case 'eucalyptus':s=pot(12)+petals(8,43,5,gLight)+radial(10,31,()=>C(0,0,9,gLight,gDark,1));break;
  case 'lavender':s=pot(22)+radial(13,20,()=>C(0,-16,4,'#9b85c8','#8873ad',.7));break;
  case 'flowers':s=pot(13)+radial(6,28,i=>{const colors=['#e8a6bc','#f9db83','#d2a4de','#faa98e','#98cde5','#c1d69a'];return C(0,0,11,colors[i],white,1)+C(0,0,3,'#f5ca70','#d9ac55',.8)})+C(50,50,5,green);break;
  case 'herbs':s=R(4,24,92,53,wood,5)+Array.from({length:8},(_,i)=>C(14+i*10,45+(i%2)*10,9,i%2?gLight:green,gDark,.8)).join('');break;
  case 'topiary':s=pot(16)+C(50,44,35,green)+C(50,44,26,gLight)+Array.from({length:4},(_,i)=>C(31+15*(i%2),30+20*Math.floor(i/2),6,green,'none',0)).join('');break;
  case 'rose':s=pot(16)+petals(10,42,7)+radial(7,25,()=>C(0,-4,7,'#d98398','#ae6680',1))+C(50,50,5,'#ffe4b2');break;
  }
 }
 else if(k==='rug'){
  const border=(round=false,oval=false)=>round?C(50,50,46,base,shadow,1.8):oval?E(50,50,46,35,base,shadow):R(3,4,94,92,base,4,shadow);
  const frame=R(11,12,78,76,'none',2,soft,1.7);
  switch(v){
  case 'oriental':s=border()+frame+PL('50,19 80,50 50,81 20,50',soft,shadow)+C(50,50,11,base);break;
  case 'persian':s=border()+frame+Array.from({length:5},(_,i)=>C(22+i*14,25+(i%2)*48,5,soft)).join('')+PL('50,24 75,50 50,76 25,50',soft,shadow);break;
  case 'geometric':s=border()+PL('12,18 44,18 28,52',soft)+PL('55,14 88,56 55,82',shadow)+PL('15,78 47,53 44,87',pale);break;
  case 'stripes':s=border()+Array.from({length:7},(_,i)=>R(14,13+i*11,72,5,i%2?soft:shadow,0,'none',0)).join('');break;
  case 'checker':s=border()+Array.from({length:16},(_,i)=>R(13+(i%4)*18,13+Math.floor(i/4)*18,17,17,(Math.floor(i/4)+(i%4))%2?pale:shadow,0,'none',0)).join('');break;
  case 'shaggy':s=border()+Array.from({length:20},(_,i)=>{const x=8+i*4.5;return P('M'+x+' 12Q'+(x+8)+' 50 '+x+' 87','none',i%3?soft:pale,2.2)}).join('');break;
  case 'jute':s=border(true)+Array.from({length:4},(_,i)=>C(50,50,36-i*9,'none',i%2?wood:soft,2)).join('')+Array.from({length:12},(_,i)=>{let a=2*Math.PI*i/12;return L(50+10*Math.cos(a),50+10*Math.sin(a),50+40*Math.cos(a),50+40*Math.sin(a),wood,.9)}).join('');break;
  case 'oval':s=border(false,true)+E(50,50,36,25,'none',soft,2)+E(50,50,19,13,pale);break;
  case 'runner':s=R(23,2,54,96,base,4,shadow)+R(29,9,42,82,'none',2,soft)+Array.from({length:5},(_,i)=>PL('50,'+(11+i*18)+' 65,'+(20+i*18)+' 50,'+(29+i*18)+' 35,'+(20+i*18),soft,shadow,.8)).join('');break;
  case 'cowhide':s=P('M44 3Q62 8 71 25L97 25Q104 35 82 46L96 72Q92 88 68 84L52 98L36 86L9 94L19 62L1 40L26 27Z',base,shadow,2)+P('M28 44Q37 20 52 41Q68 65 48 79Q25 71 28 44Z',soft);break;
  case 'wave':s=border()+Array.from({length:4},(_,i)=>P('M13 '+(19+i*20)+'Q32 '+(2+i*20)+' 51 '+(19+i*20)+'T90 '+(19+i*20),'none',i%2?soft:shadow,3.5)).join('');break;
  case 'marble':s=border()+P('M15 82Q27 60 40 66T75 41Q88 26 86 12 M12 45Q29 12 41 29T84 16','none',soft,4)+P('M16 87Q44 69 59 92','none',shadow,1);break;
  case 'roads':s=R(3,4,94,92,'#a4baac',5)+P('M16 8H85V32H34V77H89','none','#555e66',15)+P('M16 8H85V32H34V77H89','none','#f1f1e5',2)+C(75,66,10,green);break;
  case 'cloud':s=P('M13 70Q-4 54 15 39Q10 18 36 20Q50 0 68 17Q91 13 92 35Q112 55 89 74Q77 91 57 86Q32 105 13 70Z',pale,soft,2);break;
  case 'puzzle':s=border()+Array.from({length:4},(_,i)=>{const x=12+(i%2)*38,y=12+Math.floor(i/2)*38;return P('M'+x+' '+y+'h35v13a6 6 0 1 1 0 12v10h-35v-11a6 6 0 1 0 0 -12Z',i%2?soft:pale,shadow,.9)}).join('');break;
  case 'zigzag':s=border()+Array.from({length:5},(_,i)=>P('M10 '+(18+i*14)+'L30 '+(5+i*14)+'L50 '+(18+i*14)+'L70 '+(5+i*14)+'L90 '+(18+i*14),'none',i%2?soft:shadow,3)).join('');break;
  case 'braided':s=border(true)+Array.from({length:5},(_,i)=>C(50,50,42-i*7,'none',i%2?wood:soft,3)).join('');break;
  case 'outdoor':s=border()+Array.from({length:7},(_,i)=>L(13,16+i*11,87,16+i*11,i%2?gDark:soft,3)).join('')+R(17,17,66,64,'none',1,gDark,2);break;
  }
 }
 else if(k==='bed'){
  const double=(p=2)=>R(3,3,94,94,base,7)+R(9,9,82,82,soft,5)+Array.from({length:p},(_,i)=>R(10+i*80/p,10,80/p-3,20,white,4)).join('')+R(9,35,82,53,pale,3);
  switch(v){
  case 'canopy':s=double(2)+Array.from({length:4},(_,i)=>C(5+(i%2)*90,5+Math.floor(i/2)*90,4,wood,ink)).join('')+P('M5 5H95V95H5Z','none',wood,3);break;
  case 'futon':s=R(3,2,94,96,wood,1)+R(8,5,84,89,soft,3)+R(16,9,68,20,white,3)+R(8,36,84,54,pale,1);break;
  case 'daybed':s=R(2,9,96,82,base,10)+R(9,16,82,69,soft,6)+R(12,15,18,64,pale,5)+R(70,15,18,64,pale,5);break;
  case 'trundle':s=R(3,1,94,95,wood,4)+R(8,8,84,60,soft)+R(13,14,74,15,white)+R(9,71,80,19,pale)+P('M85 76H95','none',ink,3);break;
  case 'round':s=C(50,50,47,wood)+C(50,50,41,soft)+R(25,16,23,17,white,6)+R(52,16,23,17,white,6)+P('M15 46Q50 58 85 46','none',pale,6);break;
  case 'loftdesk':s=double(1)+R(10,58,80,31,wood,2)+R(18,62,38,19,pale,2)+R(64,60,20,20,'#80a8c7',2)+P('M89 10V94 M78 10V94 M78 45H89 M78 65H89','none',ink,2);break;
  case 'murphy':s=R(1,1,98,98,wood,4)+R(9,7,82,86,soft,4)+R(15,14,70,14,white)+P('M11 38H89 M49 38V89','none',shadow,2)+C(50,89,4,wood);break;
  case 'platform':s=R(1,1,98,98,wood,0)+R(10,10,80,80,soft,4)+R(13,13,35,21,white)+R(52,13,35,21,white)+P('M10 52H90','none',pale,5);break;
  case 'house':s=double(1)+P('M6 8L50 -4L94 8V94H6Z','none',wood,3)+P('M16 8L50 2L84 8','none',wood,2);break;
  case 'cradle':s=E(50,50,44,43,wood)+E(50,50,35,31,soft)+R(36,20,28,18,white,8)+P('M10 82Q50 99 90 82','none',wood,5);break;
  case 'crib':s=double(1)+Array.from({length:7},(_,i)=>L(8+i*14,3,8+i*14,97,wood,2)).join('');break;
  case 'stack':s=double(1)+R(5,45,90,48,pale,3)+R(17,49,66,16,white,3)+P('M8 8V93 M22 8V93 M8 37H22 M8 67H22','none',ink,2);break;
  }
 }
 else if(k==='table'){
  const seat=(x,y,angle=0)=>group(x,y,angle,R(-7,-8,14,16,pale,3));
  const around=(n)=>Array.from({length:n},(_,i)=>{const a=2*Math.PI*i/n;return seat(50+44*Math.cos(a),50+44*Math.sin(a),i*360/n)}).join('');
  switch(v){
  case 'glassround':s=C(50,50,39,glass)+C(50,50,33,'none',pale,2)+around(4);break;
  case 'pedestal':s=C(50,50,40,wood)+C(50,50,15,soft)+around(4);break;
  case 'oval6':s=E(50,50,40,31,wood)+around(6);break;
  case 'oval8':s=E(50,50,40,30,wood)+around(8);break;
  case 'folding':s=R(13,16,74,68,wood,2)+L(50,16,50,84,shadow,2)+P('M18 21L40 39L18 59 M82 21L60 39L82 59','none',pale,3);break;
  case 'butterfly':s=R(7,14,86,72,wood,8)+R(43,14,14,72,pale,2)+P('M42 22L57 50L42 77','none',shadow,2)+around(4);break;
  case 'liveedge':s=P('M9 20Q24 7 44 18Q68 9 91 20L90 80Q72 95 52 82Q23 91 9 80Z',wood,shadow,2)+P('M19 29Q53 20 81 29 M19 73Q43 66 81 74','none',pale,2.4)+around(4);break;
  case 'breakfast':s=R(9,12,82,55,wood,6)+R(9,9,82,12,pale,2)+seat(27,82)+seat(50,82)+seat(73,82);break;
  case 'high':s=C(50,50,36,wood)+C(50,50,12,pale)+seat(50,9)+seat(50,91);break;
  case 'beer':s=R(12,30,76,40,wood,4)+R(12,8,76,15,pale,2)+R(12,77,76,15,pale,2)+Array.from({length:4},(_,i)=>L(20+i*19,30,20+i*19,70,shadow,1)).join('');break;
  case 'conference':s=E(50,50,42,28,wood)+around(10)+R(43,40,14,20,soft,2);break;
  case 'glasscoffee':s=R(7,9,86,82,glass,7)+R(13,16,74,68,'none',3,pale,2)+C(24,25,3,edge)+C(76,75,3,edge);break;
  case 'nesting':s=R(5,5,58,63,wood,12)+R(35,38,60,57,soft,12)+C(58,65,18,pale);break;
  case 'organic':s=P('M15 14Q54 -5 80 17Q104 41 82 61Q66 100 35 84Q-2 85 7 45Z',wood)+P('M22 39Q53 15 81 39','none',pale,2);break;
  case 'marble':s=R(5,13,90,75,pale,9)+P('M10 72Q31 48 58 60T91 24 M18 19Q27 44 42 32T80 17','none',shadow,1.8);break;
  }
 }
 else if(k==='storage'){
  const grid=(cols,rows,fill=base)=>R(2,3,96,94,fill,2)+Array.from({length:cols-1},(_,i)=>L(2+(i+1)*96/cols,4,2+(i+1)*96/cols,95)).join('')+Array.from({length:rows-1},(_,i)=>L(3,3+(i+1)*94/rows,97,3+(i+1)*94/rows)).join('');
  switch(v){
  case 'wardrobeopen':s=grid(3,2)+R(6,9,25,63,soft,1)+R(36,7,25,65,pale,1)+Array.from({length:4},(_,i)=>R(69,10+i*20,22,14,soft,1)).join('')+L(7,80,92,80,wood,3);break;
  case 'mirrored':s=R(1,1,98,98,base,2)+R(7,6,41,88,glass)+R(51,6,42,88,glass)+L(50,6,50,94,ink,3)+R(44,41,4,21,ink,1)+R(52,41,4,21,ink,1);break;
  case 'triple':s=grid(3,1)+Array.from({length:3},(_,i)=>R(28+i*31,44,3,15,pale,2)).join('');break;
  case 'vintage':s=R(3,4,94,92,wood,4)+Array.from({length:4},(_,i)=>R(9,9+i*21,82,19,soft,2)+C(50,18+i*21,2,ink)).join('')+C(10,92,3,wood)+C(90,92,3,wood);break;
  case 'cornershelf':s=PL('3,3 96,3 96,32 32,32 32,96 3,96',base)+P('M4 28H88 M28 4V88','none',ink,2)+C(16,16,7,pale);break;
  case 'float':s=R(3,36,94,27,wood,1)+Array.from({length:6},(_,i)=>R(10+i*13,40,6,19,soft,1)).join('');break;
  case 'ladder':s=PL('20,3 80,3 95,97 5,97',base)+Array.from({length:4},(_,i)=>L(13+i*3,18+i*24,87-i*3,18+i*24,wood,4)).join('');break;
  case 'honeycomb':s=grid(4,2)+Array.from({length:6},(_,i)=>PL((21+(i%3)*29)+','+(13+Math.floor(i/3)*46)+' '+(36+(i%3)*29)+','+(13+Math.floor(i/3)*46)+' '+(43+(i%3)*29)+','+(27+Math.floor(i/3)*46)+' '+(36+(i%3)*29)+','+(41+Math.floor(i/3)*46)+' '+(21+(i%3)*29)+','+(41+Math.floor(i/3)*46)+' '+(14+(i%3)*29)+','+(27+Math.floor(i/3)*46),pale,ink,1)).join('');break;
  case 'glass':s=grid(2,4,glass)+Array.from({length:3},(_,i)=>R(16,10+i*28,26,10,soft,2)).join('');break;
  case 'tvboard':s=R(3,25,94,63,base)+R(7,30,86,12,'#668aa8')+R(9,55,26,29,soft)+R(38,55,24,29,pale)+R(65,55,26,29,soft);break;
  case 'wine':s=grid(4,3)+Array.from({length:12},(_,i)=>C(14+(i%4)*23,16+Math.floor(i/4)*31,7,'#65847a',ink,1)).join('');break;
  case 'sideboard':s=grid(4,1)+Array.from({length:4},(_,i)=>C(14+i*24,50,3,pale)).join('');break;
  }
 }
 else if(k==='kitchen'){
  switch(v){
  case 'induction':s=R(2,2,96,96,ink,3)+C(27,25,18,'none',glass,2)+C(73,27,15,'none',glass,2)+C(33,70,13,'none',glass,2)+C(73,70,18,'none',glass,2);break;
  case 'gas':s=R(2,2,96,96,base,5)+Array.from({length:5},(_,i)=>{const x=i===4?50:26+(i%2)*48,y=i===4?50:26+Math.floor(i/2)*48;return C(x,y,13,soft)+C(x,y,5,ink)+P('M'+(x-18)+' '+y+'H'+(x+18)+' M'+x+' '+(y-18)+'V'+(y+18),'none',ink,2)}).join('');break;
  case 'coffee':s=R(8,4,84,92,shadow,6)+R(15,12,70,20,soft)+R(20,39,60,39,base)+C(50,60,14,white)+C(79,16,5,pale);break;
  case 'espresso':s=R(4,6,92,72,ink,4)+R(10,12,42,28,soft)+R(57,15,26,23,pale)+P('M20 62H80 M50 38V75','none',white,4)+R(22,82,57,10,base);break;
  case 'sidefridge':s=R(2,2,96,96,base,4)+L(50,2,50,98,ink,3)+R(39,29,5,45,shadow,3)+R(56,29,5,45,shadow,3)+R(8,7,84,12,soft);break;
  case 'freezer':s=R(2,7,96,83,base,3)+R(8,14,84,18,soft)+P('M10 45H90 M49 45V85','none',ink,3)+R(65,13,17,7,pale,1);break;
  case 'winecooler':s=R(4,4,92,92,ink,3)+Array.from({length:4},(_,i)=>R(10,11+i*20,80,14,glass,2)+Array.from({length:4},(_,j)=>C(20+j*19,18+i*20,5,wood,'none',0)).join('')).join('');break;
  case 'oventower':s=R(2,2,96,96,base)+R(11,10,78,30,ink)+R(18,16,64,18,glass)+R(11,51,78,38,ink)+R(18,57,64,23,glass)+C(78,44,3,ink);break;
  case 'sinkisland':s=R(2,2,96,96,wood,3)+R(9,15,38,68,glass,7)+C(28,50,4,ink)+C(74,36,13,shadow)+C(74,70,13,shadow);break;
  case 'islandstools':s=R(9,8,82,66,wood)+C(26,40,14,soft)+C(73,40,14,soft)+C(25,87,9,pale)+C(50,87,9,pale)+C(75,87,9,pale);break;
  case 'islandhood':s=P('M34 3H66L84 77H16Z',base)+R(7,74,86,17,ink,3)+L(21,66,79,66,shadow,3)+C(50,18,4,pale);break;
  case 'breadbox':s=R(6,15,88,67,wood,12)+P('M10 60Q50 48 90 60','none',pale,5)+R(35,71,30,4,ink,2);break;
  case 'toaster':s=R(12,15,76,72,base,16)+R(22,20,18,12,ink)+R(59,20,18,12,ink)+C(77,60,6,pale)+R(3,69,9,6,shadow);break;
  case 'kettle':s=C(50,50,36,base)+C(50,50,25,pale)+P('M31 17Q49 -3 69 17','none',ink,4)+R(80,37,17,15,shadow,3);break;
  case 'trolley':s=R(6,13,88,72,wood,4)+R(13,21,74,15,soft)+R(13,47,74,15,soft)+C(17,91,7,ink)+C(83,91,7,ink);break;
  }
 }
 else if(k==='bath'){
  const basin=(x,y,scale=1)=>group(x,y,0,E(0,0,28*scale,21*scale,glass)+C(0,0,4,ink));
  switch(v){
  case 'rainshower':s=R(3,3,94,94,glass,4)+C(50,50,31,'none',edge,2)+Array.from({length:12},(_,i)=>{const a=2*Math.PI*i/12;return C(50+24*Math.cos(a),50+24*Math.sin(a),2.5,white,'none',0)}).join('')+C(50,50,5,ink);break;
  case 'walkin':s=R(2,2,96,96,glass,2)+P('M15 2V84 M15 84H95','none',ink,3)+R(81,12,4,76,soft)+C(69,16,5,ink);break;
  case 'freestanding':s=R(3,15,94,70,base,25)+R(11,23,78,54,white,22)+C(78,49,4,ink)+P('M71 38Q78 28 84 38','none',ink,2);break;
  case 'clawfoot':s=E(50,50,46,33,base)+E(50,50,37,24,white)+C(76,45,4,ink)+Array.from({length:4},(_,i)=>C(12+(i%2)*76,22+Math.floor(i/2)*56,5,wood,ink,1)).join('');break;
  case 'doublevanity':s=R(2,8,96,84,base,3)+basin(27,49,.65)+basin(73,49,.65)+R(47,81,6,6,shadow,2);break;
  case 'vanity':s=R(3,3,94,94,base)+E(50,43,33,24,white)+C(50,43,4,ink)+R(8,77,84,11,pale);break;
  case 'wallwc':s=E(50,56,28,37,white)+E(50,56,18,25,glass)+R(25,3,50,19,base)+C(50,13,4,ink);break;
  case 'steam':s=R(1,1,98,98,glass)+R(7,7,86,86,'none',3,soft,3)+Array.from({length:5},(_,i)=>P('M'+(20+i*14)+' 15Q'+(30+i*14)+' 31 '+(20+i*14)+' 53','none',soft,3)).join('')+C(74,81,8,ink);break;
  case 'towelrack':s=R(3,4,94,92,base,3)+Array.from({length:4},(_,i)=>R(10,13+i*20,80,15,i%2?soft:white,2)).join('');break;
  case 'washerstack':s=R(2,2,96,96,base)+R(9,9,82,40,soft)+C(50,29,17,glass)+R(9,53,82,39,soft)+C(50,73,16,glass)+C(80,56,4,ink);break;
  }
 }
 else if(k==='office'){
  const monitor=(x,y,w=55,h=30)=>R(x,y,w,h,ink,4)+R(x+4,y+4,w-8,h-8,glass,2)+L(x+w/2,y+h,x+w/2,y+h+9,ink,3);
  switch(v){
  case 'cornerdesk':s=PL('3,3 97,3 97,38 40,38 40,97 3,97',wood)+monitor(45,7,42,23)+R(8,50,22,34,soft);break;
  case 'standing':s=R(5,5,90,85,wood)+R(12,14,76,15,soft)+P('M17 83H83 M20 6V90 M80 6V90','none',ink,3);break;
  case 'drafting':s=R(4,5,92,90,soft,5)+R(13,12,74,76,white,2)+P('M18 84L80 18 M19 69H72','none',ink,2)+C(82,17,5,wood);break;
  case 'gaming':s=R(2,10,96,79,ink)+monitor(9,17,38,35)+monitor(54,17,38,35)+R(19,67,60,11,glass)+C(88,80,6,'#b68ed8');break;
  case 'dualmon':s=monitor(3,11,45,56)+monitor(52,11,45,56)+P('M24 67V87 M74 67V87 M24 86H74','none',ink,3);break;
  case 'ultrawide':s=monitor(1,19,98,57)+P('M22 83H78','none',ink,3);break;
  case 'scanner':s=R(5,14,90,70,ink,5)+R(12,19,76,48,glass)+R(19,73,62,7,soft)+C(81,76,3,green);break;
  case 'printer':s=R(3,17,94,70,base,6)+R(18,6,64,22,white)+R(18,61,64,25,white)+C(81,42,5,green);break;
  case 'server':s=R(7,2,86,96,ink,4)+Array.from({length:6},(_,i)=>R(14,9+i*14,72,9,i%2?shadow:base,2)+C(76,13+i*14,2.5,'#6fce9c')).join('');break;
  case 'ergochair':s=R(19,12,62,68,base,16)+R(27,17,46,16,soft)+R(25,41,50,34,soft)+R(2,35,15,38,shadow)+R(83,35,15,38,shadow)+P('M50 76V96 M23 90H77','none',ink,3);break;
  }
 }
 else if(k==='outdoor'){
  switch(v){
  case 'hangingchair':s=C(50,50,46,'none',wood,4)+E(50,51,32,39,base)+E(50,57,24,25,soft)+C(50,4,5,ink);break;
  case 'woodbench':s=R(3,10,94,81,wood,6)+Array.from({length:6},(_,i)=>R(9,15+i*12,82,7,i%2?soft:wood,1)).join('');break;
  case 'firepit':s=C(50,50,45,wood)+C(50,50,32,ink)+P('M50 20Q20 46 50 81Q85 43 50 20Z','#efb06d','#efb06d',1)+P('M46 43Q39 55 53 73Q66 53 46 43Z','#ffe2a2','#ffe2a2',1);break;
  case 'raisedbed':s=R(2,4,96,92,wood,3)+R(11,12,78,76,'#7f9b75',2)+Array.from({length:8},(_,i)=>C(25+(i%4)*17,23+Math.floor(i/4)*39,10,i%2?green:gLight,gDark,1)).join('');break;
  case 'hammock':s=L(7,7,93,93,ink,4)+P('M13 15Q50 80 88 84L94 93Q53 98 7 21Z',soft,wood,2)+Array.from({length:5},(_,i)=>L(15+i*10,27+i*9,34+i*10,60+i*6,pale,1)).join('');break;
  case 'sunlounger':s=R(4,3,92,94,wood,12)+R(9,9,82,32,soft,10)+R(9,46,82,44,pale,7)+P('M9 43H91','none',ink,3);break;
  case 'gazebo':s=R(3,3,94,94,'none',4,wood,5)+PL('50,5 95,50 50,95 5,50',soft,wood,3)+C(50,50,6,wood);break;
  case 'porchswing':s=R(4,24,92,62,wood,7)+R(11,29,78,20,soft)+R(11,52,78,25,pale)+L(11,2,11,24,ink,3)+L(89,2,89,24,ink,3);break;
  case 'fountain':s=C(50,50,47,wood)+C(50,50,36,glass)+C(50,50,18,base)+radial(8,20,()=>P('M0 0L0 22','none',white,2.5));break;
  case 'picnic':s=R(27,11,46,78,wood,4)+R(4,16,18,68,soft,1)+R(78,16,18,68,soft,1)+Array.from({length:4},(_,i)=>L(29,25+i*16,70,25+i*16,shadow,1.5)).join('');break;
  }
 }
 else if(k==='decor'){
  switch(v){
  case 'floorlamp':s=C(50,50,43,pale)+C(50,50,24,soft)+C(50,50,10,wood);break;
  case 'arclamp':s=C(32,66,18,wood)+P('M32 65Q38 4 74 17','none',ink,5)+C(74,19,16,pale);break;
  case 'tripod':s=C(50,38,24,pale)+P('M50 39L15 95 M50 39L85 95 M50 39L50 95','none',wood,4);break;
  case 'tablelamp':s=C(50,50,40,soft)+C(50,50,20,pale)+R(44,40,12,20,wood);break;
  case 'pendant':s=C(50,50,41,soft)+C(50,50,31,pale)+Array.from({length:5},(_,i)=>L(50,50,50+36*Math.cos(i*Math.PI*2/5),50+36*Math.sin(i*Math.PI*2/5),wood,2)).join('');break;
  case 'candles':s=R(4,16,92,67,wood,14)+Array.from({length:3},(_,i)=>C(25+25*i,50,12,white)+C(25+25*i,50,4,'#edc377')).join('');break;
  case 'roundmirror':s=C(50,50,45,wood)+C(50,50,39,glass)+P('M24 74L73 25','none',white,3);break;
  case 'ovalmirror':s=E(50,50,36,45,wood)+E(50,50,29,38,glass)+P('M35 75L67 23','none',white,3);break;
  case 'clock':s=C(50,50,44,white)+C(50,50,34,'none',shadow,1.5)+L(50,50,50,20,ink,3)+L(50,50,73,58,ink,3)+C(50,50,4,ink);break;
  case 'books':s=R(12,11,23,79,wood)+R(38,8,25,84,soft)+R(66,15,23,72,'#7798ae')+Array.from({length:3},(_,i)=>L(21+i*26,20,21+i*26,84,white,2)).join('');break;
  case 'sculpture':s=C(50,50,45,base)+P('M27 68Q12 44 48 23Q78 8 75 38Q68 58 55 55Q45 47 39 71Z',soft,shadow,3)+C(60,38,7,white);break;
  case 'basket':s=C(50,50,45,wood)+C(50,50,35,pale)+Array.from({length:9},(_,i)=>L(16,18+i*8,84,18+i*8,wood,1.4)).join('')+L(24,24,76,76,shadow,1.5);break;
  case 'cushion':s=R(5,5,90,90,soft,21)+P('M20 18L81 82 M82 18L19 82','none',pale,4)+C(50,50,5,base);break;
  case 'screen':s=Array.from({length:4},(_,i)=>R(3+i*24,6,22,88,i%2?soft:base,2,wood,2)).join('')+P('M25 12V88 M49 12V88 M73 12V88','none',shadow,2);break;
  case 'guitar':s=E(50,64,20,28,wood)+C(50,55,9,ink)+P('M50 45V7','none',wood,7)+R(44,4,12,10,wood,2)+Array.from({length:4},(_,i)=>L(46+i*2,10,46+i*2,79,white,.7)).join('');break;
  case 'yoga':s=R(16,3,68,94,soft,11)+R(22,9,56,82,'none',6,shadow,1.5)+C(50,25,8,pale)+L(33,66,67,66,shadow,2);break;
  }
 }
 // All furniture is regular vector artwork. Colour selection still overrides base colours.
 return s;
}
window.WP_15={draw,versions:{furniture:'1.5'}};
if(window.WP_13){
 const old=prevDraw;
 window.WP_13.drawShape=function(c,color){return c&&c.kind?draw(c,color):old.call(this,c,color)};
}
})();