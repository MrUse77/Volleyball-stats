import { Injectable, NotFoundException } from '@nestjs/common';
import { Match } from './match.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createMatchDTO,
  getMatchDTO,
  getMatchesDTO,
  updateMatchDTO,
} from './dto/match.dto';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match) private matchRepository: Repository<Match>,
  ) {}
  async createMatch(match: createMatchDTO): Promise<createMatchDTO> {
    const newMatch = this.matchRepository.create(match);
    const m = await this.matchRepository.save(newMatch);
    return m;
  }

  async updateMatch(
    id: string,
    match: updateMatchDTO,
  ): Promise<updateMatchDTO> {
    const matchToUpdate = await this.matchRepository.findOne({
      where: { id },
      relations: ['winner'],
    });
    if (!matchToUpdate) {
      throw new NotFoundException('Match not found');
    }
    matchToUpdate.scoreA = match.scoreA;
    matchToUpdate.scoreB = match.scoreB;
    matchToUpdate.setA = match.setA;
    matchToUpdate.setB = match.setB;
    matchToUpdate.state = match.state ? match.state : matchToUpdate.state;
    if (match.winner?.id) {
      if (matchToUpdate.winner) {
        matchToUpdate.winner.id = match.winner.id;
      } else {
        matchToUpdate.winner = { id: match.winner.id } as any; // Ajusta según tu entidad
      }
    }
    const m = await this.matchRepository.save(matchToUpdate);
    return m;
  }

  async deleteMatch(id: string): Promise<void> {
    return;
  }

  async getMatch(id: string): Promise<getMatchDTO> {
    const match = await this.matchRepository.findOne({
      where: { id },
      relations: [
        'teamA',
        'teamB',
        'winner',
        'statisticsPlayer',
        'statisticsPlayer.player',
        'statisticsPlayer.player.team',
        'tournament',
      ],
    });

    if (!match) {
      throw new NotFoundException('Match not found');
    }

    const teamAStatistics = match.statisticsPlayer.filter(
      (statistic) => statistic.player?.team?.id === match.teamA.id,
    );

    const teamBStatistics = match.statisticsPlayer.filter(
      (statistic) => statistic.player?.team?.id === match.teamB.id,
    );

    console.log(match);
    return {
      id: match.id,
      startTime: match.startTime,
      teamA: {
        id: match.teamA.id,
        name: match.teamA.name,
        statistics: teamAStatistics.map((statistic) => {
          return {
            id: statistic.id,
            points: statistic.points,
            aces: statistic.aces,
            blocks: statistic.blocks,
            attacks: statistic.attacks,
            enf: statistic.enf,
            ce: statistic.ce,
            player: {
              id: statistic.player.id,
              name: statistic.player.name,
              age: statistic.player.age,
              position: statistic.player.position,
            },
          };
        }),
      },
      teamB: {
        id: match.teamB.id,
        name: match.teamB.name,
        statistics: teamBStatistics.map((statistic) => {
          return {
            id: statistic.id,
            points: statistic.points,
            aces: statistic.aces,
            blocks: statistic.blocks,
            attacks: statistic.attacks,
            enf: statistic.enf,
            ce: statistic.ce,
            player: {
              id: statistic.player.id,
              name: statistic.player.name,
              age: statistic.player.age,
              position: statistic.player.position,
            },
          };
        }),
      },
      scoreA: match.scoreA,
      scoreB: match.scoreB,
      setA: match.setA,
      setB: match.setB,
      state: match.state,
      winner: match.winner?.name,
      arbitrator: match.arbitrator,
      tournament: match.tournament?.name,
    };
  }

  async getMatches(): Promise<getMatchesDTO[]> {
    const matches = await this.matchRepository.find({
      relations: ['teamA', 'teamB', 'winner'],
    });
    if (!matches) {
      throw new NotFoundException('No se encontraron partidos');
    }
    const matchesDTO = matches.map((match) => {
      return {
        id: match.id,
        scoreA: match.scoreA,
        scoreB: match.scoreB,
        setA: match.setA,
        setB: match.setB,
        nameTeamA: match.teamA.name,
        nameTeamB: match.teamB.name,
        winner: match.winner?.name,
        state: match.state,
        startTime: match.startTime,
      };
    });
    return matchesDTO;
  }
}
