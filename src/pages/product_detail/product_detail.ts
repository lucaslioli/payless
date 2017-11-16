import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { EstablishmentPage } from '../establishment/establishment';

@IonicPage()
@Component({
  selector: 'page-product_detail',
  templateUrl: 'product_detail.html',
})
export class Product_detailPage {
  public product: any = {};
  private url: string = 'http://127.0.0.1:8001';

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
    public http: Http
  	) {
	  let url = this.navParams.get('api_url');
	  let product_id = this.navParams.get('product_id');

    this.http.get(url + '/produtos/' + product_id)
        .map(res => res.json())
        .subscribe(data => {
          this.product = data[0];
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Product_detailPage');
  }

  getEstablishmentInfo(id) {
    this.navCtrl.push(EstablishmentPage,
    {
      'estabelecimento_id': id,
      'api_url': this.url
    });
  }

}
