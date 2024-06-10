import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Role } from '../decorators/role.decorator';
import { Roles } from '../user/consts/enums';

@Controller('company')
@ApiTags('company')
@ApiBearerAuth()
@Role(Roles.admin, Roles.producer)
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

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
}
