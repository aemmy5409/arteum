import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { dbConnect } from "./db/dbConnect.js";
import authRouter from './routes/authRoutes.js';
import productRouter from './routes/productsRoutes.js';
import cors from 'cors';
import multer from "multer";

import { imageUploadHandler } from './utils/imageUploadHandler.js';

const PORT = process.env.PORT || 8000;

const storage = multer.diskStorage( {
	destination: './upload/images',
	filename: (req, file, cb) => {
		return cb(null, `${file.fieldname}_${Date.now()}.${file.originalname.split('.').pop()}`)
	}
})

const upload = multer({storage:storage});

dotenv.config();
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/images', express.static('./upload/images'));
app.use(cookieParser());
app.use('/api', authRouter);
app.use('/api', productRouter);

app.post('/upload', upload.single('image'), imageUploadHandler);

app.listen(PORT, () => {
	dbConnect()
	console.log(`Server listening on http://localhost:${PORT}`);
});

//0GkR4dWpYyDiFe6u
//arteum