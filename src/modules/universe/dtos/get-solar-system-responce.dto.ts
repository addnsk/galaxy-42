import { ApiProperty } from '@nestjs/swagger';
import { AsteroidEntity } from '../entities/asteroid.entity';
import { PlanetEntity } from '../entities/planet.entity';
import { SunEntity } from '../entities/sun.entity';

export class GetSolarSystemResponceDto {
  @ApiProperty({ type: [PlanetEntity] })
  planets: PlanetEntity[];

  @ApiProperty()
  asteroid: AsteroidEntity;

  @ApiProperty()
  sun: SunEntity;
}
