import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from './player.entity';
import { Response } from 'express';
import { createPlayerDTO, updatePlayerDTO } from './dto/player.dto';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Post('create')
  async createPlayer(
    @Body() player: createPlayerDTO,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const newPlayer = await this.playerService.createPlayer(player);
      return res.status(201).send(newPlayer);
    } catch (e) {
      return res.status(400).send(e.message);
    }
  }

  @Get()
  async getAllPlayers(@Res() res: Response): Promise<Response> {
    try {
      const players = await this.playerService.getAllPlayers();
      return res.status(200).send(players);
    } catch (e) {
      console.log(e);
      return res
        .status(e.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .send(e.message);
    }
  }

  @Get(':id')
  async getPlayer(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    try {
      const player = await this.playerService.getPlayer(id);
      return res.status(200).send(player);
    } catch (e) {
      return res.status(400).send(e.message);
    }
  }

  @Put('updatePlayer/:id')
  async updatePlayer(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() player: updatePlayerDTO,
  ): Promise<Response> {
    try {
      const updatedPlayer = await this.playerService.updatePlayer(id, player);
      return res.status(200).send(updatedPlayer);
    } catch (e) {
      return res.status(400).send(e.message);
    }
  }

  @Post('addPlayerToTeam/:playerId/:teamId')
  async addPlayerToTeam(
    @Res() res: Response,
    @Param('playerId') playerId: string,
    @Param('teamId') teamId: string,
  ): Promise<Response> {
    try {
      const player = await this.playerService.addPlayerToTeam(playerId, teamId);
      return res.status(200).send(player);
    } catch (e) {
      return res.status(400).send(e.message);
    }
  }
}
