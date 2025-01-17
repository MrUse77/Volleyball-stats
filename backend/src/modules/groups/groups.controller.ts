import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { createGroupDTO } from './dto/groups.dto';
import { Response } from 'express';

@Controller('groups')
export class GroupsController {
  constructor(private groupService: GroupsService) {}

  @Post('create')
  async createGroup(@Body() group: createGroupDTO[], @Res() res: Response) {
    try {
      const newGroup = await this.groupService.createGroup(group);
      return res.status(200).send(newGroup);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  @Get(':id')
  async getGroup(@Res() res: Response, @Param('id') id: string) {
    try {
      const groups = await this.groupService.getGroupById(id);
      return res.status(200).send(groups);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
}
