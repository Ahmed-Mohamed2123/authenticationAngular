const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                address: req.body.address,
                password: hash
            });
            user.save()
            .then(result => {
                res.status(201).json({
                    message: 'User created!',
                    result: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Invalid authentication credentials!'
                })
            });

        })
});

router.post("/login", (req, res, next) => {
    let feachedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed!"
                });
            }
            feachedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: 'Auth failed!'
                });
            }
            const token = jwt.sign(
                { 
                    email: feachedUser.email,
                    userId: feachedUser._id 
                },
                "secret_this_should_be_longer",
                { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: feachedUser._id,
                email: feachedUser.email
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Invalid authentication credentials!"
            })
        });
});

module.exports = router;