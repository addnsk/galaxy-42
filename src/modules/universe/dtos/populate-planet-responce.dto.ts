import { ApiProperty } from '@nestjs/swagger';

export class PopulatePlanetResponceDto {
  @ApiProperty()
  acknowledged: boolean;
}
