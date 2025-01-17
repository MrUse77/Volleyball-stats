import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';
import { Team } from '../team/team.entity';
import { statisticsPlayer } from '../statistics-player/statistics-player.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString({ message: 'El nombre debe ser un texto' })
  name: string;

  @Column({ type: 'int' })
  @IsNumber({}, { message: 'La edad debe ser un número' })
  age: number;

  @Column({ type: 'varchar', length: 100 })
  @ValidateIf(
    (player: Player) =>
      player.position === 'Armador' ||
      player.position === 'Punta' ||
      player.position === 'Central' ||
      player.position === 'Libero' ||
      player.position === 'Opuesto',
    {
      message: 'La posición debe ser Armador, Punta, Central, Libero u Opuesto',
    },
  )
  position: string;

  @ManyToOne(() => Team, { nullable: true })
  team: Team;

  @OneToMany(
    () => statisticsPlayer,
    (statisticsPlayer) => statisticsPlayer.player,
  )
  statisticsPlayer: statisticsPlayer[];
}
