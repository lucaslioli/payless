import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ScannerPage } from '../scanner/scanner';
import { ProductsPage } from '../products/products';
import { MapsPage } from '../maps/maps';

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  mapsRoot = MapsPage
  scannerRoot = ScannerPage
  productsRoot = ProductsPage


  constructor(public navCtrl: NavController) {}

}
