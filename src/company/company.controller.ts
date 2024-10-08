import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Role } from '../decorators/role.decorator';
import { Roles } from '../user/consts/enums';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Public } from '../decorators/public.decorator';

@Controller('company')
@ApiTags('company')
@ApiBearerAuth()
@Role(Roles.admin, Roles.producer)
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('/all')
  @Public()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Получение всех названий компаний' })
  getAllCompanies() {
    return this.companyService.getAllCompanies();
  }

  @Post()
  @ApiOperation({ summary: 'Создание компании пользователя' })
  createCompany(@Body() dto: CreateCompanyDto) {
    return this.companyService.createCompany(dto);
  }

  @Delete()
  @ApiOperation({ summary: 'Удаление компании' })
  deleteCompany(@Body() dto: CreateCompanyDto) {
    return this.companyService.deleteCompany(dto);
  }

  @Put()
  @ApiOperation({ summary: 'Обновление компании пользователя' })
  updateInfoCompany(@Body() dto: CreateCompanyDto) {
    return this.companyService.updateInfoCompany(dto);
  }

  @Get(':inn')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Поиск компании по инн' })
  @ApiParam({ name: 'inn', type: 'string' })
  findCompanyByUNN(@Param('inn') inn: string) {
    return this.companyService.findCompanyByINN(inn);
  }

  @Get('/user/:user_id')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Поиск компании по user' })
  @ApiParam({ name: 'user_id', type: 'string' })
  findCompanyByUser(@Param('user_id') user_id: string) {
    return this.companyService.findCompanyByUser(user_id);
  }
}
