import { Router } from 'express';
import uploadController from './upload.controller';
import multer from 'multer';

const router = Router();
const upload = multer();

router.post('/', upload.single('image'), uploadController.uploadImage);

export default router;
