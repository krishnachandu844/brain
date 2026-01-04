import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error While Connection to DB");
    console.error(error);
  }
};
