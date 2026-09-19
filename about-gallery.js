// The portrait is intentionally unfilled; other images are illustrative samples.
const photos=[
 {image:null,caption:"Nehal Thakkar",label:"Portrait space for Nehal"},
 {image:0,caption:"Something worth listening to again."},
 {image:1,caption:"A small pause in the day."},
 {image:2,caption:"A place with a story attached."},
 {image:3,caption:"A little room for play."},
 {image:4,caption:"An everyday detail worth noticing."},
 {image:5,caption:"No brief. Just a blank page."},
 {image:2,caption:"A moment to keep."}
];
const stage=document.getElementById('about-gallery'),line=document.getElementById('gallery-line'),dots=document.getElementById('gallery-dots');
let selected=0;
const buttons=[],indicators=[];
photos.forEach((photo,i)=>{
 const button=document.createElement('button');button.type='button';button.className='memory-card';button.setAttribute('aria-label',photo.label||`Select sample photo: ${photo.caption}`);
 const art=document.createElement('span');art.className='memory-image';art.setAttribute('aria-hidden','true');
 if(photo.image===null){art.classList.add('portrait-unfilled');art.textContent='Nehal'}else{art.style.backgroundPosition=`${photo.image%3*50}% ${photo.image<3?0:100}%`}
 button.append(art);stage.append(button);buttons.push(button);
 button.addEventListener('click',()=>select(i));
 button.addEventListener('pointerenter',()=>{line.textContent=photo.caption});button.addEventListener('pointerleave',()=>{line.textContent=photos[selected].caption});
 button.addEventListener('focus',()=>{line.textContent=photo.caption});button.addEventListener('blur',()=>{line.textContent=photos[selected].caption});
 const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label',`Show photo ${i+1}`);dot.addEventListener('click',()=>select(i));dots.append(dot);indicators.push(dot);
});
function select(index){selected=(index+photos.length)%photos.length;render()}
function render(){
 const width=stage.clientWidth,narrow=width<700,feature=Math.min(narrow?250:420,width*(narrow?.62:.36)),small=Math.min(narrow?110:180,width*.16);
 buttons.forEach((button,i)=>{
  let offset=(i-selected+photos.length)%photos.length;if(offset>4)offset-=photos.length;
  const depth=Math.abs(offset),active=offset===0;
  const x=active?0:Math.sign(offset)*(feature*.57+(depth-1)*width*.085);
  button.style.setProperty('--x',x+'px');button.style.setProperty('--y',(active?0:(depth%2===0?14:-8))+'px');button.style.setProperty('--rotation',(active?0:Math.sign(offset)*(depth%2===0?-6:7))+'deg');
  button.style.width=(active?feature:small)+'px';button.style.height=(active?feature*1.12:small*1.28)+'px';button.style.zIndex=String(active?10:6-depth);button.style.setProperty('--brightness',active?'1':String(.86-depth*.08));
  button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active));
  // Very distant images remain reachable through the navigation controls on phones.
  const hidden=narrow&&depth>2;button.style.opacity=hidden?'0':'1';button.style.pointerEvents=hidden?'none':'auto';button.tabIndex=hidden?-1:0;button.setAttribute('aria-hidden',String(hidden));
  indicators[i].setAttribute('aria-current',String(active));
 });
 line.textContent=photos[selected].caption;
}
document.getElementById('gallery-prev').addEventListener('click',()=>select(selected-1));document.getElementById('gallery-next').addEventListener('click',()=>select(selected+1));
document.querySelector('.personal-gallery').addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();select(selected+(event.key==='ArrowRight'?1:-1))}});
new ResizeObserver(render).observe(stage);render();
