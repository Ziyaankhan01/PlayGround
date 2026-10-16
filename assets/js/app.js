document.addEventListener('DOMContentLoaded',()=>{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
// mobile nav
const b=$('#burger'),m=$('#mnav');if(b&&m)b.addEventListener('click',()=>{m.style.display=m.style.display==='block'?'none':'block'});
// header active
const path=location.pathname;$$('nav.main a').forEach(a=>{const h=a.getAttribute('href');if(h!=='/'&&path.startsWith(h))a.classList.add('on');if(h==='/'&&(path==='/'||path.endsWith('index.html')&&path.split('/').length<=2))a.classList.add('on')});
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(el=>io.observe(el));
// counters
$$('[data-count]').forEach(el=>{const end=parseFloat(el.dataset.count),dec=el.dataset.dec?1:0,suf=el.dataset.suf||'';let t0=null;const step=t=>{if(!t0)t0=t;const p=Math.min(1,(t-t0)/1400),v=end*(1-Math.pow(1-p,3));el.textContent=(dec?v.toFixed(1):Math.round(v).toLocaleString())+suf;if(p<1)requestAnimationFrame(step)};new IntersectionObserver((es,o)=>{es.forEach(e=>{if(e.isIntersecting){requestAnimationFrame(step);o.disconnect()}})},{threshold:.4}).observe(el)});
// gallery
$$('.gal').forEach(g=>{const main=$('.main',g);$$('.thumbs div',g).forEach(t=>t.addEventListener('click',()=>{$$('.thumbs div',g).forEach(x=>x.classList.remove('on'));t.classList.add('on');main.style.backgroundImage='url('+t.dataset.full+')'}))});
// quote modal
const modal=$('#qmodal');
window.openQuote=(prod)=>{if(!modal)return;const s=$('#q-product');if(s&&prod)s.value=prod;modal.classList.add('open');document.body.style.overflow='hidden'};
window.closeQuote=()=>{if(!modal)return;modal.classList.remove('open');document.body.style.overflow=''};
if(modal)modal.addEventListener('click',e=>{if(e.target===modal)closeQuote()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeQuote()});
const mq=$('#mini-quote');if(mq)mq.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(mq);const r={type:'quick-quote',date:new Date().toISOString(),...Object.fromEntries(fd)};const all=JSON.parse(localStorage.getItem('novara_rfqs')||'[]');all.push(r);localStorage.setItem('novara_rfqs',JSON.stringify(all));closeQuote();toast('Quote request received. Our engineers respond within one business day.');mq.reset()});
window.toast=(msg)=>{const t=$('#toast');if(!t){alert(msg);return}t.textContent=msg;t.style.display='block';setTimeout(()=>t.style.display='none',4200)};
// datasheet download
window.dlSpec=(slug)=>{const D=window.NOVARA.products.find(p=>p.slug===slug);if(!D)return;let t='NOVARA INDUSTRIES — TECHNICAL DATASHEET\n'+D.name+' ('+D.model+')\n'+'='.repeat(56)+'\n\nOverview:\n'+D.overview+'\n\nTECHNICAL SPECIFICATIONS\n';D.specs.forEach(s=>t+=s[0]+': '+s[1]+'\n');t+='\nDIMENSIONS / WEIGHTS\n';D.dims.forEach(d=>t+=d[0]+' — '+d[1]+' — '+d[2]+'\n');t+='\nCONFIGURATIONS\n'+D.configs.map(c=>'- '+c).join('\n')+'\n\nCERTIFICATIONS\n'+D.certs.map(c=>'- '+c).join('\n')+'\n\nContact: sales@novara-industries.com | www.novara-industries.com\nDemo datasheet for illustration purposes.';const blob=new Blob([t],{type:'text/plain'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=D.slug+'-datasheet.txt';a.click();toast('Datasheet downloaded. For certified drawings contact sales.')};
// RFQ pages
const rfq=$('#rfq-form');if(rfq){const params=new URLSearchParams(location.search);const pre=params.get('product');if(pre){const sel=$('#f-product');if(sel)sel.value=pre}
rfq.addEventListener('submit',e=>{e.preventDefault();if(!rfq.checkValidity()){rfq.reportValidity();return}const fd=new FormData(rfq);const r={type:'rfq',date:new Date().toISOString(),...Object.fromEntries(fd)};const all=JSON.parse(localStorage.getItem('novara_rfqs')||'[]');all.push(r);localStorage.setItem('novara_rfqs',JSON.stringify(all));rfq.style.display='none';const c=$('#rfq-confirm');if(c){c.classList.add('show');const ref=$('#rfq-ref');if(ref)ref.textContent='NVR-'+new Date().getFullYear()+'-'+String(all.length).padStart(4,'0')}})};
const cf=$('#contact-form');if(cf)cf.addEventListener('submit',e=>{e.preventDefault();if(!cf.checkValidity()){cf.reportValidity();return}const all=JSON.parse(localStorage.getItem('novara_msgs')||'[]');all.push({date:new Date().toISOString(),...Object.fromEntries(new FormData(cf))});localStorage.setItem('novara_msgs',JSON.stringify(all));cf.style.display='none';const c=$('#contact-confirm');if(c)c.classList.add('show')});
const nl=$('#nl-form');if(nl)nl.addEventListener('submit',e=>{e.preventDefault();toast('Subscribed. Technical bulletins, one per month.');nl.reset()});
});