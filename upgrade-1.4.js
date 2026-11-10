/* WohnPlan Web 1.4 – frei geformte Räume und Wände | Created by MS */
(function(){
'use strict';
const clone=x=>JSON.parse(JSON.stringify(x));
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const number=n=>Number.isFinite(+n)?+n:0;
const round=n=>Math.round(n*100)/100;
const format=n=>(Math.round(n*10)/10).toLocaleString('de-AT',{maximumFractionDigits:1});
const simple=(pts)=>Array.isArray(pts)&&pts.length>=3&&pts.length<=48&&pts.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y));
const rect=(w,h)=>[{x:0,y:0},{x:w,y:0},{x:w,y:h},{x:0,y:h}];
const starter=(w=500,h=400)=>[
 {x:0,y:Math.round(h*.2)},{x:Math.round(w*.24),y:Math.round(h*.2)},
 {x:Math.round(w*.24),y:0},{x:Math.round(w*.75),y:0},
 {x:Math.round(w*.75),y:Math.round(h*.2)},{x:w,y:Math.round(h*.2)},
 {x:w,y:h},{x:0,y:h}
];
const points=r=>r.form==='Freie Form'&&simple(r.punkte)?r.punkte:r.form==='L-Form'?[{x:0,y:0},{x:r.breite,y:0},{x:r.breite,y:r.tiefe-r.aussparungTiefe},{x:r.breite-r.aussparungBreite,y:r.tiefe-r.aussparungTiefe},{x:r.breite-r.aussparungBreite,y:r.tiefe},{x:0,y:r.tiefe}]:rect(r.breite,r.tiefe);
function areaSigned(pts){let sum=0;for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];sum+=a.x*b.y-b.x*a.y}return sum/2}
function area(r){return Math.abs(areaSigned(points(r)))/10000}
function pointOnSegment(x,y,a,b,eps=.01){
 const cross=(b.x-a.x)*(y-a.y)-(b.y-a.y)*(x-a.x);
 if(Math.abs(cross)>eps*Math.max(1,Math.hypot(b.x-a.x,b.y-a.y)))return false;
 return x>=Math.min(a.x,b.x)-eps&&x<=Math.max(a.x,b.x)+eps&&y>=Math.min(a.y,b.y)-eps&&y<=Math.max(a.y,b.y)+eps;
}
function insidePts(pts,x,y){
 if(!simple(pts))return false;
 let yes=false;
 for(let i=0,j=pts.length-1;i<pts.length;j=i++){
  const a=pts[j],b=pts[i];
  if(pointOnSegment(x,y,a,b))return true;
  if((a.y>y)!=(b.y>y)){
   const intersectX=a.x+(y-a.y)*(b.x-a.x)/(b.y-a.y);
   if(x<intersectX)yes=!yes;
  }
 }
 return yes;
}
function inside(r,x,y){return insidePts(points(r),x-r.x,y-r.y)}
function cross(a,b,c){return(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x)}
function segmentsIntersect(a,b,c,d){
 const ab1=cross(a,b,c),ab2=cross(a,b,d),cd1=cross(c,d,a),cd2=cross(c,d,b);
 if(((ab1>1e-5&&ab2< -1e-5)||(ab1< -1e-5&&ab2>1e-5))&&
    ((cd1>1e-5&&cd2< -1e-5)||(cd1< -1e-5&&cd2>1e-5)))return true;
 for(const p of [c,d])if(Math.abs(cross(a,b,p))<.001&&pointOnSegment(p.x,p.y,a,b))return true;
 for(const p of [a,b])if(Math.abs(cross(c,d,p))<.001&&pointOnSegment(p.x,p.y,c,d))return true;
 return false;
}
function validate(pts){
 if(!simple(pts))return 'Mindestens 3 und höchstens 48 Eckpunkte erforderlich.';
 if(pts.length>48)return 'Zu viele Eckpunkte.';
 const xs=pts.map(p=>p.x),ys=pts.map(p=>p.y),w=Math.max(...xs)-Math.min(...xs),h=Math.max(...ys)-Math.min(...ys);
 if(w<100||h<100)return 'Der Raum muss mindestens 100 cm breit und tief sein.';
 if(w>5000||h>5000)return 'Der Raum darf höchstens 50 m breit oder tief sein.';
 if(Math.abs(areaSigned(pts))<10000)return 'Die Raumfläche muss mindestens 1 m² betragen.';
 for(let i=0;i<pts.length;i++){
  const a=pts[i],b=pts[(i+1)%pts.length];
  if(Math.hypot(b.x-a.x,b.y-a.y)<18)return 'Eine Wand ist kürzer als 18 cm.';
 }
 for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
  if(j===i+1||(i===0&&j===pts.length-1))continue;
  if(segmentsIntersect(pts[i],pts[(i+1)%pts.length],pts[j],pts[(j+1)%pts.length]))
   return 'Die Wände dürfen sich nicht kreuzen oder überlappen.';
 }
 return '';
}
function normalized(input){
 const pts=clone(input);
 if(!simple(pts))throw Error('Die Raumform ist ungültig.');
 if(areaSigned(pts)<0)pts.reverse();
 const minx=Math.min(...pts.map(p=>p.x)),miny=Math.min(...pts.map(p=>p.y)),
 maxx=Math.max(...pts.map(p=>p.x)),maxy=Math.max(...pts.map(p=>p.y));
 return {punkte:pts.map(p=>({x:round(p.x-minx),y:round(p.y-miny)})),shiftX:minx,shiftY:miny,breite:round(maxx-minx),tiefe:round(maxy-miny)};
}
function edges(r){const p=points(r);return p.map((a,i)=>{const b=p[(i+1)%p.length],dx=b.x-a.x,dy=b.y-a.y;return {i,x:r.x+a.x,y:r.y+a.y,dx,dy,len:Math.hypot(dx,dy)}})}
function remapOpenings(oldR,newR){
 const oldEdges=edges(oldR),newEdges=edges(newR);
 return (oldR.oeffnungen||[]).map(op=>{
  const edge=oldEdges[op.wand]||oldEdges[0];if(!edge)return clone(op);
  const t=clamp((op.position+op.breite/2)/Math.max(1,edge.len),0,1);
  const mx=edge.x+edge.dx*t,my=edge.y+edge.dy*t;
  const ranked=newEdges.filter(e=>e.len>=35).map(e=>{
   const proj=clamp(((mx-e.x)*e.dx+(my-e.y)*e.dy)/Math.max(1,e.len*e.len),0,1);
   const px=e.x+proj*e.dx,py=e.y+proj*e.dy;
   const cos=(e.dx*edge.dx+e.dy*edge.dy)/Math.max(1,e.len*edge.len);
   const score=Math.hypot(mx-px,my-py)+(cos<.8?90:0);
   return {e,proj,score};
  }).sort((a,b)=>a.score-b.score);
  if(!ranked.length)return clone(op);
  const chosen=ranked[0],len=chosen.e.len;
  const breite=clamp(op.breite,30,Math.max(30,len-4));
  const pos=clamp(chosen.proj*len-breite/2,2,Math.max(2,len-breite-2));
  // If an edge reverses direction, reverse the hinge side, and opening direction.
  const reversed=chosen.e.dx*edge.dx+chosen.e.dy*edge.dy<0;
  return {...op,wand:chosen.e.i,position:round(pos),breite:round(breite),
    gespiegelt:reversed?!op.gespiegelt:!!op.gespiegelt,
    oeffnetNachAussen:reversed?!op.oeffnetNachAussen:!!op.oeffnetNachAussen};
 });
}
function labelPoint(r){
 if(r.form!=='Freie Form')return {x:r.x+r.breite*.4,y:r.y+r.tiefe*.49};
 const p=points(r),minX=Math.min(...p.map(q=>q.x)),maxX=Math.max(...p.map(q=>q.x)),
 minY=Math.min(...p.map(q=>q.y)),maxY=Math.max(...p.map(q=>q.y));
 const cx=(minX+maxX)/2,cy=(minY+maxY)/2;
 if(insidePts(p,cx,cy))return {x:r.x+cx,y:r.y+cy};
 let best=null,bestScore=-Infinity;
 for(let iy=1;iy<=15;iy++)for(let ix=1;ix<=15;ix++){
  const x=minX+(maxX-minX)*ix/16,y=minY+(maxY-minY)*iy/16;
  if(!insidePts(p,x,y))continue;
  const centerPenalty=Math.hypot(x-cx,y-cy)*.2;
  let wallDistance=Infinity;
  for(let k=0;k<p.length;k++){
   const a=p[k],b=p[(k+1)%p.length],dx=b.x-a.x,dy=b.y-a.y;
   const t=clamp(((x-a.x)*dx+(y-a.y)*dy)/(dx*dx+dy*dy),0,1);
   wallDistance=Math.min(wallDistance,Math.hypot(x-a.x-t*dx,y-a.y-t*dy));
  }
  const score=wallDistance-centerPenalty;
  if(score>bestScore){bestScore=score;best={x:r.x+x,y:r.y+y}}
 }
 return best||{x:r.x+cx,y:r.y+cy};
}
function furnitureLocalCorners(obj){
 const w=Number(obj.breite)||0,h=Number(obj.tiefe)||0,x=Number(obj.x)||0,y=Number(obj.y)||0;
 const angle=(Number(obj.drehung)||0)*Math.PI/180,c=Math.cos(angle),s=Math.sin(angle),cx=x+w/2,cy=y+h/2;
 return [[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]].map(([a,b])=>({x:cx+a*c-b*s,y:cy+a*s+b*c}));
}
function furnitureInside(r,obj){
 if(r.form!=='Freie Form')return true;
 const cs=furnitureLocalCorners(obj);
 for(const c of cs)if(!insidePts(points(r),c.x,c.y))return false;
 // Sample along all four furniture edges to catch concave room cut-outs.
 for(let i=0;i<4;i++){
  const a=cs[i],b=cs[(i+1)%4];
  for(let j=1;j<8;j++){
   const t=j/8;
   if(!insidePts(points(r),a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t))return false;
  }
 }
 return true;
}
function nearestFurniturePosition(r,obj,pos){
 if(r.form!=='Freie Form')return {x:round(pos.x),y:round(pos.y)};
 const xs=points(r).map(p=>p.x),ys=points(r).map(p=>p.y);
 const maxX=Math.max(...xs),maxY=Math.max(...ys),minX=Math.min(...xs),minY=Math.min(...ys);
 const desired={x:round(pos.x),y:round(pos.y)};
 const work={...obj,x:desired.x,y:desired.y};
 const good=(x,y)=>{work.x=x;work.y=y;return furnitureInside(r,work)};
 if(good(desired.x,desired.y))return desired;
 const w=obj.breite,h=obj.tiefe;
 // Search from the requested finger position, nearest valid alternative first.
 const candidates=[];
 const centerX=desired.x+w/2,centerY=desired.y+h/2;
 for(const pt of points(r)){
  for(const [a,b] of [[pt.x,pt.y],[pt.x-w,pt.y],[pt.x,pt.y-h],[pt.x-w,pt.y-h],
                      [pt.x-w/2,pt.y-h/2]]){
   const d=Math.hypot(a-desired.x,b-desired.y);
   candidates.push({x:a,y:b,d});
  }
 }
 const step=15;
 for(let rad=step;rad<=Math.min(300,Math.max(r.breite,r.tiefe));rad+=step){
  for(let z=-rad;z<=rad;z+=step){
   candidates.push({x:desired.x+z,y:desired.y-rad,d:Math.hypot(z,rad)});
   candidates.push({x:desired.x+z,y:desired.y+rad,d:Math.hypot(z,rad)});
   candidates.push({x:desired.x-rad,y:desired.y+z,d:Math.hypot(rad,z)});
   candidates.push({x:desired.x+rad,y:desired.y+z,d:Math.hypot(rad,z)});
  }
 }
 candidates.sort((a,b)=>a.d-b.d);
 for(const c of candidates){
  if(c.x<minX-w-1||c.y<minY-h-1||c.x>maxX+1||c.y>maxY+1)continue;
  if(good(c.x,c.y))return {x:round(c.x),y:round(c.y)};
 }
 return desired; // Preserve placement but flag it in the existing project validation.
}
function bump(pts,index,offset,inwards){
 const n=pts.length,a=pts[index],b=pts[(index+1)%n],dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy);
 if(len<130)return null;
 const orient=areaSigned(pts)>=0?1:-1;
 const nx=-dy/len*orient*(inwards?1:-1),ny=dx/len*orient*(inwards?1:-1);
 const k=Math.round(Math.max(30,Math.min(75,len*.16))/5)*5;
 const q=Math.min(offset,Math.max(30,len*.3));
 const at=t=>({x:round(a.x+dx*t),y:round(a.y+dy*t)});
 const p1=at(k/len),p4=at(1-k/len);
 const p2={x:round(p1.x+nx*q),y:round(p1.y+ny*q)},
 p3={x:round(p4.x+nx*q),y:round(p4.y+ny*q)};
 const next=[...pts.slice(0,index+1),p1,p2,p3,p4,...pts.slice(index+1)];
 return validate(next)?null:next;
}
function mountEditor(root,initial,onSave,onCancel,opts={}){
 let pts=clone(initial),selected={kind:'edge',index:0},snap=true,history=[],future=[],active=null;
 const grid=Math.max(1,Number(opts.grid)||10),rounded=x=>snap?Math.round(x/grid)*grid:round(x);
 root.innerHTML='<div class="wp14-editor">'+
  '<p class="wp14-help">Ecken mit Finger oder Maus ziehen. Wand antippen, um Länge, Nische oder Vorsprung zu ändern.</p>'+
  '<div class="wp14-editor-grid"><div class="wp14-stage"><svg id="wp14-svg" xmlns="http://www.w3.org/2000/svg" aria-label="Wandeditor"></svg></div>'+
  '<div class="wp14-controls" id="wp14-controls"></div></div>'+
  '<div id="wp14-message" role="status" class="wp14-message"></div>'+
  '<div class="wp14-editor-actions"><button type="button" data-wp14-action="undo">↶ Rückgängig</button>'+
  '<label class="wp14-snap"><input type="checkbox" id="wp14-snap" checked> Raster '+grid+' cm</label>'+
  '<button type="button" data-wp14-action="cancel">Abbrechen</button>'+
  '<button type="button" class="primary" data-wp14-action="save">✓ Grundriss übernehmen</button></div></div>';
 const svg=root.querySelector('#wp14-svg'),controls=root.querySelector('#wp14-controls'),message=root.querySelector('#wp14-message');
 function showError(txt){message.textContent=txt||'';message.classList.toggle('is-error',!!txt)}
 function snapshot(){history.push(clone(pts));if(history.length>40)history.shift();future=[]}
 function applyChange(next){const error=validate(next);if(error){showError(error);return false}snapshot();pts=next;showError('');render();return true}
 function bounds(){const xs=pts.map(p=>p.x),ys=pts.map(p=>p.y),x=Math.min(...xs),y=Math.min(...ys),w=Math.max(...xs)-x,h=Math.max(...ys)-y,margin=Math.max(85,Math.max(w,h)*.13);return {x:x-margin,y:y-margin,w:w+margin*2,h:h+margin*2,unit:Math.max(11,Math.max(w,h)*.024)}}
 function render(){
  const b=active?.viewBounds||bounds(),dim=b.unit,n=pts.length,fill=document.body.dataset.theme==='dark'?'#314e70':'#dceeff';
  svg.setAttribute('viewBox',[b.x,b.y,b.w,b.h].join(' '));
  const polygon=pts.map(p=>p.x+','+p.y).join(' ');
  let out='<polygon points="'+polygon+'" fill="'+fill+'" stroke="#2877da" stroke-width="'+dim*.24+'" stroke-linejoin="round"/>';
  pts.forEach((a,i)=>{
   const q=pts[(i+1)%n],dx=q.x-a.x,dy=q.y-a.y,len=Math.hypot(dx,dy),cx=(a.x+q.x)/2,cy=(a.y+q.y)/2,
    picked=selected.kind==='edge'&&selected.index===i;
   out+='<path data-wall="'+i+'" d="M'+a.x+' '+a.y+'L'+q.x+' '+q.y+'" fill="none" stroke="transparent" stroke-width="'+Math.max(23,dim*2)+'" style="cursor:pointer"/>';
   out+='<text x="'+cx+'" y="'+(cy-1.1*dim)+'" font-size="'+dim*.9+'" text-anchor="middle" font-weight="'+(picked?800:650)+'" fill="'+(picked?'#1774df':document.body.dataset.theme==='dark'?'#e4f0ff':'#41607e')+'" pointer-events="none">'+format(len)+' cm</text>';
   if(picked)out+='<circle cx="'+cx+'" cy="'+cy+'" r="'+dim*.52+'" fill="#2877da" pointer-events="none"/>';
  });
  pts.forEach((p,i)=>{
   const picked=selected.kind==='vertex'&&selected.index===i;
   out+='<circle data-vertex="'+i+'" cx="'+p.x+'" cy="'+p.y+'" r="'+dim*.95+'" fill="transparent" style="cursor:grab"/>'+
    '<circle cx="'+p.x+'" cy="'+p.y+'" r="'+dim*(picked?.49:.40)+'" fill="'+(picked?'#f0aa39':'#2877da')+'" stroke="white" stroke-width="'+dim*.16+'" pointer-events="none"/>';
  });
  out+='<text x="'+(b.x+b.w/2)+'" y="'+(b.y+b.h-17)+'" font-size="'+dim*.95+'" text-anchor="middle" fill="'+(document.body.dataset.theme==='dark'?'#ddeefe':'#56718d')+'" font-weight="700">'+format(Math.abs(areaSigned(pts))/10000)+' m²</text>';
  svg.innerHTML=out;
  renderControls();
 }
 function renderControls(){
  const i=selected.index,p=pts[i],q=pts[(i+1)%pts.length],
    len=Math.hypot(p.x-q.x,p.y-q.y);
  controls.innerHTML=selected.kind==='vertex'?
   '<h3>Eckpunkt '+(i+1)+'</h3>'+
   '<label>X (cm)<input id="wp14-x" type="number" step="1" value="'+round(p.x)+'"></label>'+
   '<label>Y (cm)<input id="wp14-y" type="number" step="1" value="'+round(p.y)+'"></label>'+
   '<button type="button" data-wp14-action="apply-vertex">Koordinaten übernehmen</button>'+
   '<button type="button" data-wp14-action="delete-vertex" class="danger">Ecke entfernen</button>'+
   '<p class="wp14-tip">Blauen Punkt ziehen oder X/Y genau eingeben.</p>':
   '<h3>Wand '+(i+1)+'</h3><label>Länge in cm<input type="number" step="1" min="18" id="wp14-length" value="'+round(len)+'"></label>'+
   '<button type="button" data-wp14-action="apply-length">Wandlänge übernehmen</button>'+
   '<button type="button" data-wp14-action="add-corner">＋ Eckpunkt einfügen</button>'+
   '<button type="button" data-wp14-action="indent">⊖ Nische 40 cm</button>'+
   '<button type="button" data-wp14-action="protrude">⊕ Vorsprung 40 cm</button>'+
   '<p class="wp14-tip">Eine Nische erzeugt neue Ecken und bleibt rechtwinklig. Eckpunkte können danach verschoben werden.</p>';
  const h=document.createElement('div');
  h.className='wp14-summary';h.textContent=pts.length+' Eckpunkte · '+format(Math.abs(areaSigned(pts))/10000)+' m²';
  controls.appendChild(h);
 }
 function onAction(action){
  if(action==='cancel'){onCancel();return}
  if(action==='save'){
   const err=validate(pts);if(err){showError(err);return}
   const norm=normalized(pts);
   onSave(norm);return;
  }
  if(action==='undo'){if(!history.length)return;future.push(clone(pts));pts=history.pop();showError('');render();return}
  if(action==='redo'){if(!future.length)return;history.push(clone(pts));pts=future.pop();showError('');render();return}
  let i=selected.index,p=pts[i],q=pts[(i+1)%pts.length],next=clone(pts);
  if(action==='apply-vertex'){
   if(selected.kind!=='vertex')return;
   next[i]={x:round(Number(root.querySelector('#wp14-x').value)),y:round(Number(root.querySelector('#wp14-y').value))};
   applyChange(next);return;
  }
  if(action==='delete-vertex'){
   if(selected.kind!=='vertex')return;
   if(next.length<=3){showError('Mindestens drei Ecken sind erforderlich.');return}
   next.splice(i,1);selected={kind:'vertex',index:Math.max(0,i-1)};applyChange(next);return;
  }
  if(selected.kind!=='edge')return;
  if(action==='apply-length'){
   const len=Number(root.querySelector('#wp14-length').value),old=Math.hypot(q.x-p.x,q.y-p.y);
   if(!Number.isFinite(len)||len<18||len>5000){showError('Wandlänge zwischen 18 und 5000 cm eingeben.');return}
   next[(i+1)%next.length]={x:round(p.x+(q.x-p.x)*len/old),y:round(p.y+(q.y-p.y)*len/old)};
   applyChange(next);return;
  }
  if(action==='add-corner'){
   next.splice(i+1,0,{x:round((p.x+q.x)/2),y:round((p.y+q.y)/2)});
   selected={kind:'vertex',index:i+1};applyChange(next);return;
  }
  if(action==='indent'||action==='protrude'){
   const result=bump(pts,i,40,action==='indent');
   if(!result){showError('An dieser Wand ist die Nische zu kurz oder würde andere Wände schneiden.');return}
   selected={kind:'edge',index:i+2};applyChange(result);return;
  }
 }
 root.addEventListener('click',event=>{
  const button=event.target.closest('[data-wp14-action]');
  if(button){onAction(button.dataset.wp14Action);return}
 });
 root.querySelector('#wp14-snap').onchange=e=>{snap=e.target.checked};
 function ptAt(e){
  const cp=svg.createSVGPoint();cp.x=e.clientX;cp.y=e.clientY;
  const ctm=svg.getScreenCTM();return ctm?cp.matrixTransform(ctm.inverse()):{x:0,y:0};
 }
 svg.addEventListener('pointerdown',e=>{
  if(e.pointerType==='mouse'&&e.button!==0)return;
  const vert=e.target.closest('[data-vertex]'),wall=e.target.closest('[data-wall]');
  if(vert){
   selected={kind:'vertex',index:Number(vert.dataset.vertex)};
   active={id:e.pointerId,index:selected.index,start:clone(pts),viewBounds:bounds(),moved:false};
   try{svg.setPointerCapture(e.pointerId)}catch(_){}
  }else if(wall){selected={kind:'edge',index:Number(wall.dataset.wall)}}else return;
  showError('');render();
 });
 svg.addEventListener('pointermove',e=>{
  if(!active||active.id!==e.pointerId)return;
  const p=ptAt(e);
  const target={x:clamp(rounded(p.x),-4900,5000),y:clamp(rounded(p.y),-4900,5000)};
  pts[active.index]=target;active.moved=true;render();
 });
 function finish(e){
  if(!active||active.id!==e.pointerId)return;
  const old=active.start,modified=active.moved;active=null;
  if(modified){
   const error=validate(pts);
   if(error){pts=old;showError(error)}
   else {history.push(old);if(history.length>40)history.shift();future=[];showError('')}
   render();
  }
 }
 svg.addEventListener('pointerup',finish);svg.addEventListener('pointercancel',e=>{if(active?.id===e.pointerId){pts=active.start;active=null;render()}});
 render();return {getPoints:()=>clone(pts)};
}
window.WP_14={rect,starter,points,area,inside,labelPoint,edges,validate,normalized,remapOpenings,nearestFurniturePosition,furnitureInside,mountEditor};
})();