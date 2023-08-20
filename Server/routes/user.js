var pool = require('../config/db')

module.exports = function (express) {
    var router = express.Router();

    //get user data from the table
    router.get("/getDataTest", (req, res) => {
        pool.query('SELECT * FROM test', function (err, result, fields) {
            if (err) res.send(err)
            res.send(result);
        })
    })

    //insert user data into the table
    router.post("/putDataTest", (req, res) => {
        pool.query('INSERT INTO test (name, note) VALUES ("soyura", "this is testing")', function (err, result, fields) {
            if (err) res.send(err)
            res.send(result);
        })
    })

    return router;
}