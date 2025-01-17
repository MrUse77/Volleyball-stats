import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class getStatisticsTeamDTO {
  id: string;
  pj: number;
  pg: number;
  pp: number;
  setsGanados: number;
  setsPerdidos: number;
  puntos: number;
  participationType: string;
  team: {
    id: string;
    name: string;
  };
}

export class createStatisticsTeamDTO {
  @IsNumber()
  pj: number;
  @IsNumber()
  pg: number;
  @IsNumber()
  pp: number;
  @IsNumber()
  setsGanados: number;
  @IsNumber()
  setsPerdidos: number;
  @IsNumber()
  puntos: number;
  @IsString()
  @IsEnum(['Group Stage', 'Knockout'])
  participationType: string;

  team: {
    id: string;
  };
  groups: {
    id: string;
  };
}

export class updateStatisticsTeamDTO {
  @IsNumber()
  pj: number;
  @IsNumber()
  pg: number;
  @IsNumber()
  pp: number;
  @IsNumber()
  setsGanados: number;
  @IsNumber()
  setsPerdidos: number;
  @IsNumber()
  puntos: number;
}
