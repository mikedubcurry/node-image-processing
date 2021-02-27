const express = require("express");
const bodyParser = require("body-parser");


const router = require("./router");
const middleware = require("./middlewares");

const app = express();

middleware(app);

router(app);

app.listen(3000, () => {
	console.log("server listening on port 3000.");
});
