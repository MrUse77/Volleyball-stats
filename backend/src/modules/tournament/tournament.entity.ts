import { IsString, IsUUID } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { statisticsTeam } from '../statistics-team/statistics-team.entity';
import { Match } from '../match/match.entity';
import { Team } from '../team/team.entity';
import { Groups } from '../groups/groups.entity';

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({
    type: 'date',
  })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'varchar', length: 100 })
  location: string;

  @Column({ type: 'varchar', length: 100 })
  status: string;

  @Column({ type: 'varchar', length: 100 })
  type: string;

  @OneToMany(() => Groups, (groups) => groups.tournament, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  groups: Groups[];

  @OneToMany(() => Match, (match) => match.tournament, {
    cascade: true,
  })
  matches: Match[];
}
