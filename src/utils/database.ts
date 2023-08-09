import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    mongoose.connection.on('disconnected', () => {
      console.log('DB: 연결되지 않음'); // 0
    });
    mongoose.connection.on('connected', () => {
      console.log('DB: 연결 완료'); // 1
    });
    mongoose.connection.on('connecting', () => {
      console.log('DB: 연결 중'); // 2
    });
    mongoose.connection.on('disconnecting', () => {
      console.log('DB: 연결 끊어짐'); // 3
    });
    await mongoose.connect(process.env.DB_URL);
  } catch (error) {
    console.error('DB 연결에 실패했습니다', error);
  }
};
