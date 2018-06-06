const db = require('../../db/index')
function login(req,res){
    var username= req.body.username;
    var userphone= req.body.userphone;
    var useremail= req.body.useremail;
    var photo= req.body.photo;
    var pw = req.body.pw;
    db.connect().query(`INSERT INTO user(username,userphone,useremail,photo,pw) * FROM user VALUES (${username},${userphone},${useremail},${photo},${pw})`, function (error, results, fields) {
        if (error) throw error;
    });
}
module.exports = login