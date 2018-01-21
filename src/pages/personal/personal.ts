import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { PersonalServiceProvider } from '../../providers/personal-service/personal-service';
import { TostServiceProvider } from '../../providers/tost-service/tost-service';
import { ApprovePersonalServiceProvider } from '../../providers/approve-personal-service/approve-personal-service';
import { Personal } from '../../models/Presonal';



@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {

  personal:Personal;
  profile: string = "about";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private Auth:AngularFireAuth,
    private PersonalService:PersonalServiceProvider,
    public Tost:TostServiceProvider,
    public app:App,
    private ApprovePersonalService:ApprovePersonalServiceProvider
  ) {
    let uid = localStorage.getItem('UID');
    this.PersonalService.getPersonal(uid).subscribe(person=>{
      console.log(person);
      this.personal = person;
      
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalPage');
    
  }

  logOut(){
    this.Auth.auth.signOut().then(result=>{
        console.log('pass',result);
        localStorage.clear();        
        this.navCtrl.setRoot('LoginPage');    
        const root = this.app.getRootNav();
              root.popToRoot();
        
    }).catch(error=>{
      console.log('error',error);
    })
   
  }

}
