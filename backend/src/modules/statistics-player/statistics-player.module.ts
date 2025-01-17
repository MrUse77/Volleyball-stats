import { Module } from '@nestjs/common';
import { StatisticsPlayerController } from './statistics-player.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { statisticsPlayer } from './statistics-player.entity';
import { StatisticsPlayerService } from './statistics-player.service';

@Module({
  imports: [TypeOrmModule.forFeature([statisticsPlayer])],
  providers: [StatisticsPlayerService],
  controllers: [StatisticsPlayerController],
})
export class StatisticsModule {}
