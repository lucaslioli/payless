import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ScannerPage } from '../scanner/scanner';
import { ProductsPage } from '../products/products';
import { MapsPage } from '../maps/maps';
import { Network } from '@ionic-native/network';

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
  internetConnection: boolean = false;

  constructor(public navCtrl: NavController, public network: Network) {}

  ionViewDidEnter() {
    if(this.network.type == 'none' || this.network.type == 'unknown'){
      this.internetConnection = false;
    } else {
      this.internetConnection = true;
    }
    
    this.network.onConnect().subscribe(data => {
      this.internetConnection = true;
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    });
    this.network.onDisconnect().subscribe(data => {
      this.internetConnection = false;
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    });
  }

}
