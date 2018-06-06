var pool = require('./index');
const uuidv1 = require('uuid/v1');
const getIp = require('../tools/getIp.js');
const getIpInfo = require('../tools/handleIp.js');
const Browser = require('../tools/Browser.js');
var Visit = {};
//增加访问记录
Visit.add = (req, callback) => {
    pool.getConnection((err, connection) => {
        if(err){
            console.log("Database connect error");
        }
        var data = req.body;
        var query = 'INSERT INTO visit (visit_id,user_id,ip,user_agent,start_time,end_time,channel,speed_time,first_visit) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)';
        var ip =  getIp(req);
        var user_agent = req.headers["user-agent"].toLowerCase();
        connection.query(query, [data.visit_id, data.user_id,ip,user_agent,data.start_time,data.end_time,data.channel,data.speed_time,data.first_visit], (err, results, fields) => {
            if (err) {
                console.log("Insert Error: " + err);
            } else {
                if(results.affectedRows == 0){
                    callback(false);
                }else{
                    callback(true);
                }
            }
            connection.release();
        })
    })
}
function unique(arr){
    var new_arr = [];
    for(var i=0;i<arr.length;i++){
        if(new_arr.indexOf(arr[i]) == -1){
            new_arr.push(arr[i]);
        }
    }
    return new_arr.length;
}
function getArrByObjArr(arr,property){
    var tmp,new_arr=[] ;
    for(var i=0;i<arr.length;i++){
        new_arr.push(arr[i][property]);    
    }
    return new_arr;
}
//整体分析
Visit.getWhole = (req,callback)=>{
    pool.getConnection((err, connection) => {
        if(err){
            console.log("Database connect error");
        }
        var data = req.query;
        var start = parseInt(data.start_time);
        var end = parseInt(data.end_time);
        var query = `		select 
		IFNULL(register_sum,0) as register_sum,
		IFNULL(login_sum,0) as login_sum,
		cookie_sum,ip_sum,dates,
		IFNULL(new_sum,0) as new_sum,
		IFNULL(ad_sum,0) as ad_sum,
		IFNULL(new_sum*100/cookie_sum,0) as new_rate 
		from 
		(SELECT FROM_UNIXTIME(start_time/1000,'%Y-%m-%d') as days ,count(distinct user_id) as cookie_sum,
		count(distinct visit.ip) as ip_sum,FROM_UNIXTIME(start_time/1000,'%Y-%m-%d') as dates 
		FROM visit WHERE visit.start_time >= ${start}  AND visit.start_time < ${end} GROUP BY days)  tbl1 
        LEFT JOIN 
        (SELECT FROM_UNIXTIME(ad_visit_time/1000,'%Y-%m-%d') as days , 
         IFNULL(count(*),0) as ad_sum 
        from ad_visit WHERE ad_visit.ad_visit_time >= ${start}  AND ad_visit.ad_visit_time < ${end} 
         GROUP BY days) tbl2 
        ON tbl1.days=tbl2.days 
         LEFT JOIN  
        (SELECT FROM_UNIXTIME(register_time/1000,'%Y-%m-%d') as days ,
        IFNULL(count(*),0) as register_sum 
        FROM users 
         WHERE users.register_time >= ${start} AND users.register_time < ${end} 
         GROUP BY days ) tbl3 
         ON tbl1.days=tbl3.days 
        LEFT JOIN 
         (SELECT FROM_UNIXTIME(login_time/1000,'%Y-%m-%d') as days ,
         IFNULL(count(*),0) as login_sum 
         FROM login 
         WHERE login.login_time >= ${start}  AND login.login_time < ${end}  GROUP BY days ) tbl4 
         ON tbl1.days=tbl4.days 
         LEFT JOIN 
         (SELECT FROM_UNIXTIME(start_time/1000,'%Y-%m-%d') as days ,
         IFNULL(count(distinct user_id),0) as new_sum 
         FROM visit
         WHERE visit.start_time >= ${start} AND visit.start_time < ${end}  GROUP BY days) tbl5 
         ON tbl1.days=tbl5.days 
         ORDER BY dates`
        
        connection.query(query, [], (err, results, fields) => {
            if (err) {
                console.log("Insert Error: " + err);
            } else { 
                
                callback(results);
            }
            connection.release();
        })

    })
}
//整体分析-小时分析
Visit.getWholeByHour = (req,callback)=>{
    pool.getConnection((err, connection) => {
        if(err){
            console.log("Database connect error");
        }
        var data = req.query;
        var start = parseInt(data.start_time);
        var end = parseInt(data.end_time);
        var query = ` select IFNULL(register_sum,0) as register_sum,
        IFNULL(login_sum,0) as login_sum,
        cookie_sum,ip_sum,dates,
        IFNULL(new_sum,0) as new_sum,
        IFNULL(ad_sum,0) as ad_sum,
        IFNULL(new_sum*100/cookie_sum,0) as new_rate 
        from 
              (SELECT FROM_UNIXTIME(start_time/1000,'%Y-%m-%d-%H') as hours ,
              count(distinct user_id) as cookie_sum,count(distinct visit.ip) as ip_sum,
              count(visit.first_visit) as new_sum,
              FROM_UNIXTIME(start_time/1000,'%h') as dates FROM visit 
              WHERE visit.start_time >= ${start} 
               AND visit.start_time < ${end} GROUP BY hours)  tbl1 
               LEFT JOIN 
               (SELECT FROM_UNIXTIME(ad_visit_time/1000,'%Y-%m-%d-%H') as hours , 
               IFNULL(count(*),0) as ad_sum 
               from ad_visit WHERE ad_visit.ad_visit_time >= ${start}  AND ad_visit.ad_visit_time < ${end} 
               GROUP BY hours) tbl2 
               ON tbl1.hours=tbl2.hours 
                LEFT JOIN  
                (SELECT FROM_UNIXTIME(register_time/1000,'%Y-%m-%d-%H') as hours ,
                IFNULL(count(*),0) as register_sum 
                FROM users 
                WHERE users.register_time >= ${start} AND users.register_time < ${end} 
                GROUP BY hours ) tbl3 
                ON tbl1.hours=tbl3.hours 
                LEFT JOIN 
                (SELECT FROM_UNIXTIME(login_time/1000,'%Y-%m-%d-%H') as hours ,
               IFNULL(count(*),0) as login_sum 
                FROM login
                WHERE login.login_time >= ${start}  AND login.login_time < ${end}  GROUP BY hours ) tbl4 
                ON tbl1.hours=tbl4.hours
                ORDER BY dates ASC`
        connection.query(query, [], (err, results, fields) => {
            if (err) {
                console.log("Insert Error: " + err);
            } else {
                callback(results);
            }
            connection.release();
        })

    })
}  
//访客终端分析
Visit.getDevice = (data,callback)=>{
    pool.getConnection((err, connection) => {
        if(err){
            console.log("Database connect error");
        }
        var query = "SELECT user_agent from visit";
        
        connection.query(query, [], (err, results, fields) => {
            var user_agent = "";
            var res = [];
            for(var i=0;i<results.length;i++){
                user_agent = new Browser(results[i].user_agent);
                res.push(user_agent);
            }
            if (err) {
                console.log("Insert Error: " + err);
            } else { 
                callback(res);
            }
            connection.release();
        })
    })
}
//来源分析
Visit.getChannel = (data,callback)=>{
    pool.getConnection((err, connection) => {
        if(err){
            console.log("Database connect error");
        }
        var query = "SELECT channel from visit";
        connection.query(query, [], (err, results, fields) => {
            if (err) {
                console.log("Insert Error: " + err);
            } else { 
                callback(results);
            }
            connection.release();
        })
    })
}
//访客分析
Visit.visitor = (req,callback)=>{
    pool.getConnection((err, connection) => {
        if(err){ 
            console.log("Database connect error");
        }
        var data = req.query;
        var start = parseInt(data.start_time);
        var end = parseInt(data.end_time);
        //var query = "SELECT count(*) as visit_sum,user_id,ip,user_agent,channel,FROM_UNIXTIME(start_time/1000,'%Y-%m-%d %H:%i:%s') as dates from visit,ad_visit where  visit.visit_id =ad_visit.visit_id AND start_time>=? AND start_time<? GROUP BY visit.user_id ORDER BY visit_sum DESC";
        var query = `select * from
            (SELECT count(*) as visit_sum,user_id,ip,user_agent,channel,
            FROM_UNIXTIME(start_time/1000,'%Y-%m-%d %H:%i:%s') as dates 
            from visit,ad_visit 
            where 
            visit.start_time>=${start}  
            AND visit.start_time< ${end} 
			GROUP BY visit.user_id) as a
            LEFT JOIN
            (SELECT count(*) as ad_sum,user_id as user_id2,ip as ip2,user_agent as user_agent2,channel as channel2,
            FROM_UNIXTIME(start_time/1000,'%Y-%m-%d %H:%i:%s') as dates2 
            from visit,ad_visit 
            where  visit.visit_id =ad_visit.visit_id 
            AND visit.start_time>=${start}  
            AND visit.start_time< ${end} GROUP BY visit.user_id)  b
            ON a.user_id = b.user_id2
            `
        connection.query(query, [], (err, results, fields) => {
            console.log(results);
            var user_agent = "",ip="";
            for(var i=0;i<results.length;i++){
                if(!results[i].dates){
                    results[i].dates = results[i].dates2;
                }
                if(!results[i].user_id){
                    results[i].user_id = results[i].user_id2;
                }
                if(!results[i].ad_sum){
                    results[i].ad_sum = 0;
                }
                if(results[i].user_agent){
                    user_agent = new Browser(results[i].user_agent);
                }else{
                    user_agent = new Browser(results[i].user_agent2);
                }
                results[i] = Object.assign(results[i],user_agent);
                
                ((index)=>{
                    ip = getIpInfo('120.85.99.188',(err,msg)=>{
                        if(msg){
                            results[index] = Object.assign(results[index],{
                                city: msg.province + '，'+msg.city
                            });
                            console.log(results[index]);
                        }
                    })
                })(i)
            }
            if (err) {
                console.log("Insert Error: " + err);
            } else { 
                setTimeout(()=>{
                    console.log(results);
                    callback(results);
                },500)
                
            }
            connection.release();
        })
    })
}
//留存度
 
Visit.remain = (data,callback)=>{
    pool.getConnection((err, connection) => {
        if(err){
            console.log("Database connect error");
        }
        var query = "SELECT count(distinct ad_visit.visit_ad_id) as ad_sum,count(distinct visit.user_id) as user_sum,count(distinct users.user_id) as register_sum FROM ad_visit,visit,users";
        connection.query(query, [], (err, results, fields) => {
            if (err) {
                console.log("Insert Error: " + err);
            } else { 
                callback(results[0]);
            }
            connection.release();
        })
    })
}

module.exports = Visit;