const Koa = require('koa');
const Router = require('koa-router');
const serve =  require ('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require ('@koa/cors')
const session = require('koa-session');
const { createReadStream } = require('fs');
const axios = require('axios')

const app = new Koa();
const router = new Router();
const PORT = 3000;

app.keys = ['Shh, its a secret!'];
app.use(bodyParser());
app.use(serve('.'));
app.use(session(app));
app.use(cors());
app.use(router.routes());

router.get('/', async ctx => {
    ctx.body = `
        <h1>Comics from marvel API</h1>
        
        <div>code: <span id="code"></span></div>
        <div>status: <span id="status"></span></div>
        <div>copyright: <span id="copyright"></span></div>
        <div>attrText: <span id="attrText"></span></div>
        <div>attrHTML: <span id="attrHTML"></span></div>
        <div>etag: <span id="etag"></span></div>
        <div>id: <span id="ids"></span></div>
        <div>title: <span id="title"></span></div>
        <div>description: <span id="desc"></span></div>
        <script src="front.js"></script>
    `
})

app.listen(PORT, () => {
    console.log(`Koa started on PORT ${PORT}`);
});
