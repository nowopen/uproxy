/// <reference path='../../interfaces/ui-polymer.d.ts' />

console.log('global model is: ', model);
// ui['model'] = model;

/**
  * Return the language of the user's browser.
  */
// TODO (lucyhe): find a better way to do this.
var getBrowserLanguage = () : string => {
  return navigator.language.substring(0, 2);
}


// Translation.

/** Retrieve messages.json file of the appropriate language and insert
  * strings into the application's UI.  
  */
var changeLanguage = (language:string) => {
  var xhr = new XMLHttpRequest();
  xhr.open('GET','../locales/' + language + '/messages.json',true);
  xhr.onload = function() {
    if (this.readyState != 4) {
      return;
    }
    // Translate the JSON format to a simple
    // { key : value, ... } dictionary.
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
