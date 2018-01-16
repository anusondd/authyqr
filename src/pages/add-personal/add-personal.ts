import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-add-personal',
  templateUrl: 'add-personal.html',
})
export class AddPersonalPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private Auth:AngularFireAuth,
    public app:App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPersonalPage');
  }

  logOut(){
    this.Auth.auth.signOut().then(result=>{
        console.log('pass',result);
        this.navCtrl.setRoot('LoginPage');    
        const root = this.app.getRootNav();
              root.popToRoot();
        
    }).catch(error=>{
      console.log('error',error);
    })
   
  }

}
