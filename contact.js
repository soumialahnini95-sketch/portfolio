const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-nav');
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menu.classList.toggle('is-open', !isOpen);
});
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menu.classList.remove('is-open');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const fallback = document.querySelector('#whatsapp-fallback');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const fields = new FormData(form);
  const message = [
    'Bonjour Soumia, je vous contacte depuis votre portfolio.',
    '',
    `Nom : ${fields.get('name').trim()}`,
    `E-mail : ${fields.get('email').trim()}`,
    `Type de projet : ${fields.get('projectType')}`,
    '',
    'Mon message :',
    fields.get('message').trim(),
  ].join('\n');
  const url = `https://wa.me/212669026210?text=${encodeURIComponent(message)}`;
  fallback.href = url;
  fallback.hidden = false;
  status.textContent = 'Votre message est prêt. WhatsApp va s’ouvrir : relisez-le puis envoyez-le pour finaliser.';
  window.open(url, '_blank', 'noopener,noreferrer');
});
