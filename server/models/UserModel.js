import dbconfig from '../dbconfig';

var mongoose = require("mongoose");
var UserSchema = require("./UserSchema");

let uristring = dbconfig.urilocal;

mongoose.connect(uristring);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));

db.once("open", function (callback) {
    console.log("Connection Succeeded."); /* Once the database connection has succeeded, the code in db.once is executed. */
});

var User = mongoose.model("User", UserSchema.userSchema);

module.exports.User = User;

