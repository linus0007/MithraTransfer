(function(){
  const state = {
    vehicle: 'car',
    currency: localStorage.getItem('currency') || 'EUR',
    lang: localStorage.getItem('lang') || 'en',
    pickup: 'Antalya Airport',
    search: ''
  };

  const pickupSelect = () => document.getElementById('pickupSelect');
  const searchInput = () => document.getElementById('searchInput');
  const routeList = () => document.getElementById('routeList');

  function initHeaderButtons(){
    const langBtn = document.getElementById('langBtn');
    const currencyBtn = document.getElementById('currencyBtn');
    const whatsappHeader = document.getElementById('whatsappHeader');

    langBtn.textContent = i18n.getLanguageLabel(state.lang);
    currencyBtn.textContent = state.currency;

    langBtn.addEventListener('click', () => {
      const next = i18n.getNextLanguage(state.lang);
      setLanguage(next);
    });

    currencyBtn.addEventListener('click', () => {
      const next = getNextCurrency(state.currency);
      setCurrency(next);
    });

    whatsappHeader.href = buildWhatsAppLink({ text: 'Hello, I would like to book a transfer.' });
  }

  function populatePickup(){
    const select = pickupSelect();
    select.innerHTML = '';
    const regions = Array.from(new Set(DATA.map(r => r.from)));
    regions.forEach(region => {
      const opt = document.createElement('option');
      opt.value = region; opt.textContent = region;
      if(region === state.pickup) opt.selected = true;
      select.appendChild(opt);
    });
    select.addEventListener('change', () => { state.pickup = select.value; renderRoutes(); });
  }

  function initSearch(){
    const input = searchInput();
    input.addEventListener('input', () => { state.search = input.value.toLowerCase(); renderRoutes(); });
  }

  function initVehicleTabs(){
    document.querySelectorAll('.vehicle-tabs .tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.vehicle-tabs .tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.vehicle = btn.dataset.vehicle;
        renderRoutes();
      });
    });
  }

  function initCurrencyToggle(){
    document.querySelectorAll('.currency-options .currency').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.currency-options .currency').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        setCurrency(btn.dataset.currency);
      });
      if(btn.dataset.currency === state.currency) btn.classList.add('active');
    });
  }

  function getNextCurrency(curr){
    const list = ['EUR','USD','GBP','TRY'];
    const idx = list.indexOf(curr);
    return list[(idx+1)%list.length];
  }

  function setCurrency(curr){
    state.currency = curr;
    localStorage.setItem('currency', curr);
    document.getElementById('currencyBtn').textContent = curr;
    renderRoutes();
    updatePricesInSummary && updatePricesInSummary();
  }

  function setLanguage(lang){
    state.lang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = i18n.isRTL(lang) ? 'rtl' : 'ltr';
    document.getElementById('langBtn').textContent = i18n.getLanguageLabel(lang);
    i18n.applyAll(lang);
  }

  function formatPriceEURToCurrency(amountEUR){
    const rate = RATES[state.currency] || 1;
    const amount = amountEUR * rate;
    const symbols = { EUR: '€', USD: '$', GBP: '£', TRY: '₺' };
    return `${symbols[state.currency]||''}${Math.round(amount)}`;
  }

  function routeCard(route){
    const priceEUR = route.prices[state.vehicle];
    if(priceEUR == null) return null;
    const card = document.createElement('div');
    card.className = 'route-card';

    const meta = document.createElement('div');
    meta.className = 'route-meta';
    const title = document.createElement('div'); title.className = 'route-title';
    title.textContent = `${route.from} → ${route.to}`;
    const sub = document.createElement('div'); sub.className = 'route-sub';
    sub.textContent = i18n.t('pricing.duration', 'Fixed price — direct route');
    meta.appendChild(title); meta.appendChild(sub);

    const price = document.createElement('div'); price.className = 'route-price';
    price.textContent = formatPriceEURToCurrency(priceEUR);

    const actions = document.createElement('div'); actions.className = 'card-actions';
    const bookBtn = document.createElement('a');
    bookBtn.className = 'btn btn-primary';
    bookBtn.textContent = i18n.t('pricing.book', 'Book This Route');
    const link = new URL(window.location.origin + '/book.html');
    link.searchParams.set('from', route.from);
    link.searchParams.set('to', route.to);
    link.searchParams.set('vehicle', state.vehicle);
    link.searchParams.set('priceEUR', String(priceEUR));
    bookBtn.href = link.toString();

    actions.appendChild(price);
    actions.appendChild(bookBtn);

    card.appendChild(meta);
    card.appendChild(actions);
    card.addEventListener('click', (e) => {
      if(e.target === bookBtn) return; // let button work
      bookBtn.click();
    });
    return card;
  }

  function renderRoutes(){
    const list = routeList();
    list.innerHTML = '';
    const results = DATA.filter(r => r.from === state.pickup && r.to.toLowerCase().includes(state.search));
    results.forEach(r => {
      const card = routeCard(r);
      if(card) list.appendChild(card);
    });
  }

  function smoothScrollLinks(){
    document.querySelectorAll('[data-scroll]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if(href && href.startsWith('#')){
          e.preventDefault();
          document.querySelector(href).scrollIntoView({ behavior:'smooth', block:'start' });
        }
      })
    })
  }

  function init(){
    initHeaderButtons();
    setLanguage(state.lang);
    populatePickup();
    initSearch();
    initVehicleTabs();
    initCurrencyToggle();
    renderRoutes();
    smoothScrollLinks();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }
})();
