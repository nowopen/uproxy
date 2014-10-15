/// <reference path='../../interfaces/ui-polymer.d.ts' />
/// <reference path='../scripts/ui.ts' />
/// <reference path='../scripts/i18n.d.ts' />

declare var ui :uProxy.UIAPI;

Polymer({
  model: {},
  // TODO: actually distinguish between give and get sort order.
  giveMode: function() {
    console.log('GIVE mode.');
    ui['view'] = UI.View.ROSTER;
    // TODO(keroserene): Update the original UI file and this new polymer UI
    // file, merge them, clean out the old, apply the new.
    ui['gestalt'] = UI.Gestalt.GIVING;
  },
  // TODO: These might actually belong in the generic ui.ts
  getMode: function() {
    console.log('GET mode.');
    ui['view'] = UI.View.ROSTER;
    ui['gestalt'] = UI.Gestalt.GETTING;
  },
  networksView: function() {
    console.log('NETWORKS');
    ui['view'] = UI.View.NETWORKS;
  },
  settingsView: function() {
    console.log('SETTINGS');
    // TODO: this is a hack for now. use actually good view state changes.
    ui['view'] = (UI.View.SETTINGS == ui['view']) ?
        UI.View.ROSTER : UI.View.SETTINGS;
  },
  ready: function() {
    // Expose global ui object and UI module in this context.
    this.ui = ui;
    this.UI = UI;

    ui['gestalt'] = UI.Gestalt.GIVING;
    this.loggedIn = ui['loggedIn'];
    this.changeLanguage("it");
  },
  // Translation.

  // Retrieve messages.json file of the appropriate language and insert
  // strings into the application's UI.  
  changeLanguage: function(language) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET','../locales/' + language + '/messages.json',true);
    xhr.onload = function() {
      if (this.readyState != 4) {
        return;
      }
      //conso
      var translations = JSON.parse(xhr.responseText);
      for (var key in translations) {
        if (translations.hasOwnProperty(key)) {
          translations[key] = translations[key].message;
        }
      }
      i18nTemplate.process(document, translations);
    }
    xhr.send(null);  
  }

});
