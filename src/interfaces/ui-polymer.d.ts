/**
 * ui-polymer.d.ts
 *
 * Interface specific to the Polymer-Project specific aspects of the UI.
 */

// TODO(#345): Actually have typescript for polymer.
declare var Polymer :any;

// For internationalization.
interface I18n {
  process :(element:Document, translations:any) => void;
}
declare var i18nTemplate :I18n;
declare var getBrowserLanguage : () => string;
declare var changeLanguage : (language:string) => void;
