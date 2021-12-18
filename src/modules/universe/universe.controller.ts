import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { Body, Get, Post, Query, Patch } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Coordinates } from './entities/coordinates.entity';
import { BodyService } from './services/body.service';
import { GalaxyService } from './services/galaxy.service';
import { SolarSystemService } from './services/solar-system.service';

import { CountDistanceDto } from './dtos/count-distance-request.dto';
import { CreateGalaxyResponceDto } from './dtos/create-galaxy-responce.dto';
import { GetBodyRequestDto } from './dtos/get-body-request.dto';
import { GetBodyResponceDto } from './dtos/get-body-responce.dto';
import { GetSolarSystemRequestDto } from './dtos/get-solar-system-request.dto';
import { GetSolarSystemResponceDto } from './dtos/get-solar-system-responce.dto';
import { PopulatePlanetRequestDto } from './dtos/populate-planet-request.dto';
import { PopulatePlanetResponceDto } from './dtos/populate-planet-responce.dto';
import { RenamePlanetRequestDto } from './dtos/rename-planet-request.dto';
import { RenamePlanetResponceDto } from './dtos/rename-planet-responce.dto';

@Controller('universe')
export class UniverseController {
  constructor(
    private readonly galaxyService: GalaxyService,
    private readonly solarSystemService: SolarSystemService,
    private readonly bodyService: BodyService,
  ) {}

  @ApiTags('solar system')
  @ApiResponse({ status: 200, type: GetSolarSystemResponceDto })
  @Get('solarSystem?')
  async getSolarSystem(
    @Query() { galaxy, solarSystem }: GetSolarSystemRequestDto,
  ): Promise<GetSolarSystemResponceDto> {
    return await this.solarSystemService.getOne(
      Number(galaxy),
      Number(solarSystem),
    );
  }

  @ApiTags('body')
  @ApiResponse({ status: 200, type: GetBodyResponceDto })
  @Get('body?')
  async getBody(
    @Query() { galaxy, solarSystem, body }: GetBodyRequestDto,
  ): Promise<GetBodyResponceDto> {
    return await this.bodyService.getOne(
      Number(galaxy),
      Number(solarSystem),
      Number(body),
    );
  }

  @ApiTags('universe')
  @ApiResponse({ status: 201, type: Number })
  @Post('distance')
  @HttpCode(HttpStatus.OK)
  countDistance(@Body() { from, to }: CountDistanceDto): number {
    return Coordinates.countDistance(from, to);
  }

  @ApiTags('galaxy')
  @ApiResponse({ status: 201, type: CreateGalaxyResponceDto })
  @Post('galaxy')
  async createGalaxy(): Promise<CreateGalaxyResponceDto> {
    return await this.galaxyService.createOne();
  }

  @ApiTags('body')
  @ApiResponse({ status: 200, type: PopulatePlanetResponceDto })
  @Patch('body/populate?')
  async populatePlanet(
    @Query() { galaxy, solarSystem, body, owner }: PopulatePlanetRequestDto,
  ): Promise<PopulatePlanetResponceDto> {
    return await this.bodyService.populateOne(
      Number(galaxy),
      Number(solarSystem),
      Number(body),
      owner,
    );
  }

  @ApiTags('body')
  @ApiResponse({ status: 200, type: RenamePlanetResponceDto })
  @Patch('body/rename?')
  async renamePlanet(
    @Query() { galaxy, solarSystem, body, name }: RenamePlanetRequestDto,
  ): Promise<RenamePlanetResponceDto> {
    return await this.bodyService.renameOne(
      Number(galaxy),
      Number(solarSystem),
      Number(body),
      name,
    );
  }
}
