const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/myapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database..', err);
    process.exit();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ "user": "Server is running :M" });
})

let PORT = 7045;
require("./routes/app.route")(app);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});