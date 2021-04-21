import uploadServices from './upload.services';
import { error, success } from '../../common/utils/response';

const uploadImage = async (req, res) => {
  try {
    console.log('uploadImage');
    if (req.file) {
      const imgEncoded =
        'data:image/png;base64,' + req.file.buffer.toString('base64');

      const uploadedReponse = await uploadServices.uploadImage(imgEncoded);
      return res.send({
        uploaded: true,
        url: uploadedReponse.url
      });
    }
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};

export default {
  uploadImage
};
