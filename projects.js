(() => {
  'use strict';
  const track=document.getElementById('project-track');
  if(!track) return;
  const previous=document.getElementById('projects-prev');
  const next=document.getElementById('projects-next');
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  function update(){previous.disabled=track.scrollLeft<=2;next.disabled=track.scrollLeft>=track.scrollWidth-track.clientWidth-2;}
  function move(direction){
    const cards=track.querySelectorAll('.project-slide');
    const step=cards.length>1?cards[1].offsetLeft-cards[0].offsetLeft:track.clientWidth;
    track.scrollBy({left:direction*step,behavior:motion.matches?'instant':'smooth'});
  }
  previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
  track.addEventListener('scroll',update,{passive:true});
  track.addEventListener('keydown',event=>{if(event.target!==track)return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}});
  if('ResizeObserver' in window)new ResizeObserver(update).observe(track);else window.addEventListener('resize',update,{passive:true});
  update();
  const dialog=document.getElementById('project-dialog');
  const title=document.getElementById('project-dialog-title');
  const description=document.getElementById('project-dialog-description');
  const image=document.getElementById('project-dialog-image');
  const projects={
    'intent':{title:'INTENT',description:'One bicycle-bell gesture, two intentions: presence and urgent attention. An exploration of how everyday objects communicate, developed through themes of urgency, habit and uncertainty.',image:'./assets/intent-cover.webp',alt:'Concept illustration of a bicycle bell responding to different gestures'},
    'residual-signals':{title:'Residual Signals',description:'A judgement eye, audio interruptions and simulated buffering make prolonged watching harder to ignore. When does feedback create awareness, and when does it become irritating?',image:'./assets/residual-signals-cover.webp',alt:'Concept illustration of an eye and layered screens representing digital feedback'}
  };
  let opener=null;
  track.querySelectorAll('[data-project]').forEach(link=>link.addEventListener('click',event=>{
    if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||!dialog?.showModal)return;
    const project=projects[link.dataset.project];if(!project)return;
    event.preventDefault();opener=link;
    title.textContent=project.title;description.textContent=project.description;image.src=project.image;image.alt=project.alt;
    dialog.showModal();
  }));
  document.getElementById('project-dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}));
})();
