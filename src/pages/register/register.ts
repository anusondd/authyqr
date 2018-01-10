import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/User';
import { TostServiceProvider } from '../../providers/tost-service/tost-service';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

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
  massage:string;

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(user:User){
    this.Auth.auth.createUserWithEmailAndPassword(user.email,user.password).then(result=>{
      console.log('pass',result)
      this.navCtrl.push('LoginPage')
    }).catch(error=>{
      console.log('error',error)
      this.massage = error;
      this.Tost.presentToast(this.massage);
    })
  }

  

}
