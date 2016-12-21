import express from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from '../config';

import dbconfig from '../dbconfig';

let router = express.Router();

let uristring = dbconfig.mongodburi;

router.post('/', (req, res) => {
    const { identifier, password } = req.body;

    mongoose.Promise = require('bluebird');
    mongoose.connect(uristring, function (err, res) {
        if (err) {
            console.log('ERROR connecting to: ' + uristring + '. ' + err);
        } else {
            console.log('Succeeded connected to: ' + uristring);
        }
    });
    User.find(
        { $or: [{ username: { $eq: identifier } }, { email: { $eq: identifier } }] }
    ).then(user => {
        console.log('finding user by ' + identifier + ', returning ' + user.length + ' result(s).');
        if (user && user.length == 1) {
            console.log('user[0] = ' + user[0]);
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            console.log('hash = ' + hash);
            console.log('user[0].password = ' + user[0].password);
            if (bcrypt.compareSync(password, user[0].password)) {
                const token = jwt.sign({
                    id: user[0].id,
                    username: user[0].username
                }, config.jwtSecret);
                console.log('token = ' + token);
                res.json({ token });
            } else {
                console.log('Password not match');
                res.status(401).json({ errors: { form: 'Invalid Credentials' } });
            }
        } else {
            console.log('Cannot find user');
            res.status(401).json({ errors: { form: 'Invalid Credentials' } });
        }
        mongoose.connection.close();
        // res.json(user);
    }).catch(error => {
        if (error) {
            console.log("error when finding =" + error);
        }
        mongoose.connection.close();
    });
});

export default router;


