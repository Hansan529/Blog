import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('DB 연결에 성공했습니다.');
  } catch (error) {
    console.error('DB 연결에 실패했습니다', error);
  }
};

export default connectMongoDB;
