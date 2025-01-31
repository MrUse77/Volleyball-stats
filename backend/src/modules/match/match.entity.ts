import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { ValidateIf } from 'class-validator';
import { Team } from '../team/team.entity';

import { statisticsPlayer } from '../statistics-player/statistics-player.entity';
import { statisticsTeam } from '../statistics-team/statistics-team.entity';
import { Tournament } from '../tournament/tournament.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tournament, (tournament) => tournament.matches, {
    nullable: false,
  })
  tournament: Tournament;

  @ManyToOne(() => Team, { nullable: false })
  teamA: Team;

  @ManyToOne(() => Team, { nullable: false })
  teamB: Team;

  @Column({ type: 'int', array: true, default: '{}' }) // Guardar puntajes como JSON
  scoreA: number[];

  @Column({ type: 'int', array: true, default: '{}' }) // Guardar puntajes como JSON
  scoreB: number[];

  @Column({ type: 'int', default: 0 })
  setA: number;

  @Column({ type: 'int', default: 0 })
  setB: number;

  @ManyToOne(() => Team, { nullable: true })
  winner: Team;

  @Column({ type: 'varchar', length: 100 })
  arbitrator: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'varchar', length: 100, default: 'pending' })
  @ValidateIf(
    (match: Match) =>
      match.state === 'finished' ||
      match.state === 'pending' ||
      match.state === 'canceled' ||
      match.state === 'in progress',
    { message: 'El estado del partido debe ser válido' },
  )
  state: string;

  @OneToMany(
    () => statisticsPlayer,
    (statisticsPlayer) => statisticsPlayer.match,
    { cascade: true, eager: true },
  )
  statisticsPlayer: statisticsPlayer[];
}
