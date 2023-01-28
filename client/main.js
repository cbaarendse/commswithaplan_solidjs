// ====== IMPORTS ===============================
import {Meteor} from 'meteor/meteor';
import App from '../imports/ui/components/app/App.svelte';

Meteor.startup(() => {
  new App({
    target: document.getElementById('app')
  });
});
