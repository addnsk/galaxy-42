import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AsteroidDocument, AsteroidEntity } from '../entities/asteroid.entity';
import { PlanetDocument, PlanetEntity } from '../entities/planet.entity';
import { SunDocument, SunEntity } from '../entities/sun.entity';

import { PLANET_SCHEMA_NAME } from '../entities/planet.entity';
import { ASTEROID_SCHEMA_NAME } from '../entities/asteroid.entity';
import { SUN_SCHEMA_NAME } from '../entities/sun.entity';

@Injectable()
export class BodyService {
  constructor(
    @InjectModel(PLANET_SCHEMA_NAME)
    private readonly planetsRepository: Model<PlanetDocument>,
    @InjectModel(ASTEROID_SCHEMA_NAME)
    private readonly asteroidsRepository: Model<AsteroidDocument>,
    @InjectModel(SUN_SCHEMA_NAME)
    private readonly sunsRepository: Model<SunDocument>,
  ) {}

  private getPlanetQuery(galaxy: number, solarSystem: number, body: number) {
    return {
      'coordinates.galaxyCoordinate': galaxy,
      'coordinates.solarSystemCoordinate': solarSystem,
      'coordinates.bodyCoordinate': body,
    };
  }

  async getOne(galaxy: number, solarSystem: number, body: number) {
    const query = this.getPlanetQuery(galaxy, solarSystem, body);

    let responce: PlanetEntity | AsteroidEntity | SunEntity;
    if (body === 0) responce = await this.sunsRepository.findOne(query);
    else if (Number.isInteger(body))
      responce = await this.planetsRepository.findOne(query);
    else responce = await this.asteroidsRepository.findOne(query);

    return { body: responce };
  }

  async populateOne(
    galaxy: number,
    solarSystem: number,
    body: number,
    owner: string,
  ) {
    if (body === 0 || !Number.isInteger(body)) return;

    const query = this.getPlanetQuery(galaxy, solarSystem, body);
    return await this.planetsRepository.updateOne(query, {
      populated: true,
      owner,
    });
  }

  async renameOne(
    galaxy: number,
    solarSystem: number,
    body: number,
    name: string,
  ) {
    const query = this.getPlanetQuery(galaxy, solarSystem, body);
    return await this.planetsRepository.updateOne(query, { name });
  }
}
