import { ApiProperty } from '@nestjs/swagger';

export class GetBodyRequestDto {
  @ApiProperty()
  galaxy: string;

  @ApiProperty()
  solarSystem: string;

  @ApiProperty()
  body: string;
}
