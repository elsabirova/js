const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes.js");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('static'))

routes(app);

const server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});