import { IsUUID } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from '../team/team.entity';

import { Tournament } from '../tournament/tournament.entity';
import { Groups } from '../groups/groups.entity';

@Entity()
export class statisticsTeam {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column({ type: 'int', default: 0 })
  pj: number;

  @Column({ type: 'int', default: 0 })
  pg: number;

  @Column({ type: 'int', default: 0 })
  pp: number;

  @Column({ type: 'int', default: 0 })
  setsGanados: number;

  @Column({ type: 'int', default: 0 })
  setsPerdidos: number;

  @Column({ type: 'int', default: 0 })
  puntos: number;

  @Column()
  participationType: string; // Ejemplo: 'Group Stage', 'Knockout'

  @ManyToOne(() => Team, (team) => team.statisticsTeam)
  team: Team;

  @ManyToOne(() => Groups, (groups) => groups.statisticsTeam)
  groups: Groups;
}
