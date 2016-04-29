/**
 * Created by xudao on 16/3/21.
 */
var query = require('../dataBase'),
    util = require('../util'),
    Q = require('q');

module.exports = {
    init: function (app) {
        app.get('/member/login', this.login);
    },

    login: function (req, res) {
        var name = req.param('username'),
            pwd = req.param('pwd');
        query("SELECT * FROM member where username ='" + name + "' and password = '" + pwd + "'", function (err, vals, fields) {
            var data = util.installData(vals);
            res.send(data);
        });
    }

};