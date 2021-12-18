import { ApiProperty } from '@nestjs/swagger';
import { AsteroidEntity } from '../entities/asteroid.entity';
import { PlanetEntity } from '../entities/planet.entity';
import { SunEntity } from '../entities/sun.entity';

export class CreateGalaxyResponceDto {
  @ApiProperty({ type: [PlanetEntity] })
  planets: PlanetEntity;

  @ApiProperty({ type: [AsteroidEntity] })
  asteroids: AsteroidEntity;

  @ApiProperty({ type: [SunEntity] })
  suns: SunEntity;
}
