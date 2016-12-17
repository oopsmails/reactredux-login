var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    /* Schema.ObjectId to point other object
    obj: {
        type: Schema.ObjectId,
        ref: 'users'
    }

    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    location: String,
    meta: {
      age: Number,
      website: String
    },
    created_at: Date,
    updated_at: Date
    */

    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdDate: Date
});
module.exports.userSchema = userSchema; //Export bugSchema so that models.js can access it.