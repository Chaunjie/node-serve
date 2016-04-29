/**
 * Created by xudao on 16/3/21.
 */
var query = require('../dataBase'),
    util = require('../util'),
    Q = require('q');

module.exports = {
    init: function (app) {
        app.get('/user/addUser', this.addUser);
        app.all('/user/deleteUser', this.deleteUser);
        app.get('/user/getUser', this.getUser);
        app.get('/user/updateUser', this.updateUser);
        app.get('/user/getUserGoods', this.getUserGoods);
    },

    addUser: function (req, res) {
        var name = req.param('name'),
            sex = req.param('sex');

        query("insert into user(`username`,`sex`) values('" + name + "','" + sex + "')", function (err, vals, fields) {
            var backData = util.throwOption(vals);
            res.send(backData);
        });
    },

    deleteUser: function (req, res) {
        var name = req.param('name');

        query("delete from user where username='" + name + "'", function (err, vals, fields) {
            var backData = util.throwOption(vals);
            res.send(backData);
        });

    },

    getUser: function (req, res) {
        query("SELECT * FROM user", function (err, vals, fields) {
            res.send({
                code:0,
                message:vals,
                data: 'success'
            });
        });
    },

    updateUser: function (req, res) {
        var name = req.param('name'),
            sex = req.param('sex');
        var sql = "update user set sex='" + sex + "' where username='" + name + "'";
        query(sql, function (err, vals, fields) {
            var backData = util.throwOption(vals);
            res.send(backData);
        });
    },

    /*getUserGoods: function(req, res){
     var name = req.param('name');

     var sql = "select * from user as u left join shop as s on s.user_id = u.id left join goods as g on g.shop_id=s.id where u.username like '"+name+"'";
     query(sql, function(err,vals,fields){
     res.send(vals);
     })
     }*/
    getUserGoods: function (req, res) {
        var name = req.param('name'),
            returnData, arr = [];

        var sql = "select * from user where username='" + name + "'";
        query(sql, function (err, vals, fields) {
            returnData = vals[0];
            sql = "select * from shop where user_id='" + vals[0].id + "'";
            query(sql, function (err, vals, fields) {
                returnData.shop = vals;

                vals.forEach(function (_this, index) {
                    sql = "select * from goods where shop_id='" + vals[index].id + "'";
                    mapSql(sql, function (value) {
                        _this.goods = value;
                        if(index == vals.length - 1){
                            res.send(returnData)
                        }
                    });


                })

            });
        });

        function mapSql(sql, callback) {
            query(sql, function (err, vals, fields) {
                callback && callback(vals);
            });
        }
    }
};