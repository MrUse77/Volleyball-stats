import { IsString, IsObject, IsUUID } from 'class-validator';
import { getTeamGroupDTO } from 'src/modules/team/dto/team.dto';

export class GetGroupsTournamentDTO {
  id: string;
  group: string;
  teams: getTeamGroupDTO[];
}

export class createGroupDTO {
  @IsString()
  group: string;
  @IsObject()
  tournament: {
    id: string;
  };
  @IsObject()
  teams: {
    id: string;
  }[];
}

export class getGroupDTO {
  id: string;
  group: string;
  teams: {
    id: string;
    name: string;
    statistics: {
      id: string;
      pj: number;
      pg: number;
      pp: number;
      setsGanados: number;
      setsPerdidos: number;
      puntos: number;
    };
  }[];
}
