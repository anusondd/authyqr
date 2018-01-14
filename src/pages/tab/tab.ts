import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { PersonalServiceProvider } from '../../providers/personal-service/personal-service';
import { TostServiceProvider } from '../../providers/tost-service/tost-service';

/**
 * Generated class for the TabPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    this.Auth.authState.subscribe(user=>{
      this.PersonalService.getPersonal(user.uid).subscribe(res=>{
        if(res.phoneNmener!=''){
          this.navCtrl.push('AddPersonalPage');
        }
      })
    }).closed;
  }
  
}
