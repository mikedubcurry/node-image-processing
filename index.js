const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const Filter = require("node-image-filter");
const stream = require("stream");
const fs = require("fs");

fs.mkdir(path.join(__dirname, "/temp"), (err) => {
	if (err) console.log(err);
});

const app = express();

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
	console.log(id);
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

app.get("/blur/images/:id", (req, res) => {
	sendImage(res);
});

app.get("/images/:id", (req, res) => {
	sendImage(res);
});

app.get("/image/", (req, res) => {
	sendImage(res);
});

app.listen(3000, () => {
	console.log("server listening on port 3000.");
});

function invertImage(imagePath, next) {
	Filter.render(imagePath, Filter.preset.invert, (result) => {
		result.data.pipe(
			fs.createWriteStream("./temp/img.jpg").on("close", () => {
				next();
			})
		);
	});
}

function blurImage(imagePath, next) {
	Filter.render(
		imagePath,
		Filter.preset.blur,
		{ value: 100 },
		(result) => {
			result.data.pipe(
				fs.createWriteStream("./temp/img.jpg").on("close", () => {
					next();
				})
			);
		}
	);
}

function sendImage(res) {
	const r = fs.createReadStream(
		path.join(__dirname, "/temp/img.jpg")
	);
	const ps = new stream.PassThrough();
	stream.pipeline(r, ps, (err) => {
		if (err) {
			console.log("uh-oh", err);
			return res.sendStatus(500);
		}
	});
	return ps.pipe(res);
}
