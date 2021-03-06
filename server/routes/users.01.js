import express from 'express';
import validateInput from '../shared/validations/signup';

import mongoose from 'mongoose';

import dbconfig from '../dbconfig';

let router = express.Router();
let uristring = dbconfig.mongodburi;

router.post('/', (req, res) => {
    const { errors, isValid } = validateInput(req.body);

    if (isValid) {
        // res.json({ success: true });
        const { username, password, timezone, email } = req.body;
        let date = new Date;

        var Schema = mongoose.Schema;
        var userSchema = new Schema({
            username: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            createdDate: Date

        });
        // var uristring = 'mongodb://boy:test123@ds133398.mlab.com:33398/tutorialtoy';
        mongoose.Promise = require('bluebird');
        var db = mongoose.connect(uristring, function (err, res) {
            if (err) {
                console.log('ERROR connecting to: ' + uristring + '. ' + err);
            } else {
                console.log('Succeeded connected to: ' + uristring);
            }
        });
        var User = db.model('User', userSchema);

        var chris = new User({
            username: username,
            password: password,
            email: email,
            timezone: timezone
        });

        var result = chris.save();

        result.then(
            function (user) {
                console.log('saved!');
                console.log(user);
                res.json({ success: true });
            })
            .catch(
            function (err) {
                if (err) {
                    console.log('Error on save!');
                    console.log(err);
                    res.status(500).json(err);
                }
            }
            );

        // mongoose.disconnect();
        mongoose.connection.close();
        
    } else {
        res.status(400).json(errors);
    }
});

export default router;


