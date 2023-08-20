const https = require('node:https');

module.exports = function (express) {
    var router = express.Router();

    router.get('/react/google' , async (req, res) => {
        const searchTerm = req.query.q;
        const url = `https://www.google.com/search?q=${searchTerm}`;

        try {
            const response = await fetch(url);
            const data = await response.text();
            res.send(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).send('Error fetching data');
        }
    });

    router.get('/react/test', async (req, res) => {
        const data = {
            message: 'This is a sample API response.',
            timestamp: new Date().toISOString(),
          };
          res.send(data);
    })

    return router;
}