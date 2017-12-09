import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
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
    public http: Http,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.presentLoader();
    this.getEstablishmentInfo();
  }

  getEstablishmentInfo(){
    // Requests our API for establishment info and products
    this.http.get(this.navParams.get('api_url') + '/estabelecimentos/' + this.navParams.get('estabelecimento_id'))
      .map(res => res.json())
      .subscribe(data => {
        this.establishment = data;
        this.dados = this.establishment.dados;
        this.itens = this.establishment.produtos;
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

  refreshItems(ev: any){
    // Refreshes establishment info and products
    this.getEstablishmentInfo();

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
