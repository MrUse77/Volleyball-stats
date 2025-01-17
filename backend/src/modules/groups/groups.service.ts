import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Groups } from './groups.entity';
import {
  createGroupDTO,
  getGroupDTO,
  GetGroupsTournamentDTO,
} from './dto/groups.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Groups) private groupRepository: Repository<Groups>,
  ) {}

  async createGroup(group: createGroupDTO[]): Promise<createGroupDTO[]> {
    const newGroup = await this.groupRepository.save(group);
    return newGroup;
  }

  async getGroups(idTournament: string): Promise<GetGroupsTournamentDTO[]> {
    const groups = await this.groupRepository.find({
      where: {
        tournament: {
          id: idTournament,
        },
      },
      relations: ['teams'],
    });
    if (!groups) {
      throw new NotFoundException('No groups found');
    }
    const groupsDTO = groups.map((group) => {
      return {
        id: group.id,
        group: group.group,
        teams: group.teams.map((team) => {
          return {
            id: team.id,
            name: team.name,
          };
        }),
      };
    });
    return groupsDTO;
  }

  async updateGroup(
    id: string,
    group: createGroupDTO,
  ): Promise<createGroupDTO> {
    await this.groupRepository.update(id, group);
    return group;
  }

  async deleteGroup(id: string): Promise<void> {
    await this.groupRepository.delete(id);
  }

  async getGroupById(id: string): Promise<getGroupDTO> {
    const group = await this.groupRepository.findOne({
      where: { id },

      relations: [
        'teams',
        'teams.statisticsTeam',
        'teams.statisticsTeam.groups',
      ],
    });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    const groupDTO = {
      id: group.id,
      group: group.group,
      teams: group.teams.map((team) => {
        const statistics = team.statisticsTeam.find(
          (stat) => stat.groups.id === group.id,
        );

        return {
          id: team.id,
          name: team.name,
          statistics: statistics
            ? {
                id: statistics.id,
                pj: statistics.pj,
                pg: statistics.pg,
                pp: statistics.pp,
                setsGanados: statistics.setsGanados,
                setsPerdidos: statistics.setsPerdidos,
                puntos: statistics.puntos,
              }
            : {
                id: null,
                pj: 0,
                pg: 0,
                pp: 0,
                setsGanados: 0,
                setsPerdidos: 0,
                puntos: 0,
              },
        };
      }),
    };
    return groupDTO;
  }
}
