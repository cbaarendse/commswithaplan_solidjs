// ====== IMPORTS ===============================
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { nameTouchPoint, describeTouchPoint } from '../../../startup/both/functions';

import './TouchPointModal.html';
import './Modal';
import '../buttons/Buttons';

Template.title.helpers({
    displayName() {
        return nameTouchPoint(Session.get('selectedTouchPoint'));
    }
});

Template.description.helpers({
    description() {
        return describeTouchPoint(Session.get('selectedTouchPoint'));
    }
});