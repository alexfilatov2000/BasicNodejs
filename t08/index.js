const Koa = require('koa');
const Router = require('@koa/router');
const serve =  require ('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require ('@koa/cors')
const session = require('koa-session');
const ver = require('./lib.js');
const multer = require('@koa/multer');
const path = require('path');

const app = new Koa();
const router = new Router();
const upload = multer();
const PORT = 3000;
// upload file storage path, and file name


app.keys = ['Shh, its a secret!'];
// app.use(multer({dest:"uploads"}).single("filedata"));
app.use(bodyParser());
app.use(serve('.'));
app.use(session(app));
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());


router.post('/', upload.single('avatar'), async ctx => {
    console.log('ctx.request.files', ctx.request.files);
    console.log('ctx.files', ctx.files);
    console.log('ctx.request.body', ctx.request.body);
    ctx.body = 'done';
})

router.get('/', async ctx => {
    const data = await ver.parseCsv(`marvel_characters_info.csv`);
    const tran = ver.transform(data);
    let value = '';
    tran.forEach(item => {
        value += `
            <tr>
                <td>${item.ID}</td>
                <td>${item.Name}</td>
                <td>${item.Alignment}</td>
                <td>${item.Gender}</td>
                <td>${item.EyeColor}</td>
                <td>${item.Race}</td>
                <td>${item.HairColor}</td>
                <td>${item.Publisher}</td>
                <td>${item.SkinColor}</td>
                <td>${item.Height}</td>
                <td>${item.Weight}</td>
            </tr>
            
        `
    })

    ctx.body = `
        <h1>Parsing CSV data</h1>
        
        <form action="/" method="post" enctype="multipart/form-data">
            <label for="myFile"></label>
            <input type="file" id="myFile" name="avatar"><br><br>
            <input type="submit" value="APLLY">
        </form>
        <table style="border-collapse: collapse; border: 1px solid black">${value}</table>
        
        <script src="lib.js"></script>
    `
})


app.listen(PORT, () => {
    console.log(`Koa started on PORT ${PORT}`);
});
