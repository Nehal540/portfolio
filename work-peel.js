(()=>{
 const area=document.querySelector(".peel-scroll"),deck=area.querySelector(".work-gallery"),cards=[...deck.children];
 // Remove retired arrow labels from the actual content, including accessible names.
 cards.forEach(card=>{
  card.querySelectorAll(".gallery-open,.gallery-caption > span[aria-hidden]").forEach(el=>el.remove());
  if(card.matches("a")){const label=document.createElement("span");label.className="project-view";label.textContent="View";card.querySelector(".gallery-caption").append(label)}
 });
 const playful=matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
 cards.forEach(card=>{
  let frame=0;
  card.addEventListener("pointermove",event=>{
   if(!playful.matches)return;
   cancelAnimationFrame(frame);
   frame=requestAnimationFrame(()=>{
    const r=card.getBoundingClientRect(),x=Math.max(0,Math.min(1,(event.clientX-r.left)/r.width)),y=Math.max(0,Math.min(1,(event.clientY-r.top)/r.height));
    card.style.setProperty("--tilt-x",(y-.5)*-5+"deg");
    card.style.setProperty("--tilt-y",(x-.5)*6+"deg");
    const padding=48;
    card.style.setProperty("--badge-x",Math.max(padding,Math.min(card.clientWidth-padding,x*card.clientWidth))+"px");
    card.style.setProperty("--badge-y",Math.max(padding,Math.min(card.clientHeight-padding,y*card.clientHeight))+"px");
    card.style.setProperty("--badge-angle",((x-.5)*24)+"deg");
   });
  });
  card.addEventListener("pointerleave",()=>{
   cancelAnimationFrame(frame);
   ["--tilt-x","--tilt-y","--badge-x","--badge-y","--badge-angle"].forEach(p=>card.style.removeProperty(p));
  });
 });
 const mode=matchMedia("(min-width: 801px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)");
 let queued=false;
 function render(){
  queued=false;if(!mode.matches)return;
  const distance=Math.max(1,area.offsetHeight-deck.offsetHeight-110);
  const progress=Math.max(0,Math.min(1,(110-area.getBoundingClientRect().top)/distance))*(cards.length-.35);
  cards.forEach((card,i)=>{
   const leave=i===cards.length-1?0:Math.max(0,Math.min(1,(progress-i-.35)/.65));
   const depth=Math.max(0,i-progress);
   card.style.transform="translateY("+(depth*60-leave*(deck.offsetHeight+180))+"px) rotateX("+(leave*32)+"deg) scale("+(1-depth*.025)+")";
   card.style.opacity=String(1-Math.max(0,(leave-.85)/.15));
   card.style.visibility=leave>=1?"hidden":"visible";
  });
 }
 function setup(){area.classList.toggle("motion",mode.matches);cards.forEach(c=>{c.removeAttribute("style")});render()}
 addEventListener("scroll",()=>{if(!queued){queued=true;requestAnimationFrame(render)}},{passive:true});
 addEventListener("resize",setup);mode.addEventListener("change",setup);
 cards.forEach((card,i)=>card.addEventListener("focusin",()=>{
  if(mode.matches){const distance=area.offsetHeight-deck.offsetHeight-110;scrollTo({top:scrollY+area.getBoundingClientRect().top-110+i/(cards.length-.35)*distance,behavior:"instant"});render()}
 }));
 setup();
})();
