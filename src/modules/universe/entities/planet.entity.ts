import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { BodyTypes } from './body-types.enum';
import { Coordinates } from './coordinates.entity';
import { Resourses } from './resourses.entity';

@Schema()
export class PlanetEntity {
  @ApiPropertyOptional({ default: BodyTypes.planet, enum: BodyTypes })
  @Prop({ default: BodyTypes.planet, enum: BodyTypes })
  type?: BodyTypes;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  coordinates: Coordinates;

  @ApiProperty()
  @Prop()
  populated?: boolean;

  @ApiProperty()
  @Prop()
  resourses: Resourses;

  @ApiPropertyOptional()
  @Prop()
  name?: string;

  @ApiPropertyOptional()
  @Prop()
  owner?: string;
}

export type PlanetDocument = PlanetEntity & Document;
export const PlanetSchema = SchemaFactory.createForClass(PlanetEntity);
export const PLANET_SCHEMA_NAME = 'planets';
