const db = require('../mongodb/db');

module.exports.getInfo = async (ctx) => {
    ctx.body  = await db.queryInfo(ctx);
    console.log(ctx.response.body)
}

module.exports.deleteInfo = async(ctx) => {
    ctx.body = await db.remove(ctx)
}
