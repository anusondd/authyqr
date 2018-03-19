import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';


@Injectable()
export class LoadingServiceProvider {

  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController
  ) {
    console.log('Hello LoadingServiceProvider Provider');
  }

  presentLoading(time:number) {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: time
    });
    loader.present();
  }

}
