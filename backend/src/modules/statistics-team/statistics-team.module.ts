import { Module } from '@nestjs/common';
import { StatisticsTeamController } from './statistics-team.controller';
import { StatisticsTeamService } from './statistics-team.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { statisticsTeam } from './statistics-team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([statisticsTeam])],
  controllers: [StatisticsTeamController],
  providers: [StatisticsTeamService],
})
export class StatisticsTeamModule {}
