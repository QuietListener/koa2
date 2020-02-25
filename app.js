/**
 * Created by Admin on 16-9-3.
 */
const fs = require("fs")
const Koa = require('koa')
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const mycontroller = require('./controller.js');
const templating = require("./templating_ctx.js")
const staticFiles = require('./static-files');
const model = require('./model');
const google_trans = require("./app/logic/goole_trans")

let isProduction = false;

//创建一个Koa对象表示web app 本生
const app = new Koa();
app.use(bodyParser());
app.use(staticFiles('/static/', __dirname + '/static'));

app.use(async (ctx, next)=>{
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印url
    await next()
});

app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
    });

//
//
//app.use(async (ctx,next)=>{
//    await next()
//    ctx.response.type = "text/html";
//    ctx.response.body = "<h1> hello 1</h1>"
//});



router.get('/hello/:name', async(ctx,next)=>{
    var name = ctx.params.name;
    ctx.response.body = `<h1>hello, ${name}</h1>`;
});

router.get("/",async(ctx,next)=>{
    ctx.response.body = "<h1>index</h1>"
});


router.get("/translate",async(ctx,next)=>{

    let request = ctx.request;
    let query = request.query;

    var sentence = query.sentence;
    var fromLan = query.fromLan;
    var toLan = query.toLan;
    let status = 0;
    let res = {}
    try{
        console.log("sentence and toLan",sentence,toLan);
        res = await google_trans(sentence,toLan);
        console.log("res",res);
    }catch(e){
        console.error(e);
        status = -1;
    }

    ctx.set("Content-Type", "application/json")
    ctx.response.body = JSON.stringify({"data":{fromSentence:sentence,toSentence:res.text,res:res},"status":status});
});


router.get('/hello1/db', async(ctx,next)=>{
    var ts = await model.Test1.findAll(); //使用model
    ctx.response.body = `<h1>hello, ${JSON.stringify(ts)}</h1>`;
});

// add router middleware:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(mycontroller());

app.use(router.routes());

Test1 = model.Test1;
(async () => {
    var pet = await Test1.create({id:null,name: "test11"});

})();

var port = 3344;
app.listen(port);
console.log("app started at port "+port+"...")
