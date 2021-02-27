const {sendImage} = require('./helperFunctions')

module.exports = (app) => {
	app.get("/", (req, res) => {
		res.send(
			`<body>
        <h1>Node Image Processing</h1>
        <p>Visit <a href='/image'>/image</a> for a random image</p>
      </body>`
		);
	});

	app.get("/blur/images/:id", (req, res) => {
		sendImage(res);
	});

	app.get("/images/:id", (req, res) => {
		sendImage(res);
	});

	app.get("/image/", (req, res) => {
		sendImage(res);
	});
};
