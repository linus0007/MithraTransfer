(function(){
  const widget = document.getElementById('chatWidget');
  const toggle = document.getElementById('chatToggle');
  const panel = widget?.querySelector('.chat-panel');
  if(!widget || !toggle || !panel) return;
  widget.hidden = false;
  toggle.addEventListener('click', () => {
    const visible = panel.hasAttribute('hidden') ? false : true;
    if(visible){ panel.setAttribute('hidden',''); } else { panel.removeAttribute('hidden'); }
  });
  const form = panel.querySelector('.chat-form');
  const body = panel.querySelector('.chat-body');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const text = input.value.trim(); if(!text) return;
    const you = document.createElement('div'); you.textContent = 'You: ' + text; body.appendChild(you);
    const ai = document.createElement('div'); ai.textContent = 'AI: Our team will reply on WhatsApp shortly.'; body.appendChild(ai);
    input.value='';
  });
})();
