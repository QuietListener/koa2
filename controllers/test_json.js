var fn_index = async (ctx, next) => {
    ctx.response.body = {a:1,b:2}
    ctx.response.type = 'application/json';

};

module.exports = {
    'GET /test_json.json': fn_index
};