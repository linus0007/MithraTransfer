const state = {
  prices: [],
  filtered: [],
};

const selectors = {
  pickup: document.querySelectorAll('[data-select="pickup"]'),
  destination: document.querySelectorAll('[data-select="destination"]'),
  bookingForm: document.getElementById('booking-form'),
  quoteResult: document.querySelector('.quote-result'),
  priceTableBody: document.getElementById('price-table-body'),
  filterPickup: document.getElementById('filter-pickup'),
  filterDestination: document.getElementById('filter-destination'),
  filterSearch: document.getElementById('filter-search'),
  navToggle: document.querySelector('.nav-toggle'),
  navMenu: document.getElementById('nav-menu'),
  year: document.getElementById('year'),
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

async function loadPrices() {
  const response = await fetch('assets/data/prices.json');
  if (!response.ok) {
    throw new Error('Failed to load price list');
  }
  const data = await response.json();
  state.prices = data;
  state.filtered = data;
  populateSelects();
  renderTable();
}

function uniqueValues(key) {
  return [...new Set(state.prices.map((item) => item[key]).sort((a, b) => a.localeCompare(b)))];
}

function populateSelects() {
  const pickups = uniqueValues('pickup');
  const destinations = uniqueValues('destination');

  selectors.pickup.forEach((select) => {
    const current = select.value;
    select.innerHTML = select.id === 'filter-pickup'
      ? '<option value="">All pick-up regions</option>'
      : '<option value="" disabled selected>Select pick-up</option>';
    pickups.forEach((pickup) => {
      const option = document.createElement('option');
      option.value = pickup;
      option.textContent = pickup;
      if (pickup === current) option.selected = true;
      select.append(option);
    });
  });

  selectors.destination.forEach((select) => {
    const isFilter = select.id === 'filter-destination';
    const current = select.value;
    const baseOption = isFilter
      ? '<option value="">All destinations</option>'
      : '<option value="" disabled selected>Select destination</option>';
    select.innerHTML = baseOption;
    (isFilter ? destinations : destinations).forEach((destination) => {
      const option = document.createElement('option');
      option.value = destination;
      option.textContent = destination;
      if (destination === current) option.selected = true;
      select.append(option);
    });
  });
}

function updateDestinationOptions(selectElement, pickupValue) {
  const destinations = state.prices
    .filter((item) => (pickupValue ? item.pickup === pickupValue : true))
    .map((item) => item.destination);
  const uniqueDestinations = [...new Set(destinations)].sort((a, b) => a.localeCompare(b));

  const isFilter = selectElement.id === 'filter-destination';
  const baseOption = isFilter
    ? '<option value="">All destinations</option>'
    : '<option value="" disabled selected>Select destination</option>';
  const current = selectElement.value;
  selectElement.innerHTML = baseOption;

  uniqueDestinations.forEach((destination) => {
    const option = document.createElement('option');
    option.value = destination;
    option.textContent = destination;
    if (destination === current) option.selected = true;
    selectElement.append(option);
  });
}

function renderTable() {
  const rows = state.filtered
    .map((entry) => {
      return `<tr>
        <td>${entry.pickup}</td>
        <td>${entry.destination}</td>
        <td>${formatPrice(entry.passenger_car)}</td>
        <td>${formatPrice(entry.minibus)}</td>
        <td>${formatPrice(entry.crafter)}</td>
        <td>${formatPrice(entry.ultra_lux)}</td>
      </tr>`;
    })
    .join('');

  selectors.priceTableBody.innerHTML = rows ||
    '<tr><td colspan="6">No routes match the selected filters.</td></tr>';
}

function formatPrice(value) {
  if (value === null || value === undefined) {
    return '—';
  }
  return formatter.format(value);
}

function handleBookingSubmit(event) {
  event.preventDefault();
  const pickup = document.getElementById('pickup').value;
  const destination = document.getElementById('destination').value;
  const vehicle = document.getElementById('vehicle').value;
  const passengers = Number(document.getElementById('passengers').value || 0);
  const returnTrip = document.getElementById('return').checked;

  if (!pickup || !destination || !vehicle) {
    selectors.quoteResult.textContent = 'Please select pick-up, destination, and vehicle type.';
    return;
  }

  const match = state.prices.find(
    (item) => item.pickup === pickup && item.destination === destination
  );

  if (!match || match[vehicle] === null) {
    selectors.quoteResult.textContent =
      'This vehicle class is not available for the selected route. Please contact our team for a custom quote.';
    return;
  }

  const baseFare = match[vehicle];
  const returnFare = returnTrip ? baseFare * 1.9 : baseFare; // 10% off on combined return

  selectors.quoteResult.innerHTML = `
    <strong>${formatPrice(returnFare)}</strong> total for ${passengers} passenger${
      passengers > 1 ? 's' : ''
    } in a ${vehicleLabel(vehicle)} from <em>${pickup}</em> to <em>${destination}</em>.
    ${returnTrip ? '<br/><small>Includes 10% return transfer discount.</small>' : ''}
  `;
}

function vehicleLabel(key) {
  switch (key) {
    case 'passenger_car':
      return 'Passenger Car';
    case 'minibus':
      return 'Minibus';
    case 'crafter':
      return 'Crafter';
    case 'ultra_lux':
      return 'UltraLux';
    default:
      return 'vehicle';
  }
}

function applyFilters() {
  const pickup = selectors.filterPickup.value;
  const destination = selectors.filterDestination.value;
  const search = selectors.filterSearch.value.trim().toLowerCase();

  state.filtered = state.prices.filter((item) => {
    const matchesPickup = pickup ? item.pickup === pickup : true;
    const matchesDestination = destination ? item.destination === destination : true;
    const matchesSearch = search
      ? `${item.pickup} ${item.destination}`.toLowerCase().includes(search)
      : true;
    return matchesPickup && matchesDestination && matchesSearch;
  });

  renderTable();
}

function initNavigation() {
  if (!selectors.navToggle) return;
  selectors.navToggle.addEventListener('click', () => {
    const expanded = selectors.navToggle.getAttribute('aria-expanded') === 'true';
    selectors.navToggle.setAttribute('aria-expanded', String(!expanded));
    selectors.navMenu.classList.toggle('open');
  });

  selectors.navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      selectors.navToggle.setAttribute('aria-expanded', 'false');
      selectors.navMenu.classList.remove('open');
    });
  });
}

function initScrollBehavior() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function initYear() {
  if (selectors.year) {
    selectors.year.textContent = new Date().getFullYear();
  }
}

function initEventListeners() {
  if (selectors.bookingForm) {
    selectors.bookingForm.addEventListener('submit', handleBookingSubmit);
  }

  selectors.filterPickup?.addEventListener('change', (event) => {
    updateDestinationOptions(selectors.filterDestination, event.target.value);
    applyFilters();
  });

  selectors.filterDestination?.addEventListener('change', applyFilters);
  selectors.filterSearch?.addEventListener('input', applyFilters);

  const bookingPickup = document.getElementById('pickup');
  const bookingDestination = document.getElementById('destination');

  bookingPickup?.addEventListener('change', (event) => {
    updateDestinationOptions(bookingDestination, event.target.value);
  });
}

function init() {
  initNavigation();
  initScrollBehavior();
  initYear();
  loadPrices()
    .then(() => {
      // Default booking destination list to first pickup
      const bookingPickup = document.getElementById('pickup');
      if (bookingPickup?.value) {
        updateDestinationOptions(document.getElementById('destination'), bookingPickup.value);
      }
      updateDestinationOptions(selectors.filterDestination, '');
    })
    .catch((error) => {
      console.error(error);
      if (selectors.quoteResult) {
        selectors.quoteResult.textContent = 'Unable to load price list. Please try again later.';
      }
      selectors.priceTableBody.innerHTML =
        '<tr><td colspan="6">Price list unavailable. Please contact our team.</td></tr>';
    });

  initEventListeners();
}

init();
