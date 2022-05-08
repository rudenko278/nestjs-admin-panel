import { Module } from '@nestjs/common';

import { BusinessAppsController } from './controller/business.apps.controller';
import { AppsModule } from '@movit/api/app';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@movit/api/auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessModule } from '@movit/api/business';
import { BusinessBackOfficeModule } from './modules/backoffice/business.backoffice.module';
import { BusinessAdministrationModule } from './modules/administration/business.administration.module';
import { BusinessController } from './controller/business.controller';
import { TranslationModule } from '@movit/api/translation';
import { BusinessFrontOfficeModule } from './modules/frontoffice/business.frontoffice.module';
import { ProfilesModule } from '@movit/api/profiles';
import { ReservationModule } from '@movit/api/reservation';
import { BusinessSettingsModule } from './modules/settings/business.settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...AppsModule.dbSettings,
      entities: [
        ...TranslationModule.dbSettings.entities,
        ...AppsModule.dbSettings.entities,
        ...AuthModule.dbSettings.entities,
        ...BusinessModule.dbSettings.entities,
        ...ProfilesModule.dbSettings.entities,
        ...ReservationModule.dbSettings.entities,
      ],
    }),
    AuthModule,
    AppsModule,
    BusinessModule,
    BusinessFrontOfficeModule,
    BusinessBackOfficeModule,
    BusinessSettingsModule,
    BusinessAdministrationModule,
  ],
  controllers: [BusinessController, BusinessAppsController],
  providers: [],
  exports: [],
})
export class BusinessAPIModule {}
