const Koa = require('koa');
const Router = require('koa-router');
const serve =  require ('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require ('@koa/cors')
const session = require('koa-session');
const { createReadStream } = require('fs');
const axios = require('axios')
const htmlspecialchars = require('htmlspecialchars');

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

var x = '';

router.post('/', async ctx => {
    ctx.session.text = 1;
    let {url} = ctx.request.body;
    const response = await axios.get(url);

    x = htmlspecialchars(response.data);
    ctx.session.url = url;

    return ctx.redirect('/');
})

router.post('/delete', async ctx => {
    ctx.session.url = '';
    x = '';
    return ctx.redirect('/');
})

router.get('/', async ctx => {
    ctx.body = `
        <h1>Show other sites</h1>
        <form action="/" method="post">
            <label for="url"></label>
            <input type="text" name="url" id="url" placeholder="url">
            <input type="submit" value="go">
        </form>
        <form id="myform" action="/delete" method="post">
            <a href="#" onclick="document.getElementById('myform').submit()">BACK</a>
        </form>
        <div>${ctx.session.url}</div><br>
        <div>${x}</div>
    `
})



app.listen(PORT, () => {
    console.log(`Koa started on PORT ${PORT}`);
});
