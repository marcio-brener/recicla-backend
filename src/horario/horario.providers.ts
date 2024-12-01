import { Connection, Repository } from 'typeorm';
import { Horario } from './horario.entity';

export const horarioProviders = [
  {
    provide: 'HORARIO_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Horario),
    inject: ['DATABASE_CONNECTION'],
  },
];