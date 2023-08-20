const jwt = require('jsonwebtoken');
const https = require('node:https');

let now = Math.floor(new Date().getTime() / 1000);
let nowPlus20 = now + 1199;


module.exports = function (express) {
    var router = express.Router();

    //Generate awt token for accesing the apple token data
    router.post("/generateToken", (req, res) => {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let payload = {
            iss: "RV5B8446DF",
            exp: 15777000,
            aud: "https://appleid.apple.com",
            sub: "au.com.ontherun"
        }
        let headerOptions = {
            header: {
                kid: "BJ93RU89G7",
                alg: "ES256",
            }
        }
        const token = jwt.sign(payload, jwtSecretKey, headerOptions);
        res.send(token);
    })

    //Generate awt token for accesing the app sales data
    router.post("/generateAppleSalesReport", (req, res) => {
        let jwtSecretKey = process.env.JWT_SECRET_KEY_ADMIN;
        var appleSalesReports = null;
        let payload = {
            "iss": "23dc90f1-bbcb-44c4-9809-aa342f133f9f",
            "exp": nowPlus20,
            "iat": now,
            "aud": "appstoreconnect-v1"
        }
        let headerOptions = {
            "algorithm": "ES256",
            header: {
                "kid": process.env.APP_ADMIN_KID,
                "alg": "ES256",
                "typ": "JWT"
            }
        }
        const token = jwt.sign(payload, jwtSecretKey, headerOptions);
        var options = {
            host: 'api.appstoreconnect.apple.com',
            //path: '/v1/salesReports?filter[frequency]=YEARLY&filter[reportDate]=2023&filter[reportSubType]=SUMMARY&filter[reportType]=SALES&filter[vendorNumber]=92422232',
            path: '/v1/apps/1021882870/perfPowerMetrics?filter[deviceType]=all_iphones&filter[metricType]=LAUNCH&filter[platform]=IOS',
            //path: '/v1/apps?filter[platform]=IOS',
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Authorization': 'Bearer ' + token
            }
        }

        var req = https.request(options, function (response) {
            appleSalesReports = '';
            response.setEncoding('utf8');
            response.on('data', (d) => {
                appleSalesReports += d;
                res.send(appleSalesReports);
            })
        })

        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        })

        req.end();
    })

    return router;
}