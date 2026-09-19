(() => {
 const stage=document.getElementById('kinetic-stage');
 if(!stage)return;
 const letters=[...stage.querySelectorAll('.kinetic-letter')];
 const title=document.getElementById('identity-title');
 const description=document.getElementById('identity-description');
 function reveal(letter){
  title.textContent=letter.dataset.identity;
  description.textContent=letter.dataset.description;
  letters.forEach(item=>{item.classList.toggle('is-revealed',item===letter);item.setAttribute('aria-pressed',String(item===letter));});
 }
 letters.forEach(letter=>{
  letter.addEventListener('pointerenter',()=>reveal(letter));
  letter.addEventListener('focus',()=>reveal(letter));
  letter.addEventListener('click',()=>reveal(letter));
 });
})();
