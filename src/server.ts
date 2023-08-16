import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const initServer = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://devmate:elice1234@devmate.eknxqd6.mongodb.net/?retryWrites=true&w=majority',
    );
    console.log('DB 연결');

    app.listen(3000, () => {
      console.log('서버 실행, 포트 : 3000');
    });
  } catch (err) {
    console.error('Mongoose error:', err);
    process.exit(1);
  }
};

initServer();