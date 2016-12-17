import express from 'express';
import validateInput from '../shared/validations/signup';
import User from '../models/User';

import mongoose from 'mongoose';

let router = express.Router();


router.post('/', (req, res) => {
    const { errors, isValid } = validateInput(req.body);

    if (true) {
        // res.json({ success: true });
        const { username, password, timezone, email } = req.body;
        let date = new Date;
        var chris = new User({
            username: username,
            password: password,
            email: email,
            timezone: timezone
        });

        var uristring = 'mongodb://boy:test123@ds133398.mlab.com:33398/tutorialtoy';
        mongoose.Promise = require('bluebird');
        mongoose.connect(uristring, function (err, res) {
            if (err) {
                console.log('ERROR connecting to: ' + uristring + '. ' + err);
            } else {
                console.log('Succeeded connected to: ' + uristring);
            }
        });

        var result = chris.save();

        // result.then(
        //     function (user) {
        //         console.log('saved!');
        //         console.log(user);
        //         res.json({ success: true });
        //     })
        //     .catch(
        //     function (err) {
        //         if (err) {
        //             console.log('Error on save!');
        //             console.log(err);
        //             mongoose.connection.close();
        //             res.status(500).json(err);
        //         }
        //     }
        //     );

        result.then(user => {
            console.log('saved!');
            res.json({ success: true })
        })
            .catch(err => {
                console.log('error!');
                res.status(500).json({ error: err })
            });


        // mongoose.disconnect();
        mongoose.connection.close();
    } else {
        res.status(400).json(errors);
    }
});

export default router;
