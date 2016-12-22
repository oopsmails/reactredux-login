import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';
import mongoose from 'mongoose';
import dbconfig from '../dbconfig';

export default (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    let token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }

    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            console.log("authenticate.js, err =" + err);
            console.log("authenticate.js, decoded =" + decoded);
            if (err) {
                res.status(401).json({error: 'Failed to authenticate'});
            } else {
                let uristring = dbconfig.mongodburi;

                mongoose.Promise = require('bluebird');
                mongoose.connect(uristring, function (err, res) {
                    if (err) {
                        console.log('ERROR connecting to: ' + uristring + '. ' + err);
                    } else {
                        console.log('Succeeded connected to: ' + uristring);
                    }
                });

                User.find({_id: decoded.id}, {_id: 1, email: 1, username: 1})
                    .then(user => {
                        console.log("found user =" + user[0]);
                        if (!user || user.length <= 0) {
                            res.status(404).json({error: 'No such user'});
                        }
                        req.currentUser = user;
                        next();
                    }).catch(error => {
                    if (error) {
                        console.log("error when finding =" + error);
                    }
                    mongoose.connection.close();
                });
            }
        });
    } else {
        res.status(403).json({
            error: 'No token provided'
        });
    }
}