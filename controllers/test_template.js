const env = require(__dirname+"/../nunjucks.js")
var model = require('model')
var fn_template = async (ctx, next) => {
    var s = env.render('hello.html', { name: '小明' });
    console.log(s);
    ctx.response.body = s;
};

var fn_render = async (ctx, next) => {
    let ts = await model.Test1.findAll()
    ctx.render("hello.html",{ name: 'ctx.render'})
};


module.exports = {
    'GET /test_template': fn_template,
    'GET /test_ctx_render':fn_render
};