import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  Unique,
  JoinTable,
} from 'typeorm';
import { Match } from '../match/match.entity';
import { Player } from '../player/player.entity';
import { statisticsTeam } from '../statistics-team/statistics-team.entity';
import { Tournament } from '../tournament/tournament.entity';
import { Groups } from '../groups/groups.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Unique('name', ['name'])
  name: string;

  @Column({ type: 'varchar', length: 100 })
  entrenador: string;

  @OneToMany(() => Player, (player) => player.team, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  players: Player[];

  @OneToMany(() => Match, (match) => match.teamA || match.teamB, {
    nullable: true,
  })
  matches: Match[];

  @ManyToMany(() => Groups, (groups) => groups.teams, {})
  @JoinTable()
  groups: Groups[];

  @OneToMany(() => statisticsTeam, (statisticsTeam) => statisticsTeam.team, {
    nullable: true,
    cascade: true,
  })
  statisticsTeam: statisticsTeam[];
}
