import { ApiProperty } from '@nestjs/swagger';

export class Resourses {
  @ApiProperty()
  readonly alloys: number;

  @ApiProperty()
  readonly carbon: number;

  @ApiProperty()
  readonly crystals: number;

  @ApiProperty()
  readonly energy: number;

  constructor(
    alloys: number,
    carbon: number,
    crystals: number,
    energy: number,
  ) {
    this.alloys = alloys;
    this.carbon = carbon;
    this.crystals = crystals;
    this.energy = energy;
  }
}
