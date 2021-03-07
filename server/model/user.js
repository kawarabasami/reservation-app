const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    //   author: ObjectId,
    username: {
        type: String,
        require: true,
        max: [60, 'ユーザ名は最大60文字までです']
    },
    email: {
        type: String,
        require: true,
        unique: true, // 重複を許さない
        max: [60, 'Eメールは最大60文字までです']
    },
    password: {
        type: String,
        require: true,
        max: [30, '最大30文字までです'],
        min: [6, '6文字以上で入力してください']
    },
});

// パスワード比較処理の定義
UserSchema.methods.hasSamePassword = function (inputPassword) {
    const user = this;

    // 入力されたパスワードをbcryptでハッシュ化してから比較
    return bcrypt.compareSync(inputPassword, user.password); // 等しければtrueを返す
}

// 保存前の処理定義
UserSchema.pre('save', function (next) {
    const user = this; // this=UserSchemaのこと?
    const saltRounds = 10; // 1秒間に10個hashが生成できるレベルに設定する(詳細はbcryptのnpmページ参照)

    // bcryptでハッシュ値生成
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            // Store hash in your password DB.
            user.password = hash;
            next(); // next()処理を実行すると、save処理が走る
        });
    });
});

module.exports = mongoose.model('User', UserSchema);