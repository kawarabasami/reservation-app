const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const FakeDB = require('./fake-db');

const productRoutes = require('./routes/products');

// MongoDB接続処理
mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    // MongoDB接続時の処理定義
    const fakeDb = new FakeDB();
    fakeDb.initDb();
});

const app = express();

app.use('/api/v1/products', productRoutes);

const PORT = process.env.PORT || '3001'; // herokuの上ではprocess.env.PORTの設定を使う

app.listen('3001', function () {
    console.log('I am running!');
});

