import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { TostServiceProvider } from '../../providers/tost-service/tost-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user:User ={
    email:'anusondd@gmail.com',
    password:'21519097'
  };
  message:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private Auth:AngularFireAuth,
    public Tost:TostServiceProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Login(user:User){
      this.Auth.auth.signInWithEmailAndPassword(user.email,user.password).then(result=>{
        console.log('pass',result.uid)
        localStorage.setItem('UID',result.uid)
        this.navCtrl.push('TabPage');
        
      }).catch(error=>{
        console.log('error',error.message)
        this.message = error.message;
        this.Tost.presentToast(this.message);
      })
  }

}
