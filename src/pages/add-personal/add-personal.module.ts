import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPersonalPage } from './add-personal';

@NgModule({
  declarations: [
    AddPersonalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPersonalPage),
  ],
})
export class AddPersonalPageModule {}
