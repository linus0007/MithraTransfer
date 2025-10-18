const RATES = {
  EUR: 1,
  USD: 1.09,
  GBP: 0.84,
  TRY: 37.0
};

// Optionally update rates from an API once per day
(async function updateRates(){
  try{
    const last = localStorage.getItem('rates_last');
    const now = Date.now();
    if(last && now - Number(last) < 24*60*60*1000) return;
    // Free endpoints are rate-limited; keep fallback static
    const res = await fetch('https://api.exchangerate.host/latest?base=EUR&symbols=USD,GBP,TRY');
    if(res.ok){
      const json = await res.json();
      if(json?.rates){
        RATES.USD = json.rates.USD || RATES.USD;
        RATES.GBP = json.rates.GBP || RATES.GBP;
        RATES.TRY = json.rates.TRY || RATES.TRY;
        localStorage.setItem('rates_last', String(now));
      }
    }
  }catch(e){/* ignore */}
})();
