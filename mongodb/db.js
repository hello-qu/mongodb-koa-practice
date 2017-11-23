// 数据库连接
const MongoClient = require('mongodb').MongoClient;
const url = require('../config/default').url;
const ObjectID = require('mongodb').ObjectID;

//查询数据
let queryInfo = async (ctx,next) => {
    let searchObj = ctx.query;
    if( searchObj.likes){
        searchObj.likes = Number(searchObj.likes)
    }
    try {
        let connResult = await MongoClient.connect(url);
        let dataResult = await connResult.collection('col').find(searchObj).toArray();
        return dataResult;
        
    } catch (e) {
       return e;
    }
 }

//删除数据
let remove = async (ctx) => {
    return new Promise((res,rej)=>{
        let postdata = "";
        // 是否必须通过监听data的方式 能不能同步获取？
        ctx.req.addListener('data', async (data) => {
            postdata += data;
        })
        ctx.req.addListener("end", async () => {
            postdata = JSON.parse(postdata)
            postdata._id = new ObjectID(postdata._id);
            try {
                let connResult = await MongoClient.connect(url);
                let postResult = await connResult.collection('col').deleteOne(postdata);
                if(postResult.result.ok === 1 && postResult.result.n !== 0){
                    res({
                        success:true,
                        code:"000",
                        message:"删除成功"
                    })
                }else if(postResult.result.ok === 1 && postResult.result.n === 0){
                    res({
                        success:true,
                        code:"001",
                        message:"数据不存在，删除失败"
                    })
                }
            } catch (e) {
                console.log(e)
                return e;
            }
        })
    })
}

//修改数据
let updateData = async (ctx) =>{
    return new Promise((res,rej)=>{
        let postdata = "";
        ctx.req.addListener('data', async (data) => {
            postdata += data
        })
        ctx.req.addListener("end", async () => {
            postdata = JSON.parse(postdata)
            try {
                let connResult = await MongoClient.connect(url);
                postdata._id = new ObjectID(postdata._id);
                let postResult = await connResult.collection('col').updateOne({_id:postdata._id},{$set:postdata});
                if(postResult.result.ok === 1 && postResult.result.nModified!== 0){
                    res({
                        success:true,
                        code:"000",
                        message:"修改成功"
                    })
                }else if(postResult.result.ok === 1 && postResult.result.nModified== 0){
                    res({
                        success:true,
                        code:"001",
                        message:"数据不存在，修改失败"
                    })
                }
            } catch (e) {
                console.log(e)
                return e;
            }
        })
    console.log("postdata",postdata)
    })
}

//新增数据


/*
* resolve 中传入db貌似会有问题，无法被controll
* 接收到到一直报undefined  上下文丢失
*/
module.exports = {
    queryInfo,
    remove,
    updateData
}
