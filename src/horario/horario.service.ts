import { Injectable, Inject } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/usuario.entity';
import { Horario } from './horario.entity';
import { HorarioCadastrarDto } from './dto/horario.controlar.dto';

@Injectable()
export class HorarioService {
  constructor(
    @Inject('HORARIO_REPOSITORY')
    private horarioRepository: Repository<Horario>,
  ) {}

  // Função para cadastrar múltiplos horários (sem hora de fim)
  async cadastrar(data: HorarioCadastrarDto, usuario: Usuario): Promise<ResultadoDto> {
    try {
      // Verificando se 'data.horarios' é uma string e não está vazia
      if (typeof data.horarios !== 'string' || data.horarios.trim() === '') {
        throw new Error("O campo 'horarios' deve ser uma string não vazia.");
      }
  
      // Dividindo a string de horários em um array
      const horariosArray = data.horarios.split(',').map(hora => hora.trim());
  
      if (horariosArray.length === 0) {
        throw new Error("O campo 'horarios' não pode ser vazio.");
      }
  
      const horarios: Horario[] = horariosArray.map(hora => {
        const horario = new Horario();
        horario.dia = data.dia;
        horario.hora = hora; // Atribuindo cada hora no array de horários
        horario.usuario = usuario;
        return horario;
      });
  
      // Salvar múltiplos horários no banco de dados
      await this.horarioRepository.save(horarios);
  
      return <ResultadoDto>{
        status: true,
        mensagem: "Horários cadastrados com sucesso!",
      };
    } catch (error) {
      console.error('Erro ao cadastrar horários:', error);
      return <ResultadoDto>{
        status: false,
        mensagem: "Houve um erro ao cadastrar os horários. Tente novamente mais tarde.",
      };
    }
  }  
  
}
