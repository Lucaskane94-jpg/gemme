window.addEventListener('load', function() {
  CookieConsent.run({
    guiOptions: {
      consentModal: {
        layout: 'box',
        position: 'bottom left'
      }
    },
    categories: {
      necessary: { enabled: true, readOnly: true },
      analytics: {}
    },
    onConsent: function() {
      if (CookieConsent.acceptedCategory('analytics')) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'cookie_consent_analytics',
          'analytics_storage': 'granted'
        });
      }
    },
    onChange: function() {
      if (CookieConsent.acceptedCategory('analytics')) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'cookie_consent_analytics',
          'analytics_storage': 'granted'
        });
      } else {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'cookie_consent_analytics',
          'analytics_storage': 'denied'
        });
      }
    },
    language: {
      default: 'it',
      translations: {
        it: {
          consentModal: {
            title: 'Utilizziamo i cookie',
            description: 'Questo sito usa cookie analitici per migliorare l\'esperienza di navigazione. Puoi accettare o rifiutare i cookie non necessari.',
            acceptAllBtn: 'Accetta tutti',
            rejectAllBtn: 'Rifiuta',
            showPreferencesBtn: 'Gestisci preferenze'
          },
          preferencesModal: {
            title: 'Preferenze cookie',
            acceptAllBtn: 'Accetta tutti',
            rejectAllBtn: 'Rifiuta tutti',
            savePreferencesBtn: 'Salva preferenze',
            closeIconLabel: 'Chiudi',
            sections: [
              {
                title: 'Cookie necessari',
                description: 'Questi cookie sono necessari per il corretto funzionamento del sito e non possono essere disabilitati.',
                linkedCategory: 'necessary'
              },
              {
                title: 'Cookie analitici',
                description: 'Ci aiutano a capire come viene utilizzato il sito tramite Google Analytics. Nessun dato personale viene condiviso con terze parti.',
                linkedCategory: 'analytics'
              }
            ]
          }
        }
      }
    }
  });
});
