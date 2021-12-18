import { ApiProperty } from '@nestjs/swagger';

export class GetSolarSystemRequestDto {
  @ApiProperty()
  galaxy: string;

  @ApiProperty()
  solarSystem: string;
}
