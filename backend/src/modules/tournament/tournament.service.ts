import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './tournament.entity';
import { Repository } from 'typeorm';
import {
  createTournamentDTO,
  getAllTournamentsDTO,
  getTournamentDTO,
  getTournamentGroupsDTO,
  getTournamentMatchesDTO,
  getTournamentTeamsDTO,
  updateTournamentDTO,
} from './dto/tournament.dto';
import { GetGroupsTournamentDTO } from '../groups/dto/groups.dto';
@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}

  async createTournament(
    tournament: createTournamentDTO,
  ): Promise<createTournamentDTO> {
    try {
      let newT = this.tournamentRepository.create(tournament);
      const t = await this.tournamentRepository.save(newT);
      return t;
    } catch (e) {
      console.log(e);
    }
  }

  async getAllTournaments(): Promise<getAllTournamentsDTO[]> {
    try {
      const tournaments = await this.tournamentRepository.find();
      const tournamentsDTO: getAllTournamentsDTO[] = tournaments.map((t) => ({
        id: t.id,
        name: t.name,
        description: t.description,
        type: t.type,
        status: t.status,
        startDate: t.startDate,
        endDate: t.endDate,
      }));
      return tournamentsDTO;
    } catch (error) {
      console.log(error);
    }
  }

  async getTournament(id: string): Promise<getTournamentDTO> {
    try {
      const tournament = await this.tournamentRepository.findOne({
        where: { id },
        relations: ['groups', 'groups.teams'],
      });
      const tournamentDTO: getTournamentDTO = {
        id: tournament.id,
        name: tournament.name,
        description: tournament.description,
        type: tournament.type,
        startDate: tournament.startDate,
        endDate: tournament.endDate,
        location: tournament.location,
        status: tournament.status,
        groups: tournament.groups.map((g) => ({
          id: g.id,
          group: g.group,
          teams: g.teams.map((t) => ({
            id: t.id,
            name: t.name,
          })),
        })),
      };
      return tournamentDTO;
    } catch (e) {
      console.log(e);
    }
  }

  async updateTournament(
    id: string,
    t: updateTournamentDTO,
  ): Promise<updateTournamentDTO> {
    try {
      await this.tournamentRepository.update(id, t);
      const tournament = await this.tournamentRepository.findOneBy({
        id: t.id,
      });
      return tournament;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteTournament(id: string): Promise<void> {
    try {
      await this.tournamentRepository.delete({ id });
    } catch (e) {
      console.log(e);
    }
  }

  async getTournamentMatches(id: string): Promise<getTournamentMatchesDTO> {
    try {
      const t = await this.tournamentRepository.findOne({
        where: { id },
        relations: ['matches', 'matches.teamA', 'matches.teamB'],
      });
      const matchesPerTournament: getTournamentMatchesDTO = {
        id: t.id,
        matches: t.matches.map((m) => ({
          id: m.id,
          teamA: m.teamA.name,
          teamB: m.teamB.name,
          startTime: m.startTime,
          scoreA: m.scoreA,
          scoreB: m.scoreB,
          setA: m.setA,
          setB: m.setB,
          state: m.state,
        })),
      };
      console.dir({ matchesPerTournament }, { depth: null });
      return matchesPerTournament;
    } catch (e) {
      console.log(e);
    }
  }

  async getTournamentTeams(id: string): Promise<getTournamentTeamsDTO> {
    try {
      const tournament = await this.tournamentRepository.findOne({
        where: { id },
        relations: ['groups', 'groups.teams'],
      });
      const teamsPerTournament: getTournamentTeamsDTO = {
        id: tournament.id,
        teams: tournament.groups.flatMap((group) =>
          group.teams.map((team) => ({
            id: team.id,
            name: team.name,
          })),
        ),
      };
      return teamsPerTournament;
    } catch (e) {
      console.log(e);
    }
  }

  async getGroups(idTournament: string): Promise<getTournamentGroupsDTO> {
    try {
      console.log({ idTournament });
      const t: Tournament = await this.tournamentRepository.findOne({
        where: { id: idTournament },
        relations: ['groups', 'groups.teams'],
      });
      console.log({ t });
      const groups: getTournamentGroupsDTO = {
        id: t.id,
        groups: t.groups
          ? t.groups.map((g) => ({
              id: g.id,
              group: g.group,
              teams: g.teams
                ? g.teams.map((t) => ({
                    id: t.id,
                    name: t.name,
                  }))
                : [],
            }))
          : [],
      };

      return groups;
    } catch (e) {
      console.log(e);
    }
  }
}
