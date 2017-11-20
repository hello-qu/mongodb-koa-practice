// 数据库连接
const MongoClient = require('mongodb').MongoClient;
const url = require('../config/default').url;


let queryInfo = async (ctx,next) => {
    let searchObj = ctx.query;
    searchObj.likes = searchObj.likes ? Number(searchObj.likes) : undefined;
    try {
        let connResult = await MongoClient.connect(url);
        let dataResult = await connResult.collection('col').find(searchObj).toArray();
        return dataResult;
    } catch (e) {
       return e;
    }
 }


let remove = async (ctx) => {
    let postdata = "";
    ctx.req.addListener('data', async (data) => {
        postdata += data
    })
    ctx.req.addListener("end", async () => {
        postdata = JSON.parse(postdata)
        try {
            let connResult = await MongoClient.connect(url);
            let postResult = await connResult.collection('col').deleteOne(postdata);
        } catch (e) {
            console.log(e)
            return e;
        }
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
