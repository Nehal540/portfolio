// Illustrative sample photos and caption prompts, ready for personal replacements.
const moments = [
 {image:0,caption:"Something worth listening to again."},
 {image:1,caption:"A small pause in the day."},
 {image:2,caption:"A place with a story attached."},
 {image:3,caption:"A little room for play."},
 {image:4,caption:"An everyday detail worth noticing."},
 {image:5,caption:"No brief. Just a blank page."},
 {image:2,caption:"A moment to keep.",zoom:true}
];
const collection=document.getElementById('personal-tiles');
moments.forEach((moment,index)=>{
 const card=document.createElement('figure');card.className='photo-card';card.tabIndex=0;
 card.setAttribute('aria-label',`Sample photo ${index+1}: ${moment.caption}`);
 const photo=document.createElement('div');photo.className='photo-sample';photo.setAttribute('aria-hidden','true');photo.style.backgroundPosition=`${moment.image%3*50}% ${moment.image<3?0:100}%`;
 if(moment.zoom)photo.style.transform='scale(1.16)';
 const frame=document.createElement('div');frame.className='photo-window';frame.append(photo);
 const caption=document.createElement('figcaption');caption.textContent=moment.caption;
 card.append(frame,caption);collection.append(card);
 card.addEventListener('pointerup',event=>{if(event.pointerType!=='mouse')card.focus({preventScroll:true})});
});
