import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Card, CardDocument } from './schemas/card.schema';

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  private toResponse(card: CardDocument) {
    const obj = card.toObject();
    return {
      ...obj,
      id: obj._id.toString(),
      _id: undefined,
      userId: undefined,
      __v: undefined,
    };
  }

  async findAll(userId: string) {
    const cards = await this.cardModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 });
    return cards.map((c) => this.toResponse(c));
  }

  async create(userId: string, data: Omit<Card, 'userId'>) {
    const card = await this.cardModel.create({
      ...data,
      userId: new Types.ObjectId(userId),
    });
    return this.toResponse(card);
  }

  async update(userId: string, cardId: string, data: Partial<Card>) {
    const card = await this.cardModel.findById(cardId);
    if (!card) throw new NotFoundException('Card not found');
    if (card.userId.toString() !== userId) throw new ForbiddenException();

    const updated = await this.cardModel.findByIdAndUpdate(cardId, data, {
      new: true,
    });
    return this.toResponse(updated!);
  }

  async delete(userId: string, cardId: string) {
    const card = await this.cardModel.findById(cardId);
    if (!card) throw new NotFoundException('Card not found');
    if (card.userId.toString() !== userId) throw new ForbiddenException();

    await this.cardModel.findByIdAndDelete(cardId);
  }
}
