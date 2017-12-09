import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { EstablishmentPage } from '../establishment/establishment';

@IonicPage()
@Component({
  selector: 'page-product_detail',
  templateUrl: 'product_detail.html',
})
export class Product_detailPage {
  public product: any = {};
  private url: string;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController
  ) {
    this.url = this.navParams.get('api_url');
  }

  ionViewDidLoad() {
    this.presentLoader();
    this.getProductDetails();
  }

  getProductDetails(){
    // Requests our API for product info
    this.http.get(this.url + '/produtos/' + this.navParams.get('product_id'))
      .map(res => res.json())
      .subscribe(data => {
        this.product = data[0];
      });
  }

  getEstablishmentInfo(id) {
    // Pushes establishment page to which the product belongs
    this.navCtrl.push(EstablishmentPage,
    {
      'estabelecimento_id': id,
      'api_url': this.url
    });
  }

  refreshProduct(ev: any){
    // Refreshes product details
    this.getProductDetails();

    // Timeouts in 2 seconds if action is not completed
    setTimeout(() => {
      ev.complete();
    }, 2000);

  }

  presentLoader(){
    // Creates loader with custom text
    let loader = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    // Presents loader to user
    loader.present();

    // Dismisses loader after 1.5 seconds
    setTimeout(() => {
      loader.dismiss();
    }, 1500);
  }

}
