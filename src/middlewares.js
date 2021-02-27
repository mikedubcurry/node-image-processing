const path = require("path");

const { invertImage, blurImage } = require("./helperFunctions");

module.exports = (app) => {
	app.use("/image/", (req, res, next) => {
		console.log("random id");
		let imagePath = path.join(
			__dirname,
			`./images/img${Math.ceil(Math.random() * 5)}.jpg`
		);
		return invertImage(imagePath, next);
	});

	app.use("/blur/images/:id", (req, res, next) => {
		console.log("blurred");
		const id = req.params.id;
		let imagePath = path.join(__dirname, `./images/img${id}.jpg`);
		return blurImage(imagePath, next);
	});

	app.use("/images/:id", (req, res, next) => {
		console.log("id specific");
		const id = req.params.id;
		console.log(id);
		let imagePath = path.join(__dirname, `./images/img${id}.jpg`);
		return invertImage(imagePath, next);
	});
};
