import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsTeamController } from './statistics-team.controller';

describe('StatisticsTeamController', () => {
  let controller: StatisticsTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsTeamController],
    }).compile();

    controller = module.get<StatisticsTeamController>(StatisticsTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
