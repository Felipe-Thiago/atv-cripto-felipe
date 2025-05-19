import mongoose from "mongoose";
import dotenv from 'dotenv';

const { MONGODB_URI, MONGODB_DB} = process.env;

if(!MONGODB_URI){
    throw new Error("Defina a variável de ambiente MONGODB_URI no arquivo .env");
}

if(!MONGODB_DB){
    throw new Error("Defina a variável de ambiente MONGODB_DB no arquivo .env");
}

export const connectDB = async () => {
    try{
        const uri = `${MONGODB_URI.replace(/\/$/, '')}/${MONGODB_DB}`;
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB: ", error);
        process.exit(1);
    }
}
