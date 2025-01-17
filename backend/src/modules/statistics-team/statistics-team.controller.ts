import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { StatisticsTeamService } from './statistics-team.service';
import { Response } from 'express';
import {
  createStatisticsTeamDTO,
  updateStatisticsTeamDTO,
} from './dto/statistics-team.dto';

@Controller('statistics-team')
export class StatisticsTeamController {
  constructor(private statisticsTeamService: StatisticsTeamService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    try {
      const statisticsTeam = await this.statisticsTeamService.findAll();
      return res.status(200).json(statisticsTeam);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get(':id')
  async findOne(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    try {
      const statisticsTeam = await this.statisticsTeamService.findOne(id);
      return res.status(200).json(statisticsTeam);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Post()
  async create(
    @Body() stats: createStatisticsTeamDTO,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const statisticsTeam = await this.statisticsTeamService.create(stats);
      return res.status(201).json(statisticsTeam);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() stats: updateStatisticsTeamDTO,
  ): Promise<Response> {
    try {
      const statisticsTeam = await this.statisticsTeamService.update(id, stats);
      return res.status(200).json(statisticsTeam);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
