import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-nfce',
  templateUrl: 'nfce.html',
})
export class NfcePage {

  dadosNFCE;
  key;
  produtos;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.dadosNFCE = this.navParams.get('dadosNFCE');
    this.key = this.navParams.get('key');
    this.produtos = this.dadosNFCE.produtos;
  }

}
