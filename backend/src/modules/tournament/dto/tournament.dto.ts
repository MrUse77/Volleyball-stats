import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { GetGroupsTournamentDTO } from 'src/modules/groups/dto/groups.dto';
import { Groups } from 'src/modules/groups/groups.entity';

export class createTournamentDTO {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  @IsEnum(['League', 'Cup', 'Friendly'])
  type: string;
  @IsDate()
  @Type(() => Date)
  startDate: Date;
  @IsDate()
  @Type(() => Date)
  endDate: Date;
  @IsString()
  location: string;
  @IsString()
  @IsEnum(['active', 'inactive'])
  status: string;
  @IsObject()
  @IsOptional()
  groups: Groups[];
}

export class updateTournamentDTO {
  @IsUUID()
  id: string;
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsDate()
  @IsOptional()
  startDate: Date;
  @IsDate()
  @IsOptional()
  endDate: Date;
  @IsString()
  @IsOptional()
  location: string;
  @IsString()
  @IsEnum(['active', 'inactive'])
  @IsOptional()
  status: string;
}

export class getAllTournamentsDTO {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  startDate: Date;
  endDate: Date;
}

export class getTournamentDTO {
  @IsUUID()
  id: string;
  name: string;
  description: string;
  type: string;
  startDate: Date;
  endDate: Date;
  location: string;
  status: string;
  groups: GetGroupsTournamentDTO[];
}

export class getTournamentMatchesDTO {
  id: string;
  matches: {
    id: string;
    teamA: string;
    teamB: string;
    startTime: Date;
    scoreA: number[];
    scoreB: number[];
    setA: number;
    setB: number;
    state: string;
  }[];
}

export class getTournamentTeamsDTO {
  id: string;
  teams: {
    id: string;
    name: string;
  }[];
}
export class getTournamentGroupsDTO {
  id: string;
  groups: GetGroupsTournamentDTO[];
}
