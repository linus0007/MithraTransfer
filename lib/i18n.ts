'use client';

import i18next, { type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

export const languageOptions: Array<{ code: string; label: string; direction?: 'ltr' | 'rtl' }> = [
  { code: 'en', label: 'English' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'ru', label: 'Русский' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ar', label: 'العربية', direction: 'rtl' },
  { code: 'es', label: 'Español' },
  { code: 'nl', label: 'Nederlands' }
];

const resources: Resource = {
  en: {
    translation: {
      tagline: 'Professional Transfer Services – Complete Regional Pricing',
      controls: {
        language: 'Language',
        currency: 'Currency',
        pickup: 'Pick-up Region',
        search: 'Search Destination',
        placeholder: 'Side, Belek, Alanya…'
      },
      vehicles: {
        car: 'Passenger Car',
        minibus: 'Minibus',
        crafter: 'Crafter',
        ultralux: 'UltraLux'
      },
      table: {
        destination: 'Destination',
        vehiclePassengers: 'Vehicle / Passengers',
        price: 'Price',
        loading: 'Loading pricing…',
        empty: 'No pricing data available for this region.'
      },
      footer: 'Mithra Travel © 2025. All rights reserved.'
    }
  },
  tr: {
    translation: {
      tagline: 'Profesyonel Transfer Hizmetleri – Tüm Bölge Fiyatları',
      controls: {
        language: 'Dil',
        currency: 'Para Birimi',
        pickup: 'Alış Bölgesi',
        search: 'Varış Noktasını Ara',
        placeholder: 'Side, Belek, Alanya…'
      },
      vehicles: {
        car: 'Binek Araç',
        minibus: 'Minibüs',
        crafter: 'Crafter',
        ultralux: 'UltraLux'
      },
      table: {
        destination: 'Varış Noktası',
        vehiclePassengers: 'Araç / Yolcu',
        price: 'Fiyat',
        loading: 'Fiyatlar yükleniyor…',
        empty: 'Bu bölge için fiyat bilgisi bulunamadı.'
      },
      footer: 'Mithra Travel © 2025. Tüm hakları saklıdır.'
    }
  },
  ru: {
    translation: {
      tagline: 'Профессиональные трансферы – Полный прайс по регионам',
      controls: {
        language: 'Язык',
        currency: 'Валюта',
        pickup: 'Регион отправления',
        search: 'Поиск направления',
        placeholder: 'Сиде, Белек, Аланья…'
      },
      vehicles: {
        car: 'Легковой автомобиль',
        minibus: 'Минивэн',
        crafter: 'Крафтер',
        ultralux: 'УльтраЛюкс'
      },
      table: {
        destination: 'Направление',
        vehiclePassengers: 'Транспорт / Пассажиры',
        price: 'Стоимость',
        loading: 'Загрузка тарифов…',
        empty: 'Нет данных по ценам для этого региона.'
      },
      footer: 'Mithra Travel © 2025. Все права защищены.'
    }
  },
  de: {
    translation: {
      tagline: 'Professionelle Transfers – Vollständige Regionalpreise',
      controls: {
        language: 'Sprache',
        currency: 'Währung',
        pickup: 'Abholregion',
        search: 'Ziel suchen',
        placeholder: 'Side, Belek, Alanya…'
      },
      vehicles: {
        car: 'PKW',
        minibus: 'Minibus',
        crafter: 'Crafter',
        ultralux: 'UltraLux'
      },
      table: {
        destination: 'Reiseziel',
        vehiclePassengers: 'Fahrzeug / Passagiere',
        price: 'Preis',
        loading: 'Preise werden geladen…',
        empty: 'Keine Preisdaten für diese Region verfügbar.'
      },
      footer: 'Mithra Travel © 2025. Alle Rechte vorbehalten.'
    }
  },
  ar: {
    translation: {
      tagline: 'خدمات نقل احترافية – تسعير كامل لكل المناطق',
      controls: {
        language: 'اللغة',
        currency: 'العملة',
        pickup: 'منطقة الانطلاق',
        search: 'ابحث عن الوجهة',
        placeholder: 'سيده، بيليك، ألانيا…'
      },
      vehicles: {
        car: 'سيارة ركاب',
        minibus: 'ميني باص',
        crafter: 'كرافتـر',
        ultralux: 'فئة فاخرة'
      },
      table: {
        destination: 'الوجهة',
        vehiclePassengers: 'المركبة / الركاب',
        price: 'السعر',
        loading: 'جاري تحميل الأسعار…',
        empty: 'لا توجد بيانات أسعار لهذه المنطقة.'
      },
      footer: 'Mithra Travel © 2025. جميع الحقوق محفوظة.'
    }
  },
  es: {
    translation: {
      tagline: 'Servicios de traslado profesionales – Tarifas completas por región',
      controls: {
        language: 'Idioma',
        currency: 'Moneda',
        pickup: 'Región de recogida',
        search: 'Buscar destino',
        placeholder: 'Side, Belek, Alanya…'
      },
      vehicles: {
        car: 'Turismo',
        minibus: 'Minibús',
        crafter: 'Crafter',
        ultralux: 'UltraLux'
      },
      table: {
        destination: 'Destino',
        vehiclePassengers: 'Vehículo / Pasajeros',
        price: 'Precio',
        loading: 'Cargando tarifas…',
        empty: 'No hay datos de precios disponibles para esta región.'
      },
      footer: 'Mithra Travel © 2025. Todos los derechos reservados.'
    }
  },
  nl: {
    translation: {
      tagline: 'Professionele transfers – Volledig regionaal prijsoverzicht',
      controls: {
        language: 'Taal',
        currency: 'Valuta',
        pickup: 'Ophaalregio',
        search: 'Zoek bestemming',
        placeholder: 'Side, Belek, Alanya…'
      },
      vehicles: {
        car: 'Personenauto',
        minibus: 'Minibus',
        crafter: 'Crafter',
        ultralux: 'UltraLux'
      },
      table: {
        destination: 'Bestemming',
        vehiclePassengers: 'Voertuig / Passagiers',
        price: 'Prijs',
        loading: 'Prijzen worden geladen…',
        empty: 'Geen prijsgegevens beschikbaar voor deze regio.'
      },
      footer: 'Mithra Travel © 2025. Alle rechten voorbehouden.'
    }
  }
};

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });
}

export default i18next;
