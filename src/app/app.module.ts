import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ProductsPageModule } from '../pages/products/products.module';
import { Product_detailPageModule } from '../pages/product_detail/product_detail.module';
import { EstablishmentPageModule } from '../pages/establishment/establishment.module';
import { MapsPageModule } from '../pages/maps/maps.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { ScannerPageModule } from '../pages/scanner/scanner.module';
import { NfcePageModule } from '../pages/nfce/nfce.module';

import { GoogleMaps } from '@ionic-native/google-maps';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    ProductsPageModule,
    Product_detailPageModule,
    EstablishmentPageModule,
    MapsPageModule,
    TabsPageModule,
    ScannerPageModule,
    NfcePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    GoogleMaps,
    Network
  ]
})
export class AppModule {}
