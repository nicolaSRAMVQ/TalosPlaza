import { Document } from 'mongoose';

export interface User extends Document {
  readonly nombre_usuario: string;
  id_usuario: string;
  readonly avatar: string;
  readonly email: string;
  readonly billetera_crypto: string;
  readonly pais: string;
  readonly id_casa: number;
  readonly fecha_registro: Date;
}
