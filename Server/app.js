const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');

const user = require('./routes/user')(express);
const apple = require('./routes/appleapi')(express);
const react = require('./routes/react')(express);
dotenv.config();
app.use(cors());

//Setting up the server
let PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});

//Testing api to see the server is up and running (try localhost:5001 in the browser)
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.use('/userRoute', user);
app.use('/appleRoute', apple);
app.use('/reactRoute', react);




