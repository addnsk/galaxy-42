import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { BodyTypes } from './body-types.enum';
import { Coordinates } from './coordinates.entity';

@Schema()
export class AsteroidEntity {
  @ApiPropertyOptional({ default: BodyTypes.asteroid, enum: BodyTypes })
  @Prop({ default: BodyTypes.asteroid, enum: BodyTypes })
  type?: BodyTypes;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  coordinates: Coordinates;
}

export type AsteroidDocument = AsteroidEntity & Document;
export const AsteroidSchema = SchemaFactory.createForClass(AsteroidEntity);
export const ASTEROID_SCHEMA_NAME = 'asteroids';
