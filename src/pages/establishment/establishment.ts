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
  public itens: any;
  public dados: any;

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
          this.dados = this.establishment.dados;
          this.itens = this.establishment.produtos;
          // console.log(this.dados);
        });
  }

  initializeItems() {
    this.itens = this.establishment.produtos;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstablishmentPage');
  }

}
