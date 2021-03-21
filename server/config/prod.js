module.exports = {
    // process.env.DB_URL はheroku側で設定する
    // reservation-app-kawarabasami -> Settings -> Config Vars
    DB_URL: process.env.DB_URL,
    SECRET: process.env.SECRET,
}