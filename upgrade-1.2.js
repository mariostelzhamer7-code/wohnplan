/* WohnPlan Web 1.2 – Created by MS
   User preferences and native PDF generation. Project data is never changed here. */
(function () {
  'use strict';
  const KEY = 'WohnPlan_Web_Preferences_1_2';
  const defaults = Object.freeze({theme:'light', gridSize:10, pdfPaper:'A4', pdfOrientation:'landscape'});
  let prefs = {...defaults};
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    if (saved && typeof saved === 'object') prefs = {...prefs, ...saved};
  } catch (_) {}
  function sanitize() {
    if (!['light','dark'].includes(prefs.theme)) prefs.theme = 'light';
    if (![5,10,25,50].includes(+prefs.gridSize)) prefs.gridSize = 10;
    prefs.gridSize = +prefs.gridSize;
    if (!['A4','A3'].includes(prefs.pdfPaper)) prefs.pdfPaper = 'A4';
    if (!['portrait','landscape'].includes(prefs.pdfOrientation)) prefs.pdfOrientation = 'landscape';
  }
  function apply() {
    sanitize();
    document.body.dataset.theme = prefs.theme;
    document.documentElement.style.colorScheme = prefs.theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', prefs.theme === 'dark' ? '#19283a' : '#2877da');
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(prefs)); return true; } catch (_) { return false; }
  }
  function update(changes) {
    prefs = {...prefs, ...changes};
    apply(); save();
    return {...prefs};
  }
  function reset() { prefs = {...defaults}; apply(); save(); return {...prefs}; }
  function get() { return {...prefs}; }
  function filenameFor(name) {
    return String(name || 'WohnPlan').replace(/[\\/:*?"<>|]/g,'-').slice(0,100).trim() || 'WohnPlan';
  }
  function imageFromSVG(xml) {
    return new Promise((resolve,reject) => {
      const blob = new Blob([xml],{type:'image/svg+xml;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      const img = new Image();
      const timeout = setTimeout(() => { URL.revokeObjectURL(url); reject(Error('SVG-Zeitüberschreitung')); }, 15000);
      img.onload = () => { clearTimeout(timeout); img._wohnplanSVGURL = url; resolve(img); };
      img.onerror = () => { clearTimeout(timeout); URL.revokeObjectURL(url); reject(Error('Grundriss konnte nicht als Bild geladen werden')); };
      img.src = url;
    });
  }
  function pdfFromJpeg(jpeg, imageWidth, imageHeight, paper, orientation) {
    const mmpt = mm => mm * 72/25.4;
    const size = paper === 'A3' ? [297,420] : [210,297];
    let width = mmpt(size[0]), height = mmpt(size[1]);
    if (orientation === 'landscape') [width,height] = [height,width];
    const margin = mmpt(10);
    const scale = Math.min((width-2*margin)/imageWidth,(height-2*margin)/imageHeight);
    const dw = imageWidth*scale, dh = imageHeight*scale;
    const left = (width-dw)/2, bottom = (height-dh)/2;
    const ops = 'q\n' + [dw,0,0,dh,left,bottom].map(n => (+n.toFixed(4))).join(' ') +
      ' cm\n/Im0 Do\nQ\n';
    const encoder = new TextEncoder();
    const chunks = [];
    let count = 0;
    const offsets = [0];
    function push(data) {
      const bytes = typeof data === 'string' ? encoder.encode(data) : data;
      chunks.push(bytes); count += bytes.byteLength;
    }
    function obj(id, dictionary, stream) {
      offsets[id] = count;
      push(id + ' 0 obj\n' + dictionary);
      if (stream) { push('\nstream\n'); push(stream); push('\nendstream'); }
      push('\nendobj\n');
    }
    push(encoder.encode('%PDF-1.4\n%'));
    push(Uint8Array.from([0xD3,0xE2,0xC7,0xF7,10]));
    obj(1,'<< /Type /Catalog /Pages 2 0 R >>');
    obj(2,'<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    obj(3,'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 '+width.toFixed(3)+' '+height.toFixed(3)+'] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>');
    obj(4,'<< /Type /XObject /Subtype /Image /Width '+imageWidth+' /Height '+imageHeight+' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length '+jpeg.byteLength+' >>',jpeg);
    const stream = encoder.encode(ops);
    obj(5,'<< /Length '+stream.length+' >>',stream);
    const xref = count;
    push('xref\n0 6\n0000000000 65535 f \n');
    for (let i=1;i<=5;i++) push(String(offsets[i]).padStart(10,'0')+' 00000 n \n');
    push('trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF\n');
    return new Blob(chunks,{type:'application/pdf'});
  }
  async function generatePDF(svg, overrides) {
    const p = {...prefs,...(overrides||{})};
    const image = await imageFromSVG(svg);
    const naturalW = image.naturalWidth || image.width;
    const naturalH = image.naturalHeight || image.height;
    if (!(naturalW > 0 && naturalH > 0)) throw Error('Ungültige Grundrissgröße');
    const ratio = Math.min(1,3400/Math.max(naturalW,naturalH),Math.sqrt(7000000/(naturalW*naturalH)));
    const w = Math.max(1,Math.round(naturalW*ratio));
    const h = Math.max(1,Math.round(naturalH*ratio));
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const context = canvas.getContext('2d',{alpha:false});
    if (!context) throw Error('PDF-Grafik konnte nicht erstellt werden');
    context.fillStyle='#ffffff';
    context.fillRect(0,0,w,h);
    context.drawImage(image,0,0,w,h);
    if (image._wohnplanSVGURL) URL.revokeObjectURL(image._wohnplanSVGURL);
    const jpegBase64 = canvas.toDataURL('image/jpeg',0.88).split(',')[1];
    if (!jpegBase64) throw Error('JPEG-Kodierung fehlgeschlagen');
    const binary = atob(jpegBase64);
    const jpeg = new Uint8Array(binary.length);
    for (let i=0;i<binary.length;i++) jpeg[i] = binary.charCodeAt(i);
    return pdfFromJpeg(jpeg,w,h,p.pdfPaper,p.pdfOrientation);
  }
  apply();
  window.WP_12 = { get, update, reset, generatePDF, filenameFor, defaults:{...defaults} };
})();
