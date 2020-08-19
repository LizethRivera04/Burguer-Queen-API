const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

/* exports.userList = (req, res) => {
    console.info(req.query.page)//http://localhost:8080/users/?page=2 , <.req.query =  { page: '2' }, <.req.query.page = 2
}
 */

//add a user only if you are the admin
exports.userCreate = async (req, res) => {
    const { email, password } = req.body;

    try {
        //checks if email exists in DB
        let newUser = await User.findOne({ email })
        if (newUser) {
            res.status(400).json({ msg: 'El usuario ya existe' })
        };
        newUser = new User(req.body);
        //console.log('newUser:', newUser);
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
            res.json({ register: true, newUser })
        })
    } catch (err) {
        res.status(400).json({ msg: err })
    }
}


//Modify a user if has a token, is admin or user to modify
exports.userModification = async (req, res) => {
    if (req.userId === req.params.id) {
        //console.log(req.userId, req.params.id);
        console.log('user');
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!user) {
            res.status(404).json({ msg: 'Usuario no encontrado' })
        }
        res.status(200).json({ msg: 'Usuario actualizado', user: user })
    } else if (req.userId === process.env.ADMIN_ID) {
        console.log('admin');
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!user) {
            res.status(404).json({ msg: 'Usuario no encontrado' })
        }
        res.status(200).json({ msg: 'Usuario actualizado', user: user });
    } else {
        res.status(403).send('No tienes permiso para editar datos de este usuario');
    }
}



//get all users if you are admin
exports.usersList = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) throw Error('No users');
        res.status(200).json(users)
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}



//Get only a user if you are the user or admin
exports.user = async (req, res) => {
    if (req.userId === req.params.id) {
        console.log(req.userId, req.params.id)
        console.log('user')
        const user = await User.find({ _id: req.userId })
        res.json(user);
    }
    //console.log(req.userId === process.env.ADMIN_ID)
    // console.log(decoded);
    if (req.userId === process.env.ADMIN_ID) {
        console.log('admin');
        const user = await User.findById(req.params.id)
        res.status(200).json(user);
    } else {
        res.status(403).send('No tienes permiso para obtener datos de este usuario');
    }
}



//Modify a user if has a token, is admin or user to modify
exports.userDeleted = async (req, res) => {
    if (req.userId === req.params.id) {
        console.log(req.userId, req.params.id);
        console.log('user');
        const user = await User.findByIdAndRemove(req.params.id)
        if (!user) {
            res.status(404).json({ msg: 'Usuario no encontrado' })
        }
        res.status(200).json(user)
    } else if (req.userId === process.env.ADMIN_ID) {
        console.log('admin');
        const user = await User.findByIdAndRemove(req.params.id)
        if (!user) {
            res.status(404).json({ msg: 'Usuario no encontrado' })
        }
        res.status(200).json(user);
    } else {
        res.status(403).send('No tienes permiso para eliminar datos de este usuario');
    }
}