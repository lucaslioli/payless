import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ProductsPageModule } from '../pages/products/products.module';
import { Product_detailPageModule } from '../pages/product_detail/product_detail.module';
import { EstablishmentPageModule } from '../pages/establishment/establishment.module';
import { MapsPageModule } from '../pages/maps/maps.module';
import { TabsPage } from '../pages/tabs/tabs';
import { ScannerPage } from '../pages/scanner/scanner';
import { NfcePage } from '../pages/nfce/nfce';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { GoogleMaps } from '@ionic-native/google-maps';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ScannerPage,
    NfcePage,
    TutorialPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    ProductsPageModule,
    Product_detailPageModule,
    EstablishmentPageModule,
    MapsPageModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ScannerPage,
    NfcePage,
    TutorialPage
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
