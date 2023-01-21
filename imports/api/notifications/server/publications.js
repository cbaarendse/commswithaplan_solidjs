// ====== IMPORTS ===============================
import { Meteor } from 'meteor/meteor';

import Notifications from '../notifications';

// ====== PUBLICATIONS ==========================
Meteor.publish('notifications', function () { return Notifications.find({}); });
