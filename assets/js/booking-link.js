function buildWhatsAppLink({ phone = '', text = '' }){
  const base = phone ? `https://wa.me/${encodeURIComponent(phone)}` : 'https://wa.me/';
  const url = new URL(base);
  if(text) url.searchParams.set('text', text);
  return url.toString();
}
