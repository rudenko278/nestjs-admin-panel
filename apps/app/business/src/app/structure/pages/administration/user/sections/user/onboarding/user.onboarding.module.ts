import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdbSharedModule } from '@movit/app/ui';

import { UserOnboardingComponent } from './user.onboarding.component';
import { UserOnBoardingService } from "./user.onboarding.service";

const routes = [
  { path: '', component: UserOnboardingComponent }
];

@NgModule({
  declarations: [UserOnboardingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MdbSharedModule,
    RouterModule
  ],
  providers:[
    UserOnBoardingService
  ]
})
export class UseBoardingModule {}
