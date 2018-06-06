// var express = require('express');
// var session = require('express-session');
// var bodyParser = require('body-parser')
// var app = express()
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// const uuidv1 = require('uuid/v1');
// const router = require('./router/index')

// app.use(session({
//     secret: uuidv1(), //secret的值建议使用随机字符串
//     cookie: {maxAge: 60 * 1000 * 30} // 过期时间（毫秒）
// }));
// app.use(express.static('../news/dist'));   //静态资源的入口
// app.use(router);
// // var Mock = require('mockjs')
// // var data = Mock.mock({
// //     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
// //     'list|1-10': [{
// //         // 属性 id 是一个自增数，起始值为 1，每次增 1
// //         'id|+1': 1
// //     }]
// // })
// var server = app.listen(4004)
var express =  require('express');
var session =  require('express-session');
var pug =  require('pug');
var bodyParser =  require('body-parser');
var helmet =  require('helmet');

var index = require('./routes/index');

var app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.set('trust proxy', 1);

app.use(helmet());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors 解决跨域问题
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
})

app.use('/', index);
app.use('*', function(req, res){
    res.status(404).send('404 Not Found by Express');
})

app.listen(4004, function(){
    console.log("Server runs on port 3000.");
});
