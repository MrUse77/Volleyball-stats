import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsTeamService } from './statistics-team.service';

describe('StatisticsTeamService', () => {
  let service: StatisticsTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatisticsTeamService],
    }).compile();

    service = module.get<StatisticsTeamService>(StatisticsTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
