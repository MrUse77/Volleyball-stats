import { Module } from '@nestjs/common';

import { UserModule } from './modules/user/user.module';
import { TournamentModule } from './modules/tournament/tournament.module';
import { MatchModule } from './modules/match/match.module';
import { StatisticsModule } from './modules/statistics-player/statistics-player.module';
import { TeamModule } from './modules/team/teams.module';
import { PlayerModule } from './modules/player/player.module';
import { typeOrmConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsTeamModule } from './modules/statistics-team/statistics-team.module';
import { Match } from './modules/match/match.entity';
import { statisticsTeam } from './modules/statistics-team/statistics-team.entity';
import { Team } from './modules/team/team.entity';
import { Tournament } from './modules/tournament/tournament.entity';
import { GroupsModule } from './modules/groups/groups.module';

@Module({
  imports: [
    UserModule,
    TournamentModule,
    MatchModule,
    StatisticsModule,
    TeamModule,
    PlayerModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Tournament, Match, Team, statisticsTeam]),
    StatisticsTeamModule,
    GroupsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
