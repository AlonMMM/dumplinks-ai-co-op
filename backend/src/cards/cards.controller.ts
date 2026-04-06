import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CardsService } from './cards.service';
import { Card } from './schemas/card.schema';

interface AuthRequest {
  user: { _id: { toString(): string } };
}

@UseGuards(JwtAuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get()
  getAll(@Request() req: AuthRequest) {
    return this.cardsService.findAll(req.user._id.toString());
  }

  @Post()
  create(@Request() req: AuthRequest, @Body() body: Omit<Card, 'userId'>) {
    return this.cardsService.create(req.user._id.toString(), body);
  }

  @Put(':id')
  update(
    @Request() req: AuthRequest,
    @Param('id') id: string,
    @Body() body: Partial<Card>,
  ) {
    return this.cardsService.update(req.user._id.toString(), id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Request() req: AuthRequest, @Param('id') id: string) {
    return this.cardsService.delete(req.user._id.toString(), id);
  }
}
