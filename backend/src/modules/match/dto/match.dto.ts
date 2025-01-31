import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { validateHeaderName } from 'http';

export class getMatchesDTO {
  id: string;
  tournament: string;
  scoreA: number[];
  scoreB: number[];
  setA: number;
  setB: number;
  nameTeamA: string;
  nameTeamB: string;
  state: string;
  winner: string;
  startTime: Date;
}
export interface statisticsPlayer {
  id: string;
  points: number;
  aces: number;
  blocks: number;
  attacks: number;
  enf: number;
  ce: number;
  player: {
    id: string;
    name: string;
    age: number;
    position: string;
  };
}
export class getMatchDTO {
  id: string;
  scoreA: number[];
  scoreB: number[];
  setA: number;
  setB: number;
  teamA: {
    id: string;
    name: string;
    statistics: statisticsPlayer[];
  };
  teamB: {
    id: string;
    name: string;
    statistics: statisticsPlayer[];
  };
  state: string;
  winner: string;
  tournament: string;
  arbitrator: string;
  startTime: Date;
}

class TeamDTO {
  @IsUUID()
  id: string;
}
export class createMatchDTO {
  id: string;
  @IsObject()
  @ValidateNested()
  teamA: TeamDTO;
  @IsObject()
  @ValidateNested()
  teamB: TeamDTO;
  @IsDate()
  @Type(() => Date)
  startTime: Date;
  @IsObject()
  tournament: {
    id: string;
  };
  @IsString()
  arbitrator: string;
  @IsOptional()
  scoreA: number[];
  @IsOptional()
  scoreB: number[];
  @IsOptional()
  setA: number;
  @IsOptional()
  setB: number;
  @IsOptional()
  state: string;
  @IsOptional()
  @ValidateNested()
  winner: TeamDTO;
}

export class updateMatchDTO {
  @IsArray()
  scoreA: number[];
  @IsArray()
  scoreB: number[];
  @IsNumber()
  setA: number;
  @IsNumber()
  setB: number;
  @IsOptional()
  state: string;
  @IsOptional()
  @ValidateNested()
  winner: TeamDTO;
}
