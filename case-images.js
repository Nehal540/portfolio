(() => {
  const pictures = document.querySelectorAll('.screen-gallery img, .case-photo img');
  const dialog = document.createElement('dialog');
  dialog.className = 'image-viewer';
  dialog.setAttribute('aria-label', 'Enlarged project image');
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'image-close';
  close.textContent = 'Close ×';
  const image = document.createElement('img');
  dialog.append(close, image);
  document.body.append(dialog);
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  pictures.forEach(picture => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'image-zoom';
    button.setAttribute('aria-label', 'Enlarge: ' + picture.alt);
    picture.replaceWith(button);
    button.append(picture);
    button.addEventListener('click', () => {
      image.src = picture.src;
      image.alt = picture.alt;
      dialog.showModal();
    });
  });
})();
(() => {
 if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('is-entering');observer.unobserve(entry.target);}}),{threshold:.05});
 document.querySelectorAll('.visual-panel').forEach(panel=>{if(panel.getBoundingClientRect().top>innerHeight){panel.classList.add('is-entering');observer.observe(panel);}});
})();
