import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tournament } from '../tournament/tournament.entity';
import { Team } from '../team/team.entity';
import { statisticsTeam } from '../statistics-team/statistics-team.entity';

@Entity()
export class Groups {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  group: string;

  @ManyToOne(() => Tournament, (tournament) => tournament.groups)
  tournament: Tournament;

  @OneToMany(() => statisticsTeam, (statisticsTeam) => statisticsTeam.groups)
  statisticsTeam: statisticsTeam[];

  @ManyToMany(() => Team, (team) => team.groups)
  @JoinColumn()
  teams: Team[];
}
