const Koa = require('koa');
const Router = require('koa-router');
const serve =  require ('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require ('@koa/cors')
const session = require('koa-session');
const {File} = require('./Note');

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
    const items = ctx.request.body;
    let file = new File();
    await file.create(items.Filename, items.area);
    return ctx.redirect('/');
})

router.post('/remove', async ctx => {
    let file = new File();
    file.removeFile(ctx.request.body.fileName)
    return ctx.redirect('/');
})

router.get('/', async ctx => {
    let file = new File();
    let names = '';
    if (file.checkForDir()){
        let arrNames = file.getAllFileNames();
        arrNames.forEach((item => {
            names += `<li><a href="" onclick="func(event)" dir="${item.content}" class="link">${item.name}</a></li>`
        }))
    }
    ctx.body = `
        <h1>Notepad mini</h1>
        <form method="post" action="/" style="width: 100%; border: 1px solid black; padding: 10px">
            <h2>Create a note</h2>
            <label for="Filename">Filename:</label>
            <input type="text" name="Filename" id="Filename"><br><br>
            <label for="area">Content:</label>
            <textarea name="area" id="area" cols="50" rows="5"></textarea><br><br>
            <button id="myButt">Create file</button>
        </form>
        <div style="width: 100%; border: 1px solid black; padding: 30px 10px">
            <h2>List of notes:</h2>
            <ul>${names}</ul>
        </div>
        <div style="display: none; width: 100%; border: 1px solid black; padding: 10px; margin-top: 10px" id="myActive">
            <h3>Selected note:</h3>
            <h2 id="activeName"></h2>
            <p>Content:</p>
            <div id="activeContent"></div><br>
            <form action="/remove" method="post">
                <input type="text" name="fileName" id="fileName" style="display: none">
                <input type="submit" value="Delete file">
            </form>
        </div>
        <script src="front.js"></script>
    `
})


app.listen(PORT, () => {
    console.log(`Koa started on PORT ${PORT}`);
});
