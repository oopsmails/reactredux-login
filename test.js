var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var uristringmlab = 'mongodb://boy:test123@ds133398.mlab.com:33398/tutorialtoy';
var uristringlocal = 'mongodb://boy:test123@127.0.0.1:27017/tutorialtoy';

var uri = uristringmlab;

mongoose.connect(uri, function (err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + uri + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uri);
    }
});

// var db = mongoose.createConnection('mongodb://localhost/test2');
// db.model('User', userSchema);

var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdDate: Date

});

var User = mongoose.model('User', userSchema);
var test = new User({
    username: 'username',
    password: 'password',
    email: 'email',
    timezone: 'timezone'
});
var result = test.save();

// result.then(
//     function (user) {
//         console.log('saved!');
//         console.log(user);
//     })
//     .catch(
//     function (err) {
//         if (err) {
//             console.log('Error on save!');
//             console.log(err);
//         }
//     }
//     );


result.then(user => {
    console.log('saved!');
})
    .catch(error => {
        console.log('error when saving! error = ' + error);
    });


User.find(
    { $or: [{ username: { $eq: 'username' } }, { email: { $eq: 'email' } }] }
    , (error, user) => {
        if (user) {
            console.log("found user =" + user);
        }

        if (error) {
            console.log("error when finding =" + error);
        }

    })

mongoose.disconnect();

