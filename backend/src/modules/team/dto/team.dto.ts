import { IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { Match } from 'src/modules/match/match.entity';
import { Player } from 'src/modules/player/player.entity';
import { statisticsTeam } from 'src/modules/statistics-team/statistics-team.entity';

export class getTeamGroupDTO {
  id: string;
  name: string;
}

export class getTeamDTO {
  id: string;
  name: string;
  entrenador: string;
  players: {
    id: string;
    name: string;
    position: string;

    statisticsPlayer: {
      points: number;
      aces: number;
      blocks: number;
      attacks: number;
      enf: number;
      ce: number;
    };
  }[];
  matches: Match[];
  statisticsTeam: statisticsTeam[];
}

export class getAllTeamsDTO {
  id: string;
  name: string;
  entrenador: string;
}

export class createTeamDTO {
  @IsString()
  name: string;
  @IsString()
  entrenador: string;
  @IsObject()
  @IsOptional()
  players: Player[];
}
export class updateTeamDTO {
  @IsString()
  name: string;
  @IsString()
  entrenador: string;
}

export class addPlayerToTeamDTO {
  players: Player[];
}

export class addMatchToTeamDTO {
  @IsString()
  id: string;
  @IsObject()
  matches: Match[];
}

export class addSatisticsToTeam {
  @IsString()
  id: string;
  @IsObject()
  statisticsTeam: statisticsTeam;
}
