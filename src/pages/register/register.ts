import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/User';
import { TostServiceProvider } from '../../providers/tost-service/tost-service';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

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
    public Tost:TostServiceProvider,
    private Database:AngularFireDatabase,
    public app:App,
  ) {
  }

  user:User ={
    email:'anusondd@gmail.com',
    password:'21519097'
  };
  massage:string;
  person={
    titleName:'',
    firstName:'',
    lastName:'',
    birthday:'',
    address:'',
    personalNumber:'',
    metier:'',
    phoneNmener:'',
    pictureProfile:'',
    picturePersonalCard:'',
    approvePersonal:''
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(user:User){
    this.Auth.auth.createUserWithEmailAndPassword(user.email,user.password).then(result=>{
      console.log('pass',result)
      this.Database.object('personal/'+result.uid).set(this.person).then(result=>{})
      this.navCtrl.setRoot('LoginPage');    
        const root = this.app.getRootNav();
              root.popToRoot();
    }).catch(error=>{
      console.log('error',error)
      this.massage = error;
      this.Tost.presentToast(this.massage);
    })
  }

  

}
