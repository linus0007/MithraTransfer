(function(){
  const qs = new URLSearchParams(location.search);
  const from = qs.get('from') || '';
  const to = qs.get('to') || '';
  const vehicle = qs.get('vehicle') || 'car';
  const priceEUR = Number(qs.get('priceEUR') || '0');

  const pickup = document.getElementById('pickup');
  const dropoff = document.getElementById('dropoff');
  const vehicleSelect = document.getElementById('vehicle');
  const reverseBtn = document.getElementById('reverseBtn');
  const returnTrip = document.getElementById('returnTrip');

  const name = document.getElementById('name');
  const phone = document.getElementById('phone');
  const whatsapp = document.getElementById('whatsapp');
  const passengers = document.getElementById('passengers');
  const datetime = document.getElementById('datetime');

  const summaryFrom = document.getElementById('summaryFrom');
  const summaryTo = document.getElementById('summaryTo');
  const summaryVehicle = document.getElementById('summaryVehicle');
  const summaryTotal = document.getElementById('summaryTotal');

  const currency = localStorage.getItem('currency') || 'EUR';

  function formatPriceEURToCurrency(amountEUR){
    const rate = RATES[currency] || 1;
    const amount = amountEUR * rate;
    const symbols = { EUR: '€', USD: '$', GBP: '£', TRY: '₺' };
    return `${symbols[currency]||''}${Math.round(amount)}`;
  }

  function updateSummary(){
    summaryFrom.textContent = pickup.value;
    summaryTo.textContent = dropoff.value;
    const label = i18n.t(`vehicles.${vehicleSelect.value}`, vehicleSelect.value);
    summaryVehicle.textContent = label;
    let total = priceEUR;
    if(returnTrip.checked) total *= 2;
    summaryTotal.textContent = formatPriceEURToCurrency(total);
  }

  window.updatePricesInSummary = updateSummary;

  function prefill(){
    pickup.value = from;
    dropoff.value = to;
    vehicleSelect.value = vehicle;
    updateSummary();
  }

  reverseBtn.addEventListener('click', () => {
    const a = pickup.value; pickup.value = dropoff.value; dropoff.value = a; updateSummary();
  });

  [pickup, dropoff, vehicleSelect, returnTrip].forEach(el => el.addEventListener('change', updateSummary));

  const form = document.getElementById('bookingForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const payload = {
      name: name.value.trim(),
      phone: phone.value.trim(),
      whatsapp: whatsapp.value.trim() || phone.value.trim(),
      pickup: pickup.value.trim(),
      dropoff: dropoff.value.trim(),
      datetime: datetime.value,
      passengers: passengers.value,
      vehicle: vehicleSelect.value,
      return: returnTrip.checked,
    };

    const parts = [
      `Booking Request — Mithra Transfer`,
      `Name: ${payload.name}`,
      `Phone: ${payload.phone}`,
      `WhatsApp: ${payload.whatsapp}`,
      `From: ${payload.pickup}`,
      `To: ${payload.dropoff}`,
      `Date & Time: ${payload.datetime}`,
      `Passengers: ${payload.passengers}`,
      `Vehicle: ${i18n.t('vehicles.'+payload.vehicle, payload.vehicle)}`,
      `Return Trip: ${payload.return ? 'Yes' : 'No'}`,
      `Total: ${summaryTotal.textContent}`,
      `Source: ${location.href}`
    ];

    const text = parts.join('\n');
    const link = buildWhatsAppLink({ text });
    window.open(link, '_blank');
  });

  function initHeaderButtons(){
    const langBtn = document.getElementById('langBtn');
    const currencyBtn = document.getElementById('currencyBtn');
    const whatsappHeader = document.getElementById('whatsappHeader');

    const lang = localStorage.getItem('lang') || 'en';
    langBtn.textContent = i18n.getLanguageLabel(lang);
    currencyBtn.textContent = currency;

    langBtn.addEventListener('click', () => {
      const next = i18n.getNextLanguage(localStorage.getItem('lang') || 'en');
      localStorage.setItem('lang', next);
      document.documentElement.lang = next;
      document.documentElement.dir = i18n.isRTL(next) ? 'rtl' : 'ltr';
      i18n.applyAll(next);
    });

    currencyBtn.addEventListener('click', () => {
      const list = ['EUR','USD','GBP','TRY'];
      const curr = localStorage.getItem('currency') || 'EUR';
      const next = list[(list.indexOf(curr)+1)%list.length];
      localStorage.setItem('currency', next);
      currencyBtn.textContent = next;
      updateSummary();
    });

    whatsappHeader.href = buildWhatsAppLink({ text: 'Hello, I would like to book a transfer.' });
  }

  function init(){
    initHeaderButtons();
    i18n.applyAll(localStorage.getItem('lang') || 'en');
    prefill();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }
})();
