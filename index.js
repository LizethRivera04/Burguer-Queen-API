//Erva2ThO1LiNnvgb
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const app = express();
require('dotenv').config();

//let port = process.env.PORT || 8080

//bodyParser middleware to read data from the user
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/products', productsRoutes)
app.use('/orders', ordersRoutes)
app.get('/', (req, res) => {
    res.send('Welcome to Burguer Queen API !!')
})


//DB connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.log(err))


// server lift
app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
})