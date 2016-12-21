import express from 'express';
import validateInput from '../shared/validations/signup';
import UserModel from '../models/UserModel';
import dbconfig from '../dbconfig';

import mongoose from 'mongoose';

let router = express.Router();

let uristring = dbconfig.mongodburi;

router.post('/', (req, res) => {
    const { errors, isValid } = validateInput(req.body);

    if (true) {
        // res.json({ success: true });
        const { username, password, timezone, email } = req.body;
        let date = new Date;

        var chris = new UserModel.User({
            username: username,
            password: password,
            email: email,
            timezone: timezone
        });

        mongoose.Promise = require('bluebird');
        var result = chris.save();

        result.then(user => {
            console.log('saved!');
            res.json({ success: true })
        })
            .catch(err => {
                console.log('error!');
                res.status(500).json({ error: err })
            });

        mongoose.connection.close();
    } else {
        res.status(400).json(errors);
    }
});

export default router;


