import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Product_detailPage } from '../product_detail/product_detail';

import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  private url: string = 'http://payless-api.ecoagile.com.br';
  // private url: string = 'http://127.0.0.1:8001';
  // private url: string = 'http://192.168.43.209:8000';
  private headers: Headers = new Headers({
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Origin': '*',
  });
  private options: RequestOptions = new RequestOptions({ headers: this.headers });
  public products: Array<{}>;
  public itens: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http
  ) {
    this.http.get(this.url + '/produtos', this.options)
        .map(res => res.json())
        .subscribe(data => {
          this.products = data;
          this.itens = this.products;
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
    this.navCtrl.push(Product_detailPage,
    {
      'product_id': id,
      'api_url': this.url
    });
  }

}
