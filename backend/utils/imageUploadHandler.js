export const imageUploadHandler = (req, res) => {
	res.json({
		success: true,
		image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
	})
}