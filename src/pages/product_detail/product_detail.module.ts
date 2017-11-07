import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Product_detailPage } from './product_detail';

@NgModule({
  declarations: [
    Product_detailPage,
  ],
  imports: [
    IonicPageModule.forChild(Product_detailPage),
  ],
})
export class Product_detailPageModule {}
