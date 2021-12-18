import { ApiProperty } from '@nestjs/swagger';

export class Coordinates {
  @ApiProperty()
  readonly galaxyCoordinate: number;

  @ApiProperty()
  readonly solarSystemCoordinate: number;

  @ApiProperty()
  readonly bodyCoordinate: number;

  constructor(
    galaxyCoordinate: number,
    solarSystemCoordinate: number,
    bodyCoordinate: number,
  ) {
    this.galaxyCoordinate = galaxyCoordinate;
    this.solarSystemCoordinate = solarSystemCoordinate;
    this.bodyCoordinate = bodyCoordinate;
  }

  public static countDistance(from: Coordinates, to: Coordinates): number {
    const betweenGalaxies =
      from.galaxyCoordinate - to.galaxyCoordinate !== 0
        ? Math.abs(from.galaxyCoordinate - to.galaxyCoordinate) * 20000
        : 0;

    const betweenSolarSystems =
      from.solarSystemCoordinate - to.solarSystemCoordinate !== 0
        ? Math.abs(from.solarSystemCoordinate - to.solarSystemCoordinate) * 95 +
          2700
        : 0;

    const betweenBodies =
      from.bodyCoordinate - to.bodyCoordinate !== 0
        ? Math.abs(from.bodyCoordinate - to.bodyCoordinate) * 5 + 1000
        : 0;

    return betweenGalaxies + betweenSolarSystems + betweenBodies;
  }
}
