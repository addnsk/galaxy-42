import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { BodyTypes } from './body-types.enum';
import { Coordinates } from './coordinates.entity';

@Schema()
export class SunEntity {
  @ApiPropertyOptional({ default: BodyTypes.sun, enum: BodyTypes })
  @Prop({ default: BodyTypes.sun, enum: BodyTypes })
  type?: BodyTypes;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  coordinates: Coordinates;

  @ApiPropertyOptional()
  @Prop()
  name?: string;
}

export type SunDocument = SunEntity & Document;
export const SunSchema = SchemaFactory.createForClass(SunEntity);
export const SUN_SCHEMA_NAME = 'suns';
