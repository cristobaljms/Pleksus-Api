import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdsService } from './ads.service';
import { AdDTO } from './dto/ad.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Get()
  findAll() {
    return this.adsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adsService.findOne(id);
  }

  @Post()
  create(@Body() adDTO: AdDTO) {
    return this.adsService.create(adDTO);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() adDTO: AdDTO) {
    // return this.adsService.update(id, adDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.adsService.delete(id);
  }
}
