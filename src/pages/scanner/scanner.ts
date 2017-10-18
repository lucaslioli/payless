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

  // private url: string = 'http://payless.ecoagile.com.br';
  private url: string = 'http://localhost:8000';
  // private url: string = '192.168.0.104:8000';
  public dadosNFCE;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private scanner: BarcodeScanner, 
    public http: Http, 
    public platform: Platform) {}

  scan(){

    this.options = {
      prompt: "Escaneie o QR Code da Nota Fiscal!"
    }

    if (this.platform.is('cordova')) {

      this.scanner.scan(this.options).then(barcodeData => {
        this.dadosQR = barcodeData.text;
      })

    } else {

      this.dadosQR = "https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx?chNFe=43170904698507000383650090000250651000250655&" + 
      "nVersao=100&" + "tpAmb=1&" + "dhEmi=323031372D30392D33305431373A31353A33392D30333A3030&" + "vNF=35.29&" + 
      "vICMS=0.00&" + "digVal=4251564252544943715A4F42656E485175593636505133306A78773D&" + "cIdToken=000001&" + 
      "cHashQRCode=494471AA1F1BF1872AF3BC43C753E598C934A1CD";
      
    }

    this.key = this.extractKey(this.dadosQR);

    this.waiting = true;

    this.http.get(this.url + '/nfce/' + this.key)
    .map(res => res.json())
    .subscribe(data => {
      this.dadosNFCE = data;
  
      this.showNfceData();
    });
    
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
