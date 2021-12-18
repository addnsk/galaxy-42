import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UniverseController } from './universe.controller';
import { BodyService } from './services/body.service';
import { GalaxyService } from './services/galaxy.service';
import { SolarSystemService } from './services/solar-system.service';

import { AsteroidSchema } from './entities/asteroid.entity';
import { PlanetSchema } from './entities/planet.entity';
import { SunSchema } from './entities/sun.entity';

import { PLANET_SCHEMA_NAME } from './entities/planet.entity';
import { ASTEROID_SCHEMA_NAME } from './entities/asteroid.entity';
import { SUN_SCHEMA_NAME } from './entities/sun.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PLANET_SCHEMA_NAME, schema: PlanetSchema },
      { name: ASTEROID_SCHEMA_NAME, schema: AsteroidSchema },
      { name: SUN_SCHEMA_NAME, schema: SunSchema },
    ]),
  ],
  controllers: [UniverseController],
  providers: [GalaxyService, SolarSystemService, BodyService],
})
export class UniverseModule {}
