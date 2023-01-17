// ====== IMPORTS ===============================
import { Mongo } from "meteor/mongo";

import SimpleSchema from "simpl-schema";

//====== TOUCHPOINTSBASICS == DEFINITIONS =======
const TouchPointsBasics = new Mongo.Collection("touchpointsbasics");

TouchPointsBasics.deny({
    insert: function(){ return true; },
    update: function(){ return true; },
    remove: function(){ return true; }
});


//====== TOUCHPOINTSBASICS == SCHEMA ============
TouchPointsBasics.schema = new SimpleSchema( {
    name: { type: String, label: "touchPoint", max: 50 },
    en: { type: Object, label: "English" },
    "en.displayName": { type: String, label: "name", max: 50 },
    "en.description": { type: String, label: "description", optional: true },
    nl: { type: Object, label: "English" },
    "en.displayName": { type: String, label: "name", max: 50 },
    "en.description": { type: String, label: "description", optional: true }

});

TouchPointsBasics.attachSchema(TouchPointsBasics.schema);


// ====== EXPORTS ===============================
export default TouchPointsBasics;
