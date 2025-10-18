(function(){
  // JSON-LD: Organization + TaxiService + TransportReservation (example minimal)
  const ld = {
    "@context":"https://schema.org",
    "@graph":[
      {
        "@type":"Organization",
        "name":"Mithra Transfer",
        "url":document.location.origin,
        "logo":document.location.origin + '/assets/img/logo.png',
        "foundingDate":"1991",
        "parentOrganization":{
          "@type":"Organization",
          "name":"Mithra Travel"
        }
      },
      {
        "@type":"TaxiService",
        "name":"Mithra Transfer — Antalya Airport Transfers",
        "areaServed":"Antalya Province",
        "provider":"Mithra Travel"
      },
      {
        "@type":"Service",
        "name":"Private Airport Transfer",
        "serviceType":"TransportReservation",
        "provider":"Mithra Transfer"
      }
    ]
  };
  const script = document.createElement('script');
  script.type='application/ld+json';
  script.textContent = JSON.stringify(ld);
  document.head.appendChild(script);
})();
