import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';
import { Player } from '../player/player.entity';
import { Match } from '../match/match.entity';

@Entity()
export class statisticsPlayer {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column({ type: 'int', default: 0 })
  @IsNumber({}, { message: 'El puntaje debe ser un número' })
  points: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber({}, { message: 'El puntaje debe ser un número' })
  aces: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber({}, { message: 'El puntaje debe ser un número' })
  blocks: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber({}, { message: 'El puntaje debe ser un número' })
  attacks: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber({}, { message: 'El puntaje debe ser un número' })
  enf: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber({}, { message: 'El puntaje debe ser un número' })
  ce: number; //coeficiente de efectividad

  @ManyToOne(() => Player, (player) => player.statisticsPlayer, {
    nullable: false,
  })
  player: Player;
  @ManyToOne(() => Match, (match) => match.statisticsPlayer)
  match: Match;
}
