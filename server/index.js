const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const config = require('./config'); // 末尾に"/index"はつけなくても動く(自動的に付与される)
const FakeDB = require('./fake-db');

const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');

const path = require('path');

// MongoDB接続処理
mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    if (process.env.NODE_ENV !== 'production') { // 本番環境でのみ実施
        // MongoDB接続時の処理定義
        const fakeDb = new FakeDB();
        // fakeDb.initDb(); // ←必要な時だけコメント解除
    }
}).catch((error) => {
    console.log("MongoDB 接続エラー");
    console.log(JSON.stringify(error));
});

const app = express();

// parse application/json
// routesにてreq.bodyでjsonの値が取れるようになる
app.use(bodyParser.json())

// 商品情報取得用API
app.use('/api/v1/products', productRoutes);

// ユーザ認証用API
app.use('/api/v1/users', userRoutes);

// 上記API以外へのアクセスの場合、CL画面へアクセスさせる
if (process.env.NODE_ENV === 'production') { // 本番環境でのみ実施
    const appPath = path.join(__dirname, "..", 'dist', "reservation-app"); // Angularで作ったdistフォルダへのpathを生成
    app.use(express.static(appPath)); // distフォルダを静的ファイル配置先として登録
    app.get("*", function (req, res) {
        // distフォルダ配下のindex.htmlへ飛ばす
        res.sendFile(path.resolve(appPath, 'index.html'));
    });
}

const PORT = process.env.PORT || '3001'; // heroku上ではprocess.env.PORTの設定を使う

app.listen(PORT, function () {
    console.log('I am running!');
});

