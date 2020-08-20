const express = require('express');
const Product = require('../models/Products');
const path = require('path');
const fs = require('fs-extra');

//Create a product
exports.productCreate = async (req, res) => {
    const { name, price, type } = req.body;
    if (name === undefined || price === undefined || type === undefined) {
        res.status(400).json({ msg: 'Debes completar los campos nombre y precio del producto' })
    }
    const newProduct = {
        name: name,
        price: price,
        type: type,
        image: req.file.path,
        nameImg: req.file.originalname
    }
    const product = new Product(newProduct);
    try {
        await product.save();
        if (!product) throw Error('Algo salió mal al crear el producto');
        res.status(200).json(product)
    } catch (err) {
        res.status(400)
    }
}


//Modify a product with and without image
exports.productUpdate = async (req, res) => {
    const { name, price, type } = req.body;
    if (name === undefined || price === undefined || type === undefined) {
        res.status(400).json({ msg: 'Debes completar los campos nombre y precio del producto' })
    }
    const updateProductImg = {
        name: name,
        price: price,
        type: type,
        image: req.file.path,
        nameImg: req.file.originalname
    }
    const updateProduct = {
        name: name,
        price: price,
        type: type
    }

    try {
        const product = await Product.findById(req.params.id)
        if (product && req.file.originalname === product.nameImg) {
            const newProduct = await Product.findByIdAndUpdate(product, updateProduct, { new: true })
            await fs.unlink(path.resolve(req.file.path));
            res.status(200).json(newProduct)
        }
        if (product && req.file.originalname != product.nameImg) {
            const newProduct = await Product.findByIdAndUpdate(product, updateProductImg, { new: true })
            await fs.unlink(path.resolve(product.image));
            res.status(200).json(newProduct)
        } else if (!product) {
            res.status(400).json({ msg: 'Algo salió mal al modificar el producto' })
        }
        /* const product = await Product.findByIdAndUpdate(req.params.id, newProduct, { new: true })
        console.log(req.file.originalname === product.nameImg);
        if (!product) throw Error('Algo salió mal al modificar el producto');
        res.status(200).json(product) */
    } catch (err) {
        res.status(400)
    }
}


//Get all products
exports.productsList = async (req, res) => {
    try {
        const products = await Product.find()
        if (!products) throw Error('Algo salió mal al obtener todos los produtos');
        res.status(200).json(products)
    } catch (err) {
        res.status(400)
    }
}


//Get a product
exports.product = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            res.status(400).json({ msg: 'No se encontró el producto' })
        }
        res.status(200).json(product)
    } catch (err) {
        res.status(400)
    }
}


//Delete a product and the image from uploads
exports.productDelete = async (req, res) => {
    try {
        const product = await Product.findByIdAndRemove(req.params.id)
        if (!product) {
            res.status(400).json({ msg: 'Error al eliminar el producto' })
        } else if (product) {
            await fs.unlink(path.resolve(product.image));
        }
        res.status(200).json(product);

    } catch (err) {
        res.status(400)
    }
}