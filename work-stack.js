(()=>{
 const section=document.querySelector(".unfold"),deck=document.querySelector(".deck"),cards=[...document.querySelectorAll(".sheet")];
 const media=matchMedia("(min-width: 1001px) and (min-height: 780px) and (prefers-reduced-motion: no-preference)");
 let queued=false,focusOpen=false;
 const clamp=n=>Math.min(1,Math.max(0,n));
 function draw(){
  queued=false;if(!media.matches)return;
  const range=Math.max(1,section.offsetHeight-deck.offsetHeight-110);
  const raw=focusOpen?1:clamp((110-section.getBoundingClientRect().top)/range*1.65);
  const p=raw*raw*(3-2*raw);
  const spread=(deck.clientWidth+24)/3;
  cards.forEach((card,i)=>{
   const side=i-1;
   const x=side*(18*(1-p)+spread*p);
   const angle=side*7*(1-p);
   const y=Math.abs(side)*18*(1-p);
   const scale=1-Math.abs(side)*.045*(1-p);
   card.style.transform="translateX(calc(-50% + "+x+"px)) translateY("+y+"px) rotate("+angle+"deg) scale("+scale+")";
   card.style.zIndex=String(i===1?3:i===0?2:1);
  });
 }
 function setup(){
  section.classList.toggle("is-animated",media.matches);
  cards.forEach(card=>card.removeAttribute("style"));
  draw();
 }
 addEventListener("scroll",()=>{if(!queued){queued=true;requestAnimationFrame(draw)}},{passive:true});
 addEventListener("resize",setup);media.addEventListener("change",setup);
 deck.addEventListener("focusin",()=>{focusOpen=true;draw()});
 deck.addEventListener("focusout",event=>{if(!deck.contains(event.relatedTarget)){focusOpen=false;draw()}});
 setup();
})();
