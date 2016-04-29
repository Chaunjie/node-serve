/**
 * Created by xudao on 16/3/22.
 */
var mysql=require("mysql");

var pool = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: '123456',
    database: 'example',
    port: 3306
});

var query=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql, function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};

module.exports=query;
