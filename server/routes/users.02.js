import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcrypt-nodejs';
import isEmpty from 'lodash/isEmpty';

import User from '../models/User';
import dbconfig from '../dbconfig'

import mongoose from 'mongoose';

let router = express.Router();

let uristring = dbconfig.urimlab;

router.get('/:identifier', (req, res) => {
    console.log("calling /users/:identifier");
    mongoose.Promise = require('bluebird');
    mongoose.connect(uristring, function (err, res) {
        if (err) {
            console.log('2 ERROR connecting to: ' + uristring + '. ' + err);
        } else {
            console.log('1 Succeeded connected to: ' + uristring);
        }
    });
    User.find(
        {$or: [{username: {$eq: req.params.identifier}}, {email: {$eq: req.params.identifier}}]}
    ).then(user => {
        console.log('finding user by ' + req.params.identifier + ', returning ' + user.length + ' result(s).');
        mongoose.connection.close();
        res.json(user);
    }).catch(error => {
        if (error) {
            console.log("error when finding =" + error);
        }
        mongoose.connection.close();
    });
});

function validateInput(data, otherValidations) {
    console.log("passed in data =" + data);
    let {errors, isValid} = otherValidations(data);
    console.log("errors 1 =" + errors);

    mongoose.Promise = require('bluebird');
    mongoose.connect(uristring, function (err, res) {
        if (err) {
            console.log('2 ERROR connecting to: ' + uristring + '. ' + err);
        } else {
            console.log('1 Succeeded connected to: ' + uristring);
        }
    });

    return User.find(
        {$or: [{username: {$eq: data.username}}, {email: {$eq: data.email}}]}
    ).then(user => {
        if (user.length > 0) {
            console.log("found user =" + user);
            if (user[0].username === data.username) {
                errors.username = 'There is user with such username';
            }
            if (user[0].email === data.email) {
                errors.email = 'There is user with such email';
            }
        }
        // mongoose.connection.close();

        return {
            errors,
            isValid: isEmpty(errors)
        };
    }).catch(error => {
        if (error) {
            console.log("error when finding =" + error);
        }
        // mongoose.connection.close();
    });

}


router.post('/', (req, res) => {

    validateInput(req.body, commonValidations).then(({errors, isValid}) => {
        console.log("req.body = " + req.body);
        if (isValid) {
            // res.json({ success: true });

            const {username, password, timezone, email} = req.body;
            const salt = bcrypt.genSaltSync(10);
            const password_digest = bcrypt.hashSync(password, salt);
            let date = new Date;
            var chris = new User({
                username: username,
                password: password_digest,
                email: email,
                timezone: timezone
            });

            mongoose.Promise = require('bluebird');
            // mongoose.connect(uristring, function (err, res) {
            //     if (err) {
            //         console.log('2 ERROR connecting to: ' + uristring + '. ' + err);
            //     } else {
            //         console.log('2 Succeeded connected to: ' + uristring);
            //     }
            // });

            var result = chris.save();

            result.then(user => {
                console.log('saved!');
                res.json({success: true})
            })
                .catch(err => {
                    console.log('error!');
                    // this error is a server internal error, e.g, cannot connect db
                    res.status(500).json({error: err})
                });

            // mongoose.connection.close();
        } else {
            // this errors should be carrying "username or password", i.e, errors defined by ourselves
            res.status(400).json(errors);
        }

    });
});

export default router;
