import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Repository } from 'typeorm';

import {
  addPlayerToTeamDTO,
  createTeamDTO,
  getAllTeamsDTO,
  getTeamDTO,
  updateTeamDTO,
} from './dto/team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
  ) {}

  async createTeam(team: Team): Promise<createTeamDTO> {
    try {
      const newTeam = this.teamRepository.create(team);
      return await this.teamRepository.save(newTeam);
    } catch (e) {
      console.log(e);
    }
  }

  async getAllTeams(): Promise<getAllTeamsDTO[]> {
    try {
      const teams = await this.teamRepository.find();
      const teamsDTO = teams.map((team) => {
        return {
          id: team.id,
          name: team.name,
          entrenador: team.entrenador,
        };
      });
      return teamsDTO;
    } catch (error) {
      console.log(error);
    }
  }

  async getTeam(id: string): Promise<getTeamDTO> {
    try {
      const team = await this.teamRepository.findOne({
        where: { id },
        relations: [
          'players',
          'players.statisticsPlayer',
          'matches',
          'statisticsTeam',
          'groups',
          'groups.tournament',
        ],
        relationLoadStrategy: 'join',
      });

      console.log(team);
      console.log(team.groups);
      const teamDTO: getTeamDTO = {
        id: team.id,
        name: team.name,
        entrenador: team.entrenador,
        players: team.players.map((p) => {
          return {
            id: p.id,
            name: p.name,
            position: p.position,
            statisticsPlayer: p.statisticsPlayer.reduce(
              (acc, s) => {
                team.groups.forEach((g) => {
                  acc.points += s.points;
                  acc.aces += s.aces;
                  acc.blocks += s.blocks;
                  acc.attacks += s.attacks;
                  acc.enf += s.enf;
                  acc.ce += s.ce;
                });
                return acc;
              },
              {
                points: 0 as number,
                aces: 0 as number,
                blocks: 0 as number,
                attacks: 0 as number,
                enf: 0 as number,
                ce: 0 as number,
              },
            ),
          };
        }),
        matches: team.matches || [],
        statisticsTeam: team.statisticsTeam || [],
      };
      return teamDTO;
    } catch (e) {
      console.log(e);
    }
  }

  async updateTeam(id: string, t: updateTeamDTO): Promise<updateTeamDTO> {
    try {
      await this.teamRepository.update(id, t);
      const team: Team = await this.teamRepository.findOneBy({ id });
      return team;
    } catch (e) {
      console.log(e);
    }
  }

  async addPlayerToTeam(
    idTeam: string,
    add: addPlayerToTeamDTO,
  ): Promise<Team> {
    try {
      const team: Team = await this.teamRepository.findOne({
        where: { id: idTeam },
        relations: ['players'],
      });
      const playersToAdd = Array.isArray(add.players)
        ? add.players
        : [add.players];

      team.players = [...team.players, ...playersToAdd];
      await this.teamRepository.save(team);
      return team;
    } catch (e) {
      console.log(e);
    }
  }
}
