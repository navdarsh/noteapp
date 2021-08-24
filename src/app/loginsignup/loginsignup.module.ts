import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginsignupRoutingModule } from './loginsignup-routing.module';
import { LoginsignupComponent } from './loginsignup.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginsignupComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginsignupRoutingModule,
    FormsModule
  ]
})
export class LoginsignupModule { }
