import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { TostServiceProvider } from '../../providers/tost-service/tost-service';
import {  AngularFireDatabase } from 'angularfire2/database';
import { Personal } from '../../models/Presonal';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private Auth:AngularFireAuth,
    public Tost:TostServiceProvider,
    private Database:AngularFireDatabase
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
  }

  Login(user:User){
      this.Auth.auth.signInWithEmailAndPassword(user.email,user.password).then(result=>{
        console.log('pass',result.phoneNumber)
        //localStorage.setItem('UID',result.uid)
        if(!result.phoneNumber){
          this.Database.object('personal/'+result.uid).set(this.person).then(result=>{
            console.log('pass',result);
            this.navCtrl.push('VerifyPhonenumberPage');                     
          })
        }else{
          this.navCtrl.push('TabPage'); 
        }
        
        
      }).catch(error=>{
        console.log('error',error.message)
        this.message = error.message;
        this.Tost.presentToast(this.message);
      })
  }

}
