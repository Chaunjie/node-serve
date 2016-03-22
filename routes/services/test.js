/**
 * Created by xudao on 16/3/21.
 */
var Test = {
    init: function(app){
        app.get('/test/show', this.doShow);
        app.get('/test/hide', this.doHide);
    },

    doShow: function(req, res){
        res.send({
            status: 1,
            info: '服务器测试doShow方法'
        });
    },

    doHide: function(req, res){
        res.json({
           status: 1,
           info: '服务器测试doHide方法'
        });
    }
};

module.exports = Test;