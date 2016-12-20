// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

// create a schema
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

        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        createdDate: Date

    }
    , {timestamps: {createdAt: 'created_at'}}
);

// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
userSchema.methods.dudify = function () {
    // add some stuff to the users name
    this.name = this.name + '-dude';

    return this.name;
};


// on every save, add the date
userSchema.pre('save', function (next) {
    console.log("Pre save ................................");
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at) {
        this.created_at = currentDate;
    }

    var self = this;

    // if (!self.isModified('passHash')) return next();
    //
    // bcrypt.hash(self.passHash, SALT_WORK_FACTOR, null, function encryptedPassword(err, hash) {
    //     if (err) console.log(err);
    //
    //     self.passHash = hash;
    //     next();
    // });
    next();
});


// the schema is useless so far
// we need to create a model using it
//var User = 
mongoose.model('users', userSchema);
var User = mongoose.model('users');

// make this available to our users in our Node applications
module.exports = User;