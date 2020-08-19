const express = require('express');
const mongoose = require('mongoose')
const Order = require('../models/Orders');
const { mongo } = require('mongoose');

//Order creation
exports.orderCreate = async (req, res) => {
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


//Update of a order
exports.orderUpdate = async (req, res) => {
    const { products, status, client } = req.body;
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


//Get all orders
exports.orderList = async (req, res) => {
    try {
        const orders = await Order.find();
        if (!orders) throw Error('Algo salió mal al obtener todas las ordenes');
        res.status(200).json(orders)
    } catch (err) {
        res.status(400)
    }
}


//Get a order
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


//Delete a order
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