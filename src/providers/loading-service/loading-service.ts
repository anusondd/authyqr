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

  presentLoading(time:number,message:string) {
    let loader = this.loadingCtrl.create({
      content: message,
      duration: time
    });
    loader.present();
  }

}
