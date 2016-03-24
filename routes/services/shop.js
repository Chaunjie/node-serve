/**
 * Created by xudao on 16/3/21.
 */
var query = require('../dataBase'),
    util = require('../util');

module.exports = {
    init: function(app){
        app.get('/user/addShop', this.addShop);
        app.all('/user/deleteShop', this.deleteShop);
        app.get('/user/getShops', this.getShop);
        app.get('/user/updateShop', this.updateShop);
    },

    addShop: function(req, res){
        var name = req.param('name'),
            sex = req.param('sex');

        query("insert into user(`username`,`sex`) values('"+name+"','"+sex+"')",function(err,vals,fields){
            var backData = util.throwOption(vals);
            res.send(backData);
        });
    },

    deleteShop: function(req, res){
        var name = req.param('name');

        query("delete from user where username='"+name+"'",function(err,vals,fields){
            var backData = util.throwOption(vals);
            res.send(backData);
        });

    },

    getShop: function(req, res) {
        query("SELECT * FROM user",function(err,vals,fields){
            res.send(vals);
        });
    },

    updateShop: function(req, res){
        var name = req.param('name'),
            sex = req.param('sex');
        var sql = "update user set sex='"+sex+"' where username='"+name+"'";
        query(sql,function(err,vals,fields){
            var backData = util.throwOption(vals);
            res.send(backData);
        });
    }

};