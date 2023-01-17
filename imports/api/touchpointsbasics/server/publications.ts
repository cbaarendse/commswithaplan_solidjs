// ====== IMPORTS ===============================
import { Meteor } from "meteor/meteor";

import TouchPointsBasics from "../touchpointsbasics.js";


Meteor.publish("touchpointsbasics", function() { return TouchPointsBasics.find({}); });
