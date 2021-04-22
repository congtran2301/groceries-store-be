import Measure from './measure.model';

const getMeasures = async () => await Measure.find();

const createMeasure = async (data) => {
  const newMeasure = new Measure(data);
  await newMeasure.save();
  return;
};

export default {
  createMeasure,
  getMeasures
};
