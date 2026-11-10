/* WohnPlan Web 1.4.1 – eindeutige, kollisionsarme Grundrissbemaßung | Created by MS */
(function () {
  'use strict';
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const n=x=>Number(x)||0;
  const round=x=>Math.round(x*10)/10;
  const esc=x=>String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  function label(v,language) {
    const nf=new Intl.NumberFormat(language==='en'?'en-GB':'de-AT',{maximumFractionDigits:1});
    return nf.format(round(v))+' cm';
  }
  function data(room) {
    const px=room?.form==='Freie Form'&&Array.isArray(room.punkte)&&room.punkte.length>2
      ?room.punkte:room?.form==='L-Form'
      ?[{x:0,y:0},{x:n(room.breite),y:0},{x:n(room.breite),y:n(room.tiefe)-n(room.aussparungTiefe)},{x:n(room.breite)-n(room.aussparungBreite),y:n(room.tiefe)-n(room.aussparungTiefe)},{x:n(room.breite)-n(room.aussparungBreite),y:n(room.tiefe)},{x:0,y:n(room.tiefe)}]
      :[{x:0,y:0},{x:n(room.breite),y:0},{x:n(room.breite),y:n(room.tiefe)},{x:0,y:n(room.tiefe)}];
    const pts=px.filter(p=>Number.isFinite(+p.x)&&Number.isFinite(+p.y)).map(p=>({x:n(p.x)+n(room.x),y:n(p.y)+n(room.y)}));
    let signed=0;
    for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];signed+=a.x*b.y-b.x*a.y}
    const handed=signed>=0?1:-1;
    const xs=pts.map(p=>p.x),ys=pts.map(p=>p.y);
    return {
      pts,handed,
      bounds:{minX:Math.min(...xs),maxX:Math.max(...xs),minY:Math.min(...ys),maxY:Math.max(...ys)}
    };
  }
  function intersection(a,b,padding=6) {
    return a.x-padding<b.x+b.w && a.x+a.w+padding>b.x &&
           a.y-padding<b.y+b.h && a.y+a.h+padding>b.y;
  }
  function drawDimensions(room,options={}) {
    if(!room)return '';
    const {pts,handed,bounds:b}=data(room);
    if(pts.length<3)return '';
    const theme=options.dark?'dark':'light',language=options.language==='en'?'en':'de';
    const zoom=Math.max(.18,Number(options.zoom)||1);
    const font=clamp(12/zoom,10,17);
    const stroke=theme==='dark'?'#b2c8df':'#5e7c99';
    const txt=theme==='dark'?'#e4f0ff':'#315d84';
    const halo=theme==='dark'?'#172538':'#ffffff';
    const fmt=value=>label(value,language);
    const mark=(x,y)=>Number(x.toFixed(2))+','+Number(y.toFixed(2));
    let elements=[],regions=[],walls=[];
    const isSimpleRectangle=room.form==='Rechteck' || (!room.form && pts.length===4);
    for(let i=0;i<pts.length;i++) {
      const a=pts[i],z=pts[(i+1)%pts.length],dx=z.x-a.x,dy=z.y-a.y,len=Math.hypot(dx,dy);
      if(len<.1)continue;
      const tx=dx/len,ty=dy/len;
      // For clockwise polygons on a screen (Y points down), the left normal faces outside.
      const nx=handed*dy/len,ny=-handed*dx/len;
      walls.push({a,z,len,tx,ty,nx,ny,midX:(a.x+z.x)/2,midY:(a.y+z.y)/2});
    }
    // Simple rectangles need only the two overall measurements, otherwise top and bottom are repeated.
    const showSegments=!isSimpleRectangle;
    const trackDistance=clamp(24/zoom,22,38);
    if(showSegments){
      for(const wall of walls){
        const {a,z,len,tx,ty,nx,ny,midX,midY}=wall;
        const offset=trackDistance;
        const sx=a.x+nx*offset,sy=a.y+ny*offset,ex=z.x+nx*offset,ey=z.y+ny*offset;
        const t=clamp(4/zoom,3.5,6.5);
        const x1=a.x+nx*7,y1=a.y+ny*7,x2=z.x+nx*7,y2=z.y+ny*7;
        elements.push('<path d="M'+mark(x1,y1)+' L'+mark(sx+nx*7,sy+ny*7)+' M'+mark(x2,y2)+' L'+mark(ex+nx*7,ey+ny*7)+' M'+mark(sx,sy)+' L'+mark(ex,ey)+' M'+mark(sx-t*nx,sy-t*ny)+' L'+mark(sx+t*nx,sy+t*ny)+' M'+mark(ex-t*nx,ey-t*ny)+' L'+mark(ex+t*nx,ey+t*ny)+'" stroke="'+stroke+'" stroke-width="1.05" fill="none" opacity=".78"/>');
        const text=fmt(len),width=text.length*font*.62,height=font*1.28;
        // Short wall numbers are moved farther away and connected by a leader.
        const short=len<width+16,steps=[1,2,3,4,5,6];
        let box=null,lx=0,ly=0;
        for(const k of steps){
          const distance=offset+(short?font*2.1:font*1.45)+(k-1)*(font*1.65);
          const px=midX+nx*distance,py=midY+ny*distance;
          const trial={x:px-width/2,y:py-height/2,w:width,h:height};
          if(!regions.some(r=>intersection(trial,r,6))){box=trial;lx=px;ly=py;break}
        }
        // In dense clusters, shift the annotation along its wall before giving up.
        if(!box){
          let best=null;
          for(const drift of [20,-20,40,-40,70,-70]){
            const px=midX+nx*(offset+font*9)+tx*drift,py=midY+ny*(offset+font*9)+ty*drift;
            const trial={x:px-width/2,y:py-height/2,w:width,h:height};
            if(!regions.some(r=>intersection(trial,r,3))){best={trial,px,py};break}
          }
          if(best){box=best.trial;lx=best.px;ly=best.py}
        }
        if(!box)continue;
        regions.push(box);
        const leaderStart=midX+nx*offset,leaderStartY=midY+ny*offset;
        const leader=short||Math.hypot(lx-leaderStart,ly-leaderStartY)>font*4 ?
          '<path d="M'+mark(leaderStart,leaderStartY)+' L'+mark(lx,ly+height*.4)+'" stroke="'+stroke+'" stroke-width=".85" opacity=".6" fill="none"/>':'';
        elements.push(leader+'<text x="'+round(lx)+'" y="'+round(ly)+'" text-anchor="middle" dominant-baseline="middle" font-size="'+font.toFixed(2)+'" font-family="system-ui,sans-serif" font-weight="650" fill="'+txt+'" stroke="'+halo+'" stroke-width="3" stroke-linejoin="round" paint-order="stroke" pointer-events="none">'+esc(text)+'</text>');
      }
    }
    // Total width/depth show the complete footprint, not the length of a single wall.
    const width=b.maxX-b.minX,height=b.maxY-b.minY;
    const totalOffset=clamp(105/zoom,95,148);
    const overall=options.overall!==false && width>0 && height>0;
    if(overall){
      const top=b.minY-totalOffset;
      const left=b.minX,right=b.maxX;
      const totalText=(language==='en'?'Overall width: ':'Gesamtbreite: ')+fmt(width);
      const lineTop=top+font*.9;
      const xMid=(left+right)/2;
      elements.push('<path d="M'+mark(left,b.minY-7)+' L'+mark(left,lineTop-5)+' M'+mark(right,b.minY-7)+' L'+mark(right,lineTop-5)+' M'+mark(left,lineTop)+' L'+mark(right,lineTop)+'" stroke="'+stroke+'" stroke-width="1.2" fill="none"/>');
      elements.push('<text x="'+round(xMid)+'" y="'+round(top-font*.55)+'" font-family="system-ui,sans-serif" font-size="'+font.toFixed(2)+'" font-weight="750" fill="'+txt+'" text-anchor="middle" stroke="'+halo+'" stroke-width="3.3" paint-order="stroke" pointer-events="none">'+esc(totalText)+'</text>');
      const xRight=b.maxX+totalOffset;
      const yMid=(b.minY+b.maxY)/2;
      const heightText=(language==='en'?'Overall depth: ':'Gesamttiefe: ')+fmt(height);
      elements.push('<path d="M'+mark(b.maxX+7,b.minY)+' L'+mark(xRight+5,b.minY)+' M'+mark(b.maxX+7,b.maxY)+' L'+mark(xRight+5,b.maxY)+' M'+mark(xRight,b.minY)+' L'+mark(xRight,b.maxY)+'" stroke="'+stroke+'" stroke-width="1.2" fill="none"/>');
      elements.push('<text x="'+round(xRight+11)+'" y="'+round(yMid)+'" font-family="system-ui,sans-serif" font-size="'+font.toFixed(2)+'" font-weight="750" fill="'+txt+'" text-anchor="start" dominant-baseline="middle" stroke="'+halo+'" stroke-width="3.3" paint-order="stroke" pointer-events="none">'+esc(heightText)+'</text>');
    }
    return '<g class="wp141-dimensions" pointer-events="none">'+elements.join('')+'</g>';
  }
  window.WP_141={drawDimensions,readGeometry:data};
})();