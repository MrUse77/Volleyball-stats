import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { statisticsPlayer } from 'src/modules/statistics-player/statistics-player.entity';
import { Team } from 'src/modules/team/team.entity';

export class createPlayerDTO {
  @IsString()
  name: string;
  @IsNumber()
  age: number;
  @IsString()
  @IsEnum(['Armador', 'Punta', 'Central', 'Libero', 'Opuesto'])
  position: string;
  @IsObject()
  @IsOptional()
  team: Team;
}

export class updatePlayerDTO {
  @IsString()
  @IsOptional()
  name: string;
  @IsNumber()
  @IsOptional()
  age: number;
  @IsString()
  @IsEnum(['Armador', 'Punta', 'Central', 'Libero', 'Opuesto'])
  @IsOptional()
  position: string;
}

export class getPlayerDTO {
  id: string;
  name: string;
  age: number;
  position: string;
  teamName: string;
  statisticsPlayer: statisticsPlayer[];
}

export class getAllPlayersDTO {
  id: string;
  name: string;
  age: number;
  position: string;
  @IsOptional()
  team: {
    id: string;
    name: string;
    entrenador: string;
  };
}

export class addPlayerToTeamDTO {
  @IsUUID()
  playerId: string;
  @IsUUID()
  teamId: string;
}
