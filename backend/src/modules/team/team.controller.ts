import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { TeamService } from './team.service';
import { Team } from './team.entity';
import { Response } from 'express';
import { Player } from '../player/player.entity';
import {
  addMatchToTeamDTO,
  addPlayerToTeamDTO,
  getAllTeamsDTO,
} from './dto/team.dto';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post('create')
  async createTeam(
    @Body() team: Team,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const newTeam = await this.teamService.createTeam(team);
      return res.status(200).send(newTeam);
    } catch (e) {
      return res.status(400).send('Error creating team');
    }
  }

  @Get()
  async getAllTeams(@Res() res: Response): Promise<Response> {
    try {
      const teams: getAllTeamsDTO[] = await this.teamService.getAllTeams();
      return res.status(200).send(teams);
    } catch (e) {
      return res.status(400).send('Error getting teams');
    }
  }

  @Get(':id')
  async getTeam(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const team = await this.teamService.getTeam(id);
      return res.status(200).send(team);
    } catch (e) {
      return res.status(400).send('Error getting team');
    }
  }

  @Post('addPlayerToTeam/:id')
  async addPlayerToTeam(
    @Param('id') id: string,
    @Body() players: addPlayerToTeamDTO,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const team = await this.teamService.addPlayerToTeam(id, players);
      return res.status(200).send(team);
    } catch (e) {
      return res.status(400).send('Error adding player to team');
    }
  }
}
