import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import {FrontOffice} from '../business.frontoffice.namespace';
import { GetPagination } from '../../../../../../../../libs/api/common/decorator';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard } from '@movit/api/auth';
import { GetCompany } from '../../../../../../../../libs/api/business/src/business.decorator';
import { BusinessEntity } from '../../../../../../../../libs/api/business/src/entities/business.entity';
import { ProfilesService } from '../../../../../../../../libs/api/profiles/src/profiles.service';

@Controller(FrontOffice.resolePaths(['crm', FrontOffice.Profiles.PATH]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontOfficeProfilesController {
  constructor(protected profilesService: ProfilesService) {}

  @Get('profile')
  getProfiles(
    @GetCompany() business: BusinessEntity,
    @GetPagination() pagination
  ) {
    return pagination;
  }

  @Put('profile')
  saveProfile(@GetCompany() business: BusinessEntity, @Body() body: any) {
    this.profilesService
    return body;
  }


  @Patch('profile/:profileId')
  updateProfile(
    @GetCompany() business: BusinessEntity,
    @Param('profileId') profileId: number
  ) {
    return 1;
  }


  @Patch('profile/:profileId')
  deleteProfile(
    @GetCompany() business: BusinessEntity,
    @Param('profileId') profileId: number
  ) {
    return 1;
  }
}
