import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {
  // BaseArrayClass,
  // CameraPosition,
  Geocoder,
  GeocoderRequest,
  // GeocoderResult,
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  // MarkerOptions,
  // Marker,
  // LatLng
 } from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  private url: string = 'http://payless-api.ecoagile.com.br';
  public map: GoogleMap;
  private geocoder: Geocoder;
  public estabelecimentos: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private googleMaps: GoogleMaps,
    public http: Http,
    public platform: Platform
  ) {
    this.geocoder = new Geocoder();
    this.http.get(this.url + '/estabelecimentos')
    .map(res => res.json())
    .subscribe(data => {
      this.estabelecimentos = data;
    });
  }

ngAfterViewInit() {
  this.platform.ready().then(() => {
    this.loadMap();
  });
}

loadMap() {

  let mapOptions: GoogleMapOptions = {
    camera: {
      target: {
        lat: -29.6873064,
        lng: -53.8154769
      },
      zoom: 11
    },
    controls: {
      compass: true,
      myLocationButton: true
    },
  };

  this.map = this.googleMaps.create('map', mapOptions);

  // Wait the MAP_READY before using any methods.
  this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      
      this.estabelecimentos.forEach(element => {
        let req: GeocoderRequest = { address: element.endereco };

        this.geocoder.geocode(req).then((results)=>{
          if(results[0].position){
            this.map.addMarker({
              title: element.nome,
              icon: 'blue',
              animation: 'DROP',
              position: results[0].position
            });
          }
        }).catch((err) => {
          console.log(err);
        });

      });
    });
  }
}
