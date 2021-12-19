import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { getRandomIntInclusive } from 'utils';

import { Coordinates } from '../entities/coordinates.entity';
import { AsteroidDocument, AsteroidEntity } from '../entities/asteroid.entity';
import { PlanetDocument, PlanetEntity } from '../entities/planet.entity';
import { SunDocument, SunEntity } from '../entities/sun.entity';

import { MAX_PLANETS, MAX_SOLAR_SYSTEMS, MIN_PLANETS } from '../consts';
import { ASTEROID_SCHEMA_NAME } from '../entities/asteroid.entity';
import { PLANET_SCHEMA_NAME } from '../entities/planet.entity';
import { SUN_SCHEMA_NAME } from '../entities/sun.entity';
import { Resourses } from '../entities/resourses.entity';

@Injectable()
export class GalaxyService {
  constructor(
    @InjectModel(PLANET_SCHEMA_NAME)
    private readonly planetsRepository: Model<PlanetDocument>,
    @InjectModel(ASTEROID_SCHEMA_NAME)
    private readonly asteroidsRepository: Model<AsteroidDocument>,
    @InjectModel(SUN_SCHEMA_NAME)
    private readonly sunsRepository: Model<SunDocument>,
  ) {}

  private createSun(galaxy: number, solarSystem: number) {
    return {
      coordinates: new Coordinates(galaxy, solarSystem, 0),
      name: 'Солнце',
    };
  }

  private createAsteroid(
    galaxy: number,
    solarSystem: number,
    planetsQuantity: number,
  ) {
    const resourses = new Resourses(0, 0, 0, 0);
    return {
      coordinates: new Coordinates(
        galaxy,
        solarSystem,
        getRandomIntInclusive(0, planetsQuantity) + 0.5,
      ),
      resourses,
    };
  }

  private createPlanet(
    galaxy: number,
    solarSystem: number,
    body: number,
  ): PlanetEntity {
    return {
      coordinates: new Coordinates(galaxy, solarSystem, body),
      populated: false,
      resourses: new Resourses(5000, 5000, 0, 0),
    };
  }

  async createOne() {
    const planets = [];
    const asteroids = [];
    const suns = [];

    const galaxiesCoordinates = await this.planetsRepository.distinct(
      'coordinates.galaxyCoordinate',
    );
    const lastGalaxyCoordinate = galaxiesCoordinates.length
      ? Math.max(...galaxiesCoordinates) + 1
      : 1;

    for (let i = 1; i <= MAX_SOLAR_SYSTEMS; i++) {
      const planetsQuantity = getRandomIntInclusive(MIN_PLANETS, MAX_PLANETS);

      const asteroid: AsteroidEntity = this.createAsteroid(
        lastGalaxyCoordinate,
        i,
        planetsQuantity,
      );

      const sun: SunEntity = this.createSun(lastGalaxyCoordinate, i);

      for (let j = 1; j <= planetsQuantity; j++) {
        const planet: PlanetEntity = this.createPlanet(
          lastGalaxyCoordinate,
          i,
          j,
        );
        planets.push(planet);
      }
      asteroids.push(asteroid);
      suns.push(sun);
    }

    const result = {
      planets: await this.planetsRepository.create(planets),
      asteroids: await this.asteroidsRepository.create(asteroids),
      suns: await this.sunsRepository.create(suns),
    };

    return result;
  }
}
