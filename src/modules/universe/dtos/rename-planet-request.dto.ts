import { ApiProperty } from '@nestjs/swagger';

export class RenamePlanetRequestDto {
  @ApiProperty()
  galaxy: string;

  @ApiProperty()
  solarSystem: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  name: string;
}
