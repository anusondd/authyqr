import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginApproverPage } from './login-approver';

@NgModule({
  declarations: [
    LoginApproverPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginApproverPage),
  ],
})
export class LoginApproverPageModule {}
