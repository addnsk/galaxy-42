import { ApiProperty } from '@nestjs/swagger';

export class RenamePlanetResponceDto {
  @ApiProperty()
  acknowledged: boolean;
}
