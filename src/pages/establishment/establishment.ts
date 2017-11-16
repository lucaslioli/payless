import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-establishment',
  templateUrl: 'establishment.html',
})
export class EstablishmentPage {
  public establishment: any = {};

  constructor(
    public navCtrl: NavController,
  	public navParams: NavParams,
    public http: Http
  	) {
	  let url = this.navParams.get('api_url');
	  let establishment_id = this.navParams.get('estabelecimento_id');

    this.http.get(url + '/estabelecimentos/' + establishment_id)
        .map(res => res.json())
        .subscribe(data => {
          this.establishment = data;
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstablishmentPage');
  }

}
