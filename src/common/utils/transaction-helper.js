import { startSession, Document, ClientSession } from 'mongoose';

export const withSession = async (callback) => {
  const session = await startSession();
  let data;
  try {
    await session.withTransaction(async () => {
      data = await callback(session);
    });
    session.endSession();
  } catch (err) {
    session.endSession();
    throw err;
  }
  return data;
};
