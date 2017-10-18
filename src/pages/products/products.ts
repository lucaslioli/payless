import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TestPage } from '../test/test';

import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  private url: string = 'http://payless-api.ecoagile.com.br';
  private headers: Headers = new Headers({
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Origin': '*',
  });
  private options: RequestOptions = new RequestOptions({ headers: this.headers });
  public products: Array<{}>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http
  ) {
    this.http.get(this.url + '/products', this.options)
        .map(res => res.json())
        .subscribe(data => {
          this.products = data;
        });
  }

  getProductInfo(id) {
    this.navCtrl.push(TestPage,
    {
      'product_id': id,
      'api_url': this.url
    });
  }

}
