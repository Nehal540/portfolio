(() => {
  'use strict';
  const card = document.getElementById('visiting-card');
  if (!card) return;
  const front = document.getElementById('card-front');
  const back = document.getElementById('card-back');
  const returnButton = document.getElementById('card-return');
  const email = document.getElementById('card-email');
  function flip(showContacts) {
    card.classList.toggle('is-flipped', showContacts);
    front.setAttribute('aria-expanded', String(showContacts));
    front.inert = showContacts;
    back.inert = !showContacts;
    // Move focus before hiding its previous owner from assistive technology.
    front.setAttribute('aria-hidden', 'false');
    back.setAttribute('aria-hidden', 'false');
    (showContacts ? email : front).focus({preventScroll:true});
    front.setAttribute('aria-hidden', String(showContacts));
    back.setAttribute('aria-hidden', String(!showContacts));
  }
  front.addEventListener('click', () => flip(true));
  returnButton.addEventListener('click', () => flip(false));
  card.addEventListener('keydown', event => {
    if (event.key === 'Escape' && card.classList.contains('is-flipped')) {
      event.preventDefault(); flip(false);
    }
  });
})();
