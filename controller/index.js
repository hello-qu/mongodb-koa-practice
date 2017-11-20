const db = require('../mongodb/db');

module.exports.getInfo = async (ctx) => {
    ctx.body  = await db.queryInfo(ctx)
}

module.exports.deleteInfo = async(ctx) => {
    ctx.body = await db.remove(ctx)
}
