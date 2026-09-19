// Replace these suggested categories with Nehal's own photographs and stories.
const personalStories = [
 {title:"On repeat",art:"again & again",hint:"The things you return to.",description:"A favourite song, film or book ,  and what keeps bringing you back. This is a suggested space, ready for your own story."},
 {title:"Small rituals",art:"the everyday",hint:"A little part of an ordinary day.",description:"A routine, a quiet habit or a small moment that makes a day feel like yours. Your personal note will go here."},
 {title:"Places I keep",art:"somewhere",hint:"A place with a story attached.",description:"A photograph of a place that matters to you, paired with a memory. The place and story are still to be added."},
 {title:"Currently playing",art:"one more?",hint:"A little space for play.",description:"A game or playful activity you enjoy outside your professional work. Add the actual choice and what you love about it here."},
 {title:"Little things",art:"look closer",hint:"Something worth noticing.",description:"An everyday detail, a collected object or a moment you photographed. This space is waiting for your own example."},
 {title:"Just because",art:"why not.",hint:"No brief. Just curiosity.",description:"Something made or tried simply because you felt like it. Add a personal experiment, a hobby or an unexpected interest here."}
];
const tiles=document.getElementById("personal-tiles"),dialog=document.getElementById("memory-dialog");
let trigger=null;
personalStories.forEach((story,index)=>{
 const button=document.createElement("button");button.type="button";button.className="personal-tile";button.setAttribute("aria-haspopup","dialog");
 const art=document.createElement("span");art.className="tile-art";art.style.backgroundPosition=`${index%3*50}% ${index<3?0:100}%`;art.setAttribute("aria-hidden","true");
 const title=document.createElement("span");title.className="tile-title";title.textContent=story.title;
 const hint=document.createElement("span");hint.className="tile-caption";hint.textContent=story.hint;
 button.append(art,title,hint);tiles.append(button);
 button.addEventListener("click",()=>{trigger=button;document.getElementById("memory-title").textContent=story.title;document.getElementById("memory-description").textContent=story.description;let preview=dialog.querySelector('.memory-photo');if(!preview){preview=document.createElement('div');preview.className='memory-photo';preview.setAttribute('aria-label','Illustrative sample image');dialog.querySelector('.memory-kicker').before(preview)}preview.style.backgroundPosition=art.style.backgroundPosition;dialog.showModal()});
});
dialog.querySelector(".memory-close").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
dialog.addEventListener("close",()=>trigger?.focus({preventScroll:true}));
const stage=document.querySelector('.world-stage');
let pending=0;
stage.addEventListener('pointermove',event=>{if(event.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;cancelAnimationFrame(pending);pending=requestAnimationFrame(()=>{const r=stage.getBoundingClientRect();stage.style.setProperty('--drift-x',((event.clientX-r.left)/r.width-.5)*12+'px');stage.style.setProperty('--drift-y',((event.clientY-r.top)/r.height-.5)*10+'px')})});
stage.addEventListener('pointerleave',()=>{cancelAnimationFrame(pending);stage.style.setProperty('--drift-x','0px');stage.style.setProperty('--drift-y','0px')});
