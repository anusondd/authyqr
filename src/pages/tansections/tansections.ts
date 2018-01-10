import { Component } from '@angular/core';
import { App,IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TansectionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tansections',
  templateUrl: 'tansections.html',
})
export class TansectionsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app:App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TansectionsPage');
  }

  logOut(){
    this.navCtrl.setRoot('LoginPage');
    
    const root = this.app.getRootNav();
          root.popToRoot();
  }

}
