const db = require("../config/db");
const orm = require("orm");
//拼接 连接mysql的 uri
const uri = "mysql://" + db.user + ":" + db.password + "@" + db.host + "/" + db.database;
//连接数据库
const conn = orm.connect(uri, function (err, db) {
    if (err) {
        return console.error('Connection error: ' + err);
    }

});

module.exports = conn;
