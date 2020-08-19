const express = require('express');
const mongoose = require('mongoose')
const { validationResult } = require('express-validator');
const Order = require('../models/Orders');
const { mongo } = require('mongoose');


exports.orderCreate = async (req, res) => {
    const err = validationResult(req);
    // console.log(err);//<.0
    if (!err.isEmpty()) {
        res.status(400).json({ errors: err })
    }
    try {
        const neworder = new Order(req.body);
        neworder.userId = req.userId
        const order = await neworder.save();
        if (!order) throw Error('Algo salió mal al guardar la orden');
        res.status(200).json(order)

    } catch (err) {

        res.status(500)
    }
}

exports.orderUpdate = async (req, res) => {
    const { products, status, client } = req.body;
    //validation products or client isn´n empty
    const err = validationResult(req)
    if (err.errors.length === 2) {
        res.status(400).json({ errors: err })
        //verify status have only 4 options
    } else if (status != 'pending' && status != 'canceled' && status != 'delivering' && status != 'delivered') {
        res.status(400).json({ msg: 'Agrega un status válido' })
    }

    try {
        let order = await Order.findById(req.params.id);
        order.userId = req.userId
        //console.log(order.products[0].quantity);
        // if status = delivered, add dateProcessed to the order
        if (status === 'delivered') {
            let dateProcessed = new Date(Date.now());
            req.body.dateProcessed = dateProcessed
            order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json({ order })
        }
        order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({ order })
    } catch (err) {
        res.status(400)
    }
}


exports.orderList = async (req, res) => {
    try {
        const orders = await Order.find();
        if (!orders) throw Error('Algo salió mal al obtener todas las ordenes');
        res.status(200).json(orders)
    } catch (err) {
        res.status(400)
    }
}

exports.order = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            res.status(404).json({ msg: 'No se encontró la orden' });
        }
        res.status(200).json(order)
    } catch (err) {
        res.status(400)
    }
}

exports.orderDelete = async (req, res) => {
    try {
        const order = await Order.findByIdAndRemove(req.params.id);
        if (!order) {
            res.status(404).json({ msg: 'No se encontró la orden a eliminar' })
        }
        res.status(200).json(order);
    } catch (err) {
        res.status(400)
    }
} 