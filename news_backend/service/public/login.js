const db = require('../../db/index.js')
function login(req,res){

    var userNum = req.body.userNum;
    var pw = req.body.pw;
    for(var item in req.body){
        if(item){
            item = JSON.parse(item);
            userNum = item.userNum;
            pw = item.pw;
        }
    }
    db.connect();
    var sql = `SELECT userid FROM user WHERE (username='${userNum}' OR userphone='${userNum}' OR useremail='${userNum}') AND pw='${pw}' `;
    db.query(sql, function (error, results, fields) {
        if (error) throw error;
        if(results.length){
            if(!req.session.userid){
                req.session.userid = results[0].userid;
                res.send({
                    status: 200,
                    message: '登录成功'
                })
            }else{
                res.send({
                    status: 200,
                    message: '你已经登录，请勿重复登录'
                })
            }
        }else{
            res.send({
                status: 404,
                message: '用户名或密码错误'
            })
        }
    });
    db.on('error', function(err) {
        console.log("[mysql error]",err);
    });
    db.end();  
}
module.exports = login