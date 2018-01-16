import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { PersonalServiceProvider } from '../../providers/personal-service/personal-service';
import { TostServiceProvider } from '../../providers/tost-service/tost-service';

@IonicPage()
@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html'
})
export class TabPage {

  tansectionsRoot = 'TansectionsPage'
  qrcodeRoot = 'QrcodePage'
  personalRoot = 'PersonalPage'


  constructor(
    public navCtrl: NavController,
    private Auth:AngularFireAuth,
    private PersonalService:PersonalServiceProvider,
    public Tost:TostServiceProvider,
    public app:App
  ) {
    
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
