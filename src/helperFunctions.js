const path = require("path");
const stream = require("stream");
const fs = require("fs");
const Filter = require("node-image-filter");

module.exports = {
	invertImage: function (imagePath, next) {
		Filter.render(imagePath, Filter.preset.invert, (result) => {
			result.data.pipe(
				fs
					.createWriteStream(path.join(__dirname, "./temp/img.jpg"))
					.on("close", () => {
						next();
					})
			);
		});
	},

	blurImage: function (imagePath, next) {
		Filter.render(
			imagePath,
			Filter.preset.blur,
			{ value: 100 },
			(result) => {
				result.data.pipe(
					fs
						.createWriteStream(path.join(__dirname, "./temp/img.jpg"))
						.on("close", () => {
							next();
						})
				);
			}
		);
	},

	sendImage: function (res) {
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
	},
};
