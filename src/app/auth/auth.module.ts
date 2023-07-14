import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
// import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SliderModule } from 'primeng/slider';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SliderModule,
    // NgxSliderModule
  ]
})
export class AuthModule { }
