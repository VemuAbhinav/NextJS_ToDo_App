import mongoose from "mongoose"

export const ConnectDB = async () => {
    
    
    await mongoose.connect('mongodb+srv://abhinavvemu14:Abhimongo002@cluster0.dvz0i4j.mongodb.net/todo-app');
    console.log("DB connected");
}