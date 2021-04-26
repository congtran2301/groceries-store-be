import CustomError from '../../common/CustomError';
import Measure from './measure.model';

const getMeasures = async () => await Measure.find();

const getMeasure = async (query) => {
  const measure = await Measure.findOne(query);
  if (!measure) throw new CustomError('Measure not found', 400);
  return measure;
};

const createMeasure = async (data) => {
  const newMeasure = new Measure(data);
  await newMeasure.save();
  return;
};

export default {
  createMeasure,
  getMeasures,
  getMeasure
};
