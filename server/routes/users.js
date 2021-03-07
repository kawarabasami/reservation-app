const express = require('express');
const User = require('../model/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config'); // 末尾に"/index"はつけなくても動く(自動的に付与される)

router.post('/login', function (req, res) {
    const { email, password } = req.body;

    // バリデーションチェック
    if (!email) {
        // Invalid error
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'Please fill email!' }] });
    }
    if (!password) {
        // Invalid error
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'Please fill password!' }] });
    }

    // ユーザ存在確認
    User.findOne({ email }, function (err, foundUser) {
        if (err) {
            // Error message
            console.log(JSON.stringify(err));
            return res.status(422).send({ errors: [{ title: 'User error', detail: 'Something went wrong!' }] });
        }

        // ユーザが存在しない場合エラー
        if (!foundUser) {
            // Invalid error
            return res.status(422).send({ errors: [{ title: 'User error', detail: 'User is not exist!' }] });
        }

        // パスワードが一致しない場合エラー
        if (!foundUser.hasSamePassword(password)) {
            return res.status(422).send({ errors: [{ title: 'User error', detail: 'Incorrect password!' }] });
        }

        // JWTの作成。有効期限:1h
        // ※SSLが突破された場合、ここに含まれる情報は外部から閲覧可能なため、機密情報はなるべく載せない
        const token = jwt.sign(
            {
                userId: foundUser.id,
                username: foundUser.username,
            },
            config.SECRET, // なるべく強度の強いものを使う(256 bit key generatorでググる)
            { expiresIn: '1h' } // 時間を掛けると暗号化が突破される可能性があるため、長時間に設定するのはリスクあり
        );

        return res.json(token);
    });


})

router.post('/register', function (req, res) {
    const { username, email, password, confirmPassword } = req.body;

    // バリデーションチェック
    if (!username) {
        // Invalid error
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'Please fill username!' }] });
    }

    if (!email) {
        // Invalid error
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'Please fill email!' }] });
    }

    if (!password) {
        // Invalid error
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'Please fill password!' }] });
    }

    if (password !== confirmPassword) {
        // Invalid error
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'Please check passwords!' }] });
    }

    // email存在確認
    User.findOne({ email }, function (err, foundUser) { // findOneの場合、一つでも見つかったら検索を終える
        if (err) {
            // Error message
            return res.status(422).send({ errors: [{ title: 'User error', detail: 'Something went wrong!' }] });
        }

        // emailが既に存在する場合エラー
        if (foundUser) {
            // Invalid error
            return res.status(422).send({ errors: [{ title: 'User error', detail: 'User already exist!' }] });
        }

        const user = new User({ username, email, password });
        user.save(function (err) {
            if (err) {
                // Error message
                return res.status(422).send({ errors: [{ title: 'User error', detail: 'Something went wrong!' }] });
            }
            res.json({ "registerd": true });
        })

    });

    // const productId = req.params.productId;
    // Product.findById(productId, function (err, foundProduct) {
    //     if (err || !foundProduct) {
    //         return res.status(422).send({ errors: [{ title: 'product error', detail: 'Product not found!' }] });
    //     }
    //     return res.json(foundProduct);
    // });


})

module.exports = router;