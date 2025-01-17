import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { Tournament } from './tournament.entity';
import { Response } from 'express';

import { createTournamentDTO } from './dto/tournament.dto';

@Controller('tournament')
export class TournamentController {
  constructor(private tournamentService: TournamentService) {}

  @Post('create')
  async createTournament(
    @Body() tournament: createTournamentDTO,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const newTournament =
        await this.tournamentService.createTournament(tournament);
      return res.status(200).send(newTournament);
    } catch (e) {
      return res.status(400).send('Error creating tournament');
    }
  }

  @Get()
  async getAllTournaments(@Res() res: Response): Promise<Response> {
    try {
      const tournaments = await this.tournamentService.getAllTournaments();
      return res.status(200).send(tournaments);
    } catch (e) {
      return res.status(400).send('Error getting tournaments');
    }
  }

  @Get(':id')
  async getTournament(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const tournament = await this.tournamentService.getTournament(id);
      return res.status(200).send(tournament);
    } catch (e) {
      return res.status(400).send('Error getting tournament');
    }
  }

  @Put('updateTournament/:id')
  async updateTournament(
    @Param('id') id: string,
    @Body() tournament: Tournament,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const tournamentUpdated = await this.tournamentService.updateTournament(
        id,
        tournament,
      );
      return res.status(200).send(tournamentUpdated);
    } catch (e) {
      return res.status(400).send('Error updating tournament');
    }
  }

  @Delete('deleteTournament/:id')
  async deleteTournament(@Param('id') id: string, @Res() res: Response) {
    await this.tournamentService.deleteTournament(id);
    return res.status(200).send('Tournament deleted');
  }

  @Get(':id/matches')
  async getTournamentMatches(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const matches = await this.tournamentService.getTournamentMatches(id);
      return res.status(200).send(matches);
    } catch (e) {
      return res.status(400).send('Error getting matches');
    }
  }

  @Get(':id/teams')
  async getTournamentTeams(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const teams = await this.tournamentService.getTournamentTeams(id);
      return res.status(200).send(teams);
    } catch (e) {
      return res.status(400).send('Error getting teams');
    }
  }

  @Get(':idTournament/groups')
  async getGroups(
    @Param('idTournament') idTournament: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const groups = await this.tournamentService.getGroups(idTournament);
      console.log(groups);
      return res.status(200).send(groups);
    } catch (e) {
      return res.status(400).send('Error getting groups');
    }
  }
}
