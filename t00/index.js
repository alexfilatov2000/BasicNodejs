let Koa = require('koa');
let Router = require('koa-router');
let serve =  require ('koa-static');
let bodyParser = require('koa-bodyparser');
let cors = require ('@koa/cors')

const app = new Koa();
const router = new Router();
const PORT = 3000;

app.use(bodyParser());
app.use(serve('.'));
app.use(router.routes());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Koa started on PORT ${PORT}`);
});
