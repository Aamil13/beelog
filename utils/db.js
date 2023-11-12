import mongoose from "mongoose";

const connectMongoDB = async () => {
  const connection = {};
  try {
    if (connection.isConnected) {
      return;
  }
  if (mongoose.connections.length > 0) {
      connection.isConnected = mongoose.connections[0].readyState;
      if (connection.isConnected === 1) {
          return;
      }
      await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGO_URL);
  connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;