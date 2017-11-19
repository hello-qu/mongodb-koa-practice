
// 数据库连接
const MongoClient = require('mongodb').MongoClient;
const url = require('../config/default').url;


let queryInfo = (ctx) => {
  return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            console.log("数据库连接成功");
            let searchObj = ctx.query
            if(ctx.query.likes) {ctx.query.likes = Number(ctx.query.likes)}
            let collection = db.collection('col')
            collection.find(searchObj).toArray((error, result) => {
                if (error) {
                    console.log('Error:' + err);
                    return;
                }
                if (result.length === 0) {
                    resolve({
                        "success":true,
                        "code":"000",
                        "message":"查询失败，无该数据"
                    })
                } else {
                    resolve({
                        "success":true,
                        "code":"000",
                        "Object":result,
                        "message":"success"
                    })
                }
            });

        })
    })
}

let remove = (ctx) => {
    return new Promise((resolve, reject) => {
          MongoClient.connect(url, function (err, db) {
              console.log("数据库连接成功-准备删除数据");
              let postdata = "";
              ctx.req.addListener('data', (data) => {
                postdata += data
              })
              ctx.req.addListener("end",function(){
                  postdata = JSON.parse(postdata)
              let collection = db.collection('col');
              if(postdata.likes){
                postdata.likes = Number(postdata.likes)
              }
              console.log(postdata)
              collection.deleteOne(postdata,function(dataErr,result){
                if(dataErr){
                    resolve({
                        "success":true,
                        "code":000,
                        "message":dataErr
                    })
                }
                else{
                    let resMeg = (result.n !==0 && result.ok === 1)?"删除成功":"数据不存在，删除失败"
                    resolve({
                        "success":true,
                        "code":000,
                        "message":resMeg
                    })
                }
              });
            })
          })
      })
  }
/*
* resolve 中传入db貌似会有问题，无法被controll
* 接收到到一直报undefined  上下文丢失
*/
module.exports = {
    queryInfo,
    remove
}
