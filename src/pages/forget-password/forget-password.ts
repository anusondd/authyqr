import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { TostServiceProvider } from '../../providers/tost-service/tost-service';

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private Auth:AngularFireAuth,
    public Tost:TostServiceProvider
  ) {
  }

  user:User ={
    email:'anusondd@gmail.com',
    password:'21519097'
  };
  message:string;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  Resetpassword(user:User){
    this.Auth.auth.sendPasswordResetEmail(user.email).then(result=>{
      console.log('pass',result);
      this.Tost.presentToast('Please check your email to change your password.');
    }).catch(error=>{
      console.log('error',error);
      this.message = error.message;
      this.Tost.presentToast(this.message);
    })

  }

}
