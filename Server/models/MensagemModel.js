import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    hash: { type: String, required: true },
    passo: { type: Number, required: true },
    used: { type: Boolean, required: true }
});

export default mongoose.model('Mensagem', MessageSchema);