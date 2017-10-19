import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';

import 'rxjs/add/operator/map';

import { NfcePage } from '../nfce/nfce';

@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage {

  options: BarcodeScannerOptions;
  dadosQR;
  key: string;
  waiting: boolean = false;
  cordovaAbsent: boolean = false;
  nfceRegistered: boolean = false;

  private url: string = 'http://payless-api.ecoagile.com.br';
  // private url: string = 'http://localhost:8000';
  // private url: string = 'http://192.168.0.104:8000';
  public dadosNFCE;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private scanner: BarcodeScanner, 
    public http: Http, 
    public platform: Platform) {
      if (!this.platform.is('cordova')) {
        this.cordovaAbsent = true;
      }
    }

  scan(){

    this.options = {
      prompt: "Escaneie o QR Code da Nota Fiscal!"
    }

    if (this.platform.is('cordova')) {

      this.scanner.scan(this.options).then(barcodeData => {

        
          this.dadosQR = barcodeData.text;
          
          this.key = this.extractKey(this.dadosQR);
          
          this.waiting = true;
      
          this.http.get(this.url + '/nfce/' + this.key)
          .map(res => res.json())
          .subscribe(data => {
            if(data !== "202"){
              this.dadosNFCE = data;
          
              this.showNfceData();
            } else {
              console.log("Esta nota fiscal já está cadastrada no sistema");
              this.nfceRegistered = true;
            }
          });
        
        
      })

    }
    
  }
  
  extractKey(textQR: string):string{
    return textQR.substring(53,97);
  }

  showNfceData(){
    this.navCtrl.push(NfcePage, {
      'dadosNFCE': this.dadosNFCE,
      'key': this.key
    });
  }

}
