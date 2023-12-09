import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchMsg } from 'src/common/constants';

@Controller()
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @MessagePattern(MatchMsg.CREATE)
  create(@Payload() createMatchDto: CreateMatchDto) {
    return this.matchService.create(createMatchDto);
  }

  @MessagePattern(MatchMsg.FIND_ALL)
  findAll() {
    return this.matchService.findAll();
  }

  @MessagePattern(MatchMsg.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.matchService.findOne(id);
  }

  @MessagePattern(MatchMsg.UPDATE)
  update(@Payload() updateMatchDto: UpdateMatchDto) {
    return this.matchService.update(updateMatchDto);
  }

  @MessagePattern(MatchMsg.DELETE)
  remove(@Payload() id: string) {
    return this.matchService.remove(id);
  }
}
