import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { statisticsTeam } from './statistics-team.entity';
import { Repository } from 'typeorm';
import {
  createStatisticsTeamDTO,
  getStatisticsTeamDTO,
  updateStatisticsTeamDTO,
} from './dto/statistics-team.dto';

@Injectable()
export class StatisticsTeamService {
  constructor(
    @InjectRepository(statisticsTeam)
    private statisticsTeamRepository: Repository<statisticsTeam>,
  ) {}

  async findAll(): Promise<getStatisticsTeamDTO[]> {
    const statisticsTeam = await this.statisticsTeamRepository.find();
    const statisticsTeamDTO = statisticsTeam.map((statistic) => {
      const { team, ...rest } = statistic;
      return {
        ...rest,
        team: {
          id: team.id,
          name: team.name,
        },
      };
    });
    return statisticsTeamDTO;
  }

  async findOne(id: string): Promise<getStatisticsTeamDTO> {
    const statistic = await this.statisticsTeamRepository.findOneBy({ id });
    const { team, ...rest } = statistic;
    return {
      ...rest,
      team: {
        id: team.id,
        name: team.name,
      },
    };
  }

  async create(
    stats: createStatisticsTeamDTO,
  ): Promise<createStatisticsTeamDTO> {
    const statistic = await this.statisticsTeamRepository.create(stats);
    return this.statisticsTeamRepository.save(statistic);
  }

  async update(
    id: string,
    stats: updateStatisticsTeamDTO,
  ): Promise<getStatisticsTeamDTO> {
    const existingStatistic = await this.statisticsTeamRepository.findOneBy({
      id,
    });
    const updatedStatistic = await this.statisticsTeamRepository.merge(
      existingStatistic,
      {
        pj: existingStatistic.pj + (stats.pj || 0),
        pg: existingStatistic.pg + (stats.pg || 0),
        pp: existingStatistic.pp + (stats.pp || 0),
        setsGanados: existingStatistic.setsGanados + (stats.setsGanados || 0),
        setsPerdidos:
          existingStatistic.setsPerdidos + (stats.setsPerdidos || 0),
        puntos: existingStatistic.puntos + (stats.puntos || 0),
      },
    );
    return await this.statisticsTeamRepository.save(updatedStatistic);
  }

  async delete(id: string): Promise<void> {
    await this.statisticsTeamRepository.delete(id);
  }
}
