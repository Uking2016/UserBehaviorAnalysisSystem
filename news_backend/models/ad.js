var pool = require('./index');

var Ad = {};

// 根据类型获取广告
Ad.getAdByType = (data, callback) => {
    pool.getConnection((err, connection) => {
        if(err){
            console.log("Database connect error");
        }
        var ad_type = data.query.ad_type;
        var query = 'SELECT ad_id,ad_content,ad_img,ad_type FROM ad WHERE ad_type = ?';
        
        connection.query(query, [ad_type], (err, results, fields) => {
            if (err) {
                console.log("Insert Error: " + err);
            }
            callback(results);
        })
        connection.release();
    })
};
//广告点击接口
Ad.adClick = (data, callback) => {
    pool.getConnection((err, connection) => {
        if(err){
            console.log("Database connect error");
        }
        var {visit_id,ad_visit_id,ad_id,ad_visit_time} = data.query;
        var query = 'INSERT INTO ad_visit(visit_id,visit_ad_id,ad_id,ad_visit_time) VALUES (?,?,?,?)';
        connection.query(query, [visit_id,ad_visit_id,ad_id,ad_visit_time], (err, results, fields) => {
            if (err) {
                console.log("Insert Error: " + err);
            }
            if(results.affectedRows == 0){
                callback(false);
            }else{
                callback(true);
            }
        })
        connection.release();
    })
};
//广告统计
Ad.adCount = (data, callback) => {
    pool.getConnection((err, connection) => {
        if(err){
            console.log("Database connect error");
        }
        var {ad_visit_id,ad_id,ad_visit_time} = data.query;
        var query = "SELECT count(*) as ad_visit_sum,FROM_UNIXTIME(ad_visit_time/1000,'%Y-%m-%d') as date FROM ad_visit GROUP BY date" ;
        connection.query(query, [], (err, results, fields) => {
            if (err) {
                console.log("Insert Error: " + err);
            }
            callback(results);
        })
        connection.release();
    })
};
module.exports = Ad;