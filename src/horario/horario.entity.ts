import { Usuario } from 'src/usuario/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Horario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dia: string; // Ex: "Segunda-feira", "Terça-feira", etc.

  @Column({ type: 'time' })
  hora: string;

  @ManyToOne(() => Usuario, usuario => usuario.produtos)
  usuario: Usuario
}
