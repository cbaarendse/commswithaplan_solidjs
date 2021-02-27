<script>

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
</script>

<template name="touchpoint_modal">
    {{> Modal id="touchpoint-modal" titleTemplate="title" bodyTemplate="description" modalFooter=false}}
</template>

<template name="title">
    {{displayName}}
</template>

<template name="description">
    <p>{{description}}</p>
</template>