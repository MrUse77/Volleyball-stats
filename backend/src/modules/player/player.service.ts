import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { Repository } from 'typeorm';
import {
  createPlayerDTO,
  getAllPlayersDTO,
  getPlayerDTO,
  updatePlayerDTO,
} from './dto/player.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
  ) {}

  async createPlayer(player: createPlayerDTO): Promise<createPlayerDTO> {
    try {
      const newPlayer = this.playerRepository.create(player);
      await this.playerRepository.save(newPlayer);
      return newPlayer;
    } catch (e) {
      console.log(e);
    }
  }

  async getAllPlayers(): Promise<getAllPlayersDTO[]> {
    const players = await this.playerRepository.find({
      relationLoadStrategy: 'join',
      relations: ['team'],
    });
    console.log(players);
    const playersDTO: getAllPlayersDTO[] = players.map((player) => {
      return {
        id: player.id,
        name: player.name,
        age: player.age,
        position: player.position,
        team: {
          id: player.team?.id,
          name: player.team?.name,
          entrenador: player.team?.entrenador,
        },
      };
    });
    return playersDTO;
  }

  async getPlayer(id: string): Promise<getPlayerDTO> {
    const player = await this.playerRepository.findOne({
      where: { id },
      relations: ['team'],
    });
    const { team, ...rest } = player;
    console.log(player);
    return { ...rest, teamName: team.name };
  }

  async updatePlayer(id: string, player: updatePlayerDTO) {
    try {
      await this.playerRepository.update(id, player);
      const updatedPlayer = await this.playerRepository.findOneBy({ id });
      return updatedPlayer;
    } catch (e) {
      console.log(e);
    }
  }

  async addPlayerToTeam(playerId: string, teamId: string) {
    try {
      await this.playerRepository.update(playerId, {
        team: {
          id: teamId,
        },
      });
      const player = await this.playerRepository.findOneBy({ id: playerId });
      await this.playerRepository.save(player);
      return player;
    } catch (e) {
      console.log(e);
    }
  }
}
