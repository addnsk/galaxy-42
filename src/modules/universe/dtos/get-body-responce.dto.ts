import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { AsteroidEntity } from '../entities/asteroid.entity';
import { PlanetEntity } from '../entities/planet.entity';
import { SunEntity } from '../entities/sun.entity';

export class GetBodyResponceDto {
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(PlanetEntity) },
      { $ref: getSchemaPath(AsteroidEntity) },
      { $ref: getSchemaPath(SunEntity) },
    ],
  })
  body: PlanetEntity | AsteroidEntity | SunEntity;
}
