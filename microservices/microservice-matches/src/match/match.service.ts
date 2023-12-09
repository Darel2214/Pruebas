import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './schemas/match.schema';

@Injectable()
export class MatchService {
  constructor(@InjectModel(Match.name) private model: Model<Match>) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const match = new this.model(createMatchDto);
    return match.save();
  }

  async findAll(): Promise<Match[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<Match> {
    return this.model.findById(id).exec();
  }

  update(updateMatchDto: UpdateMatchDto) {
    return this.model.findByIdAndUpdate(updateMatchDto.id, updateMatchDto);
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
