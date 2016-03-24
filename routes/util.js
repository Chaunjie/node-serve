'use strict'

module.exports = {
  throwOption: function(data){
    if(data.affectedRows>0){
      return {
        code:0,
        message:'操作成功',
        data:''
      };
    }else{
      return {
        code: 1,
        message: '无此用户,操作失败',
        data:''
      };
    }
  }
};
