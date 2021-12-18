import { ApiProperty } from '@nestjs/swagger';
import { Coordinates } from '../entities/coordinates.entity';

export class CountDistanceDto {
  @ApiProperty()
  from: Coordinates;

  @ApiProperty()
  to: Coordinates;
}
