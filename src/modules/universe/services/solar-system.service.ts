import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AsteroidDocument } from '../entities/asteroid.entity';
import { PlanetDocument } from '../entities/planet.entity';
import { SunDocument } from '../entities/sun.entity';

import { PLANET_SCHEMA_NAME } from '../entities/planet.entity';
import { ASTEROID_SCHEMA_NAME } from '../entities/asteroid.entity';
import { SUN_SCHEMA_NAME } from '../entities/sun.entity';

@Injectable()
export class SolarSystemService {
  constructor(
    @InjectModel(PLANET_SCHEMA_NAME)
    private readonly planetsRepository: Model<PlanetDocument>,
    @InjectModel(ASTEROID_SCHEMA_NAME)
    private readonly asteroidsRepository: Model<AsteroidDocument>,
    @InjectModel(SUN_SCHEMA_NAME)
    private readonly sunsRepository: Model<SunDocument>,
  ) {}

  async getOne(galaxy: number, solarSystem: number) {
    const query = {
      'coordinates.galaxyCoordinate': galaxy,
      'coordinates.solarSystemCoordinate': solarSystem,
    };
    const result = {
      planets: await this.planetsRepository.find(query),
      asteroid: await this.asteroidsRepository.findOne(query),
      sun: await this.sunsRepository.findOne(query),
    };

    return result;
  }
}
