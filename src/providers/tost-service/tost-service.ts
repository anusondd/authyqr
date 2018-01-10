import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class TostServiceProvider {

  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController
  ) {
    console.log('Hello TostServiceProvider Provider');
  }

  presentToast(taxt:string) {
    let toast = this.toastCtrl.create({
      message: taxt,
      duration: 3000
    });
    toast.present();
  }


}
