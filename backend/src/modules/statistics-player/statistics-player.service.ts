import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { statisticsPlayer } from './statistics-player.entity';
import { Repository } from 'typeorm';
import {
  createStatisticsPlayerDTO,
  getAllStatisticsPlayersDTO,
  getStatisticsPlayerByMatchDTO,
  getStatisticsPlayerByTournamentDTO,
  updatedStatisticsPlayerDTO,
} from './dto/statistics-player.dto';

@Injectable()
export class StatisticsPlayerService {
  constructor(
    @InjectRepository(statisticsPlayer)
    private statisticsPlayerRepository: Repository<statisticsPlayer>,
  ) {}

  async createStatisticsPlayer(
    statisticsPlayer: createStatisticsPlayerDTO[],
  ): Promise<createStatisticsPlayerDTO[]> {
    try {
      const newStatisticsPlayer =
        this.statisticsPlayerRepository.create(statisticsPlayer);
      await this.statisticsPlayerRepository.save(newStatisticsPlayer);
      return newStatisticsPlayer;
    } catch (e) {
      console.log(e);
    }
  }

  async getAllStatisticsPlayers(): Promise<getAllStatisticsPlayersDTO[]> {
    const statisticsPlayers = await this.statisticsPlayerRepository.find({
      relations: ['player', 'match'],
    });
    const statisticsPlayersDTO = statisticsPlayers.map((statisticsPlayer) => {
      console.log(statisticsPlayer.match);
      return {
        id: statisticsPlayer.id,
        points: statisticsPlayer.points,
        aces: statisticsPlayer.aces,
        blocks: statisticsPlayer.blocks,
        attacks: statisticsPlayer.attacks,
        enf: statisticsPlayer.enf,
        ce: statisticsPlayer.ce,
        player: statisticsPlayer.player,
        match: {
          teamA: statisticsPlayer.match.teamA.name,
          teamB: statisticsPlayer.match.teamB.name,
          date: statisticsPlayer.match.startTime,
          setA: statisticsPlayer.match.setA,
          setB: statisticsPlayer.match.setB,
        },
      };
    });
    return statisticsPlayersDTO;
  }

  async getStatisticsPlayer(id: string): Promise<getAllStatisticsPlayersDTO> {
    const statisticsPlayer = await this.statisticsPlayerRepository.findOne({
      where: { id },
      relations: ['player', 'match'],
    });
    return {
      id: statisticsPlayer.id,
      points: statisticsPlayer.points,
      aces: statisticsPlayer.aces,
      blocks: statisticsPlayer.blocks,
      attacks: statisticsPlayer.attacks,
      enf: statisticsPlayer.enf,
      ce: statisticsPlayer.ce,
      player: statisticsPlayer.player,
      match: {
        teamA: statisticsPlayer.match.teamA.name,
        teamB: statisticsPlayer.match.teamB.name,
        date: statisticsPlayer.match.startTime,
        setA: statisticsPlayer.match.setA,
        setB: statisticsPlayer.match.setB,
      },
    };
  }
  async updateStatisticsPlayer(
    id: string,
    statisticsPlayer: updatedStatisticsPlayerDTO,
  ): Promise<updatedStatisticsPlayerDTO> {
    await this.statisticsPlayerRepository.update(id, statisticsPlayer);
    const updatedStatisticsPlayer =
      await this.statisticsPlayerRepository.findOne({ where: { id } });
    return updatedStatisticsPlayer;
  }
  async deleteStatisticsPlayer(id: string): Promise<void> {
    await this.statisticsPlayerRepository.delete(id);
  }

  async getStatisticsPlayerByTournament(
    id: string,
  ): Promise<getStatisticsPlayerByTournamentDTO[]> {
    const statisticsPlayers = await this.statisticsPlayerRepository.find({
      where: { match: { tournament: { id } } },
      relations: ['player', 'match'],
    });
    let arr: getStatisticsPlayerByTournamentDTO[] = [];
    statisticsPlayers.forEach((statisticsPlayer) => {
      if (arr.some((item) => item.player.id === statisticsPlayer.player.id)) {
        const index = arr.findIndex(
          (item) => item.player.id === statisticsPlayer.player.id,
        );
        arr[index].points += statisticsPlayer.points;
        arr[index].aces += statisticsPlayer.aces;
        arr[index].blocks += statisticsPlayer.blocks;
        arr[index].attacks += statisticsPlayer.attacks;
        arr[index].enf += statisticsPlayer.enf;
        arr[index].ce += statisticsPlayer.ce;
      } else {
        arr.push({
          points: statisticsPlayer.points,
          aces: statisticsPlayer.aces,
          blocks: statisticsPlayer.blocks,
          attacks: statisticsPlayer.attacks,
          enf: statisticsPlayer.enf,
          ce: statisticsPlayer.ce,
          player: statisticsPlayer.player,
        });
      }
    });
    return arr;
  }
  async getStatisticsPlayerByTournamentAndPlayer(
    idT: string,
    idP: string,
  ): Promise<getStatisticsPlayerByTournamentDTO> {
    const statisticsPlayers = await this.statisticsPlayerRepository.find({
      where: { match: { tournament: { id: idT } }, player: { id: idP } },
      relations: ['player', 'match'],
    });
    const statisticsPlayer = statisticsPlayers.reduce(
      (acc, curr) => {
        acc.points += curr.points;
        acc.aces += curr.aces;
        acc.blocks += curr.blocks;
        acc.attacks += curr.attacks;
        acc.enf += curr.enf;
        acc.ce += curr.ce;
        return acc;
      },
      {
        points: 0,
        aces: 0,
        blocks: 0,
        attacks: 0,
        enf: 0,
        ce: 0,
        player: statisticsPlayers[0].player,
      },
    );
    return statisticsPlayer;
  }
  async getStatisticsPlayerByMatch(
    id: string,
  ): Promise<getStatisticsPlayerByMatchDTO[]> {
    const statisticsPlayers = await this.statisticsPlayerRepository.find({
      where: { match: { id } },
      relations: ['player', 'match'],
    });
    const statisticsPlayersDTO = statisticsPlayers.map((statisticsPlayer) => {
      return {
        points: statisticsPlayer.points,
        aces: statisticsPlayer.aces,
        blocks: statisticsPlayer.blocks,
        attacks: statisticsPlayer.attacks,
        enf: statisticsPlayer.enf,
        ce: statisticsPlayer.ce,
        player: {
          id: statisticsPlayer.player.id,
          name: statisticsPlayer.player.name,
        },
      };
    });
    return statisticsPlayersDTO;
  }
}
