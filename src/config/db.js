import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const dbUser = process.env.DB_USER;
    const dbPassword = process.env.DB_PASS;
    await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.5krsdjm.mongodb.net/mydatabase`);
    console.log('Conectou ao banco!');
  } catch (error) {
    console.error('Erro ao conectar ao banco:', error);
    process.exit(1);
  }
};

export default connectDB;
