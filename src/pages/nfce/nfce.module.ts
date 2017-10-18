import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NfcePage } from './nfce';

@NgModule({
  declarations: [
    NfcePage,
  ],
  imports: [
    IonicPageModule.forChild(NfcePage),
  ],
})
export class NfcePageModule {}
