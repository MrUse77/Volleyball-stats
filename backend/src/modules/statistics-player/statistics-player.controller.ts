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
import { StatisticsPlayerService } from './statistics-player.service';
import { Response } from 'express';
import {
  createStatisticsPlayerDTO,
  updatedStatisticsPlayerDTO,
} from './dto/statistics-player.dto';

@Controller('statisticsPlayer')
export class StatisticsPlayerController {
  constructor(private statisticsService: StatisticsPlayerService) {}

  @Post('create')
  async createStatisticsPlayer(
    @Body() statisticsPlayer: createStatisticsPlayerDTO[],
    @Res() res: Response,
  ): Promise<Response> {
    const newStatisticsPlayer =
      await this.statisticsService.createStatisticsPlayer(statisticsPlayer);
    return res.status(201).send(newStatisticsPlayer);
  }

  @Get()
  async getAllStatisticsPlayers(@Res() res: Response): Promise<Response> {
    const statisticsPlayers =
      await this.statisticsService.getAllStatisticsPlayers();
    return res.status(200).send(statisticsPlayers);
  }

  @Get(':id')
  async getStatisticsPlayer(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    const statisticsPlayer =
      await this.statisticsService.getStatisticsPlayer(id);
    return res.status(200).send(statisticsPlayer);
  }

  @Put('updateStatisticsPlayer/:id')
  async updateStatisticsPlayer(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() statisticsPlayer: updatedStatisticsPlayerDTO,
  ): Promise<Response> {
    const updatedStatisticsPlayer =
      await this.statisticsService.updateStatisticsPlayer(id, statisticsPlayer);
    return res.status(200).send(updatedStatisticsPlayer);
  }

  @Delete('deleteStatisticsPlayer/:id')
  async deleteStatisticsPlayer(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    await this.statisticsService.deleteStatisticsPlayer(id);
    return res.status(200).send('statisticsPlayer deleted');
  }

  @Get('/tournament/:idTournament')
  async getStatisticsPlayerByTournament(
    @Res() res: Response,
    @Param('idTournament') idTournament: string,
  ): Promise<Response> {
    const statisticsPlayer =
      await this.statisticsService.getStatisticsPlayerByTournament(
        idTournament,
      );
    return res.status(200).send(statisticsPlayer);
  }
  @Get('/tournament/:idTournament/player/:idPlayer')
  async getStatisticsPlayerByTournamentAndPlayer(
    @Res() res: Response,
    @Param('idTournament') idTournament: string,
    @Param('idPlayer') idPlayer: string,
  ): Promise<Response> {
    try {
      const statisticsPlayer =
        await this.statisticsService.getStatisticsPlayerByTournamentAndPlayer(
          idTournament,
          idPlayer,
        );
      return res.status(200).send(statisticsPlayer);
    } catch (e) {
      return res
        .status(404)
        .json('No se encontraron estadisticas para el torneo');
    }
  }
  @Get('/match/:idMatch')
  async getStatisticsPlayerByMatch(
    @Res() res: Response,
    @Param('idMatch') idMatch: string,
  ): Promise<Response> {
    try {
      const statisticsPlayer =
        await this.statisticsService.getStatisticsPlayerByMatch(idMatch);
      return res.status(200).send(statisticsPlayer);
    } catch (e) {
      return res
        .status(404)
        .json('No se encontraron estadisticas para el partido');
    }
  }
}
