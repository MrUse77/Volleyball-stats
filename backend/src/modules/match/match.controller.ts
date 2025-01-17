import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { MatchService } from './match.service';
import { Response } from 'express';
import { createMatchDTO, updateMatchDTO } from './dto/match.dto';

@Controller('match')
export class MatchController {
  constructor(private MatchService: MatchService) {}

  @Post('create')
  async createMatch(
    @Body() match: createMatchDTO,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const newMatch = await this.MatchService.createMatch(match);
      return res.status(200).send(newMatch);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.message });
    }
  }

  @Get('')
  async getMatches(@Res() res: Response): Promise<Response> {
    try {
      const matches = await this.MatchService.getMatches();
      return res.status(200).send(matches);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  @Get(':id')
  async getMatch(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const match = await this.MatchService.getMatch(id);
      return res.status(200).send(match);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  @Put(':id')
  async updateMatch(
    @Param('id') id: string,
    @Body() match: updateMatchDTO,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const updatedMatch = await this.MatchService.updateMatch(id, match);
      return res.status(200).send(updatedMatch);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
}
