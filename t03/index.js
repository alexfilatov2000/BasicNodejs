const Koa = require('koa');
const Router = require('koa-router');
const serve =  require ('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require ('@koa/cors')
const session = require('koa-session');

const app = new Koa();
const router = new Router();
const PORT = 3000;

app.keys = ['Shh, its a secret!'];
app.use(bodyParser());
app.use(serve('.'));
app.use(session(app));
app.use(router.routes());
app.use(cors());

router.post('/', async ctx => {
    const {password} = ctx.request.body;
    ctx.session.hash = await argon2.hash(password);
    return ctx.redirect('/guess')
})

router.get('/', async ctx => {
    ctx.body = `
        <h1>Charset</h1>
        <div>
            <label for="psw">Change charset:</label>
            <input type="text" name="password" placeholder="input string" id="psw"><br><br>
            <label for="hash">Select charset or several charsets:</label>
            <select multiple id="hash">
                 <option class="opt" value="UTF-8">UTF-8</option>
                 <option class="opt" value="ISO-8859-1">ISO-8859-1</option>
                 <option class="opt" value="Windows-1252">Windows-1252</option>
            </select>
            <button id="myButt">Change charset</button>
            <input id="clear" type="reset" value="Clear">
            <div id="items">
                <div id="input" style="display: none">
                    <span>Input string: </span>
                    <textarea name="areaInput" id="areaInput" disabled></textarea>
                </div>
                <div id="utf" style="display: none">
                    <span>UTF-8: </span>
                    <textarea name="areaUTF" id="areaUTF" disabled></textarea>
                </div>
                <div id="iso" style="display: none">
                    <span>ISO-8859-1: </span>
                    <textarea name="areaISO" id="areaISO" disabled></textarea>
                </div>
                <div id="win" style="display: none">
                    <span>Windows-1252: </span>
                    <textarea name="areaWIN" id="areaWIN" disabled></textarea>
                </div>
            </div>
        </div>
        <script src="main.js" ></script>
    `
})


app.listen(PORT, () => {
    console.log(`Koa started on PORT ${PORT}`);
});
