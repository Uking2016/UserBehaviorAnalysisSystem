var pool = require('./index');

var News = {};

// data: objects' array
News.add = (data, callback) => {
    pool.getConnection((err, connection) => {
        if(err){
            console.log("Database connect error");
        }

        var query = 'INSERT INTO news (title, time, author, url, image, type) VALUES (?, ?, ?, ?, ?, ?)';
        for(var i = 0; i < data.length; i++){
            connection.query(query, [data[i].title, data[i].date, data[i].author_name, data[i].url, data[i].thumbnail_pic_s, data[i].category], (err, results, fields) => {
                if (err) {
                    console.log("Insert Error: " + err);
                }


            })
        }

        // callback(results);
        connection.release();
    })
};

// type: string
News.getOneByTypeOrderByIdAndClick = (index, type, callback) => {
    pool.getConnection((err, connection) => {
        if(err){
            console.log("Database connect error");
        }

        var query = 'SELECT * FROM news WHERE type = ? ORDER BY click_count DESC, id DESC';
        connection.query(query, [type], (err, result, fields) => {
            if (err) {
                console.log("Select Error: " + err);
            }else{
                callback(result[index]);
            }

            connection.release();
        })
    })
};

// 按照时间远近得到最近的
News.getAllByType = (ad_type,callback) => {
    pool.getConnection((err, connection) => {
        if(err){
            console.log("Database connect error");
        }
        var query = 'SELECT * FROM news WHERE type = ? ORDER BY id DESC';
        connection.query(query, [ad_type], (err, results, fields) => {
            if (err) {
                console.log("Select Error: " + err);
                callback([]);
            }
            callback(results);
            connection.release();
        })
    })
};

// id: news id
News.click = (id, callback) => {
    pool.getConnection((err, connection) => {
        if(err){
            console.log("Database connect error");
        }

        var query = 'UPDATE news SET click_count = click_count + 1 WHERE id = ?';
        connection.query(query, [id], (err, result, fields) => {
            if (err) {
                console.log("Update Error: " + err);
            }else{
                if(result.affectedRows == 1){
                    callback(true);
                }else{
                    callback(false);
                }
            }
            connection.release();
        })
    })
}
//统计用户阅读的新闻类型
News.likeType = (callback) => {
    pool.getConnection((err, connection) => {
        if(err){
            console.log("Database connect error");
        }
        var query = 'SELECT max(news.click_count) as value,type as name FROM news GROUP BY type';
        connection.query(query, [], (err, result, fields) => {
            if (err) {
                console.log("Update Error: " + err);
            }else{ 
                callback(result);   
            }
            connection.release();
        })
    })
}

module.exports = News;