const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

/* exports.userSignIn = async (req, res) => {
    //validation of empty fields
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.status(400).json({ errors: err })
    }
    const { email, password } = req.body;

    try {
        //checks if email exists in DB
        let newUser = await User.findOne({ email })
        if (newUser) {
            res.status(400).json({ msg: 'El usuario ya existe' })
        };

        newUser = new User(req.body);
        console.log('newUser:', newUser);
        //hashear password
        const salt = await bcryptjs.genSalt(10);
        newUser.password = await bcryptjs.hash(password, salt)
        //save user in DB
        await newUser.save();
        //create jwt
        jwt.sign({ id: newUser._id, email: email, password: password }, process.env.JWT_SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;
            res.send({ register: true, token })
        })

    } catch (err) {
        res.status(400).json({ msg: err })
    }
}
 */

exports.userAuthentication = async (req, res) => {
    //validation of empty fields
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.status(400).json({ errors: err })
    }
    const { email, password } = req.body;

    try {
        //checks if user exists in DB
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'El usuario no existe, por favor registrate' })
        }
        //checks if password is correct
        const passCorrect = await bcryptjs.compare(password, user.password)
        if (!passCorrect) {
            return res.stauts(401).json({ msg: 'Password incorrecto' })
        }
        //create jwt
        jwt.sign({ id: user._id, email: email, password: password }, process.env.JWT_SECRET, {
            expiresIn: 86400
        }, (error, token) => {
            if (error) throw error
            res.send({ auth: true, token })
        })
    } catch (err) {
        console.log(err);
    }
}