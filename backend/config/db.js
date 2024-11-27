import mongoose, { Mongoose } from "mongoose"


export const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://iggi984:Lozinka12345!@cluster0.io5dv.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0");
        console.log(`Mongo DB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connectiong do db: ${error.message}`);
        process.exit(1); // 1 means failed and 0 is success
    }
}
