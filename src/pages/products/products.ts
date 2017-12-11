import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Network } from '@ionic-native/network';

import { Product_detailPage } from '../product_detail/product_detail';

import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  private url: string = 'http://payless-api.ecoagile.com.br';
  public products: Array<{}>;
  public itens: any;
  public qtde: any;
  internetConnection: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    public network: Network
  ) {}

  ionViewDidLoad(){
    this.presentLoader();
    this.getAllProductsInfo();
  }

  getAllProductsInfo(){
    // Requests our API for all products info
    this.http.get(this.url + '/produtos')
    .map(res => res.json())
    .subscribe(data => {
      this.products = data;
      this.itens = this.products;
      this.qtde = this.products.length;
    });
  }

  initializeItems() {
    this.itens = this.products;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.itens = this.itens.filter((item) => {
        return (item.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getProductInfo(id) {
    // Shows page with product details
    this.navCtrl.push(Product_detailPage,
    {
      'product_id': id,
      'api_url': this.url
    });
  }

  refreshProducts(ev: any){
    // Refreshes products
    this.getAllProductsInfo();

    // Timeouts in 2 seconds
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
