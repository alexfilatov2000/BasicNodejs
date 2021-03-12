const Koa = require('koa');
const Router = require('koa-router');
const serve =  require ('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require ('@koa/cors')
const session = require('koa-session');
const { createReadStream } = require('fs');

const path = require('path');

const app = new Koa();
const router = new Router();
const PORT = 3000;

app.keys = ['Shh, its a secret!'];
app.use(bodyParser());
app.use(serve('.'));
app.use(session(app));
app.use(cors());
app.use(router.routes());


router.post('/', async ctx => {
    ctx.session.user = ctx.request.body;
    return ctx.redirect('/session')
})

router.post('/removeSession', async ctx => {
    ctx.session.user = null;
    return ctx.redirect('/');
})

router.get('/', async ctx => {
    ctx.type = 'html';
    ctx.body = createReadStream('main.html');
})

router.get('/session', async ctx => {
    let result = ctx.session.user;
    ctx.body = `
        <h1>Session for new</h1>
        <div style="font-family: Arial, sans-serif; padding-left: 40px;"> 
            <div>name: ${result.rname}</div>
            <div>alias: ${result.alias}</div>
            <div>age: ${result.age}</div>
            <div>description: ${result.about}</div>
            <div>file: ${result.myfile}</div>
            <div>powers: ${result.messageCheckbox}</div>
            <div>level: ${result.cowbell}</div>
            <div>origin: ${result.check}</div>
        </div>
        <form method="post" action="/removeSession" style="width: 100%; border: 1px solid black; padding: 20px; margin-top: 10px;">
            <input type="submit" value="FORGET">
        </form>
    `
})

app.listen(PORT, () => {
    console.log(`Koa started on PORT ${PORT}`);
});
