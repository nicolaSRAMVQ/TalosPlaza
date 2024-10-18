import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  nombre_usuario: { type: String, required: true },
  id_usuario: String,
  avatar: String,
  email: String,
  billetera_crypto: String,
  pais: String,
  estado: Boolean,
  id_casa: Number,
  fecha_registro: {
    type: Date,
    default: Date.now,
  },
});
