const Koa = require('koa');
const Router = require('koa-router');
const serve =  require ('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require ('@koa/cors')
const session = require('koa-session');
const argon2 = require('argon2');

const app = new Koa();
const router = new Router();
const PORT = 3000;

app.keys = ['Shh, its a secret!'];
app.use(bodyParser());
app.use(serve('.'));
app.use(session(app));
app.use(router.routes());
app.use(cors({credentials:true}));

router.post('/', async ctx => {
    const {password} = ctx.request.body;
    ctx.session.hash = await argon2.hash(password);
    return ctx.redirect('/guess')
})

router.post('/verify', async ctx => {
    let hash = ctx.session.hash
    let {psw} = ctx.request.body;
    if (await argon2.verify(hash, psw)) {
        ctx.redirect('/')
        ctx.session.hash = '1';
    } else {
        return ctx.redirect('/guess')
    }
})


router.get('/', async ctx => {
    let temp = '';
    if (ctx.session.hash === '1') temp = 'Hacked!'
    ctx.body = `
        <h1>Password</h1>
        <div style="color: green">${temp}</div>
        <form method="post" action="/">
            <p>Password not saved at session.</p>
            <label for="psw">Password for saving to session</label>
            <input type="password" name="password" placeholder="password"><br>
            <label for="hash">Salt for saving to session</label>
            <input type="text" id="hash" placeholder="session"><br>
            <input type="submit">
        </form>
        <script src="main.js"></script>
    `
})

router.get('/guess', async ctx => {
    let hash = ctx.session.hash
    ctx.body = `
        <h1>Password</h1>
        <form method="post" action="/verify">
            <p>Password saved at session.</p>
            <p>Hash is ${hash}</p>
            <label for="hash">Try to guess:</label>
            <input type="text" name="psw" id="psw" placeholder="session">
            <input type="submit" value="Check password"><br>
            <input type="reset">
        </form>
        <script src="main.js"></script>
    `
})

app.listen(PORT, () => {
    console.log(`Koa started on PORT ${PORT}`);
});
