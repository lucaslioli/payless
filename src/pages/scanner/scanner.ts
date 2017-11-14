import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import 'rxjs/add/operator/map';

// import { NfcePage } from '../nfce/nfce';

@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage {

  options: BarcodeScannerOptions;
  dadosQR;
  key: string;
  sent: boolean = false;
  cordovaAbsent: boolean = false;

  // private url: string = 'http://payless-api.ecoagile.com.br';
  // private url: string = 'http://localhost:8000';
  private url: string = 'http://192.168.0.114:9000';
  // public dadosNFCE;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private scanner: BarcodeScanner, 
    public http: Http, 
    public platform: Platform,
    public toastCtrl: ToastController) {
    if (!this.platform.is('cordova')) {
      this.cordovaAbsent = true;
    }
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: this.key,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  

  scan(){

    this.options = {
      prompt: "Escaneie o QR Code da Nota Fiscal!"
    }

    if (this.platform.is('cordova')) {

      this.scanner.scan(this.options).then(barcodeData => {

          this.dadosQR = barcodeData.text;
          
          this.key = this.extractKey(this.dadosQR);
          // this.key = "43171004698507000383650130000377671000377674";
          // this.presentToast();
      
          this.http.get(this.url + '/nota/' + this.key)
          .map(res => res.json())
          .subscribe(data => {
            if(data == "200"){
              // this.dadosNFCE = data;
              // this.showNfceData();
            } else {
              console.log("Ocorreu um erro no cadastro da nota fiscal");
            }
            console.log(data);
          });
          
          this.sent = true;
        
      })

    }
    
  }
  
  extractKey(textQR: string):string{
    return textQR.substring(53,97);
  }

  // showNfceData(){
  //   this.navCtrl.push(NfcePage, {
  //     'dadosNFCE': this.dadosNFCE,
  //     'key': this.key
  //   });
  // }

}
