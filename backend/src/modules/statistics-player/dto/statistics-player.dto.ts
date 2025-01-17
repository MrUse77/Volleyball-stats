import { IsNumber, IsObject, IsString } from 'class-validator';
import { Match } from 'src/modules/match/match.entity';
import { Player } from 'src/modules/player/player.entity';

export class createStatisticsPlayerDTO {
  @IsNumber()
  points: number;
  @IsNumber()
  aces: number;
  @IsNumber()
  blocks: number;
  @IsNumber()
  attacks: number;
  @IsNumber()
  enf: number;
  @IsNumber()
  ce: number;
  @IsObject()
  player: Player;
  @IsObject()
  match: Match;
}

export class getAllStatisticsPlayersDTO {
  @IsString()
  id: string;
  @IsNumber()
  points: number;
  @IsNumber()
  aces: number;
  @IsNumber()
  blocks: number;
  @IsNumber()
  attacks: number;
  @IsNumber()
  enf: number;
  @IsNumber()
  ce: number;
  @IsObject()
  player: Player;
  @IsObject()
  match: {
    teamA: string;
    teamB: string;
    date: Date;
    setA: number;
    setB: number;
  };
}

export class getStatisticsPlayerByTournamentDTO {
  @IsNumber()
  points: number;
  @IsNumber()
  aces: number;
  @IsNumber()
  blocks: number;
  @IsNumber()
  attacks: number;
  @IsNumber()
  enf: number;
  @IsNumber()
  ce: number;
  @IsObject()
  player: Player;
}
export class updatedStatisticsPlayerDTO {
  @IsNumber()
  points: number;
  @IsNumber()
  aces: number;
  @IsNumber()
  blocks: number;
  @IsNumber()
  attacks: number;
  @IsNumber()
  enf: number;
  @IsNumber()
  ce: number;
}

export class getStatisticsPlayerByMatchDTO {
  @IsNumber()
  points: number;
  @IsNumber()
  aces: number;
  @IsNumber()
  blocks: number;
  @IsNumber()
  attacks: number;
  @IsNumber()
  enf: number;
  @IsNumber()
  ce: number;
  @IsObject()
  player: {
    id: string;
    name: string;
  };
}
