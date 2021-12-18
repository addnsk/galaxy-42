import { ApiProperty } from '@nestjs/swagger';

export class PopulatePlanetRequestDto {
  @ApiProperty()
  galaxy: string;

  @ApiProperty()
  solarSystem: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  owner: string;
}
