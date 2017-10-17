import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

/**
 * Generated class for the ScannerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage {

  notaTeste: string = "https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx?chNFe=43170904698507000383650090000250651000250655&" + 
  "nVersao=100&" + "tpAmb=1&" + "dhEmi=323031372D30392D33305431373A31353A33392D30333A3030&" + "vNF=35.29&" + 
  "vICMS=0.00&" + "digVal=4251564252544943715A4F42656E485175593636505133306A78773D&" + "cIdToken=000001&" + 
  "cHashQRCode=494471AA1F1BF1872AF3BC43C753E598C934A1CD";
keyTeste: string;

options: BarcodeScannerOptions;
dadosQR;
key: string;
produtos: Array<{}>;

// private url: string = 'http://payless.ecoagile.com.br';
private url: string = 'http://localhost:8000';
public dadosNFCE;

constructor(public navCtrl: NavController, public navParams: NavParams, private scanner: BarcodeScanner, public http: Http) {
  
  this.keyTeste = this.notaTeste.substring(53,97);
  
  this.http.get(this.url + '/nfce/' + this.keyTeste)
  .map(res => res.json())
  .subscribe(data => {
    this.dadosNFCE = data;
    this.produtos = data.produtos;

  });
}

scan(){

  this.options = {
    prompt: "Escaneie um QR Code!"
  }

  this.scanner.scan(this.options).then(barcodeData => {
    this.dadosQR = barcodeData;
  })
  
}
  

}
